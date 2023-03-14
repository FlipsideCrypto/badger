import { useNavigate, useParams } from "react-router-dom";

import { useUser } from "@hooks";

import { ActionTitle, BadgeTable, DashboardLoader, Empty, Header, SEO } from "@components";

const Org = () => {
    const navigate = useNavigate();

    const { chainId, orgAddress } = useParams();

    const { badges, isOwner, organization } = useUser({ chainId, orgAddress });

    const URL_BASE = `/dashboard/organization/${chainId}/${orgAddress}`;

    const headerActions = isOwner && [{
        text: "Settings",
        icon: ['fal', 'fa-gear'],
        onClick: () => navigate(`${URL_BASE}/edit/`)
    }];

    const titleActions = isOwner && [{
        className: "secondary",
        text: "Create",
        icon: ['fal', 'plus'],
        onClick: () => navigate(`${URL_BASE}/badge/new/`)
    }];

    return (
        <>
            <SEO
                title={`${organization ? organization.name : 'Not Found'} | Badger`}
                description={`Browse ${organization?.name} and all its Badges and associated members.`}
            />

            <Header back={() => navigate("/dashboard/")} actions={headerActions} />

            <DashboardLoader chainId={chainId} orgAddress={orgAddress} obj={organization}>
                <div className="dashboard__content">
                    <ActionTitle title="Badges" actions={titleActions} />

                    {badges && badges.length === 0 && <Empty
                        title={`${organization.name} does not have any Badges yet.`}
                        body="You're almost done setting up your Badger Organization. Now all you have to do is create and mint your Badges!"
                        button="Create a badge"
                        url={`${URL_BASE}/badge/new/`}
                    />}

                    {badges && badges.length > 0 && <BadgeTable badges={badges} />}
                </div>
            </ DashboardLoader>
        </>
    )
}

export { Org };