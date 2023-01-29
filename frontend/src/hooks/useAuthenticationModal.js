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

            const response = await getAuthentication(message, signature);

            if (!response.success) return

            setAuthenticatedAddress(signer._address);
        };

        if (!signer || !chain) return;

        try {
            setIsAuthenticating(true).then(onAuthenticating);

            tryAuthentication({ chainId: chain.id, signer }).then(onAuthenticated);
        } catch (error) {
            onError(error)
        } finally {
            setIsAuthenticating(false).then(onSettled);
        }
    }

    return { openAuthenticationModal }
}

export { useAuthenticationModal }