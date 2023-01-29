import { createContext, useContext } from "react";

import { AuthenticationContext, BadgeContext, OrgContext } from "@contexts";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const { authenticatedAddress, isAuthenticated, isConnected } = useContext(AuthenticationContext);
    const { organizations } = useContext(OrgContext);
    const { badges } = useContext(BadgeContext);

    const isLoaded = organizations && badges;

    return (
        <UserContext.Provider value={{
            authenticatedAddress,
            organizations,
            badges,
            isConnected,
            isAuthenticated,
            isLoaded
        }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider };