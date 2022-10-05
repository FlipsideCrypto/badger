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

    const params = new URLSearchParams(window.location.search);
    const orgId = params.get("orgId");

    const actions = [
        {
            text: "CREATE BADGE",
            icon: ["fal", "arrow-right"],
            event: () => CreateBadge()
        }
    ]

    // TODO: Post request and return badge id
    // POSTS badge to the database, adds badge to OrgData state 
    // and returns badge id.
    const CreateBadge = async () => {
        const badgeObj = {
            name: badgeName,
            description: badgeDescription,
            image: badgeImage,
            delegates: badgeDelegates,
            account_bound: false,
        }

        const response = await postBadgeRequest(badgeObj);
        badgeObj.id = response.id

        // These are unimplemented on the front end for now.
        const dummyPaymentToken = [
            0,      // TOKEN_TYPE tokenType;
            "",     // address tokenAddress;
            0,      // uint256 tokenId;
            0       // uint256 quantity;
        ]
        const dummySigner = "";
        const accountBound = false;

        const createBadge = useCreateBadge(
            badgeObj.id,              // uint256 _id
            accountBound,             // bool _accountBound
            dummySigner,              // address _signer
            "uri",                    // string memory _uri
            dummyPaymentToken,        // PaymentToken memory _paymentToken
            badgeObj.delegates        // address[] memory _leaders
        )
        createBadge.transaction.write();

        let prev = {...orgData}
        prev.badges.push(badgeObj)
        setOrgData(prev)

        navigate(`/dashboard/badge?orgId=${orgId}&badgeId=${badgeObj.id}`);
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