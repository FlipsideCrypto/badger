import { useCallback, useContext, useEffect, useReducer, useState } from "react";

import { useManageBadgeOwnership, useSetDelegates } from "@hooks";

import { ErrorContext } from "@contexts";

import { FormReducer, IconButton, InputListCSV, Header, HolderTable, Select } from "@components";

import { putBadgeRolesRequest } from "@utils";

const BadgeManagementDrawer = ({ action, badge, org }) => {
    const { setError } = useContext(ErrorContext);

    const [areAddressesValid, setAreAddressesValid] = useState(false);
    const [txPending, setTxPending] = useState(false);

    const [addressesToUpdate, dispatchAddresses] = useReducer(FormReducer, { addresses: [] });

    const txMethod = ["Mint", "Revoke"].includes(action) ? "manageOwnership" : "setDelegates";

    const setDelegatesReady = areAddressesValid && txMethod === "setDelegates"
    const manageOwnershipReady = areAddressesValid && txMethod === "manageOwnership"

    const setDelegates = useSetDelegates(
        setDelegatesReady,
        org.ethereum_address,               // orgAddress
        badge.token_id,                     // tokenId array
        addressesToUpdate.addresses,        // address array
        action,                             // mint, revoke, add or remove leaders
    );

    const manageOwnership = useManageBadgeOwnership(
        manageOwnershipReady,
        org.ethereum_address,               // orgAddress
        badge.token_id,                     // tokenId array
        addressesToUpdate.addresses,        // address array
        action,                             // mint, revoke, add or remove leaders
        1                                   // amount of each token
    );

    // Manage the transaction write and clean up effects.
    // const runTransaction = useCallback(async () => {
    //     setTxPending(true);

    //     let tx;
    //     try {
    //         if (txMethod === "manageOwnership")
    //             tx = await manageOwnership.write?.()
    //         else if (txMethod === "setDelegates")
    //             tx = await setDelegates.write?.()

    //         if (tx) {
    //             const txReceipt = await tx?.wait();
    //             if (txReceipt.status !== 1)
    //                 throw new Error(setDelegates.error || manageOwnership.error);

    //             txMethod === "manageOwnership" ? onMembersUpdate() : onDelegatesUpdate();
    //         }
    //     } catch (error) {
    //         setError({
    //             label: 'Error managing members',
    //             message: error
    //         });
    //     }

    //     setTxPending(false);
    // }, [txMethod, setDelegates, manageOwnership, setError, onMembersUpdate, onDelegatesUpdate]);

    // // Update the badge array after the transaction is completed, POST 
    // // out to the API, update our orgData context, and reset call transaction flag.
    // const onMembersUpdate = useCallback(async () => {
    //     let badgeObj = { ...badge }
    //     if (!badgeObj.users) badge.users = [];

    //     addressesToUpdate.addresses.forEach(member => {
    //         if (action === "Revoke") {
    //             const index = badgeObj.users.findIndex(user => user.ethereum_address === member);
    //             badgeObj.users.splice(index, 1);
    //         }
    //         else if (action === "Mint") {
    //             badgeObj.users.push({ ethereum_address: member });
    //         }
    //     })

    //     const response = await putBadgeRolesRequest(badgeObj, orgId)
    //     if (response.error)
    //         setError({
    //             label: 'Adding members to database failed',
    //             message: response.error
    //         });
    //     else {
    //         setBadge(response);
    //         setOrgData(orgData => { orgData.badges[badgeIndex] = response; return { ...orgData } });
    //     }

    //     setTxPending(false);
    // }, [badge, addressesToUpdate, action, orgId, setError, setOrgData, badgeIndex]);

    // // Update the badge array after the transaction is completed, POST 
    // // out to the API, update our orgData context, and reset call transaction flag.
    // const onDelegatesUpdate = useCallback(async () => {
    //     let badgeObj = { ...badge }
    //     if (!badgeObj.delegates) badge.delegates = [];

    //     addressesToUpdate.addresses.forEach(member => {
    //         if (action === "Remove Manager") {
    //             const index = badgeObj.delegates.findIndex(delegate => delegate.ethereum_address === member);
    //             badgeObj.delegates.splice(index, 1);
    //         }
    //         else if (action === "Add Manager") {
    //             badgeObj.delegates.push({ ethereum_address: member });
    //         }
    //     })

    //     const response = await putBadgeRolesRequest(badgeObj, orgId)
    //     if (response.error) {
    //         setError({
    //             label: 'Adding managers to database failed',
    //             message: response.error
    //         });
    //     }
    //     else {
    //         setBadge(response);
    //         setOrgData(orgData => { orgData.badges[badgeIndex] = response; return { ...orgData } });
    //     }

    //     setTxPending(false);
    // }, [badge, badgeIndex, addressesToUpdate, orgId, action, setError, setOrgData]);

    // // If we have a silent error from preparing the transaction, display it.
    // useEffect(() => {
    //     setError(null)
    //     if (manageOwnership?.error && txMethod === "manageOwnership") {
    //         setError({
    //             label: 'Error managing members',
    //             message: manageOwnership?.error
    //         })
    //     }
    //     else if (setDelegates?.error && txMethod === "setDelegates") {
    //         setError({
    //             label: 'Error setting delegates',
    //             message: setDelegates?.error
    //         })
    //     }
    // }, [manageOwnership.error, setDelegates.error, txMethod, setError])

    return (
        <>
            <h1>Drawer</h1>

            {/* <Select label="Update Type"
                options={selectActions}
                value={action}
                setValue={(e) => setAction(e.target.value)}
            />

            <InputListCSV label={action === "Mint" ? "Members to Update" : "Managers to Update"}
                inputList={addressesToUpdate.addresses}
                listKey={"addresses"}
                dispatch={dispatchAddresses}
                setAreAddressesValid={setAreAddressesValid}
            />

            <IconButton text={txMethod === "manageOwnership" ? "UPDATE MEMBERS" : "UPDATE MANAGERS"}
                icon={['fal', 'arrow-right']}
                // onClick={() => runTransaction()}
                style={{ margin: "20px 0px 20px auto" }}
                loading={txPending}
                disabled={txMethod === "manageOwnership" ?
                    !manageOwnership.isSuccess || !areAddressesValid :
                    !setDelegates.isSuccess || !areAddressesValid
                }
            /> */}
        </>
    )
}

export { BadgeManagementDrawer }