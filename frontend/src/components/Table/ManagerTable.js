import { useState } from "react";
import {
    Table, TableHead, TableRow,
    TableContainer, TableCell, TableBody
} from "@mui/material"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ActionTitle, TableSortHead } from "@components";

import { compareByProperty } from "@utils";

import { useSetManagers } from "@hooks";

import { HOLDER_HEAD_ROWS } from "@static";

// import "@style/Table/ManagerTable.css";

const ManagerTable = ({ badge, isManager }) => {
    const [headRows, setHeadRows] = useState(HOLDER_HEAD_ROWS);
    
    // The new holder objects being created by the user.
    const [newManagers, setNewManagers] = useState([]);

    const [managersToRemove, setManagersToRemove] = useState([]);

    const combinedChanges = [...newManagers, ...managersToRemove];

    const obj = {
        tokenId: badge.token_id,
        managers: combinedChanges.map(manager => manager.ethereum_address),
        isManagers: combinedChanges.map(manager => manager.isManager),
        configs: []
    }

    const { openManagerTransaction, isPrepared, isLoading } = useSetManagers({obj: obj});

    // TODO: Come back to this.
    const onSortChange = (key) => {

    }

    const onAddNew = () => {
        setNewManagers([{ethereum_address: "", isManager: true}, ...newManagers])
    }
    
    const onAddressChange = (e, index) => {
        setNewManagers(newManagers => newManagers.map((manager, i) => i === index ? {...manager, ethereum_address: e.target.value} : manager))
    }
    
    // If they're a new holder, delete the input,
    // If they're a current holder, we need to update the balanceChanges object to give them a new balance of 0.
    const onDelete = (index, isActive) => {
        isActive ?
            setManagersToRemove(managersToRemove => ({...managersToRemove, [index]: {...badge.users[index], isManager: false }})) :
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
    
    const actions = newManagers.length + Object.entries(managersToRemove).length > 0 ? [saveAction, addAction] : [addAction]
    
    return (
        <>
            <ActionTitle title="Managers" actions={isManager && actions} />

            {/* {badge && !badge?.managers?.length && newManagers.length === 0 && <Empty
                title={`${badge.name} does not have any Managers yet!`}
                body="When you add a Manager, they will appear on the list here."
            />} */}

            {badge && (badge?.managers?.length !== 0 || newManagers.length !== 0) && <div id="holder__table">
                <TableContainer>
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
                                align={headRows[key].align}
                                width={headRows[key].width}
                            />
                        ))}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                        {newManagers.length > 0 && newManagers.map((manager, index) => (
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
                                    <div className="table__inline">
                                        <span>
                                            {manager.last_login || "---"}
                                        </span>
                                        <button 
                                            className={"delete" + managersToRemove?.[index] && " active"} 
                                            onClick={() => onDelete(index)}
                                        >
                                            <FontAwesomeIcon icon={["fal","fa-trash"]} />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            </div>}
        </>
    )
}

export { ManagerTable };