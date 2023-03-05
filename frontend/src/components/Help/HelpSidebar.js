import { useContext } from "react";
import { useLocation } from "react-router-dom";

import { ErrorContext } from "@contexts";
import { ActionButton, HelpCopy } from "@components"

import "@style/Sidebar/Sidebar.css";
import "@style/Sidebar/HelpSidebar.css";

const HelpSidebar = ({ collapsed }) => {
    const { pathname } = useLocation();

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
            </div>
        </div>
    )
}

export { HelpSidebar };