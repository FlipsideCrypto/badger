import { useState } from 'react';

import { useMouse } from "@hooks";

const initialState = {
    status: "",
    title: "",
    body: "",
    hash: "",
    lastClick: {}
}

const useTransactionTip = () => {
    const [state, setState] = useState(initialState);

    const { lastClick } = useMouse();

    const isActive = state.status !== '';

    const onStart = ({ title, body }) => {
        setState({
            status: 'loading',
            title,
            body,
            lastClick,
        })
    }

    const onSign = ({ title, body, hash }) => {
        setState(state => ({
            ...state,
            status: 'signed',
            title,
            body,
            hash,
        }))
    }

    const onSuccess = () => {
        setState(initialState); // Empty for now. Success message when we have it.
    }

    const onError = () => {
        setState(initialState);
    }

    const onClose = () => {
        setState(initialState);
    }

    return {
        state,
        isActive,
        onStart,
        onSign,
        onSuccess,
        onError,
        onClose
    }
}

export { useTransactionTip }