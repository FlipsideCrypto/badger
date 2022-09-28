// Button that has text with icon on the left or right side

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "@style/Button/IconButton.css"

const IconButton = ({ icon, text, style }) => {
    return (
        <button className="button" style={style}>
            <span className="button__text">
                {text}
            </span>
            <div className="button__icon">
                <FontAwesomeIcon icon={icon} />
            </div>
        </button>
    )
}

export default IconButton;