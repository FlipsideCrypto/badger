import { ActionButton } from "@components";

import { useLogout } from "@hooks";

import "@style/Button/LogoutButton.css";

const LogoutButton = () => {
    const { logout } = useLogout();

    return (
        <ActionButton
            className="logout"
            onClick={logout}
            afterText="Logout"
            icon={['fal', 'sign-out']}
        />
    )
}

export { LogoutButton };