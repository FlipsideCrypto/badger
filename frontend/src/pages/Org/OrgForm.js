import { useState, useContext, useRef, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNetwork, useAccount } from "wagmi";

import { ErrorContext } from "@contexts";

import { getBadgerAbi, useCreateOrg, useEditOrg, useIPFS, useIPFSImageHash, useIPFSMetadataHash, usePFP, useUser } from "@hooks";

import { FormActionBar, FormDrawer, initialOrgForm, Input, Header, OrgDangerZone } from "@components"

import { postOrgRequest } from "@utils";

const nameToSymbol = (name) => {
    return name.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().substring(0, 5);
}

// TODO: Finalize the implementation of image handling
// TODO: Fix the contract hooks

const OrgForm = ({ isEdit = false }) => {
    const imageInput = useRef();

    const navigate = useNavigate();

    const { orgId } = useParams();

    const { address } = useAccount();
    const { chain } = useNetwork();

    const { organization } = useUser({ orgId });

    const { setError } = useContext(ErrorContext);

    const [obj, setObj] = useState(organization || initialOrgForm);
    const [image, setImage] = useState(null);

    const [txPending, setTxPending] = useState(false);

    const { characterPFP: generatedImage } = usePFP({ name: obj.name });

    const { hash: deterministicImageHash } = useIPFSImageHash(image || generatedImage);

    const objImage = obj.image_hash || deterministicImageHash;

    const imageHashArgs = {
        name: obj.name,
        description: obj.description,
        image: objImage,
        attributes: obj.attributes
    }

    const { hash: deterministicMetadataHash } = useIPFSMetadataHash(imageHashArgs)

    const { pinImage, pinMetadata } = useIPFS({
        image: image || generatedImage,
        data: imageHashArgs
    })

    const isCustomImage = obj.image_hash !== null || image !== null;

    const isDisabled = !(obj.name && obj.symbol && obj.description && (obj.image_hash || objImage));

    // TODO Refactor this into a hook
    // openCreateOrgTxModal
    // openUpdateOrgTxModal
    // onSuccess
    // onError
    const createContract = useCreateOrg(
        !isDisabled && !isEdit,
        obj,
        deterministicImageHash,
        deterministicMetadataHash,
        address,
        chain?.name
    )

    const updateOrg = useEditOrg(
        !isDisabled && isEdit && organization.ethereum_address,
        organization.ethereum_address,
        deterministicMetadataHash
    )

    const badger = useCallback(() => getBadgerAbi(chain.name), [chain]);

    const actions = [{
        text: isEdit ? "Update organization" : "Create organization",
        icon: ["fal", "arrow-right"],
        loading: txPending,
        disabled: isEdit ? !updateOrg.isSuccess : !createContract.isSuccess,
        event: isEdit ? () => updateOrgTx() : () => createOrgTx()
    }]

    // Awaits a prepared transaction before running it.
    const createOrgTx = async () => {
        setTxPending(true);
        try {
            let tx = await createContract.write?.();

            // Await the txReceipt, image hash, and metadata hash in parallel.
            const [txReceipt, imageHash, metadataHash] = await Promise.all([
                tx.wait(),
                pinImage(objImage),
                pinMetadata({
                    name: obj.name,
                    description: obj.description,
                    imageHash: objImage,
                })
            ])

            if (txReceipt.status !== 1) throw new Error(createContract?.error);

            // Decode the transaction receipt to get the contract address from the event.
            const orgCreatedTopic = badger.abi.getEventTopic("OrganizationCreated");

            const orgCreatedEvent = txReceipt.logs.find((log) => log.topics[0] === orgCreatedTopic);
            const orgEvent = badger.abi.decodeEventLog("OrganizationCreated", orgCreatedEvent.data, orgCreatedEvent.topics);
            const contractAddress = orgEvent.organization;

            const org = {
                ...org,
                ethereum_address: contractAddress,
                contract_uri_hash: metadataHash,
                image_hash: imageHash,
                chain: chain.name,
                owner: address,
                is_active: true
            }

            const response = await postOrg(org);
            navigate(`/dashboard/organization/${response.id}`);
        }
        catch (error) {
            setError({
                label: 'Error creating Org',
                message: error
            });
            setTxPending(false);
        }
    }

    const updateOrgTx = async () => {
        setTxPending(true);
        try {
            let tx = await updateOrg.write?.();
            // Await the txReceipt, image hash, and metadata hash in parallel.
            const [txReceipt, imageHash, metadataHash] = await Promise.all([
                tx.wait(),
                pinImage(objImage),
                pinMetadata({
                    name: obj.name,
                    description: obj.description,
                    imageHash: objImage,
                })
            ])

            if (txReceipt.status !== 1)
                throw new Error(updateOrg?.error);

            const org = {
                ...org,
                contract_uri_hash: metadataHash,
                image_hash: imageHash,
            }
            const response = await postOrg(org);

            setObj(response);
            // TODO: Success message!
            setTxPending(false);
            navigate(`/dashboard/organization/${response.id}`);
        }
        catch (error) {
            setError({
                label: 'Error updating Org',
                message: error
            });
            setTxPending(false);
        }
    }

    // Post the org Obj to the backend once the contract address is added.
    const postOrg = useCallback(async (org) => {
        const response = await postOrgRequest(org);

        if (!response?.error && response?.id) {
            console.log('Successful org post');
        } else {
            setError({
                label: 'Could not add org to database',
                message: response.error
            });
        }

        return response;
    }, [setError]);

    // If we have a silent error from preparing the transaction, display it.
    useEffect(() => {
        setError(null);
        if (createContract?.error || updateOrg?.error) {
            setError({
                label: 'Error managing the Org',
                message: createContract?.error || updateOrg?.error
            })
        }
    }, [updateOrg.error, createContract.error, setError])

    const onNameChange = (e) => {
        setObj({ ...obj, name: e.target.value, symbol: nameToSymbol(e.target.value) })
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