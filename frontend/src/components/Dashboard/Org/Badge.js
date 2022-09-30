import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Header from "@components/Dashboard/Header/Header";
import HolderTable from "@components/Table/HolderTable";
import IconButton from "@components/Button/IconButton";
import InputListCSV from "@components/Dashboard/Form/InputListCSV";
import Select from "@components/Dashboard/Form/Select";

import { OrgContext } from "@components/Dashboard/Provider/OrgContextProvider";

import "@style/Dashboard/Org/Badge.css";

const Badge = () => {
    const [ isManage, setIsManage ] = useState(false);
    const [ membersToUpdate, setMembersToUpdate ] = useState([""]);
    const [ updateOption, setUpdateOption ] = useState("Mint");

    const { orgId, badgeId } = useParams();
    const { orgData } = useContext(OrgContext);
    const navigate = useNavigate();

    // const badge = null || orgData?.[orgId]?.badges?.[badgeId];
    const badge = null || orgData[orgId].badges[badgeId];

    const actions = [{
        text: "Manage",
        icon: ["fal", "fa-person"],
        event: () => setIsManage(!isManage)
    }]

    const selectMethods = {
        "Mint": "mintBundle",
        "Revoke": "revokeBundle",
        "Add Leader": "setLeaders",
        "Remove Leader": "removeLeaders",
    }

    const onMemberUpdate = () => {
        console.log(membersToUpdate)
        console.log(updateOption)
    }

    return (
        <>
            <Header back={() => navigate(-1)} actions={actions} />

            <div id="badge">
                <div className="center__gutter">
                    <h1>{badge?.name}</h1>
                    {!isManage && badge?.name &&
                        <div className="badge__actions">
                            <button 
                                className="button__unstyled badge__action" 
                                onClick={() => { navigate(`/dashboard/badge/analytics/orgId=${orgId}&badgeId=${badgeId}`)}}
                            >
                                <FontAwesomeIcon icon={["fal", "fa-chart-simple"]} />
                                <span>Analytics</span>
                            </button>
                        </div>
                    }
                </div>

                {isManage && 
                    <>
                        <Select 
                            label="Update Type"
                            options={Object.keys(selectMethods)} 
                            value={updateOption}
                            setValue={(e) => setUpdateOption(e.target.value)}
                        />
                        <InputListCSV
                            label="Members to update"
                            inputList={membersToUpdate}
                            setInputList={setMembersToUpdate}
                        />
                        <IconButton
                            icon={['fal', 'arrow-right']} 
                            text="UPDATE MEMBERS" 
                            onClick={onMemberUpdate}
                            style={{margin: "20px 0px 20px auto"}}
                        />
                    </>
                }

                {badge?.holders && badge?.holders.length > 0 ?
                    <HolderTable holders={badge.holders} />
                    :
                    <div className="org__container empty">
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
        </>
    )
}

export default Badge