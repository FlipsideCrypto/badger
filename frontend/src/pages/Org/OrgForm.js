import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useOrgForm, usePFP, useUser } from "@hooks";

import { FormActionBar, FormDrawer, initialOrgForm, Input, Header, OrgDangerZone } from "@components"

import { IPFS_GATEWAY_URL } from "@static";

import "@style/pages/OrgForm.css";

const getSymbol = (name) => {
    return name.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().substring(0, 5);
}

// TODO: Properly display the image name on the input

const OrgForm = ({ isEdit = false }) => {
    const imageInput = useRef();

    const navigate = useNavigate();

    const { orgId } = useParams();

    const { organization } = useUser({ orgId });

    const [obj, setObj] = useState(organization || initialOrgForm);
    const [image, setImage] = useState(null);

    const { characterPFP } = usePFP({ name: obj.name });

    const customImage = image || obj.image_hash;

    const activeImage = customImage || characterPFP;

    const imageURL = customImage && (image ? image : IPFS_GATEWAY_URL + obj.image_hash);

    const isDisabled = !(obj.name && obj.symbol && obj.description && activeImage);

    const { openOrgFormTx, isPrepared, isLoading } = useOrgForm({
        obj,
        image: activeImage
    })

    const actions = [{
        text: `${isEdit ? "Save" : "Create"} organization`,
        icon: ["fal", "arrow-right"],
        loading: isLoading,
        disabled: isDisabled || !isPrepared,
        event: () => openOrgFormTx({
            onSuccess: ({ org }) => { navigate(`/dashboard/organization/${org.id}/`) }
        })
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
            <Header back={() => navigate((isEdit ? `/dashboard/organization/${orgId}/` : '/dashboard/'))} />

            <div className="dashboard__content">
                <h2>{isEdit ? "Update Organization" : "Create Organization"}</h2>
            </div>

            <FormDrawer label="General">
                <div className="vanities">
                    <Input label="Name" value={obj.name || ""} onChange={onNameChange} />
                    <Input label="Symbol" value={obj.symbol || ""} onChange={onSymbolChange} />
                </div>

                <Input label="Description" value={obj.description || ""} onChange={onDescriptionChange} />
            </FormDrawer>

            <FormDrawer label="Appearance" open={!!obj.image_hash}>
                <Input label="Image" accept="image/*" disabled={true}
                    append={<button className="secondary" onClick={onImageUpload}>
                        {`${customImage ? "Update" : "Upload"} image`}
                    </button>}
                    value={imageURL || "Choose file..."} />

                <input ref={imageInput} accept="image/*" type="file" onChange={onImageChange} />
            </FormDrawer>

            <FormActionBar actions={actions} />

            <hr />

            {isEdit && <OrgDangerZone orgAddress={organization.ethereum_address} />}
        </>
    )
}

export { OrgForm };