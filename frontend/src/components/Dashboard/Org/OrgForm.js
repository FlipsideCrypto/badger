import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../Header/Header";
import ActionBar from "../Form/ActionBar";

import Input from "../Form/Input";

const OrgForm = () => {
    const [orgName, setOrgName] = useState("");
    const [orgSymbol, setOrgSymbol] = useState("");

    const navigate = useNavigate();
    const { org } = useParams();

    const nameToSymbol = (name) => {
        // Remove all non-alphanumeric characters and conver to uppercase
        // with a max length of 5 characters
        return name.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().substring(0, 5);
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
        const orgAddress = "0x1234567890";

        navigate(`/dashboard/organization/org=${orgAddress}`);
    }

    return (
        <div id="new-org">
            <Header back={() => navigate(-1)} />

            <h2>Create Organization</h2>

            <Input 
                name="orgName"
                label="Organization Name" 
                value={orgName} 
                onChange={onOrgNameChange} 
            />

            <Input
                name="orgSymbol"
                label="Organization Symbol"
                value={orgSymbol}
                onChange={(e) => setOrgSymbol(e.target.value)}
            />

            <ActionBar help={
                "Badge creation occurs after your organization has been established."
            } actions={
                <button onClick={onOrgFormSubmission}>Create</button>
            } />
        </div>
    )
}

export default OrgForm;