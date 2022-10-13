import { useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

import IconButton from "@components/Button/IconButton";
import Header from "@components/Dashboard/Header/Header";
import { OrgContext } from "@components/Dashboard/Provider/OrgContextProvider";
import { IPFS_GATEWAY_URL, PLACEHOLDER_AVATAR } from "@static/constants/links"

import "@style/Dashboard/Org/Org.css";

const Org = () => {
    const navigate = useNavigate();
    const { orgData } = useContext(OrgContext);
    const { orgId } = useParams();

    return (
        <>
            <Header back={() => navigate("/dashboard")} />

            {orgData?.badges?.length > 0 ? 
                <div className="org__badges">
                    {orgData.badges.map((badge, index) => (
                        <Link 
                            key={"badge-" + index} 
                            className="link-wrapper home-link" 
                            to={`/dashboard/organization/${orgId}/badge/${badge.id}`}
                        >
                            <div className="card">
                                <img 
                                    src={IPFS_GATEWAY_URL + badge.image_hash} 
                                    alt="badge" 
                                    onError={(e) => e.currentTarget.src = PLACEHOLDER_AVATAR}
                                />
                                <p>{badge.name}</p>
                                <p>Holders</p>
                                <p>{badge.users.length}</p>
                                <p>Delegates</p>
                                <p>{badge.delegates.length}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                :
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
            }
        </>
    )
}

export default Org;