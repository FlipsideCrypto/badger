import { useContext } from "react";
import { useAccount, useNetwork } from "wagmi";

import { AuthenticationContext, BadgeContext, OrgContext, UserContext } from "@contexts";

const useUser = (props) => {
    const { chainId = null, orgAddress = null, badgeId = null } = props || {};

    const { isConnected } = useAccount();

    const { chain } = useNetwork();

    const { authenticatedAddress, isAuthenticated, isAuthenticating, isWrongNetwork, primaryChain } = useContext(AuthenticationContext);
    const { organizations } = useContext(OrgContext);
    const { badges } = useContext(BadgeContext);
    const { isLoaded } = useContext(UserContext);

    const organization = organizations && chainId && orgAddress && organizations.find((org) => String(org.chainId) === chainId && org.address === orgAddress);
    const organizationBadges = organization && organization.badges;

    // TODO: make the badges use the dataset from the socket
    const badge = organization && badgeId && organization.badges.find((badge) => String(badge.id) === badgeId);

    const isOwner = organization && organization.owner.ethereum_address === authenticatedAddress;

    return {
        chain,
        primaryChain,
        authenticatedAddress,
        organizations,
        organization,
        badges: orgAddress ? organizationBadges : badges,
        badge,
        isConnected,
        isAuthenticated,
        isAuthenticating,
        isLoaded,
        isOwner,
        isWrongNetwork
    }
}

export { useUser }