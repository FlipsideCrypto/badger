import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSigner, useAccount } from "wagmi"

import BadgeCreator from "../Dashboards/BadgeCreator";
import SetCreator from "../Dashboards/SetCreator";
import BadgeManager from "../Dashboards/BadgeManager";
import FinalizeSet from "../Dashboards/FinalizeSet";

const Home = () => {
    let navigate = useNavigate();
    const { address } = useAccount();
    const { data: signer } = useSigner();

    // TODO: Fix these default values
    const [stage, setStage] = useState('createSet')
    const [badgeSetContract, setBadgeSetContract] = useState('0x76c212d4Ad177eD7E099d527BBF7aceCa3868ED0');
    
    const [badgeSetImageFile, setBadgeSetImageFile] = useState();
    const [badgeSetDeploymentArgs, setBadgeSetDeploymentArgs] = useState();
    const [badgeDataToFinalize, setBadgeDataToFinalize] = useState([]);
    const [badgeId, setBadgeId] = useState(0)

    useEffect(() => {        
        if(!address) {
            navigate('/')
        }
    }, [])

    function renderNewBadgeCreator() {
        return <BadgeCreator
            key={`badge-${badgeId}`}
            badgeSetContract={badgeSetContract}
            setStage={setStage}
            address={address}
            signer={signer}
            badgeDataToFinalize={badgeDataToFinalize}
            setBadgeDataToFinalize={setBadgeDataToFinalize}
            setBadgeId={setBadgeId}
            badgeId={badgeId}
        />
    }

    useEffect(() => {
        renderNewBadgeCreator()
    }, [badgeId])

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
                renderNewBadgeCreator()
            }
            {stage === 'mintBadges' &&
                <BadgeManager
                    badgeSetContract={badgeSetContract}
                    setStage={setStage}
                    address={address}
                    signer={signer}
                />
            }
            {stage === 'finalizeSet' &&
                <FinalizeSet 
                    setStage={setStage}
                    badgeSetImageFile={badgeSetImageFile}
                    badgeSetDeploymentArgs={badgeSetDeploymentArgs}
                    badgeDataToFinalize={badgeDataToFinalize}
                    address={address}
                    signer={signer}
                />
            }
        </>
    )
}

export default Home;