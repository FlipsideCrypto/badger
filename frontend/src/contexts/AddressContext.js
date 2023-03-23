import { createContext } from "react";

const AddressContext = createContext();

const AddressContextProvider = ({ children }) => {
    const { address } = useAccount();

    return (
        <AddressContext.Provider value={{
            address
        }}>
            {children}
        </AddressContext.Provider>
    )
}

export { AddressContext, AddressContextProvider }