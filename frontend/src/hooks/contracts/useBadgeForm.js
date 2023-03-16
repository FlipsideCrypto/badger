import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { ethers } from "ethers";

import { getBadgerOrganizationAbi, useFees, useUser } from "@hooks";

const getBadgeFormTxArgs = ({ obj }) => {
    if (!obj.uriHash) return { args: [], functionName: "" };

    console.log('obj', obj)
    // For now, we're hard coding the setHook and configHook if the badge is account bound. A more modular piece is being built out for hooks and managers.
    const functionName = obj.accountBound ? "multicall" : "setBadgeURI";
    let args = [];

    if (functionName === "setBadgeURI" && obj.uriHash)
         args = [obj.token_id, obj.uriHash];

    // If we are initializing as account bound, we need to set the badge URI, set the manager, and config it
    if (functionName === "multicall") {
        const config = ethers.utils.defaultAbiCoder.encode(["uint256","bool"], [obj.token_id, true])

        // TODO: DON'T HARD CODE THIS
        const BEFORE_TRANSFER_SLOT = "0x844bb459abe62f824043e42caa262ad6859731fc48abd8966db11d779c0fe669"

        const setBadgeURI = obj.organization.abi.encodeFunctionData(
            "setBadgeURI", [obj.token_id, obj.uriHash]
        );
        const setHook = obj.organization.abi.encodeFunctionData(
            "setHooks", [BEFORE_TRANSFER_SLOT, [obj.address], [true]]
        );
        const configHook = obj.organization.abi.encodeFunctionData(
            "configHook", [BEFORE_TRANSFER_SLOT, obj.address, config]
        );

        args = [[setBadgeURI, setHook, configHook]];
    }


    return { functionName, args };
}

const useBadgeForm = ({ obj }) => {
    const fees = useFees();

    const { orgAddress } = useParams();

    const { authenticatedAddress, chain } = useUser();

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const BadgerOrg = useMemo(() => { return getBadgerOrganizationAbi() }, []);

    const { functionName, args } = getBadgeFormTxArgs({ 
        obj: {
            ...obj, 
            organization: BadgerOrg,
            address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0" // TODO: Get the hook implementation address
        }
     });

    const isReady = BadgerOrg && fees && authenticatedAddress && !!functionName;

    const overrides = { gasPrice: fees?.gasPrice };
    
    const { config, isSuccess: isPrepared } = usePrepareContractWrite({
        enabled: isReady,
        address: orgAddress,
        abi: BadgerOrg.abi,
        functionName: functionName,
        chainId: chain.id,
        args,
        overrides,
        onError: (e) => {
            const err = e?.error?.message || e?.data?.message || e
            throw new Error(err);
        }
    });

    const { writeAsync } = useContractWrite(config);

    const openBadgeFormTransaction = async ({
        onError = (e) => { console.error(e) },
        onLoading = () => { },
        onSuccess = ({ config, chain, tx, receipt }) => { }
    }) => {
        try {
            setIsLoading(true);
            setIsSuccess(false);
            onLoading();

            const tx = await writeAsync();

            const receipt = await tx.wait();

            if (receipt.status === 0) throw new Error("Error submitting transaction");

            receipt.events = receipt.logs.filter((log) => log.address === orgAddress).map((log) => BadgerOrg.abi.parseLog(log))
            console.log('receipt', receipt)
    
            setIsLoading(false)
            setIsSuccess(true)

            onSuccess({ config, chain, tx, receipt })
        } catch (e) {
            onError(e);
        }
    }

    return { openBadgeFormTransaction, isPrepared, isLoading, isSuccess }
}

const useBadge = ({ obj, image, functionName }) => {

}

export { 
    useBadgeForm, 
    useBadge
}