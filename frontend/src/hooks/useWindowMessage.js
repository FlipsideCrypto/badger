import { WindowContext } from "@contexts";
import { useContext } from "react";

const useWindowMessage = () => {
    return { ...useContext(WindowContext) }
}

export { useWindowMessage }