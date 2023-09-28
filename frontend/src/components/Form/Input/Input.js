import '@style/Form/Input.css'

const Input = props => {
	const {
		label,
		required = true,
		prepend,
		append,
		placeholder,
		reference
	} = props

	let formGroupClass = 'form__group'
	if (prepend || append) {
		formGroupClass += ' input__group'
	}

	const titleCase = label => {
		return label.toLowerCase().replace(/\b\w/g, s => s.toUpperCase())
	}

	const titledLabel = required ? `${label} *` : label

	return (
		<div className={formGroupClass}>
			{props.prepend && (
				<span className="form__prepend">{props.prepend}</span>
			)}

			{/* if label is string */}
			{typeof label === 'string' && (
				<label htmlFor={label} className="form__label">
					{titleCase(titledLabel)}
				</label>
			)}

			{typeof label === 'object' && label}

			<input
				{...props}
				ref={reference?.current}
				placeholder={placeholder}
			/>

			{append && <div className="form__append">{append}</div>}
		</div>
	)
}

export { Input }
