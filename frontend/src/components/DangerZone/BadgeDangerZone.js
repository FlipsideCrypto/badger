import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { FormActionBar } from '@components'
import { useManageHolders } from '@hooks'

const BadgeDangerZone = ({ badge }) => {
	const [isLoading, setIsLoading] = useState(false)

	const { chainId, orgAddress, badgeId } = useParams()

	const navigate = useNavigate()

	const { openHolderTransaction } = useManageHolders({
		revokes:
			!isLoading &&
			badge.users.map(user => ({ ...user, pendingAmount: 0 })),
		tokenId: badgeId
	})

	const actions = [
		{
			className: 'warning',
			text: 'Revoke all',
			event: () => {
				openHolderTransaction({
					onLoading: () => {
						setIsLoading(true)
					},
					onSuccess: ({ chain, receipt }) => {
						console.log(receipt)
						navigate(
							`/dashboard/organization/${chainId}/${orgAddress}/badge/${badgeId}`
						)
						setIsLoading(false)
					}
				})
			}
		}
	]

	return (
		<div className="danger__zone">
			<h1>Danger zone</h1>

			<FormActionBar className="warning" actions={actions} />
		</div>
	)
}

export { BadgeDangerZone }
