import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { ErrorCard } from "@components";

const ErrorContext = createContext();

const ErrorContextProvider = ({ children }) => {
    const [error, setError] = useState({ label: "", message: "" });
    const { pathname } = useLocation();

    // Clear the error if the path changes.
    useEffect(() => {
        setError(null);
    }, [pathname, setError])

    return (
        <ErrorContext.Provider value={{ error, setError }}>
            {error &&
                <ErrorCard label={error.label} message={error.message} />
            }
            {children}
        </ErrorContext.Provider>
    )
}

export { ErrorContext, ErrorContextProvider };