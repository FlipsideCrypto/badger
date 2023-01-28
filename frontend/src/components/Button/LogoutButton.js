import { useNavigate } from "react-router-dom";
import { useDisconnect } from "wagmi";

import { ActionButton } from "@components";

import "@style/Button/LogoutButton.css";

const LogoutButton = () => {
    const { disconnect } = useDisconnect();
    const navigate = useNavigate();

    const onDisconnect = () => {
        document.cookie = 'csrftoken=; Path=/; Expires=Sat, 01 Jan 2000 00:00:001 GMT;';
        document.cookie = 'authenticatedAddress=; Path=/; Expires=Sat, 01 Jan 2000 00:00:001 GMT;';

        disconnect({ onSuccess: () => { navigate("/dashboard/") } });
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