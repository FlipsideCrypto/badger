import { Link } from "react-router-dom";
import { Button as MuiButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "@style/Button/Button.css";

const Button = (
    {
        children,
        className,
        onClick,
        text,
        icon,
        iconStyle,
        ...props
    }
) => {
    return (
        <>
            {!props.link ? 
                <MuiButton
                    className={`${className}`}
                    onClick={onClick}
                    {...props}
                >
                    {text}
                </MuiButton>
                : 
                <Link
                    className={`${className}`}
                    to={props.link}
                    target="_blank"
                    rel="noreferrer"
                    {...props}
                >
                    <MuiButton
                        className={`${className}`}
                        {...props}
                    >
                        {text}
                    </MuiButton>
                </Link>}
        </>
    )
}

export { Button };