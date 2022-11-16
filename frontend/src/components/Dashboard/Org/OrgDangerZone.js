import { useState, useContext } from "react";

import { ErrorContext } from "@components/Dashboard/Provider/ErrorContextProvider";
import { useTransferOwnership, useRenounceOwnership } from "@hooks/contracts/useContracts";
import Input from "@components/Dashboard/Form/Input";

// TODO: The renounceOwnership function in the contract does currently not 
// support the withdrawal of funds to a target address.
const OrgDangerZone = (orgAddress) => {
    const { setError } = useContext(ErrorContext);
    const [ newOwner, setNewOwner ] = useState("");
    const [ renounceTarget, setRenounceTarget ] = useState("");
    
    const transferOwnership = useTransferOwnership(Boolean(orgAddress), orgAddress, newOwner);
    const renounceOwnership = useRenounceOwnership(Boolean(orgAddress), orgAddress);

    const onTransferOwnership = async () => {
        try {
            const tx = transferOwnership.write?.();
            const txReceipt = await tx.wait();

            if (txReceipt.status !== 1) {
                throw new Error(transferOwnership?.error);
            }
            // post to backend
            // show a success message
        }
        catch (error) {
            setError({
                label: "Error transferring ownership",
                message: error
            })
        }
    }

    const onRenounceOwnership = async () => {
        try {
            const tx = renounceOwnership.write?.();
            const txReceipt = await tx.wait();

            if (txReceipt.status !== 1) {
                throw new Error(renounceOwnership?.error);
            }
            // post to backend
            // show a success message
        }
        catch (error) {
            setError({
                label: "Error renouncing ownership",
                message: error
            })
        }
    }

    return (
        <>
            <h2 style={{marginLeft: "30px"}}>Danger Zone</h2>

            <div style={{border: "1px solid #FF0000", borderRadius: '10px'}}>
                <Input
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
                />
            </div>
        </>
    )
}

export default OrgDangerZone;