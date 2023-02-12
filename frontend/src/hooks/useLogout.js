import { useContext } from 'react';
import { useNavigate } from "react-router-dom";

import { AuthenticationContext } from '@contexts';

const useLogout = () => {
    const navigate = useNavigate();

    const { setAuthenticatedAddress } = useContext(AuthenticationContext);

    const logout = () => {
        // TODO: Reenable this once the websocket is prevented from trying to reconnect when not enabled
        // document.cookie = 'csrftoken=; Path=/; Expires=Sat, 01 Jan 2000 00:00:001 GMT;';
        
        document.cookie = 'sessionid=; Path=/; Expires=Sat, 01 Jan 2000 00:00:001 GMT;';
        document.cookie = 'authenticatedAddress=; Path=/; Expires=Sat, 01 Jan 2000 00:00:001 GMT;';
        setAuthenticatedAddress(null);
        navigate("/dashboard/")
    }

    return { logout }
}

export { useLogout }