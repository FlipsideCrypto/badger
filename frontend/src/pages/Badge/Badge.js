import { useParams } from "react-router-dom";

import { BadgePreview, Header, HolderTable, ManagerTable, SEO, DashboardLoader } from "@components";

import { useNavigateAddress, useUser } from "@hooks";

import "@style/pages/Badge.css";

const Badge = () => {
    const navigate = useNavigateAddress();

    const { chainId, orgAddress, badgeId } = useParams();

    const {
        organization,
        badge,
        managers,
        canManage,
        retrieve
    } = useUser({ chainId, orgAddress, badgeId });

    const headerActions = canManage && [{
        text: "Settings",
        icon: ["fal", "fa-gear"],
        onClick: () => navigate(`/dashboard/organization/${chainId}/${orgAddress}/badge/${badgeId}/edit/`)
    }]

    return (
        <>
            <SEO
                title={`${badge ? `${organization.name} // ${badge.name}` : 'Not Found'} // Badger`}
                description={badge?.description} />

            <Header back={() =>
                navigate(`/dashboard/organization/${chainId}/${orgAddress}/`)}
                actions={headerActions} />

            <DashboardLoader
                chainId={chainId}
                orgAddress={orgAddress}
                obj={badge}
                retrieve={retrieve}>
                <BadgePreview badge={badge} />

                <ManagerTable
                    badge={badge}
                    managers={managers}
                    canManage={canManage} />

                <HolderTable
                    badge={badge}
                    canManage={canManage} />
            </DashboardLoader>
        </>
    )
}

export { Badge }