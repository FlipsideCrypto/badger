// Button that has text with icon on the left or right side

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircularProgress from '@mui/material/CircularProgress';

import "@style/Button/IconButton.css"

const IconButton = ({ icon, text, style, onClick, disabled, loading}) => {
    return (
        <button className="button" style={style} onClick={onClick} disabled={disabled}>
            <span className="button__text">
                {text}
            </span>
            <div className="button__icon">
                <FontAwesomeIcon icon={icon} />
            </div>
            {loading && 
                <CircularProgress
                    size={24}
                    color="success"
                    sx={{color: "#00FF9D", position: "absolute", top: "50%", left: "50%", marginTop: "-12px", marginLeft: "-12px"}}
                />
            }
        </button>
    )
}

export default IconButton;