import { useContext } from 'react';
import { useNavigate } from "react-router-dom";

import { AuthenticationContext } from '@contexts';

const useLogout = () => {
    const navigate = useNavigate();

    const { setAuthenticatedAddress } = useContext(AuthenticationContext);

    const logout = () => {
        // TODO: Reenable this once the websocket is prevented from trying to reconnect when not enabled
        // document.cookie = 'csrftoken=; Path=/; Expires=Sat, 01 Jan 2000 00:00:001 GMT;';
        
        // TODO: We cannot clear the sessionid cookie because it is an HTTP_ONLY cookie, so we need to find 
        //       a way to clear it on the backend in order to facilitate a proper logout and switch of accounts.
        //       We could make the sessionid be a non HTTP_ONLY cookie, but apparently it is a security risk.
        // document.cookie = 'sessionid=; Path=/; Expires=Sat, 01 Jan 2000 00:00:001 GMT;';
        document.cookie = 'authenticatedAddress=; Path=/; Expires=Sat, 01 Jan 2000 00:00:001 GMT;';
        setAuthenticatedAddress(null);
        navigate("/dashboard/")
    }

    return { logout }
}

export { useLogout }