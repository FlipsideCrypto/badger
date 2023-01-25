import { createContext, useState, useContext, useEffect, useCallback, useMemo } from "react";
import { useNetwork } from "wagmi";

import { BadgeContext, ErrorContext, OrgContext } from "@contexts";

import { getAuthenticationStatus, getUserRequest, SIWEAuthorize, sliceAddress } from "@utils";

const AUTH_ERRORS = [
    "Authentication credentials were not provided.",
    "You do not have permission to perform this action.",
    "Not found."
]

const UserContext = createContext();

const UserContextProvider = ({ children, signer }) => {
    const { chain } = useNetwork();

    const { organizations } = useContext(OrgContext)
    const { badges } = useContext(BadgeContext)

    const [userData, setUserData] = useState(null);
    const [authenticatedAddress, setAuthenticatedAddress] = useState(null);

    const isAuthenticated = useMemo(() => {
        return signer?._address ? authenticatedAddress === signer._address : false;
    }, [signer, authenticatedAddress]);

    // Clear any prior authentication token and prompt a signature to authenticate.
    const tryAuthentication = useCallback(async () => {
        document.cookie = 'csrftoken=; Path=/; Expires=Sat, 01 Jan 2000 00:00:001 GMT;';
        const siweResponse = await SIWEAuthorize(signer, signer._address, chain?.id);

        if (siweResponse.success) {
            setAuthenticatedAddress(signer._address);
        }
    }, [signer, chain?.id]);

    // Fetch the user data from the backend.
    const getUserData = useCallback(async () => {
        // TODO: If this is ran before setError is loaded, does this error out?

        let response = await getUserRequest(signer._address);

        if (!response?.error) {
            setUserData(response);
            setError(null);
            return;
        }
    }, [signer])

    // TODO: Put it out with fire!
    // Upon signing in or a new account being detected, we first determine if the user
    // is already authenticated, or if the authentication is for another wallet.
    // If the current user is not the authenticated user according to state, and we're
    // not currently authenticating, check auth token for what address it is for.
    useEffect(() => {
        let isAuthenticating = false;

        const getAuthStatus = async () => {
            // Clear any prior error.
            // setError(null);

            // Confirm the call is ready to make.
            if (!signer || isAuthenticating) return;

            // Prevent multiple calls from being made.
            isAuthenticating = true;

            // Make the call to the backend.
            const response = await getAuthenticationStatus(signer._address);

            // TODO: Improve the response handling.

            // TODO: What is going on here?
            if (AUTH_ERRORS.includes(response?.detail)) {
                tryAuthentication();
            } else if (response?.address !== signer._address) {
                // setError({
                //     label: 'Account was changed',
                //     message: 'Please sign in or switch back to ' + sliceAddress(response?.address) + '.'
                // });
            } else {
                setAuthenticatedAddress(response.address);
                // setError(null);
            }

            // Allow calls to be made again.
            isAuthenticating = false;
        }

        // Check the auth status anytime the signer.
        getAuthStatus(signer);
    }, [signer]);

    // If the user is authenticated and we don't have their data, fetch it.
    useEffect(() => {
        // TODO: What we need, just clean up
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
            organizations,
            badges,
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