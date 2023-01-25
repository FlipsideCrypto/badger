import { useContext } from "react";
import { useLocation } from "react-router-dom";

import { ErrorContext } from "@contexts";
import { ActionButton, HelpCopy } from "@components"

import { postFeedbackRequest } from "@utils";

import "@style/Dashboard/Sidebar/Sidebar.css";
import "@style/Dashboard/Sidebar/HelpSidebar.css";

const HelpSidebar = ({ collapsed }) => {
    const { setError } = useContext(ErrorContext);

    const { pathname } = useLocation();

    const onFeedbackSubmission = async ({ liked }) => {
        const feedbackObj = {
            feedback_url: window.location.href,
            liked,
        }

        const response = await postFeedbackRequest(feedbackObj);
        if (response.status !== 200 || response.status !== 201) {
            setError({
                label: "Feedback was not submitted",
                message: response.error
            });
        }
    }

    return (
        <div className={collapsed ? "sidebar right" : "sidebar right collapsed"}>
            <ActionButton
                afterText="Docs"
                sx={{ textTransform: 'capitalize' }}
                icon={['fal', 'books']}
                link="https://flipside-crypto.gitbook.io/badger/"
            />

            <div style={{ marginTop: "80px" }}>
                {HelpCopy(pathname)}
            </div>

            <div className="sidebar__footer">
                <p>Do you like this page?</p>

                <ActionButton
                    onClick={() => { onFeedbackSubmission({ liked: true }) }}
                    icon={['fal', 'thumbs-up']}
                    sx={{ minWidth: '36px' }}
                />
                <ActionButton
                    onClick={() => { onFeedbackSubmission({ liked: false }) }}
                    icon={['fal', 'thumbs-down']}
                    sx={{ minWidth: '36px' }}
                />
            </div>
        </div>
    )
}

export { HelpSidebar };