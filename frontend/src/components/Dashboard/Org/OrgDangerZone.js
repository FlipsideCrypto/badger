import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ErrorContext } from "@components/Dashboard/Provider/ErrorContextProvider";
import { UserContext } from "@components/Dashboard/Provider/UserContextProvider";
import { patchArchive } from "@utils/api_requests";

// import { useTransferOwnership, useRenounceOwnership } from "@hooks/contracts/useContracts";
// import Input from "@components/Dashboard/Form/Input";

// TODO: The renounceOwnership function in the contract does currently not 
// support the withdrawal of funds to a target address.
const OrgDangerZone = (orgAddress) => {
    const { setError } = useContext(ErrorContext);
    const { userData, setUserData } = useContext(UserContext);
    
    const navigate = useNavigate();
    const orgId = parseInt(useParams().orgId);

    // const [ newOwner, setNewOwner ] = useState("");
    // const [ renounceTarget, setRenounceTarget ] = useState("");
    
    // const transferOwnership = useTransferOwnership(Boolean(orgAddress), orgAddress, newOwner);
    // const renounceOwnership = useRenounceOwnership(Boolean(orgAddress), orgAddress);

    // const onTransferOwnership = async () => {
    //     try {
    //         const tx = transferOwnership.write?.();
    //         const txReceipt = await tx.wait();

    //         if (txReceipt.status !== 1) {
    //             throw new Error(transferOwnership?.error);
    //         }
    //         // post to backend
    //         // show a success message
    //     }
    //     catch (error) {
    //         setError({
    //             label: "Error transferring ownership",
    //             message: error
    //         })
    //     }
    // }

    // const onRenounceOwnership = async () => {
    //     try {
    //         const tx = renounceOwnership.write?.();
    //         const txReceipt = await tx.wait();

    //         if (txReceipt.status !== 1) {
    //             throw new Error(renounceOwnership?.error);
    //         }
    //         // post to backend
    //         // show a success message
    //     }
    //     catch (error) {
    //         setError({
    //             label: "Error renouncing ownership",
    //             message: error
    //         })
    //     }
    // }

    const onArchive = async (orgId) => {
        const response = await patchArchive("organizations", orgId);

        let newUserData = {...userData}
        console.log('userdata', newUserData)
        const orgIndex = newUserData.organizations.findIndex(org => org.id === orgId);
        
        if (response.error || orgIndex === -1) {
            console.log('response', response, orgIndex);
            setError({
                label: 'Could not archive org',
                message: response?.error ?? response.detail ?? "Org not found"
            });
            return;
        }

        console.log('gets here')
        let newUserDataOrgs = [...newUserData.organizations];
        newUserDataOrgs.splice(orgIndex, 1);
        newUserData.organizations = newUserDataOrgs;
        setUserData(newUserData);
        navigate(`/dashboard`);
    }

    return (
        <>
            <h3 style={{marginLeft: "20px"}}>Danger Zone</h3>

            <div style={{border: "1px solid #FF0000", borderRadius: '10px', marginBottom: "40px"}}>
                <div style={{display: "grid", gridTemplateColumns: "auto auto", padding: "20px"}}>
                    <div className="form__group" style={{marginBottom: "0px"}}>
                        <label>Archive Organization</label>
                        <span style={{fontSize: "14px", lineHeight: "21px", margin: "0"}}>
                            Remove this organizations from showing up on the App. <b>NOTE</b>: The Org and Badges will still exist on chain!
                        </span>
                    </div>

                    <button
                        className="button__warning"
                        style={{justifySelf: "end", alignSelf: "center"}}
                        onClick={() => onArchive(orgId)}
                    >
                        Archive Org
                    </button>
                </div>

                {/* <Input
                    name="newOrgOwner"
                    label="Organization Owner"
                    placeholder="0x000..."
                    value={newOwner}
                    onChange={(e) => setNewOwner(e.target.value)}
                    appened={
                        <button
                            className="button__warning"
                            onClick={() => onTransferOwnership}
                            disabled={!newOwner || !transferOwnership.isSuccess}
                            style={{width: "auto"}}
                        />
                    }
                />

                <Input
                    name="renounceTarget"
                    label="Renounce The Organization"
                    placeholder="0x000..."
                    value={renounceTarget}
                    onChange={(e) => setRenounceTarget(e.target.value)}
                    appened={
                        <button
                            className="button__warning"
                            onClick={() => onRenounceOwnership}
                            disabled={!renounceOwnership.isSuccess}
                            style={{width: "auto"}}
                        />
                    }
                /> */}
            </div>
        </>
    )
}

export default OrgDangerZone;