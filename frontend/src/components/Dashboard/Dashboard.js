import { Route, Routes } from "react-router-dom";
import { useAccount, useSigner } from "wagmi";

import UserContextProvider from "@components/Dashboard/Provider/UserContextProvider";
import OrgContextProvider from "@components/Dashboard//Provider/OrgContextProvider";
import DashboardContent from "@components/Dashboard/Content/DashboardContent";
import OrgSidebar from "@components/Dashboard/Sidebar/OrgSidebar";
import HelpSidebar from "@components/Dashboard/Sidebar/HelpSidebar";
import Home from "@components/Dashboard/Home/Home";
import OrgForm from '@components/Dashboard/Org/OrgForm';
import BadgeForm from "@components/Dashboard/Org/BadgeForm";
import Badge from "@components/Dashboard/Org/Badge";
import Org from "@components/Dashboard/Org/Org";

import "@style/Dashboard/Dashboard.css";
import { useEffect } from "react";

const Dashboard = () => {
    const { data: signer } = useSigner();
    const { address } = useAccount();

    useEffect(() => {
        
    }, [signer, address])

    return (
        <div className="dashboard">
            <UserContextProvider signer={signer} address={address}>
                <OrgContextProvider>
                    <OrgSidebar address={address} />

                    <DashboardContent>
                        <Routes>
                            <Route path="/" element={ <Home /> } />
                            <Route path="/organization/new" element={ <OrgForm /> } />
                            <Route path="/organization" element={ <Org /> } />
                            <Route path="/badge/new" element={ <BadgeForm /> } />
                            <Route path="/badge" element={ <Badge /> } />
                        </Routes>
                    </DashboardContent>

                    <HelpSidebar />

                </OrgContextProvider>
            </UserContextProvider>
        </div>
    )
}

export default Dashboard;