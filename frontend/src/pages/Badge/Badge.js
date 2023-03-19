import { useNavigate, useParams } from "react-router-dom";

import { BadgePreview, Header, HolderTable, SEO, DashboardLoader } from "@components";

import { useUser } from "@hooks";

import "@style/pages/Badge.css";

const Badge = () => {
    const navigate = useNavigate();

    const { chainId, orgAddress, badgeId } = useParams();

    const {
        organization,
        badge,
        isOwner,
        isManager
    } = useUser({ chainId, orgAddress, badgeId });

    const headerActions = [{
        text: "Settings",
        icon: ["fal", "fa-gear"],
        onClick: () => navigate(`/dashboard/organization/${chainId}/${orgAddress}/badge/${badgeId}/edit/`)
    }]

    return (
        <>
            <SEO title={`${badge ? `${organization.name} | ${badge.name}` : 'Not Found'} | Badger`}
                description={badge?.description} />

            <Header back={() =>
                navigate(`/dashboard/organization/${chainId}/${orgAddress}/`)}
                actions={isManager && headerActions} />

            <DashboardLoader chainId={chainId} orgAddress={orgAddress} obj={badge}>
                <BadgePreview badge={badge} />

                <HolderTable badge={badge} isManager={isManager} />
            </DashboardLoader>
        </>
    )
}

export { Badge }