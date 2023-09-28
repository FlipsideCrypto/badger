import '@style/Form/Switch.css'

const Switch = ({ checked, setChecked, label, disabled }) => {
	return (
		<div className="switch__wrapper">
			<div className="form__group">
				{typeof label === 'string' && (
					<label htmlFor={label} className="form__label">
						{label}
					</label>
				)}
				{typeof label === 'object' && label}

				<label
					className={disabled ? 'switch switch__disabled' : 'switch'}
				>
					<input
						checked={checked}
						onChange={setChecked}
						disabled={disabled}
						type="checkbox"
					/>
					<span className="slider" />
				</label>
			</div>
		</div>
	)
}

export { Switch }
