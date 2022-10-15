import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDisconnect } from "wagmi";
import { useNavigate } from "react-router-dom";

const Logout = () => { 
    const { disconnect } = useDisconnect();
    const navigate = useNavigate();

    return (
        <button className="logout button__unstyled" onClick={() => {
            navigate("/");
            disconnect()
        }}>
            <FontAwesomeIcon icon={['fal', 'sign-out']} />
            <span>Logout</span>
        </button>
    )
}

export default Logout;