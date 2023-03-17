import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { usePrepareContractWrite, useContractWrite } from "wagmi"

import { getBadgerOrganizationAbi, useFees, useUser } from "@hooks";

import { addressValidator } from "@utils";

const getManageHolderArgs = ({ data, functionName }) => {
    const { cleanedAddresses: addresses, invalid } = addressValidator(data.addresses);
    const amounts = data.amounts.map(amount => parseInt(amount || 1));
    const tokenId = parseInt(data.tokenId);

    if (invalid.length !== 0 || addresses.length === 0 || addresses.length !== amounts.length)
        return []
    if (functionName === "mint")
        return [addresses[0], tokenId, amounts[0], "0x"];
    if (functionName === "mintBatch")
        return [addresses, tokenId, amounts, "0x"];
    if (functionName === "revoke")
        return [addresses[0], tokenId, amounts[0]];
    if (functionName === "revokeBatch")
        return [addresses, tokenId, amounts];
}

const useManageHolders = ({ obj }) => {
    const fees = useFees();

    const { orgAddress } = useParams();

    const { chain, address } = useUser();

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const BadgerOrg = useMemo(() => { return getBadgerOrganizationAbi() }, [])

    const isReady = BadgerOrg && fees && address;

    const functionName = obj.addresses.length > 1 ? obj.functionName + "Batch" : obj.functionName;

    const args = getManageHolderArgs({
        data: obj,
        functionName: functionName
    });

    const overrides = { gasPrice: fees?.gasPrice };

    const { config, isSuccess: isPrepared } = usePrepareContractWrite({
        enabled: isReady && args.length > 0,
        address: orgAddress,
        abi: BadgerOrg.abi,
        functionName,
        chainId: chain.id,
        args,
        overrides,
        onError: (e) => {
            const err = e?.error?.message || e?.data?.message || e
            throw new Error(err);
        }
    });

    const { writeAsync } = useContractWrite(config);

    const openHolderTransaction = async ({
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

            setIsLoading(false)
            setIsSuccess(true)

            onSuccess({ config, chain, tx, receipt })
        } catch (e) {
            console.error('e', e)

            onError(e);
        }
    }

    return { openHolderTransaction, isPrepared, isLoading, isSuccess }
}

// Changes delegates of badge(s) with id(s) from orgAddress. 
// If revoke is true then delegates are removed.
const useSetDelegates = (isTxReady, orgAddress, ids, delegates, action) => {
    const BadgerOrganization = useMemo(() => getBadgerOrganizationAbi(), []);
    const [error, setError] = useState();

    const revoke = action === "Remove Manager" ? true : false
    const isDelegateArray = Array(delegates.length).fill(!revoke);
    const functionName = typeof (ids) === "number" ? "setDelegates" : "setDelegatesBatch";

    // This should also clean/check the addresses as well.
    delegates.forEach((delegate, index) => {
        if (delegate === "") {
            delegates.pop(index)
        }
    })

    const args = [
        ids,
        delegates,
        isDelegateArray,
    ]

    const fees = useFees();
    const { config, isSuccess } = usePrepareContractWrite({
        address: orgAddress,
        abi: BadgerOrganization.abi,
        functionName: functionName,
        args: args,
        enabled: Boolean(fees && isTxReady),
        overrides: {
            gasPrice: fees?.gasPrice,
        },
        onError(e) {
            const err = e?.error?.message || e?.data?.message || e
            setError(err);
            console.error('Error setting delegates: ', err);
        }
    })

    const { writeAsync } = useContractWrite(config);

    return { write: writeAsync, isSuccess, error };
}

// Determines which function to call based on if it is a revoke or a mint,
// if there are multiple badge ids, and if there are multiple holders.
const useManageBadgeOwnership = (isTxReady, orgAddress, ids, users, action, amounts) => {
    const BadgerOrganization = useMemo(() => getBadgerOrganizationAbi(), []);
    const [error, setError] = useState();

    // Might look a little funky but cleaner than a switch IMO.
    // If revoke is true, then we check if there is just one holder for a single revoke.
    // If ids is a single id, then we call the revoke function with multiple holders.
    // If ids is an array, then we call revoke with multiple different badges.
    // If revoke is false, same checks but for minting instead of revoke
    const revoke = action === "Revoke" ? true : false
    const functionName = revoke ?
        users.length === 1 ? "revoke" :
            typeof (ids) === "number" ? "revokeBatch" : "revokeFullBatch"
        :
        users.length === 1 ? "leaderMint" :
            typeof (ids) === "number" ? "leaderMintBatch" : "leaderMintFullBatch"

    // This should also clean/check the addresses as well.
    users.forEach((user, index) => {
        if (user === "") {
            users.pop(index)
        }
    })

    // TODO: Amounts will need to be changed to be an array for 
    // each badge. For now it's standard for just one.
    amounts = Array(users.length).fill(amounts)

    if (users.length === 1)
        users = users[0]

    const args = [
        users,
        ids,
        amounts,
    ]

    // Contracts currently have bytes data if it's a mint only, not revoke.
    if (!revoke)
        args.push("0x")

    const fees = useFees();
    const { config, isSuccess } = usePrepareContractWrite({
        address: orgAddress,
        abi: BadgerOrganization.abi,
        functionName: functionName,
        args: args,
        enabled: Boolean(fees && isTxReady),
        overrides: {
            gasPrice: fees?.gasPrice,
        },
        onError(e) {
            const err = e?.error?.message || e?.data?.message || e
            setError(err);
            console.error('Error managing badge ownership: ', err);
        }
    })

    const { writeAsync } = useContractWrite(config);

    return { write: writeAsync, isSuccess, error };
}

export {
    useManageHolders,
    useSetDelegates,
    useManageBadgeOwnership
}