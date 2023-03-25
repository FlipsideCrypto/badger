import { Link } from "react-router-dom";

import { ActionButton } from "@components";

import "@style/Empty/Empty.css";

const Empty = ({ title, body, button, url, className }) => {
    return (
        <div className={"empty " + className}>
            <div className="dashboard__content">
                <h1>{title}</h1>
                <p>{body}</p>

                {url && button && <Link className="internal-link" to={url}>
                    <ActionButton className="primary" icon={['fal', 'arrow-right']} beforeText={button} />
                </Link>}

                {!url && button && button}
            </div>
        </div>
    )
}

export { Empty }