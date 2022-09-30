import { useState, createContext } from "react"

export const UserContext = createContext();

// TODO: Put the API call in here?
const UserContextProvider = ({ children }) => {
    const [ userData, setUserData ] = useState();

    return (
        <UserContext.Provider value={{userData, setUserData}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;