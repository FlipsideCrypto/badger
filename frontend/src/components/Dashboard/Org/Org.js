import { useParams, useNavigate, Link } from "react-router-dom";
import IconButton from "../../Button/IconButton";

import Header from "../Header/Header";

const Org = () => {
    const { org } = useParams();
    const navigate = useNavigate();

    const badges = [
        // {
        //     name: "Contributor",
        // }
    ]

    return (
        <>
            <Header back={() => navigate(-1)} />

            {badges.length > 0 ? 
                badges.map((badge, index) => (
                    <div key={"badge-" + index}>
                        <p>{badge.name}</p>
                    </div>
                ))
                :
                <div>
                    <h1>No keys in the Organization yet!</h1>
                    <p>
                        Congrats! You are one step closer to having the keys to your on-chain Organization. 
                        Now you can create and distribute your keys in a matter of seconds.
                    </p>
                    <Link className="internal-link" to={`/dashboard/badge/new/${org}`}>
                        <IconButton icon={['fal', 'arrow-right']} text="CREATE" />
                    </Link>
                </div>
            }
            
        </>
    )
}

export default Org;