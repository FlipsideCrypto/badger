import "@style/Dashboard/Form/Select.css";

const Select = ({ label, options, value, setValue }) => {
    return (
        <div className="select">
            <div className="form__group">
                <label htmlFor={label}>
                    {label}
                </label>
                <select onChange={setValue} value={value}>
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

export { Select };