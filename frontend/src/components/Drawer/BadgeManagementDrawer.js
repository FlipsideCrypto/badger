import { useCallback, useContext, useEffect, useReducer, useState } from "react";

import { useManageBadgeOwnership, useSetDelegates } from "@hooks";

import { ErrorContext } from "@contexts";

import { FormReducer, IconButton, InputListCSV, Select } from "@components";

import { putBadgeRolesRequest } from "@utils";

import { badgeDrawerSelectActions as selectActions } from "@static";

// TODO: Still need to clean up the below functions
// setDelegates hook
// manageOwnership hook
// onMembersUpdate
// onDelegatesUpdate
// runTransaction
// useEffect

const BadgeManagementDrawer = ({ drawer, badge, org, setDrawer }) => {
    const { setError } = useContext(ErrorContext);

    const [areAddressesValid, setAreAddressesValid] = useState(false);
    const [txPending, setTxPending] = useState(false);

    const [addressesToUpdate, dispatchAddresses] = useReducer(FormReducer, { addresses: [] });

    const txMethod = selectActions.slice(0, 2).includes(drawer.action) ? "manageOwnership" : "setDelegates";

    const setDelegatesReady = areAddressesValid && txMethod === "setDelegates"
    const manageOwnershipReady = areAddressesValid && txMethod === "manageOwnership"

    const setDelegates = useSetDelegates(
        setDelegatesReady,
        org.ethereum_address,               // orgAddress
        badge.token_id,                     // tokenId array
        addressesToUpdate.addresses,        // address array
        drawer.action,                      // mint, revoke, add or remove leaders
    );

    const manageOwnership = useManageBadgeOwnership(
        manageOwnershipReady,
        org.ethereum_address,               // orgAddress
        badge.token_id,                     // tokenId array
        addressesToUpdate.addresses,        // address array
        drawer.action,                      // mint, revoke, add or remove leaders
        1                                   // amount of each token
    );

    // Update the badge array after the transaction is completed, POST 
    // out to the API, update our orgData context, and reset call transaction flag.
    const onMembersUpdate = useCallback(async () => {
        let badgeObj = { ...badge }
        if (!badgeObj.users) badge.users = [];

        addressesToUpdate.addresses.forEach(member => {
            if (drawer.action === "Revoke") {
                const index = badgeObj.users.findIndex(user => user.ethereum_address === member);
                badgeObj.users.splice(index, 1);
            }
            else if (drawer.action === "Mint") {
                badgeObj.users.push({ ethereum_address: member });
            }
        })

        const response = await putBadgeRolesRequest(badgeObj, org)
        if (response.error)
            setError({
                label: 'Adding members to database failed',
                message: response.error
            });
        else {
            console.log('successful members update')
            // setBadge(response);
            // setOrgData(orgData => { orgData.badges[badgeIndex] = response; return { ...orgData } });
        }

        setTxPending(false);
    }, [drawer, badge, addressesToUpdate, org, setError]);

    // Update the badge array after the transaction is completed, POST 
    // out to the API, update our orgData context, and reset call transaction flag.
    const onDelegatesUpdate = useCallback(async () => {
        let badgeObj = { ...badge }
        if (!badgeObj.delegates) badge.delegates = [];

        addressesToUpdate.addresses.forEach(member => {
            if (drawer.action === "Remove Manager") {
                const index = badgeObj.delegates.findIndex(delegate => delegate.ethereum_address === member);
                badgeObj.delegates.splice(index, 1);
            } else if (drawer.action === "Add Manager") {
                badgeObj.delegates.push({ ethereum_address: member });
            }
        })

        const response = await putBadgeRolesRequest(badgeObj, org)

        if (response.error) {
            setError({
                label: 'Adding managers to database failed',
                message: response.error
            });
        }
        else {
            console.log('success');
            // setBadge(response);
            // setOrgData(orgData => { orgData.badges[badgeIndex] = response; return { ...orgData } });
        }

        setTxPending(false);
    }, [drawer, badge, addressesToUpdate, org, setError]);

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

    // If we have a silent error from preparing the transaction, display it.
    useEffect(() => {
        setError(null)
        if (manageOwnership?.error && txMethod === "manageOwnership") {
            setError({
                label: 'Error managing members',
                message: manageOwnership?.error
            })
        }
        else if (setDelegates?.error && txMethod === "setDelegates") {
            setError({
                label: 'Error setting delegates',
                message: setDelegates?.error
            })
        }
    }, [manageOwnership.error, setDelegates.error, txMethod, setError])

    if (drawer.collapsed) return null;

    return (
        <>
            <Select label="Update Type" options={selectActions}
                value={drawer.action} setValue={(e) => setDrawer({ ...drawer, action: e.target.value })} />

            <InputListCSV label={drawer.action === "Mint" ? "Members to Update" : "Managers to Update"}
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
            />
        </>
    )
}

export { BadgeManagementDrawer }