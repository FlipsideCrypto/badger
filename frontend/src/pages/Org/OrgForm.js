import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useIPFSImageHash, useIPFSMetadataHash, useOrgForm, usePFP, useUser } from "@hooks";

import { FormActionBar, FormDrawer, initialOrgForm, Input, Header, OrgDangerZone } from "@components"

const getSymbol = (name) => {
    return name.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().substring(0, 5);
}

// TODO: Uploading a new image for an existing org will not work because the image hash is the first check

const OrgForm = ({ isEdit = false }) => {
    const imageInput = useRef();

    const navigate = useNavigate();

    const { orgId } = useParams();

    const { organization } = useUser({ orgId });

    const [obj, setObj] = useState(organization || initialOrgForm);
    const [image, setImage] = useState(null);

    const { characterPFP } = usePFP({ name: obj.name });

    const { hash: deterministicImageHash } = useIPFSImageHash(image || characterPFP);

    const objImage = obj.image_hash || deterministicImageHash;

    const objMetadata = {
        name: obj.name,
        description: obj.description,
        image: objImage,
        attributes: obj.attributes
    }

    const { hash: deterministicMetadataHash } = useIPFSMetadataHash(objMetadata)

    const isCustomImage = obj.image_hash !== null || image !== null;

    const isDisabled = !(obj.name && obj.symbol && obj.description && (obj.image_hash || objImage));

    const { openOrgFormTx, isPrepared, isLoading, isSuccess } = useOrgForm({
        enabled: !isDisabled && (isEdit && organization.ethereum_address || !isEdit),
        address: obj.ethereum_address,
        name: obj.name,
        symbol: obj.symbol,
        image: objImage,
        metadata: objMetadata,
        imageHash: obj.image_hash || deterministicImageHash,
        contractHash: deterministicMetadataHash
    })

    const actions = [{
        text: `${isEdit ? "Update" : "Create"} organization`,
        icon: ["fal", "arrow-right"],
        loading: isLoading,
        disabled: isDisabled || !isPrepared,
        event: openOrgFormTx
    }]

    const onNameChange = (e) => {
        setObj({ ...obj, name: e.target.value, symbol: getSymbol(e.target.value) })
    }

    const onSymbolChange = (e) => {
        if (e.target.value.length > 4) return;

        setObj({ ...obj, symbol: e.target.value })
    }

    const onDescriptionChange = (e) => {
        setObj({ ...obj, description: e.target.value })
    }

    const onImageChange = (e) => {
        const files = e.target.files[0];

        if (!files) return

        const reader = new FileReader();

        reader.readAsDataURL(files);
        reader.onload = () => { setImage(reader.result) };
    }

    return (
        <div id="new-org">
            <Header back={() => navigate((isEdit ? `/dashboard/organization/${orgId}/` : '/dashboard/'))} />

            <h2 className="dashboard__margin__left">{isEdit ? "Update Organization" : "Create Organization"}</h2>

            <FormDrawer label="General" open={true}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "20px" }}>
                    <Input name="orgName" label="Name" required={true}
                        value={obj.name || ""} onChange={onNameChange} />

                    <Input name="orgSymbol" label="Symbol" required={true}
                        value={obj.symbol || ""} onChange={onSymbolChange} />
                </div>

                <Input name="orgDescription" label="Description" required={true}
                    value={obj.description || ""} onChange={onDescriptionChange}
                />

                <FormActionBar help={`You can only set the on-chain name of your Organization once. After creation, you can update the off-chain name and description but you cannot change the name of the contract. Please make sure you are happy with it before submitting.`}
                    helpStyle={{ maxWidth: "840px" }} />
            </FormDrawer>

            <FormDrawer label="Appearance" open={true}>
                <Input
                    name="Custom Image"
                    accept="image/*"
                    label="Custom Image"
                    placeholder="Upload Custom Organization Image"
                    disabled={true}
                    value={isCustomImage && image?.name ? image.name : "Choose file..."}
                    append={<button className="button-secondary" style={{ width: "auto" }} onClick={() => imageInput.current.click()} >
                        {isCustomImage ? "Change image" : "Upload image"}
                    </button>}
                />

                <input id="org-image" ref={imageInput} accept="image/*" type="file" style={{ display: "none" }} onChange={onImageChange} />
            </FormDrawer>

            <FormActionBar actions={actions} style={{ marginInline: "30px" }}
                help={"Badge creation occurs after your organization has been established."} />

            <hr style={{ margin: "30px 20px 30px 20px", backgroundColor: "#EEEEF6", border: "none", height: "1px" }} />

            {isEdit && <OrgDangerZone orgAddress={organization.ethereum_address} />}
        </div>
    )
}

export { OrgForm };