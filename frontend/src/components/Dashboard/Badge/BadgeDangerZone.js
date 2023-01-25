import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ErrorContext } from "@components/Provider/ErrorContextProvider";
import { UserContext } from "@components/Provider/UserContextProvider";
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
        
        if (response.error || badgeIndex === -1) {
            setError({
                label: 'Could not archive badge',
                message: response?.error ?? response.detail ?? "Badge not found"
            });
            return;
        }

        let newUserDataBadges = [...newUserData.organizations[orgIndex].badges];
        newUserDataBadges.splice(badgeIndex, 1);
        newUserData.organizations = newUserDataBadges;
        setUserData(newUserData);
        navigate(`/dashboard/organizations/${orgId}`);
    }

    return (
        <>
            <h3 style={{marginLeft: "20px"}}>Danger Zone</h3>

            <div style={{border: "1px solid #FF0000", borderRadius: '10px', marginBottom: "40px"}}>
                <div style={{display: "grid", gridTemplateColumns: "auto auto", padding: "20px"}}>
                    <div className="form__group" style={{marginBottom: "0px"}}>
                        <label>Archive Badge</label>
                        <span style={{fontSize: "14px", lineHeight: "21px", margin: "0"}}>
                            Remove this badge from the App. <b>NOTE</b>: The Badge will still exist on chain!
                        </span>
                    </div>

                    <button
                        className="button__warning"
                        style={{justifySelf: "end", alignSelf: "center"}}
                        onClick={() => onArchive()}
                    >
                        Archive Badge
                    </button>
                </div>
            </div>
        </>
    )
}

export default BadgeDangerZone;