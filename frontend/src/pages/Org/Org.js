import { useNavigate, useParams } from "react-router-dom";

import { useUser } from "@hooks";

import { ActionTitle, BadgeTable, Empty, Header, SEO } from "@components";

const Org = () => {
    const navigate = useNavigate();

    const { orgId } = useParams();

    const { badges, isOwner, organization } = useUser({ orgId });

    const headerActions = isOwner && [{
        text: "Settings",
        icon: ['fal', 'fa-gear'],
        onClick: () => navigate(`/dashboard/organization/${orgId}/edit/`)
    }];

    const titleActions = isOwner && [{
        text: "Create Badge",
        icon: ['fal', 'plus'],
        onClick: () => navigate(`/dashboard/organization/${orgId}/badge/new/`)
    }];

    return (
        <>
            <SEO title={`${organization.name} | Badger`} description={`Browse ${organization.name} and all its Badges and associated members.`} />

            <Header back={() => navigate("/dashboard/")} actions={headerActions} />

            <div className="dashboard__content">
                <ActionTitle title="Organization Badges" actions={titleActions} />

                {badges && badges.length === 0 && <Empty
                    title="No Badges in the Organization yet!"
                    body="You are one step closer to having the credentials of your onchain Organization.
                    Now you can create and distribute your badges that act as keys throughout the ecosystem in a matter of seconds."
                    button="CREATE BADGE"
                    url={`/dashboard/organization/${orgId}/badge/new/`}
                />}

                {badges && badges.length > 0 && <BadgeTable orgId={organization.id} badges={badges} />}
            </div>
        </>
    )
}

export { Org };