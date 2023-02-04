import { Link } from "react-router-dom";
import { HOME_LINKS } from "@static";

import { Button } from "@components";

import "@style/Navbar/Navbar.css";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="container">
                <div className="navbar__logo">
                    {/* <img src={logo} alt="logo" /> */}
                    <div className="navbar__logo__image" />
                    <h3 className="navbar__title">Badger</h3>
                </div>


                <div className="navbar__links__left">
                    <Link to={HOME_LINKS.gitbook}>Docs</Link>
                    <Link to="/faq/">FAQ</Link>
                    <Link to="/stories/">Customer Stories</Link>
                </div>

                <div className="navbar__links__right">
                    <Button className="button__secondary" text="Enter App" link="/dashboard/" />
                </div>
            </div>
        </div>
    )
}

export { Navbar }