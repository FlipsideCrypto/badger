import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ActionBar from "@components/Dashboard/Form/ActionBar";

import { ErrorContext } from "@components/Dashboard/Provider/ErrorContextProvider";
import { UserContext } from "@components/Dashboard/Provider/UserContextProvider";
import { patchModelType } from "@utils/api_requests";

// import { useTransferOwnership, useRenounceOwnership } from "@hooks/contracts/useContracts";
// import Input from "@components/Dashboard/Form/Input";

// TODO: The renounceOwnership function in the contract does currently not 
// support the withdrawal of funds to a target address.
const BadgeDangerZone = () => {
    const { setError } = useContext(ErrorContext);
    const { userData, setUserData } = useContext(UserContext);
    
    const navigate = useNavigate();
    const badgeId = parseInt(useParams().badgeId);
    const orgId = parseInt(useParams().orgId);

    const onArchive = async () => {
        const body = {
            id: orgId,
            is_active: false
        }
        const response = await patchModelType("badges", body);

        let newUserData = {...userData}
        const orgIndex = newUserData.organizations.findIndex(org => org.id === orgId);
        const badgeIndex = newUserData.organizations[orgIndex].badges.findIndex(badge => badge.id === badgeId);
        
        if (response.error || response.detail || badgeIndex === -1) {
            setError({
                label: 'Could not archive badge',
                message: response?.error ?? response.detail ?? "Badge not found"
            });
            return;
        }

        let newUserDataBadges = [...newUserData.organizations[orgIndex].badges];
        newUserDataBadges.splice(badgeIndex, 1);
        newUserData.organizations[orgIndex].badges = newUserDataBadges;
        setUserData(newUserData);
        navigate(`/dashboard/organization/${orgId}`);
    }

    return (
        <>
            <h3 style={{marginLeft: "30px"}}>Danger Zone</h3>

            <div style={{border: "1px solid #FF0000", borderRadius: '10px', marginBottom: "40px"}}>
                <div style={{display: "grid", gridTemplateColumns: "auto auto", padding: "10px 30px 10px 30px"}}>
                    <div className="form__group" style={{marginBottom: "0px"}}>
                        <label>Archive Badge</label>
                        <div style={{color: "rgba(0,0,0,0.35"}}>
                            <ActionBar help="Remove this badge from the App. NOTE: The Badge will still exist on chain!" />
                        </div>
                    </div>

                    <button
                        className="button__warning"
                        style={{justifySelf: "end", alignSelf: "center"}}
                        onClick={() => onArchive()}
                    >
                        Archive badge
                    </button>
                </div>
            </div>
        </>
    )
}

export default BadgeDangerZone;