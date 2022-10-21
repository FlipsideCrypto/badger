import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "@style/Card/ErrorCard.css"

const ErrorCard = ({ label, message, style }) => {
    return (
        <div className="error__wrapper">
            {label && message &&
                <div className={label ? "error__card active" : "error__card"} style={style}>
                    <div className="error__card__icon">
                        <FontAwesomeIcon icon={['fal', 'fa-triangle-exclamation']} />
                    </div>
                    <div className="error__card__message">
                        <span className="error__card__text">
                            {label + ": " +
                                (typeof(message) !== "string" ? 
                                message['message'] || JSON.stringify(message) : 
                                message)
                            }
                        </span>
                    </div>
                </div>
        }
        </div>
    )
}

export default ErrorCard;