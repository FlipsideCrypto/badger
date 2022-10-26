import { useState, useContext, useEffect, useCallback, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAccount } from "wagmi"

import Header from "@components/Dashboard/Header/Header";
import HolderTable from "@components/Table/HolderTable";
import IconButton from "@components/Button/IconButton";
import InputListCSV from "@components/Dashboard/Form/InputListCSV";
import Select from "@components/Dashboard/Form/Select";

import { OrgContext } from "@components/Dashboard/Provider/OrgContextProvider";
import { ErrorContext } from "@components/Dashboard/Provider/ErrorContextProvider";
import { FormReducer } from "@components/Dashboard/Form/FormReducer";
import { useManageBadgeOwnership, useSetDelegates } from "@hooks/useContracts";
import { putBadgeRolesRequest } from "@utils/api_requests";

import "@style/Dashboard/Badge/Badge.css";

const Badge = () => {
    const navigate = useNavigate();
    const { orgId, badgeId } = useParams();
    const { address } = useAccount();
    const { orgData, setOrgData } = useContext(OrgContext);
    const { setError } = useContext(ErrorContext);

    const [ isManage, setIsManage ] = useState(false);
    const [ areAddressesValid, setAreAddressesValid ] = useState(false);
    const [ selectedAction, setSelectedAction ] = useState("Mint");
    const [ txMethod, setTxMethod ] = useState("manageOwnership");
    const [ txPending, setTxPending ] = useState(false);
    const [ addressesToUpdate, dispatchAddresses ] = useReducer(FormReducer, {addresses: []});
    
    const badgeIndex = orgData?.badges?.findIndex(badge => badge.id === parseInt(badgeId));
    const [ badge, setBadge ] = useState(orgData?.badges?.[badgeIndex] || {});
    const isOwner = orgData?.owner?.ethereum_address === address;
    // find if the authenticated address is in one of the delegates.ethereum_address properties
    const isManager = badge?.delegates?.find(delegate => delegate.ethereum_address === address);

    const setDelegates = useSetDelegates(
        isOwner && areAddressesValid && txMethod === "setDelegates",
        orgData?.ethereum_address,          // orgAddress
        badge?.token_id,                    // tokenId array
        addressesToUpdate.addresses,        // address array
        selectedAction,                     // mint, revoke, add or remove leaders
    );

    const manageOwnership = useManageBadgeOwnership(
        areAddressesValid && txMethod === "manageOwnership",
        orgData?.ethereum_address,          // orgAddress
        badge?.token_id,                    // tokenId array
        addressesToUpdate.addresses,        // address array
        selectedAction,                     // mint, revoke, add or remove leaders
        1                                   // amount of each token
    );

    const actions = isOwner || isManager ? [{
        text: "Manage",
        icon: ["fal", "fa-person"],
        event: () => setIsManage(!isManage)
    }] : [];

    // Limit actions for Managers.
    const selectActions = isOwner ? [
        "Mint",
        "Revoke",
        "Add Manager",
        "Remove Manager"
    ] : ["Mint", "Revoke"]

    // When select option changes, set the controlled value and update the
    // method to determine function flow and to send to be further parsed
    // into single, bundle, or full bundle methods at the contract level.
    const onMethodChange = (event) => {
        const method = event.target.value
        setSelectedAction(method);
        if (method === "Mint" || method === "Revoke") {
            setTxMethod("manageOwnership");
        } else {
            setTxMethod("setDelegates");
        }
    }

    // Update the badge array after the transaction is completed, POST 
    // out to the API, update our orgData context, and reset call transaction flag.
    const onMembersUpdate = useCallback(async () => {
        let badgeObj = {...badge}
        if (!badgeObj.users) badge.users = [];

        addressesToUpdate.addresses.forEach(member => {
            if (selectedAction === "Revoke") {
                const index = badgeObj.users.findIndex(user => user.ethereum_address === member);
                badgeObj.users.splice(index, 1);
            }
            else if (selectedAction === "Mint") {
                badgeObj.users.push({ethereum_address: member});
            }
        })

        const response = await putBadgeRolesRequest(badgeObj, orgId)
        if (response.error)
            setError({
                label: 'Adding members to database failed',
                message: response.error
            });
        else {
            setBadge(response);
            setOrgData(orgData => {orgData.badges[badgeIndex] = response; return {...orgData}});
        }

        setTxPending(false);
    }, [badge, addressesToUpdate, selectedAction, orgId, setError, setOrgData, badgeIndex]);

    // Update the badge array after the transaction is completed, POST 
    // out to the API, update our orgData context, and reset call transaction flag.
    const onDelegatesUpdate = useCallback(async () => {
        let badgeObj = {...badge}
        if (!badgeObj.delegates) badge.delegates = [];
        
        addressesToUpdate.addresses.forEach(member => {
            if (selectedAction === "Remove Manager") {
                const index = badgeObj.delegates.findIndex(delegate => delegate.ethereum_address === member);
                badgeObj.delegates.splice(index, 1);
            }
            else if (selectedAction === "Add Manager") {
                badgeObj.delegates.push({ethereum_address: member});
            }
        })

        const response = await putBadgeRolesRequest(badgeObj, orgId)
        if (response.error) {
            setError({
                label: 'Adding managers to database failed',
                message: response.error
            });
        }
        else {
            setBadge(response);
            setOrgData(orgData => {orgData.badges[badgeIndex] = response; return {...orgData}});
        }

        setTxPending(false);
    }, [badge, badgeIndex, addressesToUpdate, orgId, selectedAction, setError, setOrgData]);

    // Manage the transaction write and clean up effects.
   const runTransaction = useCallback(async () => {
        setTxPending(true);

        let tx;
        try {
            if (txMethod === "manageOwnership")
                tx = await manageOwnership.write?.()
            else if (txMethod === "setDelegates") 
                tx = await setDelegates.write?.()

            if (tx) {
                const txReceipt = await tx?.wait();
                if (txReceipt.status !== 1)
                    throw new Error(setDelegates.error || manageOwnership.error);
                
                txMethod === "manageOwnership" ? onMembersUpdate() : onDelegatesUpdate();
            }
        } catch (error) {
            setError({
                label: 'Error managing members',
                message: error
            });
        }

        setTxPending(false);
    }, [txMethod, setDelegates, manageOwnership, setError, onMembersUpdate, onDelegatesUpdate]);

    // Set badge data if orgData has been updated.
    useEffect(() => {
        if (orgData?.badges?.[badgeIndex]) {
            setBadge(orgData?.badges[badgeIndex]);
        }
    }, [orgData, badgeIndex])

    return (
        <>
            <Header back={() => navigate(`/dashboard`)} actions={actions} />

            <div id="badge">
                <div className="center__gutter">
                    <h1>{badge?.name}</h1>
                </div>

                {isManage && (isOwner || isManager) &&
                    <>
                        <Select 
                            label="Update Type"
                            options={selectActions} 
                            value={selectedAction}
                            setValue={onMethodChange}
                        />
                        <InputListCSV
                            label="Members to Update"
                            inputList={addressesToUpdate.addresses}
                            listKey={"addresses"}
                            dispatch={dispatchAddresses}
                            setAreAddressesValid={setAreAddressesValid}
                        />
                        <IconButton
                            icon={['fal', 'arrow-right']} 
                            text={txMethod === "manageOwnership" ? "UPDATE MEMBERS" : "UPDATE MANAGERS"}
                            onClick={() => runTransaction()}
                            style={{margin: "20px 0px 20px auto"}}
                            loading={txPending}
                            disabled={txMethod === "manageOwnership" ? 
                                !manageOwnership.isSuccess : !setDelegates.isSuccess
                            }
                        />
                    </>
                }

                {(badge?.users?.length > 0 || badge?.delegates?.length > 0) &&
                    <HolderTable badge={badge} />
                }

                {(!badge?.users || badge?.users?.length < 1) && (isManager || isOwner) &&
                    <div className="org__container empty">
                        <h1>You're almost done with setting up the {badge?.name} Badge!</h1>
                        <p>
                            With your <strong>{orgData?.name} Organization</strong> and your <strong>{badge.name} Badge</strong> set up, 
                             the final step is to send this badge to your team members and the credentials will be live.
                        </p>
                        <div style={{margin: 'auto'}}>
                            <IconButton 
                                icon={['fal', 'arrow-right']} 
                                text="DISTRIBUTE BADGE"
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