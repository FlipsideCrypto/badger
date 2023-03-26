import { createContext } from "react";
import { useTransactionWindow } from "@hooks";

const WindowContext = createContext();

const useErrorModal = () => {}
const useMessageWindow = () => {}

const WindowContextProvider = ({ children }) => {
    const errorModal = useErrorModal();

    const messageWindow = useMessageWindow();

    const transactionWindow = useTransactionWindow();

    return (
        <WindowContext.Provider value={{
            errorModal,
            messageWindow,
            transactionWindow
        }}>
            {children}
        </WindowContext.Provider>
    )
}

export { WindowContext, WindowContextProvider }