import { Link } from "react-router-dom";

import IconButton from "@components/Button/IconButton";

import "@style/Dashboard/Mobile/MobilePreventor.css"
import { useEffect } from "react";

const MobilePreventor = () => {

    const handleResize = () => {
        if (window.innerWidth < 768) {
            document.querySelector(".mobile__preventor").style.display = "block";
        } else {
            document.querySelector(".mobile__preventor").style.display = "none";
        }
    }

    // on window resize, check if the window is mobile or not
    window.addEventListener("resize", () => {
        handleResize();
    })

    useEffect(() => { 
        handleResize();
    })

    return (
        <div className="mobile__preventor">
            <div className="container">
                <h1>Management of your Organizations is disabled on mobile devices!</h1>
                <p>Managing your organization on mobile is quite dangerous. It is not a recommended or supported feature of Badger (yet). Mobile will become accessible when a mobile app with key-generation is launched that allows our team to abstract away the need for wallet knowledge. Coming soon™️.</p>

                {/* Button that goes back to landing page */}
                <Link className="internal-link" to="/">
                    <IconButton icon={['fal', 'warning']} text="BACK TO SAFETY" className="wiggle" />
                </Link>
            </div>
        </div>
    )
}

export default MobilePreventor