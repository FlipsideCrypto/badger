import { Route, Routes } from "react-router-dom";

import "@style/Hero/LandingHero.css"

const LandingHero = ({ children }) => {
    return (
        <div className="hero">
            <div className="blobs">
                <div className="blob" />
                <div className="blob" />
                <div className="blob" />
            </div>

            {children}
        </div>
    )
}

export { LandingHero }