import { createContext, useState, useContext, useEffect } from "react";
import { useNetwork } from "wagmi";

import { BadgeContext, OrgContext } from "@contexts";

import { getAuthentication, getAuthenticationSignature } from "@utils";

const AUTH_ERRORS = [
    "Authentication credentials were not provided.",
    "You do not have permission to perform this action.",
    "Not found."
]

const UserContext = createContext();

const UserContextProvider = ({ children, signer }) => {
    const { chain } = useNetwork();

    // const { organizations } = useContext(OrgContext);
    const { badges } = useContext(BadgeContext);

    const [authenticatedAddress, setAuthenticatedAddress] = useState(null);

    const isAuthenticated = signer?._address ? authenticatedAddress === signer._address : false;

    const tryAuthentication = async () => {
        // Clear any prior authentication token and prompt a signature to authenticate.
        // TODO: This should not be here.
        // document.cookie = 'csrftoken=; Path=/; Expires=Sat, 01 Jan 2000 00:00:001 GMT;';

        // Make the call to the backend.
        const { message, signature } = await getAuthenticationSignature(signer, signer._address, chain?.id);

        const response = await getAuthentication(message, signature);

        // TODO: Doing nothing with this response? how is that possible?

        setAuthenticatedAddress(signer._address);
    };

    return (
        <UserContext.Provider value={{
            isAuthenticated,
            authenticatedAddress,
            // organizations,
            badges,
            tryAuthentication
        }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider };