// Button that has text with icon on the left or right side
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "@style/Button/IconButton.css"

const IconButton = ({ icon, text, style, onClick, disabled, loading}) => {
    return (
        <button 
            className={loading ? "button button__loading" : "button"}
            style={style} 
            onClick={onClick} 
            disabled={disabled}
        >
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