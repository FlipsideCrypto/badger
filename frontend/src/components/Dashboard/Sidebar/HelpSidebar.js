import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import StatusIndicators from './StatusIndicators/StatusIndicators'

import "../../../style/Dashboard/Sidebar/Sidebar.css";
import "../../../style/Dashboard/Sidebar/HelpSidebar.css";

const HelpSidebar = () => {
    return (
        <div className="sidebar right">
            <div className="sidebar__header">
                <FontAwesomeIcon icon={["fal", "chevron-left"]} />
                <h5>Help</h5>
            </div>

            <div className="sidebar__content">
                <h5>What is a Delegate?</h5>
                <p>You are defining an Organization. Once this
                    has been created, you can begin to design
                    Badges for your team.</p>

                <p>Badges are represented by ERC1155 token
                    ID #s and allow Organizations to easily
                    interoperate with tools such as Guild.xyz</p>
            </div>

            <div className="sidebar__statuses">
                <StatusIndicators />
            </div>
        </div>
    )
}

export default HelpSidebar;