import { useState } from 'react';

import { useMouse } from "@hooks";

const useTransactionWindow = () => {
    const initialState = {
        status: "",
        title: "",
        body: "",
        hash: "",
        lastClick: {}
    }

    const [transactionTip, setTransactionTip] = useState(initialState);

    const { lastClick } = useMouse();

    const isActive = transactionTip.status !== "";

    const onStart = ({ title, body }) => {
        setTransactionTip({
            status: 'loading',
            title,
            body,
            lastClick,
        })
    }

    const onSign = ({ title, body, hash }) => {
        setTransactionTip(state => ({
            ...state,
            status: 'signed',
            title,
            body,
            hash,
        }))
    }

    const onSuccess = () => {
        setTransactionTip(initialState); // Empty for now. Success message when we have it.
    }

    const onError = () => {
        setTransactionTip(initialState);
    }

    const onClose = () => {
        setTransactionTip(initialState);
    }

    return {
        transactionTip,
        isActive,
        onStart,
        onSign,
        onSuccess,
        onError,
        onClose
    }
}

export { useTransactionWindow }