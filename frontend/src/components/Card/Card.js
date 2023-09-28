import '@style/Card/Card.css'

const Card = props => {
	const { children, className, style } = props

	return (
		<div className={`card ${className || ''}`} style={style} {...props}>
			{children}
		</div>
	)
}

export { Card }
