import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import "@style/Dashboard/Form/Help.css"

const Help = ({ text }) => {
    return (
        <div className="help__bar">
            <FontAwesomeIcon icon={['fal', 'question-circle']} />
            <p>{text}</p>
        </div>
    )
}

export default Help;