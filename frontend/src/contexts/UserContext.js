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
        isWrongAddress
    } = useContext(AuthenticationContext);

    const { address, viewing, organizations } = useContext(OrgContext);

    const isLoaded = organizations !== null;

    return (
        <UserContext.Provider value={{
            chain,
            primaryChain,
            address,
            viewing,
            organizations,
            isConnected,
            isWrongAddress,
            isLoaded
        }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider };