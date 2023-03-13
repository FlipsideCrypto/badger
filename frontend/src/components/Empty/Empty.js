import { Link } from "react-router-dom";

import { Dashboard, ActionButton } from "@components";

import "@style/Empty/Empty.css";

const Empty = ({ title, body, button, url }) => {
    return (
        <div className="empty">
            <Dashboard>
                <h1>{title}</h1>
                <p>{body}</p>

                {url && button && <Link className="internal-link" to={url}>
                    <ActionButton className="primary" icon={['fal', 'arrow-right']} beforeText={button} />
                </Link>}

                {!url && button && button}
            </Dashboard>
        </div>
    )
}

export { Empty }