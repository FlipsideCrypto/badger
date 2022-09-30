import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAccount } from "wagmi";

import DashboardContent from "@components/Dashboard/Content/DashboardContent";
import OrgSidebar from "@components/Dashboard/Sidebar/OrgSidebar";
import HelpSidebar from "@components/Dashboard/Sidebar/HelpSidebar";

import Home from "@components/Dashboard/Home/Home";
import OrgForm from '@components/Dashboard/Org/OrgForm';
import BadgeForm from "@components/Dashboard/Org/BadgeForm";
import Badge from "@components/Dashboard/Org/Badge";
import Org from "@components/Dashboard/Org/Org";

import "@style/Dashboard/Dashboard.css";

const Dashboard = () => {
    const [ userData, setUserData ] = useState();
    const { address } = useAccount();
    
    useEffect(() => {
        if (!address) return;

        fetch(`http://localhost:8000/users/?address=${address}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(res => res.json())
        .then(data => {
            console.log('orgdata', data);
            setUserData(data[0]);
        })
    }, [address])
    
    return (
        <div className="dashboard">
            <OrgSidebar
                address={address}
                organizations={userData?.organizations}
                ensName={userData?.ens_name}
            />

            <DashboardContent>
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/organization/new" element={ <OrgForm /> } />
                    <Route path="/organization/:org" element={ <Org /> } />
                    <Route path="/badge/new/:org" element={ <BadgeForm /> } />
                    <Route path="/badge/:org&:id" element={ <Badge /> } />
                </Routes>
            </DashboardContent>

            <HelpSidebar />
        </div>
    )
}

export default Dashboard;