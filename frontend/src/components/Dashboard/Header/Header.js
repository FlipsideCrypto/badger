import ActionButton from "@components/Button/ActionButton";

import "@style/Dashboard/Header/Header.css";

const Header = ({ back, actions }) => {
    const isShowing = actions?.length > 0 || back;

    return (
        <header className="header" style={{
            marginTop: isShowing ? '20px' : '0',
            marginBottom: isShowing ? '20px' : '0',
            marginInline: "20px",
        }}>
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