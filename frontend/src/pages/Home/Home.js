import { useNavigateAddress, useUser } from "@hooks";

import { ActionTitle, Empty, OrgCard } from "@components"

import "@style/pages/Home.css";

const Home = () => {
    const navigate = useNavigateAddress();

    const { organizations } = useUser();

    const announcementMessage = (
        <p>As of March 21st, 2023 organizations deployed before that date have been migrated to
            <a href="https://legacy.trybadger.com" target="_blank" rel="noreferrer"> legacy.trybadger.com</a>.
        </p>
    )

    const titleActions = [{
        className: "secondary",
        text: "Create",
        icon: ['fal', 'plus'],
        onClick: () => navigate(`/dashboard/organization/new/`)
    }];

    return (
        <div className="home">
            {announcementMessage &&
                <div className="home__announcement">
                    <div className="announcement__message">
                        {announcementMessage}
                    </div>
                </div>
            }

            <ActionTitle title="Organizations" actions={titleActions} />

            {organizations && organizations.length === 0 && <Empty
                title="No Organizations yet!"
                body="Creating the Badges for your first Organization is easy. Choose and customize your Organization's name, logo, and description and your organization is live!"
                button="Create organization"
                url="/dashboard/organization/new/"
            />}

            {organizations && organizations.length > 0 && <div className="home__cards">
                {organizations?.map((org, index) => <OrgCard key={index} org={org} />)}
            </div>}
        </div >
    )
}

export { Home };
