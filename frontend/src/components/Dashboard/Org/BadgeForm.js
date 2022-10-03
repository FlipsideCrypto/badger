import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "@components/Dashboard/Header/Header";
import ActionBar from "@components/Dashboard/Form/ActionBar";
import Input from "@components/Dashboard/Form/Input";
import InputListCSV from "@components/Dashboard/Form/InputListCSV";

import { OrgContext } from "@components/Dashboard/Provider/OrgContextProvider";

// TODO: Check the orgData context and if the badge is in it then
//       get the badge and set the state, and change component to "edit mode". (also get rid of props)
const BadgeForm = ({name, desc, image, delegates}) => {
    const [badgeName, setBadgeName] = useState(name || "");
    const [badgeDescription, setBadgeDescription] = useState(desc || "");
    const [badgeImage, setBadgeImage] = useState(image || {name: ""});
    const [badgeDelegates, setBadgeDelegates] = useState(delegates || [""]);
    
    const imageInput = useRef();
    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const orgId = params.get("orgId");
    const { orgData, setOrgData } = useContext(OrgContext);

    const actions = [
        {
            text: "CREATE BADGE",
            icon: ["fal", "arrow-right"],
            event: () => onCreateBadge()
        }
    ]

    // TODO: Post request and return badge id
    // POSTS badge to the database, adds badge to OrgData state 
    // and returns badge id.
    const onCreateBadge = () => {
        const badgeId = 0;

        const badgeObj = {
            id: badgeId,
            name: badgeName,
            description: badgeDescription,
            image: badgeImage,
        }

        console.log('Creating badge', badgeObj)

        let prev = {...orgData}
        prev.badges.push(badgeObj)
        setOrgData(prev)

        navigate(`/dashboard/badge?orgId=${orgId}&badgeId=${badgeId}`);
    }

    useEffect(() => {
        if (!orgData) navigate("/dashboard/");
    }, [orgData, navigate])

    return (
        <div id="new-badge">
            <Header back={() => navigate("/dashboard/")} />

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