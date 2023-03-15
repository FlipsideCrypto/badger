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
    const [newHolders, setNewHolders] = useState([]);

    const obj = {
        addresses: newHolders.map(holder => holder.ethereum_address),
        amounts: newHolders.map(holder => holder.amount),
        tokenId: badge.token_id,
        functionName: "mint" // TODO: Update this when we get to multicall?
    }

    const { openHolderTransaction, isPrepared, isLoading } = useManageHolders({obj: obj});

    const onSortChange = (key) => {
        // // Get the current sort method and inverse it for chevron display.
        // let newHeadRows = { ...headRows };
        // let method = newHeadRows[key].method;
        // method = !method || method === "desc" ? "asc" : "desc";
        // newHeadRows[key].method = method;
        // setHeadRows(newHeadRows);

        // // Sort the list by the key and the method.
        // let newHolders = [...sortedList];
        // newHolders = newHolders.sort((a, b) =>
        //     compareByProperty(key, method, a, b)
        // );
        // setSortedList(newHolders);
    }

    const onAddNew = () => {
        setNewHolders([{ethereum_address: "", amount: ""}, ...newHolders])
    }

    const onAmountChange = (e, index) => {
        let newObj = [...newHolders];
        newObj[index] = { ...newObj[index], amount: e.target.value };
        setNewHolders(newObj);
    }
    
    const onAddressChange = (e, index) => {
        let newObj = [...newHolders];
        newObj[index] = { ...newObj[index], ethereum_address: e.target.value };
        setNewHolders(newObj);
    }
    
    // TODO: If they're a current holder.
    const onDelete = (index) => {
        let newObj = [...newHolders];
        newObj.splice(index, 1);
        setNewHolders(newObj);
    }

    const saveAction = {
        className: "primary",
        text: "Save changes",
        disabled: !isPrepared,
        loading: isLoading,
        onClick: () => {
            openHolderTransaction({
                onLoading: () => {},
                onSuccess: ({ chain, receipt }) => {
                    console.log('receipt', receipt)

                    // Reset the form.
                    setNewHolders([]);
                }
            });
        }
    }

    const addAction = {
        className: "secondary",
        text: "Add New",
        onClick: () => onAddNew()
    }
    
    const actions = newHolders.length > 0 ? [saveAction, addAction] : [addAction]
    
    return (
        <>
            <ActionTitle title="Holders" actions={isManager && actions} />

            {badge && badge.users.length === 0 && newHolders.length === 0 && <Empty
                title={`${badge.name} does not have any Holders yet!`}
                body="When you add a Holder, they will appear on the list here."
            />}

            {badge && (badge.users.length > 0 || newHolders.length > 0) && 
                <div id="holder__table">
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
                        {newHolders?.length > 0 && newHolders.map((holder, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    <input
                                        className="table__input"
                                        value={holder.ethereum_address} 
                                        placeholder="Ethereum address..."
                                        onChange={(e) => onAddressChange(e, index)} 
                                    />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <span>{holder?.ens_name}</span>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <div className="table__inline">
                                        <input className="table__input"
                                            value={holder.amount} 
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
                    </TableBody>
                  </Table>
                </TableContainer>
            </div>}
        </>
    )
}

export { HolderTable };