import { Link } from "react-router-dom";

import { useStories } from "@hooks";

import { LandingHero, StoryCard } from "@components";

import "@style/pages/Stories.css"

const Stories = () => {
    const { stories } = useStories();

    console.log(stories)

    return (
        <>
            <LandingHero className="slim">
                <div className="container">
                    <h2>Explore the success stories of Badger champions.</h2>
                    <p>Badger powers many very impactful organizations of Web3 without concern for scale. Read their stories and see what Badger can do for your on-chain organization today.</p>
                </div>
            </LandingHero>

            <div className="stories">
                <div className="container">
                    <div className="cards">
                        {stories && stories.map((story) => (
                            <StoryCard story={story} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export { Stories }