import {
    OrgContextProvider,
    UserContextProvider
} from '@contexts';

import { useAuthentication } from '@hooks';

import { ConnectButton, Empty, ActionBar } from '@components';

const connectButton = <ConnectButton className="primary" />;

const ConnectWalletEmpty = () => <Empty
    title="Connect your wallet to view your Organizations!"
    body="Connecting your wallet is simple and secure. Using Sign in with Ethereum, you can sign and create, manage, and share your Organizations and Badges in seconds just by signing a message."
    button={connectButton}
/>

const WrongNetworkEmpty = (primaryChain) => <Empty
    title="Wrong Network!"
    body={`Please connect to ${primaryChain.name} network.`}
    button={connectButton}
/>

const LoadingEmpty = () => <Empty
    title="Loading Organizations and Badges..."
    body="This may take a few seconds. If this takes longer than 10 seconds, please refresh the page."
/>

const Dashboard = ({ children }) => {
    const {
        chain,
        primaryChain,
        address,
        isConnected,
        isWrongNetwork
    } = useAuthentication();

    const chainId = chain && parseInt(chain.id);

    return (
        <OrgContextProvider>
            <UserContextProvider chainId={chainId}>
                <ActionBar />

                {!isConnected && <ConnectWalletEmpty />}

                {isConnected && isWrongNetwork && <WrongNetworkEmpty primaryChain={primaryChain} />}

                {isConnected && !isWrongNetwork && children}
            </UserContextProvider>
        </OrgContextProvider>

        // {isConnected && !isWrongNetwork && !isLoaded && <LoadingEmpty />}
    )
}

export { Dashboard };