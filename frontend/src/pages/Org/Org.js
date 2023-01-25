import { useContext, useMemo } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useAccount } from "wagmi";

import { OrgContext } from "@contexts";

import { ActionTitle, BadgeTable, IconButton, Header } from "@components";

// import "@style/Dashboard/Org/Org.css";

const Org = () => {
    const navigate = useNavigate();

    const { address } = useAccount();
    const { orgData } = useContext(OrgContext);
    const { orgId } = useParams();

    const isOwner = useMemo(() => {
        return orgData.owner.ethereum_address === address;
    }, [orgData, address])

    return (
        <>
            <Header
                back={() => navigate("/dashboard")}
                actions={isOwner ?
                    [{
                        text: "Settings",
                        icon: ['fal', 'fa-gear'],
                        event: () => navigate(`/dashboard/organization/${orgId}/edit`)
                    }] : []
                }
            />

            <div className="dashboard__content">
                <ActionTitle
                    title="Organization Badges"
                    actions={isOwner ?
                        [{
                            className: "home__action-button",
                            icon: ['fal', 'plus'],
                            onClick: () => navigate(`/dashboard/organization/${orgId}/badge/new`),
                            afterText: "Create badge"
                        }] : []
                    }
                />

                {orgData?.badges?.length > 0
                    ? <BadgeTable orgId={orgData?.id} badges={orgData?.badges} />
                    : <div className="org__container empty">
                        <h1>No Badges in {orgData?.name ? orgData?.name : "the Organization"} yet!</h1>
                        <p>
                            You are one step closer to having the credentials of your on-chain Organization.
                            Now you can create and distribute your badges that act as keys throughout the ecosystem in a matter of seconds.
                        </p>
                        <Link className="internal-link" to={`/dashboard/organization/${orgId}/badge/new`}>
                            <IconButton icon={['fal', 'arrow-right']} text="CREATE BADGE" style={{ marginTop: "40px" }} />
                        </Link>
                    </div>}
            </div>
        </>
    )
}

export { Org };