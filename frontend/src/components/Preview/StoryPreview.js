import { ArrowLink } from "@components"

import { mdao } from "@static"

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

                    <img src={mdao} />
                </>}
            </div>
        </div>
    )
}

export { StoryPreview }