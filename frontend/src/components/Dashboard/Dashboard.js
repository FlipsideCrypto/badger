import { Route, Routes } from "react-router-dom";
import { useAccount } from "wagmi";

import UserContextProvider from "@components/Dashboard/Provider/UserContextProvider";
import DashboardContent from "@components/Dashboard/Content/DashboardContent";
import OrgSidebar from "@components/Dashboard/Sidebar/OrgSidebar";
import HelpSidebar from "@components/Dashboard/Sidebar/HelpSidebar";
import Home from "@components/Dashboard/Home/Home";
import OrgForm from '@components/Dashboard/Org/OrgForm';
import BadgeForm from "@components/Dashboard/Org/BadgeForm";
import Badge from "@components/Dashboard/Org/Badge";
import Org from "@components/Dashboard/Org/Org";

import "@style/Dashboard/Dashboard.css";
import OrgContextProvider from "./Provider/OrgContextProvider";

const Dashboard = () => {
    const { address } = useAccount();
    
    return (
        <div className="dashboard">
            <UserContextProvider>
                <OrgContextProvider>
                    <OrgSidebar
                        address={address}
                    />

                    <DashboardContent>
                        <Routes>
                            <Route path="/" element={ <Home /> } />
                            <Route path="/organization/new" element={ <OrgForm /> } />
                            <Route path="/organization/orgId=:orgId" element={ <Org /> } />
                            <Route path="/badge/new/orgId=:orgId" element={ <BadgeForm /> } />
                            <Route path="/badge/orgId=:orgId&badgeId=:badgeId" element={ <Badge /> } />
                        </Routes>
                    </DashboardContent>

                    <HelpSidebar />
                </OrgContextProvider>
            </UserContextProvider>
        </div>
    )
}

export default Dashboard;