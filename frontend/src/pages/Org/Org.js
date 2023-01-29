import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useUser } from "@hooks";

import { ActionTitle, BadgeTable, Empty, Header } from "@components";

const Org = () => {
    const navigate = useNavigate();

    const { orgId } = useParams();

    const { authenticatedAddress, organizations } = useUser();

    const org = organizations && organizations.find(org => String(org.id) === orgId);

    const isOwner = org && org.owner.ethereum_address === authenticatedAddress;

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
            <Header back={() => navigate("/dashboard/")} actions={headerActions} />

            <div className="dashboard__content">
                <ActionTitle title="Organization Badges" actions={titleActions} />

                {org && org.badges.length === 0 && <Empty
                    title="No Badges in the Organization yet!"
                    body="You are one step closer to having the credentials of your on-chain Organization.
                    Now you can create and distribute your badges that act as keys throughout the ecosystem in a matter of seconds."
                    button="CREATE BADGE"
                    url={`/dashboard/organization/${orgId}/badge/new/`}
                />}

                {org && org.badges.length > 0 && <BadgeTable orgId={org.id} badges={org.badges} />}
            </div>
        </>
    )
}

export { Org };