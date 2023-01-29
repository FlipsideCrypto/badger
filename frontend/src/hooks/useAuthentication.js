// I want to take the AuthenticationContext and make it a hook of useAuthentication()

import { useContext } from 'react';

import { AuthenticationContext } from '@contexts';

const useAuthentication = () => {
    const { authenticatedAddress, isAuthenticating, isAuthenticated } = useContext(AuthenticationContext);

    return { authenticatedAddress, isAuthenticating, isAuthenticated };
}

export { useAuthentication }