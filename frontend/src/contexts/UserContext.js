import { createContext, useState, useContext, useEffect, useCallback, useMemo } from "react";
import { useNetwork } from "wagmi";

import { ErrorContext } from "@contexts";

import { getUserRequest } from "@utils/api_requests";
import { SIWEAuthorize, getAuthenticationStatus } from "@utils/auth";
import { sliceAddress } from "@utils/helpers";

const UserContext = createContext();

const UserContextProvider = ({ children, signer }) => {
    const [userData, setUserData] = useState(null);
    const [authenticatedAddress, setAuthenticatedAddress] = useState(null);
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const { setError } = useContext(ErrorContext);
    const { chain } = useNetwork();

    const isAuthenticated = useMemo(() => {
        return signer?._address ? authenticatedAddress === signer._address : false;
    }, [signer, authenticatedAddress]);

    // Clear any prior authentication token and prompt a signature to authenticate.
    const tryAuthentication = useCallback(async () => {
        document.cookie = 'csrftoken=; Path=/; Expires=Sat, 01 Jan 2000 00:00:001 GMT;';
        const siweResponse = await SIWEAuthorize(signer, signer._address, chain?.id);

        if (siweResponse.success) {
            setAuthenticatedAddress(signer._address);
        } else {
            setError({
                label: "Authentication failed",
                message: siweResponse.error
            });
        }
    }, [signer, chain?.id, setError]);

    // Fetch the user data from the backend.
    const getUserData = useCallback(async () => {
        let response = await getUserRequest(signer._address);

        if (!response?.error) {
            setUserData(response);
            setError(null);
        }
        else {
            setError({
                label: 'Could not get user data',
                message: response.error
            });
        }
    }, [signer, setError])

    // Fetch API data for what wallet our authentication token is tied to.
    // If the end point returns an error regarding authentication, then authenticate.
    // If the wallet is not the same as the signer, then we set an error asking to login again.
    // If the auth token is tied to the current address, then remove the error.
    const getAuthStatus = useCallback(async () => {
        setIsAuthenticating(true);
        const authErrors = [
            "Authentication credentials were not provided.",
            "You do not have permission to perform this action.",
            "Not found.",
        ]

        const response = await getAuthenticationStatus(signer._address);

        if (authErrors.includes(response?.detail)) {
            tryAuthentication();
        }
        else if (response?.address !== signer._address) {
            setError({
                label: 'Account was changed',
                message: 'Please sign in or switch back to ' + sliceAddress(response?.address) + '.'
            });
        }
        else {
            setAuthenticatedAddress(response.address);
            setError(null);
        }
        setIsAuthenticating(false)
    }, [signer, tryAuthentication, setIsAuthenticating, setError]);

    // Upon signing in or a new account being detected, we first determine if the user
    // is already authenticated, or if the authentication is for another wallet.
    // If the current user is not the authenticated user according to state, and we're
    // not currently authenticating, check auth token for what address it is for.
    useEffect(() => {
        if (!signer || isAuthenticating) return;

        if (signer._address !== authenticatedAddress) {
            getAuthStatus(signer);
        } else {
            setError(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signer, authenticatedAddress, getAuthStatus]);

    // If the user is authenticated and we don't have their data, fetch it.
    useEffect(() => {
        if (!signer) return;

        if (
            signer._address !== userData?.ethereum_address
            && signer._address === authenticatedAddress
        ) {
            getUserData();
        }

    }, [signer, userData, authenticatedAddress, getUserData]);

    return (
        <UserContext.Provider value={{
            userData,
            setUserData,
            authenticatedAddress,
            isAuthenticated,
            tryAuthentication,
        }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider };