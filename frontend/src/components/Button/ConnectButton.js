import { useContext } from "react"
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi"

import { useConnectModal } from "@rainbow-me/rainbowkit"

import { AuthenticationContext } from "@contexts"

import { useAuthenticationModal } from "@hooks"

const PRIMARY_PRODUCTION_CHAIN = process.env.REACT_APP_PRODUCTION_CHAIN

const ConnectButton = () => {
    const { chain } = useNetwork()
    const { chains, switchNetwork } = useSwitchNetwork()

    const { isConnected, isLoading } = useAccount()

    const { openConnectModal } = useConnectModal()

    const { authenticatedAddress, isAuthenticated } = useContext(AuthenticationContext)

    const { openAuthenticationModal } = useAuthenticationModal();

    const isWrongNetwork = chain?.name !== PRIMARY_PRODUCTION_CHAIN

    if (!isConnected) return <button onClick={openConnectModal} disabled={isLoading}>
        {isLoading ? "Loading..." : "Connect Wallet"}
    </button>

    if (isWrongNetwork) return <button disabled={!switchNetwork}
        onClick={switchNetwork?.bind(null, chains.find(c => c.name === PRIMARY_PRODUCTION_CHAIN)?.id)}
    >Switch to {PRIMARY_PRODUCTION_CHAIN}</button>

    return <button disabled={isAuthenticated} onClick={openAuthenticationModal}>Sign In</button>
}

export { ConnectButton }