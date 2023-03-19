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
        address,
        isConnected,
        isWrongAddress
    } = useContext(AuthenticationContext);

    const { organizations } = useContext(OrgContext);
    const { badges } = useContext(BadgeContext);

    console.log(organizations, badges)

    const isLoaded = organizations !== null && badges !== null;

    return (
        <UserContext.Provider value={{
            chain,
            primaryChain,
            address,
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