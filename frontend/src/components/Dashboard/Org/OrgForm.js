import { useState, useContext, useRef, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useNetwork, useAccount } from "wagmi";

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
        chain: chain?.name,
    })
    const [ orgImage, setOrgImage ] = useState({name: ""});
    const [ txPending, setTxPending ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const createContract = useBadgerFactory(orgObj, address, chain?.name)
    const badger = useMemo(() => getBadgerAbi(chain?.name), [chain?.name]);
    
    const actions = [
        {
            text: "CREATE",
            icon: ["fal", "arrow-right"],
            loading: loading || txPending,
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

    // Posts contract uri to IPFS and sets the returned hash to orgObj uri hash.
    const onFormSubmission = async () => {
        setLoading(true);
        const response = await postIPFSMetadata(orgObj.name, orgObj.description, orgObj.image_hash);
        if (response.error) {
            setError('Error creating Org URI: ' + response.error);
            setLoading(false);
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
            setError('Error creating Org: ' + error);
            setLoading(false);
        }
        setTxPending(false);
    }, [createContract, badger.abi, orgObj, setError]);
    
    useEffect(() => {
        // This is bad/ugly code, but it works to only trigger the call when the button has been clicked
        // (loading), the transaction is prepared (isSuccess), there's not a pending transaction
        // (!txPending), and the ethereum address has not been set after a successful transaction.
        if (   
               createContract.isSuccess
            && loading
            && !txPending
            && !orgObj.ethereum_address
        ) {
            createOrgTx();
        }
    }, [createContract.isSuccess, orgObj.ethereum_address, loading, txPending, createOrgTx])

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
            setError('Could not add org to database: ' + response.error);
        }

        setLoading(false);
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
                value={orgImage?.name}
                append={
                    <button
                        className="button-secondary"
                        onClick={() => imageInput.current.click()}
                    >
                        {orgImage?.name ? "CHANGE" : "UPLOAD"}
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