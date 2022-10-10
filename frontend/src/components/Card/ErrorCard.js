import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "@style/Card/ErrorCard.css"

const ErrorCard = ({ message, setError, style }) => {
    
    return (
        <div className="error__wrapper">
            <div className="error__card" style={style}>
                <div className="error__card__icon">
                    <FontAwesomeIcon icon={['fal', 'fa-triangle-exclamation']} />
                </div>
                <div className="error__card__message">
                    <span className="error__card__text">
                        {message}
                    </span>
                </div>
                <button className="error__card__button" onClick={() => setError()}>
                    <FontAwesomeIcon icon={['fal', 'fa-x']} />
                </button>
            </div>
        </div>
    )
}

export default ErrorCard;