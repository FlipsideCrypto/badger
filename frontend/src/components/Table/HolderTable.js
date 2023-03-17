import { useState } from "react";
import {
    Table, TableHead, TableRow,
    TableContainer, TableCell, TableBody
} from "@mui/material"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ActionTitle, TableSortHead, Empty } from "@components";

import { compareByProperty } from "@utils";

import { useManageHolders } from "@hooks";

import { HOLDER_HEAD_ROWS } from "@static";

import "@style/Table/HolderTable.css";

const HolderTable = ({ badge, isManager }) => {
    const [headRows, setHeadRows] = useState(HOLDER_HEAD_ROWS);
    
    // The new holder objects being created by the user.
    const [newHolders, setNewHolders] = useState([]);
    // used as a clone of badge.users with changed amounts.
    const [balanceChanges, setBalanceChanges] = useState({});

    const obj = {
        mints: [...newHolders, ...Object.values(balanceChanges).filter(change => change.pendingAmount > change.amount)],
        revokes: Object.values(balanceChanges).filter(change => parseInt(change.pendingAmount) < parseInt(change.amount)),
        tokenId: badge.token_id
    }

    const { openHolderTransaction, isPrepared, isLoading } = useManageHolders({obj: obj});

    // TODO: Come back to this.
    const onSortChange = (key) => {
    //     // Get the current sort method and inverse it for chevron display.
    //     let newHeadRows = { ...headRows };
    //     let method = newHeadRows[key].method;
    //     method = !method || method === "desc" ? "asc" : "desc";
    //     newHeadRows[key].method = method;
    //     setHeadRows(newHeadRows);

    //     // Sort the list by the key and the method.
    //     let newHolders = [...sortedList];
    //     newHolders = newHolders.sort((a, b) =>
    //         compareByProperty(key, method, a, b)
    //     );
    //     setSortedList(newHolders);
    }

    const onAddNew = () => {
        setNewHolders(newHolders => ([{ethereum_address: "", pendingAmount: ""}, ...newHolders]))
    }

    // If they're a new holder, update the newHolders object,
    // If they're a current holder, we need to update the balanceChanges object to give them a new balance.
    const onAmountChange = (e, index, isActive) => {
        isActive ?
            setBalanceChanges(balanceChanges => ({...balanceChanges, [index]: {...badge.users[index], pendingAmount: e.target.value }})) :
            setNewHolders(newHolders => newHolders.map((holder, i) => i === index ? {...holder, pendingAmount: e.target.value} : holder))
    }
    
    const onAddressChange = (e, index) => {
        setNewHolders(newHolders => newHolders.map((holder, i) => i === index ? {...holder, ethereum_address: e.target.value} : holder))
    }
    
    // If they're a new holder, delete the input,
    // If they're a current holder, we need to update the balanceChanges object to give them a new balance of 0.
    const onDelete = (index, isActive) => {
        isActive ?
            setBalanceChanges(balanceChanges => ({...balanceChanges, [index]: {...badge.users[index], pendingAmount: "0" }})) :
            setNewHolders(newHolders => newHolders.filter((holder, i) => i !== index))
    }

    const saveAction = {
        className: "primary",
        text: "Save changes",
        disabled: !isPrepared,
        loading: isLoading,
        onClick: () => {
            openHolderTransaction({
                onLoading: () => {
                    // Reset the form.
                    setNewHolders([]);
                    setBalanceChanges([]);
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
    
    const actions = newHolders.length + Object.entries(balanceChanges).length > 0 ? [saveAction, addAction] : [addAction]
    
    return (
        <>
            <ActionTitle title="Holders" actions={isManager && actions} />

            {badge && badge.users.length === 0 && newHolders.length === 0 && <Empty
                title={`${badge.name} does not have any Holders yet!`}
                body="When you add a Holder, they will appear on the list here."
            />}

            {badge && (badge.users.length !== 0 || newHolders.length !== 0) && <div id="holder__table">
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
                        {newHolders.length > 0 && newHolders.map((holder, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    <input
                                        className="table__input mono"
                                        value={holder.ethereum_address} 
                                        placeholder="Ethereum address or ENS..."
                                        onChange={(e) => onAddressChange(e, index)}
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <div className="table__inline">
                                        <input className="table__input mono"
                                            value={holder.pendingAmount} 
                                            placeholder="1"
                                            onChange={(e) => onAmountChange(e, index)} 
                                        />
                                        <button className="delete" onClick={() => onDelete(index)}>
                                            <FontAwesomeIcon icon={["fal","fa-trash"]} />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {badge.users.length > 0 && badge.users.map((holder, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    <input className="table__input mono" value={holder.ethereum_address} disabled={true} />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <div className="table__inline">
                                        <input className="table__input mono"
                                            value={balanceChanges[index]?.pendingAmount || holder.amount} // im sorry for the ?
                                            placeholder="1"
                                            onChange={(e) => onAmountChange(e, index, true)} 
                                        />
                                        <button className='delete' onClick={() => onDelete(index, true)}>
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

export { HolderTable };