import { Link } from "react-router-dom";

import { LogoIcon } from "@components";

import "@style/Footer/Footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="grid">
                    <div className="logo">
                        <LogoIcon name="Badger" logo={""} />
                        <p>Unlocking the power of onchain badges for every person.</p>
                    </div>

                    <div className="links">
                        <div className="list features">
                            <h4>Features</h4>

                            <div>
                                <Link>Badge Managers</Link>
                                <Link>CSV Bulk Mint</Link>
                                <Link>Claimables</Link>
                            </div>

                        </div>

                        <div className="list features__extended">
                            <div />
                            <div>
                                <Link>Signer Controller</Link>
                                <Link>Instant Revoke</Link>
                                <Link>Account Bound</Link>
                            </div>
                        </div>

                        <div className="list solutions">
                            <h4>Solutions</h4>
                            <div>
                                <Link to="/stories/pinedao/">Creators</Link>
                                <Link to="/stories/taptive/">Start Ups</Link>
                                <Link to="/stories/mdao/">Enterprises</Link>
                            </div>
                        </div>

                        <div className="list community">
                            <h4>Community</h4>
                            <div>
                                <a href="https://discord.com/invite/TASvMj4vyk" target="_blank" rel="noreferrer">Discord</a>
                                <a href="https://twitter.com/trybadger" target="_blank" rel="noreferrer">Twitter</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="legal">
                    <h4>Resources</h4>
                    <div>
                        <Link to="/privacy/">Privacy Policy</Link>
                        <Link to="/terms/">Terms of Service</Link>
                        <Link to="/media/">Media Kit</Link>
                    </div>

                    <p>Built by <span><a href="https://cosanostra.gg" target="_blank" rel="noreferrer"> cosanostra </a></span> {`// © Badger 2023`}</p>
                </div>
            </div>
        </div>
    )
}

export { Footer }