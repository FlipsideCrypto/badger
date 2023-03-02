import { Link } from "react-router-dom"

import { ArrowLink } from "@components"

import "@style/Card/StoryCard.css"

const StoryCard = ({ story }) => {
    return (
        <div className="card">
            <Link to={`/stories/${story.filename}/`}>
                <div className="img">
                    <div className="blobs"> 
                        {Array.from({ length: Math.floor(Math.random() * 1) + 2 }, (o, i) => (
                            <div key={i} className={`blob ${i}`} style={{ background: i % 2 === 0 ? story.attributes.color : story.attributes.color_dark }}></div>
                        ))}
                    </div>

                    <img src={story.attributes.image} alt={story.attributes.title} />
                </div>

                <img className="logo" src={story.attributes.logo} alt={`Logo of ${story.attributes.partner}`} />

                <p>{story.attributes.description.slice(0, 180)}...</p>
            </Link>

            <ArrowLink to={`/stories/${story.filename}/`} className="clean close">Read story</ArrowLink>
        </div>
    )
}

export { StoryCard }