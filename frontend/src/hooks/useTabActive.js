import { useCallback, useEffect, useState } from "react";

const useTabActive = () => {
    const [visibilityState, setVisibilityState] = useState(true);

    const handleVisibilityChange = useCallback(() => {
        setVisibilityState(document.visibilityState === 'visible');
    }, []);

    useEffect(() => {
        document.addEventListener("visibilitychange", handleVisibilityChange)
        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange)
        }
    }, []);

    return visibilityState;
}

export { useTabActive };