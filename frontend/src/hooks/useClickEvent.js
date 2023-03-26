import { useState, useEffect } from 'react';

const useClickEvent = () => {
    const [lastClick, setLastClick] = useState([]);

    useEffect(() => {
        const updateClick = (e) => {
            setLastClick(e);
        }

        window.addEventListener("mousedown", updateClick);

        return () => {
            window.removeEventListener("mousedown", updateClick);
        };
    }, []);


    return { lastClick };
}

export { useClickEvent }