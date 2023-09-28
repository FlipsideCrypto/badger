import { createContext, useEffect } from 'react'

import { useTabActive } from '@hooks'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

const AuthenticationContext = createContext()

const AuthenticationContextProvider = ({ children }) => {
	const { chain } = useNetwork()
	const { chains, isError, switchNetwork } = useSwitchNetwork()

	const { address, isConnected } = useAccount()

	const isTabActive = useTabActive()

	const primaryChain = chains.find(c => c.id === parseInt(CHAIN_ID))

	const isWrongNetwork =
		isConnected &&
		chain &&
		primaryChain &&
		chains &&
		chain.id !== primaryChain.id

	const isReadyToSwitch = !isError && switchNetwork && isWrongNetwork

	useEffect(() => {
		if (isTabActive && isReadyToSwitch) switchNetwork(primaryChain.id)
	}, [isTabActive, isReadyToSwitch, primaryChain])

	return (
		<AuthenticationContext.Provider
			value={{
				chain,
				primaryChain,
				address,
				isConnected,
				isWrongNetwork
			}}
		>
			{children}
		</AuthenticationContext.Provider>
	)
}

export { AuthenticationContext, AuthenticationContextProvider }
