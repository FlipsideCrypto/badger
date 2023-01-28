import { Link } from "react-router-dom";

import { IconButton } from "@components";

const Empty = ({
    title,
    body,
    button,
    url
}) => {
    return (
        <div className="org__container empty" style={{ gridColumn: "span 3" }}>
            <h1>{title}</h1>
            <p style={{ marginBottom: "40px" }}>{body}</p>

            {url && button && <Link className="internal-link" to={url}>
                <IconButton icon={['fal', 'arrow-right']} text={button} />
            </Link>}
        </div>
    )
}

export { Empty }