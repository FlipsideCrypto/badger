import { createContext } from "react"
import { useAccount } from "wagmi"

import { useSocket } from "@hooks"

const OrgContext = createContext();

const OrgContextProvider = ({ children, paramAddress }) => {
    const { address } = useAccount();

    const enabled = !!(paramAddress || address);

    const focusedAddress = paramAddress || address;

    const {
        connected,
        data: organizations,
        send
    } = useSocket({
        enabled,
        url: `ws://localhost:8000/ws/organization/?address=${focusedAddress}`
    })

    return (
        <OrgContext.Provider value={{
            connected,
            organizations,
            send,
            address: focusedAddress,
            viewing: paramAddress && paramAddress !== address
        }}>
            {children}
        </OrgContext.Provider>
    )
}

export { OrgContext, OrgContextProvider };