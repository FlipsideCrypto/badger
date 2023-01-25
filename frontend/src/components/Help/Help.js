import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "@style/Dashboard/Form/Help.css"

const Help = ({ text }) => {
    return (
        <div className="help__bar">
            <FontAwesomeIcon icon={['fal', 'question-circle']} style={{ height: "16px", width: "16px" }} />
            <p>{text}</p>
        </div>
    )
}

export { Help };