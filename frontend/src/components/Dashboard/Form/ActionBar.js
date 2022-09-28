import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Help from './Help'

import "@style/Dashboard/Form/ActionBar.css"

const ActionBar = ({ help, actions }) => { 
    return (
        <div className="action__bar">
            {help && <div className="action__bar__help">
                <Help text={help} />
            </div>}

            <div className="action__bar__actions">
                {actions && actions.map((action, index) => (
                    <button 
                        className="button-secondary" 
                        key={index} onClick={action.event}
                    >
                        <span>{action.text}</span>
                        <FontAwesomeIcon icon={action.icon} />
                    </button>
                ))}
            </div>
        </div>
    )
}

export default ActionBar;