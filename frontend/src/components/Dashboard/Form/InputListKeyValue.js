import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActionButton from "@components/Button/ActionButton";
import Input from "@components/Dashboard/Form/Input";

const InputListKeyValue = ({ label, inputList, setInputList, keyPlaceholder, valuePlaceholder, ...props }) => {
    const [ inputFieldCount, setInputFieldCount ] = useState(1);

    // Adds the input field to the state array.
    const onInputChange = (index, event, keyValue) => {
        let newInputs = [...inputList];
        let newInput = { ...newInputs[index] };
        
        newInput[keyValue] = event.target.value;
        newInputs[index] = newInput;
        setInputList(newInputs);
    }

    // Deletes the input field row at the specified index.
    // If the index is the first and only row, just reset the value.
    const onFieldDelete = (index) => {
        let newInputs = [...inputList];
        if (index === 0 && inputFieldCount === 1) {
            setInputList([{key: "", value: ""}]);
        }
        else {
            newInputs.splice(index, 1);
            setInputList(newInputs);
            setInputFieldCount(inputFieldCount - 1);
        }
    }

    // When an input loses focus, clear whitespace.
    const onBlur = (index, keyValue) => {
        if (inputList[index]?.[keyValue] && inputList[index][keyValue].includes(' ')) {
            let newInputs = [...inputList];
            newInputs[index][keyValue] = newInputs[index][keyValue].trim();
            setInputList(newInputs);
        }
    }

    const labelDOM = <>
        <div className="form__actions" style={{
            display: "grid",
            gridTemplateColumns: "max-content auto",
        }}>
            <label htmlFor={label}>
                {label}
            </label>
        </div>
    </>

    const actionDOM = <>
        <div className="form__actions" style={{
            display: "grid",
            gridTemplateColumns: "max-content auto",
        }}>
            <div></div>
            <div style={{textAlign: 'right'}}>
                <button
                    className="button__unstyled"
                    onClick={() => setInputFieldCount(inputFieldCount + 1)}
                    style={{ marginLeft: "10px" }}
                >
                    <FontAwesomeIcon icon={['fal', 'fa-plus']} style={{
                        marginRight: "10px"
                    }}/>
                    <span>Add Attribute</span>
                </button>
            </div>
        </div>
    </>

    const deleteDOM = (index) => {
        return (
            <ActionButton 
                onClick={() => onFieldDelete(index)} 
                sx={{minWidth: '40px'}}
                icon={['fal', 'fa-trash']}
            />
        )
    }

    return (
        <div className="form__list" {...props}>
            {[...Array(inputFieldCount)].map((x, index) => (
                <div key={index} style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: "10px"}}
                >
                    <Input
                        label={index === 0 ? labelDOM : ""}
                        value={inputList[index]?.["key"] || ""}
                        placeholder={keyPlaceholder}
                        onChange={(event) => onInputChange(index, event, "key")}
                        // onFocus={() => setFocused(index, "name")}
                        onBlur={() => onBlur(index, "name")}
                    />

                    <Input
                        label={index === 0 ? actionDOM : ""}
                        append={deleteDOM(index)}
                        value={inputList[index]?.["value"] || ""}
                        placeholder={valuePlaceholder}
                        onChange={(event) => onInputChange(index, event, "value")}
                        // onFocus={() => setFocused(index, "value")}
                        onBlur={() => onBlur(index, "value")}
                    />
                </div>
            ))}
        </div>
    )
}

export default InputListKeyValue;