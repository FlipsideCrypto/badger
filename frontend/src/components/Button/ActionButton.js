import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "@style/Button/ActionButton.css";

const ActionButtonContent = ({ beforeText, afterText, icon, iconStyle }) => {
    const marginStyle = beforeText ? { marginLeft: "10px" } : afterText ? { marginRight: "10px" } : {};

    return (
        <>
            {beforeText && <span>{beforeText}</span>}
            <FontAwesomeIcon icon={icon} style={{
                ...iconStyle,
                ...marginStyle
            }} />
            {afterText && <span>{afterText}</span>}
        </>
    )
}

const ActionButton = (
    {
        className: buttonClass,
        onClick,
        beforeText,
        afterText,
        icon,
        iconStyle,
        ...props
    }
) => {
    const className = buttonClass ? `action__button ${buttonClass}` : "action__button";

    const buttonContent = <ActionButtonContent
        beforeText={beforeText}
        afterText={afterText}
        icon={icon}
        iconStyle={iconStyle} />

    return (
        <>
            {!props.link ? <Button className={className} onClick={onClick} {...props}>
                <span>{buttonContent}</span>
            </Button>
                : <a className={className} href={props.link} target="_blank" rel="noreferrer" {...props} >
                    <Button className={className} {...props} >
                        <span>{buttonContent}</span>
                    </Button>
                </a>}
        </>
    )
}

export { ActionButton };