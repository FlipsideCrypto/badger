import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ActionBar from "@components/Dashboard/Form/ActionBar";

import { ErrorContext } from "@components/Dashboard/Provider/ErrorContextProvider";
import { UserContext } from "@components/Dashboard/Provider/UserContextProvider";
import { patchModelType } from "@utils/api_requests";

// import { useTransferOwnership } from "@hooks/contracts/useContracts";
// import InputAddress from "@components/Dashboard/Form/InputAddress";

// TODO: The renounceOwnership function in the contract does currently not 
// support the withdrawal of funds to a target address.
const OrgDangerZone = ({orgAddress}) => {
    const { setError } = useContext(ErrorContext);
    const { userData, setUserData } = useContext(UserContext);
    
    const navigate = useNavigate();
    const orgId = parseInt(useParams().orgId);

    // const [ newOwner, setNewOwner ] = useState("");
    // const [ newOwnerValid, setNewOwnerValid ] = useState(true);
    // const [ renounceTarget, setRenounceTarget ] = useState("");
    // const [ renounceTargetValid, setRenounceTargetValid ] = useState(true);
    
    // const transferOwnership = useTransferOwnership(
    //     orgAddress && newOwnerValid && newOwner !== "",
    //     orgAddress,
    //     newOwner
    // );
    // const renounceOwnership = useRenounceOwnership(Boolean(orgAddress), orgAddress);

    // const onTransferOwnership = async () => {
    //     try {
    //         const tx = await transferOwnership.write?.();
    //         const txReceipt = await tx.wait();

    //         if (txReceipt.status !== 1) {
    //             throw new Error(transferOwnership?.error);
    //         }
    //         const body = {
    //             id: orgId,
    //             owner: {
    //                 ethereum_address: newOwner
    //             }
    //         }
    //         const response = await patchModelType("organizations", body);

    //         let newUserData = {...userData}
    //         const orgIndex = newUserData.organizations.findIndex(org => org.id === orgId);
    //         newUserData.organizations[orgIndex] = response;
    //         setUserData(newUserData);
    //         // TODO: show a success message
    //         navigate('/dashboard/');
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
    //         const txReceipt = await tx?.wait();

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

    const onArchive = async () => {
        const body = {
            id: orgId,
            is_active: false
        }
        const response = await patchModelType("organizations", body);

        let newUserData = {...userData}
        const orgIndex = newUserData.organizations.findIndex(org => org.id === orgId);
        
        if (response.error || orgIndex === -1) {
            setError({
                label: 'Could not archive org',
                message: response?.error ?? response.detail ?? "Org not found"
            });
            return;
        }

        let newUserDataOrgs = [...newUserData.organizations];
        newUserDataOrgs.splice(orgIndex, 1);
        newUserData.organizations = newUserDataOrgs;
        setUserData(newUserData);
        navigate(`/dashboard`);
    }

    // useEffect(() => {
    //     setError(null);
    //     if (transferOwnership.error) {
    //         setError({
    //             label: "Error transferring ownership",
    //             message: transferOwnership.error
    //         })
    //     }
    // }, [setError, transferOwnership.error])

    return (
        <>
            <h3 style={{marginLeft: "30px"}}>Danger Zone</h3>

            <div style={{border: "1px solid #FF0000", borderRadius: '10px', marginBottom: "40px", padding: "10px 30px 10px 30px"}}>
                <div className="form__group" style={{marginBottom: "0px"}}>
                    <div style={{display: "grid", gridTemplateColumns: "auto auto", marginBottom: "20px"}}>
                        <div>
                            <label>Archive Organization</label>
                            <div style={{color: "rgba(0,0,0,0.35", marginTop: "20px"}}>
                                <ActionBar help="
                                    Remove this organizations from showing up on the App. 
                                    NOTE: The Org and Badges will still exist on chain!
                                "/>
                            </div>
                        </div>

                        <button
                            className="button__warning"
                            style={{justifySelf: "end", height: "40px"}}
                            onClick={() => onArchive()}
                        >
                            Archive organization
                        </button>
                    </div>


                    {/* <InputAddress
                        name="newOrgOwner"
                        label="Organization Owner"
                        value={newOwner}
                        setValue={(value) => setNewOwner(value)}
                        isValid={newOwnerValid}
                        setIsValid={(value) => setNewOwnerValid(value)}
                        append={
                            <button
                                className="button__warning"
                                onClick={onTransferOwnership}
                                disabled={!newOwner || !transferOwnership.isSuccess}
                                style={{width: "auto"}}
                            >
                                Transfer ownership
                            </button>
                        }
                    />
                    <ActionBar help="
                        Transfer this organization to another wallet where you have the ability to manage the organization.
                    " /> */}
                </div>


                {/*
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