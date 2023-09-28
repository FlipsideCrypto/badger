import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { FormActionBar, FormDrawer, Input } from '@components'
import { useTransferOwnership } from '@hooks'

const OrgDangerZone = () => {
	const navigate = useNavigate()

	const [newOwner, setNewOwner] = useState('')

	const { chainId, orgAddress } = useParams()

	const { openTransferOwnershipTransaction, isSuccess } =
		useTransferOwnership({ address: newOwner })

	const onOwnerChange = e => {
		setNewOwner(e.target.value)
	}

	const action = {
		text: 'Update ownership',
		className: 'warning',
		disabled: isSuccess,
		event: () => {
			openTransferOwnershipTransaction({
				onLoading: () => {},
				onSuccess: ({ chain, receipt }) => {
					setNewOwner('')

					navigate(`/dashboard/organization/${chainId}/${orgAddress}`)
				}
			})
		}
	}

	return (
		<>
			<hr />

			<h2>Danger zone</h2>

			<FormDrawer label="Ownership" open={true}>
				<Input
					label="Owner"
					value={newOwner}
					onChange={e => onOwnerChange(e)}
				/>
			</FormDrawer>

			<FormActionBar actions={[action]} />
		</>
	)
}

export { OrgDangerZone }
