import { useContext } from 'react';

import { AuthenticationContext } from '@contexts';

const useAuthentication = () => {
    const { authenticatedAddress, isAuthenticating, isAuthenticated } = useContext(AuthenticationContext);

    return { authenticatedAddress, isAuthenticating, isAuthenticated };
}

export { useAuthentication }