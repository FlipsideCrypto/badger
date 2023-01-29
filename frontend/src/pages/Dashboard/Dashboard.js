import { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { UserContext } from "@contexts"

import { ActionBar, Dashboard as DashboardContent, Empty, HelpSidebar } from "@components";

import { Badge, BadgeForm, Home, Org, OrgForm } from "@pages";

import "@style/Dashboard/Dashboard.css";

const Dashboard = () => {
    const { isAuthenticated, isConnected, isLoaded, isWrongNetwork, primaryChain } = useContext(UserContext);

    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className={collapsed ? "dashboard collapsed" : "dashboard"}>
            <div className="dashboard__contents">
                <ActionBar collapsed={collapsed} setCollapsed={setCollapsed} />

                {!isConnected && <Empty
                    title="Connect your wallet to view your Organizations!"
                    body="Connecting your wallet is simple and secure. Using Sign in with Ethereum, you can sign and create, manage, and share your Organizations and Badges in seconds just by signing a message."
                />}

                {isConnected && isWrongNetwork && <Empty
                    title="Wrong Network!"
                    body={`Please connect to ${primaryChain.name} network.`}
                />}

                {isConnected && (!isAuthenticated && <Empty
                    title="Authenticate your wallet to view your Organizations!"
                    body="Authentication is simple and secure. Using Sign in with Ethereum, you can sign and create, manage, and share your Organizations and Badges in seconds just by signing a message."
                />)}

                {isAuthenticated && !isLoaded && <Empty
                    title="Loading Organizations and Badges..."
                    body="This may take a few seconds. If this takes longer than 10 seconds, please refresh the page."
                />}

                {isAuthenticated && isLoaded && <DashboardContent>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/organization/new/" element={<OrgForm />} />
                        <Route path="/organization/:orgId/" element={<Org />} />
                        <Route path="/organization/:orgId/edit/" element={<OrgForm isEdit={true} />} />
                        <Route path="/organization/:orgId/badge/new/" element={<BadgeForm />} />
                        <Route path="/organization/:orgId/badge/:badgeId/" element={<Badge />} />
                        <Route path="/organization/:orgId/badge/:badgeId/edit/" element={<BadgeForm isEdit={true} />} />
                    </Routes>
                </DashboardContent>}
            </div>

            <HelpSidebar collapsed={collapsed} />
        </div>
    )
}

export { Dashboard };