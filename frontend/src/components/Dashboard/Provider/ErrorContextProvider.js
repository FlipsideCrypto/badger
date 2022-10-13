import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ErrorCard from "@components/Card/ErrorCard";


export const ErrorContext = createContext();

const ErrorContextProvider = ({ children }) => {
    const [ error, setError ] = useState();
    const { pathname } = useLocation();

    // Clear the error if the path changes.
    useEffect(() => {
        setError(null);
    }, [pathname, setError])

    return (
        <ErrorContext.Provider value={{ error, setError }}>
            { error &&
                <ErrorCard message={error} setError={setError} />
            }
            {children}
        </ErrorContext.Provider>
    )
}

export default ErrorContextProvider;