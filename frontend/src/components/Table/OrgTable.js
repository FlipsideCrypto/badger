import { useEffect, useState } from 'react';

import { Table, TableHead, TableRow, TableContainer, TableCell, TableBody } from '@mui/material';

import { ImageLoader, TableSortHead } from '@components';

import { useNavigateAddress } from '@hooks';

import { compareByProperty, getTimeSince } from '@utils';

import '@style/Table/HolderTable.css';

const OrgTable = ({ organizations }) => {
    const navigate = useNavigateAddress();

    const [headRows, setHeadRows] = useState({
        name: {
            label: 'Organization',
            sortable: true,
            method: '',
        },
        holders: {
            label: 'Badges',
            sortable: true,
            method: '',
            align: 'right',
        },
        updated: {
            label: 'Last Updated',
            sortable: true,
            method: '',
            align: 'right',
        },
    });

    const [sortedList, setSortedList] = useState(organizations);

    const onSortChange = (key) => {
        // Get the current sort method and inverse it for chevron display.
        let newHeadRows = { ...headRows };
        let method = newHeadRows[key].method;
        method = !method || method === 'desc' ? 'asc' : 'desc';
        newHeadRows[key].method = method;
        setHeadRows(newHeadRows);

        // Sort the list by the key and the method.
        let newSortedList = [...sortedList];
        newSortedList = newSortedList.sort((a, b) => compareByProperty(key, method, a, b));

        setSortedList(newSortedList);
    };

    // If users changes, update and combine holders and delegates in the sorted list.
    useEffect(() => {
        setSortedList(organizations);
    }, [organizations]);

    return (
        <div id="holder__table" className="dashboard__content">
            {sortedList && (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {headRows &&
                                    Object.keys(headRows).map((key) => (
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
                            {sortedList
                                .filter((org) => org.badges.length > 0)
                                .map((org, index) => (
                                    <TableRow
                                        key={index}
                                        onClick={() =>
                                            navigate(`/dashboard/organization/${org.chain_id}/${org.ethereum_address}`)
                                        }
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <div
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    textDecoration: 'none',
                                                    fontWeight: '700',
                                                    color: 'black',
                                                    gap: '10px',
                                                }}
                                            >
                                                <div className="badge__image">
                                                    <ImageLoader prependGateway={true} src={org.image_hash} />
                                                </div>

                                                {org.name}
                                            </div>
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            style={{
                                                textAlign: 'right',
                                            }}
                                        >
                                            {org.badges.length}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {`${getTimeSince(new Date(org.updated))} ago`}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export { OrgTable };
