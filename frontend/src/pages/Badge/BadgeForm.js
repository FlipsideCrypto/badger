import { useMemo, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    useUser,
    useBadgeForm,
    useIPFS,
    useIPFSImageHash,
    useIPFSMetadataHash,
    useBadgeArt,
    useDebounce
} from "@hooks";

import {
    DashboardLoader,
    FormActionBar,
    FormDrawer,
    initialBadgeForm,
    Input,
    Header,
    ImageLoader,
    Select,
    BadgeDangerZone,
    SEO
} from "@components";

import { IPFS_GATEWAY_URL } from "@static";

import "@style/pages/BadgeForm.css";

const BadgeFormContent = ({ chainId, orgAddress, organization, badges, badge, isEdit }) => {
    const imageInput = useRef();

    const navigate = useNavigate();

    const [obj, setObj] = useState(badge || initialBadgeForm);

    const [image, setImage] = useState(null);

    // TODO: This needs to be either added to the obj after
    //       cleaning it up or everything else comes out.
    const [isAccountBound, setIsAccountBound] = useState(true);

    const name = useDebounce(obj.name, 300);

    const description = useDebounce(obj.description, 300);

    const tokenId = obj.token_id || (badges && badges.length) || 0;

    const { badgeArt } = useBadgeArt({
        orgName: organization && organization.name,
        orgAddress: orgAddress,
        badgeName: name,
        tokenId
    })

    const shouldUseHash = obj.image_hash && (!isEdit || (isEdit && name === badge?.name));

    const activeImage = image || (shouldUseHash && obj.image_hash) || badgeArt;

    const { imageHash, ipfsImage } = useIPFSImageHash(activeImage);

    const { metadataHash, ipfsMetadata } = useIPFSMetadataHash({
        name,
        description,
        image: imageHash,
        attributes: obj.attributes
    })

    const {
        openBadgeFormTransaction,
        isPrepared,
        isLoading
    } = useBadgeForm({
        ...obj,
        imageHash: imageHash,
        uriHash: metadataHash,
        accountBound: isAccountBound,
        tokenId
    });

    const { pinImage, pinMetadata } = useIPFS({
        image: ipfsImage,
        data: ipfsMetadata
    })

    const activeImageURL = useMemo(() => {
        if (image) return URL.createObjectURL(image);

        if (shouldUseHash) return IPFS_GATEWAY_URL + obj.image_hash;

        if (badgeArt) return URL.createObjectURL(badgeArt);

        return null;
    }, [image, shouldUseHash, obj.image_hash, badgeArt]);

    const isDisabled = useMemo(() => {
        const isDebouncing = name !== obj.name || description !== obj.description;

        return isDebouncing || !(name && description && activeImage);
    }, [name, description, activeImage, obj.name, obj.description]);

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

                const id = event.args.id;

                navigate(`/dashboard/organization/${chainId}/${orgAddress}/badge/${id}/`);
            }
        })
    }]

    const onNameChange = async (event) => {
        setObj(obj => ({ ...obj, name: event.target.value }));
    }

    const onDescriptionChange = (event) => {
        setObj(obj => ({ ...obj, description: event.target.value }));
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

    return (<>
        <SEO title={`
            ${isEdit ? "Update" : "Create"} 
            ${`${organization?.name} //` || ""}
            ${name || "Badge"} // Badger`}
        />

        <h2>{isEdit ? "Update" : "Create"} Badge</h2>

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
            className={!isEdit && ("actionFixed" || "full")}
            help={'After creating a badge, you (or your managers) can issue badges to team members.'}
            actions={actions}
        />

        {isEdit && <BadgeDangerZone badge={badge} />}
    </>)
}

const BadgeForm = ({ isEdit = false }) => {
    const navigate = useNavigate();

    const { chainId, orgAddress, badgeId } = useParams();

    const {
        address,
        organization,
        badges,
        badge,
        canManage,
        retrieve
    } = useUser({ chainId, orgAddress, badgeId });

    console.log('rendered badge form')

    return (
        <>
            <SEO
                title={`${isEdit ? "Update" : "Create"} Badge // Badger`} />

            <Header back={() => {
                navigate(isEdit
                    ? `/dashboard/organization/${chainId}/${orgAddress}/badge/${badgeId}/`
                    : `/dashboard/organization/${chainId}/${orgAddress}/`);
            }} />

            <DashboardLoader
                chainId={chainId}
                orgAddress={orgAddress}
                obj={!isEdit ? { name: "" } : badge}
                retrieve={retrieve}
                managed={isEdit}
                canManage={canManage}>
                <BadgeFormContent
                    chainId={chainId}
                    address={address}
                    orgAddress={orgAddress}
                    badgeId={badgeId}
                    organization={organization}
                    badges={badges}
                    badge={badge}
                    isEdit={isEdit} />
            </DashboardLoader>
        </>
    )
}

export { BadgeForm };