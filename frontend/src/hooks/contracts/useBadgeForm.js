import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { ethers } from "ethers";

import { getBadgerOrganizationAbi, getTransferBoundAddress, useFees, useUser, useWindowMessage } from "@hooks";

const getBadgeFormTxArgs = ({ organization, uriHash, tokenId, accountBound, address, slot }) => {
    if (!uriHash || !address || !slot || tokenId === null) 
        return { args: [], functionName: "" };

    // For now, we're hard coding the setHook and configHook if the badge is account bound. A more modular piece is being built out for hooks and managers.
    const functionName = accountBound ? "multicall" : "setBadgeURI";
    let args = [];

    if (functionName === "setBadgeURI" && uriHash)
         args = [tokenId, uriHash];

    // If we are initializing as account bound, we need to set the badge URI, set the manager, and config it
    if (functionName === "multicall") {
        const config = ethers.utils.defaultAbiCoder.encode(["uint256","bool"], [tokenId, true])

        const setBadgeURI = organization.abi.encodeFunctionData(
            "setBadgeURI", [tokenId, uriHash]
        );
        const setHook = organization.abi.encodeFunctionData(
            "setHooks", [slot, [address], [true]]
        );
        const configHook = organization.abi.encodeFunctionData(
            "configHook", [slot, address, config]
        );

        args = [[setBadgeURI, setHook, configHook]];
    }


    return { functionName, args };
}

const useBadgeForm = ({ obj }) => {
    const fees = useFees();

    const { orgAddress } = useParams();

    const { chain, address } = useUser();

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const BadgerOrg = useMemo(() => { return getBadgerOrganizationAbi() }, []);

    const transferBoundAddress = getTransferBoundAddress(chain.id)

    const { functionName, args } = getBadgeFormTxArgs({ 
        organization: BadgerOrg,
        uriHash: obj.uriHash,
        tokenId: obj.tokenId,
        accountBound: obj.accountBound,
        address: transferBoundAddress,
        slot: "0x844bb459abe62f824043e42caa262ad6859731fc48abd8966db11d779c0fe669" // TODO: Don't hardcode this (BEFORE_TRANSFER bytes32 slot)
    });

    const isReady = BadgerOrg && fees && address && !!args;

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

    const { window } = useWindowMessage();

    const openBadgeFormTransaction = async ({
        onError = (e) => { console.error(e) },
        onLoading = () => { },
        onSuccess = ({ config, chain, tx, receipt }) => { }
    }) => {
        try {
            setIsLoading(true);
            setIsSuccess(false);
            
            const tx = await writeAsync();
            
            onLoading();
            window.onLoading({ 
                className: "transaction",
                message: {
                    title: "Mining transaction. This may take a few seconds.",
                    body: "Badger hasn't detected your Badge changes yet. Please give us a few minutes to check the chain.",
                    txHash: tx.hash
                }
            })
            
            const receipt = await tx.wait();

            if (receipt.status === 0) throw new Error("Error submitting transaction");

            receipt.events = receipt.logs.filter((log) => log.address === orgAddress).map((log) => BadgerOrg.abi.parseLog(log))

            setIsLoading(false)
            setIsSuccess(true)

            onSuccess({ config, chain, tx, receipt })
            window.onSuccess({ status: '' });
        } catch (e) {
            onError(e);
            window.onError();
        }
    }

    return { openBadgeFormTransaction, isPrepared, isLoading, isSuccess }
}

export {
    useBadgeForm
}