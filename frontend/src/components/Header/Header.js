import { ActionButton } from "@components";

import "@style/Header/Header.css";

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

            {actions && <div className="header__actions">
                {actions.map((action, index) => (
                    <ActionButton
                        key={index}
                        onClick={action.event || action.onClick}
                        icon={action.icon}
                        afterText={action.text}
                    />
                ))}
            </div>}
        </header>
    );
}

export { Header };