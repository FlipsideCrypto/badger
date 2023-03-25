import { useContext } from "react";

import { ErrorContext } from "@contexts";

const useErrorMessage = () => {
    return { ...useContext(ErrorContext) }
}

export { useErrorMessage }