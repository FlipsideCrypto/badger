import { useState, useRef, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Header from "@components/Dashboard/Header/Header";
import ActionBar from "@components/Dashboard/Form/ActionBar";
import Input from "@components/Dashboard/Form/Input";
import Switch from "@components/Dashboard/Form/Switch";
import InputListCSV from "@components/Dashboard/Form/InputListCSV";
import { OrgContext } from "@components/Dashboard/Provider/OrgContextProvider";
import { ErrorContext } from "@components/Dashboard/Provider/ErrorContextProvider";

import { postBadgeRequest, postIPFSImage, postIPFSMetadata } from "@utils/api_requests";
import { useCreateBadge } from "@hooks/useContracts";

// TODO: EDIT MODE: Check the orgData context and if the badge is in it then
//       get the badge and set the state, and change component to edit mode. (also get rid of props
// TODO: This is a lot of state vars. Probably worth it to move everything into one badge dict.
// TODO: Clean and validate badgeDelegates array
const BadgeForm = () => {
    const [ badgeName, setBadgeName ] = useState("");
    const [ badgeDescription, setBadgeDescription ] = useState("");
    const [ badgeImage, setBadgeImage ] = useState({name: ""});
    const [ badgeDelegates, setBadgeDelegates ] = useState([]);
    const [ ipfsImageHash, setIpfsImageHash ] = useState();
    const [ accountBound, setAccountBound ] = useState(true);
    const [ txPending, setTxPending ] = useState(false);

    const { orgData, setOrgData } = useContext(OrgContext);
    const { setError } = useContext(ErrorContext);

    const [ badgeObj, setBadgeObj ] = useState({
        name: badgeName,
        description: badgeDescription,
        delegates: badgeDelegates,
        image_hash: ipfsImageHash,
        ethereum_address: orgData?.ethereum_address,
        token_id: orgData?.badges?.length,
        organization: orgData?.id,
        account_bound: accountBound,
        claimable: false,
        is_active: false,
        signer: orgData?.owner?.ethereum_address,
        token_uri: "",
        // payment_token: ["paymentKey", 0],
    })
    
    const imageInput = useRef();
    const navigate = useNavigate();

    const createBadge = useCreateBadge(badgeObj);
    const disabled = !badgeName || !badgeDescription || !ipfsImageHash
    
    const actions = [
        {
            text: "CREATE BADGE",
            icon: ["fal", "arrow-right"],
            disabled: disabled,
            loading: txPending,
            event: () => onBadgeFormSubmission()
        }
    ]
    
    // Form submission just gets the final uri hash and sets the token_uri in the badgeObj
    // The transaction and rest of the flow is handled within the useEffect and createBadgeTx(),
    // As we have to await the transaction to be prepared by wagmi before calling it.
    const onBadgeFormSubmission = async () => {
        // Get the token uri
        const response = await postIPFSMetadata(badgeName, badgeDescription, ipfsImageHash);
        if (response.error) {
            setError('Error creating token URI: ' + response.error);
        }

        setBadgeObj({
            ...badgeObj, 
            token_uri: response.hash,
            name: badgeName,
            description: badgeDescription,
            delegates: badgeDelegates,
            image_hash: ipfsImageHash,
        })
    }

    // Post the badge to the backend for IPFS upload.
    const onImageUpload = async (event) => {
        const image = event.target.files[0]
        setBadgeImage(image)
        
        const response = await postIPFSImage(image)
        if (response.error) {
            setError('Could not upload image to IPFS: ' + response.error);
        }
        setIpfsImageHash(response.hash)
        setBadgeObj({...badgeObj, image_hash: response.hash})
    }

    // Write to contract
    const createBadgeTx = useCallback(async () => {
        try {
            let tx = await createBadge.write?.();
            tx = await tx?.wait();

            if (tx.status !== 1)
                throw new Error(createBadge.error);

            // Post to database
            const response = await postBadgeRequest(badgeObj);
            // if POST is successful
            if (!response.error) {
                // Set in orgData context
                let prev = {...orgData}
                prev.badges.push(response)
                setOrgData(prev)
                setBadgeObj(response)
                navigate(`/dashboard/organization/${orgData?.id}/badge/${response.id}`);
            }
            else {
                throw new Error('Could not add badge to database ' + response.error);
            }
        }
        catch (error) {
            setError('Error creating badge: ' + error);
            setTxPending(false);
        }

    }, [badgeObj, createBadge, navigate, orgData, setError, setOrgData]);

    // Run the transaction after it has been prepared by wagmi.
    // After the transaction is successful, POST badge to is_active,
    // set the new badge in orgData, and navigate to the badge page.
    useEffect(() => {
        if (
               createBadge.isSuccess 
            && !txPending
            && badgeObj?.ethereum_address
        ) {
            setTxPending(true);
            createBadgeTx();
        }
    }, [createBadge.isSuccess, txPending, badgeObj?.ethereum_address, createBadgeTx])

    // Set the badgeObj state when orgData is updated
    useEffect(() => {
        setBadgeObj((badgeObj) => ({
            ...badgeObj,
            ethereum_address: orgData?.ethereum_address,
            token_id: orgData?.badges?.length,
            organization: orgData?.id,
            account_bound: true,
            claimable: false,
            is_active: false,
            signer: orgData?.owner?.ethereum_address,
        }));
    }, [orgData, setBadgeObj])

    return (
        <div id="new-badge">
            <Header back={() => navigate(`/dashboard/organization/${orgData?.id}`)} />

            <h2>Create Badge</h2>

            <div style={{display: "grid", gridTemplateColumns: "min-content auto"}}>
                <Switch
                    checked={accountBound}
                    setChecked={() => setAccountBound(!accountBound)}
                    label="Account Bound"
                />
            </div>
            
            <Input
                name="badge-name"
                label="Badge Name"
                required={true}
                value={badgeName}
                onChange={(event) => setBadgeName(event.target.value)}
            />

            <Input
                name="badge-description"
                label="Badge description"
                required={true}
                value={badgeDescription}
                onChange={(event) => setBadgeDescription(event.target.value)}
            />

            <Input
                name="Badge Image"
                accept="image/*"
                label="Badge Image"
                placeholder="Upload Badge Image"
                required={true}
                disabled={true}
                value={badgeImage.name}
                append={
                    <button
                        className="button-secondary"
                        onClick={() => imageInput.current.click()}
                    >
                        {badgeImage.name ? "CHANGE" : "UPLOAD"}
                    </button>
                }
            />
                <input
                    id="badge-image"
                    style={{ display: "none" }}
                    ref={imageInput}
                    accept="image/*"
                    type="file"
                    onChange={(event) => onImageUpload(event)}
                />

            <InputListCSV
                label={"Delegates"}
                inputList={badgeDelegates}
                setInputList={setBadgeDelegates}
            />

            <ActionBar help={
                'After creating a badge, you (or your delegates) can issue badges to team members.'
            } actions={actions} />
        </div>
    )
}

export default BadgeForm;