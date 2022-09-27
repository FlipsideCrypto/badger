import { useState, useRef, useEffect, useMemo } from "react";
import { 
    FormControl,
    InputLabel,
    Input,
} from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { csvFileToArray } from "../../../utils/helpers";
import Header from "../Header/Header";

const NewBadge = () => {
    const [ badgeName, setBadgeName ] = useState("");
    const [ badgeImage, setBadgeImage ] = useState("");
    const [ badgeDelegates, setBadgeDelegates ] = useState([""]);
    const [ csvFile, setCSVFile ] = useState();

    const imageInput = useRef();
    const csvInput = useRef();
    const csvReader = useMemo(() => new FileReader(), []);

    // TODO: Hook this up to something
    const handleCreateBadge = () => {
        console.log("Badge Name:", badgeName)
        console.log("Badge Image:", badgeImage)
        console.log("Badge Delegates:", badgeDelegates)
    }

    const handleDelegateChange = (index, event) => {
        let newDelegates = [...badgeDelegates];
        newDelegates[index] = event.target.value;
        setBadgeDelegates(newDelegates);
    }

    useEffect(() => {
        console.log('here', csvFile)
        if (csvFile) {
            console.log('now here')
            csvReader.onload = function (event) {
                const csvOutput = csvFileToArray(event.target.result);
                console.log("csv", csvOutput)
                setBadgeDelegates(csvOutput);
            };

            csvReader.readAsText(csvFile);
        }
    }, [csvFile, csvReader])

    return (        
        <div id="new-badge">
            <Header back={-1}/>

            <h2>Create Badge</h2>
            <FormControl>
                <InputLabel htmlFor="badge-name">Name</InputLabel>
                <Input 
                    id="badge-name"
                    value={badgeName} 
                    onChange={(event) => setBadgeName(event.target.value)}
                />
            </FormControl>

            <FormControl>
                {/* <InputLabel htmlFor="badge-image">Image</InputLabel> */}
                <input 
                    id="badge-image"
                    style={{display: "none"}}
                    ref={imageInput}
                    accept="image/*" 
                    type="file"
                    onChange={(event) => setBadgeImage(event.target.files[0])}
                />
                <button 
                    className="button-secondary"
                    onClick={() => imageInput.current.click()}
                >
                    {badgeImage ? badgeImage.name : "UPLOAD"}
                </button>
            </FormControl>

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
                onClick={() => setBadgeDelegates([...badgeDelegates, ""])}
            >
                <FontAwesomeIcon icon={['fal', 'fa-plus']} />
                <span>Add Another</span>
            </button>

            {/* <FormControl>
                <InputLabel htmlFor="badge-delegates">Delegate(s)</InputLabel>
                <Input 
                    id="badge-delegates"
                    value={badgeDelegates}
                    onChange={(event) => setBadgeDelegates(event.target.value)}
                />
            </FormControl> */}
            {badgeDelegates.map((delegate, index) => (
                <FormControl key={"delegate-" + index}>
                    {index === 0 && 
                        <InputLabel htmlFor="badge-delegate-0">Delegate(s)</InputLabel>
                    }
                    <Input 
                        key={"badge-delegate-" + index}
                        id={"badge-delegate-" + index}
                        value={delegate}
                        onChange={(event) => handleDelegateChange(index, event)}
                    />
                </FormControl>
            ))}

            <div>
                <p>
                    After creating a badge, you (or your delegates) can issue badges to team members.
                </p>
                <button className="btn-secondary" onClick={() => handleCreateBadge()}>
                    CREATE
                </button>
            </div>
        </div>
    )
}

export default NewBadge;