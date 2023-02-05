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
                </div>
            </LandingHero>

            <div className="stories">
                <div className="container">
                    <div className="cards">
                        {stories && stories.map((story) => (
                            <Link key={story.filename} to={`/stories/${story.filename}`}>
                                <StoryCard story={story} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export { Stories }