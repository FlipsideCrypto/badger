import { createContext, useContext } from "react";

import { BadgeContext, OrgContext } from "@contexts";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const { organizations } = useContext(OrgContext);
    const { badges } = useContext(BadgeContext);

    const isLoaded = organizations && badges;

    return (
        <UserContext.Provider value={{ isLoaded }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider };