import { useState, useContext, useEffect, useCallback, useReducer, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useAccount } from "wagmi"

import { OrgContext, ErrorContext } from "@contexts";

import { ActionTitle, FormReducer, IconButton, InputListCSV, Header, HolderTable, ImageLoader, Select } from "@components";

import { useManageBadgeOwnership, useSetDelegates } from "@hooks/contracts/useContracts";

import { putBadgeRolesRequest } from "@utils/api_requests";

import { IPFS_GATEWAY_URL } from "@static/constants/links";

import "@style/Dashboard/Badge/Badge.css";

const Badge = () => {
    const navigate = useNavigate();
    const { orgId, badgeId } = useParams();
    const { address } = useAccount();
    const { orgData, setOrgData } = useContext(OrgContext);
    const { setError } = useContext(ErrorContext);

    const [isManage, setIsManage] = useState(false);
    const [areAddressesValid, setAreAddressesValid] = useState(false);
    const [selectedAction, setSelectedAction] = useState("Mint");
    const [txMethod, setTxMethod] = useState("manageOwnership");
    const [txPending, setTxPending] = useState(false);
    const [addressesToUpdate, dispatchAddresses] = useReducer(FormReducer, { addresses: [] });

    const badgeIndex = useMemo(() =>
        orgData?.badges?.findIndex(badge => badge.id === parseInt(badgeId)), [orgData, badgeId]
    );

    const [badge, setBadge] = useState(orgData?.badges?.[badgeIndex] || {});

    const isLeader = useMemo(() => {
        return (
            orgData?.owner?.ethereum_address === address ||
            badge?.delegates?.find(delegate => delegate.ethereum_address === address)
        )
    }, [orgData, badge, address]);

    const setDelegates = useSetDelegates(
        isLeader && areAddressesValid && txMethod === "setDelegates",
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

    // Limit actions for Managers.
    const selectActions = [
        "Mint",
        "Revoke",
        "Add Manager",
        "Remove Manager"
    ]

    // When select option changes, set the controlled value and update the
    // method to determine function flow and to send to be further parsed
    // into single, bundle, or full bundle methods at the contract level.
    const onMethodChange = (method) => {
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
        let badgeObj = { ...badge }
        if (!badgeObj.users) badge.users = [];

        addressesToUpdate.addresses.forEach(member => {
            if (selectedAction === "Revoke") {
                const index = badgeObj.users.findIndex(user => user.ethereum_address === member);
                badgeObj.users.splice(index, 1);
            }
            else if (selectedAction === "Mint") {
                badgeObj.users.push({ ethereum_address: member });
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
            setOrgData(orgData => { orgData.badges[badgeIndex] = response; return { ...orgData } });
        }

        setTxPending(false);
    }, [badge, addressesToUpdate, selectedAction, orgId, setError, setOrgData, badgeIndex]);

    // Update the badge array after the transaction is completed, POST 
    // out to the API, update our orgData context, and reset call transaction flag.
    const onDelegatesUpdate = useCallback(async () => {
        let badgeObj = { ...badge }
        if (!badgeObj.delegates) badge.delegates = [];

        addressesToUpdate.addresses.forEach(member => {
            if (selectedAction === "Remove Manager") {
                const index = badgeObj.delegates.findIndex(delegate => delegate.ethereum_address === member);
                badgeObj.delegates.splice(index, 1);
            }
            else if (selectedAction === "Add Manager") {
                badgeObj.delegates.push({ ethereum_address: member });
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
            setOrgData(orgData => { orgData.badges[badgeIndex] = response; return { ...orgData } });
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

    return (
        <>
            <Header
                back={() => navigate(`/dashboard/organization/${orgId}`)}
                actions={isLeader ?
                    [{
                        text: "Settings",
                        icon: ["fal", "fa-gear"],
                        event: () => navigate(`/dashboard/organization/${orgId}/badge/${badgeId}/edit`)
                    }] : []
                }
            />

            <div id="badge">
                <div className="badge__header container__background">
                    <div className="preview__container">
                        <ImageLoader
                            className="badge__header__image"
                            src={IPFS_GATEWAY_URL + badge?.image_hash}
                            alt={badge?.name + 'image'}
                        />
                    </div>

                    <div className="badge__header__content">
                        <div className="badge__title">
                            <span className="badge__name">{badge?.name}</span>
                            <div className="badge__title__icons">
                                {badge?.account_bound &&
                                    <FontAwesomeIcon icon={["fal", "fa-lock"]} />
                                }
                            </div>
                        </div>
                        <p className="badge__description">
                            {badge?.description}
                        </p>
                        <div className="indicator__pill">
                            {`#${badge?.token_id ?? ""}`}
                        </div>
                    </div>
                </div>

                <div style={{ marginInline: "20px", marginTop: "20px" }}>
                    <ActionTitle
                        title="Badge Holders"
                        actions={isLeader ?
                            [{
                                className: "home__action-button",
                                icon: ['fal', 'fa-user'],
                                afterText: "Update holders",
                                onClick: () => {
                                    onMethodChange("Mint");
                                    setIsManage(true)
                                }
                            },
                            {
                                className: "home__action-button",
                                icon: ['fal', 'fa-people-roof'],
                                afterText: "Update managers",
                                onClick: () => {
                                    onMethodChange("Add Manager");
                                    setIsManage(true)
                                }
                            }] : []
                        }
                    />
                </div>

                {isManage && isLeader &&
                    <div style={{ margin: "20px" }}>
                        <Select
                            label="Update Type"
                            options={selectActions}
                            value={selectedAction}
                            setValue={(e) => onMethodChange(e.target.value)}
                        />
                        <InputListCSV
                            label={selectedAction === "Mint" ? "Members to Update" : "Managers to Update"}
                            inputList={addressesToUpdate.addresses}
                            listKey={"addresses"}
                            dispatch={dispatchAddresses}
                            setAreAddressesValid={setAreAddressesValid}
                        />
                        <IconButton
                            icon={['fal', 'arrow-right']}
                            text={txMethod === "manageOwnership" ? "UPDATE MEMBERS" : "UPDATE MANAGERS"}
                            onClick={() => runTransaction()}
                            style={{ margin: "20px 0px 20px auto" }}
                            loading={txPending}
                            disabled={txMethod === "manageOwnership" ?
                                !manageOwnership.isSuccess || !areAddressesValid :
                                !setDelegates.isSuccess || !areAddressesValid
                            }
                        />
                    </div>
                }

                <HolderTable badge={badge} />

                {(badge?.users?.length < 1 && badge?.delegates?.length < 1) &&
                    <div className="no__holders">
                        <h3>No holders for this Badge yet!</h3>
                        <p>
                            You've set up your Organization and your Badge.
                            Now for the final step of sending the first set
                            of keys to your team members.
                        </p>
                    </div>
                }
            </div>
        </>
    )
}

export { Badge }