import { ArrowLink } from "@components"

import "@style/Preview/StoryPreview.css"

const StoryPreview = ({ story, className }) => {
    return (
        <div className="container">
            <div className={`preview ${className}`}>
                {story && <>
                    <div className="content">
                        <h4>“{story.attributes.quote}”</h4>

                        <div className="author">
                            <img className="avatar" src={story.attributes.quoter_image} />

                            <p><strong>{story.attributes.quoter}</strong><br />{story.attributes.quoter_title}</p>

                            <ArrowLink to={`/stories/${story.filename}/`} className="clean close">
                                Customer story
                            </ArrowLink>
                        </div>
                    </div>

                    <img className="logo" src={story.attributes.logo} />
                </>}
            </div>
        </div>
    )
}

export { StoryPreview }