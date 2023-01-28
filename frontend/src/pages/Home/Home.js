import { useContext, Suspense } from "react"
import { useNavigate } from "react-router-dom";

import { UserContext } from "@contexts";

import { ActionTitle, Empty, OrgCard } from "@components"

import "@style/pages/Home.css";

const Home = () => {
    const navigate = useNavigate();

    const { isAuthenticated, organizations } = useContext(UserContext);

    const titleActions = isAuthenticated && [{
        className: "home__action-button",
        text: "Create Organization",
        icon: ['fal', 'plus'],
        onClick: () => navigate(`/dashboard/organization/new/`)
    }];

    return (
        <div className="home">
            <ActionTitle
                title="Organizations"
                actions={titleActions}
            />

            {organizations && organizations.length === 0 && <Empty
                title="No Organizations yet!"
                body="Creating the Badges for your first Organization is easy. Choose and customize your Organization's name, logo, and description and your organization is live!"
                button="CREATE ORGANIZATION"
                url="/dashboard/organization/new/"
            />}

            {organizations && organizations.length > 0 && <div className="home__cards">
                {organizations?.map((org, index) => <OrgCard key={index} org={org} />)}
            </div>}
        </div >
    )
}

export { Home };