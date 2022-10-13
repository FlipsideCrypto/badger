import { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Header from "@components/Dashboard/Header/Header";
import HolderTable from "@components/Table/HolderTable";
import IconButton from "@components/Button/IconButton";
import InputListCSV from "@components/Dashboard/Form/InputListCSV";
import Select from "@components/Dashboard/Form/Select";

import { OrgContext } from "@components/Dashboard/Provider/OrgContextProvider";
import { ErrorContext } from "@components/Dashboard/Provider/ErrorContextProvider";
import { useManageBadgeOwnership, useSetDelegates } from "@hooks/useContracts";
import { patchBadgeRolesRequest } from "@utils/api_requests";

import "@style/Dashboard/Org/Badge.css";

const Badge = () => {
    const navigate = useNavigate();
    const { orgId, badgeId } = useParams();

    const [ isManage, setIsManage ] = useState(false);
    const [ membersToUpdate, setMembersToUpdate ] = useState([]);
    const [ selectedAction, setSelectedAction ] = useState("Mint");
    const [ callTransaction, setCallTransaction ] = useState("");
    const [ txPending, setTxPending ] = useState(false);
    const { orgData, setOrgData } = useContext(OrgContext);
    const { setError } = useContext(ErrorContext);
    const badgeIndex = orgData?.badges.findIndex(badge => badge.id === parseInt(badgeId));
    const [ badge, setBadge ] = useState(orgData?.badges[badgeIndex]);

    const setDelegates = useSetDelegates(
        callTransaction === "setDelegates",
        orgData?.ethereum_address,          // orgAddress
        badge?.token_id,                    // tokenId array
        membersToUpdate,                    // address array
        selectedAction,                     // mint, revoke, add or remove leaders
    );
    const manageOwnership = useManageBadgeOwnership(
        callTransaction === "manageOwnership",
        orgData?.ethereum_address,          // orgAddress
        badge?.token_id,                    // tokenId array
        membersToUpdate,                    // address array
        selectedAction,                     // mint, revoke, add or remove leaders
        1                                   // amount of each token
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

    const onButtonClick = async () => {
        const method = selectedAction === "Mint" || selectedAction === "Revoke" ? 
            "manageOwnership" : "setDelegates";

        setCallTransaction(method);
    }

    // Update the badge array after the transaction is completed, POST 
    // out to the API, update our orgData context, and reset call transaction flag.
    const onMembersUpdate = useCallback(async () => {
        if (!badge.users) badge.users = [];

        membersToUpdate.forEach(member => {
            if (selectedAction === "Revoke") {
                const index = badge.users.findIndex(user => user.ethereum_address === member);
                badge.users.splice(index, 1);
            }
            else if (selectedAction === "Mint") {
                badge.users.push({ethereum_address: member});
            }
        })

        const response = await patchBadgeRolesRequest(badge, orgId)
        if (response.error)
            setError('Adding members to database failed: ' + response.error);
        else
            setOrgData(orgData => {orgData.badges[badgeIndex] = response; return {...orgData}});

        setCallTransaction("");
        setTxPending(false);
    }, [badge, membersToUpdate, selectedAction, orgId, setError, setOrgData, badgeIndex]);

    // Update the badge array after the transaction is completed, POST 
    // out to the API, update our orgData context, and reset call transaction flag.
    const onDelegatesUpdate = useCallback(async () => {
        if (!badge.delegates) badge.delegates = [];

        membersToUpdate.forEach(member => {
            if (selectedAction === "Remove Leader") {
                const index = badge.delegates.findIndex(delegate => delegate.ethereum_address === member);
                badge.delegates.splice(index, 1);
            }
            else if (selectedAction === "Add Leader") {
                badge.delegates.push({ethereum_address: member});
            }
        })

        const response = await patchBadgeRolesRequest(badge, orgId)
        if (response.error)
            setError('Adding delegates to database failed: ' + response.error);        
        else
            setOrgData(orgData => {orgData.badges[badgeIndex] = response; return {...orgData}});

        setCallTransaction("");
        setTxPending(false);
    }, [badge, badgeIndex, membersToUpdate, orgId, selectedAction, setError, setOrgData]);

   const runTransaction = useCallback(async () => {
        setTxPending(true);
        let tx;
        try {
            if (setDelegates.isSuccess)
                tx = await setDelegates.write?.()
            else if (manageOwnership.isSuccess)
                tx = await manageOwnership.write?.()

            if (tx) {
                const txReceipt = await tx?.wait();
        
                if (txReceipt.status === 1) {
                    callTransaction === "manageOwnership" ? onMembersUpdate() : onDelegatesUpdate();
                }
            }
        } catch (error) {
            setError('Transaction failed: ' + error);
            setCallTransaction("")
        }
        setTxPending(false);
    }, [callTransaction, setDelegates, manageOwnership, setError, onMembersUpdate, onDelegatesUpdate]);

    // Run the transaction hook once it has been prepped. If successful, update the badge data.
    useEffect(() => {        
        if (callTransaction && !txPending) 
            runTransaction();
    }, [setDelegates.isSuccess, callTransaction, runTransaction, txPending])

    useEffect(() => {
        if (orgData?.badges[badgeIndex]) {
            setBadge(orgData?.badges[badgeIndex]);
        }
    }, [orgData, badgeIndex])

    return (
        <>
            <Header back={() => navigate(`/dashboard/organization/${orgId}`)} actions={actions} />

            <div id="badge">
                <div className="center__gutter">
                    <h1>{badge?.name}</h1>
                    {!isManage && badge?.name &&
                        <div className="badge__actions">
                            {/* Analytics page
                            <button 
                                className="button__unstyled badge__action" 
                                onClick={() => { navigate(`/dashboard/organization/${orgId}/badge/${badgeId}/analytics`)}}
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
                            onClick={onButtonClick}
                            style={{margin: "20px 0px 20px auto"}}
                            loading={txPending}
                        />
                    </>
                }

                {badge?.users && badge?.users.length > 0 &&
                    <HolderTable badge={badge} />
                }

                {(!badge?.users || badge?.users?.length < 1) && !isManage && 
                    <div className="org__container empty">
                        <h1>Your Organization is almost alive, it just needs members!</h1>
                        <p>
                            You've set up your Organization and your Badge. 
                            Now for the final step of sending the first set of keys to your team members.
                        </p>
                        <div style={{margin: 'auto'}}>
                            <IconButton 
                                icon={['fal', 'arrow-right']} 
                                text="DISTRIBUTE KEYS" 
                                onClick={() => setIsManage(true)}
                                style={{textAlign: "center"}}
                            />
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Badge