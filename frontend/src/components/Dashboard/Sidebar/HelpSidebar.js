import { useState } from "react";

import { Button } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { postFeedbackRequest } from "@utils/api_requests";

import StatusIndicators from './StatusIndicators/StatusIndicators';

import "@style/Dashboard/Sidebar/Sidebar.css";
import "@style/Dashboard/Sidebar/HelpSidebar.css";

const HelpSidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const collapseIcon = collapsed ? "chevron-left" : "chevron-right";

    const onFeedbackSubmission = async ({ liked }) => { 
        const feedbackObj = { 
            feedback_url: window.location.href,
            liked,
        }

        // TODO: Needs to be updated to support adding error when feedback is not added
        const response = await postFeedbackRequest(feedbackObj);
        if(response.status === 200) {
            console.log("Feedback submitted successfully");
        }
    }

    return (
        <div className={collapsed ? "sidebar right collapsed" : "sidebar right"}>
            <div className="sidebar__header">
                <h5>Help</h5>
                <div>
                    <Button onClick={() => { setCollapsed(!collapsed) }}>
                        <FontAwesomeIcon icon={['fal', collapseIcon]} />
                    </Button>
                </div>
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

            <div className="sidebar__footer">
                <p>Do you like this page?</p>

                <Button onClick={() => { onFeedbackSubmission({ liked: true }) }}>
                    <FontAwesomeIcon icon={['fal', 'thumbs-up']} />
                </Button>

                <Button onClick={() => { onFeedbackSubmission({ liked: false }) }}>
                    <FontAwesomeIcon icon={['fal', 'thumbs-down']} />
                </Button>
            </div>
        </div>
    )
}

export default HelpSidebar;