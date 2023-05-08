import { useEffect, useMemo, useState } from 'react';

import ReconnectingWebSocket from 'reconnecting-websocket';

import { useAccount } from "wagmi";

import { useLogout } from "@hooks";

const useSocket = ({ enabled, url }) => {
    const { address } = useAccount();

    const { logout } = useLogout();

    const [connected, setConnected] = useState(false);
    const [objects, setObjects] = useState(null);

    const client = useMemo(() => {
        if (!enabled) return null;

        return new ReconnectingWebSocket(url);
    }, [enabled, url]);

    const callbacks = useMemo(() => ({}), []);

    const send = async (message, callback = null) => {
        if (client.readyState === client.OPEN) {
            if (callback) {
                const requestId = JSON.parse(message).request_id;

                callbacks[requestId] = callback;
            }

            client.send(message);
        }
    };

    const handleCallback = (message) => {
        const data = JSON.parse(message.data.toString());

        if (data.request_id in callbacks) {
            callbacks[data.request_id](message);
            delete callbacks[data.request_id];

            return true;
        }
    }

    const handleAction = (message) => {
        const data = JSON.parse(message.data.toString());

        if (data.data === null) return;

        if (data.action === 'disconnected') {
            setConnected(false);

            if (data.message === 'You must be logged in to connect.') logout();
        } else if (data.action === 'connected') {
            setConnected(true);
        } else if (data.action === 'list') {
            setObjects(data.data);
        } else if (data.action === 'update' || data.action === 'partial_update') {
            setObjects(objects => objects.map(object => object.id === data.data.id ? data.data : object));
        } else if (data.action === 'create') {
            setObjects(objects => [...objects, data.data]);
        } else if (data.action === 'delete') {
            setObjects(objects => {
                const index = objects.findIndex(object => object.id === data.data.id);

                objects.splice(index, 1);

                return objects;
            });
        } else if (data.action === 'retrieve') {
            setObjects(objects => {
                const index = objects.findIndex(object => object.id === data.data.id);

                if (index === -1) {
                    return [...objects, {
                        ...data.data,
                        retrieved: true
                    }]
                }

                objects[index] = {
                    ...data.data,
                    retrieved: objects[index]?.retrieved || false
                }

                return objects;
            });
        } else {
            console.log('Unknown action', data);
        }
    }

    useEffect(() => {
        if (!enabled) return;

        client.onopen = () => {
            client.send(JSON.stringify({
                action: 'list',
                request_id: new Date().getTime()
            }));
        };

        client.onmessage = (message) => {
            const called = handleCallback(message);
            if (called) return

            handleAction(message);
        }
    }, [enabled, address]);

    return {
        connected,
        data: objects,
        send
    }
}

export { useSocket }