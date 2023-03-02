import { createContext, useEffect, useState } from "react";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

const PRIMARY_PRODUCTION_CHAIN = process.env.REACT_APP_PRODUCTION_CHAIN

const AuthenticationContext = createContext();

const getAuthenticatedAddress = () => {
    return document.cookie.split(';').find(c => c.includes('authenticatedAddress'))?.split('=')[1];
}

const AuthenticationContextProvider = ({ children }) => {
    const { chain } = useNetwork();
    const { chains, isError, switchNetwork } = useSwitchNetwork();

    const { address, isConnected } = useAccount();

    const [authenticatedAddress, setAuthenticatedAddress] = useState(getAuthenticatedAddress());
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const primaryChain = chains.find(c => c.name === PRIMARY_PRODUCTION_CHAIN)

    const isWrongNetwork = isConnected && chain && primaryChain && chains && chain.id !== primaryChain.id;

    const isAuthenticated = isConnected && !isWrongNetwork && address === authenticatedAddress;

    useEffect(() => {
        /// Using isError here allows us to not prompt another switchNetwork if the user has already rejected the switch.
        if (isWrongNetwork && switchNetwork && !isError) switchNetwork(primaryChain.id)
    }, [isWrongNetwork, switchNetwork, isError, primaryChain.id]);

    return (
        <AuthenticationContext.Provider value={{
            primaryChain,
            authenticatedAddress,
            isAuthenticating,
            isAuthenticated,
            isWrongNetwork,
            setIsAuthenticating,
            setAuthenticatedAddress
        }}>
            {children}
        </AuthenticationContext.Provider>
    )
}

export { AuthenticationContext, AuthenticationContextProvider }