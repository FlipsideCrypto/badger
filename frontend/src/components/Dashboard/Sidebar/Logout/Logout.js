import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDisconnect } from "wagmi";

const Logout = () => { 
    const { disconnect } = useDisconnect();

    return (
        <button className="logout button__unstyled" onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
            disconnect()
        }}>
            <FontAwesomeIcon icon={['fal', 'sign-out']} />
            <span>Logout</span>
        </button>
    )
}

export default Logout;