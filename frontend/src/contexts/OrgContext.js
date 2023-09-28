import { createContext, useMemo } from 'react'

import { useSocket } from '@hooks'
import { useAccount } from 'wagmi'

const OrgContext = createContext()

const OrgContextProvider = ({ children, paramAddress }) => {
	const { address } = useAccount()

	const enabled = !!(paramAddress === 'all' || paramAddress || address)

	const queryAddress = paramAddress || address
	const focusedAddress = queryAddress === 'all' ? address : queryAddress

	const url = useMemo(() => {
		if (queryAddress === 'all') {
			return `ws://localhost:8000/ws/organization/`
		} else if (queryAddress !== null) {
			return `ws://localhost:8000/ws/organization/?address=${focusedAddress}`
		}
	}, [address, enabled, focusedAddress, paramAddress])

	const {
		connected,
		data: organizations,
		send
	} = useSocket({ enabled: url && enabled, url })

	return (
		<OrgContext.Provider
			value={{
				connected,
				organizations,
				send,
				address: focusedAddress,
				viewing: paramAddress && paramAddress !== address
			}}
		>
			{children}
		</OrgContext.Provider>
	)
}

export { OrgContext, OrgContextProvider }
