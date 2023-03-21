import { useState } from "react";

import {
    Table, TableHead, TableRow,
    TableContainer, TableCell, TableBody
} from "@mui/material"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ActionTitle, TableSortHead, Empty } from "@components";

import { compareByProperty, getTimeSince } from "@utils";

import { useSetManagers, useUser } from "@hooks";

import "@style/Table/HolderTable.css";

const LastLogin = ({ lastLogin, active, onClick }) => (
    <div className="table__inline mono">
        <span>{getTimeSince(lastLogin) || "---"}</span>
        <button className={active ? 'delete active' : 'delete'} onClick={onClick}>
            <FontAwesomeIcon icon={["fal", "fa-trash"]} />
        </button>
    </div>
)

const ManagerTable = ({ badge, managers, isManager }) => {
    const headRows = {
        name: {
            label: 'Manager',
            sortable: true,
            method: "",
        },
        updated: {
            label: 'Last Login',
            sortable: true,
            method: "",
        }
    }

    // The new holder objects being created by the user.
    const [newManagers, setNewManagers] = useState([]);

    const [managersToRemove, setManagersToRemove] = useState([]);

    const combinedChanges = [...newManagers, ...managersToRemove];

    const isTableHidden = !isManager || (!newManagers.length && (!managers || managers.length === 0));

    console.log(badge.token_id)

    const { openManagerTransaction, isPrepared, isLoading } = useSetManagers({
        obj: {
            tokenId: badge.token_id,
            managers: combinedChanges.map(manager => manager.ethereum_address),
            isManagers: combinedChanges.map(manager => manager.isManager),
            configs: []
        }
    });


    // TODO: Come back to this.
    const onSortChange = (key) => {

    }

    const onAddNew = () => {
        setNewManagers([{ ethereum_address: "", isManager: true }, ...newManagers])
    }

    const onAddressChange = (e, index) => {
        setNewManagers(newManagers => newManagers.map((manager, i) => i === index ? { ...manager, ethereum_address: e.target.value } : manager))
    }

    // If they're a new holder, delete the input,
    // If they're a current holder, we need to update the balanceChanges object to give them a new balance of 0.
    const onDelete = (index, isActive) => {
        isActive ?
            setManagersToRemove(managersToRemove => ({ ...managersToRemove, [index]: { ...managers[index], isManager: false } })) :
            setNewManagers(newManagers => newManagers.filter((manager, i) => i !== index))
    }

    const saveAction = {
        className: "primary",
        text: "Save changes",
        disabled: !isPrepared,
        loading: isLoading,
        onClick: () => {
            openManagerTransaction({
                onLoading: () => {
                    // Reset the form.
                    setNewManagers([]);
                    setManagersToRemove([]);
                },
                onSuccess: ({ chain, receipt }) => {
                    console.log('receipt', receipt)
                }
            });
        }
    }

    const addAction = {
        className: "secondary",
        text: "Add New",
        onClick: () => onAddNew()
    }

    const actions = newManagers.length + Object.entries(managersToRemove).length > 0 ?
        [saveAction, addAction] : [addAction]

    return (
        <>
            <ActionTitle title="Managers" actions={isManager && actions} />

            {badge && isTableHidden && <Empty
                title={`${badge.name} does not have any Managers yet!`}
                body="When you add a Manager, they will appear on the list here."
            />}

            {!isTableHidden &&
                <TableContainer className="table">
                    <Table>
                        <TableHead>
                            <TableRow>
                                {Object.keys(headRows).map((key) => (
                                    <TableSortHead
                                        key={key}
                                        id={key}
                                        label={headRows[key].label}
                                        sortMethod={headRows[key].method}
                                        onSortChange={onSortChange}
                                    />
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {newManagers.length !== 0 && newManagers.map((manager, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        <input
                                            className="table__input mono"
                                            value={manager.ethereum_address}
                                            placeholder="Ethereum address or ENS..."
                                            onChange={(e) => onAddressChange(e, index)}
                                        />
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <LastLogin lastLogin={manager.last_login} onClick={() => onDelete(index, false)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                            {managers && managers.length !== 0 && managers.map((manager, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        <input className="table__input mono" value={manager.ethereum_address} disabled={true} />
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <LastLogin lastLogin={manager.last_login} active={managersToRemove?.[index]} onClick={() => onDelete(index, true)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </>
    )
}

export { ManagerTable };