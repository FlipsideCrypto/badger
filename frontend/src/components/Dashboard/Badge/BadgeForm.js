import { useState, useRef, useContext, useEffect, useReducer, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import Header from "@components/Dashboard/Header/Header";
import ActionBar from "@components/Dashboard/Form/ActionBar";
import Input from "@components/Dashboard/Form/Input";
import Select from "@components/Dashboard/Form/Select";
import FormDrawer from "@components/Dashboard/Form/FormDrawer";
import InputListCSV from "@components/Dashboard/Form/InputListCSV";
import InputListKeyValue from "@components/Dashboard/Form/InputListKeyValue";
import ImageLoader from "@components/Dashboard/Utils/ImageLoader";
import { OrgContext } from "@components/Dashboard/Provider/OrgContextProvider";
import { ErrorContext } from "@components/Dashboard/Provider/ErrorContextProvider";
import { FormReducer, initialBadgeForm } from "@components/Dashboard/Form/FormReducer";

import { postBadgeRequest, postIPFSImage, postIPFSMetadata, getBadgeImage } from "@utils/api_requests";
import { useCreateBadge } from "@hooks/useContracts";
import { useIPFSImageHash, useIPFSMetadataHash } from "@hooks/useIpfsHash";

import "@style/Dashboard/Badge/BadgeForm.css";

const BadgeForm = () => {
    const { orgData, setOrgData } = useContext(OrgContext);
    const { setError } = useContext(ErrorContext);
    const [ badge, badgeDispatch ] = useReducer(FormReducer, initialBadgeForm(orgData));
    
    const navigate = useNavigate();
    const imageInput = useRef();
    
    const [ badgeImage, setBadgeImage] = useState();
    const [ badgeImagePreview, setBadgeImagePreview ] = useState();
    const [ isCustomImage, setIsCustomImage ] = useState(false);
    const [ areAddressesValid, setAreAddressesValid ] = useState(true);
    const [ signerIsValid, setSignerIsValid ] = useState(true);
    const [ txPending, setTxPending ] = useState(false);

    const isDisabled = useMemo(() => {
        return (
            !badge.name ||
            !badge.description ||
            !areAddressesValid ||
            !signerIsValid
        )
    }, [badge, areAddressesValid, signerIsValid])

    // Determine the IPFS hashes before hand so the transaction can be prepared ASAP
    // without actively pinning or waiting for the hashes to be returned.
    const { hash: deterministicImageHash } = useIPFSImageHash(badgeImage);
    const { hash: deterministicMetadataHash } = useIPFSMetadataHash({
        name: badge.name,
        description: badge.description,
        image: deterministicImageHash,
        attributes: badge.attributes,
    });

    const createBadge = useCreateBadge(
       !isDisabled, 
       deterministicMetadataHash, 
       badge
    );
       
    const actions = [
        {
            text: "Create badge",
            icon: ["fal", "arrow-right"],
            disabled: !createBadge.isSuccess,
            loading: txPending,
            event: () => createBadgeTx()
        }
    ]
    
    // Updates generative image and Name field
    const onNameChange = async (event) => {
        badgeDispatch({type: "SET", field: "name", payload: event.target.value});
        
        // if custom image is present do not generate an image.
        if (isCustomImage) return;

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
        const response = await postIPFSImage(image);
        if (response.error) {
            setError({
                label: 'Could not upload image to IPFS',
                message: response.error
            });
            return;
        }

        return response.hash;
    }

    // Pin to IPFS
    const pinMetadata = async (imageHash) => {
        const response = await postIPFSMetadata({
            name: badge.name,
            description: badge.description,
            imageHash: imageHash,
            attributes: badge.attributes
        })

        if (response.error) {
            setError({
                label: 'Could not upload metadata to IPFS',
                message: response.error
            });
            return;
        }

        return response.hash;
    }

    // Post the badge to the backend for IPFS upload.
    const onCustomImageUpload = async (image) => {
        setIsCustomImage(true);
        setBadgeImage(image)
        URL.revokeObjectURL(badgeImagePreview);
        setBadgeImagePreview(URL.createObjectURL(image));
    }

    // When the signer address is not focused, validate the address.
    const onSignerBlur = (event) => {
        const address = event.target.value;
        const isValid = ethers.utils.isAddress(address);
        if (address && !isValid) setSignerIsValid(false);
        else setSignerIsValid(true);
    }

    // Write to contract
    const createBadgeTx = async () => {
        setTxPending(true);
        try {
            let tx = await createBadge.write?.();
            // Pin metadata and run transaction in parallel.
            const [txReceipt, imageHash, metadataHash] = await Promise.all([
                tx.wait(),
                pinImage(badgeImage),
                pinMetadata(deterministicImageHash)
            ])

            if (txReceipt.status !== 1)
                throw new Error(createBadge.error);

            // Post to database
            const postData = {
                ...badge, 
                image_hash: imageHash, 
                token_uri: metadataHash
            };
            const response = await postBadgeRequest(postData);
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
    }

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

    return (
        <>
            <Header back={() => navigate(`/dashboard/organization/${orgData?.id}`)} />

            <h2 style={{marginLeft: "30px"}}>Create Badge</h2>

            <FormDrawer label="General" open={true}>
                <div style={{display: 'grid', gridTemplateColumns: "10fr 2fr", gridColumnGap: "20px"}}>
                    <div>
                        <Input
                            name="badge-name"
                            label="Name"
                            placeholder="Name"
                            required={true}
                            value={badge.name}
                            onChange={(event) => onNameChange(event)}
                        />

                        <Input
                            name="badge-description"
                            label="Description"
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
                            <ImageLoader
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
                    value={isCustomImage && badgeImage?.name ? badgeImage.name : ""}
                    append={
                        <button
                            className="button-secondary"
                            onClick={() => imageInput.current.click()}
                            style={{width: "auto"}}
                        >
                            {isCustomImage ?
                                "Change image" : 
                                "Upload image"
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

            <ActionBar 
                help={
                    'After creating a badge, you (or your managers) can issue badges to team members.'
                } 
                actions={actions} 
                style={{marginInline: "30px"}}
            />
        </>
    )
}

export default BadgeForm;