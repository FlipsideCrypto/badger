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
        async function getData() {
            let response = await getUserRequest(address);
            console.log('user data response', response)

            if (
                   response.detail === "Authentication credentials were not provided."
                || response.detail === "You do not have permission to perform this action."
                || response.detail === "Not found."
            ) {
                // Switching connected wallets causes the csrf token to be invalid.
                // This clearing of the cookie allows the SIWE process to start over if an invalid
                // cookie has been cached.
                document.cookie = 'csrftoken=; Path=/; Expires=Sat, 01 Jan 2000 00:00:001 GMT;';
                setAuthenticationError(true);
                setIsAuthenticating(true);
            }
            else if (response?.ethereum_address === address)
                setUserData(response);
        }

        if (
               address
            && !authenticationError 
            && userData?.ethereum_address !== address
        ) {
            getData();
        }
    }, [userData, address, authenticationError])

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