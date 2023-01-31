import { useState, useRef, useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";

// import BadgeDangerZone from "@components/Badge/BadgeDangerZone";
import { ErrorContext } from "@contexts";

import { useSetBadge, useIPFSImageHash, useIPFSMetadataHash, useUser } from "@hooks";

import {
    FormActionBar, FormDrawer, FormReducer, initialBadgeForm, Input, 
    InputAddress, InputListCSV, InputListKeyValue, Header, ImageLoader, Select
} from "@components";

import {
    postBadgeRequest, postIPFSImage, postIPFSMetadata, getBadgeImage, getAttributesFromHash
} from "@utils";

import "@style/pages/BadgeForm.css";

const BadgeForm = ({ isEdit = false }) => {
    const imageInput = useRef();
    
    const navigate = useNavigate();

    const { orgId, badgeId } = useParams();

    const { setError } = useContext(ErrorContext);

    const { authenticatedAddress, chain, organization, badge } = useUser({ orgId, badgeId });

    const [ obj, dispatchObj ] = useReducer(FormReducer, badge || initialBadgeForm);
    const [ image, setImage ] = useState(null);

    const [ txPending, setTxPending ] = useState(false);

    const actions = [
        // {
        //     text: isEdit ? "Update badge" : "Create badge",
        //     icon: ["fal", "arrow-right"],
        //     disabled: !setBadge.isSuccess,
        //     loading: txPending,
        //     event: () => setBadgeTx()
        // }
    ]
    
    // Updates generative image and Name field
    const onNameChange = async (event) => {
        dispatchObj({ type: "SET", field: "name", value: event.target.value });

        const response = await getBadgeImage(
            organization?.name,
            organization?.ethereum_address,
            organization?.badges?.length,
            event.target.value
        );

        onCustomImageChange(response);
    }

    const onDescriptionChange = (event) => {
        dispatchObj({ type: "SET", field: "description", value: event.target.value });
    }

    const onSignerChange = (event) => {
        dispatchObj({ type: "SET", field: "signer", value: event.target.value });
    }

    const onAccountBoundChange = (event) => {
        dispatchObj({ 
            type: "SET", 
            field: "account_bound", 
            value: event.target.value === "Yes" ? true : false 
        });
    }

    const onClaimableChange = (event) => {
        dispatchObj({
            type: "SET",
            field: "claimable",
            value: event.target.value === "Yes" ? true : false
        });
    }

    const onCustomImageChange = (file) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage({
                name: file.name,
                url: reader.result
            });
        }
    }

    return (
        <>
            <Header back={() => navigate(
                isEdit ? `/dashboard/organization/${organization?.id}/badge/${badgeId}` : `/dashboard/organization/${organization?.id}`
            )}/>

            <h2 style={{ marginLeft: "30px" }}>
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

                        <InputListKeyValue
                            label="Attributes"
                            listKey="attributes"
                            keyPlaceholder="Name"
                            valuePlaceholder="Value"
                            required={false}
                            state={obj}
                            dispatch={dispatchObj}
                        />

                        <FormActionBar
                            help={"You can always change the metadata of your Badge in the future."}
                        />
                    </div>
                    <div className="form__group" style={{ gridTemplateRows: "min-content" }}>
                        <label className="form__label">Live Badge Preview</label>
                        <div className="preview__container">
                            <ImageLoader
                                className="preview__image"
                                src={image?.url ?? obj.image_hash}
                                alt="Badge Preview"
                                prependGateway={Boolean(!image?.url)}
                            />
                        </div>
                    </div>
                </div>
            </FormDrawer>

            <FormDrawer label="Access" open={false}>
                <div className="badge__form__access">
                    <Select
                        label="Account Bound"
                        options={["Yes", "No"]}
                        value={obj.account_bound ? "Yes" : "No"}
                        setValue={onAccountBoundChange}
                    />

                    <Select
                        label="Claimable"
                        options={["Yes", "No"]}
                        value={obj.claimable ? "Yes" : "No"}
                        setValue={onClaimableChange}
                    />
                </div>

                <InputAddress
                    label="Signer"
                    placeholder="0x0000..."
                    required={false}
                    value={obj.signer}
                    setValue={onSignerChange}
                />

                {/* TODO: Add this back once reducer decision is made
                {!isEdit &&
                    <InputListCSV
                        label={"Managers"}
                        inputList={badge.delegates}
                        dispatch={badgeDispatch}
                        listKey={"delegates"}
                        setAreAddressesValid={setAreAddressesValid}
                    />
                } */}
            </FormDrawer>

            <FormDrawer label="Appearance" open={false}>
                <Input
                    name="Custom Image"
                    accept="image/*"
                    label="Custom Image"
                    placeholder={image?.file.name ?? "Upload Custom Image"}
                    required={false}
                    disabled={true}
                    value={image?.name ?? ""}
                    append={
                        <button className="secondary"
                            onClick={() => imageInput.current.click()}
                            style={{ width: "auto" }}
                        >
                            {image?.name ?
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
                    onChange={(e) => onCustomImageChange(e.target.files[0])}
                />
            </FormDrawer>

            <FormActionBar
                help={
                    'After creating a badge, you (or your managers) can issue badges to team members.'
                }
                actions={actions}
                style={{ marginInline: "30px", marginBottom: "30px" }}
            />

            {/* <hr style={{margin: "30px 20px 30px 20px", backgroundColor: "#EEEEF6", border: "none", height: "1px"}} />
            {isEdit &&
                <BadgeDangerZone />
            } */}
        </>
    )
}

export { BadgeForm };