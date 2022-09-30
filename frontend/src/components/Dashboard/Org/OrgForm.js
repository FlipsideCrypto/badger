import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNetwork } from "wagmi";

import Header from "../Header/Header";
import ActionBar from "../Form/ActionBar";
import Input from "../Form/Input";

import { API_URL } from "@static/constants/links";

const OrgForm = () => {
    const [orgName, setOrgName] = useState("");
    const [orgSymbol, setOrgSymbol] = useState("");
    const { chain } = useNetwork();

    const navigate = useNavigate();

    const actions = [
        {
            text: "CREATE",
            icon: ["fal", "arrow-right"],
            event: () => onOrgFormSubmission()
        }
    ]

    const nameToSymbol = (name) => {
        return name.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().substring(0, 5);
    }

    const onOrgNameChange = (e) => {
        setOrgName(e.target.value)

        if (orgSymbol === nameToSymbol(orgName)) {
            setOrgSymbol(nameToSymbol(e.target.value));
        }
    }

    const onOrgFormSubmission = () => {
        console.log('orgName', orgName)

        fetch(`${API_URL}/organizations/`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(
                {
                    active: false,
                    chain: "TEST",
                    name: "TEST",
                    symbol: orgSymbol,
                    description: 'This is a super cool description.',
                    image_hash: '',
                    contract_uri_hash: '',
                    contract_address: ''
                }
            )
        })
        .then(res => res.json())
        .then(data => {
            console.log('got org response', data);
        })

        // DUMMY DATA
        let orgId = 1;
        navigate(`/dashboard/organization/orgId=${orgId}`);
    }

    return (
        <div id="new-org">
            <Header back={() => navigate(-1)} />

            <h2>Create Organization</h2>

            <Input 
                name="orgName"
                label="Organization Name" 
                required={true}
                value={orgName} 
                onChange={onOrgNameChange} 
            />

            <Input
                name="orgSymbol"
                label="Organization Symbol"
                required={true}
                value={orgSymbol}
                onChange={(e) => setOrgSymbol(e.target.value)}
            />

            <ActionBar 
                help={"Badge creation occurs after your organization has been established."} 
                actions={actions} 
            />
        </div>
    )
}

export default OrgForm;