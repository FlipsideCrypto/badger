import { useState, createContext, useEffect } from "react"
import { getUserRequest } from "@utils/api_requests";
import { API_URL } from "@static/constants/links"

export const UserContext = createContext();

const UserContextProvider = ({ children, address }) => {
    const [ userData, setUserData ] = useState();

    useEffect(async () => {
        if (!address) return void {};
        
        const userDataResponse = await getUserRequest(address);

        if (!userDataResponse?.error) {
            setUserData(userDataResponse);
        }
        else {
            setUserData({address: address});
        }
    }, [address])

    return (
        <UserContext.Provider value={{userData, setUserData}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;