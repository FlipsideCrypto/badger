import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "@contexts";

import { handleImageLoad } from "@hooks";

import { ActionTitle, Card, IconButton, ImageLoader } from "@components"

import { sliceAddress } from "@utils";

import { IPFS_GATEWAY_URL } from "@static";

import "@style/Dashboard/Home/Home.css";

const Home = () => {
    const navigate = useNavigate();

    const { userData } = useContext(UserContext);

    return (
        <div className="home">
            <ActionTitle
                title="Organizations"
                actions={[
                    {
                        className: "home__action-button",
                        icon: ['fal', 'plus'],
                        onClick: () => navigate('/dashboard/organization/new'),
                        afterText: "Create organization"
                    }
                ]}
            />
            <div className="home__cards">
                {userData?.organizations?.length > 0
                    ? userData?.organizations?.map((org, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/dashboard/organization/${org.id}`)}
                        >
                            <Card
                                className="home__card"
                            >
                                <div className="home__card__image" />

                                <div className="home__card__text">
                                    <div className="home__card__subtext">
                                        <small><strong><span style={{ marginRight: "10px" }}>
                                            {org.chain.slice(0, 5)}
                                        </span> {sliceAddress(org.ethereum_address)}</strong></small>
                                    </div>

                                    <div className="home__card__title">
                                        <h2>
                                            <ImageLoader
                                                className="home__card__view__image"
                                                src={IPFS_GATEWAY_URL + org.image_hash}
                                                onLoad={handleImageLoad}
                                            />
                                            {org.name}
                                        </h2>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    ))
                    : <div className="org__container empty" style={{
                        gridColumn: "span 3"
                    }}>
                        <h1>No Organizations yet!</h1>
                        <p>
                            Creating the Badges for your first Organization is easy.
                            Choose and customize your Organization's name, logo, and description and your organization is live!
                        </p>
                        <Link className="internal-link" to={`/dashboard/organization/new`}>
                            <IconButton icon={['fal', 'arrow-right']} text="CREATE ORGANIZATION" style={{ marginTop: "40px" }} />
                        </Link>
                    </div>}
            </div>
        </div>
    )
}

export { Home };