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
    const [ badgeName, setBadgeName ] = useState();
    const [ badgeImage, setBadgeImage ] = useState();
    const [ badgeDelegates, setBadgeDelegates ] = useState([]);
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

    // TODO: add rows
    const handleAddRow = () => {

    }

    // TODO: add rows dynamically after parsing csv
    useEffect(() => {
        console.log('here', csvFile)
        if (csvFile) {
            console.log('now here')
            csvReader.onload = function (event) {
                const csvOutput = csvFileToArray(event.target.result);
                setBadgeDelegates(csvOutput);
            };

            csvReader.readAsText(csvFile);
        }
    }, [csvFile, csvReader])

    return (        
        <div id="new-badge">
            <Header back={"/dashboard/new/organization"}/>

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
                onClick={handleAddRow}
            >
                <FontAwesomeIcon icon={['fal', 'fa-plus']} />
                <span>Add Another</span>
            </button>

            <FormControl>
                <InputLabel htmlFor="badge-delegates">Delegate(s)</InputLabel>
                <Input 
                    id="badge-delegates"
                    value={badgeDelegates}
                    onChange={(event) => setBadgeDelegates(event.target.value)}
                />
            </FormControl>

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