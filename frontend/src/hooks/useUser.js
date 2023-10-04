import { useContext, useMemo } from 'react';

import { ethers } from 'ethers';

import { UserContext } from '@contexts';

import { CONTRACT_SLOTS } from '@static';

function getOrganizationKey(manager) {
    return ethers.utils.solidityKeccak256(['bytes'], [ethers.utils.defaultAbiCoder.encode(['address'], [manager])]);
}

function getBadgeKey(badgeId, manager) {
    return ethers.utils.solidityKeccak256(
        ['bytes'],
        [ethers.utils.defaultAbiCoder.encode(['uint256', 'address'], [badgeId, manager])],
    );
}

// This would be necessary if we planned to support multiple hook types, but for now we only have the one.
// async function getEncodedHookConfig(hook, config, provider) {
//     const hookContract = new ethers.Contract(hook.ethereum_address, CONFIG_SCHEMA_ABI, provider);
//     const schema = (await hookContract.CONFIG_SCHEMA()).split(',');
//     return ethers.utils.defaultAbiCoder.encode(schema, config);
// }
// const CONFIG_SCHEMA_ABI = [
//     {
//         "inputs": [],
//         "name": "CONFIG_SCHEMA",
//         "outputs": [
//             {
//                 "internalType": "string",
//                 "name": "",
//                 "type": "string"
//             }
//         ],
//         "stateMutability": "view",
//         "type": "function"
//     }
// ]

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
        send,
    } = useContext(UserContext);

    const { chainId = chain?.id, orgAddress = null, badgeId = null } = props || {};

    const organization = useMemo(() => {
        if (!isLoaded || organizations.length === 0 || !orgAddress) return null;

        return organizations.find((org) => {
            return org.chain_id === parseInt(chainId) && org.ethereum_address === orgAddress;
        });
    }, [isLoaded, chainId, orgAddress, organizations]);

    const badges = useMemo(() => {
        if (!organization) return null;

        return organization.badges;
    }, [organization]);

    const badge = useMemo(() => {
        if (!organization || !badgeId) return null;

        return organization.badges.find((badge) => {
            return badge.token_id === parseInt(badgeId);
        });
    }, [organization, badgeId]);

    const managers = useMemo(() => {
        if (!organization) return null;

        const organizationManagers = organization.modules.filter((module) => {
            return module.module_type === 'manager';
        });

        const filter = (module) => {
            if (badge)
                return (
                    module.is_active &&
                    (module.module_key === getBadgeKey(badge.token_id, module.ethereum_address) ||
                        module.module_key === getOrganizationKey(module.ethereum_address))
                );

            return module.module_key === getOrganizationKey(module.ethereum_address);
        };

        return organizationManagers.filter(filter);
    }, [organization, badge]);

    const isAccountBound = useMemo(() => {
        if (!organization || !badge) return null;

        const organizationHooks = organization.modules.filter((module) => {
            return module.module_type === 'hook';
        });

        const expectedTransferBoundConfig = (badgeId) => {
            return ethers.utils.defaultAbiCoder.encode(['uint256', 'bool'], [badgeId, true]);
        };

        const filter = (module) => {
            return module.is_active && module.module_key === CONTRACT_SLOTS.BEFORE_TRANSFER && module.moduleConfig === expectedTransferBoundConfig(badge.token_id);
        };

        const matchingTransferBoundModule = organizationHooks.filter(filter);
        console.log('organizationHooks', organizationHooks)
        console.log('matchingTransferBoundModule', matchingTransferBoundModule)

        return matchingTransferBoundModule.length > 0;
    }, [organization, badge]);

    const isOwner = useMemo(() => {
        if (!address || !organization) return false;

        if (!organization.owner) return false;

        return organization.owner.ethereum_address === address;
    }, [address, organization]);

    const isManager = useMemo(() => {
        if (!address || !managers) return false;

        return managers.some((manager) => {
            return manager.ethereum_address === address;
        });
    }, [address, managers]);

    const isMember = useMemo(() => {
        if (!address || !badge) return false;

        return badge.users.some((member) => {
            return member.ethereum_address === address;
        });
    }, [address, badge]);

    const canManage = useMemo(() => {
        if (viewing) return false;

        return isOwner || isManager;
    }, [viewing, isOwner, isManager]);

    const retrieve = () => {
        if (!chainId || !orgAddress || !send) return;

        send(
            JSON.stringify({
                action: 'retrieve',
                request_id: new Date().getTime(),
                pk: `${chainId}:${orgAddress}`,
            }),
        );
    };

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
        isAccountBound,
        canManage,
        send,
        retrieve,
    };
};

export { useUser };
