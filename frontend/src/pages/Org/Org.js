import { useParams } from "react-router-dom";

import { useNavigateAddress, useUser } from "@hooks";

import { ActionTitle, BadgeTable, DashboardLoader, Empty, Header, SEO } from "@components";

const OrgEmpty = ({ organization }) => <Empty
    title={`${organization.name} does not have any Badges yet.`}
    body="You're almost done setting up your Badger Organization. Now all you have to do is create your first Badge."
    button="Create a badge"
    url={`/dashboard/organization/${organization.chain_id}/${organization.ethereum_address}/badge/new/`}
/>

const Org = () => {
    const navigate = useNavigateAddress();

    const { chainId, orgAddress } = useParams();

    const { organization, badges, canManage, send } = useUser({ chainId, orgAddress });

    const headerActions = canManage && [{
        text: "Settings",
        icon: ['fal', 'fa-gear'],
        onClick: () => navigate(`/dashboard/organization/${organization.chain_id}/${organization.ethereum_address}/edit/`)
    }];

    const titleActions = canManage && [{
        className: "secondary",
        text: "Create",
        icon: ['fal', 'plus'],
        onClick: () => navigate(`/dashboard/organization/${organization.chain_id}/${organization.ethereum_address}/badge/new/`)
    }];

    const onRetrieve = () => {
        if (!orgAddress || !send) return;

        send(JSON.stringify({
            action: "retrieve",
            request_id: new Date().getTime(),
            pk: orgAddress,
        }))
    }

    return (
        <>
            <SEO
                title={`${organization ? organization.name : 'Not Found'} // Badger`}
                description={`Browse ${organization?.name} and all its Badges and associated members.`}
            />

            <Header back={() => navigate("/dashboard/")} actions={headerActions} />

            <DashboardLoader
                chainId={chainId}
                orgAddress={orgAddress}
                obj={organization}
                retrieve={onRetrieve}
            >
                <ActionTitle title="Badges" actions={titleActions} />

                {badges && badges.length === 0 && <OrgEmpty organization={organization} />}

                {badges && badges.length > 0 && <BadgeTable badges={badges} />}
            </ DashboardLoader>
        </>
    )
}

export { Org };