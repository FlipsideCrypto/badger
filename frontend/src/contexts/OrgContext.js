import { createContext } from "react"

import { BadgeContextProvider } from "@contexts"

import { useSocket } from "@hooks"

const OrgContext = createContext();

const OrgContextProvider = ({ children }) => {
    const {
        connected,
        data: organizations,
        send
    } = useSocket({ url: 'ws://localhost:8000/ws/organization/' })

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