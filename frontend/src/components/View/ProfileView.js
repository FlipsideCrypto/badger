import { Link } from 'react-router-dom';

import { ImageLoader } from "@components";

const ProfileView = ({
    ensAvatar,
    ensName,
    address
}) => {
    return (
        <div className="action_bar__header">
            <ImageLoader className="action_bar__header__image" src={ensAvatar} />

            <Link
                className="link-wrapper link-text text-clip"
                to="/dashboard/"
                style={{ marginTop: "2px" }}
            >
                {ensName ? ensName : address}
            </Link>
        </div>
    )
}

export { ProfileView };