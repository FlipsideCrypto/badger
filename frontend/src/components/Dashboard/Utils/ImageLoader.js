import { useState } from "react";
import ImageErrorFallback from "@static/images/imgerror.svg";

const ImageLoader = ({className, src, alt}) => {
    const [ loaded, setLoaded ] = useState(false);

    const onLoad = () => {
        console.log('loaded')
        setLoaded(true);
    }

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
                src={src}
                alt={alt || ""}
                onLoad={onLoad}
                onError={(e) => onError(e)}
                style={loaded ? {} : { display: 'none' }}
            />
        </>
    )
}

export default ImageLoader;