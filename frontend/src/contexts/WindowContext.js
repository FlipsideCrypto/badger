import { createContext, useState } from 'react';

const WindowContext = createContext();

const initialState = {
    status: "",
    className: "",
    message: {
        title: "",
        body: "",
        details: "",
        button: () => {}
    },
}

const WindowContextProvider = ({ children }) => {
    const [windowState, setWindowState] = useState(initialState);

    const isMessage = windowState.status !== '';

    const onLoading = (obj) => {
        setWindowState({
            status: 'loading',
            ...obj
        })
    }

    const onSuccess = (obj) => {
        setWindowState({
            status: '', // Empty for now. Success message when we have it
            ...obj
        })
    }

    const onError = () => {
        setWindowState(initialState);
    }

    const onClose = () => {
        setWindowState(initialState);
    }

    const window = {
        onLoading,
        onSuccess,
        onError,
        onClose
    }

    return (
        <WindowContext.Provider value={{
            window,
            windowState,
            isMessage,
            ...window
        }}>
            {children}
        </WindowContext.Provider>
    )
}

export { WindowContext, WindowContextProvider}