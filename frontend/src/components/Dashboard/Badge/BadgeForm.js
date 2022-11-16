import { useState, useRef, useContext, useEffect, useReducer, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ethers } from "ethers";

import Header from "@components/Dashboard/Header/Header";
import ActionBar from "@components/Dashboard/Form/ActionBar";
import Input from "@components/Dashboard/Form/Input";
import Select from "@components/Dashboard/Form/Select";
import FormDrawer from "@components/Dashboard/Form/FormDrawer";
import InputListCSV from "@components/Dashboard/Form/InputListCSV";
import InputListKeyValue from "@components/Dashboard/Form/InputListKeyValue";
import ImageLoader from "@components/Dashboard/Utils/ImageLoader";
// import BadgeDangerZone from "@components/Dashboard/Badge/BadgeDangerZone";
import { UserContext } from "@components/Dashboard/Provider/UserContextProvider";
import { OrgContext } from "@components/Dashboard/Provider/OrgContextProvider";
import { ErrorContext } from "@components/Dashboard/Provider/ErrorContextProvider";
import { FormReducer, initialBadgeForm } from "@components/Dashboard/Form/FormReducer";

import { postBadgeRequest, postIPFSImage, postIPFSMetadata, getBadgeImage } from "@utils/api_requests";
import { useSetBadge } from "@hooks/contracts/useContracts";
import { useIPFSImageHash, useIPFSMetadataHash } from "@hooks/useIpfsHash";

import "@style/Dashboard/Badge/BadgeForm.css";

