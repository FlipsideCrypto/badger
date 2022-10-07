import { useContext } from "react"
import { UserContext } from "@components/Dashboard/Provider/UserContextProvider";
// import { OrgContext } from "@components/Dashboard/Provider/OrgContextProvider";

import "@style/Dashboard/Sidebar/StatusIndicators/StatusIndicators.css";

// TODO: Get the proper states for these indicators
const StatusIndicators = () => {
    const { userData } = useContext(UserContext);
    // const { orgData, currentOrgId } = useContext(OrgContext);

    const statuses = [ 
        {
            name: 'Can manage Organization',
            status: userData?.organizations?.length > 0 ? 'can' : 'cannot',
        }, 
        {
            name: 'Can manage Badges',
            status: userData?.organizations?.length > 0 ? 'can' : 'cannot'
        },
        { 
            name: 'Can manage Delegates',
            status: userData?.organizations?.[0]?.badges?.length > 0 ? 'can' : 'pending'
        },
        { 
            name: 'Can manage Badge Members',
            status: userData?.organizations?.[0]?.badges?.length > 0 ? 'can' : 'pending'
        }
    ]

    return (
        <div className="status__indicators">
            {statuses.map((status, index) => (
                <div className="status__indicator" key={index}>
                    <div className={`status__indicator__circle ${status.status}`}></div>
                    <p>{status.name}</p>
                </div>
            ))}
        </div>
    ) 
}

export default StatusIndicators;