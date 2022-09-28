import { useEffect, useState } from "react";
import { 
    Paper, Table, TableHead, TableRow, 
    TableContainer, TableCell, TableBody 
} from "@mui/material"

import TableSortHead from "./TableSortHead";
import { sliceAddress, compareByProperty, findObjByProperty } from "@utils/helpers";
import { holderHeadRows, holderSortingDefaults } from "@static/constants/tableconfigs";

import "@style/Table/HolderTable.css";

const HolderTable = ({ holders }) => {
    const [ sorting, setSorting ] = useState(holderSortingDefaults);
    const [ sortedList, setSortedList ] = useState(holders);

    const onSortChange = (property) => {
        let sorted = [...sorting];
        let index = sorted.findIndex((sort) => sort.property === property);
        sorted[index].method = sorted[index].method === "asc" ? "desc" : "asc";
        sorted[index].priority = sorted[sorted.length - 1].priority + 1;
        sorted = sorted.sort((a, b) => compareByProperty("priority", "asc", a, b));

        setSorting(sorted);
    }

    useEffect(() => {
        let sorted = [...holders];
        sorting.forEach((sort) => {
            if (sort.priority > 0) {
                sorted.sort((a, b) => 
                    compareByProperty(sort.property, sort.method, a, b)
                );
            }
        })
        setSortedList(sorted);
    }, [sorting, setSortedList, holders])

    return (
        <div id="holder__table">
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {holderHeadRows.map((row) => (
                                 <TableSortHead
                                    key={row.id}
                                    id={row.id}
                                    label={row.label}
                                    sorted={findObjByProperty("property", row.id, sorting)}
                                    onSortChange={onSortChange}
                                />
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                    {sortedList.map((holder) => (
                        <TableRow
                            key={holder.address}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {sliceAddress(holder.address)}
                            </TableCell>
                            <TableCell>{holder.receivedAt}</TableCell>
                            <TableCell>{holder.nickname}</TableCell>
                            <TableCell>{holder.pod}</TableCell>
                            <TableCell>
                                <div className={`delegate__status__${holder.delegate}`}>
                                    <span>{holder.delegate ? "Yes" : "No"}</span>
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