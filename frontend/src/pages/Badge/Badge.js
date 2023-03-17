import { useNavigate, useParams } from "react-router-dom";

import { BadgePreview, Header, HolderTable, SEO, DashboardLoader } from "@components";

import { useUser } from "@hooks";

import "@style/pages/Badge.css";

// TODO: Make sure that empty is all good
const Badge = () => {
    const navigate = useNavigate();

    const { chainId, orgAddress, badgeId } = useParams();

    const { address, organization, badge } = useUser({ chainId, orgAddress, badgeId });

    const isManager = organization && badge && (
        organization.owner.ethereum_address === address ||
        badge.delegates.find(delegate => delegate.ethereum_address === address)
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