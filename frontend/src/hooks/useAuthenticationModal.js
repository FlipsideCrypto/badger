import { useContext } from "react";
import { useNetwork, useSigner } from "wagmi";

import { AuthenticationContext } from "@contexts";

import { getAuthentication, getAuthenticationMessage } from "@utils";

const useAuthenticationModal = ({ onAuthenticated = () => { } }) => {
    const { chain } = useNetwork();
    const { data: signer } = useSigner();

    const { setIsAuthenticating, setAuthenticatedAddress } = useContext(AuthenticationContext);

    const openAuthenticationModal = () => {
        const tryAuthentication = async ({ chainId, signer }) => {
            const { message } = await getAuthenticationMessage(signer._address, chainId);

            const signature = await signer.signMessage(message.prepareMessage());

            const response = await getAuthentication(message, signature);

            if (!response.success) return

            setAuthenticatedAddress(signer._address).then(() => onAuthenticated());
        };

        if (!signer || !chain) return;

        try {
            setIsAuthenticating(true);

            tryAuthentication({ chainId: chain.id, signer });
        } catch (error) {
            console.error(error);
        } finally {
            setIsAuthenticating(false);
        }
    }

    return { openAuthenticationModal }
}

export { useAuthenticationModal }