import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '@style/Link/ArrowLink.css'

const ArrowLink = ({
	children,
	className = undefined,
	href = undefined,
	to = undefined
}) => {
	const content = (
		<>
			{children}
			<span>
				<FontAwesomeIcon icon={['fal', 'arrow-right']} />
			</span>
		</>
	)

	const contentClass = className ? `arrowLink ${className}` : 'arrowLink'

	if (href)
		return (
			<a
				className={contentClass}
				href={href}
				target="_blank"
				rel="noreferrer"
			>
				{content}
			</a>
		)

	return (
		<Link className={contentClass} to={to}>
			{content}
		</Link>
	)
}

export { ArrowLink }
