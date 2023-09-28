import { useParams } from 'react-router-dom'

import {
	BadgePreview,
	DashboardLoader,
	Header,
	HolderTable,
	ManagerTable,
	SEO
} from '@components'
import { useNavigateAddress, useUser } from '@hooks'
import '@style/pages/Badge.css'

const BadgeContent = ({ badge, managers, canManage }) => {
	return (
		<>
			<BadgePreview badge={badge} />

			<ManagerTable
				badge={badge}
				managers={managers}
				canManage={canManage}
			/>

			<HolderTable badge={badge} canManage={canManage} />
		</>
	)
}

const Badge = () => {
	const navigate = useNavigateAddress()

	const { chainId, orgAddress, badgeId } = useParams()

	const { organization, badge, managers, canManage, retrieve } = useUser({
		chainId,
		orgAddress,
		badgeId
	})

	const headerActions = canManage && [
		{
			text: 'Settings',
			icon: ['fal', 'fa-gear'],
			onClick: () =>
				navigate(
					`/dashboard/organization/${chainId}/${orgAddress}/badge/${badgeId}/edit/`
				)
		}
	]

	return (
		<>
			<SEO
				title={`${
					badge
						? `${organization.name} // ${badge.name}`
						: 'Not Found'
				} // Badger`}
				description={badge?.description}
			/>

			<Header
				back={() =>
					navigate(
						`/dashboard/organization/${chainId}/${orgAddress}/`
					)
				}
				actions={headerActions}
			/>

			<DashboardLoader
				chainId={chainId}
				orgAddress={orgAddress}
				badgeId={badgeId}
				obj={badge}
				retrieve={retrieve}
			>
				<BadgeContent
					badge={badge}
					managers={managers}
					canManage={canManage}
				/>
			</DashboardLoader>
		</>
	)
}

export { Badge }
