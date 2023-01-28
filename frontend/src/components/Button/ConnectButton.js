import { useAccount, useNetwork, useSwitchNetwork } from "wagmi"

import { useConnectModal } from "@rainbow-me/rainbowkit"

import { sliceAddress } from "@utils"

const PRIMARY_PRODUCTION_CHAIN = process.env.REACT_APP_PRODUCTION_CHAIN

const ConnectButton = () => {
    const { chain } = useNetwork()
    const { chains, switchNetwork } = useSwitchNetwork()

    const { address, isConnected, isIdle, isLoading } = useAccount()

    const { openConnectModal } = useConnectModal()

    const isWrongNetwork = chain?.name !== PRIMARY_PRODUCTION_CHAIN

    if (!isConnected) return <button onClick={openConnectModal}>
        {isIdle || isLoading ? "Loading..." : "Connect Wallet"}
    </button>

    if (isWrongNetwork) return <button
        disabled={!switchNetwork}
        onClick={switchNetwork?.bind(null, chains.find(c => c.name === PRIMARY_PRODUCTION_CHAIN)?.id)}
    >Switch to {PRIMARY_PRODUCTION_CHAIN}</button>

    return <button onClick={() => { }}>Sign In</button>
}

export { ConnectButton }