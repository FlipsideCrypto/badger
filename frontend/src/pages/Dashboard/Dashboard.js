import { useCallback, useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useNetwork, useSwitchNetwork } from "wagmi";

import { UserContext } from "@contexts"

import { ActionBar, Dashboard as DashboardContent, Empty, HelpSidebar } from "@components";

import { Badge, BadgeForm, Home, Org, OrgForm } from "@pages";

import "@style/Dashboard/Dashboard.css";

const PRIMARY_PRODUCTION_CHAIN = process.env.REACT_APP_PRODUCTION_CHAIN;

const Dashboard = () => {
    const { chain } = useNetwork();
    const { chains, switchNetwork } = useSwitchNetwork();

    const { isAuthenticated, isConnected, isLoaded } = useContext(UserContext);

    const [collapsed, setCollapsed] = useState(false);

    const [isWrongNetwork, setIsWrongNetwork] = useState(false);

    const onSwitchNetworkRequest = useCallback(() => {
        const primaryChain = chains.find(c => c.name === PRIMARY_PRODUCTION_CHAIN)
        switchNetwork?.(primaryChain?.id)
    }, [chains, switchNetwork]);

    // If wrong network is detected, then prompt a network switch.
    useEffect(() => {
        setIsWrongNetwork(chain?.name !== PRIMARY_PRODUCTION_CHAIN)

        if (isWrongNetwork && chain)
            onSwitchNetworkRequest();
    }, [chain, isWrongNetwork, onSwitchNetworkRequest]);

    return (
        <div className={collapsed ? "dashboard collapsed" : "dashboard"}>
            <div className="dashboard__contents">
                <ActionBar collapsed={collapsed} setCollapsed={setCollapsed} />

                {!isConnected && <Empty
                    title="Connect your wallet to view your Organizations!"
                    body="Connecting your wallet is simple and secure. Using Sign in with Ethereum, you can sign and create, manage, and share your Organizations and Badges in seconds just by signing a message."
                    button="CONNECT WALLET"
                    url="/login"
                />}

                {isConnected && (!isAuthenticated && <Empty
                    title="Authenticate your wallet to view your Organizations!"
                    body="Authentication is simple and secure. Using Sign in with Ethereum, you can sign and create, manage, and share your Organizations and Badges in seconds just by signing a message."
                    button="SIGN IN"
                    url="/login"
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