import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSigner, useAccount } from "wagmi"

import { Button } from "@mui/material";

import BadgeCreator from "../Dashboards/BadgeCreator";
import SetCreator from "../Dashboards/SetCreator";
import BadgeMinter from "../Dashboards/BadgeMinter";

const Home = () => {
    let navigate = useNavigate();
    const { address } = useAccount();
    const { data: signer } = useSigner();

    // TODO: Fix these default values
    const [badgeSetContract, setBadgeSetContract] = useState('');
    const [stage, setStage] = useState('createSet')
    // TODO: Home page should give a logged in user the ability to navigate to any
    //          dashboard that they have access to. If an admin, they should be able 
    //          to navigate to create badges, manage badges, or create a new set.
    // TODO: Design this before jumping into it
    useEffect(() => {        
        if(!address) {
            navigate('/')
        }
    }, [])

    return (
        <>
            {stage === 'createSet' &&
                <SetCreator 
                    badgeSetContract={badgeSetContract}
                    setBadgeSetContract={setBadgeSetContract}
                    setStage={setStage}
                    address={address}
                    signer={signer}
                />
            }
            {stage === 'createBadge' &&
                <BadgeCreator
                    badgeSetContract={badgeSetContract}
                    setStage={setStage}
                    address={address}
                    signer={signer}
                />
            }
            {stage === 'mintBadges' &&
                <BadgeMinter
                    badgeSetContract={badgeSetContract}
                    setStage={setStage}
                    address={address}
                    signer={signer}
                />
            }
        </>
    )
}

export default Home;