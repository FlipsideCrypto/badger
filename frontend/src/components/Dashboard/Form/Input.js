const Input = ({ name, label, value, onChange }) => {
    return (
        <div className="form-group">
            <label htmlFor={label}>{label}</label>
            <input type="text" id={label} value={value} onChange={onChange} />
        </div>
    )
}

export default Input;