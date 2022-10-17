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

// TODO: Clean and validate badgeDelegates array
// TODO: Move all state vars into a reducer?
const BadgeForm = () => {
    const [ badgeName, setBadgeName ] = useState("");
    const [ badgeDescription, setBadgeDescription ] = useState("");
    const [ badgeImage, setBadgeImage ] = useState({name: ""});
    const [ badgeDelegates, setBadgeDelegates ] = useState([]);
    const [ ipfsImageHash, setIpfsImageHash ] = useState();
    const [ accountBound, setAccountBound ] = useState(true);

    const [ imageUploading, setImageUploading ] = useState(false);
    const [ txPending, setTxPending ] = useState(false);
    const [ txCalled, setTxCalled ] = useState(false);

    const { orgData, setOrgData } = useContext(OrgContext);
    const { setError } = useContext(ErrorContext);

    const imageInput = useRef();
    const navigate = useNavigate();
    
    let badgeRef = useRef({
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
        // payment_token: ["paymentKey", 0],
    })

    const createBadge = useCreateBadge(badgeRef.current);
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
            setError({
                label: 'Error creating token URI',
                message: response.error
            });
        }
        
        badgeRef.current = {
            ...badgeRef.current,
            name: badgeName,
            description: badgeDescription,
            delegates: badgeDelegates,
            token_uri: response.hash,
            account_bound: accountBound,
        }
        setTxCalled(true);
    }

    // Post the badge to the backend for IPFS upload.
    const onImageUpload = async (event) => {
        const image = event.target.files[0]
        setBadgeImage(image)
        
        setImageUploading(true);
        const response = await postIPFSImage(image)
        if (response.error) {
            setError({
                label: 'Could not upload image to IPFS',
                message: response.error
            });
        }
        setImageUploading(false);
        setIpfsImageHash(response.hash)
        badgeRef.current.image_hash = response.hash;
    }

    // Write to contract
    const createBadgeTx = useCallback(async () => {
        try {
            let tx = await createBadge.write?.();
            tx = await tx?.wait();

            if (tx.status !== 1)
                throw new Error(createBadge.error);

            // Post to database
            const response = await postBadgeRequest(badgeRef.current);
            // if POST is successful
            if (!response.error) {
                // Set in orgData context
                let prev = {...orgData}
                prev.badges.push(response)
                setOrgData(prev)
                badgeRef.current = response;
                navigate(`/dashboard/organization/${orgData?.id}/badge/${response.id}`);
            }
            else {
                throw new Error('Could not add badge to database ' + response.error);
            }
        }
        catch (error) {
            setError({
                label:'Error creating badge',
                message: error
            });
            setTxPending(false);
        }

    }, [createBadge, navigate, orgData, setError, setOrgData]);

    // Run the transaction after it has been prepared by wagmi.
    // After the transaction is successful, POST badge to is_active,
    // set the new badge in orgData, and navigate to the badge page.
    useEffect(() => {
        if (
               createBadge.isSuccess
            && !txPending
            && txCalled
        ) {
            setTxCalled(false);
            setTxPending(true);
            createBadgeTx();
        }
    }, [createBadge.isSuccess, txPending, txCalled, createBadgeTx])

    // Set the badge when orgData is updated
    useEffect(() => {
        badgeRef.current = {
            ...badgeRef.current,
            ethereum_address: orgData?.ethereum_address,
            token_id: orgData?.badges?.length,
            organization: orgData?.id,
            signer: orgData?.owner?.ethereum_address,
        }
    }, [orgData])

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
                        style={{width: "100px", padding: "0px"}}
                    >
                        {imageUploading ?
                            "LOADING..." :
                            badgeImage?.name ? 
                                "CHANGE" : 
                                "UPLOAD"
                        }
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