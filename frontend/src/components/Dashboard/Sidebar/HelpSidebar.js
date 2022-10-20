import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Button } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ErrorContext } from "@components/Dashboard/Provider/ErrorContextProvider";
import { postFeedbackRequest } from "@utils/api_requests";

import StatusIndicators from './StatusIndicators/StatusIndicators';

import "@style/Dashboard/Sidebar/Sidebar.css";
import "@style/Dashboard/Sidebar/HelpSidebar.css";

const HelpCopy = (path) => {
    const pathArray = path.split('/');
    let statuses;

    switch (true) {
        case path === "/dashboard" || path === "/dashboard/":
            statuses = [{
                name: "Can do X",
                status: "can" // can, cannot, pending
            }]

            return (
                <>
                    <div className="sidebar__content">
                        <h5>Base Dashboard</h5>
                    </div>

                    <div className="sidebar__statuses">
                        <StatusIndicators statuses={statuses} />
                    </div>
                </>
            );
        case pathArray[3] === 'new': // Create Org Form
            statuses = [{
                name: "",
                status: "can"
            }]

            return (
                <>
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
                        <StatusIndicators statuses={statuses} />
                    </div>
                </>
            );
        case pathArray[5] === 'new': // Create Badge Form
            statuses = [{
                name: "",
                status: "can"
            }]

            return (
                <>
                    <div className="sidebar__content">
                        <h5>Create Badge</h5>
                    </div>
                    <div className="sidebar__statuses">
                        <StatusIndicators statuses={statuses} />
                    </div>
                </>
            );
        case !isNaN(parseInt(pathArray[5])): // Badge Detail
            statuses = [{
                name: "",
                status: "can"
            }]

            return (
                <>
                    <div className="sidebar__content">
                        <h5>Badge Detail</h5>
                    </div>
                    <div className="sidebar__statuses">
                        <StatusIndicators statuses={statuses} />
                    </div>
                </>
            )
        case pathArray[3] !== 'new': // Org Detail
            statuses = [{
                name: "",
                status: "can"
            }]

            return (
                <>
                    <div className="sidebar__content">
                        <h5>Org Detail</h5>
                    </div>
                    <div className="sidebar__statuses">
                        <StatusIndicators statuses={statuses} />
                    </div>
                </>
            )
        default:
            return (
                <></>
            )
    }
}

const HelpSidebar = () => {
    const [ collapsed, setCollapsed ] = useState(false);
    const { setError } = useContext(ErrorContext);

    const { pathname } = useLocation();

    const collapseIcon = collapsed ? "chevron-left" : "chevron-right";

    const onFeedbackSubmission = async ({ liked }) => { 
        const feedbackObj = { 
            feedback_url: window.location.href,
            liked,
        }

        const response = await postFeedbackRequest(feedbackObj);
        if(response.status !== 200 || response.status !== 201) {
            setError({
                label:"Feedback was not submitted",
                message: response.error
            });
        }
    }

    return (
        <div className={collapsed ? "sidebar right collapsed" : "sidebar right"}>
            <div className="sidebar__header">
                <div>
                    {pathname !== "/dashboard" && pathname !== "/dashboard/" &&
                        <Button 
                            className="button__unstyled" 
                            onClick={() => { setCollapsed(!collapsed) }} 
                            sx={{textTransform: 'capitalize'}}
                        >
                            <span style={{paddingRight: '8px', color: 'rgba(0,0,0,0.35)'}}>
                                Help
                            </span>
                            <FontAwesomeIcon icon={['fal', collapseIcon]} />
                        </Button>
                    }
                </div>
            </div>

            {HelpCopy(pathname)}

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