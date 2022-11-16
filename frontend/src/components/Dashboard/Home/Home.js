import { useContext } from "react"
import { useNavigate } from "react-router-dom";

import { UserContext } from "@components/Dashboard/Provider/UserContextProvider";

import { sliceAddress } from "@utils/helpers";
import { IPFS_GATEWAY_URL } from "@static/constants/links";

import Card from "@components/Card/Card"
import ImageLoader from "@components/Dashboard/Utils/ImageLoader";
import ActionTitle from "@components/Dashboard/action-title/ActionTitle";

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
                {userData?.organizations?.map((org, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(`/dashboard/organization/${org.id}`)}
                    >
                        <Card
                            className="home__card"
                        >
                            <div className="home__card__image" style={{
                                backgroundImage: `url(${IPFS_GATEWAY_URL + org.image_hash})`,
                            }} />
                            <div className="home__card__text">
                                <div className="home__card__subtext">
                                    <smalL><strong><span style={{ marginRight: "10px" }}>
                                        {org.chain.slice(0, 5)}
                                    </span> {sliceAddress(org.ethereum_address)}</strong></smalL>
                                </div>

                                <div className="home__card__title">
                                    <h2>
                                        <ImageLoader
                                            className="home__card__view__image"
                                            src={IPFS_GATEWAY_URL + org.image_hash}
                                        />
                                        {org.name}
                                    </h2>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;