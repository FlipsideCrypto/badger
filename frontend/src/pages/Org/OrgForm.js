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

// TODO: Fix the contract hooks

const OrgForm = ({ isEdit = false }) => {
    const imageInput = useRef();
    const firstCharOfName = useRef();

    const navigate = useNavigate();

    const { orgId } = useParams();

    const { address } = useAccount();
    const { chain } = useNetwork();

    const { setError } = useContext(ErrorContext);

    const { organizations } = useUser();

    const { characterPFP } = usePFP();

    const org = organizations && organizations.find(org => String(org.id) === orgId);

    const [obj, setObj] = useState(org || initialOrgForm);

    const [image, setImage] = useState(null);

    const [txPending, setTxPending] = useState(false);

    const { useImageHash, useMetadataHash, pinImage, pinMetadata } = useIPFS();

    const { hash: deterministicImageHash } = useIPFSImageHash(customImage)

    const { hash: deterministicMetadataHash } = useIPFSMetadataHash({
        name: obj.name,
        description: obj.description,
        image: obj.image_hash || deterministicImageHash,
        attributes: obj.attributes
    })

    const objImage = obj.image_hash || deterministicImageHash;

    const isDisabled = !(obj.name && obj.symbol && obj.description && objImage);

    const createContract = useCreateOrg(
        !isDisabled && !isEdit,
        org,
        deterministicImageHash,
        deterministicMetadataHash,
        address,
        chain?.name
    )

    const updateOrg = useEditOrg(
        !isDisabled && isEdit && org.ethereum_address,
        org.ethereum_address,
        deterministicMetadataHash
    )

    const badger = useCallback(() => getBadgerAbi(chain.name), [chain]);
    const { image: generatedImage } = useCallback(() => characterPFP(obj.name), [obj.name]);

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
            // let newUserData = { ...userData };

            // const index = newUserData.organizations.findIndex((org) => org.id === response.id);
            // if (!newUserData.organizations || index === -1) {
            //     newUserData.organizations.push(response);
            // }
            // else {
            //     newUserData.organizations[index] = response;
            // }

            // setUserData(newUserData);
        }
        else {
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

    return (
        <div id="new-org">
            <Header back={() => navigate((isEdit ? `/dashboard/organization/${orgId}/` : '/dashboard/'))} />

            <h2 className="dashboard__margin__left">{isEdit ? "Update Organization" : "Create Organization"}</h2>

            <FormDrawer label="General" open={true}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridGap: "20px" }}>
                    <Input
                        name="orgName"
                        label="Name"
                        required={true}
                        value={obj.name || ""}
                        onChange={(e) => { setObj({ ...org, name: e.target.value, symbol: nameToSymbol(e.target.value) }) }}
                    />

                    <Input
                        name="orgSymbol"
                        label="Symbol"
                        required={false}
                        value={obj.symbol || ""}
                        onChange={(e) => setObj({ ...org, symbol: e.target.value })}
                    />
                </div>

                <Input
                    name="orgDescription"
                    label="Description"
                    required={true}
                    value={obj.description || ""}
                    onChange={(e) => setObj({ ...org, description: e.target.value })}
                />

                <FormActionBar
                    help={
                        `You can only set the on-chain name of your Organization once. 
                        After creation, you can update the off-chain name and description 
                        but you cannot change the name of the contract. Please make sure 
                        you are happy with it before submitting.`
                    }
                    helpStyle={{ maxWidth: "840px" }}
                />
            </FormDrawer>

            <FormDrawer label="Appearance" open={true}>
                <Input
                    name="Custom Image"
                    accept="image/*"
                    label="Custom Image"
                    placeholder="Upload Custom Organization Image"
                    disabled={true}
                    value={isCustomImage && customImage?.name ? customImage.name : "Choose file..."}
                    append={
                        <button
                            className="button-secondary"
                            onClick={() => imageInput.current.click()}
                            style={{ width: "auto" }}
                        >
                            {isCustomImage ?
                                "Change image" :
                                "Upload image"
                            }
                        </button>
                    }
                />
                <input
                    id="org-image"
                    style={{ display: "none" }}
                    ref={imageInput}
                    accept="image/*"
                    type="file"
                // onChange={(event) => { onCustomImageUpload(event.target.files[0]) }}
                />
            </FormDrawer>

            <FormActionBar
                help={"Badge creation occurs after your organization has been established."}
                actions={actions}
                style={{ marginInline: "30px" }}
            />

            <hr style={{ margin: "30px 20px 30px 20px", backgroundColor: "#EEEEF6", border: "none", height: "1px" }} />

            {isEdit && <OrgDangerZone orgAddress={org.ethereum_address} />}
        </div>
    )
}

export { OrgForm };