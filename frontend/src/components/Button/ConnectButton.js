import { useAccount, useSwitchNetwork } from "wagmi";

import { useConnectModal } from "@rainbow-me/rainbowkit";

import { useAuthentication, useAuthenticationModal } from "@hooks";

const ConnectButton = (props) => {
    const { switchNetwork } = useSwitchNetwork();

    const { isConnected, isLoading } = useAccount();

    const { openConnectModal } = useConnectModal();

    const { primaryChain, isAuthenticating, isWrongNetwork } = useAuthentication();

    const { openAuthenticationModal } = useAuthenticationModal();

    const className = props.className || "secondary"

    if (!isConnected)
        return (
            <button
                className={className}
                onClick={openConnectModal}
                disabled={isLoading}
            >
                <span>{isLoading ? "Loading..." : "Connect Wallet"}</span>
            </button>
        );

    if (isWrongNetwork && switchNetwork)
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
            disabled={isAuthenticating}
            onClick={openAuthenticationModal}
        >
            <span>Sign In</span>
        </button>
    );
};

export { ConnectButton };
