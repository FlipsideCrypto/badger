import { useEffect, useState } from 'react'

import { ActionButton, Empty } from '@components'
import { getBadgerAbi } from '@hooks'
import { getProvider } from '@wagmi/core'
import { ethers } from 'ethers'
import { useAccount } from 'wagmi'

const NotDeployedEmpty = ({ badgeId }) => {
	const title = badgeId
		? 'A Badge with this does token ID not exist.'
		: 'There are no Organizations deployed at this address.'
	const body = badgeId
		? "Badger hasn't detected setup of a Badge with this ID yet. If you are sure you are in the correct place, please give us a few minutes to check the chain."
		: "Badger hasn't detected any Organizations at this address yet. If you are sure you are in the correct place, please give us a few minutes to check the chain."

	return (
		<Empty
			title={title}
			body={body}
			button={
				<ActionButton
					className="secondary"
					afterText="Check the chain"
					icon={['fal', 'eye']}
				/>
			}
		/>
	)
}

const NotIndexedEmpty = () => (
	<Empty
		title="We are building your Organization. Just one moment please!"
		body="Badger is still indexing your Organization. Please give us a few minutes to check the chain and get everything in order."
		button={
			<ActionButton
				className="primary"
				afterText="Read the docs"
				icon={['fal', 'books']}
				link="http://docs.trybadger.com"
			/>
		}
	/>
)

const NotManagerDeploy = ({ badgeId }) => {
	const title = `You are not the manager of this ${
		badgeId ? 'Badge' : 'Organization'
	}.`
	const body = `The connected wallet is not the manager of this ${
		badgeId ? 'Badge' : 'Organization'
	}. Please connect a wallet that is the manager of this ${
		badgeId ? 'Badge' : 'Organization'
	}.`

	return (
		<Empty
			title={title}
			body={body}
			button={
				<ActionButton
					className="secondary"
					afterText="Check the chain"
					icon={['fal', 'eye']}
				/>
			}
		/>
	)
}

const DashboardLoader = ({
	chainId,
	orgAddress,
	badgeId,
	obj,
	retrieve,
	managed,
	canManage,
	children
}) => {
	const { address } = useAccount()

	const [logs, setLogs] = useState([])

	const isLoading = (managed && !canManage) || !obj || obj?.name === null

	useEffect(() => {
		const getFilter = () => {
			if (!badgeId)
				return {
					address: getBadgerAbi(chainId).address,
					topics: [
						ethers.utils.id(
							'OrganizationCreated(address,address,uint256)'
						),
						ethers.utils.hexZeroPad(orgAddress, 32)
					],
					fromBlock: 0,
					toBlock: 'pending'
				}

			return {
				address: orgAddress,
				topics: [
					ethers.utils.id('URI(string,uint256)'),
					null,
					ethers.utils.hexZeroPad(badgeId, 32)
				],
				fromBlock: 0,
				toBlock: 'pending'
			}
		}

		const getLogs = () => {
			const filter = getFilter()

			const provider = getProvider(chainId)

			provider.getLogs(filter).then(logs => {
				setLogs(logs)
			})
		}

		if (!chainId || !orgAddress || !managed || !isLoading) return

		getLogs()
	}, [chainId, orgAddress, badgeId, managed, isLoading])

	const isLogged = logs.length > 0

	useEffect(() => {
		if (!isLoading || !retrieve) return

		if (orgAddress && obj?.ethereum_address === orgAddress) return

		retrieve()
	}, [address, isLoading, isLogged, retrieve])

	const isDeployed = !isLoading || isLogged

	const isAccessible = !managed || (managed && canManage)

	return (
		<>
			{!isLoading && children}

			{isLoading && (
				<>
					{!address && <div className="loading short" />}

					{!isDeployed && isAccessible && (
						<NotDeployedEmpty badgeId={badgeId} />
					)}

					{!managed && isDeployed && <NotIndexedEmpty />}

					{isDeployed && !isAccessible && (
						<NotManagerDeploy badgeId={badgeId} />
					)}
				</>
			)}
		</>
	)
}

export { DashboardLoader }
