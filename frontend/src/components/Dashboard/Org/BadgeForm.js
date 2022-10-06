import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "@components/Dashboard/Header/Header";
import ActionBar from "@components/Dashboard/Form/ActionBar";
import Input from "@components/Dashboard/Form/Input";
import InputListCSV from "@components/Dashboard/Form/InputListCSV";
import { OrgContext } from "@components/Dashboard/Provider/OrgContextProvider";

import { IPFS_GATEWAY_URL } from "@static/constants/links"
import { postBadgeRequest, postIPFSImage, postIPFSMetadata } from "@utils/api_requests";
import { useCreateBadge } from "@hooks/useContracts";

// TODO: EDIT MODE: Check the orgData context and if the badge is in it then
//       get the badge and set the state, and change component to edit mode. (also get rid of props
// TODO: This is a lot of state vars. Probably worth it to move everything into one badge dict.
// TODO: Clean and validate badgeDelegates array
const BadgeForm = ({name, desc, image, delegates}) => {
    const [ badgeName, setBadgeName ] = useState(name || "");
    const [ badgeDescription, setBadgeDescription ] = useState(desc || "");
    const [ badgeImage, setBadgeImage ] = useState(image || {name: ""});
    const [ badgeDelegates, setBadgeDelegates ] = useState(delegates || []);
    const [ ipfsImageHash, setIpfsImageHash ] = useState();
    const { orgData, setOrgData } = useContext(OrgContext);
    
    const [ badgeObj, setBadgeObj ] = useState({
        name: badgeName,
        description: badgeDescription,
        delegates: badgeDelegates,
        image_hash: ipfsImageHash,
        contract_address: orgData?.ethereum_address,
        token_id: orgData?.badges?.length,
        organization: orgData?.id,
        account_bound: false,
        is_active: false,
        signer: "",
        token_uri: "",
        payment_token: [0, "", 0, 0],
    })
    
    const imageInput = useRef();
    const navigate = useNavigate();

    const params = new URLSearchParams(window.location.search);
    const orgId = params.get("orgId");

    const createBadge = useCreateBadge(badgeObj)
    const disabled = !badgeName || !badgeDescription || !ipfsImageHash
    
    const actions = [
        {
            text: "CREATE BADGE",
            icon: ["fal", "arrow-right"],
            event: () => onBadgeFormSubmission(),
            disabled: disabled
        }
    ]
    
    // Form submission just gets the final uri hash and sets the token_uri in the badgeObj
    // The transaction and rest of the flow is handled within the useEffect and createBadgeTx(),
    // As we have to await the transaction to be prepared by wagmi before calling it.
    const onBadgeFormSubmission = async () => {
        // Get the token uri
        const metadata_response = await postIPFSMetadata(badgeObj);
        const token_uri = `${IPFS_GATEWAY_URL}/${metadata_response.hash}`
        setBadgeObj({
            ...badgeObj, 
            token_uri: token_uri,
            name: badgeName,
            description: badgeDescription,
            delegates: badgeDelegates,
            image_hash: ipfsImageHash,
        })
    }

    const onImageUpload = async (event) => {
        const image = event.target.files[0]
        setBadgeImage(image)
        
        const response = await postIPFSImage(image)
        setIpfsImageHash(response.hash)
        setBadgeObj({...badgeObj, image_hash: response.hash})
    }

    // Run the transaction after it has been prepared by wagmi.
    // After the transaction is successful, POST badge to is_active,
    // set the new badge in orgData, and navigate to the badge page.
    useEffect(() => {
        console.log('createBadge', createBadge.response)
        async function createBadgeTx() {
            if (createBadge.response.status === "success") {
                // Write to contract
                console.log('is write prepared', createBadge)
                let tx = createBadge.write?.();
                tx = await tx?.wait();
                console.log('Transaction receipt', tx)

                // if transaction successful,
                // badgeObj.is_active = true;

                // Post to database
                const response = await postBadgeRequest(badgeObj);
                badgeObj.url = response.url

                if (response?.url) {
                    // Set in orgData context
                    let prev = {...orgData}
                    prev.badges.push(badgeObj)
                    setOrgData(prev)
                    navigate(`/dashboard/badge?orgId=${orgId}&badgeId=${badgeObj.token_id}`);
                }
                else {
                    console.log('Error creating badge.')
                }
            }
        }

        createBadgeTx();
    }, [createBadge.response]) // Consider ignoring eslint here to just put createBadge in.

    useEffect(() => {
        if (!orgData) navigate("/dashboard/");
    }, [orgData, navigate])

    return (
        <div id="new-badge">
            <Header back={() => navigate(`/dashboard/organization?orgId=${orgId}`)} />

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
                    onChange={(event) => onImageUpload(event)}
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