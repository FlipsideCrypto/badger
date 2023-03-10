import { createContext, useEffect, useState } from "react";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

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

    const primaryChain = chains.find(c => c.id === parseInt(CHAIN_ID));

    const isWrongNetwork = isConnected && chain && primaryChain && chains && chain.id !== primaryChain.id;

    const isAuthenticated = isConnected && !isWrongNetwork && address === authenticatedAddress;

    const isReadyToSwitch = !isError && switchNetwork && isWrongNetwork;

    useEffect(() => {
        if (isReadyToSwitch) switchNetwork(primaryChain.id)
    }, [isReadyToSwitch, primaryChain]);

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