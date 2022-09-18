// Button that has text with icon on the left or right side

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const IconButton = (icon) => { 
    return (
        <button className="button">
            <span>{Text}</span>
            <div className="button__icon">
                <FontAwesomeIcon icon={icon} />
            </div>
        </button>
    )    
}

export default IconButton;