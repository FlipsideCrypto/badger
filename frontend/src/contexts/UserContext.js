import { createContext, useContext } from "react";

import {
    AuthenticationContext,
    OrgContext
} from "@contexts";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const {
        chain,
        primaryChain,
        isConnected,
        isWrongNetwork
    } = useContext(AuthenticationContext);

    const { address, viewing, organizations, send } = useContext(OrgContext);

    const isLoaded = organizations !== null;

    const userOrganizations = isLoaded && organizations.filter((org) => org?.retrieved !== true);

    return (
        <UserContext.Provider value={{
            chain,
            primaryChain,
            address,
            viewing,
            organizations,
            userOrganizations,
            isConnected,
            isWrongNetwork,
            isLoaded,
            send
        }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider };