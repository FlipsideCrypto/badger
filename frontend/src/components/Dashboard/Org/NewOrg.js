import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
    FormControl,
    InputLabel,
    Input,
} from "@mui/material";
import Header from "../Header/Header";


const NewOrg = () => {
    const [ orgName, setOrgName ] = useState();
    const [ orgSymbol, setOrgSymbol ] = useState();

    let navigate = useNavigate();

    // TODO: Hook up contracts/API
    const handleCreateOrg = () => {
        console.log('Org Name', orgName, "orgSymbol", orgSymbol)
        navigate("/dashboard/new/badge")
    }

    return (
        <div id="new-org">
            <Header back={"/dashboard"}/>

            <h2>Create Organization</h2>
            <FormControl>
                <InputLabel htmlFor="org-name">Organization Name</InputLabel>
                <Input 
                    id="org-name" 
                    value={orgName} 
                    onChange={(event) => setOrgName(event.target.value)}
                />
            </FormControl>

            <FormControl>
                <InputLabel htmlFor="org-symbol">Organization Symbol</InputLabel>
                <Input 
                    id="org-symbol" 
                    value={orgSymbol}
                    onChange={(event) => setOrgSymbol(event.target.value)}
                />
            </FormControl>

            <div id="new-org-action">
                <p>Badge creation occurs after your organization has been established.</p>
                <button className="btn-secondary" onClick={() => handleCreateOrg()}>
                    CREATE
                </button>
            </div>
        </div>
    )
}

export default NewOrg;