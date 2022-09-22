import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDisconnect } from "wagmi";

const Logout = () => { 
    const { disconnect } = useDisconnect();

    return (
        <a className="logout" href="#" onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
            disconnect()
        }}>
            <FontAwesomeIcon icon={['fal', 'sign-out']} />
            <span>Logout</span>
        </a>
    )
}

export default Logout;