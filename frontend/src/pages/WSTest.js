import { useSocket } from '../hooks/useSocket';

const WSTest = () => {
    const url = 'ws://localhost:8000/ws/badge/'; 
    const { connected, data, send } = useSocket({ url })

    return (
        <div>
            <p>Connected: {connected ? "true" : "false"}</p>
        </div>
    );
}

export default WSTest;