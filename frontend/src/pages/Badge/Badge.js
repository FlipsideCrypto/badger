import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ActionTitle, BadgeManagementDrawer, BadgePreview, Header, HolderTable, Empty } from "@components";

import { useUser } from "@hooks";

import "@style/pages/Badge.css";

const selectActions = [
    "Mint",
    "Revoke",
    "Add Manager",
    "Remove Manager"
]

const Badge = () => {
    const navigate = useNavigate();

    const { orgId, badgeId } = useParams();

    const { authenticatedAddress, organizations } = useUser()

    const [isDrawerCollapsed, setIsDrawerCollapsed] = useState(false);
    const [action, setAction] = useState("Mint");

    const org = organizations && organizations.find(org => String(org.id) === orgId);
    const badge = org?.badges?.find(badge => String(badge.id) === badgeId);

    const isLeader = org && badge && (
        org.owner.ethereum_address === authenticatedAddress ||
        badge.delegates.find(delegate => delegate.ethereum_address === authenticatedAddress)
    );

    const headerActions = isLeader && [{
        text: "Settings",
        icon: ["fal", "fa-gear"],
        event: () => navigate(`/dashboard/organization/${orgId}/badge/${badgeId}/edit/`)
    }]

    const titleActions = isLeader && [{
        className: "home__action-button",
        icon: ['fal', 'fa-user'],
        text: "Update holders",
        onClick: () => {
            setAction("Mint");
            setIsDrawerCollapsed(selectActions.slice(0, 2).includes(action) ? !isDrawerCollapsed : true)
        }
    },
    {
        className: "home__action-button",
        icon: ['fal', 'fa-people-roof'],
        text: "Update managers",
        onClick: () => {
            setAction("Add Manager");
            setIsDrawerCollapsed(selectActions.slice(2, 4).includes(action) ? !isDrawerCollapsed : true)
        }
    }]

    return (
        <>
            <Header back={() => navigate(`/dashboard/organization/${orgId}/`)} actions={headerActions} />

            <BadgePreview badge={badge} />

            <div className="dashboard__content">
                <ActionTitle title="Badge Holders" actions={titleActions} />

                {isLeader && isDrawerCollapsed && (
                    <BadgeManagementDrawer action={action} badge={badge} org={org} isLeader={isLeader} />
                )}
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