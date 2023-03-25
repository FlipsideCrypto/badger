import { useUser } from "@hooks";

import { Empty, ActionButton } from "@components";

import "@style/Windows/LoadingTransaction.css";

const LoadingTransaction = ({ title, body, txHash, lastClick }) => {
    const { chain } = useUser();

    const explorer = chain && chain.blockExplorers && `${chain.blockExplorers.default}/tx/${txHash}`;

    return (
        <div className="window">
            {lastClick && <div className="grow" style={{ 
                top: lastClick.pageY - 2000, // Circle is 4k
                left: lastClick.pageX - 2000 
            }}/>}
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
    )
}

export { LoadingTransaction }