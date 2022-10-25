import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "@style/Button/ActionButton.css";

const ActionButton = (
    { 
        children,
        className,
        onClick,
        beforeText,
        afterText,
        icon,
        iconStyle, 
        ...props 
    }
) => {
    return (
        <Button 
            className={`action__button ${className}`} 
            onClick={onClick} 
            {...props}
        >
            {beforeText && <span>{beforeText}</span>}
            <FontAwesomeIcon icon={icon} style={iconStyle} />
            {afterText && <span>{afterText}</span>}
        </Button>
    )
}

export default ActionButton;