import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Navbar, Footer, IconButton } from "@components";

import { HOME_LINKS } from "@static";

import "@style/pages/Landing.css";

const Landing = () => {
    return (
        <div className="landing">
            <Navbar />

            <div className="hero">
                <div className="blobs">
                    <div className="blob" />
                    <div className="blob" />
                    <div className="blob" />
                </div>

                <div className="container">
                    <h1>The no-code solution that unlocks the power of on-chain badges for everyone.</h1>
                    <p> Deploy and manage flexible group policies for your team's decentralized tool stack.</p>

                    <Link className="internal-link" to="/dashboard/">
                        <IconButton icon={['fal', 'arrow-right']} text="Issue badges" />
                    </Link>
                </div>
            </div>

            {/* Number components */}

            <h2>Badges should simplify and secure your organizations operations. Not complicate it - no coding needed.</h2>
            <p>The Badger Dashboard lets you deploy an Organization, define rules, and mint badges in just a few clicks.</p>

            <Link>Get started - it’s free</Link>

            <h3>Launch Organizations</h3>
            <h3>Distribute Badges</h3>
            <h3>Delegate Permissions</h3>

            {/* Customer story component image on left */}

            <h2>Optimized for operations, backed by access and security.</h2>

            <p>The Badger Dashboard empowers you to appoint managers so that you're never the bottleneck.</p>

            <Link>Step into the dashboard</Link>

            <h3>Power Complex Permissions</h3>
            <h3>Secure On-Chain Activity</h3>
            <h3>Optimize Permission Distribution</h3>

            {/* Customer story component image on right */}

            <div className="help">
                <h2>We'll help you get started.</h2>
                <p>Bring your Organization on chain with Badger and harness the power your network.</p>

                <div>
                    <h3>Learn</h3>
                    <p>The Badger Dashboard lets you deploy an Organization and build any use of dreams you can imagine.</p>

                    <Link>Using Badges with Guild to control Discord</Link>
                    <Link>Empowering pods with operating groups and votes</Link>
                    <Link>Building a badge-gated smart contract</Link>
                    <Link>Optimize permission distribution</Link>
                </div>
                <div>
                    <h3>Explore</h3>
                    <p>Connect with Badger users, find inspiration, and discover tools to help you build an amazing organization.</p>
                    <Link>Documentation</Link>
                    <Link>Developers</Link>
                    <Link>Community</Link>
                    <Link>Customer stories</Link>
                </div>
                <div>
                    <h3>Hire an Expert</h3>
                    <p>The Badger Dashboard lets you deploy an Organization and build any use of dreams you can imagine.</p>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export { Landing };