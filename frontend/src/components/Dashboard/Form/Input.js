import "@style/Dashboard/Form/Input.css"

const Input = ({ name, label, required, value, onChange }) => {
    return (
        <div className="form__group">
            <label htmlFor={label}>
                {label}
                {required === true && <span className="form__required">*</span>}
            </label>
            <input type="text" id={label} value={value} onChange={onChange} />
        </div>
    )
}

export default Input;