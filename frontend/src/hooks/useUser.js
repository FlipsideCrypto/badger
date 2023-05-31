import { useContext, useMemo } from 'react';

import { ethers } from 'ethers';

import { UserContext } from '@contexts';

function getOrganizationKey(manager) {
    return ethers.utils.solidityKeccak256(['bytes'], [ethers.utils.defaultAbiCoder.encode(['address'], [manager])]);
}

function getBadgeKey(badgeId, manager) {
    return ethers.utils.solidityKeccak256(
        ['bytes'],
        [ethers.utils.defaultAbiCoder.encode(['uint256', 'address'], [badgeId, manager])],
    );
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
        send,
    } = useContext(UserContext);

    const { chainId = chain?.id, orgAddress = null, badgeId = null } = props || {};

    const organization = useMemo(() => {
        if (!isLoaded || organizations.length == 0 || !orgAddress) return null;

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

        async function getEncodedHookConfig(hook, config) {
            const schema = (await hook.CONFIG_SCHEMA()).split(',');
            return ethers.utils.defaultAbiCoder.encode(schema, config);
        }

        // const BEFORE_TRANSFER_SLOT = "0x844bb459abe62f824043e42caa262ad6859731fc48abd8966db11d779c0fe669";

        // const HOOK_SLOT = await organization.BEFORE_TRANSFER();
        // const hookConfig = await getEncodedHookConfig(hook, [0, true]);

        const getTransferBoundKey = (badgeId) => {
            return ethers.utils.solidityKeccak256(
                ['bytes'],
                [ethers.utils.defaultAbiCoder.encode(['uint256', 'bool'], [badgeId, true])],
            );
        };

        organizationHooks.map((hook) => {
            console.log('hook', hook);
            console.log('getBadgeKey', getBadgeKey(badge.token_id, hook.ethereum_address));
            console.log('getTransferBoundKey', getTransferBoundKey(badge.token_id));
            console.log('try this?');
        });

        const filter = (module) => {
            return module.is_active && module.module_key === getTransferBoundKey(badge.token_id);
        };

        return organizationHooks.filter(filter);
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
