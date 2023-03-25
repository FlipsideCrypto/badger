import { createContext } from 'react';

import { useTransactionTip } from "@hooks";

const WindowContext = createContext();



const WindowContextProvider = ({ children }) => {
    const transactionTip = useTransactionTip();

    return (
        <WindowContext.Provider value={{
            transactionTip
        }}>
            {children}
        </WindowContext.Provider>
    )
}

export { WindowContext, WindowContextProvider}