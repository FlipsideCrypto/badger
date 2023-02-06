import Markdown from 'markdown-to-jsx';

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useStory } from "@hooks";

import { SEO, StoryPreview } from "@components";

import "@style/pages/Story.css"

const Story = () => {
    const { slug } = useParams();

    const { story } = useStory(slug);

    const [sticky, setSticky] = useState(false);

    const links = story && {
        twitter: `https://twitter.com/intent/tweet?text=${story.attributes.title}%20%7C%20%40trybadger%0A%0A%F0%9F%91%89&url=${window.location.href}`,
        linkedin: `https://www.linkedin.com/shareArticle?url=${window.location.href}&title=${story.attributes.title}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
    }

    const handleScroll = () => setSticky(window.scrollY > 200);

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <SEO title={story && story.attributes.title} description={story && story.attributes.description} />

            {story && <div className="story">
                <div className="hero slim tiny" style={{
                    background: `linear-gradient(130deg,  #fff, #fff, ${story.attributes.color})`,
                }}>
                    <div className="container">
                        <div>
                            <Link to="/stories/" className="back"><FontAwesomeIcon icon={['fal', 'arrow-left']} />Back to customer stories</Link>

                            <a href={story.attributes.partner_url} target="_blank" rel="noreferrer">
                                <img className="logo" src={story.attributes.logo} />
                            </a>

                            <h2>{story.attributes.title}</h2>
                            <p>{story.attributes.description}</p>

                            <div className="stats" style={{ color: story.attributes.color_dark }}>
                                {story.attributes.stat_1_title && <div className="metric">
                                    <h3>{story.attributes.stat_1_value.toLocaleString()}</h3>
                                    <h4>{story.attributes.stat_1_title}</h4>
                                </div>}

                                {story.attributes.stat_2_title && <div className="metric">
                                    <h3>{story.attributes.stat_2_value.toLocaleString()}</h3>
                                    <h4>{story.attributes.stat_2_title}</h4>
                                </div>}

                                {story.attributes.stat_3_title && <div className="metric">
                                    <h3>{story.attributes.stat_3_value.toLocaleString()}</h3>
                                    <h4>{story.attributes.stat_3_title}</h4>
                                </div>}
                            </div>
                        </div>

                        <div className="background">
                            <div className="blobs">
                                {Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (o, i) => (
                                    <div className="blob" style={{ background: i % 2 === 0 ? story.attributes.color : story.attributes.color_dark }}></div>
                                ))}
                            </div>

                            <img className="image" src={story.attributes.image} />
                        </div>
                    </div>
                </div>

                <div className="body container">
                    <div className="share">
                        <div className={`items ${sticky ? 'sticky' : ''}`}>
                            <a href={links.twitter} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={['fab', 'twitter']} /></a>
                            <a href={links.linkedin} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={['fab', 'linkedin-in']} /></a>
                            <a href={links.facebook} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={['fab', 'facebook-f']} /></a>
                            <div onClick={handleCopy}><FontAwesomeIcon icon={['fal', 'share-alt']} /></div>
                        </div>
                    </div>

                    <div className="content">
                        <StoryPreview story={story} className="full" />

                        <Markdown className="markdown">{story.content}</Markdown>
                    </div>
                </div>
            </div>}
        </>
    )
}

export { Story }