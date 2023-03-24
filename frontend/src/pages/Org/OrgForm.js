import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    useDebounce,
    useOrgForm,
    usePFP,
    useUser,
    useIPFS,
    useIPFSImageHash,
    useIPFSMetadataHash,
} from "@hooks";

import { initialOrgForm, FormActionBar, FormDrawer, Header, Input, OrgDangerZone, SEO } from "@components"

import { IPFS_GATEWAY_URL } from "@static";

import "@style/pages/OrgForm.css";

// TODO: OrgDangerZone is a landmine that I am not yet ready to mount.

const getSymbol = (name) => {
    return name.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().substring(0, 5);
}

const OrgForm = ({ isEdit = false }) => {
    const imageInput = useRef();

    const navigate = useNavigate();

    const { chainId, orgAddress } = useParams();

    const { address, organization } = useUser({ chainId, orgAddress });

    const [image, setImage] = useState(null);

    const [obj, setObj] = useState(organization || initialOrgForm);

    const name = useDebounce(obj.name, 300);

    const description = useDebounce(obj.description, 300);

    const { pfp } = usePFP({ name, address });

    const customImage = image || obj.image_hash;

    const activeImage = customImage || pfp;

    const imageURL = customImage && (image ? image.name : IPFS_GATEWAY_URL + obj.image_hash);

    const isDebouncing = name !== obj.name || description !== obj.description;

    const isDisabled = isDebouncing || !(name && description && activeImage && obj.symbol);

    const { imageHash, ipfsImage } = useIPFSImageHash(activeImage)

    const { metadataHash, ipfsMetadata } = useIPFSMetadataHash({
        name: name,
        description: description,
        image: imageHash,
        attributes: obj.attributes
    })

    const { openOrgFormTx, isPrepared, isLoading } = useOrgForm({
        ...obj,
        name: name,
        imageHash: imageHash,
        contractHash: metadataHash
    })

    const { pinImage, pinMetadata } = useIPFS({
        image: ipfsImage,
        data: ipfsMetadata
    })

    const actions = [{
        text: "Create organization",
        loading: isLoading,
        disabled: isDisabled || !isPrepared,
        event: () => openOrgFormTx({
            onLoading: () => {
                pinImage();
                pinMetadata();
            },
            onSuccess: ({ chain, receipt }) => {
                if (orgAddress)
                    return navigate(`/dashboard/organization/${chainId}/${orgAddress}/`)

                const event = receipt.events.find((event) => event.name === "OrganizationCreated");

                if (!event) throw new Error("Error submitting transaction.");

                navigate(`/dashboard/organization/${chain.id}/${event.args.organization}/`);
            }
        })
    }]

    const onNameChange = (e) => {
        setObj({ ...obj, name: e.target.value, symbol: getSymbol(e.target.value) })
    }

    const onDescriptionChange = (e) => {
        setObj({ ...obj, description: e.target.value })
    }

    const onImageUpload = () => {
        imageInput.current.click();
    }

    const onImageChange = (e) => {
        const files = e.target.files[0];

        if (!files) return

        const reader = new FileReader();

        reader.readAsDataURL(files);

        reader.onload = () => { setImage(reader.result) };
    }

    return (
        <>
            <SEO
                title={`${isEdit ? "Update" : "Create"} ${obj?.name || "Organization"} // Badger`} />

            <Header
                back={() => navigate((isEdit
                    ? `/dashboard/organization/${chainId}/${organization.ethereum_address}/`
                    : '/dashboard/'))} />

            

            {/* <h2 className="dashboard__content">{`${isEdit ? "Update" : "Create"} Organization`}</h2>

            <FormDrawer label="Information">
                <Input label="Name" value={obj.name || ""} onChange={onNameChange} />
                <Input label="Description" value={obj.description || ""} onChange={onDescriptionChange} />
            </FormDrawer>

            <FormDrawer label="Advanced" open={!!obj.image_hash}>
                <Input label="Custom Image" accept="image/*" disabled={true} append={
                    <button className="secondary" onClick={onImageUpload}>
                        <span>{customImage ? "Update" : "Upload"}</span>
                    </button>}
                    value={imageURL || "Choose file..."} />

                <input ref={imageInput} type="file" accept="image/*" onChange={onImageChange} />
            </FormDrawer>

            <FormActionBar
                className={!isEdit && "actionFixed" || "full"}
                actions={actions}
            />

            {isEdit && <OrgDangerZone />} */}
        </>
    )
}

export { OrgForm };