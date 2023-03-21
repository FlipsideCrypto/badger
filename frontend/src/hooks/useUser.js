import { useContext, useMemo } from "react";

import { ethers } from "ethers";

import { UserContext } from "@contexts";

function getOrganizationKey(manager) {
    return ethers.utils.solidityKeccak256(["bytes"], [
        ethers.utils.defaultAbiCoder.encode(["address"], [manager])
    ]);
}

function getBadgeKey(badgeId, manager) {
    return ethers.utils.solidityKeccak256(["bytes"], [
        ethers.utils.defaultAbiCoder.encode(["uint256", "address"], [badgeId, manager])
    ]);
}

const useUser = (props) => {
    const {
        chain,
        primaryChain,
        address,
        organizations,
        badges: _badges,
        isConnected,
        isWrongNetwork,
        isLoaded
    } = useContext(UserContext);

    const {
        chainId = chain?.id,
        orgAddress = null,
        badgeId = null
    } = props || {};

    const states = useMemo(() => {
        if (!isLoaded || organizations.length == 0 || !orgAddress) return {
            organization: null,
            badges: null,
            badge: null,
            managers: null
        }

        const organization = organizations.find((org) => {
            return org.chain_id === parseInt(chainId) && org.ethereum_address === orgAddress;
        })

        const organizationManagers = organization && organization.modules.filter((module) => {
            return module.module_type === "manager";
        })

        const badges = organization && _badges.filter((badge) => {
            return badge.chain_id === parseInt(chainId) && badge.ethereum_address === orgAddress;
        })

        if (!badges) return { organization, badges: null, badge: null }

        const badge = badgeId && badges.find((badge) => {
            return badge.token_id === parseInt(badgeId);
        })

        const filter = (module) => {
            if (badge)
                return module.module_key == getBadgeKey(badge.token_id, module.ethereum_address) ||
                    module.module_key == getOrganizationKey(module.ethereum_address)

            return module.module_key == getOrganizationKey(module.ethereum_address)
        }

        const managers = organizationManagers && organizationManagers.filter(filter)

        return { organization, badges, badge, managers }
    }, [isLoaded, chainId, orgAddress, badgeId, organizations, _badges])

    const roles = useMemo(() => {
        if (!address || !states.organization) return {
            isOwner: false,
            isManager: false,
            isMember: false,
            canManage: false
        }

        const isOwner = states.organization.owner && states.organization.owner.ethereum_address === address;

        const isManager = states.managers && states.managers.some((manager) => {
            return manager.ethereum_address === address;
        })

        const isMember = states.badge && states.badge.users.some((member) => {
            return member.ethereum_address === address;
        })

        return {
            isOwner,
            isManager,
            isMember,
            canManage: isOwner || isManager
        }
    }, [address, states])

    return {
        chain,
        primaryChain,
        address,
        organizations,
        ...states,
        isConnected,
        isWrongNetwork,
        isLoaded,
        ...roles
    }
}

export { useUser }