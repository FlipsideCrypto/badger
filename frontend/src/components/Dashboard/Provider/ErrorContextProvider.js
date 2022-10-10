import { createContext, useState } from "react";
import ErrorCard from "@components/Card/ErrorCard";

export const ErrorContext = createContext();

const ErrorContextProvider = ({ children }) => {
    const [ error, setError ] = useState("ERROR: No error message provided. ERROR: No error message provided. ERROR: No error message provided.");

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