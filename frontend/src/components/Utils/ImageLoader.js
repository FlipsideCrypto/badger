import { useState } from "react";

import { IPFS_GATEWAY_URL, ImageErrorFallback } from "@static";

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
            {!loaded && <div className={className} />}

            <img
                className={className}
                src={prependGateway ? IPFS_GATEWAY_URL + src : src}
                alt={alt || ""}
                onLoad={(e) => {
                    setLoaded(true);
                    onLoad(e.target);
                }}
                onError={(e) => onError(e)}
                style={loaded ? {} : { display: "none" }}
            />
        </>
    )
}

export { ImageLoader };