import { createContext } from "react"
import { useAccount } from "wagmi"

import { useSocket } from "@hooks";

const BadgeContext = createContext();

const BadgeContextProvider = ({ children }) => {
    const { address } = useAccount();

    const enabled = !!address;

    const {
        connected,
        data: badges,
        send
    } = useSocket({ enabled, url: 'ws://localhost:8000/ws/badge/' })

    return (
        <BadgeContext.Provider value={{
            connected,
            badges,
            send
        }}>
            {children}
        </BadgeContext.Provider>
    )
}

export { BadgeContext, BadgeContextProvider }