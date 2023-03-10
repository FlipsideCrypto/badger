import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ActionButton, Input } from "@components";

import { csvFileToArray } from "@utils";

import "@style/Form/InputListAddressAmount.css"

const InputListAddressAmountCSV = ({ obj, setObj, setAreAddressesValid }) => {
    const [inputFieldCount, setInputFieldCount] = useState(obj.length || 1);
    const csvInput = useRef();
    const csvReader = new FileReader();

    // Adds the input field to the address state array.
    const onAddressChange = (index, event) => {
        const address = event.target.value.trim();

        const old = {...obj};
        old.addresses[index] = address;
        setObj(old);
    }

    // Adds the input field to the amount state array.
    const onAmountChange = (index, event) => {
        const amount = parseInt(event.target.value.trim());

        const old = {...obj};
        old.amounts[index] = amount;
        setObj(old);
    }

    // Updates the addresses and amounts with the CSV file inputs. 
    // Uses first and second headers for addresses and amounts.
    const onCSVUpload = (event) => {
        const file = event.target.files[0];
        
        csvReader.onload = function (event) {
            const csvOutput = csvFileToArray(event.target.result);
            setInputFieldCount(csvOutput.length);
            
            let input = {addresses: [], amounts: []};
            // Get the columns of the file
            for (var i = 0; i < csvOutput.length; i++) {
                input.addresses.push(csvOutput[i][0]);
                input.amounts.push(parseInt(csvOutput[i][1]));
            }
            setObj(input)
        };
        
        csvReader.readAsText(file);
        // Reset the current input value so that the same file can be uploaded again.
        csvInput.current.value = null;
    }
    
    // Deletes the input field row at the specified index.
    // If the index is the first and only row, just reset the value.
    const onFieldDelete = (index) => {
        if (inputFieldCount !== 1)
            setInputFieldCount(inputFieldCount - 1);
        
        setObj({
            addresses: obj.addresses.filter((_, i) => i !== index),
            amounts: obj.amounts.filter((_, i) => i !== index),
        })
    }

    const labelDOM = <>
        <div className="form__actions form__list" style={{
            display: "grid",
            gridTemplateColumns: "max-content auto",
        }}>
            <label htmlFor="addresses">
                Members to Update
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

    // When the addresses change anywhere else, updated the input field count.
    useEffect(() => {
        setInputFieldCount(obj.addresses.length || 1);
    }, [obj.addresses])

    return (
        <div className="form__list">
            <input
                type="file"
                accept=".xlsx, .xls, .csv"
                ref={csvInput}
                style={{ display: "none" }}
                onChange={onCSVUpload}
            />

            {[...Array(inputFieldCount)].map((x, index) => (
                <div className="address__amount" key={index}>
                    <Input
                        // TODO: Reimplement validation
                        // className={isValidatedArray[index] ? "form__list__address error" : "form__list__address"}
                        className={"form__list__address"}
                        label={index === 0 ? labelDOM : <></>}
                        placeholder="0x0000..."
                        value={obj['addresses'][index] || ""}
                        onChange={(e) => onAddressChange(index, e)}
                    />
                    <Input 
                        className={"form__list__amount"}
                        label={index === 0 ?
                            <div className="form__actions">
                                <label htmlFor="amount">Amount</label>
                            </div> : <></>
                        }
                        append={deleteDOM(index)}
                        value={obj['amounts'][index] || 1}
                        onChange={(e) => onAmountChange(index, e)}
                    />
                </div>
            ))}
        </div>
    )
}

export { InputListAddressAmountCSV };