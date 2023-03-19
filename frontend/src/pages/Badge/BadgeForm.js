import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    useUser,
    useBadgeForm,
    useIPFS,
    useIPFSImageHash,
    useIPFSMetadataHash,
    useBadgeArt
} from "@hooks";

import {
    FormActionBar,
    FormDrawer,
    initialBadgeForm,
    Input,
    Header,
    ImageLoader,
    Select
} from "@components";

import { IPFS_GATEWAY_URL } from "@static";

import "@style/pages/BadgeForm.css";

const BadgeForm = ({ isEdit = false }) => {
    const imageInput = useRef();

    const navigate = useNavigate();

    const { chainId, orgAddress, badgeId } = useParams();

    const { organization, badge } = useUser({ chainId, orgAddress, badgeId });

    const [obj, setObj] = useState(badge || initialBadgeForm);
    const [isAccountBound, setIsAccountBound] = useState(true); // TODO; This needs to be either added to the obj after cleaning it up or everything else comes out.

    const [image, setImage] = useState(null);

    const tokenId = obj.token_id || organization.badges.length

    const { badgeArt } = useBadgeArt({
        orgName: organization.name,
        orgAddress: organization.ethereum_address,
        badgeName: obj.name,
        tokenId
    })

    const activeImage = image || obj.image_hash || badgeArt;

    /// Prioritizes an uploaded image, then the ipfs gateway image, then the generated image
    const activeImageURL = image ? URL.createObjectURL(image) :
        obj.image_hash ? IPFS_GATEWAY_URL + obj.image_hash :
            badgeArt ? URL.createObjectURL(badgeArt) : null;

    const isDisabled = !(obj.name && obj.description && activeImage);

    const { imageHash, ipfsImage } = useIPFSImageHash(activeImage);

    const { metadataHash, ipfsMetadata } = useIPFSMetadataHash({
        name: obj.name,
        description: obj.description,
        image: imageHash,
        attributes: obj.attributes
    })

    const transactionParams = {
        ...obj,
        imageHash: imageHash,
        uriHash: metadataHash,
        accountBound: isAccountBound,
        tokenId
    }

    const {
        openBadgeFormTransaction,
        isPrepared,
        isLoading
    } = useBadgeForm({ obj: transactionParams });

    const { pinImage, pinMetadata } = useIPFS({
        image: ipfsImage,
        data: ipfsMetadata
    })

    const actions = [{
        text: isEdit ? "Update badge" : "Create badge",
        disabled: isDisabled || !isPrepared,
        loading: isLoading,
        event: () => openBadgeFormTransaction({
            onLoading: () => {
                pinImage();
                pinMetadata();
            },
            onSuccess: async ({ chain, receipt }) => {
                const event = receipt.events.find((event) => event.name === "URI");

                if (!event) throw new Error("Error submitting transaction.");

                console.log('receipt', receipt);

                navigate(`/dashboard/organization/${chainId}/${orgAddress}/`);
            }
        })
    }]

    const warningActions = [{
        className: "warning",
        text: "Revoke all",
        event: () => {

        }
    }]

    // Updates generative image and Name field
    const onNameChange = async (event) => {
        setObj({ ...obj, name: event.target.value });
    }

    const onDescriptionChange = (event) => {
        setObj({ ...obj, description: event.target.value });
    }

    const onCustomImageChange = (file, uploaded) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result)
        }
    }

    const onAccountBoundChange = (event) => {
        setIsAccountBound(event.target.value === "True");
    }

    return (
        <>
            <Header back={() => navigate(`/dashboard/organization/${chainId}/${orgAddress}`)} />

            <h2>
                {isEdit ? "Update Badge" : "Create Badge"}
            </h2>

            <FormDrawer label="General" open={true}>
                <div className="badge__form__general">
                    <div>
                        <Input
                            name="badge-name"
                            label="Name"
                            placeholder="Name"
                            required={true}
                            value={obj.name}
                            onChange={onNameChange}
                        />

                        <Input
                            name="badge-description"
                            label="Description"
                            placeholder="Description"
                            required={true}
                            value={obj.description}
                            onChange={onDescriptionChange}
                        />
                    </div>
                    <div className="form__group mobile__hidden" style={{ gridTemplateRows: "min-content" }}>
                        <label className="form__label">Live Badge Preview</label>
                        <div className="preview__container">
                            <ImageLoader
                                className="preview__image"
                                src={activeImageURL}
                                alt="Badge Preview"
                            />
                        </div>
                    </div>
                </div>
            </FormDrawer>

            <FormDrawer label="Advanced" open={false}>
                <Select
                    label="Account Bound"
                    options={['True', 'False']}
                    value={isAccountBound ? 'True' : 'False'}
                    setValue={onAccountBoundChange}
                />

                <Input
                    name="Custom Image"
                    accept="image/*"
                    label="Custom Image"
                    required={false}
                    disabled={true}
                    value={imageInput.current?.files[0]?.name ?? "Upload Custom Image"}
                    append={
                        <button className="secondary"
                            onClick={() => imageInput.current.click()}
                            style={{ width: "auto" }}
                        >
                            <span>{image ? "Change" : "Upload"}</span>
                        </button>
                    }
                />
                <input
                    id="badge-image"
                    style={{ display: "none" }}
                    ref={imageInput}
                    accept="image/*"
                    type="file"
                    onChange={(e) => onCustomImageChange(e.target.files[0], true)}
                />
            </FormDrawer>

            <FormActionBar
                className={isEdit == false && "actionFixed" || "full"}
                help={'After creating a badge, you (or your managers) can issue badges to team members.'}
                actions={actions}
            />

            {isEdit && <>
                <h1>Danger zone</h1>

                <FormActionBar
                    className="warning"
                    actions={warningActions}
                />
            </>}
        </>
    )
}

export { BadgeForm };