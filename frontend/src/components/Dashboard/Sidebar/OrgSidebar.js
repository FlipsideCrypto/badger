import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Logout from "./Logout/Logout";

import "../../../style/Dashboard/Sidebar/OrgSidebar.css";

const OrgSidebar = ({ organizations }) => {

    const account = {
        monocre: "nftchance.eth",
        avatar: "https://avatars.githubusercontent.com/u/77760087?s=200&v=4"
    }

    return (
        <div className="sidebar left">
            {/* Logged in user header */}
            <div className="sidebar__header">
                <img src={account.avatar} alt="avatar" />
                <a href="#">{account.monocre}</a>
            </div>


            {/* Category header with + button */}
            <div className="sidebar__category">
                <h5>Organizations</h5>
                <FontAwesomeIcon icon={['fal', 'plus']} />
            </div>

            {/* List of organizations */}
            <div className="sidebar__organizations">
                {organizations.map((org, index) => (
                    <div className="sidebar__organization" key={index}>
                        <img src={org.avatar} alt="avatar" />
                        <a href="#">{org.name}</a>
                    </div>
                ))}
            </div>

            {/* Logout button */}
            <Logout />
        </div>
    )
}

export default OrgSidebar;