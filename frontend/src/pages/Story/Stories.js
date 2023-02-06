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
                    <p>Badger powers some of the most impactful organizations of Web3 no matter the scale. Read their stories and see what Badger can do for your company.</p>
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