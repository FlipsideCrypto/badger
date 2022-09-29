import { Link } from 'react-router-dom';

import IconButton from "@components/Button/IconButton";
import Help from './Help'

import "@style/Dashboard/Form/ActionBar.css"

const ActionBar = ({ help, actions }) => {
    return (
        <div className="action__bar">
            {help && <div className="action__bar__help">
                <Help text={help} />
            </div>}

            <div className="action__bar__actions">
                {actions && actions.map(action => (
                    <div key={action.text}>
                        <p>{action.to}</p>
                        {action.to ?
                            <Link className="internal-link" to={action.to}>
                                <IconButton 
                                    icon={action.icon} 
                                    text={action.text} 
                                />
                            </Link>
                            : 
                            <IconButton
                                icon={action.icon}
                                text={action.text}
                                onClick={action.event}
                            />
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ActionBar;