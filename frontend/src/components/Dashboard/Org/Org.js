import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import IconButton from "@components/Button/IconButton";
import Header from "@components/Dashboard/Header/Header";
import { OrgContext } from "@components/Dashboard/Provider/OrgContextProvider";

import "@style/Dashboard/Org/Org.css";

const Org = () => {
    const navigate = useNavigate();
    const { orgData, setCurrentOrgId } = useContext(OrgContext);
    const params = new URLSearchParams(window.location.search);
    const orgId = params.get("orgId");

    // If orgId param changes then fetch or get the org data from context
    useEffect(() => {
        setCurrentOrgId(orgId)
    }, [orgId, setCurrentOrgId]);

    // If org has badges already, go to first badge in index.
    useEffect(() => {
        if (orgData?.badges?.length > 0) 
            navigate(`/dashboard/badge?orgId=${orgId}&badgeId=${orgData.badges[0].token_id}`)
    }, [orgData, navigate, orgId])

    return (
        <>
            <Header back={() => navigate("/dashboard/organization/new")} />

            {orgData?.[orgId]?.badges > 0 ? 
                orgData[orgId].badges.map((badge, index) => (
                    <div key={"badge-" + index}>
                        <p>{badge.name}</p>
                    </div>
                ))
                :
                <div className="org__container empty">
                    <h1>No keys in the Organization yet!</h1>
                    <p>
                        Congrats! You are one step closer to having the keys to your on-chain Organization. 
                        Now you can create and distribute your keys in a matter of seconds.
                    </p>
                    <Link className="internal-link" to={`/dashboard/badge/new?orgId=${orgId}`}>
                        <IconButton icon={['fal', 'arrow-right']} text="CREATE" />
                    </Link>
                </div>
            }
        </>
    )
}

export default Org;