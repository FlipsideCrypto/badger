import { useState } from "react";

import ImageErrorFallback from "@static/images/imgerror.svg";
import { IPFS_GATEWAY_URL } from "@static/constants/links";

const ImageLoader = ({className, src, alt, prependGateway}) => {
    const [ loaded, setLoaded ] = useState(false);

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
                onLoad={() => setLoaded(true)}
                onError={(e) => onError(e)}
                style={loaded ? {} : { display: 'none' }}
            />
        </>
    )
}

export default ImageLoader;