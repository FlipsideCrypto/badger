import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../Header/Header";
import ActionBar from "../Form/ActionBar";

const OrgForm = () => {
    const [orgName, setOrgName] = useState("");
    const [orgSymbol, setOrgSymbol] = useState("");

    let navigate = useNavigate();

    const nameToSymbol = (name) => {
        return name.toUpperCase().replace(/[AEIO]/g, "");
    }

    const onOrgNameChange = (e) => {
        setOrgName(e.target.value)

        if (orgSymbol === nameToSymbol(orgName)) {
            setOrgSymbol(nameToSymbol(e.target.value));
        }
    }

    // TODO: Hook up contracts/API
    const onOrgFormSubmission = () => {
        console.log('Org Name', orgName, "orgSymbol", orgSymbol)
        navigate("/dashboard/badge/new")
    }

    return (
        <div id="new-org">
            <Header back={-1} />

            <h2>Create Organization</h2>
            <div className="form-group">
                <label htmlFor="orgName">Organization Name</label>
                <input type="text" id="orgName" value={orgName} onChange={onOrgNameChange} />
            </div>

            <div className="form-group">
                <label htmlFor="orgSymbol">Organization Symbol</label>
                <input type="text" id="orgSymbol" value={orgSymbol} onChange={(e) => setOrgSymbol(e.target.value)} />
            </div>

            <ActionBar help={
                "Badge creation occurs after your organization has been established."
            } actions={
                <button onClick={onOrgFormSubmission}>Create</button>
            } />

            {/* <FormControl>
                <InputLabel htmlFor="org-name">Organization Name</InputLabel>
                <Input 
                    id="org-name" 
                    value={orgName} 
                    onChange={(event) => setOrgName(event.target.value)}
                />
            </FormControl> */}

            {/* <FormControl>
                <InputLabel htmlFor="org-symbol">Organization Symbol</InputLabel>
                <Input 
                    id="org-symbol" 
                    value={orgSymbol}
                    onChange={(event) => setOrgSymbol(event.target.value)}
                />
            </FormControl> */}

            {/* <div id="new-org-action">
                <p>/p>
                <button className="btn-secondary" onClick={onOrgFormSubmission}>
                    CREATE
                </button>
            </div> */}
        </div>
    )
}

export default OrgForm;