import { useState, createContext, useEffect } from "react";
import { useNetwork } from "wagmi";

import { getUserRequest } from "@utils/api_requests";
import { SIWEAuthorize } from "@utils/auth";

export const UserContext = createContext();

const UserContextProvider = ({ children, signer, address }) => {
    const [ userData, setUserData ] = useState();
    const [ isAuthenticating, setIsAuthenticating ] = useState(false);
    const [ authenticationError, setAuthenticationError ] = useState(false);
    const { chain } = useNetwork();

    // Get user data from backend and set it to userData.
    // If user is not authenticated, run the authentication flow.
    useEffect(() => {
        if (
            !address ||
            userData?.ethereum_address === address
        ) return void {};
        
        async function getData() {
            let response = await getUserRequest(address);

            if (response.detail === "Authentication credentials were not provided.") {
                setAuthenticationError(true);
                setIsAuthenticating(true);
            }

            if (response?.ethereum_address === address)
                setUserData(response);
        }

        getData();
    }, [userData, address])

    // If we have an authentication error and are not currently awaiting a signature
    // for authentication, then attempt to authenticate.
    useEffect(() => {
        async function getAuthorized() {
            const siweResponse = await SIWEAuthorize(signer, address, chain?.id);

            if(siweResponse.success) {
                setUserData({})
                setAuthenticationError(false);
            }

            setIsAuthenticating(false);
        }
        
        if (authenticationError && isAuthenticating) {
            getAuthorized();
        }

    }, [authenticationError, setAuthenticationError, isAuthenticating, chain, signer, address])

    return (
        <UserContext.Provider value={{
            userData, 
            setUserData, 
            authenticationError, 
            setAuthenticationError,
            isAuthenticating,
            setIsAuthenticating
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;