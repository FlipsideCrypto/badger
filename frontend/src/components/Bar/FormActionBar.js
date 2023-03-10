import { Link } from 'react-router-dom';

import { IconButton } from "@components"

import "@style/Bar/FormActionBar.css"

const FormActionBar = ({ actions, style, actionStyle }) => {
    return (
        <div className="actionBar" style={style}>
            <div className="actions">
                {actions && actions.map(action => (
                    <div key={action.text} style={actionStyle}>
                        {action.to ? <Link className="internal-link" to={action.to}>
                            <IconButton
                                icon={action.icon}
                                text={action.text}
                                disabled={action.disabled}
                            />
                        </Link> : <IconButton
                            icon={action.icon}
                            text={action.text}
                            onClick={action.event}
                            disabled={action.disabled}
                            loading={action.loading}
                        />}
                    </div>
                ))}
            </div>
        </div>
    )
}

export { FormActionBar };