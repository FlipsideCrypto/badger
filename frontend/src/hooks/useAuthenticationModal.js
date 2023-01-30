import { useContext } from "react";
import { useNetwork, useSigner } from "wagmi";

import { AuthenticationContext } from "@contexts";

import { getAuthentication, getAuthenticationMessage } from "@utils";

const useAuthenticationModal = () => {
    const { chain } = useNetwork();
    const { data: signer } = useSigner();

    const { setIsAuthenticating, setAuthenticatedAddress } = useContext(AuthenticationContext);

    const openAuthenticationModal = ({
        onAuthenticating = () => { },
        onAuthenticated = () => { },
        onError = (e) => { console.error(e) },
        onSettled = () => { },
    }) => {
        const tryAuthentication = async ({ chainId, signer }) => {
            const { message } = await getAuthenticationMessage(signer._address, chainId);

            const signature = await signer.signMessage(message.prepareMessage());

            const response = await getAuthentication(signer._address, message, signature);

            if (!response.success) return

            setAuthenticatedAddress(signer._address);
        };

        if (!signer || !chain) return;

        try {
            setIsAuthenticating(true) && onAuthenticating();

            const args = { chainId: chain.id, signer }

            tryAuthentication({ ...args }) && onAuthenticated({ ...args });
        } catch (error) {
            onError(error)
        } finally {
            setIsAuthenticating(false) && onSettled();
        }
    }

    return { openAuthenticationModal }
}

export { useAuthenticationModal }