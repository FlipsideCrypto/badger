import { createContext, useContext } from "react";
import { useAccount } from "wagmi";

import { AuthenticationContext, BadgeContext, OrgContext } from "@contexts";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const { isConnected } = useAccount();

    const { authenticatedAddress, isAuthenticated, isAuthenticating, isWrongNetwork, primaryChain } = useContext(AuthenticationContext);
    const { organizations } = useContext(OrgContext);
    const { badges } = useContext(BadgeContext);

    const isLoaded = organizations && badges;

    return (
        <UserContext.Provider value={{
            primaryChain,
            authenticatedAddress,
            organizations,
            badges,
            isConnected,
            isAuthenticated,
            isAuthenticating,
            isLoaded,
            isWrongNetwork
        }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider };