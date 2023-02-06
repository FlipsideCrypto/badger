import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { LogoIcon } from "@components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { HOME_LINKS } from "@static";

import "@style/Navbar/Navbar.css";

const Navbar = () => {
    const [isFilled, setIsFilled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsFilled(window.scrollY > 75);

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const onHamburgerClick = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <div className={`navbar ${(isMenuOpen || isFilled) && "filled"}`}>
            <div className="container">
                <Link to="/"><LogoIcon name="Badger" image={""} /></Link>

                <div className={`links ${isMenuOpen && "active"}`}>
                    <div className="navbar__links__left">
                        <Link to="/stories/">Customer Stories</Link>
                        <Link to="/faq/">FAQ</Link>
                        <a href={HOME_LINKS.gitbook} target="_blank" rel="noreferrer">Docs</a>
                    </div>

                    <div className="navbar__links__right">
                        <Link className="enter" to="/dashboard/">
                            <button className="secondary">
                                Enter app
                            </button>
                        </Link>

                    </div>
                </div>
                <div className="hamburger">
                    <button onClick={onHamburgerClick} className="secondary">
                        <FontAwesomeIcon icon="fal fa-bars" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export { Navbar }