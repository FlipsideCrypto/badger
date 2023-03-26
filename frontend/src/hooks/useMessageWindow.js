import { useState } from 'react';

import { useMouse } from "@hooks";

const useMessageWindow = () => {
    const initialState = {
        status: "",
        title: "",
        body: "",
        hash: "",
        lastClick: {}
    }

    const [message, setMessage] = useState(initialState);

    const { lastClick } = useMouse();

    const isMessage = message.status !== "";

    const onStart = ({ title, body }) => {
        setMessage({
            status: 'loading',
            title,
            body,
            lastClick,
        })
    }

    const onSign = ({ title, body, hash }) => {
        setMessage(state => ({
            ...state,
            status: 'signed',
            title,
            body,
            hash,
        }))
    }

    const onSuccess = () => {
        setMessage(initialState); // Empty for now. Success message when we have it.
    }

    const onError = () => {
        setMessage(initialState);
    }

    const onClose = () => {
        setMessage(initialState);
    }

    return {
        message,
        isMessage,
        onStart,
        onSign,
        onSuccess,
        onError,
        onClose
    }
}

export { useMessageWindow }