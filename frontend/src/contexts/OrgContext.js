import { createContext, useContext } from "react"
import { useAccount } from "wagmi"

import { BadgeContextProvider } from "@contexts"

import { useSocket } from "@hooks"

const OrgContext = createContext();

const OrgContextProvider = ({ children }) => {
    const { address } = useAccount();

    const enabled = !!address;

    const {
        connected,
        data: organizations,
        send
    } = useSocket({ enabled, url: 'ws://localhost:8000/ws/organization/' })

    return (
        <OrgContext.Provider value={{
            connected,
            organizations,
            send
        }}>
            <BadgeContextProvider>
                {children}
            </BadgeContextProvider>
        </OrgContext.Provider>
    )
}

export { OrgContext, OrgContextProvider };