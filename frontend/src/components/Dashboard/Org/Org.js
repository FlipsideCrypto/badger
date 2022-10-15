import { useContext, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

import IconButton from "@components/Button/IconButton";
import Header from "@components/Dashboard/Header/Header";
import { OrgContext } from "@components/Dashboard/Provider/OrgContextProvider";

import "@style/Dashboard/Org/Org.css";

const Org = () => {
    const navigate = useNavigate();
    const { orgData } = useContext(OrgContext);
    const { orgId } = useParams();

    // If org has a badge, then navigate to the most recent badge page.
    // This is a temporary solution until an org page is created once we
    // have more org data to show.
    useEffect(() => {
        console.log(orgData, orgId);
        console.log(orgData, parseInt(orgId), orgData === parseInt(orgId));
        const totalBadges = orgData?.badges?.length;
        if (totalBadges > 0 && orgData?.id === parseInt(orgId)) {
            const latestId = orgData?.badges[totalBadges - 1].id;
            navigate(`/dashboard/organization/${orgId}/badge/${latestId}`);
        }
    }, [orgData, navigate, orgId]);

    return (
        <>
            <Header back={() => navigate("/dashboard")} />

            <div className="org__container empty">
                <h1>No keys in the Organization yet!</h1>
                <p>
                    Congrats! You are one step closer to having the keys to your on-chain Organization. 
                    Now you can create and distribute your keys in a matter of seconds.
                </p>
                <Link className="internal-link" to={`/dashboard/organization/${orgId}/badge/new`}>
                    <IconButton icon={['fal', 'arrow-right']} text="CREATE" />
                </Link>
            </div>
        </>
    )
}

export default Org;