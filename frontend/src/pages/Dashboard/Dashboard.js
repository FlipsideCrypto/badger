import { Route, Routes } from "react-router-dom";

import { ActionBar, Dashboard as DashboardContent, SEO } from "@components";

import { Badge, BadgeForm, Home, Org, OrgForm } from "@pages";

import "@style/Dashboard/Dashboard.css";

const title = "Dashboard | Badger";
const description = "Badger is a decentralized, open-source, and community-driven platform for creating, managing, and sharing onchain organizations and badges.";

const Dashboard = () => {
    return (
        <>
            <SEO title={title} description={description} />

            <div className="dashboard">
                <div className="dashboard__contents">
                    <DashboardContent>
                        <ActionBar />

                        <div className="dashboardContent">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/organization/new/" element={<OrgForm />} />
                                <Route path="/organization/:chainId/:orgAddress/" element={<Org />} />
                                <Route path="/organization/:chainId/:orgAddress/edit/" element={<OrgForm isEdit={true} />} />
                                <Route path="/organization/:chainId/:orgAddress/badge/new/" element={<BadgeForm />} />
                                <Route path="/organization/:chainId/:orgAddress/badge/:badgeId/" element={<Badge />} />
                                <Route path="/organization/:chainId/:orgAddress/badge/:badgeId/edit/" element={<BadgeForm isEdit={true} />} />
                            </Routes>
                        </div>
                    </DashboardContent>
                </div>
            </div>
        </>
    )
}

export { Dashboard };