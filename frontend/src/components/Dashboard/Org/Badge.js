import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

    const params = new URLSearchParams(window.location.search);
    const orgId = params.get("orgId");
    const badgeId = params.get("badgeId");
    const { orgData } = useContext(OrgContext);
    const navigate = useNavigate();

    const badge = null || orgData?.badges[badgeId];

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

    // TODO: Hook up contract hooks and API POST
    const onMemberUpdate = () => {
        console.log("Members to Update", membersToUpdate)
        console.log("Method to call", updateOption)
    }

    useEffect(() => {
        if (!orgData) navigate("/dashboard/");
    }, [orgData, navigate])

    return (
        <>
            <Header back={() => navigate(`/dashboard/badge/new?orgId=${orgId}`)} actions={actions} />

            <div id="badge">
                <div className="center__gutter">
                    <h1>{badge?.name}</h1>
                    {!isManage && badge?.name &&
                        <div className="badge__actions">
                            <button 
                                className="button__unstyled badge__action" 
                                onClick={() => { navigate(`/dashboard/badge/analytics?orgId=${orgId}&badgeId=${badgeId}`)}}
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