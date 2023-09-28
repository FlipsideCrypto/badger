import { useAuthentication } from '@hooks'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount, useSwitchNetwork } from 'wagmi'

import { useAutoConnect } from '../../hooks/useAutoConnect'

const ConnectButton = props => {
	const { switchNetwork } = useSwitchNetwork()

	const { isConnected, isLoading } = useAccount()

	const { openConnectModal } = useConnectModal()

	const { primaryChain, isWrongNetwork } = useAuthentication()

	const className = props.className || 'secondary'

	useAutoConnect()

	if (isConnected && isWrongNetwork && switchNetwork)
		return (
			<button
				className={className}
				disabled={!switchNetwork}
				onClick={switchNetwork.bind(null, primaryChain.id)}
			>
				<span>Switch to {primaryChain.name}</span>
			</button>
		)

	return (
		<button
			className={className}
			onClick={openConnectModal}
			disabled={isLoading}
		>
			<span>
				{isConnected
					? 'Connected'
					: isLoading
					? 'Loading...'
					: 'Connect Wallet'}
			</span>
		</button>
	)
}

export { ConnectButton }
