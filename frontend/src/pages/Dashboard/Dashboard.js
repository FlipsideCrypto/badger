import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { useUser } from "@hooks";

import { ActionBar, ConnectButton, Dashboard as DashboardContent, Empty, SEO } from "@components";

import { Badge, BadgeForm, Home, Org, OrgForm } from "@pages";

import "@style/Dashboard/Dashboard.css";

const title = "Dashboard | Badger";
const description = "Badger is a decentralized, open-source, and community-driven platform for creating, managing, and sharing onchain organizations and badges.";

const connectButton = <ConnectButton className="primary" />;

const ConnectWalletEmpty = () => <Empty
    title="Connect your wallet to view your Organizations!"
    body="Connecting your wallet is simple and secure. Using Sign in with Ethereum, you can sign and create, manage, and share your Organizations and Badges in seconds just by signing a message."
    button={connectButton}
/>

const WrongNetworkEmpty = (primaryChain) => <Empty
    title="Wrong Network!"
    body={`Please connect to ${primaryChain.name} network.`}
    button={connectButton}
/>

const AuthenticateEmpty = () => <Empty
    title="Authenticate your wallet to view your Organizations!"
    body="Authentication is simple and secure. Using Sign in with Ethereum, you can sign and create, manage, and share your Organizations and Badges in seconds just by signing a message."
    button={connectButton}
/>

const LoadingEmpty = () => <Empty
    title="Loading Organizations and Badges..."
    body="This may take a few seconds. If this takes longer than 10 seconds, please refresh the page."
/>

const Dashboard = () => {
    const {
        isAuthenticated,
        isConnected,
        isLoaded,
        isWrongNetwork,
        primaryChain
    } = useUser();

    return (
        <>
            <SEO title={title} description={description} />

            <div className="dashboard">
                <div className="dashboard__contents">
                    <ActionBar />

                    {!isConnected && <ConnectWalletEmpty />}

                    {isConnected && isWrongNetwork && <WrongNetworkEmpty primaryChain={primaryChain} />}

                    {isConnected && (!isAuthenticated && !isWrongNetwork) && <AuthenticateEmpty />}

                    {isAuthenticated && !isLoaded && <LoadingEmpty />}

                    {isAuthenticated && isLoaded && <DashboardContent>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/organization/new/" element={<OrgForm />} />
                            <Route path="/organization/:chainId/:orgAddress/" element={<Org />} />
                            <Route path="/organization/:chainId/:orgAddress/edit/" element={<OrgForm isEdit={true} />} />
                            <Route path="/organization/:chainId/:orgAddress/badge/new/" element={<BadgeForm />} />
                            <Route path="/organization/:chainId/:orgAddress/badge/:badgeId/" element={<Badge />} />
                            <Route path="/organization/:chainId/:orgAddress/badge/:badgeId/edit/" element={<BadgeForm isEdit={true} />} />
                        </Routes>
                    </DashboardContent>}
                </div>
            </div>
        </>
    )
}

export { Dashboard };