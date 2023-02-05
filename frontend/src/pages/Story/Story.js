import Markdown from 'markdown-to-jsx';

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useStory } from "@hooks";

import { LandingHero, StoryPreview } from "@components";

import "@style/pages/Story.css"

const Story = () => {
    const { slug } = useParams();

    const { story } = useStory(slug);

    const [sticky, setSticky] = useState(false);

    const handleScroll = () => setSticky(window.scrollY > 200);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {story && <>
                <LandingHero className="slim">
                    <div className="container">
                        <Link to="/stories/" className="back"><FontAwesomeIcon icon={['fal', 'arrow-left']} />Back to customer stories</Link>

                        <h2>{story.attributes.title}</h2>
                        <p>{story.attributes.description}</p>
                    </div>
                </LandingHero>

                <div className="story container">
                    <div className="share">
                        <div className={`items ${sticky ? 'sticky' : ''}`}>
                            <div><FontAwesomeIcon icon={['fab', 'twitter']} /></div>
                            <div><FontAwesomeIcon icon={['fab', 'linkedin-in']} /></div>
                            <div><FontAwesomeIcon icon={['fab', 'slack']} /></div>
                            <div><FontAwesomeIcon icon={['fab', 'facebook-f']} /></div>
                            <div><FontAwesomeIcon icon={['fal', 'share-alt']} /></div>
                        </div>
                    </div>

                    <div className="content">
                        <StoryPreview story={story} className="full" />

                        <Markdown className="markdown">{story.content}</Markdown>
                    </div>
                </div>
            </>}
        </>
    )
}

export { Story }