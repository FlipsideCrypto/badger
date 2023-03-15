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

    const managerActions = [{
        className: "secondary",
        text: "Add New",
        onClick: () => {

        }
    },
    {
        className: "primary",
        text: "Save changes",
        onClick: () => {

        }
    }]

    const holderActions = [{
        className: "primary",
        text: "Save changes",
        onClick: () => {

        }
    }]

    return (
        <>
            <SEO title={`${organization.name} | ${badge.name} | Badger`} description={badge.description} />

            <Header back={() => 
                navigate(`/dashboard/organization/${chainId}/${orgAddress}/`)} 
                actions={isManager && headerActions} />

            <BadgePreview badge={badge} />

            {/* <ActionTitle title="Managers" actions={isManager && managerActions} /> */}

            <ActionTitle title="Holders" actions={isManager && holderActions} />

            {badge && badge.users.length === 0 && <Empty
                title={`${badge.name} does not have any Holders yet!`}
                body="When you add a Holder, they will appear on the list here."
            />}

            {badge && badge.users.length > 0 && <HolderTable delegates={badge.delegates} users={badge.users} />}
        </>
    )
}

export { Badge }