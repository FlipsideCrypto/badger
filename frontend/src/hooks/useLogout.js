import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { useDisconnect } from "wagmi";

import { AuthenticationContext } from '@contexts';

const useLogout = () => {
    const navigate = useNavigate();

    const { disconnect } = useDisconnect();

    const { setAuthenticatedAddress } = useContext(AuthenticationContext);

    const logout = () => {
        document.cookie = 'csrftoken=; Path=/; Expires=Sat, 01 Jan 2000 00:00:001 GMT;';
        document.cookie = 'authenticatedAddress=; Path=/; Expires=Sat, 01 Jan 2000 00:00:001 GMT;';
        document.cookie = 'sessionid=; Path=/; Expires=Sat, 01 Jan 2000 00:00:001 GMT;';

        disconnect({
            onSuccess: () => {
                setAuthenticatedAddress(null);
                navigate("/dashboard/")
            }
        });
    }

    return { logout }
}

export { useLogout }