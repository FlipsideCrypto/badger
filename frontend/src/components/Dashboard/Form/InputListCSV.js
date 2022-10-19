import { useEffect, useRef, useMemo, useState, useCallback } from "react";
import { ethers } from "ethers";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Input from "@components/Dashboard/Form/Input";

import { csvFileToArray } from "@utils/helpers";

const InputListCSV = ({ label, inputList, setInputList, setAreAddressesValid }) => {
    const [ csvFile, setCSVFile ] = useState();
    const [ inputFieldCount, setInputFieldCount ] = useState(1);
    const [ validatedAddresses, setValidatedAddresses ] = useState([]);
    const [ focused, setFocused ] = useState(null);
    const csvInput = useRef();
    const csvReader = useMemo(() => new FileReader(), []);

    // Adds the input field to the state array.
    const onInputChange = (index, event) => {
        let newInputs = [...inputList];
        newInputs[index] = event.target.value;
        validateAddress(index, event.target.value);
        setInputList(newInputs);
    }

    // Deletes the input field row at the specified index.
    // If the index is the first and only row, just reset the value.
    const onFieldDelete = (index) => {
        console.log('validated addys', inputList);
        let newInputs = [...inputList];
        if (index === 0 && inputFieldCount === 1) {
            setInputList([]);
            setValidatedAddresses([]);
        }
        else {
            let newValidated = [...validatedAddresses];
            newInputs.splice(index, 1);
            newValidated.splice(index, 1);
            
            setInputList(newInputs);
            setInputFieldCount(inputFieldCount - 1);
            setValidatedAddresses(newValidated);
        }
    }

    // When an input loses focus, validate the address and clear whitespace.
    const onBlur = (index) => {
        setFocused(null);
        if (inputList[index].includes(' ')) {
            let newInputs = [...inputList];
            newInputs[index] = newInputs[index].trim();
            setInputList(newInputs);
            validateAddress(index, newInputs[index]);
        }
    }

    // Checks the address validity of a single input and updates the state array.
    const validateAddress = useCallback((index, address) => {
        const isValid = ethers.utils.isAddress(address);

        let newValidatedAddresses = [...validatedAddresses];
        newValidatedAddresses[index] = isValid;
        setValidatedAddresses(newValidatedAddresses);
    }, [validatedAddresses, setValidatedAddresses]);

    // Raises an error in field if any addresses in state array are invalid.
    // Used in conjuction with csv upload.
    const validateAddresses = useCallback((addresses) => {
        const validated = addresses.map((address) => {
            return ethers.utils.isAddress(address);
        });

        setValidatedAddresses(validated)
    }, [setValidatedAddresses])

    // When CSV file changes, parse the data and validate the addresses.
    useEffect(() => {
        if (csvFile) {
            csvReader.onload = function (event) {
                const csvOutput = csvFileToArray(event.target.result);
                setInputFieldCount(csvOutput.length);
                setInputList(csvOutput);
                validateAddresses(csvOutput);
            };

            csvReader.readAsText(csvFile);
        }
    }, [csvFile, csvReader, setInputList, validateAddresses])

    // When validated array changes, check if any addresses are invalid.
    useEffect(() => {
        const isAllValid = validatedAddresses.every((address) => address === true);
        setAreAddressesValid(isAllValid);
    }, [validatedAddresses, setAreAddressesValid])

    const labelDOM = <>
        <div className="form__actions" style={{
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
                    }}/>
                    <span>Upload CSV</span>
                </button>
                <button
                    className="button__unstyled"
                    onClick={() => setInputFieldCount(inputFieldCount + 1)}
                    style={{ marginLeft: "10px" }}
                >
                    <FontAwesomeIcon icon={['fal', 'fa-plus']} style={{
                        marginRight: "10px"
                    }}/>
                    <span>Add Another</span>
                </button>
            </div>
        </div>
    </>

    const deleteDOM = (index) => {
        return (
            <Button onClick={() => onFieldDelete(index)} sx={{minWidth: '40px'}}>
                <FontAwesomeIcon icon={['fal', 'fa-trash']} style={{color: "#A6A6A6"}}/>
            </Button>
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
                    className={validatedAddresses[index] === false && index !== focused ? 
                        "form__list__address error" : "form__list__address"
                    }
                    key={index}
                    label={index === 0 ? labelDOM : ""}
                    append={deleteDOM(index)}
                    value={inputList[index] || ""}
                    onChange={(event) => onInputChange(index, event)}
                    onFocus={() => setFocused(index)}
                    onBlur={() => onBlur(index)}
                />
            ))}
        </div>
    )
}

export default InputListCSV;