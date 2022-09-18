import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "../../../style/Dashboard/Header/Header.css";

const Header = ({ back, actions }) => {
    const navigate = useNavigate()

    const handleAction = (action) => {
        navigate(action);
    }

    return (
        <header className="header">
            <div className="header__back">
                {back && <a href="#" onClick={() => { handleAction(back) }}>
                    <FontAwesomeIcon icon={['fal', 'chevron-left']} />
                    <span>Back</span>
                </a>}
            </div>

            <div className="header__actions">
                {actions && actions.map((action, index) => (
                    <a href="#" key={index} onClick={() => { handleAction(action) }}>
                        <FontAwesomeIcon icon={action.icon} />
                        <span>{action.text}</span>
                    </a>
                ))}
            </div>
        </header>
    );
}

export default Header;