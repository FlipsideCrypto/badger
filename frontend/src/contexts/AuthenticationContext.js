import { createContext, useState } from "react";
import { useAccount } from "wagmi";

import { useAuthenticationModal } from "@hooks";

const AuthenticationContext = createContext();

const getAuthenticatedAddress = () => {
    return document.cookie.split(';').find(c => c.includes('authenticatedAddress'))?.split('=')[1];
}

const AuthenticationContextProvider = ({ children }) => {
    const { address, isConnected } = useAccount();

    const [authenticatedAddress, setAuthenticatedAddress] = useState(getAuthenticatedAddress());

    const { openAuthenticationModal } = useAuthenticationModal({
        onAuthenticated: (address) => {
            setAuthenticatedAddress(address);
        }
    });

    const isAuthenticated = isConnected && address === authenticatedAddress;

    return (
        <AuthenticationContext.Provider value={{
            authenticatedAddress,
            setAuthenticatedAddress,
            openAuthenticationModal,
            isAuthenticated
        }}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export { AuthenticationContext, AuthenticationContextProvider }