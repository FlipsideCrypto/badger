import { Button } from "@mui/material";
import { useEffect, useState, } from 'react';

import { useNavigate } from "react-router-dom";

import BadgeCreator from "../Dashboards/BadgeCreator";
import SetCreator from "../Dashboards/SetCreator";

const Home = () => {
    const [badgeSetContract, setBadgeSetContract] = useState();
    const [stage, setStage] = useState('createSet')

    // TODO: Home page should give a logged in user the ability to navigate to any
    //          dashboard that they have access to. If an admin, they should be able 
    //          to navigate to create badges, manage badges, or create a new set.
    // TODO: Design this before jumping into it


    return (
        <>
            {stage == 'createSet' &&
                <SetCreator 
                    badgeSetContract={badgeSetContract}
                    setBadgeSetContract={setBadgeSetContract}
                    setStage={setStage}
                />
            }
            {stage == 'createBadge' &&
                <BadgeCreator
                    badgeSetContract={badgeSetContract}
                    setBadgeSetContract={setBadgeSetContract}
                    setStage={setStage}
                />
            }
        </>
    )
}

export default Home;