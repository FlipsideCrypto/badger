import { Link } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '@style/Button/Button.css'

const Button = ({
	children,
	className,
	onClick,
	icon,
	iconStyle,
	...props
}) => {
	return (
		<button className={`${className}`} onClick={onClick} {...props}>
			{props.text || children}
		</button>
	)
}

export { Button }
