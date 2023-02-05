import { ArrowLink } from "@components"

import "@style/Card/StoryCard.css"

const StoryCard = ({ story }) => {
    return (
        <div className="card">
            <img src={story.attributes.image}
                alt={story.attributes.title} />

            <img src={story.attributes.logo}
                alt={`Logo of ${story.attributes.partner}`} />

            <p>{story.attributes.description.slice(0, 180)}...</p>

            <ArrowLink to={`/stories/${story.filename}/`} className="clean close">Read story</ArrowLink>
        </div>
    )
}

export { StoryCard }