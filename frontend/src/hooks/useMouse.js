import { useState, useEffect } from 'react';

const useMouse = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [lastClick, setLastClick] = useState([]);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        }
    
        const updateClick = (e) => {
            setLastClick(e);
        }

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mousedown", updateClick);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mousedown", updateClick);
        };
    }, []);


    return { mousePosition, lastClick };
}

export { useMouse }