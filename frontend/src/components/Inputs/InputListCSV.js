import { useEffect, useRef, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormControl, InputLabel } from "@mui/material";

import { csvFileToArray } from "@utils/helpers";

const InputListCSV = ({ label, inputList, setInputList }) => {
    const [ csvFile, setCSVFile ] = useState();
    const csvInput = useRef();
    const csvReader = useMemo(() => new FileReader(), []);

    const onInputChange = (index, event) => {
        let newInputs = [...inputList];
        newInputs[index] = event.target.value;
        setInputList(newInputs);
    }

    useEffect(() => {
        console.log('here', csvFile)
        if (csvFile) {
            console.log('now here')
            csvReader.onload = function (event) {
                const csvOutput = csvFileToArray(event.target.result);
                console.log("csv", csvOutput)
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
            style={{display: "none"}}
            onChange={(event) => setCSVFile(event.target.files[0])}
            />

            <button 
                className="button-unstyled" 
                onClick={() => csvInput.current.click()}
            >
                <FontAwesomeIcon icon={['fal', 'fa-plus']} />
                <span>Upload CSV</span>
            </button>
            <button 
                className="button-unstyled" 
                onClick={() => setInputList([...inputList, ""])}
            >
                <FontAwesomeIcon icon={['fal', 'fa-plus']} />
                <span>Add Another</span>
            </button>

            {inputList.map((input, index) => (
                <FormControl key={"input-" + index}>
                    {index === 0 && 
                        <InputLabel htmlFor="input-0">{label}</InputLabel>
                    }
                    <input 
                        id={"input-" + index}
                        value={input}
                        onChange={(event) => onInputChange(index, event)}
                    />
                </FormControl>
            ))}
        </>
    )
}

export default InputListCSV;