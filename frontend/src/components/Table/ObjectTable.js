import { useState } from 'react'

import { ActionButton, TableSortHead } from '@components'
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from '@mui/material'
import '@style/Table/HolderTable.css'
import { compareByProperty } from '@utils'

const ObjectTable = ({ data, heads }) => {
	const [headRows, setHeadRows] = useState(heads)
	const [sortedList, setSortedList] = useState(data)

	const onSortChange = key => {
		// Get the current sort method and inverse it for chevron display.
		let newHeadRows = { ...headRows }
		let method = newHeadRows[key].method
		method = !method || method === 'desc' ? 'asc' : 'desc'
		newHeadRows[key].method = method
		setHeadRows(newHeadRows)

		// Sort the list by the key and the method.
		let newSortedList = [...sortedList]
		newSortedList = newSortedList.sort((a, b) =>
			compareByProperty(key, method, a, b)
		)
		setSortedList(newSortedList)
	}

	return (
		<div id="holder__table" className="dashboard__content">
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							{Object.keys(headRows).map(key => (
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
						{sortedList.map((user, index) => (
							<TableRow key={user.ethereum_address + '-' + index}>
								<TableCell component="th" scope="row">
									<div
										style={{
											display: 'grid',
											gridTemplateColumns:
												'max-content auto',
											alignItems: 'center'
										}}
									>
										<div className="form__list__address">
											{user.ethereum_address}
										</div>
										<ActionButton
											onClick={() =>
												navigator.clipboard.writeText(
													user.ethereum_address
												)
											}
											icon={['fal', 'fa-copy']}
											sx={{
												minWidth: '32px',
												marginLeft: '8px'
											}}
										/>
									</div>
								</TableCell>
								<TableCell component="th" scope="row">
									<div>{user?.ens_name}</div>
								</TableCell>
								<TableCell>
									<div
										className={`delegate__status__${
											user?.holder ? 'true' : 'false'
										}`}
									>
										<span>
											{user?.holder ? 'Yes' : 'No'}
										</span>
									</div>
								</TableCell>
								<TableCell>
									<div
										className={`delegate__status__${
											user?.delegate ? 'true' : 'false'
										}`}
									>
										<span>
											{user?.delegate ? 'Yes' : 'No'}
										</span>
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

export { ObjectTable }
