import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Header from "@components/Dashboard/Header/Header";
import HolderTable from "@components/Table/HolderTable";
import IconButton from "@components/Button/IconButton";
import InputListCSV from "@components/Dashboard/Form/InputListCSV";
import Select from "@components/Dashboard/Form/Select";

import { OrgContext } from "@components/Dashboard/Provider/OrgContextProvider";
import { useManageBadgeOwnership, useSetDelegates } from "@hooks/useContracts";

import "@style/Dashboard/Org/Badge.css";

const Badge = () => {
    const [ isManage, setIsManage ] = useState(false);
    const [ membersToUpdate, setMembersToUpdate ] = useState([]);
    const [ selectedAction, setSelectedAction ] = useState("Mint");
    const [ isTxReady, setIsTxReady ] = useState(false);

    const navigate = useNavigate();
    const params = new URLSearchParams(window.location.search);
    const orgId = params.get("orgId");
    const badgeId = params.get("badgeId");

    const { orgData, setOrgData } = useContext(OrgContext);
    const badgeIndex = orgData?.badges.findIndex(badge => badge.token_id === parseInt(badgeId));
    let badge = orgData?.badges[badgeIndex];
    console.log('badge', badge)

    const setDelegates = useSetDelegates(
        isTxReady,
        orgData?.ethereum_address,  // orgAddress
        badge?.token_id,          // tokenId array
        membersToUpdate,            // address array
        selectedAction,             // mint, revoke, add or remove leaders
    );
    const manageOwnership = useManageBadgeOwnership(
        isTxReady,
        orgData?.ethereum_address,  // orgAddress
        badge?.token_id,          // tokenId array
        membersToUpdate,            // address array
        selectedAction,             // mint, revoke, add or remove leaders
        1                           // amount of each token
    );

    const actions = [{
        text: "Manage",
        icon: ["fal", "fa-person"],
        event: () => setIsManage(!isManage)
    }]

    const selectActions = [
        "Mint",
        "Revoke",
        "Add Leader",
        "Remove Leader"
    ]

    // TODO: Hook up contract hooks and API PATCH
    const onBadgeUpdate = async () => {
        console.log("Members to Update", membersToUpdate)
        const method = selectedAction === "Mint" || selectedAction === "Revoke" ? 
            "manageOwnership" : "setDelegates";

        setIsTxReady(true);
        // const tx = selectedAction === "Mint" || selectedAction === "Revoke" ? 
        //     await manageOwnership.write?.() : await setDelegates.write?.();
        // const txReceipt = await tx?.wait();

        // if (txReceipt.status === 1) {
        //     console.log('Transaction successful!');

        // }

        method === "manageOwnership" ? onMembersUpdate() : onDelegatesUpdate();
    }

    const onMembersUpdate = () => {
        // Sometimes the users array is empty, so we need to check for that
        if (!badge.users) badge.users = [];

        membersToUpdate.forEach(member => {
            if (selectedAction === "Revoke") {
                const index = badge.users.findIndex(user => user.ethereum_address === member);
                badge.users.splice(index, 1);
            }
            else if (selectedAction === "Mint") {
                badge.users.push({ethereum_address: member});
            }
            setOrgData(orgData => {orgData.badges[badgeIndex] = badge; return {...orgData}});
        })
        // TODO: Post to API
    }

    const onDelegatesUpdate = () => {
        membersToUpdate.forEach(member => {
            if (selectedAction === "Remove Leader") {
                const index = badge.delegates.findIndex(delegate => delegate.ethereum_address === member);
                badge.delegates.splice(index, 1);
            }
            else if (selectedAction === "Add Leader") {
                badge.delegates.push({ethereum_address: member});
            }
            setOrgData(orgData => {orgData.badges[badgeIndex] = badge; return {...orgData}});
        })
        // TODO: Post to API
    }

    useEffect(() => {
        if (!orgData) navigate("/dashboard/");
    }, [orgData, navigate])

    return (
        <>
            <Header back={() => navigate(`/dashboard/badge/new?orgId=${orgId}`)} actions={actions} />

            <div id="badge">
                <div className="center__gutter">
                    <h1>{badge?.name}</h1>
                    {!isManage && badge?.name &&
                        <div className="badge__actions">
                            {/* TODO: Analytics page
                            <button 
                                className="button__unstyled badge__action" 
                                onClick={() => { navigate(`/dashboard/badge/analytics?orgId=${orgId}&badgeId=${badgeId}`)}}
                            >
                                <FontAwesomeIcon icon={["fal", "fa-chart-simple"]} />
                                <span>Analytics</span>
                            </button> 
                            */}
                        </div>
                    }
                </div>

                {isManage && 
                    <>
                        <Select 
                            label="Update Type"
                            options={selectActions} 
                            value={selectedAction}
                            setValue={(e) => setSelectedAction(e.target.value)}
                        />
                        <InputListCSV
                            label="Members to update"
                            inputList={membersToUpdate}
                            setInputList={setMembersToUpdate}
                        />
                        <IconButton
                            icon={['fal', 'arrow-right']} 
                            text="UPDATE MEMBERS" 
                            onClick={onBadgeUpdate}
                            style={{margin: "20px 0px 20px auto"}}
                        />
                    </>
                }

                {badge?.holders && badge?.holders.length > 0 ?
                    <HolderTable holders={badge.holders} />
                    :
                    <div className="org__container empty">
                        <h1>Your Organization is almost alive, it just needs members!</h1>
                        <p>
                            You've set up your Organization and your Badge. 
                            Now for the final step of sending the first set of keys to your team members.
                        </p>
                        <button onClick={() => setIsManage(true)}>
                            DISTRIBUTE KEYS
                        </button>
                    </div>
                }
            </div>
        </>
    )
}

export default Badge