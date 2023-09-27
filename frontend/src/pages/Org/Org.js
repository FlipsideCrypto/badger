import { useMemo } from 'react';

import { useParams } from 'react-router-dom';

import { useNavigateAddress, useUser } from '@hooks';

import { ActionTitle, BadgeTable, DashboardLoader, Empty, Header, SEO } from '@components';

import { formatName } from '@utils';

const OrgEmpty = ({ organization }) => {
    const formattedName = useMemo(() => formatName(organization?.name), [organization?.name]);

    return (
        <Empty
            title={`${formattedName} does not have any Badges yet.`}
            body="You're almost done setting up your Badger Organization. Now all you have to do is create your first Badge."
            button="Create a badge"
            url={`/dashboard/organization/${organization.chain_id}/${organization.ethereum_address}/badge/new/`}
        />
    );
};

const OrgContent = ({ organization, badges, canManage }) => {
    const navigate = useNavigateAddress();

    const titleActions = canManage && [
        {
            className: 'secondary',
            text: 'Create',
            icon: ['fal', 'plus'],
            onClick: () =>
                navigate(
                    `/dashboard/organization/${organization.chain_id}/${organization.ethereum_address}/badge/new/`,
                ),
        },
    ];

    return (
        <>
            <ActionTitle title="Badges" actions={titleActions} />

            {badges && badges.length === 0 && <OrgEmpty organization={organization} />}

            {badges && badges.length > 0 && <BadgeTable badges={badges} />}
        </>
    );
};

const Org = () => {
    const navigate = useNavigateAddress();

    const { chainId, orgAddress } = useParams();

    const { organization, badges, canManage, retrieve } = useUser({
        chainId,
        orgAddress,
    });

    const headerActions = canManage && [
        {
            text: 'Settings',
            icon: ['fal', 'fa-gear'],
            onClick: () =>
                navigate(`/dashboard/organization/${organization.chain_id}/${organization.ethereum_address}/edit/`),
        },
    ];

    return (
        <>
            <SEO
                title={`${organization ? organization.name : 'Not Found'} // Badger`}
                description={`Browse ${organization?.name} and all its Badges and associated members.`}
            />

            <Header back={() => navigate('/dashboard/')} actions={headerActions} />

            <DashboardLoader chainId={chainId} orgAddress={orgAddress} obj={organization} retrieve={retrieve}>
                <OrgContent chainId={chainId} organization={organization} badges={badges} canManage={canManage} />
            </DashboardLoader>
        </>
    );
};

export { Org };
