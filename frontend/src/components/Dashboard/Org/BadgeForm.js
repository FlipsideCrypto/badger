import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "@components/Dashboard/Header/Header";
import ActionBar from "@components/Dashboard/Form/ActionBar";
import Input from "@components/Dashboard/Form/Input";
import InputListCSV from "@components/Dashboard/Form/InputListCSV";

const BadgeForm = ({name, desc, image, delegates}) => {
    const [badgeName, setBadgeName] = useState(name);
    const [badgeDescription, setBadgeDescription] = useState(desc);
    const [badgeImage, setBadgeImage] = useState(image || {name: ""});
    const [badgeDelegates, setBadgeDelegates] = useState(delegates || [""]);

    const imageInput = useRef();
    const navigate = useNavigate();
    const { orgId } = useParams();

    const actions = [
        {
            text: "CREATE BADGE",
            icon: ["fal", "arrow-right"],
            event: () => onCreateBadge()
        }
    ]

    const onCreateBadge = () => {
        console.log("Badge Name:", badgeName)
        console.log("Badge Image:", badgeImage)
        console.log("Badge Delegates:", badgeDelegates)
        const id = 0;

        navigate(`/dashboard/badge/orgId=${orgId}&badgeId=${id}`);
    }

    const addBadgeToData = () => {

    }

    return (
        <div id="new-badge">
            <Header back={() => navigate(-1)} />

            <h2>Create Badge</h2>
            <Input
                name="badge-name"
                label="Badge Name"
                required={true}
                value={badgeName}
                onChange={(event) => setBadgeName(event.target.value)}
            />

            <Input
                name="badge-description"
                label="Badge description"
                required={true}
                value={badgeDescription}
                onChange={(event) => setBadgeDescription(event.target.value)}
            />

            <Input
                name="Badge Image"
                accept="image/*"
                label="Badge Image"
                placeholder="Upload Badge Image"
                disabled={true}
                value={badgeImage.name}
                append={
                    <button
                        className="button-secondary"
                        onClick={() => imageInput.current.click()}
                    >
                        {badgeImage.name ? "CHANGE" : "UPLOAD"}
                    </button>
                }
            />
                <input
                    id="badge-image"
                    style={{ display: "none" }}
                    ref={imageInput}
                    accept="image/*"
                    type="file"
                    onChange={(event) => setBadgeImage(event.target.files[0])}
                />

            <InputListCSV
                label={"Delegates"}
                inputList={badgeDelegates}
                setInputList={setBadgeDelegates}
            />

            <ActionBar help={
                'After creating a badge, you (or your delegates) can issue badges to team members.'
            } actions={actions} />
        </div>
    )
}

export default BadgeForm;