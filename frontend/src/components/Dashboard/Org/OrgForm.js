import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useNetwork, useContractEvent } from "wagmi";

import { UserContext } from "@components/Dashboard/Provider/UserContextProvider";
import Header from "@components/Dashboard/Header/Header";
import ActionBar from "@components/Dashboard/Form/ActionBar";
import Input from "@components/Dashboard/Form/Input";

import { useBadgerPress } from "@hooks/useContracts";
import { postOrgRequest } from "@utils/api_requests";
import { getBadgerAbi } from "@hooks/useContracts";

const OrgForm = () => {
    const [orgName, setOrgName] = useState("");
    const [orgSymbol, setOrgSymbol] = useState("");
    const { userData, setUserData } = useContext(UserContext);

    const { chain } = useNetwork();
    const navigate = useNavigate();
    const createContract = useBadgerPress(chain.name);

    // Listener for the confirmed transaction in order to
    // pull the new contract address from events.
    const badger = getBadgerAbi(chain.name)
    useContractEvent({
        addressOrName: badger.address,
        contractInterface: badger.abi,
        eventName: "OrganizationCreated",
        once: true,
        listener: (event) => {
            console.log("Event: ", event);
            onEventReceived(event);
        }
    })

    const actions = [
        {
            text: "CREATE",
            icon: ["fal", "arrow-right"],
            event: () => createContract.write?.()
        }
    ]
    
    // Upon receiving the event from clone transaction,
    // POST the org to backend and redirect to org page.
    const onEventReceived = async (event) => {
        const orgObj = {
            is_active: false,
            chain: chain.name,
            ethereum_address: '',
            name: orgName,
            symbol: orgSymbol,
            description: 'This is a super cool description.',
            image_hash: '0x',
            contract_uri_hash: '0x',
        }
        const contractAddress = event[0];
        orgObj.ethereum_address = contractAddress;
        // If transaction was confirmed, add is_active to orgObj.
        if (contractAddress) {
            orgObj.is_active = true;

            // POST org to backend and if successful, add to state and navigate to org page.
            const response = await postOrgRequest(orgObj);
            if (!response?.error && response?.id) {
                addOrgToState(response);
                navigate(`/dashboard/organization?orgId=${response.id}`);
            }
        }

    }    

    const nameToSymbol = (name) => {
        return name.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().substring(0, 5);
    }

    const onOrgNameChange = (e) => {
        setOrgName(e.target.value)

        if (orgSymbol === nameToSymbol(orgName)) {
            setOrgSymbol(nameToSymbol(e.target.value));
        }
    }

    // Determines if organizations is already in userData, before pushing or settings
    // the new organization to userData.
    const addOrgToState = (org) => {
        let newUserData = {...userData};

        if (newUserData.organizations)
            newUserData.organizations.push(org);
        else
            newUserData.organizations = [org];

        setUserData(newUserData);
    }

    return (
        <div id="new-org">
            <Header back={() => navigate("/dashboard")} />

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