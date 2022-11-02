import { useState, useContext, useRef, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useNetwork, useAccount } from "wagmi";

import { UserContext } from "@components/Dashboard/Provider/UserContextProvider";
import { ErrorContext } from "@components/Dashboard/Provider/ErrorContextProvider";
import Header from "@components/Dashboard/Header/Header";
import ActionBar from "@components/Dashboard/Form/ActionBar";
import Input from "@components/Dashboard/Form/Input";
import FormDrawer from "@components/Dashboard/Form/FormDrawer";

import { useBadgerFactory } from "@hooks/useContracts";
import { postOrgRequest, postIPFSImage, postIPFSMetadata, getPFPImage } from "@utils/api_requests";
import { getBadgerAbi } from "@hooks/useContracts";
import { useIPFSImageHash, useIPFSMetadataHash } from "@hooks/useIpfsHash";
import { IPFS_GATEWAY_URL } from "@static/constants/links"

// TODO: Move orgObj into the form reducer.
const OrgForm = () => {
    const { userData, setUserData } = useContext(UserContext);
    const { setError } = useContext(ErrorContext);

    const { address } = useAccount();
    const { chain } = useNetwork();
    const navigate = useNavigate();
    const imageInput = useRef();

    const [ orgObj, setOrgObj ] = useState({
        name: "",
        symbol: "",
        description: "",
        contract_uri_hash: "",
        owner: "",
        ethereum_address: "",
        chain: chain?.name,
    })
    const [ orgImage, setOrgImage ] = useState();
    const [ orgImageHash, setOrgImageHash ] = useState();
    const [ imageUploading, setImageUploading ] = useState(false);
    const [ txPending, setTxPending ] = useState(false);
    const [ saveState, setSaveState ] = useState("unsaved");

    const createContract = useBadgerFactory(
        saveState === "saved", 
        orgObj, 
        address, 
        chain?.name
    )
    const badger = useMemo(() => getBadgerAbi(chain?.name), [chain?.name]);

    const deterministicImageHash = useIPFSImageHash(orgImage)
    const deterministicMetadataHash = useIPFSMetadataHash({
        name: orgObj.name, 
        description: orgObj.description, 
        image: IPFS_GATEWAY_URL + deterministicImageHash.hash
    })

    let firstCharOfName = useRef();

    const actions = [
        {
            text: "Save",
            icon: ["fal", "save"],
            disabled: !orgObj.name || !orgObj.description || saveState === "saved",
            loading: saveState === "pending",
            event: () => onFormSave()
        },
        {
            text: "Create organization",
            icon: ["fal", "arrow-right"],
            loading: txPending,
            disabled: saveState !== "saved" || !createContract.isSuccess,
            event: () => createOrgTx()
        }
    ]

    // Converts an org name to a symbol.
    const nameToSymbol = (name) => {
        return name.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().substring(0, 5);
    }

    // When name is changed, update orgObj name, and symbol if symbol is not custom.
    const onOrgNameChange = (e) => {
        setOrgObj({...orgObj, name: e.target.value, symbol: nameToSymbol(e.target.value)});
        if (e.target.value[0] !== firstCharOfName.current) {
            firstCharOfName.current = e.target.value[0];
            getGeneratedImage(firstCharOfName.current);
        }
    }

    // Get a generated image for the org.
    const getGeneratedImage = async (char) => {
        const response = await getPFPImage(char, address);
        if (response.error) {
            setError({
                label: "Error getting generated Org Image",
                message: response.error``
            })
        } else {
            setOrgImage(response);
            pinImage(response);
        }
    }
    
    // Pin the org image to IPFS.
    const pinImage = async (image) => {
        setImageUploading(true)

        const response = await postIPFSImage(image)
        if (response.error) {
            setError({
                label: 'Could not upload image to IPFS',
                message: response.error
            });
        } else {
            setOrgImageHash(response.hash);
        }
        setImageUploading(false);

        return response;
    }

    // Post the IPFS metadata for the org.
    const pinMetadata = async (imageHash) => {
        const response = await postIPFSMetadata({
            name: orgObj.name, 
            description: orgObj.description, 
            imageHash: imageHash
        });

        if (response.error) {
            setError({
                label: 'Error creating Org URI',
                message: response.error
            });
        } else {
            setOrgObj({...orgObj, contract_uri_hash: response.hash, image_hash: orgImageHash});
        }
        
        return response;
    }

    // On save button click, handle all the IPFS pinning and enabled the create button.
    const onFormSave = async () => {
        setSaveState("pending");
        const imageHash = await pinImage(orgImage);
        const jsonHash = await pinMetadata(imageHash.hash);
        if (imageHash.hash && jsonHash.hash)
            setSaveState("saved");
        else
            setSaveState("unsaved");
    }

    // Awaits a prepared transaction before running it.
    const createOrgTx = async () => {
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
    }

    // Post the org Obj to the backend once the contract address is added.
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

    // If any field changes after saving once, prompt the user to save again.
    useEffect(() => {
        setSaveState("unsaved");
    }, [orgObj.name, orgObj.description, orgImage])

    return (
        <div id="new-org">
            <Header back={() => navigate("/dashboard")} />

            <h2 style={{marginLeft: "30px"}}>Create Organization</h2>

            <FormDrawer label="General" open={true}>
                <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "20px"}}>
                    <Input 
                        name="orgName"
                        label="Name" 
                        required={true}
                        value={orgObj.name} 
                        onChange={onOrgNameChange}
                    />

                    <Input 
                        name="orgSymbol"
                        label="Symbol" 
                        required={false}
                        value={orgObj.symbol} 
                        onChange={(e) => setOrgObj({...orgObj, symbol: e.target.value})}
                    />
                </div>

                <Input
                    name="orgDescription"
                    label="Description"
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
            </FormDrawer>

            <FormDrawer label="Appearance" open={true}>
                <Input
                    name="Custom Image"
                    accept="image/*"
                    label="Custom Image"
                    placeholder="Upload Custom Organization Image"
                    disabled={true}
                    value={orgImage?.name || ""}
                    append={
                        <button
                            className="button-secondary"
                            onClick={() => imageInput.current.click()}
                            style={{width: "auto"}}
                        >
                            {imageUploading ?
                                "Loading..." :
                                orgImage?.name ? 
                                    "Change image" : 
                                    "Upload image"
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
                        onChange={(event) => {setOrgImage(event.target.files[0])}}
                    />
            </FormDrawer>

            <ActionBar 
                help={"Badge creation occurs after your organization has been established."} 
                actions={actions}
                style={{marginInline: "30px"}}
            />
        </div>
    )
}

export default OrgForm;