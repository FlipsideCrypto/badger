import { useUser } from "@hooks";

import { Empty, ActionButton } from "@components";

import "@style/Windows/LoadingTransaction.css";

const LoadingTransaction = ({ title, body, txHash, lastClick }) => {
    const { chain, address} = useUser();

    const explorer = chain && chain.blockExplorers && chain.blockExplorers.default;

    const explorerParams = txHash ? '/tx/' + txHash : '/address/' + address;

    return (
        <div className="window">
            <div 
                className="grow"
                style={{ top: lastClick.clientY - 1500, left: lastClick.clientX - 1500 }}
            />
            <Empty
                className="transaction"
                title={title}
                body={body}
                button={<ActionButton
                    className="secondary"
                    afterText="Check the chain"
                    link={explorer + explorerParams}
                />}
            />
        </div>
    )
}

export { LoadingTransaction }