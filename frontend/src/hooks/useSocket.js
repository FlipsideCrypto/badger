import { useEffect, useMemo, useState } from 'react';

import ReconnectingWebSocket from 'reconnecting-websocket';

const useSocket = ({ url }) => {
    const [connected, setConnected] = useState(false);
    const [objects, setObjects] = useState([]);

    const client = useMemo(() => {
        return new ReconnectingWebSocket(url);
    }, [url]);

    const callbacks = useMemo(() => ({}), []);

    const send = async (message, callback) => {
        if (client.readyState === client.OPEN) {
            const requestId = JSON.parse(message).request_id;

            // Set the callback so that we can handle the response
            callbacks[requestId] = callback;

            // Send the actual message to the server
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

        // We encountered an error
        if (data.data === null) return;

        if (data.action === 'connected') {
            setConnected(true);
        } else if (data.action === 'list') {
            setObjects(data.data);
        } else if (data.action === 'update') {
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
            setObjects([data.data]);
        } else {
            console.log('Unknown action', data);
        }
    }

    useEffect(() => {
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
    }, []);

    return {
        connected,
        data: objects,
        send
    }
}

export { useSocket }