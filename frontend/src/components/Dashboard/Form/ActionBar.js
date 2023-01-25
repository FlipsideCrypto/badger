import { Link } from 'react-router-dom';

import { Help, IconButton } from "@components"

import "@style/Dashboard/Form/ActionBar.css"

const ActionBar = ({ help, actions, style, helpStyle, actionStyle }) => {
    return (
        <div className="action__bar" style={style}>
            {help && <div className="action__bar__help" style={helpStyle}>
                <Help text={help} />
            </div>}

            <div className="action__bar__actions">
                {actions && actions.map(action => (
                    <div key={action.text} style={actionStyle}>
                        {action.to ?
                            <Link className="internal-link" to={action.to}>
                                <IconButton 
                                    icon={action.icon} 
                                    text={action.text} 
                                    disabled={action.disabled}
                                />
                            </Link>
                            : 
                            <IconButton
                                icon={action.icon}
                                text={action.text}
                                onClick={action.event}
                                disabled={action.disabled}
                                loading={action.loading}
                            />
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ActionBar;