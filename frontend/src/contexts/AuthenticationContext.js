import { createContext, useState } from "react";
import { useAccount } from "wagmi";

const AuthenticationContext = createContext();

const getAuthenticatedAddress = () => {
    return document.cookie.split(';').find(c => c.includes('authenticatedAddress'))?.split('=')[1];
}

const AuthenticationContextProvider = ({ children }) => {
    const { address, isConnected } = useAccount();

    const [authenticatedAddress, setAuthenticatedAddress] = useState(getAuthenticatedAddress());

    const isAuthenticated = isConnected && address === authenticatedAddress;

    return (
        <AuthenticationContext.Provider value={{
            authenticatedAddress,
            setAuthenticatedAddress,
            isAuthenticated,
            isConnected
        }}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export { AuthenticationContext, AuthenticationContextProvider }