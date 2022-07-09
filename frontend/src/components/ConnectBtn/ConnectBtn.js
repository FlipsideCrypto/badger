import { ConnectButton } from "@rainbow-me/rainbowkit";
import "./ConnectBtn.css"

const ConnectBtn = () => {
    return ( 
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
            }) => {
                return (
                <div
                    {...(!mounted && {
                    'aria-hidden': true,
                    'style': {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                    },
                    })}
                >
                    {(() => {
                    if (!mounted || !account || !chain) {
                        return (
                        <button className="btn-control" onClick={openConnectModal} type="button">
                            Connect Wallet
                        </button>
                        );
                    }

                    if (chain.unsupported) {
                        return (
                        <button className="btn-control" onClick={openChainModal} type="button">
                            Wrong Network
                        </button>
                        );
                    }

                    return (
                        <div style={{ display: 'flex', gap: 12, height: '100%' }}>
                        <button
                            className="btn-control"
                            onClick={openChainModal}
                            style={{ display: 'flex', alignItems: 'center' }}
                            type="button"
                        >
                            {chain.hasIcon && (
                            <div
                                style={{
                                    background: chain.iconBackground,
                                    width: 12,
                                    height: 12,
                                    borderRadius: 999,
                                    overflow: 'hidden',
                                    marginRight: 4,
                                }}
                            >
                                {chain.iconUrl && (
                                <img
                                    alt={chain.name ?? 'Chain icon'}
                                    src={chain.iconUrl}
                                    style={{ width: 12, height: 12 }}
                                />
                                )}
                            </div>
                            )}
                            {chain.name}
                        </button>

                        <button 
                            className="btn-control"
                            onClick={openAccountModal} 
                            type="button"
                            style={{}}>
                            {account.displayName}
                        </button>
                        </div>
                    );
                    })()}
                </div>
                );
            }}
        </ConnectButton.Custom>
    )
}

export default ConnectBtn;