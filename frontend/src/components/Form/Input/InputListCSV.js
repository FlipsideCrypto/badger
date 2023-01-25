import { useEffect, useRef, useMemo, useState, useCallback } from "react";
import { ethers } from "ethers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ActionButton, Input } from "@components";

import { csvFileToArray } from "@utils/helpers";

const InputListCSV = ({ label, inputList, listKey, dispatch, setAreAddressesValid, style }) => {
    const [csvFile, setCSVFile] = useState();
    const [inputFieldCount, setInputFieldCount] = useState(1);
    const [isValidatedArray, setIsValidatedArray] = useState([]);
    const csvInput = useRef();
    const csvReader = useMemo(() => new FileReader(), []);

    // Adds the input field to the state array.
    const onInputChange = (index, event) => {
        const address = event.target.value.trim()
        setAreAddressesValid(false);
        validateAddress(index, address);
        dispatch({
            type: "UPDATE_ARRAY_INDEX",
            field: listKey,
            index: index,
            payload: address
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
            setIsValidatedArray([]);
            return;
        }

        dispatch({
            type: "DELETE_ARRAY_INDEX",
            field: listKey,
            index: index,
        });

        setInputFieldCount(inputFieldCount - 1);
        setIsValidatedArray(isValidatedArray.filter((_, i) => i !== index));
    }

    // Checks the address validity of a single input and updates the state array.
    const validateAddress = useCallback((index, address) => {
        let newValidation = [...isValidatedArray];

        // Catch for if someone started inputting an address and deleted it.
        // Empty fields are allowed and caught by the contract hooks.
        if (address.length === 0) {
            newValidation[index] = true;
            setIsValidatedArray(newValidation);
            return address;
        }

        // Catch based on length to save some RPC calls on the isAddress.
        if (address.length !== 42) {
            newValidation[index] = false;
            setIsValidatedArray(newValidation);
            return address;
        }

        const isValid = ethers.utils.isAddress(address);
        newValidation[index] = isValid;
        setIsValidatedArray(newValidation);
    }, [isValidatedArray, setIsValidatedArray]);

    // Raises an error in field if any addresses in state array are invalid.
    // Used in conjuction with csv upload.
    const validateAddresses = useCallback((addresses) => {
        const validated = addresses.map((address) => {
            return ethers.utils.isAddress(address);
        });

        const isAllValid = validated.every((address) => address === true);
        setAreAddressesValid(isAllValid);
        setIsValidatedArray(validated)
    }, [setIsValidatedArray, setAreAddressesValid])

    // When CSV file changes, parse the data and validate the addresses.
    useEffect(() => {
        if (csvFile) {
            csvReader.onload = function (event) {
                const csvOutput = csvFileToArray(event.target.result);
                setInputFieldCount(csvOutput.length);
                validateAddresses(csvOutput);
                dispatch({ type: "SET", field: listKey, payload: csvOutput })
            };

            csvReader.readAsText(csvFile);
        }
    }, [csvFile, csvReader, validateAddresses, dispatch, listKey]);

    // When validated array changes, check if any addresses are invalid.
    useEffect(() => {
        if (isValidatedArray.length > 0) {
            const isAllValid = isValidatedArray.every((address) => address === true);
            setAreAddressesValid(isAllValid);
        }
    }, [isValidatedArray, setAreAddressesValid])

    const labelDOM = <>
        <div className="form__actions form__list" style={{
            display: "grid",
            gridTemplateColumns: "max-content auto",
        }}>
            <label htmlFor={label}>
                {label}
            </label>
            <div style={{
                textAlign: "right",
            }}>
                <button
                    className="button__unstyled"
                    onClick={() => csvInput.current.click()}
                >
                    <FontAwesomeIcon icon={['fal', 'fa-plus']} style={{
                        marginRight: "10px"
                    }} />
                    <span>Upload CSV</span>
                </button>
                <button
                    className="button__unstyled"
                    onClick={() => setInputFieldCount(inputFieldCount + 1)}
                    style={{ marginLeft: "10px" }}
                >
                    <FontAwesomeIcon icon={['fal', 'fa-plus']} style={{
                        marginRight: "10px"
                    }} />
                    <span>Add Another</span>
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

    return (
        <div className="form__list">
            <input
                type="file"
                accept=".xlsx, .xls, .csv"
                ref={csvInput}
                style={{ display: "none" }}
                onChange={(event) => setCSVFile(event.target.files[0])}
            />

            {[...Array(inputFieldCount)].map((x, index) => (
                <Input
                    className={isValidatedArray[index] === false ?
                        "form__list__address error" : "form__list__address"
                    }
                    key={index}
                    label={index === 0 ? labelDOM : ""}
                    placeholder="0x0000..."
                    append={deleteDOM(index)}
                    value={inputList[index] || ""}
                    onChange={(event) => onInputChange(index, event)}
                />
            ))}
        </div>
    )
}

export { InputListCSV };