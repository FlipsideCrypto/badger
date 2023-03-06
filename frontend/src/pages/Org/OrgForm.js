import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useOrgForm, usePFP, useUser } from "@hooks";

import { initialOrgForm, FormActionBar, FormDrawer, Header, Input, OrgDangerZone } from "@components"

import { IPFS_GATEWAY_URL } from "@static";

import "@style/pages/OrgForm.css";

// TODO: Image handling still has some issues
// TODO: OrgDangerZone is a landmine that I am not yet ready to mount.

const getSymbol = (name) => {
    return name.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().substring(0, 5);
}

const OrgForm = ({ isEdit = false }) => {
    const imageInput = useRef();

    const navigate = useNavigate();

    const { chainId, orgAddress } = useParams();

    const { organization } = useUser({ chainId, orgAddress });

    const [obj, setObj] = useState(organization || initialOrgForm);
    const [image, setImage] = useState(null);

    const { characterPFP } = usePFP({ name: obj.name });

    const customImage = image || obj.image_hash;

    const activeImage = customImage || characterPFP;

    const imageURL = customImage && (image ? image.name : IPFS_GATEWAY_URL + obj.image_hash);

    const isDisabled = !(obj.name && obj.symbol && obj.description && activeImage);

    const { openOrgFormTx, isPrepared, isLoading } = useOrgForm({ obj, image: activeImage })

    const actions = [{
        text: `${isEdit ? "Save" : "Create"} organization`,
        icon: ["fal", "arrow-right"],
        loading: isLoading,
        disabled: isDisabled || !isPrepared,
        event: () => openOrgFormTx({
            onSuccess: ({ chain, receipt }) => {
                const orgAddress = receipt.logs[1]['address']

                navigate(`/dashboard/organization/${chain.id}/${orgAddress}/`);
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
            <Header back={() => navigate((isEdit ? `/dashboard/organization/${chainId}/${organization.ethereum_address}/` : '/dashboard/'))} />

            <h2 className="dashboard__content">{`${isEdit ? "Update" : "Create"} Organization`}</h2>

            <FormDrawer label="Information">
                <Input label="Name" value={obj.name || ""} onChange={onNameChange} />
                <Input label="Description" value={obj.description || ""} onChange={onDescriptionChange} />
            </FormDrawer>

            <FormDrawer label="Advanced" open={!!obj.image_hash}>
                <Input label="Custom Image" accept="image/*" disabled={true} append={
                    <button className="secondary" onClick={onImageUpload}>
                        {`${customImage ? "Update" : "Upload"} image`}
                    </button>}
                    value={imageURL || "Choose file..."} />

                <input ref={imageInput} type="file" accept="image/*" onChange={onImageChange} />
            </FormDrawer>

            <FormActionBar actions={actions} />

            {isEdit && <>
                <hr />

                <OrgDangerZone orgAddress={organization.ethereum_address} />
            </>}
        </>
    )
}

export { OrgForm };