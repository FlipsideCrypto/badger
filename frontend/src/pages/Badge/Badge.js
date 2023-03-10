import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ActionTitle, BadgeManagementDrawer, BadgePreview, Header, HolderTable, Empty, SEO } from "@components";

import { useUser } from "@hooks";

import { badgeDrawerSelectActions as selectActions } from "@static";

import "@style/pages/Badge.css";

// TODO: Make sure that empty is all good

const Badge = () => {
    const navigate = useNavigate();

    const { chainId, orgAddress, badgeId } = useParams();

    const { authenticatedAddress, organization, badge } = useUser({ chainId, orgAddress, badgeId });

    const [drawer, setDrawer] = useState({
        collapsed: true,
        action: "Mint"
    });

    const isManager = organization && badge && (
        organization.owner.ethereum_address === authenticatedAddress ||
        badge.delegates.find(delegate => delegate.ethereum_address === authenticatedAddress)
    );

    const headerActions = [{
        text: "Settings",
        icon: ["fal", "fa-gear"],
        event: () => navigate(`/dashboard/organization/${chainId}/${orgAddress}/badge/${badgeId}/edit/`)
    }]

    const titleActions = [{
        className: "home__action-button",
        icon: ['fal', 'fa-user'],
        text: "Update holders",
        onClick: () => {
            setDrawer({
                collapsed: selectActions.slice(0, 2).includes(drawer.action) ? !drawer.collapsed : false,
                action: "Mint"
            })
        }
    },
    {
        className: "home__action-button",
        icon: ['fal', 'fa-people-roof'],
        text: "Update managers",
        onClick: () => {
            setDrawer({
                collapsed: selectActions.slice(2, 4).includes(drawer.action) ? !drawer.collapsed : false,
                action: "Add Manager"
            })
        }
    }]

    return (
        <>
            <SEO title={`${organization.name} | ${badge.name} | Badger`} description={badge.description} />

            <Header back={() => 
                navigate(`/dashboard/organization/${chainId}/${orgAddress}/`)} 
                actions={isManager && headerActions} />

            <BadgePreview badge={badge} />

            <div className="dashboard__content">
                <ActionTitle title="Badge Holders" actions={titleActions} />

                {isManager && <BadgeManagementDrawer
                    drawer={drawer} setDrawer={setDrawer}
                    badge={badge} org={organization} isManager={isManager}
                />}
            </div>

            {badge && badge.users.length + badge.delegates.length === 0 && <Empty
                title="No Holders in the Badge yet!"
                body="You've set up your Organization and your Badge. Now for the final step of sending the first set of keys to your team members."
            />}

            {badge && badge.users.length > 0 && <HolderTable delegates={badge.delegates} users={badge.users} />}
        </>
    )
}

export { Badge }