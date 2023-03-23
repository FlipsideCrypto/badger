import { createContext, useContext } from "react";

import {
    AuthenticationContext,
    BadgeContext,
    OrgContext
} from "@contexts";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const {
        chain,
        primaryChain,
        isConnected,
        isWrongAddress
    } = useContext(AuthenticationContext);

    const { address, viewing, organizations } = useContext(OrgContext);

    const { badges } = useContext(BadgeContext);

    const isLoaded = organizations !== null && badges !== null;

    return (
        <UserContext.Provider value={{
            chain,
            primaryChain,
            address,
            viewing,
            organizations,
            badges,
            isConnected,
            isWrongAddress,
            isLoaded
        }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider };