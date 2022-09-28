import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormControl, InputLabel } from "@mui/material";

import Header from "../Header/Header";
import InputListCSV from "../../Inputs/InputListCSV";

const BadgeForm = () => {
    const [ badgeName, setBadgeName ] = useState("");
    const [ badgeImage, setBadgeImage ] = useState("");
    const [ badgeDelegates, setBadgeDelegates ] = useState([""]);

    const imageInput = useRef();

    const navigate = useNavigate();
    const { org } = useParams();

    // TODO: Hook this up to something
    const onCreateBadge = () => {
        console.log("Badge Name:", badgeName)
        console.log("Badge Image:", badgeImage)
        console.log("Badge Delegates:", badgeDelegates)
        navigate(`/dashboard/badge/${org}&id=0`)
    }

    return (        
        <div id="new-badge">
            <Header back={() => navigate(-1)} />

            <h2>Create Badge</h2>
            <FormControl>
                <InputLabel htmlFor="badge-name">Name</InputLabel>
                <input 
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

            <InputListCSV 
                label={"Delegates"} 
                inputList={badgeDelegates} 
                setInputList={setBadgeDelegates}
            />

            <div>
                <p>
                    After creating a badge, you (or your delegates) can issue badges to team members.
                </p>
                <button className="btn-secondary" onClick={() => onCreateBadge()}>
                    CREATE
                </button>
            </div>
        </div>
    )
}

export default BadgeForm;