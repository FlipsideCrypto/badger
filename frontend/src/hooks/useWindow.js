import { WindowContext } from "@contexts";
import { useContext } from "react";

const useWindow = () => {
    return { ...useContext(WindowContext) }
}

export { useWindow }