import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNetwork, useAccount } from "wagmi";

import Header from "@components/Dashboard/Header/Header";
import ActionBar from "@components/Dashboard/Form/ActionBar";
import Input from "@components/Dashboard/Form/Input";

import { useOrgData, useUserData } from "@components/Hooks/Api";

const API_URL = process.env.REACT_APP_API_URL;

const OrgForm = () => {
    const [orgName, setOrgName] = useState("");
    const [orgSymbol, setOrgSymbol] = useState("");

    const { address } = useAccount();
    const { chain } = useNetwork();
    const navigate = useNavigate();
    // const { orgData, setOrgData } = useOrgData(orgId);
    const { userData, setUserData } = useUserData(address);

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
        const orgObj = {
            active: false,
            chain: chain.name,
            name: orgName,
            symbol: orgSymbol,
            description: 'This is a super cool description.',
            image_hash: '',
            contract_uri_hash: '',
            contract_address: ''
        }
        
        fetch(`${API_URL}/organizations/`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(orgObj)
        })
        .then(res => res.json())
        .then(data => {
            console.log('got org response', data);
        })

        orgObj.id = 0; // DUMMY value
        addOrgToState(orgObj);
        navigate(`/dashboard/organization/orgId=${orgObj.id}`);
    }

    const addOrgToState = (org) => {
        let newUserData = userData;
        newUserData.organizations.push(org);
        setUserData(newUserData);
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