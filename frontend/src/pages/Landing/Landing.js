import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IconButton } from "@components";

import { HOME_LINKS } from "@static/constants/links";

import logo from "@static/images/badger-logo-headline.png";

import "@style/Landing.css";

const Landing = () => {
    const features = [
        {
            title: 'Launch Organizations',
            description: 'Designate leaders and members of your organization on-chain.',
            icon: ['fal', 'sitemap']
        },
        {
            title: 'Delegate Permissions',
            description: 'Manage organizational leaders with layered permissioning.',
            icon: ['fal', 'layer-group']
        },
        {
            title: 'Distribute Badges',
            description: 'Generate on-chain keys for members of your organizations.',
            icon: ['fal', 'badge']
        },
        {
            title: 'No Code Required',
            description: 'All tools are constructed to be managed directly within a user-friendly dashboard.',
            icon: ['fal', 'code']
        }
    ]

    return (
        <div className="landing">
            <div className="navbar">
                <div className="container">
                    <div className="navbar__logo">
                        <img src={logo} alt="logo" />
                    </div>

                    <div className="navbar__links__left">
                        <a href={HOME_LINKS.gitbook}>Docs</a>
                    </div>

                    <div className="navbar__links__right">
                        <Link className="internal-link" to="/dashboard/">Enter App</Link>
                    </div>
                </div>
            </div>

            <div className="hero">
                <div className="container">
                    <div className="hero__content">
                        <h1>Give your organization their keys to Web3.</h1>
                        <p className="lead">Deploy and manage flexible group policies for your team’s decentralized tool stack. </p>

                        <Link className="internal-link" to="/dashboard/">
                            <IconButton icon={['fal', 'arrow-right']} text="Issue badges" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="trusted__container"></div>

            <div className="features">
                <div className="background">
                    <div className="container">
                        <h2>An on-chain organization permissions primitive designed to support every use case.</h2>

                        <div className="features__grid">
                            {features.map((feature, index) => (
                                <div className="feature__card" key={index}>
                                    <div className="feature__icon">
                                        <FontAwesomeIcon icon={feature.icon} />
                                    </div>

                                    <div className="feature__content">
                                        <h3>{feature.title}</h3>
                                        <p>{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link className="internal-link" to="/dashboard/">
                            <IconButton icon={['fal', 'arrow-right']} text="Create a badge" style={{
                                marginLeft: "auto"
                            }} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="footer">
                <div className="container">
                    <div className="footer__logo">
                        <img src={logo} alt="logo" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Landing };