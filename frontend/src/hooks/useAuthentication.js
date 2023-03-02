import { useContext } from 'react';

import { AuthenticationContext } from '@contexts';

const useAuthentication = () => {
    const { authenticatedAddress, isAuthenticating, isAuthenticated, primaryChain, isWrongNetwork } = useContext(AuthenticationContext);

    return { authenticatedAddress, isAuthenticating, isAuthenticated, primaryChain, isWrongNetwork };
}

export { useAuthentication }