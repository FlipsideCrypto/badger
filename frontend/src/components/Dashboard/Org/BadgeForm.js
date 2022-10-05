import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "@components/Dashboard/Header/Header";
import ActionBar from "@components/Dashboard/Form/ActionBar";
import Input from "@components/Dashboard/Form/Input";
import InputListCSV from "@components/Dashboard/Form/InputListCSV";
import { OrgContext } from "@components/Dashboard/Provider/OrgContextProvider";

import { postBadgeRequest } from "@utils/api_requests";
import { useCreateBadge } from "@hooks/useContracts";

// TODO: EDIT MODE: Check the orgData context and if the badge is in it then
//       get the badge and set the state, and change component to edit mode. (also get rid of props)
const BadgeForm = ({name, desc, image, delegates}) => {
    const [ badgeName, setBadgeName ] = useState(name || "");
    const [ badgeDescription, setBadgeDescription ] = useState(desc || "");
    const [ badgeImage, setBadgeImage ] = useState(image || {name: ""});
    const [ badgeDelegates, setBadgeDelegates ] = useState(delegates || [""]);
    
    const { orgData, setOrgData } = useContext(OrgContext);
    const imageInput = useRef();
    const navigate = useNavigate();
    
    let badgeArgs = {
        contract_address: orgData?.ethereum_address,
        id: null,
        account_bound: false,
        signer: "",
        uri: "",
        payment_token: [0, "", 0, 0],
        delegates: badgeDelegates
    }
    const createBadge = useCreateBadge(badgeArgs)
    
    const params = new URLSearchParams(window.location.search);
    const orgId = params.get("orgId");

    const actions = [
        {
            text: "CREATE BADGE",
            icon: ["fal", "arrow-right"],
            event: () => onBadgeFormSubmission()
        }
    ]

    // TODO: Post request and return badge id
    // POSTS badge to the database, adds badge to OrgData state 
    // and returns badge id.
    const onBadgeFormSubmission = async () => {
        const badgeObj = {
            name: badgeName,
            description: badgeDescription,
            image: badgeImage,
            delegates: badgeDelegates,
            account_bound: false,
        }

        const response = await postBadgeRequest(badgeObj);
        if (response?.id) {
            badgeArgs.id = response.id
    
            // TODO: Wait for confirmation
            let tx = createBadge.transaction.write();
            tx = await tx.wait();
            console.log('Transaction receipt', tx)
    
            // TODO: PATCH request for is_active?
            let prev = {...orgData}
            prev.badges.push(badgeObj)
            setOrgData(prev)
            navigate(`/dashboard/badge?orgId=${orgId}&badgeId=${badgeObj.id}`);
        }
        else {
            console.log('Error creating badge.')
        }
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