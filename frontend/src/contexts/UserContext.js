import { createContext, useState, useContext, useEffect } from "react";
import { useAccount, useNetwork, useSigner } from "wagmi";

import { BadgeContext, OrgContext } from "@contexts";

import { getAuthentication, getAuthenticationMessage } from "@utils";

const UserContext = createContext();

// TODO: Prompt signature just once on page load, but only if there is not an existing
//       authentication token for the connected signer. (I think this is what getAuthenticationStatus() was being used for)

const UserContextProvider = ({ children }) => {
    const { chain } = useNetwork();
    const { address } = useAccount({ onConnect });

    const { signer } = useSigner();

    const { organizations } = useContext(OrgContext);
    const { badges } = useContext(BadgeContext);

    const [authenticatedAddress, setAuthenticatedAddress] = useState(null);

    const isAuthenticated = signer?._address ? authenticatedAddress === signer._address : false;

    const onConnect = ({ address, connector, isReconnected }) => {
        console.log('Switched account to', { address, connector, isReconnected })
    }

    useEffect(() => {
        const tryAuthentication = async () => {
            // Clear any prior authentication token and prompt a signature to authenticate.
            // TODO: This should not be here.
            // document.cookie = 'csrftoken=; Path=/; Expires=Sat, 01 Jan 2000 00:00:001 GMT;';

            // Make the call to the backend.
            const { message } = await getAuthenticationMessage(address, chain?.id);

            const signature = await signer.signMessage(message.prepareMessage());

            const response = await getAuthentication(message, signature);

            // TODO: Doing nothing with this response? how is that possible?

            setAuthenticatedAddress(signer._address);
        };

        if (!signer) return

        // TODO: Handle account state

        tryAuthentication()
    }, [address, signer, chain])

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