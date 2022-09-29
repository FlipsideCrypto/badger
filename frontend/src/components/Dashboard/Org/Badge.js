import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Header from "../Header/Header";
import HolderTable from "@components/Table/HolderTable";
import InputListCSV from "@components/Input/InputListCSV";

// TODO: Table -- happy to do this but passing on it for now as it'll take me a while tbh
const Badge = () => {
    const [ isManage, setIsManage ] = useState(false);
    const [ membersToUpdate, setMembersToUpdate ] = useState([""]);

    const { org, id } = useParams();
    const navigate = useNavigate();

    const actions = [{
        text: "Manage",
        icon: ["fal", "fa-person"],
        event: () => setIsManage(!isManage)
    }]

    const badge = {
        name: "Curator",
        holders: [
            {
                address: "0x1ccb2945F1325e061b40Fe5b0B452f0E76fB7278",
                receivedAt: "2022-01-01",
                nickname: "Mason",
                pod: "Operations",
                delegate: true
            },
            {
                address: "0x1ccb2945F1325e061b40Fe5b0B452f0E76fB7279",
                receivedAt: "2022-01-03",
                nickname: "Chance",
                pod: "Governance",
                delegate: false
            },
            {
                address: "0x1ccb2945F1325e061b40Fe5b0B452f0E76fB7270",
                receivedAt: "2022-01-02",
                nickname: "Drake",
                pod: "Contributor",
                delegate: false
            },
            {
                address: "0x1ccb2945F1325e061b40Fe5b0B452f0E76fB7271",
                receivedAt: "2022-01-02",
                nickname: "Drake",
                pod: "Contributor",
                delegate: false
            },
            {
                address: "0x1ccb2945F1325e061b40Fe5b0B452f0E76fB7273",
                receivedAt: "2022-01-02",
                nickname: "Drake",
                pod: "Contributor",
                delegate: true
            },
        ]
    }

    return (
        <div id="badge">
            <Header back={() => navigate(-1)} actions={actions} />

            <h1>{badge.name}</h1>

            {isManage ? 
                <>
                    <h3>Update Type</h3>
                    <select>
                        <option>Mint</option>
                        <option>Revoke</option>
                        <option>Add Leader</option>
                        <option>Remove Leader</option>
                    </select>

                    <InputListCSV
                        label="Members to update"
                        inputList={membersToUpdate}
                        setInputList={setMembersToUpdate}
                    />
                </>
                :
                <button 
                    className="button__unstyled" 
                    onClick={() => { navigate(`/dashboard/badge/analytics/${org}&${id}`)}}
                >
                    <FontAwesomeIcon icon={["fal", "fa-chart-simple"]} />
                    <span>Analytics</span>
                </button>
            }

            {badge.holders && badge.holders.length > 0 ?
                <HolderTable holders={badge.holders} />
                :
                <div>
                    <h1>Your Organization is almost alive, it just needs members!</h1>
                    <p>
                        You've set up your Organization and your Badge. 
                        Now for the final step of sending the first set of keys to your team members.
                    </p>
                    <button onClick={() => setIsManage(true)}>
                        DISTRIBUTE KEYS
                    </button>
                </div>
            }
        </div>
    )
}

export default Badge