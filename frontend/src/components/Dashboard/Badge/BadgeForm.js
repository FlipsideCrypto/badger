import { useState, useRef, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import Header from "@components/Dashboard/Header/Header";
import ActionBar from "@components/Dashboard/Form/ActionBar";
import Input from "@components/Dashboard/Form/Input";
import Select from "@components/Dashboard/Form/Select";
import FormDrawer from "@components/Dashboard/Form/FormDrawer";
import InputListCSV from "@components/Dashboard/Form/InputListCSV";
import InputListKeyValue from "@components/Dashboard/Form/InputListKeyValue";
import { OrgContext } from "@components/Dashboard/Provider/OrgContextProvider";
import { ErrorContext } from "@components/Dashboard/Provider/ErrorContextProvider";

import { postBadgeRequest, postIPFSImage, postIPFSMetadata, getBadgeImage } from "@utils/api_requests";
import { useCreateBadge } from "@hooks/useContracts";

import "@style/Dashboard/Badge/BadgeForm.css";

// TODO: Move all badge state vars into a reducer?
// TODO: There is way too much going on in this one component. Break it up and reduce state usage.
const BadgeForm = () => {
    const [ badgeName, setBadgeName ] = useState("");
    const [ badgeDescription, setBadgeDescription ] = useState("");
    const [ badgeAttributes, setBadgeAttributes ] = useState([{key: "", value: ""}]);
    const [ badgeImage, setBadgeImage ] = useState();
    const [ imagePreview, setImagePreview ] = useState();
    const [ badgeDelegates, setBadgeDelegates ] = useState([]);
    const [ ipfsImageHash, setIpfsImageHash ] = useState("");
    const [ accountBound, setAccountBound ] = useState("Yes");
    const [ claimable, setClaimable ] = useState("No");
    const [ signer, setSigner ] = useState("");
    const [ signerIsValid, setSignerIsValid ] = useState(true);

    const [ imageUploading, setImageUploading ] = useState(false);
    const [ areAddressesValid, setAreAddressesValid ] = useState(true);
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
        account_bound: accountBound === "Yes" ? true : false,
        claimable: claimable === "Yes" ? true : false,
        is_active: false,
        signer: orgData?.owner?.ethereum_address,
        // payment_token: ["paymentKey", 0],
    })

    const createBadge = useCreateBadge(
        txCalled, 
        badgeRef.current,
        orgData?.version
    );
    
    const disabled = !badgeName || !badgeDescription || !ipfsImageHash || !areAddressesValid || !signerIsValid;
    
    const actions = [
        {
            text: "CREATE BADGE",
            icon: ["fal", "arrow-right"],
            disabled: disabled,
            loading: txPending,
            event: () => onBadgeFormSubmission()
        }
    ]
    
    // Updates generative image and Name field
    const onNameChange = async (event) => {
        setBadgeName(event.target.value);
        const response = await getBadgeImage(
            orgData?.name, 
            orgData?.ethereum_address, 
            orgData?.badges?.length, 
            event.target.value
        );
        setBadgeImage(response)

        URL.revokeObjectURL(imagePreview);
        setImagePreview(URL.createObjectURL(response));
    }

    // Pin to IPFS
    const pinImage = async (image) => {
        setImageUploading(true);

        const response = await postIPFSImage(image);
        if (response.error) {
            setError({
                label: 'Could not upload image to IPFS',
                message: response.error
            });
        }
        setIpfsImageHash(response.hash);
        badgeRef.current.image_hash = response.hash;

        setImageUploading(false);
    }

    // Form submission just gets the final uri hash and sets the token_uri in the badgeObj
    // The transaction and rest of the flow is handled within the useEffect and createBadgeTx(),
    // As we have to await the transaction to be prepared by wagmi before calling it.
    const onBadgeFormSubmission = async () => {
        // Get the token uri
        const response = await postIPFSMetadata(
            badgeName, 
            badgeDescription, 
            ipfsImageHash, 
            badgeAttributes
        );

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
        }
        setTxCalled(true);
    }

    // Post the badge to the backend for IPFS upload.
    const onCustomImageUpload = async (image) => {
        setBadgeImage(image)
        URL.revokeObjectURL(imagePreview);
        setImagePreview(URL.createObjectURL(image));
        pinImage(image);
    }

    // When the signer address is not focused, validate the address.
    const onSignerBlur = (event) => {
        const address = event.target.value;
        const isValid = ethers.utils.isAddress(address);
        if (address && !isValid) setSignerIsValid(false);
        else setSignerIsValid(true);
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

    // Get the placeholder Badge Image once the component and orgData is mounted.
    useEffect(() => {
        async function getPlaceholderImage() {
            const response = await getBadgeImage(
                orgData?.name, 
                orgData?.ethereum_address, 
                orgData?.badges?.length, 
                "Badge Name"
            );

            if (response.error) {
                setError({
                    label: 'Could not get generated image',
                    message: response.error
                });
            }
            setBadgeImage(response);
            setImagePreview(URL.createObjectURL(response));
        }

        if (orgData && !imagePreview) {
            getPlaceholderImage();
        }
        // Only want to run this once once the OrgData is retrieved.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orgData])

    return (
        <>
            <Header back={() => navigate(`/dashboard/organization/${orgData?.id}`)} />

            <h2>Create Badge</h2>

            <FormDrawer label="General" open={true}>
                <div style={{display: 'grid', gridTemplateColumns: "10fr 2fr", gridColumnGap: "20px"}}>
                    <div>
                        <Input
                            name="badge-name"
                            label="Badge Name"
                            required={true}
                            value={badgeName}
                            onChange={(event) => onNameChange(event)}
                            onBlur={() => pinImage(badgeImage)}
                        />

                        <Input
                            name="badge-description"
                            label="Badge description"
                            required={true}
                            value={badgeDescription}
                            onChange={(event) => setBadgeDescription(event.target.value)}
                        />

                        <InputListKeyValue
                            label="Attributes"
                            required={false}
                            inputList={badgeAttributes}
                            setInputList={setBadgeAttributes}
                            keyPlaceholder="Name"
                            valuePlaceholder="Value"
                        />

                        <ActionBar
                            help={"You can always change the metadata of your Badge in the future."}
                        />
                    </div>
                    <div className="form__group" style={{gridTemplateRows: "min-content"}}>
                        <label className="form__label">Live Badge Preview</label>             
                        <div className="preview__container">
                            <img
                                className="preview__image"
                                src={imagePreview}
                                alt="Badge Preview"
                            />
                        </div>
                    </div>
                </div>
            </FormDrawer>

            <FormDrawer label="Access" open={false}>
                <div style={{display: 'grid', gridTemplateColumns: "1fr 1fr", gridColumnGap: "10px"}}>
                    <Select
                        label="Account Bound"
                        options={["Yes", "No"]}
                        value={accountBound}
                        setValue={(event) => {
                            setAccountBound(event.target.value);
                            badgeRef.current.account_bound = event.target.value === "Yes" ? true : false;
                        }}
                    />

                    <Select
                        label="Claimable"
                        options={["Yes", "No"]}
                        value={claimable}
                        setValue={(event) => {
                            setClaimable(event.target.value);
                            badgeRef.current.claimable = event.target.value === "Yes" ? true : false;
                        }}
                    />
                </div>

                <Input
                    label="Signer"
                    className={signerIsValid ? 
                        "form__list__address" : "form__list__address error"
                    }
                    required={false}
                    value={signer}
                    onChange={(event) => {
                        setSigner(event.target.value);
                        badgeRef.current.signer = event.target.value;
                    }}
                    onBlur={onSignerBlur}
                />
                <InputListCSV
                    label={"Managers"}
                    inputList={badgeDelegates}
                    setInputList={setBadgeDelegates}
                    setAreAddressesValid={setAreAddressesValid}
                />

            </FormDrawer>

            <FormDrawer label="Appearance" open={false}>
                <Input
                    name="Custom Image"
                    accept="image/*"
                    label="Custom Image"
                    placeholder="Upload Custom Image"
                    required={false}
                    disabled={true}
                    value={badgeImage?.name || ""}
                    append={
                        <button
                            className="button-secondary"
                            onClick={() => imageInput.current.click()}
                            style={{width: "100px", padding: "0px"}}
                        >
                            {imageUploading ?
                                "LOADING..." :
                                badgeImage ? 
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
                        onChange={(event) => onCustomImageUpload(event.target.files[0])}
                    />
            </FormDrawer>

            <ActionBar help={
                'After creating a badge, you (or your managers) can issue badges to team members.'
            } actions={actions} />
        </>
    )
}

export default BadgeForm;