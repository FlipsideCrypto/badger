import { createContext, useContext, useState } from "react";
import { useAccount } from "wagmi";

import { BadgeContext, OrgContext } from "@contexts";

import { useAuthenticationModal } from "@hooks";

const UserContext = createContext();

const getAuthenticatedAddress = () => {
    return document.cookie.split(';').find(c => c.includes('authenticatedAddress'))?.split('=')[1];
}

const UserContextProvider = ({ children }) => {
    const { address, isConnected } = useAccount();

    const { openAuthenticationModal } = useAuthenticationModal({
        onAuthenticated: (address) => {
            setAuthenticatedAddress(address);
        }
    });

    const { organizations } = useContext(OrgContext);
    const { badges } = useContext(BadgeContext);

    const [authenticatedAddress, setAuthenticatedAddress] = useState(getAuthenticatedAddress());

    const isAuthenticated = isConnected && address === authenticatedAddress;

    const isLoaded = organizations && badges;

    return (
        <UserContext.Provider value={{
            openAuthenticationModal,
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