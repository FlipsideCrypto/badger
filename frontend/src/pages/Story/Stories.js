import { useStories } from "@hooks";

import { LandingHero, SEO, StoryCard } from "@components";

import "@style/pages/Stories.css"

const title = "Customer Stories | Badger"
const description = "Badger powers many very impactful organizations of Web3 without concern for scale. Read their stories and see what Badger can do for your on-chain organization today."

const Stories = () => {
    const { stories } = useStories();

    return (
        <>
            <SEO title={title} description={description} />

            <LandingHero className="slim">
                <div className="container">
                    <h2>Explore the success stories of Badger champions.</h2>
                    <p>Badger powers many very impactful organizations of Web3 without concern for scale. Read their stories and see what Badger can do for your on-chain organization today.</p>
                </div>
            </LandingHero>

            <div className="stories">
                <div className="container">
                    <div className="cards">
                        {stories && stories.map((story, i) => (
                            <StoryCard key={i} story={story} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export { Stories }