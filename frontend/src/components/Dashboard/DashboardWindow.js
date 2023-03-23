import { useAuthentication, useUser } from '@hooks';

import { ConnectButton, Empty, ActionButton } from '@components';

import { CHAIN_EXPLORER_URLS } from '@static';
import { useWindowMessage } from '../../hooks';

import "@style/Dashboard/DashboardWindow.css";

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

const LoadingTransaction = ({ chainId, txHash }) => <Empty
    className="transaction"
    title="Mining transaction. This may take a few seconds."
    body="Badger hasn’t detected any Organizations at this address yet. If you are sure you are in the correct place, please give us a few minutes to check the chain."
    button={<ActionButton
        className="secondary"
        afterText="Check the chain"
        link={`${CHAIN_EXPLORER_URLS[chainId]}/tx/${txHash}`}
    />}
/>

const DashboardWindow = ({ children }) => {
    const {
        primaryChain,
        isConnected,
        isWrongNetwork
    } = useAuthentication();

    const { isLoaded } = useUser();
    
    const { window, isVisible } = useWindowMessage();
    
    if (!isConnected)
        return <ConnectWalletEmpty />
    
    if (window && isVisible)
        return <LoadingTransaction 
            chainId={primaryChain.id} 
            txHash={window?.message?.details}
        />;

    if (isConnected && isWrongNetwork)
        return <WrongNetworkEmpty primaryChain={primaryChain} />

    if (isConnected && !isWrongNetwork && !isLoaded)
        return <LoadingEmpty />

    return <>{ children }</>
}

export { DashboardWindow }