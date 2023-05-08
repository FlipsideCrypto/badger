import { useAccount, useSwitchNetwork } from "wagmi";

import { useConnectModal } from "@rainbow-me/rainbowkit";

import { useAuthentication } from "@hooks";

const ConnectButton = (props) => {
    const { switchNetwork } = useSwitchNetwork();

    const { isConnected, isLoading } = useAccount();

    const { openConnectModal } = useConnectModal();

    const { primaryChain, isWrongNetwork } = useAuthentication();

    const className = props.className || "secondary"

    if (isConnected && isWrongNetwork && switchNetwork)
        return (
            <button
                className={className}
                disabled={!switchNetwork}
                onClick={switchNetwork.bind(null, primaryChain.id)}
            >
                <span>Switch to {primaryChain.name}</span>
            </button>
        );

    return (
        <button
            className={className}
            onClick={openConnectModal}
            disabled={isLoading}
        >
            <span>{isConnected ? "Connected" : isLoading ? "Loading..." : "Connect Wallet"}</span>
        </button>
    );
};

export { ConnectButton };
