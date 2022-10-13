import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "@style/Card/ErrorCard.css"

const ErrorCard = ({ message, setError, style }) => {
    return (
        <div className="error__wrapper">
            <div className={message.length !== 0 ? "error__card active" : "error__card"} style={style}>
                <div className="error__card__icon">
                    <FontAwesomeIcon icon={['fal', 'fa-triangle-exclamation']} />
                </div>
                <div className="error__card__message">
                    <span className="error__card__text">
                        {message}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ErrorCard;