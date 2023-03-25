import { useAuthentication, useUser } from "@hooks";

import { ConnectButton, ActionButton, Empty, LoadingTransaction } from "@components";

import { useWindowMessage, useDebounce } from "@hooks";

// const connectButton = <ConnectButton className="primary" />;

// const ConnectWalletEmpty = () => <Empty
//     title="Connect your wallet to view your Organizations!"
//     body="Connecting your wallet is simple and secure. Using Sign in with Ethereum, you can sign and create, manage, and share your Organizations and Badges in seconds just by signing a message."
//     button={connectButton}
// />

// const WrongNetworkEmpty = ({ primaryChain }) => <Empty
//     title="Wrong Network!"
//     body={`Please connect to ${primaryChain.name} network.`}
//     button={connectButton}
// />

// const LoadingEmpty = () => <Empty
//     title="Loading Organizations and Badges..."
//     body="This may take a few seconds. If this takes longer than 10 seconds, please refresh the page."
// />

import "@style/Windows/LoadingTransaction.css";

const TransactionWindow = ({ children }) => {
    const { chain, isLoaded } = useUser();

    const { transactionTip, isTransaction } = useWindowMessage().transactionWindow;
    
    const { title, body, txHash } = useDebounce(transactionTip, 200);

    const explorer = chain && chain.blockExplorers && `${chain.blockExplorers.default}/tx/${txHash}`;

    return (
        <>
            <div className={`window ${isTransaction && "active"}`}>
                <div className="bubble" style={{ 
                    top: transactionTip.lastClick.pageY - 2500, // Circle is 5k
                    left: transactionTip.lastClick.pageX - 2500
                }}/>
                <Empty
                    className="transaction"
                    title={title}
                    body={body}
                    button={txHash && 
                        <ActionButton
                            className="secondary"
                            afterText="Check the chain"
                            link={explorer}
                        />
                    }
                />
            </div>

            { isLoaded && children }
        </>
    )
}

export { TransactionWindow }