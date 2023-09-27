import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Table, TableHead, TableRow,
    TableContainer, TableCell, TableBody
} from "@mui/material"

import { ImageLoader, TableSortHead } from "@components";

import { useNavigateAddress } from "@hooks";

import { compareByProperty, getTimeSince } from "@utils";

import "@style/Table/HolderTable.css";

const BadgeTable = ({ badges }) => {
    const navigate = useNavigateAddress();

    const { orgAddress, chainId } = useParams();

    const [headRows, setHeadRows] = useState({
        name: {
            label: 'Badge',
            sortable: true,
            method: "",
        },
        holders: {
            label: 'Holders',
            sortable: true,
            method: ""
        },
        updated: {
            label: 'Last Updated',
            sortable: true,
            method: "",
        }
    });

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
        <div id="holder__table" className="dashboard__table">
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
                                onClick={() => navigate(`/dashboard/organization/${chainId}/${orgAddress}/badge/${badge.token_id}/`)}
                                style={{
                                    cursor: "pointer"
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    <div style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        textDecoration: "none",
                                        fontWeight: "700",
                                        color: "black",
                                        gap: "10px"
                                    }}>
                                        <div className="badge__image">
                                            <ImageLoader
                                                prependGateway={true}
                                                src={badge.image_hash}
                                            />
                                        </div>

                                        {badge.name}
                                    </div>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {badge.users.length}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {`${getTimeSince(new Date(badge.updated))}`}
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