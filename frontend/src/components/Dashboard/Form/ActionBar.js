import Help from '../Help/Help'

import "../../../style/Dashboard/Form/ActionBar.css"

const ActionBar = ({ help, actions }) => { 
    return (
        <div className="action-bar">
            {help && <div className="action__bar__help">
                <Help text={help} />
            </div>}

            <div className="action__bar__actions">
                {actions}
            </div>
        </div>
    )
}

export default ActionBar;