const BadgeForm = ({isEdit = false}) => {
    const { userData, setUserData } = useContext(UserContext);
    const { orgData } = useContext(OrgContext);
    const { setError } = useContext(ErrorContext);
    const [ badge, badgeDispatch ] = useReducer(FormReducer, initialBadgeForm);
    
    const navigate = useNavigate();
    const imageInput = useRef();
    const badgeId = parseInt(useParams().badgeId);
    
    const [ badgeImage, setBadgeImage] = useState();
    const [ badgeImagePreview, setBadgeImagePreview ] = useState();
    const [ isCustomImage, setIsCustomImage ] = useState(false);
    const [ areAddressesValid, setAreAddressesValid ] = useState(true);
    const [ signerIsValid, setSignerIsValid ] = useState(true);
    const [ txPending, setTxPending ] = useState(false);

    const badgeIndex = useMemo(() => {
        return orgData?.badges?.findIndex(badge => badge.id === badgeId);
    }, [orgData, badgeId])

    const badgeData = useMemo(() => {
        return orgData?.badges?.[badgeIndex];
    }, [orgData, badgeIndex])

    // Determine the IPFS hashes before hand so the transaction can be prepared ASAP
    // without actively pinning or waiting for the hashes to be returned.
    const { hash: deterministicImageHash } = useIPFSImageHash(badgeImage);

    const hashArgs = isEdit ? {
        name: badge.name,
        description: badge.description,
        image: isCustomImage ? deterministicImageHash : badgeData?.image_hash,
        attributes: badge.attributes
    } : {
        name: badge.name,
        description: badge.description,
        image: deterministicImageHash,
        attributes: badge.attributes
    }
    const { hash: deterministicMetadataHash } = useIPFSMetadataHash({ ...hashArgs });

    const isDisabled = useMemo(() => {
        return (
            !badge.name ||
            !badge.description ||
            !areAddressesValid ||
            !signerIsValid ||
            (!deterministicImageHash && !badgeData?.image_hash)
        )
    }, [badge, areAddressesValid, signerIsValid, deterministicImageHash, badgeData?.image_hash])

    const setBadge = useSetBadge(
       !isDisabled, 
       orgData.ethereum_address,
       badgeImage ? deterministicMetadataHash : badgeData?.token_uri, 
       badge
    );
       
    const actions = [
        {
            text: isEdit ? "Update badge" : "Create badge",
            icon: ["fal", "arrow-right"],
            disabled: !setBadge.isSuccess,
            loading: txPending,
            event: () => setBadgeTx()
        }
    ]
    
    // Updates generative image and Name field
    const onNameChange = async (event) => {
        badgeDispatch({type: "SET", field: "name", payload: event.target.value});
        
        // if custom image is present do not generate an image.
        if (isCustomImage || isEdit) return;

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
        if (!isCustomImage && isEdit) return badgeData.image_hash

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

    // On signer change check if the signer is valid and if they are checksum the address.
    const onSignerChange = (event) => {
        const address = event.target.value.trim();
        badgeDispatch({type: "SET", field: "signer", payload: address});

        // An empty address is valid as it is caught in the contract hooks.
        if (address === "") {
            setSignerIsValid(true);
            return;
        }
        // Save an RPC call if the address is not correct length.
        if (address.length !== 42) {
            setSignerIsValid(false);
            return;
        }

        const isValid = ethers.utils.isAddress(address);
        setSignerIsValid(isValid);
    }

    // Write to contract
    const setBadgeTx = async () => {
        setTxPending(true);
        try {
            let tx = await setBadge.write?.();
            // Pin metadata and run transaction in parallel.
            const [txReceipt, imageHash, metadataHash] = await Promise.all([
                tx.wait(),
                pinImage(badgeImage),
                pinMetadata(badgeImage ? deterministicImageHash : badgeData?.image_hash)
            ])

            if (txReceipt.status !== 1)
                throw new Error(setBadge.error);

            // Post to database
            const postData = {
                ...badge, 
                image_hash: imageHash, 
                token_uri: metadataHash
            };
            
            const response = await postBadge(postData);
            setTxPending(false);
            navigate(`/dashboard/organization/${orgData?.id}/badge/${response.id}`);
        }
        catch (error) {
            setError({
                label:'Error creating badge',
                message: error
            });
            setTxPending(false);
        }
    }

    const postBadge = async(badge) => {
        const response = await postBadgeRequest(badge);
        if (response.error) {
            setError({
                label: 'Could not add badge to database',
                message: response.error
            });
            return;
        }

        let newUserData = {...userData}
        const orgIndex = newUserData.organizations.findIndex(org => org.id === orgData.id);
        if (badgeIndex === -1) {
            newUserData.organizations[orgIndex].badges.push(response);
        }
        else {
            newUserData.organizations[orgIndex].badges[badgeIndex] = response;
        }
        badgeDispatch({type: "SET_MULTIPLE", payload: response});
        setUserData(newUserData)

        return response;
    }

    // Set the relevant parent org data in badge state if we are creating a new badge.
    // useEffect(() => {
    //     if (!isEdit && !badge.token_id && orgData.ethereum_address) {
    //         const payload = {
    //             token_id: orgData?.badges?.length,
    //             ethereum_address: orgData?.ethereum_address,
    //             organization: orgData?.id
    //         }
    //         badgeDispatch({type: "SET_MULTIPLE", payload: payload});
    //     }
    // }, [orgData.ethereum_address])

    // Set the badge if editing and orgData was not fetched on render.
    useEffect(() => {
        if (orgData.name && !badge.id) {
            const index = orgData?.badges?.findIndex(b => b.id === badgeId);
            const orgBadge = orgData?.badges?.[index];

            const payload = {
                ...orgBadge,
                ethereum_address: orgData?.ethereum_address,
                token_id: index === -1 ? orgData?.badges?.length : orgBadge.token_id,
                organization: orgData?.id,
            }

            badgeDispatch({type: "SET_MULTIPLE", payload: payload});
        }
    }, [orgData, badge.id, badgeId])

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

        if (orgData && !badgeImagePreview && !isEdit) {
            getPlaceholderImage();
        }
        // Only want to run this once once the OrgData is retrieved.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orgData, isEdit])

    // If we have a silent error from preparing the transaction, display it.
    useEffect(() => {
        setError(null);
        if (setBadge?.error) {
            setError({
                label: 'Error creating Org',
                message: setBadge?.error
            })
        }
    }, [setBadge.error, setError])

    return (
        <>
            <Header 
                back={() => navigate(isEdit ?
                    `/dashboard/organization/${orgData?.id}/badge/${badgeId}` :
                    `/dashboard/organization/${orgData?.id}`
                )}
            />

            <h2 style={{marginLeft: "30px"}}>
                {isEdit ? "Update Badge" : "Create Badge"}
            </h2>

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
                                src={badgeImagePreview ?? badge.image_hash}
                                alt="Badge Preview"
                                prependGateway={Boolean(!badgeImagePreview)}
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
                    onChange={(event) => onSignerChange(event)}
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
                            {isCustomImage || isEdit ?
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
                style={{marginInline: "30px", marginBottom: "30px"}}
            />

            {/* <hr style={{margin: "30px 20px 30px 20px", backgroundColor: "#EEEEF6", border: "none", height: "1px"}} />
            {isEdit &&
                <BadgeDangerZone />
            } */}
        </>
    )
}

export default BadgeForm;