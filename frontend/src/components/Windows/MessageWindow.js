import { ActionButton, ConnectButton, Empty } from '@components'
import { useUser } from '@hooks'
import { useDebounce, useWindow } from '@hooks'
import '@style/Windows/MessageWindow.css'

const connectButton = <ConnectButton className="primary" />

const ConnectWalletEmpty = () => (
	<Empty
		title="Connect your wallet to view your Organizations!"
		body="Connecting your wallet is simple and secure. Using Sign in with Ethereum, you can sign and create, manage, and share your Organizations and Badges in seconds just by signing a message."
		button={connectButton}
	/>
)

const WrongNetworkEmpty = ({ primaryChain }) => (
	<Empty
		title="Wrong Network!"
		body={`Please connect to ${
			primaryChain ? primaryChain.name : 'a supported'
		} network.`}
		button={connectButton}
	/>
)

const LoadingEmpty = () => (
	<Empty
		title="Loading Organizations and Badges..."
		body="This may take a few seconds. If this takes longer than 10 seconds, please refresh the page."
	/>
)

const LoadingTransaction = ({ tip, explorer }) => (
	<Empty
		title={tip.title}
		body={tip.body}
		button={
			tip.hash && (
				<ActionButton
					className="secondary"
					afterText="Check the chain"
					link={explorer}
				/>
			)
		}
	/>
)

const MessageWindow = ({ children }) => {
	const { chain, primaryChain, isConnected, isWrongNetwork, isLoaded } =
		useUser()

	const { transaction, isTransaction } = useWindow()

	const explorer =
		chain &&
		chain.blockExplorers &&
		`${chain.blockExplorers.default}/tx/${transaction.hash}`

	const centerPoints = transaction.lastClick
		? [transaction.lastClick.pageX, transaction.lastClick.pageY]
		: [window.innerWidth / 2, window.innerHeight / 2]

	const isEmpty = isConnected && !isWrongNetwork && !isLoaded

	const isSwitchNetwork = isLoaded && isConnected && isWrongNetwork // TODO: Do we want to always show this or just when transaction input starts?

	const pending = useDebounce(
		{
			transaction,
			showTransaction: isTransaction,
			showConnect: !isConnected,
			showEmpty: isEmpty,
			showWrongNetwork: isSwitchNetwork
		},
		300
	)

	const isActive = !isConnected || isEmpty || isTransaction || isSwitchNetwork

	return (
		<>
			<div
				className={`window ${isActive ? 'active' : ''} ${
					isTransaction || pending.showTransaction
						? 'transaction'
						: 'message'
				}`}
			>
				<div
					className="bubble"
					style={{
						left: centerPoints[0] - 2500, // Circle is 5k
						top: centerPoints[1] - 2500
					}}
				/>

				<div className="window message__content">
					{pending.showTransaction && (
						<LoadingTransaction
							tip={pending.transaction}
							explorer={explorer}
						/>
					)}

					{pending.showConnect && <ConnectWalletEmpty />}

					{pending.showEmpty && <LoadingEmpty />}

					{pending.showWrongNetwork && (
						<WrongNetworkEmpty primaryChain={primaryChain} />
					)}
				</div>
			</div>

			{children}
		</>
	)
}

export { MessageWindow }
