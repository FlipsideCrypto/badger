import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { usePrepareContractWrite, useContractWrite } from "wagmi"

import { getBadgerOrganizationAbi, useFees, useUser } from "@hooks";

import { addressValidator } from "@utils";

const getMintArgs = ({ data }) => {
    const functionName = data.mints.length > 1 ? "mintBatch" : "mint";

    // Build cleaned amounts and addresses
    const mintAmounts = data.mints.map(mint => parseInt(mint.pendingAmount || 1) - parseInt(mint.amount || 0));
    const { cleanedAddresses: mintAddresses, invalid } = addressValidator(data.mints.map(mint => mint.ethereum_address));

    // Make sure everything is valid for the transaction.
    if (invalid.length !== 0 || mintAddresses.length === 0 || mintAmounts.length !== mintAddresses.length) {
        // console.error("Invalid mint args", invalid, mintAmounts)
        return { functionName: "", args: [] };
    }

    const args = functionName === "mint" ? 
        [mintAddresses[0], data.tokenId, mintAmounts[0], "0x"] :
        [mintAddresses, data.tokenId, mintAmounts, "0x"]

    return { functionName, args };
}

const getRevokeArgs = ({ data }) => {
    const functionName = data.revokes.length > 1 ? "revokeBatch" : "revoke";
    
    // Build cleaned amounts and addresses
    const revokeAmounts = data.revokes.map(mint => Math.abs(parseInt(mint.amount) - parseInt(mint.pendingAmount || mint.amount)));
    const { cleanedAddresses: revokeAddresses, invalid } = addressValidator(data.revokes.map(revoke => revoke.ethereum_address));

    // Make sure everything is valid for the transaction.
    if (invalid.length !== 0 || revokeAddresses.length === 0 || revokeAmounts.length !== revokeAddresses.length) {
        // console.error("Invalid revoke args", invalid, revokeAmounts)
        return { functionName: "", args: [] };
    }

    const args = functionName === "revoke" ?
        [revokeAddresses[0], data.tokenId, revokeAmounts[0]] :
        [revokeAddresses, data.tokenId, revokeAmounts];

    return { functionName, args };
}

const getManageHolderArgs = ({ data }) => {
    const { functionName: mintFunction, args: mintArgs } = getMintArgs({ data: data });
    const { functionName: revokeFunction, args: revokeArgs} = getRevokeArgs({ data: data });

    // if multi call is necessary
    if (mintFunction && revokeFunction) {
        // Build mint and revoke args
        
        console.log('data', data, mintArgs, revokeArgs)

        // Encode the mint and revoke args
        const args = [[
            data.organization.abi.encodeFunctionData(mintFunction, mintArgs),
            data.organization.abi.encodeFunctionData(revokeFunction, revokeArgs)
        ]]

        return { functionName: "multicall", args };
    }
    else if (data.mints.length > 0) {
        return getMintArgs({ data: data });
    }

    else if (data.revokes.length > 0) {
        return getRevokeArgs({ data: data });
    }

    return { functionName: "", args: [] };
}

const useManageHolders = ({ obj }) => {
    const fees = useFees();

    const { orgAddress } = useParams();

    const { chain, address } = useUser();

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const BadgerOrg = useMemo(() => { return getBadgerOrganizationAbi() }, [])

    const isReady = BadgerOrg && fees && address;

    const { functionName, args } = getManageHolderArgs({ data: {...obj, organization: BadgerOrg }});

    const overrides = { gasPrice: fees?.gasPrice };

    const { config, isSuccess: isPrepared } = usePrepareContractWrite({
        enabled: isReady && functionName,
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

    console.log('config', config, isPrepared)

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