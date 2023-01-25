import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "@components/Dashboard/Form/Input";

import { ActionButton } from "@components";

const InputListKeyValue = (
    {
        label,
        inputList,
        listKey,
        dispatch,
        keyPlaceholder,
        valuePlaceholder,
        ...props
    }
) => {
    const [inputFieldCount, setInputFieldCount] = useState(inputList?.length > 1 ? inputList.length : 1);

    // Adds the input field to the state array.
    const onInputChange = (index, event, keyValue) => {
        dispatch({
            type: "UPDATE_KEY_VALUE_ARRAY",
            field: listKey,
            index: index,
            key: keyValue,
            payload: event.target.value
        });
    }

    // Deletes the input field row at the specified index.
    // If the index is the first and only row, just reset the value.
    const onFieldDelete = (index) => {
        if (index === 0 && inputFieldCount === 1) {
            dispatch({
                type: "SET",
                field: listKey,
                payload: []
            })
            return;
        }

        dispatch({
            type: "DELETE_FROM_ARRAY",
            field: listKey,
            index: index,
        });
        setInputFieldCount(inputFieldCount - 1);
    }

    // When an input loses focus, clear whitespace.
    const onBlur = (index, keyValue) => {
        const pair = inputList[index][keyValue];
        if (pair && pair.includes(' ')) {
            dispatch({
                type: "UPDATE_KEY_VALUE_ARRAY",
                field: listKey,
                index: index,
                key: keyValue,
                payload: inputList[index][keyValue].trim()
            });
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
            <div style={{ textAlign: 'right' }}>
                <button
                    className="button__unstyled"
                    onClick={() => setInputFieldCount(inputFieldCount + 1)}
                    style={{ marginLeft: "10px" }}
                >
                    <FontAwesomeIcon icon={['fal', 'fa-plus']} style={{
                        marginRight: "10px"
                    }} />
                    <span>Add Attribute</span>
                </button>
            </div>
        </div>
    </>

    const deleteDOM = (index) => {
        return (
            <ActionButton
                onClick={() => onFieldDelete(index)}
                sx={{ minWidth: '40px' }}
                icon={['fal', 'fa-trash']}
            />
        )
    }

    // If the inputList changes outside of this component, update the inputFieldCount.
    useEffect(() => {
        if (inputList.length > 1) {
            setInputFieldCount(inputList.length);
        }
    }, [inputList])

    return (
        <div className="form__list" {...props}>
            {[...Array(inputFieldCount)].map((x, index) => (
                <div className="form__group__key__value" key={index}>
                    <Input
                        label={index === 0 ? labelDOM : ""}
                        value={inputList?.[index]?.["trait_type"] || ""}
                        placeholder={keyPlaceholder}
                        onChange={(event) => onInputChange(index, event, "trait_type")}
                        onBlur={() => onBlur(index, "trait_type")}
                    />

                    <Input
                        label={index === 0 ? actionDOM : ""}
                        append={deleteDOM(index)}
                        value={inputList?.[index]?.["value"] || ""}
                        placeholder={valuePlaceholder}
                        onChange={(event) => onInputChange(index, event, "value")}
                        onBlur={() => onBlur(index, "value")}
                    />
                </div>
            ))}
        </div>
    )
}

export default InputListKeyValue;