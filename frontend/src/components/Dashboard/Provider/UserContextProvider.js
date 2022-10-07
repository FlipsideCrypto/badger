import { useState, createContext, useEffect } from "react";
import { useNetwork } from "wagmi";

import { getUserRequest } from "@utils/api_requests";
import { SIWEAuthorize } from "@utils/auth";

export const UserContext = createContext();

const UserContextProvider = ({ children, signer, address }) => {
    const [ userData, setUserData ] = useState();
    const [ authenticationError, setAuthenticationError ] = useState();
    const { chain } = useNetwork();

    useEffect(() => {
        if (
            !signer || 
            !address ||
            userData?.ethereum_address === address
        ) return void {};
        
        async function getData() {
            let response = await getUserRequest(address);

            if (response.detail === "Authentication credentials were not provided.")
                setAuthenticationError(true);

            if (response?.ethereum_address === address)
                setUserData(response);
        }

        getData();
    }, [userData, signer, address, chain])

    useEffect(() => {
        async function getAuthorized() {
            const siweResponse = await SIWEAuthorize(signer, address, chain?.id);

            siweResponse.success ? 
                  setUserData({})
                : console.log('Authentication Error', siweResponse)
            setAuthenticationError(null);
        }
        
        if (!userData && authenticationError) {
            getAuthorized();
        }

    }, [authenticationError, setAuthenticationError])

    return (
        <UserContext.Provider value={{
            userData, 
            setUserData, 
            authenticationError, 
            setAuthenticationError
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;