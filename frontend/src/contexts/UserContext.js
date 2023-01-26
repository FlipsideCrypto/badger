import { createContext, useState, useContext, useEffect, useCallback } from "react";
import { useAccount, useNetwork, useSigner } from "wagmi";

import { BadgeContext, OrgContext } from "@contexts";

import { getAuthentication, getAuthenticationMessage } from "@utils";

const UserContext = createContext();

// TODO: Prompt signature just once on page load, but only if there is not an existing
//       authentication token for the connected signer. (I think this is what getAuthenticationStatus() was being used for)

const UserContextProvider = ({ children }) => {
    const { chain } = useNetwork();
    const { signer } = useSigner();

    const { address } = useAccount();

    const { organizations } = useContext(OrgContext);
    const { badges } = useContext(BadgeContext);

    const [authenticatedAddress, setAuthenticatedAddress] = useState(null);

    const isAuthenticated = signer?._address ? authenticatedAddress === signer._address : false;

    useEffect(() => {
        const tryAuthentication = async ({ address, chainId, signer }) => {
            // Clear any prior authentication token and prompt a signature to authenticate.
            // TODO: This should not be here.
            // document.cookie = 'csrftoken=; Path=/; Expires=Sat, 01 Jan 2000 00:00:001 GMT;';

            // Make the call to the backend.
            const { message } = await getAuthenticationMessage(address, chainId);

            const signature = await signer.signMessage(message.prepareMessage());

            const response = await getAuthentication(message, signature);

            // TODO: Doing nothing with this response? how is that possible?

            setAuthenticatedAddress(address);
        };

        if (!address || !chain || !signer) return;

        tryAuthentication({ address, chainId: chain.chainId, signer });
    }, [address, chain, signer])

    return (
        <UserContext.Provider value={{
            isAuthenticated,
            authenticatedAddress,
            organizations,
            badges
        }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider };