import "@style/Dashboard/Form/Select.css";

const Select = ({label, options}) => {
    return (
        <div className="select">
            <div className="form__group">
                <label htmlFor={label}>
                    {label}
                </label>
                <select>
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default Select;