import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Table, TableHead, TableRow,
    TableContainer, TableCell, TableBody
} from "@mui/material"

import { TableSortHead } from "@components";

import { compareByProperty } from "@utils";

import { badgeHeadRows, IPFS_GATEWAY_URL } from "@static";

import "@style/Table/HolderTable.css";

const BadgeTable = ({ orgId, badges }) => {
    const navigate = useNavigate();

    const [headRows, setHeadRows] = useState(badgeHeadRows);
    const [sortedList, setSortedList] = useState(badges);

    const onSortChange = (key) => {
        // Get the current sort method and inverse it for chevron display.
        let newHeadRows = { ...headRows };
        let method = newHeadRows[key].method;
        method = !method || method === "desc" ? "asc" : "desc";
        newHeadRows[key].method = method;
        setHeadRows(newHeadRows);

        // Sort the list by the key and the method.
        let newSortedList = [...sortedList];
        newSortedList = newSortedList.sort((a, b) =>
            compareByProperty(key, method, a, b)
        );

        setSortedList(newSortedList);
    }

    // If users changes, update and combine holders and delegates in the sorted list.
    useEffect(() => {
        setSortedList(badges);
    }, [badges])

    return (
        <div id="holder__table">
            {sortedList && <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {headRows && Object.keys(headRows).map((key) => (
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
                        {sortedList.map((badge, index) => (
                            <TableRow
                                key={index}
                                onClick={() => navigate(`/dashboard/organization/${orgId}/badge/${badge.id}`)}
                                style={{
                                    cursor: "pointer"
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    <div style={{
                                        display: "inline-grid",
                                        alignItems: "center",
                                        gridTemplateColumns: "min-content auto",
                                        textDecoration: "none",
                                        fontWeight: "700",
                                        color: "black",
                                    }}>
                                        <img
                                            src={IPFS_GATEWAY_URL + badge.image_hash}
                                            alt="badge"
                                            style={{
                                                width: "20px",
                                                height: "20px",
                                                marginRight: "10px"
                                            }}
                                        />

                                        {badge.name}
                                    </div>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {badge.users.length}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {badge.delegates.length}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {new Date(badge.updated).toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
        </div>
    )
}

export { BadgeTable };