import { useState } from "react";

import ImageErrorFallback from "@static/images/imgerror.svg";
import { IPFS_GATEWAY_URL } from "@static/constants/links";

const ImageLoader = ({
    className,
    src,
    alt,
    prependGateway,
    onLoad = () => { },
}) => {
    const [loaded, setLoaded] = useState(false);

    const onError = (e) => {
        e.onError = null;
        e.currentTarget.src = ImageErrorFallback;
    }

    return (
        <>
            {!loaded &&
                <div className={className} />
            }
            <img
                className={className}
                src={prependGateway ? IPFS_GATEWAY_URL + src : src}
                alt={alt || ""}
                onLoad={(e) => {
                    setLoaded(true);
                    onLoad(e.target);
                }}
                onError={(e) => onError(e)}
                style={loaded ? {} : { display: 'none' }}
            />
        </>
    )
}

export { ImageLoader };