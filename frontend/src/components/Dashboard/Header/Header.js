import ActionButton from "@components/Button/ActionButton";

import "@style/Dashboard/Header/Header.css";

const Header = ({ back, actions }) => {
    return (
        <header className="header">
            <div className="header__back">
                {back && 
                    <ActionButton 
                        onClick={back}
                        afterText="Back"
                        icon={['fal', 'chevron-left']}
                    />
                }
            </div>

            <div className="header__actions">
                {actions && actions.map((action, index) => (
                    <ActionButton 
                        key={index} 
                        onClick={action.event}
                        icon={action.icon}
                        afterText={action.text}
                    />
                ))}
            </div>
        </header>
    );
}

export default Header;