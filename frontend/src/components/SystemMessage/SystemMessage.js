import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SystemMessage = ({message, linkTo}) => {
    const [ isOpen, setIsOpen ] = useState(true);

    return (
        <>
            {isOpen &&
                <div id="system-message">
                    <a className="link-wrapper" href={linkTo} rel="noreferrer" target="_blank">
                        <p className="">
                            {message}
                        </p>
                    </a>
                    <button className="button-unstyled" onClick={() => setIsOpen(false)}>
                        <FontAwesomeIcon
                            classname="close-icon"
                            icon={["fal", "fa-x"]}
                        />
                    </button>
                </div>
            }
        </>
    )
}

export default SystemMessage;