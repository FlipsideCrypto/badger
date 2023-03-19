import { useContext, useMemo } from "react";

import { ethers } from "ethers";

import { UserContext } from "@contexts";

function getOrgManagerKey(manager) {
    return ethers.utils.solidityKeccak256(["bytes"], [
        ethers.utils.defaultAbiCoder.encode(["address"], [manager])
    ]);
}

function getManagerKey(badgeId, manager) {
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

    console.log(isLoaded, organizations, _badges)

    const {
        chainId = chain?.id,
        orgAddress = null,
        badgeId = null
    } = props || {};

    console.log(isLoaded, chainId, orgAddress, badgeId)

    const states = useMemo(() => {
        if (!isLoaded || organizations.length == 0) return {
            organization: null,
            badges: null,
            badge: null
        }

        const organization = organizations.find((org) => {
            return org.chain_id === parseInt(chainId) && org.ethereum_address === orgAddress;
        })

        const badges = organization && _badges.filter((badge) => {
            return badge.chain_id === parseInt(chainId) && badge.ethereum_address === orgAddress;
        })

        if (!badges) return { organization, badges: null, badge: null }

        const badge = badgeId && badges.find((badge) => {
            return badge.id === parseInt(badgeId);
        })

        return { organization, badges, badge }
    }, [isLoaded, chainId, orgAddress, badgeId, organizations, _badges])

    const managers = useMemo(() => {
        console.log('in managers')

        if (!states.organization) return null;

        console.log('in managers search', states.organization.modules)

        const _managers = states.organization.modules.filter((module) => {
            return module.module_type === "manager";
        })

        if (!states.badge)
            return _managers.filter((module) => {
                return module.module_key == getOrgManagerKey(module.ethereum_address);
            })

        return _managers.filter((module) => {
            return (module.module_key == getManagerKey(states.badge.id, module.ethereum_address) ||
                module.module_key == getOrgManagerKey(module.ethereum_address))
        })
    }, [states])

    console.log(managers)

    const roles = useMemo(() => {
        const isOwner = states.organization && states.organization.owner.ethereum_address === address;

        const isManager = managers && managers.some((manager) => {
            return manager.ethereum_address === address;
        })

        const isMember = states.badge && states.badge.users.some((member) => {
            return member.ethereum_address === address;
        })

        return { isOwner, isManager, isMember }
    }, [address, states, managers])

    return {
        chain,
        primaryChain,
        address,
        organizations,
        ...states,
        managers,
        isConnected,
        isWrongNetwork,
        isLoaded,
        ...roles
    }
}

export { useUser }