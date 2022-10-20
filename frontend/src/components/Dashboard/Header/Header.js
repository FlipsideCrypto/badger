import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from "@mui/material";

import "@style/Dashboard/Header/Header.css";

const Header = ({ back, actions }) => {
    const isShowing = actions?.length > 0 || back;

    return (
        <header className="header" style={{
            marginTop: isShowing ? '20px' : '0',
            marginBottom: isShowing ? '20px' : '0'
        }}>
            <div className="header__back">
                {back && <Button 
                    className="button__unstyled" 
                    onClick={back}
                    sx={{textTransform: 'capitalize'}}
                >
                    <FontAwesomeIcon icon={['fal', 'chevron-left']} />
                    <span>Back</span>
                </Button>}
            </div>

            <div className="header__actions">
                {actions && actions.map((action, index) => (
                    <button 
                        className="button__unstyled header__action" 
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