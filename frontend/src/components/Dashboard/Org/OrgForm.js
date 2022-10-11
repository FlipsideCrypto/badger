import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useNetwork, useAccount, useContractEvent } from "wagmi";

import { UserContext } from "@components/Dashboard/Provider/UserContextProvider";
import { ErrorContext } from "@components/Dashboard/Provider/ErrorContextProvider";
import Header from "@components/Dashboard/Header/Header";
import ActionBar from "@components/Dashboard/Form/ActionBar";
import Input from "@components/Dashboard/Form/Input";

import { useBadgerFactory } from "@hooks/useContracts";
import { postOrgRequest, postIPFSImage, postIPFSMetadata } from "@utils/api_requests";
import { getBadgerAbi } from "@hooks/useContracts";

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
        chain: chain.name,
    })
    const [ orgImage, setOrgImage ] = useState({name: ""});
    const [ txPending, setTxPending ] = useState(false);

    const createContract = useBadgerFactory(
        orgObj.chain,                       // chain name
        address,                            // deployer address
        orgObj.name,                        // org name
        orgObj.symbol,                      // org symbol
        "",                                 // base URI
        orgObj.contract_uri_hash,           // contract URI
        Boolean(orgObj.contract_uri_hash)   // transaction enabled
    );

    // Listener for the confirmed transaction in order to
    // pull the new contract address from events.
    const badger = getBadgerAbi(chain.name)
    useContractEvent({
        addressOrName: badger.address,
        contractInterface: badger.abi,
        eventName: "OrganizationCreated",
        listener: (event) => onEventReceived(event)
    })
    
    const actions = [
        {
            text: "CREATE",
            icon: ["fal", "arrow-right"],
            loading: txPending,
            disabled: !orgObj.name || !orgObj.symbol || !orgObj.image_hash,
            event: () => onFormSubmission()
        }
    ]

    // Upon receiving the event from clone transaction,
    // POST the org to backend and redirect to org page.
    const onEventReceived = async (event) => {
        const contractAddress = event[0];
        const deployer = event[1];
        
        // Check to make sure event caught is valid and for this user.
        if (deployer !== address || !contractAddress) return;

        // If transaction was confirmed, add is_active and contract address to orgObj.
        // Adding the ethereum address will trigger a useEffect to post to backend.
        setOrgObj({...orgObj, ethereum_address: contractAddress, is_active: true});
    }

    // Converts an org name to a symbol.
    const nameToSymbol = (name) => {
        return name.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().substring(0, 5);
    }

    // When name is changed, update orgObj name, and symbol if symbol is not custom.
    const onOrgNameChange = (e) => {
        if (orgObj.symbol === nameToSymbol(orgObj.name)) {
            setOrgObj({...orgObj, name: e.target.value, symbol: nameToSymbol(e.target.value)});
        } else {
            setOrgObj({...orgObj, name: e.target.value});
        }
    }

    // When image is added, post to IPFS and set orgObj image hash.
    const onImageUpload = async (event) => {
        const image = event.target.files[0]
        setOrgImage(image)
        
        const response = await postIPFSImage(image)
        if (response.error) {
            setError('Could not upload image to IPFS: ' + response.error);
        } else {
            setOrgObj({...orgObj, image_hash: response.hash});
        }
    }

    // Determines if organizations is already in userData, before pushing or settings
    // the new organization to userData.
    const addOrgToState = (org) => {
        let newUserData = {...userData};

        if (newUserData.organizations)
            newUserData.organizations.push(org);
        else
            newUserData.organizations = [org];

        setUserData(newUserData);
    }

    // Posts contract uri to IPFS and sets the returned hash to orgObj uri hash.
    const onFormSubmission = async () => {
        setTxPending(true);
        const response = await postIPFSMetadata(orgObj);
        if (response.error) {
            setError('Error creating Org URI: ' + response.error);
            setTxPending(false);
        } else {
            setOrgObj({...orgObj, contract_uri_hash: response.hash});
        }
    }

    // Awaits a prepared transaction before running it and posting the new Org to the database.
    useEffect(() => {
        async function createOrgTx() {
            let tx = await createContract.write?.();
            await tx?.wait();
        }

        if (createContract.isSuccess) {
            try {
                createOrgTx();
            } catch (error) {
                setError('Transaction failed: ' + error);
            }
        }
    }, [createContract, setError])

    // Upon receiving contract address,
    // POST org to backend and if successful, add to state and navigate to org page.
    useEffect(() => {
        async function postOrg() {
            const response = await postOrgRequest(orgObj);
            if (!response?.error && response?.id) {
                addOrgToState(response);
                navigate(`/dashboard/organization/${response.id}`);
            }
            else {
                setError('Could not add org to database: ' + response.error);
            }

            setTxPending(false);
        }

        if (orgObj.ethereum_address) 
            postOrg();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orgObj.ethereum_address])

    return (
        <div id="new-org">
            <Header back={() => navigate("/dashboard")} />

            <h2>Create Organization</h2>

            <Input 
                name="orgName"
                label="Organization Name" 
                required={true}
                value={orgObj.name} 
                onChange={onOrgNameChange} 
            />

            <Input
                name="orgSymbol"
                label="Organization Symbol"
                required={true}
                value={orgObj.symbol}
                onChange={(e) => setOrgObj({...orgObj, symbol: e.target.value})}
            />

            <Input
                name="orgDescription"
                label="Organization Description"
                required={true}
                value={orgObj.description}
                onChange={(e) => setOrgObj({...orgObj, description: e.target.value})}
            />

            <Input
                name="Organization Image"
                accept="image/*"
                label="Organization Image"
                placeholder="Upload Organization Image"
                disabled={true}
                value={orgImage.name}
                append={
                    <button
                        className="button-secondary"
                        onClick={() => imageInput.current.click()}
                    >
                        {orgImage.name ? "CHANGE" : "UPLOAD"}
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