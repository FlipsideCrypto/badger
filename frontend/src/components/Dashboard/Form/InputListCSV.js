import { useEffect, useRef, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Input from "@components/Dashboard/Form/Input";

import { csvFileToArray } from "@utils/helpers";

const InputListCSV = ({ label, inputList, setInputList }) => {
    const [csvFile, setCSVFile] = useState();
    const csvInput = useRef();
    const csvReader = useMemo(() => new FileReader(), []);

    const onInputChange = (index, event) => {
        let newInputs = [...inputList];
        newInputs[index] = event.target.value;
        setInputList(newInputs);
    }

    const labelDOM = <>
        <div style={{
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
                    onClick={() => setInputList([...inputList, ""])}
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

    useEffect(() => {
        if (csvFile) {
            csvReader.onload = function (event) {
                const csvOutput = csvFileToArray(event.target.result);
                setInputList(csvOutput);
            };

            csvReader.readAsText(csvFile);
        }
    }, [csvFile, csvReader, setInputList])

    return (
        <>
            <input
                type="file"
                accept=".xlsx, .xls, .csv"
                ref={csvInput}
                style={{ display: "none" }}
                onChange={(event) => setCSVFile(event.target.files[0])}
            />

            {inputList.map((input, index) => (
                <Input
                    key={index}
                    label={index === 0 ? labelDOM : ""}
                    value={input}
                    onChange={(event) => onInputChange(index, event)}
                />
            ))}
        </>
    )
}

export default InputListCSV;