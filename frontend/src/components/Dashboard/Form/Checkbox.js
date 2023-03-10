import "@style/Dashboard/Form/Checkbox.css"

const Checkbox = ({checked, setChecked, label, disabled}) => {
    return (
        <div className="checkbox__wrapper">
            <div className="form__group">
                {typeof label === "string" && 
                    <label 
                        htmlFor={label} 
                        className="form__label">{label}</label>
                }
                {typeof label === "object" && label}
                
                <label className={disabled ? "checkbox checkbox__disabled" : "checkbox"}>
                    <input                 
                        checked={checked}
                        onChange={setChecked}
                        disabled={disabled}
                        type="checkbox"  
                    />
                    <span className="checkmark" />
                </label>
          </div>
      </div>
    )
}

export default Checkbox;