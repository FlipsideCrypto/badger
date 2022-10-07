import { useState } from "react";
import { 
    Table, TableHead, TableRow, 
    TableContainer, TableCell, TableBody 
} from "@mui/material"

import TableSortHead from "./TableSortHead";
import { sliceAddress, compareByProperty } from "@utils/helpers";
import { holderHeadRows } from "@static/constants/constants";

import "@style/Table/HolderTable.css";

const HolderTable = ({ holders, isDelegate }) => {
    const [ headRows, setHeadRows ] = useState(holderHeadRows);
    const [ sortedList, setSortedList ] = useState(holders);

    const onSortChange = (key) => {
        // Get the current sort method and inverse it for chevron display.
        let newHeadRows = {...headRows};
        let method = newHeadRows[key].method 
        method = !method || method === "desc" ? "asc" : "desc"
        newHeadRows[key].method = method;
        setHeadRows(newHeadRows);

        // Sort the list by the key and the method.
        let newSortedList = [...sortedList];
        newSortedList = newSortedList.sort((a,b) => 
            compareByProperty(key, method, a, b)
        );
        setSortedList(newSortedList);
    }

    console.log('Holder data in table', holders)

    return (
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
                                    align={key === "delegate" ? "right" : "left"}
                                    width={headRows[key].width}
                                />
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                    {sortedList.map((holder, index) => (
                        <TableRow
                            key={holder.address +'-'+ index}
                        >
                            <TableCell component="th" scope="row">
                                {sliceAddress(holder.ethereum_address)}
                            </TableCell>
                            <TableCell>{holder?.received}</TableCell>
                            <TableCell>{holder?.nickname}</TableCell>
                            <TableCell>{holder?.pod}</TableCell>
                            <TableCell>
                                <div className={`delegate__status__${isDelegate(holder)}`}>
                                    <span>{isDelegate(holder) ? "Yes" : "No"}</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default HolderTable