import { useState, createContext, useEffect } from "react"
import { getUserRequest } from "@utils/api_requests";

export const UserContext = createContext();

const UserContextProvider = ({ children, address }) => {
    const [ userData, setUserData ] = useState();

    useEffect(() => {
        if (!address) return void {};
        
        async function getData() {
            const userDataResponse = await getUserRequest(address);
    
            if (!userDataResponse?.error) {
                setUserData(userDataResponse);
            }
            else {
                setUserData({address: address});
            }
        }

        getData();
    }, [address])

    return (
        <UserContext.Provider value={{userData, setUserData}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;