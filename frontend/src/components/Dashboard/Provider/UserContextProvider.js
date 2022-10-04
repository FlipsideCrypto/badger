import { useState, createContext, useEffect } from "react"
import { useNetwork } from "wagmi";

import { getUserRequest } from "@utils/api_requests";
import { SIWEAuthorize } from "@utils/auth";

export const UserContext = createContext();

const UserContextProvider = ({ children, signer, address }) => {
    const [ userData, setUserData ] = useState();
    const { chain } = useNetwork();

    useEffect(() => {
        if (!signer) return void {};
        
        async function getData() {
            const response = await getUserRequest(address);
            console.log('userDataResponse', response);

            if (
                response.error || 
                response.detail === "Authentication credentials were not provided."
            ) {
                const siweResponse = await SIWEAuthorize(signer, address, chain?.id);
                console.log('SIWE Response', {...siweResponse})

                const userDataResponse = await getUserRequest(address);
                console.log('trying userData again after login', userDataResponse)
                setUserData(userDataResponse);
            } else {
                setUserData(response);
            }
            // if (!userDataResponse?.error) {
            //     setUserData(userDataResponse);
            // }
            // else {
            //     setUserData({address: address});
            // }
        }

        getData();
    }, [signer, address, chain])

    return (
        <UserContext.Provider value={{userData, setUserData}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;