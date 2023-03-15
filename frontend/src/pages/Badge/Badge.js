import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { ActionTitle, BadgePreview, Header, HolderTable, Empty, SEO, DashboardLoader } from "@components";

import { useUser } from "@hooks";

import "@style/pages/Badge.css";

// TODO: Make sure that empty is all good

const Badge = () => {
    const navigate = useNavigate();

    const { chainId, orgAddress, badgeId } = useParams();
    
    const { authenticatedAddress, organization, badge } = useUser({ chainId, orgAddress, badgeId });

    const isManager = organization && badge && (
        organization.owner.ethereum_address === authenticatedAddress ||
        badge.delegates.find(delegate => delegate.ethereum_address === authenticatedAddress)
    );

    const headerActions = [{
        text: "Settings",
        icon: ["fal", "fa-gear"],
        onClick: () => navigate(`/dashboard/organization/${chainId}/${orgAddress}/badge/${badgeId}/edit/`)
    }]

    return (
        <>
            <SEO title={`${organization.name} | ${badge.name} | Badger`} description={badge.description} />

            <Header back={() => 
                navigate(`/dashboard/organization/${chainId}/${orgAddress}/`)} 
                actions={isManager && headerActions} />

            <DashboardLoader chainId={chainId} orgAddress={orgAddress} obj={organization}>
                <BadgePreview badge={badge} />


                <HolderTable badge={badge} isManager={isManager} />
            </DashboardLoader>
        </>
    )
}

export { Badge }