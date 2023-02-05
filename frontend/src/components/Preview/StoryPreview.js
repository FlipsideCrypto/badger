import { ArrowLink } from "@components"

import { mdao } from "@static"

import "@style/Preview/StoryPreview.css"

const StoryPreview = ({ className = null }) => {
    return (
        <div className="container">
            <div className={`preview ${className}`}>
                <div className="content">
                    <h4>“Having Badger available to drive the credentials and completion certificates for MetricsDAO educational courses has changed the way we approach creating material.”</h4>

                    <div className="author">
                        <div className="avatar"></div>
                        <p><strong>Aaron</strong><br />Head of Growth and Retention</p>
                        <ArrowLink to="/stories/mdao" className="clean close">
                            Customer story
                        </ArrowLink>
                    </div>
                </div>

                <img src={mdao} />
            </div>
        </div>
    )
}

export { StoryPreview }