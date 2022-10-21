import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import { Button } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ErrorContext } from "@components/Dashboard/Provider/ErrorContextProvider";
import { postFeedbackRequest } from "@utils/api_requests";
import HelpCopy from "./HelpCopy";

import "@style/Dashboard/Sidebar/Sidebar.css";
import "@style/Dashboard/Sidebar/HelpSidebar.css";

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
                <Button 
                    className="button__unstyled" 
                    onClick={() => { setCollapsed(!collapsed) }} 
                    sx={{textTransform: 'capitalize'}}
                >
                    <span style={{paddingRight: '8px'}}>
                        Help
                    </span>
                    <FontAwesomeIcon icon={['fal', collapseIcon]} />
                </Button>
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