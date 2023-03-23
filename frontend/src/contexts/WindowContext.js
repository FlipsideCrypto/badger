import { createContext, useState } from 'react';

const WindowContext = createContext();

const initialState = {
    status: '',
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

    const isVisible = windowState.status !== '';

    const window = () => {
        const onLoading = (obj) => {
            setWindowState({
                status: 'loading',
                ...obj
            })
        }
    
        const onSuccess = (obj) => {
            setWindowState({
                status: 'success',
                ...obj
            })
        }
    
        const onError = () => {
            setWindowState(initialState);
        }

        const onClose = () => {
            setWindowState(initialState);
        }

        return { onLoading, onSuccess, onError, onClose }
    }

    return (
        <WindowContext.Provider value={{
            window,
            windowState,
            isVisible,
        }}>
            {children}
        </WindowContext.Provider>
    )
}

export { WindowContext, WindowContextProvider}