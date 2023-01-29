import { useContext } from "react";
import { useAccount } from "wagmi";

import { AuthenticationContext, BadgeContext, OrgContext, UserContext } from "@contexts";

const useUser = () => {
    const { isConnected } = useAccount();

    const { authenticatedAddress, isAuthenticated, isAuthenticating, isWrongNetwork, primaryChain } = useContext(AuthenticationContext);
    const { organizations } = useContext(OrgContext);
    const { badges } = useContext(BadgeContext);
    const { isLoaded } = useContext(UserContext);

    return {
        primaryChain,
        authenticatedAddress,
        organizations,
        badges,
        isConnected,
        isAuthenticated,
        isAuthenticating,
        isLoaded,
        isWrongNetwork
    }
}

export { useUser }