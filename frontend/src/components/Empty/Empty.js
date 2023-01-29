import { Link } from "react-router-dom";

import { Dashboard, IconButton } from "@components";

import "@style/Empty/Empty.css";

const Empty = ({ title, body, button, url }) => {
    return (
        <div className="empty">
            <Dashboard>
                <h1>{title}</h1>
                <p>{body}</p>

                {url && button && <Link className="internal-link" to={url}>
                    <IconButton icon={['fal', 'arrow-right']} text={button} />
                </Link>}
            </Dashboard>
        </div>
    )
}

export { Empty }