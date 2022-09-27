import { Route, Routes } from "react-router-dom";

import OrgSidebar from "./Sidebar/OrgSidebar";
import HelpSidebar from "./Sidebar/HelpSidebar";

import DashboardContent from "./Content/DashboardContent";
import WalletWrapper from "../Wallet/WalletWrapper";

import NewOrg from '../Dashboard/Org/NewOrg';
import NewBadge from "../Dashboard/Org/NewBadge";
import Home from "./Home/Home";

import "../../style/Dashboard/Dashboard.css";
// import { useState } from "react";

const Dashboard = () => {
    // TODO: get orgs back as a state var. Removed for build preview
    // const [organizations, setOrganizations] = useState([]);

    const organizations = [
        {
            name: "Badger",
            avatar: "https://avatars.githubusercontent.com/u/77760087?s=200&v=4",
        }
    ]

    return (
        <WalletWrapper>
            <div className="dashboard">
                <OrgSidebar organizations={organizations} />

                <DashboardContent>
                    <Routes>
                        <Route path="/" element={ <Home /> } />
                        <Route path="/new/organization" element={ <NewOrg /> } />
                        <Route path="/new/badge" element={ <NewBadge /> } />
                    </Routes>
                </DashboardContent>
    
                <HelpSidebar />
            </div>
        </WalletWrapper>
    )
}

export default Dashboard;