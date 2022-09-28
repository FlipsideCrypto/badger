import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "@style/Dashboard/Header/Header.css";

const Header = ({ back, actions }) => {
    const isShowing = actions?.length > 0 || back;

    return (
        <header className="header" style={{
            margin: isShowing ? '20px' : '0'
        }}>
            <div className="header__back">
                {back && <button 
                    className="button-unstyled" 
                    onClick={back}
                >
                    <FontAwesomeIcon icon={['fal', 'chevron-left']} />
                    <span>Back</span>
                </button>}
            </div>

            <div className="header__actions">
                {actions && actions.map((action, index) => (
                    <button 
                        className="button-unstyled" 
                        key={index} onClick={action.event}
                    >
                        <FontAwesomeIcon icon={action.icon} />
                        <span>{action.text}</span>
                    </button>
                ))}
            </div>
        </header>
    );
}

export default Header;