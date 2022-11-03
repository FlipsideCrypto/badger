// Button that has text with icon on the left or right side
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "@style/Button/IconButton.css"

const IconButton = ({ 
    icon, 
    text, 
    className,
    style, 
    onClick, 
    disabled, 
    loading
}) => {
    return (
        <button 
            className={loading 
                ? `button__icon button__loading ${className}` 
                : `button__icon ${className}`}
            style={style} 
            onClick={onClick} 
            disabled={disabled}
        >
            <div className="button__text">
                <span>
                    {text}
                </span>
            </div>
            <div className="button__image">
                <FontAwesomeIcon icon={icon} />
            </div>
        </button>
    )
}

export default IconButton;