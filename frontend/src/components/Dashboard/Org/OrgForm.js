import { useState, useContext, useRef, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useNetwork, useAccount } from "wagmi";

import { UserContext } from "@components/Dashboard/Provider/UserContextProvider";
import { ErrorContext } from "@components/Dashboard/Provider/ErrorContextProvider";
import Header from "@components/Dashboard/Header/Header";
import ActionBar from "@components/Dashboard/Form/ActionBar";
import Input from "@components/Dashboard/Form/Input";

import { useBadgerFactory } from "@hooks/useContracts";
import { postOrgRequest, postIPFSImage, postIPFSMetadata, getPFPImage } from "@utils/api_requests";
import { getBadgerAbi } from "@hooks/useContracts";

// TODO: Move orgObj into a reducer. (Should we have a reducer for values that are rendered and 
//       a ref for the full orgObj?)
const OrgForm = () => {
    const { userData, setUserData } = useContext(UserContext);
    const { setError } = useContext(ErrorContext);

    const { address } = useAccount();
    const { chain } = useNetwork();
    const navigate = useNavigate();
    const imageInput = useRef();

    // TODO: For editing, get orgId from params and if it exists, fetch and fill org data
    const [ orgObj, setOrgObj ] = useState({
        name: "",
        symbol: "",
        description: "",
        image_hash: "",
        contract_uri_hash: "",
        owner: "",
        ethereum_address: "",
        chain: chain?.name,
    })
    const [ orgImage, setOrgImage ] = useState({name: ""});
    const [ imageUploading, setImageUploading ] = useState(false);
    const [ txCalled, setTxCalled ] = useState(false);
    const [ txPending, setTxPending ] = useState(false);

    const createContract = useBadgerFactory(txCalled, orgObj, address, chain?.name)
    const badger = useMemo(() => getBadgerAbi(chain?.name), [chain?.name]);

    let firstCharOfName;
    
    const actions = [
        {
            text: "CREATE",
            icon: ["fal", "arrow-right"],
            loading: txCalled || txPending,
            disabled: !orgObj.name || !orgObj.symbol || !orgObj.image_hash,
            event: () => onFormSubmission()
        }
    ]

    // Converts an org name to a symbol.
    const nameToSymbol = (name) => {
        return name.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().substring(0, 5);
    }

    // When name is changed, update orgObj name, and symbol if symbol is not custom.
    const onOrgNameChange = (e) => {
        setOrgObj({...orgObj, name: e.target.value, symbol: nameToSymbol(e.target.value)});
        if (e.target.value[0] !== firstCharOfName) {
            firstCharOfName = e.target.value;
            getGeneratedImage(firstCharOfName);
        }
    }

    const getGeneratedImage = async (char) => {
        const pfpImage = await getPFPImage(char);
        setOrgImage(pfpImage);
    }
    
    // When image is added, post to IPFS and set orgObj image hash.
    const onImageUpload = async (event) => {
        const image = event.target.files[0]
        setOrgImage(image)

        setImageUploading(true);
        const response = await postIPFSImage(image)
        if (response.error) {
            setError({
                label: 'Could not upload image to IPFS',
                message: response.error
            });
        } else {
            setOrgObj({...orgObj, image_hash: response.hash});
        }
        setImageUploading(false);
    }

    // Posts contract uri to IPFS and sets the returned hash to orgObj uri hash.
    const onFormSubmission = async () => {
        setTxCalled(true);

        const response = await postIPFSMetadata(orgObj.name, orgObj.description, orgObj.image_hash);
        if (response.error) {
            setError({
                label: 'Error creating Org URI',
                message: response.error
            });
            setTxCalled(false);
        } else {
            setOrgObj({...orgObj, contract_uri_hash: response.hash});
        }
    }

    // Awaits a prepared transaction before running it.
    const createOrgTx = useCallback(async () => {
        setTxPending(true);
        try {
            let tx = await createContract.write?.();
            tx = await tx?.wait();

            if (tx.status !== 1)
                throw new Error(createContract?.error);
            // Decode the transaction receipt to get the contract address from the event.
            const orgCreatedTopic = badger.abi.getEventTopic("OrganizationCreated");
            const orgCreatedEvent = tx.logs.find((log) => log.topics[0] === orgCreatedTopic);
            const orgEvent = badger.abi.decodeEventLog("OrganizationCreated", orgCreatedEvent.data, orgCreatedEvent.topics);
            const contractAddress = orgEvent.organization;

            // If transaction was confirmed, add is_active and contract address to orgObj.
            // Adding the ethereum address will trigger a useEffect to post to backend.
            setOrgObj({...orgObj, ethereum_address: contractAddress, is_active: true});
        }
        catch (error) {
            setError({
                label: 'Error creating Org',
                message: error
            });
            setTxPending(false);
        }
    }, [createContract, badger.abi, orgObj, setError]);
    
    useEffect(() => {
        if (   
               createContract.isSuccess
            && txCalled
            && !txPending
            // && !orgObj.ethereum_address
        ) {
            setTxCalled(false);
            createOrgTx();
        }
    }, [createContract.isSuccess, txCalled, setTxCalled, txPending, createOrgTx])

    const postOrg = useCallback(async () => {
        const response = await postOrgRequest(orgObj);
        if (!response?.error && response?.id) {
            let newUserData = {...userData};

            if (newUserData.organizations)
                newUserData.organizations.push(response);
            else
                newUserData.organizations = [response];
    
            setUserData(newUserData);
            navigate(`/dashboard/organization/${response.id}`);
        }
        else {
            setError({
                label: 'Could not add org to database',
                message: response.error
            });
        }

        setTxPending(false);
    }, [orgObj, navigate, userData, setUserData, setError]);
    // Upon receiving contract address from transaction event,
    // POST org to backend and if successful, add to state and navigate to org page.
    useEffect(() => {
        if (orgObj.ethereum_address) 
            postOrg();
    }, [orgObj.ethereum_address, postOrg])

    return (
        <div id="new-org">
            <Header back={() => navigate("/dashboard")} />

            <h2>Create Organization</h2>

            <h3 style={{marginTop: "30px"}}>General</h3>
            <Input 
                name="orgName"
                label="Organization Name" 
                required={true}
                value={orgObj.name} 
                onChange={onOrgNameChange} 
            />

            <Input
                name="orgDescription"
                label="Organization Description"
                required={true}
                value={orgObj.description}
                onChange={(e) => setOrgObj({...orgObj, description: e.target.value})}
            />

            <ActionBar
                help={
                    `You can only set the on-chain name of your Organization once. 
                    After creation, you can update the off-chain name and description 
                    but you cannot change the name of the contract. Please make sure 
                    you are happy with it before submitting.`
                }
                helpStyle={{maxWidth: "840px"}}
            />

            <h3 style={{marginTop: "30px"}}>Appearance</h3>
            <Input
                name="Custom Image"
                accept="image/*"
                label="Custom Image"
                placeholder="Upload Custom Organization Image"
                disabled={true}
                value={orgImage?.name}
                append={
                    <button
                        className="button-secondary"
                        onClick={() => imageInput.current.click()}
                        style={{width: "100px", padding: "0px"}}
                    >
                        {imageUploading ?
                            "LOADING..." :
                            orgImage?.name ? 
                                "CHANGE" : 
                                "UPLOAD"
                        }
                    </button>
                }
            />
                <input
                    id="org-image"
                    style={{ display: "none" }}
                    ref={imageInput}
                    accept="image/*"
                    type="file"
                    onChange={(event) => onImageUpload(event)}
                />

            <ActionBar 
                help={"Badge creation occurs after your organization has been established."} 
                actions={actions} 
            />
        </div>
    )
}

export default OrgForm;