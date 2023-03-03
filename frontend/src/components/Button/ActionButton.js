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
    const marginStyle = beforeText ? { marginLeft: "10px" } : afterText ? { marginRight: "10px" } : {};

    return (
        <>
            {!props.link ? <Button
                className={`action__button ${className}`}
                onClick={onClick}
                {...props}
            >
                {beforeText && <span>{beforeText}</span>}
                <FontAwesomeIcon icon={icon} style={{
                    ...iconStyle,
                    ...marginStyle
                }} />
                {afterText && <span>{afterText}</span>}
            </Button>
                : <a
                    className={`action__button ${className}`}
                    href={props.link}
                    target="_blank"
                    rel="noreferrer"
                    {...props}
                >
                    <Button
                        className={`action__button ${className}`}
                        {...props}
                    >
                        {beforeText && <span>{beforeText}</span>}
                        <FontAwesomeIcon icon={icon} style={{
                            ...iconStyle,
                            ...marginStyle
                        }} />
                        {afterText && <span>{afterText}</span>}
                    </Button>
                </a>}
        </>
    )
}

export { ActionButton };