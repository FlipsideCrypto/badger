import { Link } from "react-router-dom";

import { LogoIcon } from "@components";

import "@style/Footer/Footer.css"

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="logo">
                    <LogoIcon name="Badger" logo={""} />
                    <p>Unlocking the power of on-chain badges for every person.</p>
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
                            <Link>Creators and Freelancers</Link>
                            <Link>Start Ups</Link>
                            <Link>Enterprises</Link>
                        </div>
                    </div>

                    <div className="list community">
                        <h4>Community</h4>
                        <div>
                            <Link>Discord</Link>
                            <Link>Twitter</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container legal">
                <h4>Resources</h4>
                <div>
                    <Link>Privacy Policy</Link>
                    <Link>Terms of Service</Link>
                    <Link>Media Kit</Link>
                </div>

                <p>Copyright Badger 2023</p>
            </div>
        </div>
    )
}

export { Footer }