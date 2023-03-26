import { createContext } from "react";
import { useTransactionWindow } from "@hooks";

const WindowContext = createContext();

const useErrorModal = () => {}

const WindowContextProvider = ({ children }) => {
    const errorModal = useErrorModal();

    const transactionWindow = useTransactionWindow();

    return (
        <WindowContext.Provider value={{
            errorModal,
            transactionWindow
        }}>
            {children}
        </WindowContext.Provider>
    )
}

export { WindowContext, WindowContextProvider }