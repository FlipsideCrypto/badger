import { useState } from 'react'

import { ImageErrorFallback, IPFS_GATEWAY_URL } from '@static'

const ImageLoader = ({
	className,
	src,
	alt,
	bypassed,
	prependGateway,
	onLoad = () => {}
}) => {
	const [loaded, setLoaded] = useState(false)

	const onError = e => {
		e.onError = null
		e.currentTarget.src = ImageErrorFallback
	}

	const style = bypassed
		? loaded
			? {}
			: { display: 'none' }
		: loaded
		? {
				transition: 'all .3s ease-in-out'
		  }
		: {
				transition: 'all .3s ease-in-out',
				opacity: '0'
		  }

	return (
		<>
			{!loaded && <div className={className} style={style} />}

			<img
				className={className}
				src={prependGateway ? IPFS_GATEWAY_URL + src : src}
				alt={alt || ''}
				onLoad={e => {
					setLoaded(true)
					onLoad(e.target)
				}}
				onError={e => onError(e)}
				style={style}
			/>
		</>
	)
}

export { ImageLoader }
