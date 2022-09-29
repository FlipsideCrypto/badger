import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Header from "../Header/Header";
import HolderTable from "@components/Table/HolderTable";
import InputListCSV from "@components/Dashboard/Form/InputListCSV";

import "@style/Dashboard/Org/Badge.css";

import { DummyBadgeData } from "@static/constants/constants";

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

    const badge = DummyBadgeData;

    return (
        <div id="badge">
            <Header back={() => navigate(-1)} actions={actions} />

            <div className="center__gutter">
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
                    <div className="badge__actions">
                        <button 
                            className="button__unstyled badge__action" 
                            onClick={() => { navigate(`/dashboard/badge/analytics/${org}&${id}`)}}
                        >
                            <FontAwesomeIcon icon={["fal", "fa-chart-simple"]} />
                            <span>Analytics</span>
                        </button>
                    </div>
                }
            </div>

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