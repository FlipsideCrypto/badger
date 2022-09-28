import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Help = ({ text }) => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr',
        }}>
            <FontAwesomeIcon icon={['fal', 'question-circle']} />
            <p>{text}</p>
        </div>
    )

}

export default Help;