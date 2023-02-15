import { useAccount, useSwitchNetwork } from "wagmi";

import { useConnectModal } from "@rainbow-me/rainbowkit";

import { useAuthentication, useAuthenticationModal } from "@hooks";

const PRIMARY_PRODUCTION_CHAIN = process.env.REACT_APP_PRODUCTION_CHAIN;

const ConnectButton = () => {
    const { switchNetwork } = useSwitchNetwork();

    const { isConnected, isLoading } = useAccount();

    const { openConnectModal } = useConnectModal();

    const { primaryChain, isAuthenticating, isWrongNetwork } =
        useAuthentication();

    const { openAuthenticationModal } = useAuthenticationModal();

    if (!isConnected)
        return (
            <button onClick={openConnectModal} disabled={isLoading}>
                {isLoading ? "Loading..." : "Connect Wallet"}
            </button>
        );

    if (isWrongNetwork)
        return (
            <button
                disabled={!switchNetwork}
                onClick={switchNetwork?.bind(null, primaryChain.id)}
            >
                Switch to {PRIMARY_PRODUCTION_CHAIN}
            </button>
        );

    return (
        <button disabled={isAuthenticating} onClick={openAuthenticationModal}>
            Sign In
        </button>
    );
};

export { ConnectButton };
