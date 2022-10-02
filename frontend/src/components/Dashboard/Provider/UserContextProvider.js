import { useState, createContext, useEffect } from "react"
import { API_URL } from "@static/constants/links"

export const UserContext = createContext();

const UserContextProvider = ({ children, address }) => {
    const [ userData, setUserData ] = useState();

    useEffect(() => {
        if (!address) return void {};
        
        fetch(`${API_URL}/users/by-address/${address}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(data => {
            if (data.length < 1) throw new Error("No user data found");
            console.log('got user data', data);
            setUserData(data[0]);
        })
        .catch(err => {
            console.log('error fetching user data', err);
            setUserData({address: address});
        })
    }, [address])

    return (
        <UserContext.Provider value={{userData, setUserData}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;