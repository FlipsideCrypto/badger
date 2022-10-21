import { useNavigate } from "react-router-dom";
import { useDisconnect } from "wagmi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material"

import "@style/Dashboard/Sidebar/Logout/Logout.css";

const Logout = () => { 
    const { disconnect } = useDisconnect();
    const navigate = useNavigate();

    const onDisconnect = () => {
        disconnect();
        document.cookie = 'csrftoken=; Path=/; Expires=Sat, 01 Jan 2000 00:00:001 GMT;';
        navigate("/");
    }

    return (
        <Button 
            className="logout button__unstyled" 
            onClick={() => onDisconnect()}
            sx={{textTransform: 'capitalize'}}
        >
            <FontAwesomeIcon icon={['fal', 'sign-out']} />
            <span>Logout</span>
        </Button>
    )
}

export default Logout;