import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { usePrepareContractWrite, useContractWrite } from "wagmi"

import { getBadgerOrganizationAbi, useFees, useUser } from "@hooks";

import { addressValidator } from "@utils";

const getMintArgs = ({ mints, tokenId }) => {
    // Determine if we need to mintBatch
    const functionName = mints.length > 1 ? "mintBatch" : "mint";

    // Build cleaned amounts and addresses
    const mintAmounts = mints.map(mint => parseInt(mint.pendingAmount || 1) - parseInt(mint.amount || 0));
    const { cleanedAddresses: mintAddresses, invalid } = addressValidator(mints.map(mint => mint.ethereum_address));

    // Make sure everything is valid for the transaction.
    if (invalid.length !== 0 || mintAddresses.length === 0 || mintAmounts.length !== mintAddresses.length) {
        // console.error("Invalid mint args", invalid, mintAmounts)
        return { functionName: "", args: [] };
    }

    // Build the args
    const args = functionName === "mint" ? 
        [mintAddresses[0], tokenId, mintAmounts[0], "0x"] :
        [mintAddresses, tokenId, mintAmounts, "0x"]

    return { functionName, args };
}

const getRevokeArgs = ({ revokes, tokenId }) => {
    // Determine if we need to revokeBatch
    const functionName = revokes.length > 1 ? "revokeBatch" : "revoke";
    
    // Build cleaned amounts and addresses
    const revokeAmounts = revokes.map(mint => Math.abs(parseInt(mint.amount) - parseInt(mint.pendingAmount || mint.amount)));
    const { cleanedAddresses: revokeAddresses, invalid } = addressValidator(revokes.map(revoke => revoke.ethereum_address));

    // Make sure everything is valid for the transaction.
    if (invalid.length !== 0 || revokeAddresses.length === 0 || revokeAmounts.length !== revokeAddresses.length) {
        // console.error("Invalid revoke args", invalid, revokeAmounts)
        return { functionName: "", args: [] };
    }

    const args = functionName === "revoke" ?
        [revokeAddresses[0], tokenId, revokeAmounts[0]] :
        [revokeAddresses, tokenId, revokeAmounts];

    return { functionName, args };
}

const getManageHolderArgs = ({ revokes, mints, tokenId, organization }) => {
    // if multi call is necessary
    if (mints.length > 0 && revokes.length > 0) {
        // Build mint and revoke args
        const { functionName: mintFunction, args: mintArgs } = getMintArgs({ mints: mints, tokenId: tokenId });
        const { functionName: revokeFunction, args: revokeArgs} = getRevokeArgs({ revokes: revokes, tokenId: tokenId });
        
        // If either of the functions are invalid, return empty args
        if (!mintFunction || !revokeFunction)
            return { functionName: "", args: [] };

        // Encode the mint and revoke args
        const args = [[
            organization.abi.encodeFunctionData(mintFunction, mintArgs),
            organization.abi.encodeFunctionData(revokeFunction, revokeArgs)
        ]]

        return { functionName: "multicall", args };
    }
    else if (mints.length > 0)
        return getMintArgs({ mints: mints, tokenId: tokenId });
    else if (revokes.length > 0)
        return getRevokeArgs({ revokes: revokes, tokenId: tokenId });

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

    const { functionName, args } = getManageHolderArgs({ 
        organization: BadgerOrg,
        mints: obj.mints,
        revokes: obj.revokes,
        tokenId: obj.tokenId
     });

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

export {
    useManageHolders
}