import { useAuthentication, useUser } from "@hooks";

import { ConnectButton, Empty, TransactionWindow } from "@components";

import { useTransactionWindow } from "@hooks";

const connectButton = <ConnectButton className="primary" />;

const ConnectWalletEmpty = () => <Empty
    title="Connect your wallet to view your Organizations!"
    body="Connecting your wallet is simple and secure. Using Sign in with Ethereum, you can sign and create, manage, and share your Organizations and Badges in seconds just by signing a message."
    button={connectButton}
/>

const WrongNetworkEmpty = ({ primaryChain }) => <Empty
    title="Wrong Network!"
    body={`Please connect to ${primaryChain.name} network.`}
    button={connectButton}
/>

const LoadingEmpty = () => <Empty
    title="Loading Organizations and Badges..."
    body="This may take a few seconds. If this takes longer than 10 seconds, please refresh the page."
/>

const DashboardContent = ({ children }) => {
    const {
        primaryChain,
        isConnected,
        isWrongNetwork
    } = useAuthentication();

    const { isLoaded } = useUser();

    return (
        <div className="dashboard__contents">
            <div className="dashboard__content">
                <TransactionWindow />

                { !isConnected && <ConnectWalletEmpty /> }

                { isConnected && isWrongNetwork && <WrongNetworkEmpty primaryChain={primaryChain} /> }

                { isConnected && !isWrongNetwork && !isLoaded && <LoadingEmpty /> }

                { isLoaded && !isWrongNetwork && children }
            </div>
        </div>
    )
}

export { DashboardContent }