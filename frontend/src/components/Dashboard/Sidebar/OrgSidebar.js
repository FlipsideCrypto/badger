import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Logout from "./Logout/Logout";

import "../../../style/Dashboard/Sidebar/OrgSidebar.css";

const OrgSidebar = ({ organizations }) => {
    console.log(organizations);

    return (
        <div className="sidebar left">
            {/* Category header with + button */}
            <div className="sidebar__category">
                <h5>Organizations</h5>
                <FontAwesomeIcon icon={['fal', 'plus']} />
            </div>

            <div className="sidebar__organizations">
                {organizations.map((org, index) => (
                    <div className="sidebar__organization" key={index}>
                        <img src={org.avatar} alt="avatar" />
                        <a href="#">{org.name}</a>
                    </div>
                ))}
            </div>

            <Logout />
        </div>
    )
}

export default OrgSidebar;