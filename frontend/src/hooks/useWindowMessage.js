import { useContext } from "react";

import { WindowContext } from "@contexts";

const useWindowMessage = () => {
    return { ...useContext(WindowContext) }
}

export { useWindowMessage }