import { useContext } from "react";
import { useNetwork, useSigner } from "wagmi";

import { AuthenticationContext } from "@contexts";

import { getAuthentication, getAuthenticationMessage } from "@utils";

const useAuthenticationModal = () => {
    const { chain } = useNetwork();
    const { data: signer } = useSigner();

    const { setAuthenticatedAddress } = useContext(AuthenticationContext);

    const openAuthenticationModal = () => {
        const tryAuthentication = async ({ chainId, signer }) => {
            const { message } = await getAuthenticationMessage(signer._address, chainId);

            const signature = await signer.signMessage(message.prepareMessage());

            const response = await getAuthentication(message, signature);

            if (!response.success) return

            setAuthenticatedAddress(signer._address);
        };

        if (!signer || !chain) return;

        tryAuthentication({ chainId: chain.id, signer });
    }

    return { openAuthenticationModal }
}

export { useAuthenticationModal }