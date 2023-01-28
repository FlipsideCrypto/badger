import { createContext, useContext, useEffect, useState } from "react";
import { useAccount, useNetwork, useSigner } from "wagmi";

import { BadgeContext, OrgContext } from "@contexts";

import { getAuthentication, getAuthenticationMessage } from "@utils";

const UserContext = createContext();

const getAuthenticatedAddress = () => {
    return document.cookie.split(';').find(c => c.includes('authenticatedAddress'))?.split('=')[1];
}

const UserContextProvider = ({ children }) => {
    const { chain } = useNetwork();
    const { data: signer } = useSigner();

    const { address, isConnected } = useAccount();

    const { organizations } = useContext(OrgContext);
    const { badges } = useContext(BadgeContext);

    const [authenticatedAddress, setAuthenticatedAddress] = useState(getAuthenticatedAddress());

    const isAuthenticated = isConnected && address === authenticatedAddress;

    const isLoaded = organizations && badges;

    useEffect(() => {
        const tryAuthentication = async ({ chainId, signer }) => {
            const { message } = await getAuthenticationMessage(signer._address, chainId);

            const signature = await signer.signMessage(message.prepareMessage());

            const response = await getAuthentication(message, signature);

            if (!response.success) return

            setAuthenticatedAddress(signer._address);
        };

        if (!signer || !chain || isAuthenticated) return;

        tryAuthentication({ chainId: chain.id, signer });
    }, [signer, chain])

    return (
        <UserContext.Provider value={{
            authenticatedAddress,
            organizations,
            badges,
            isConnected,
            isAuthenticated,
            isLoaded
        }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider };