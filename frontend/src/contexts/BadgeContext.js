import { createContext } from "react"

import { useSocket } from "@hooks";

const BadgeContext = createContext();

const BadgeContextProvider = ({ children }) => {
    const {
        connected,
        data: badges,
        send
    } = useSocket({ url: 'ws://localhost:8000/ws/badge/' })

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