import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "../style/Landing.css";

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
            <div className="hero">
                <div className="container">
                    <div className="hero__content">
                        <h1>Give your organization their keys to Web3.</h1>
                        <p className="lead">Deploy and manage flexible group policies for your team’s decentralized tool stack. </p>

                        <button>Manage Org</button>
                    </div>
                </div>
            </div>

            <div className="trusted__container"></div>

            <div className="features">
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

                    <button>Create Org Now</button>
                </div>
            </div>
        </div>
    )
}

export default Landing;