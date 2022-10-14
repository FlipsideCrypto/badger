import { useState, createContext, useEffect, useCallback } from "react";
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

            // If there is any issue with authentication then we need to clear the CSRF cookie
            // and start the SIWE process.
            if (
                   response.detail === "Authentication credentials were not provided."
                || response.detail === "You do not have permission to perform this action."
                || response.detail === "Not found."
            ) {
                document.cookie = 'csrftoken=; Path=/; Expires=Sat, 01 Jan 2000 00:00:001 GMT;';
                setAuthenticationError(true);
            }
            else if (response?.ethereum_address === address) {
                setUserData(response);
                setIsAuthenticating(false);
                setAuthenticationError(false);
            }
        }

        if (
               address
            && !authenticationError 
        ) {
            getData();
        }
    }, [address, authenticationError])

   const tryAuthentication = useCallback(async () => {
        setIsAuthenticating(true);
        const siweResponse = await SIWEAuthorize(signer, address, chain?.id);

        if(siweResponse.success) {
            setAuthenticationError(false);
            setIsAuthenticating(false);
        }
    }, [signer, address, chain?.id, setAuthenticationError, setIsAuthenticating])

    // If we have an authentication error and are not currently awaiting a signature
    // for authentication, then attempt to authenticate.
    useEffect(() => {
        if (   
               authenticationError 
            && !isAuthenticating 
            && signer
        ) {
            tryAuthentication();
        }

    }, [authenticationError, isAuthenticating, signer, tryAuthentication])

    return (
        <UserContext.Provider value={{
            userData, 
            setUserData, 
            authenticationError, 
            setAuthenticationError,
            tryAuthentication
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;