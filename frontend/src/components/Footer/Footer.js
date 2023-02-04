import { Link } from "react-router-dom";

import { logo } from "@static";

import "@style/Footer/Footer.css"

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div>
                    <div>
                        <img src={logo} alt="logo" />
                        <p>Unlocking the power of on-chain badges for every person.</p>
                    </div>

                    <div>
                        <h4>Features</h4>

                        <div>
                            <Link>Badge Managers</Link>
                            <Link>CSV Bulk Mint</Link>
                            <Link>Claimables</Link>
                        </div>
                        <div>
                            <Link>Signer Controller</Link>
                            <Link>Instant Revoke</Link>
                            <Link>Account Bound</Link>
                        </div>
                    </div>
                    <div>
                        <h4>Solutions</h4>
                        <Link>Creators and Freelancers</Link>
                        <Link>Start Ups</Link>
                        <Link>Enterprises</Link>
                    </div>
                    <div>
                        <h4>Community</h4>
                        <Link>Discord</Link>
                        <Link>Twitter</Link>
                    </div>
                </div>

                <div>
                    <div>
                        <Link>Privacy Policy</Link>
                        <Link>Terms of Service</Link>
                        <Link>Media Kit</Link>
                    </div>

                    <p>Copyright Badger 2023</p>
                </div>
            </div>
        </div>
    )
}

export { Footer }