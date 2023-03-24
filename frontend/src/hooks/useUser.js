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
        viewing,
        organizations,
        userOrganizations,
        isConnected,
        isWrongNetwork,
        isLoaded,
        send
    } = useContext(UserContext);

    const {
        chainId = chain?.id,
        orgAddress = null,
        badgeId = null
    } = props || {};

    const organization = useMemo(() => {
        if (!isLoaded || organizations.length == 0 || !orgAddress) return null;

        return organizations.find((org) => {
            return org.chain_id === parseInt(chainId) && org.ethereum_address === orgAddress;
        })
    }, [isLoaded, chainId, orgAddress, organizations])

    const badges = useMemo(() => {
        if (!organization) return null;

        return organization.badges;
    }, [organization])

    const badge = useMemo(() => {
        if (!organization || !badgeId) return null;

        return organization.badges.find((badge) => {
            return badge.token_id === parseInt(badgeId);
        })
    }, [organization, badgeId])

    const managers = useMemo(() => {
        if (!organization) return null;

        const organizationManagers = organization.modules.filter((module) => {
            return module.module_type === "manager";
        })

        const filter = (module) => {
            if (badge)
                return module.is_active && (
                    module.module_key === getBadgeKey(badge.token_id, module.ethereum_address) ||
                    module.module_key === getOrganizationKey(module.ethereum_address)
                )

            return module.module_key === getOrganizationKey(module.ethereum_address)
        }

        return organizationManagers.filter(filter)
    }, [organization, badge])

    const isOwner = useMemo(() => {
        if (!address || !organization) return false;

        if (!organization.owner) return false;

        return organization.owner.ethereum_address === address;
    }, [address, organization])

    const isManager = useMemo(() => {
        if (!address || !managers) return false;

        return managers.some((manager) => {
            return manager.ethereum_address === address;
        })
    }, [address, managers])

    const isMember = useMemo(() => {
        if (!address || !badge) return false;

        return badge.users.some((member) => {
            return member.ethereum_address === address;
        })
    }, [address, badge])

    const canManage = useMemo(() => {
        if (viewing) return false;

        return isOwner || isManager;
    }, [viewing, isOwner, isManager])

    return {
        chain,
        primaryChain,
        address,
        organizations,
        userOrganizations,
        organization,
        badges,
        badge,
        managers,
        isConnected,
        isWrongNetwork,
        isLoaded,
        isOwner,
        isManager,
        isMember,
        canManage,
        send
    }
}

export { useUser }