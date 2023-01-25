import { useNavigate } from "react-router-dom";
import { useDisconnect } from "wagmi";

import { ActionButton } from "@components";

import "@style/Button/LogoutButton.css";

const LogoutButton = () => {
    const { disconnect } = useDisconnect();
    const navigate = useNavigate();

    const onDisconnect = () => {
        disconnect();
        document.cookie = 'csrftoken=; Path=/; Expires=Sat, 01 Jan 2000 00:00:001 GMT;';
        navigate("/");
    }

    return (
        <ActionButton
            className="logout"
            onClick={() => onDisconnect()}
            afterText="Logout"
            sx={{ textTransform: 'capitalize' }}
            icon={['fal', 'sign-out']}
        />
    )
}

export { LogoutButton };