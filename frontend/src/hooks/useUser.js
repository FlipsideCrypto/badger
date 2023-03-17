import { useContext } from "react";

import { AuthenticationContext, BadgeContext, OrgContext, UserContext } from "@contexts";

const useUser = (props) => {
    const { chainId = null, orgAddress = null, badgeId = null } = props || {};

    const {
        chain,
        primaryChain,
        address,
        isConnected,
        isWrongNetwork
    } = useContext(AuthenticationContext);

    const { organizations } = useContext(OrgContext);
    const { badges: _badges } = useContext(BadgeContext);
    const { isLoaded } = useContext(UserContext);

    const isOrganizationReady = organizations && chainId && orgAddress && organizations.length > 0;

    const organization = isOrganizationReady && organizations.find((org) => org.chain_id === parseInt(chainId) && org.ethereum_address === orgAddress);

    const badges = organization && _badges && _badges.filter((badge) => badge.ethereum_address === orgAddress)

    const badge = organization && badgeId && badges.find((badge) => String(badge.id) === badgeId);

    const isOwner = organization && organization.owner.ethereum_address === address;

    return {
        chain,
        primaryChain,
        address,
        organizations,
        organization,
        badges: orgAddress ? badges : _badges,
        badge,
        isConnected,
        isLoaded,
        isOwner,
        isWrongNetwork
    }
}

export { useUser }