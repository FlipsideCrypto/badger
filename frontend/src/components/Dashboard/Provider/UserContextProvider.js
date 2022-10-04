import { useState, createContext, useEffect } from "react"
import { useNetwork } from "wagmi";

import { getUserRequest } from "@utils/api_requests";
import { SIWEAuthorize } from "@utils/auth";

export const UserContext = createContext();

const UserContextProvider = ({ children, signer, address }) => {
    const [ userData, setUserData ] = useState();
    const { chain } = useNetwork();

    useEffect(() => {
        if (!signer || !address) return void {};
        
        async function getData() {
            let response = await getUserRequest(address);

            if (response.detail === "Authentication credentials were not provided.") {
                const siweResponse = await SIWEAuthorize(signer, address, chain?.id);

                if (siweResponse.success) {
                    getData();
                }
                else {
                    console.log('Authentication Error', siweResponse)
                    return
                }
            }

            if (response?.address === address) 
                setUserData(response);
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