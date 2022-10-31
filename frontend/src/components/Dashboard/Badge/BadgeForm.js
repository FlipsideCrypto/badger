import { useState, useRef, useContext, useEffect, useCallback, useReducer } from "react";
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
import { FormReducer, initialBadgeForm } from "@components/Dashboard/Form/FormReducer";

import { postBadgeRequest, postIPFSImage, postIPFSMetadata, getBadgeImage } from "@utils/api_requests";
import { useCreateBadge } from "@hooks/useContracts";

import "@style/Dashboard/Badge/BadgeForm.css";

const BadgeForm = () => {
    const { orgData, setOrgData } = useContext(OrgContext);
    const { setError } = useContext(ErrorContext);
    const [ badge, badgeDispatch ] = useReducer(FormReducer, initialBadgeForm(orgData));
    
    const [ badgeImage, setBadgeImage] = useState();
    const [ badgeImagePreview, setBadgeImagePreview ] = useState();
    const [ imageUploading, setImageUploading ] = useState(false);
    const [ areAddressesValid, setAreAddressesValid ] = useState(true);
    const [ signerIsValid, setSignerIsValid ] = useState(true);
    const [ txPending, setTxPending ] = useState(false);

    const navigate = useNavigate();
    const imageInput = useRef();

    const createBadge = useCreateBadge(badge.saveState === "saved", badge);
    const saveDisabled = 
        !badge.name || 
        !badge.description || 
        !areAddressesValid || 
        !signerIsValid ||
        badge.save_state === "saved"
    
    const actions = [
        {
            text: "SAVE",
            icon: ["fal", "save"],
            disabled: saveDisabled,
            loading: badge.save_state === "pending",
            event: () => onBadgeFormSave()
        },
        {
            text: "CREATE BADGE",
            icon: ["fal", "arrow-right"],
            disabled: badge.save_state !== "saved" || !createBadge.isSuccess,
            loading: txPending,
            event: () => createBadgeTx()
        }
    ]
    
    // Updates generative image and Name field
    const onNameChange = async (event) => {
        badgeDispatch({type: "SET", field: "name", payload: event.target.value});
        
        const response = await getBadgeImage(
            orgData?.name, 
            orgData?.ethereum_address, 
            orgData?.badges?.length, 
            event.target.value
        );
        if (response.error) {
            setError(response.error);
            return;
        }
        setBadgeImage(response)

        URL.revokeObjectURL(badgeImagePreview);
        setBadgeImagePreview(URL.createObjectURL(response));
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
        badgeDispatch({type: "SET", field: "image_hash", payload: response.hash});
        setImageUploading(false);
    }

    // Save 
    const onBadgeFormSave = async () => {
        badgeDispatch({type: "SET", field: "save_state", payload: "pending"});
        // Get the token uri
        const response = await postIPFSMetadata(badge);

        if (response.error) {
            setError({
                label: 'Error creating token URI',
                message: response.error
            });
            return;
        }

        badgeDispatch({type: "SET_MULTIPLE", payload: {'token_uri': response.uri, 'save_state': 'saved'}});
    }

    // Post the badge to the backend for IPFS upload.
    const onCustomImageUpload = async (image) => {
        setBadgeImage(image)
        URL.revokeObjectURL(badgeImagePreview);
        setBadgeImagePreview(URL.createObjectURL(image));
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
        setTxPending(true);
        try {
            let tx = await createBadge.write?.();
            tx = await tx?.wait();

            if (tx.status !== 1)
                throw new Error(createBadge.error);

            // Post to database
            const response = await postBadgeRequest(badge);
            // if POST is successful
            if (!response.error) {
                // Set in orgData context
                let prev = {...orgData}
                prev.badges.push(response)
                setOrgData(prev)
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

    }, [createBadge, navigate, orgData, setError, setOrgData, badge]);

    // Set the badge when orgData is updated
    useEffect(() => {
        const payload = {
            ethereum_address: orgData?.ethereum_address,
            token_id: orgData?.badges?.length,
            organization: orgData?.id,
        }

        badgeDispatch({type: "SET_MULTIPLE", payload: payload});
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
            setBadgeImagePreview(URL.createObjectURL(response));
        }

        if (orgData && !badgeImagePreview) {
            getPlaceholderImage();
        }
        // Only want to run this once once the OrgData is retrieved.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orgData])

    // If any of the IPFS metadata fields change, set saved state to unsaved.
    // This is to ensure someone does not save, and then change fields before running
    // the transaction with stale data.
    useEffect(() => {
        badgeDispatch({type: "SET", field: "save_state", payload: "unsaved"});
    }, [
        badge.name, 
        badge.description, 
        badge.attributes,
        badgeImage
    ])

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
                            placeholder="Name"
                            required={true}
                            value={badge.name}
                            onChange={(event) => onNameChange(event)}
                            onBlur={() => pinImage(badgeImage)}
                        />

                        <Input
                            name="badge-description"
                            label="Badge description"
                            placeholder="Description"
                            required={true}
                            value={badge.description}
                            onChange={(event) => badgeDispatch(
                                {type: "SET", field: "description", payload: event.target.value}
                            )}
                        />

                        <InputListKeyValue
                            label="Attributes"
                            required={false}
                            inputList={badge.attributes}
                            listKey={"attributes"}
                            dispatch={badgeDispatch}
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
                                src={badgeImagePreview}
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
                        value={badge.account_bound ? "Yes" : "No"}
                        setValue={(event) => badgeDispatch({
                            type: "SET", 
                            field: "account_bound", 
                            payload: event.target.value === "Yes" ? true : false
                        })}
                    />

                    <Select
                        label="Claimable"
                        options={["Yes", "No"]}
                        value={badge.claimable ? "Yes" : "No"}
                        setValue={(event) => badgeDispatch({
                            type: "SET", 
                            field: "claimable", 
                            payload: event.target.value === "Yes" ? true : false
                        })}
                    />
                </div>

                <Input
                    label="Signer"
                    className={signerIsValid ? 
                        "form__list__address" : "form__list__address error"
                    }
                    placeholder="0x0000..."
                    required={false}
                    value={badge.signer}
                    onChange={(event) => badgeDispatch(
                        {type: "SET", field: "signer", payload: event.target.value}    
                    )}
                    onBlur={onSignerBlur}
                />
                <InputListCSV
                    label={"Managers"}
                    inputList={badge.delegates}
                    dispatch={badgeDispatch}
                    listKey={"delegates"}
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