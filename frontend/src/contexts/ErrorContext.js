import { createContext, useState } from 'react';

const ErrorContext = createContext();

const ErrorContextProvider = ({ children }) => {
    const [ error, setError ] = useState(null);

    // TODO: There's a way to catch errors within a component tree I just know it.

    return (
        <ErrorContext.Provider value={{
            error
        }}>
            {children}
        </ErrorContext.Provider>
    )
}

export { ErrorContext, ErrorContextProvider }