import { useParams, useNavigate, Link } from "react-router-dom";

import IconButton from "@components/Button/IconButton";
import Header from "@components/Dashboard/Header/Header";
import { useOrganizationData } from "@components/Hooks/Api";

import "@style/Dashboard/Org/Org.css";

const Org = () => {
    const { orgId } = useParams();
    const navigate = useNavigate();
    const { orgData } = useOrganizationData(1);
    console.log('orgData', orgData)

    return (
        <>
            <Header back={() => navigate(-1)} />

            {orgData?.badges > 0 ? 
                orgData.badges.map((badge, index) => (
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
                    <Link className="internal-link" to={`/dashboard/badge/new/orgId=${orgId}`}>
                        <IconButton icon={['fal', 'arrow-right']} text="CREATE" />
                    </Link>
                </div>
            }
        </>
    )
}

export default Org;