import { useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

import { OrgContext } from "@components/Dashboard/Provider/OrgContextProvider";

import IconButton from "@components/Button/IconButton";
import Header from "@components/Dashboard/Header/Header";
import ActionTitle from "@components/Dashboard/action-title/ActionTitle";
import BadgeTable from "@components/Table/BadgeTable";

import "@style/Dashboard/Org/Org.css";

const Org = () => {
    const navigate = useNavigate();

    const { orgData } = useContext(OrgContext);
    
    const { orgId } = useParams();

    return (
        <>
            <Header back={() => navigate("/dashboard")} />

            <div className="dashboard__content">
                <ActionTitle
                    title="Organization Badges"
                    actions={[
                        {
                            className: "home__action-button",
                            icon: ['fal', 'plus'],
                            onClick: () => navigate(`/dashboard/organization/${orgId}/badge/new`),
                            afterText: "Create badge"
                        }
                    ]}
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
                            <IconButton icon={['fal', 'arrow-right']} text="CREATE BADGE" />
                        </Link>
                    </div>}
            </div>
        </>
    )
}

export default Org;