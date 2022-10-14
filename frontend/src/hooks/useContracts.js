import { useMemo } from "react";
import { usePrepareContractWrite, useContractWrite } from 'wagmi';
import { ethers } from "ethers";

import { IPFS_GATEWAY_URL } from "@static/constants/links";
const PRIMARY_IMPLEMENTATION = process.env.REACT_APP_BADGER_IMPLEMENTATION;
const PRIMARY_PROD_CHAIN = process.env.REACT_APP_PRODUCTION_CHAIN;

// Putting the parse into a try catch block to account for missing env var breaking the app.
export function getBadgerAddress(chainName) {
    try {
        const BADGER_ADDRESSES = JSON.parse(process.env.REACT_APP_BADGER_ADDRESSES);
        const address = BADGER_ADDRESSES[chainName] ? BADGER_ADDRESSES[chainName] : BADGER_ADDRESSES[PRIMARY_PROD_CHAIN];
        return address;
    }
    catch {
        console.log(`Badger contract address not found in .env.`)
        return null;
    }
}

// Gets the ABI for sash contracts.
export function getBadgerOrganizationAbi() {
    try {
        const abi = require('@abis/BadgerOrganization.json');
        return {abi: new ethers.utils.Interface(abi)}
    }
    catch (err) {
        console.error('Error importing BadgerOrganization:', err);
        return {error: err}
    }
}

// Gets the abi and chain specific address for the Badger contract.
export function getBadgerAbi(chainName) {
    try {
        const abi = require('@abis/Badger.json');
        const address = getBadgerAddress(chainName);
        return {
            abi: new ethers.utils.Interface(abi),
            address: address
        }
    }
    catch (err) {
        console.error('Error importing Badger:', err);
        return {error: err}
    }
}

// Creates a new sash contract for an organization.
export const useBadgerFactory = (orgObj, address, chainName) => {
    const Badger = useMemo(() => getBadgerAbi(chainName), [chainName]);

    const args = [
        PRIMARY_IMPLEMENTATION,
        address,
        IPFS_GATEWAY_URL + orgObj.image_hash,
        IPFS_GATEWAY_URL + orgObj.contract_uri_hash,
        orgObj.name,
        orgObj.symbol,
    ]
    
    let error;
    const { config, isSuccess } = usePrepareContractWrite({
        addressOrName: Badger.address,
        contractInterface: Badger.abi,
        functionName: "createOrganization",
        args: args,
        enabled: Boolean(orgObj?.contract_uri_hash),
        onError(e) {
            error = e
        }
    })

    const { writeAsync } = useContractWrite(config);

    return { write: writeAsync, isSuccess, error };
}

// Creates a badge from a cloned sash contract.
export const useCreateBadge = (badge) => {
    const BadgerOrganization = useMemo(() => getBadgerOrganizationAbi(), []);

    // This should also clean/check the addresses as well.
    badge?.delegates?.forEach((delegate, index) => {
        if (delegate === "") {
            badge.delegates.pop(index)
        }
    })

    const args = [
        badge.token_id,
        badge.claimable,
        badge.account_bound,
        badge.signer || "",
        badge.token_uri,
        badge.payment_token || [ethers.constants.HashZero, 0],
        badge.delegates || []
    ]

    let error;
    const { config, isSuccess } = usePrepareContractWrite({
        addressOrName: badge.ethereum_address,
        contractInterface: BadgerOrganization.abi,
        functionName: "setBadge",
        args: args,
        enabled: Boolean(badge.token_uri),
        onError(e) {
            error = e
        }
    })

    const { writeAsync } = useContractWrite(config);

    return { write: writeAsync, isSuccess, error };
}

/* 
    Determines which function to call based on if it is a revoke or a mint,
    if there are multiple badge ids, and if there are multiple holders.
*/
export const useManageBadgeOwnership = (isTxReady, orgAddress, ids, holders, action, amounts) => {
    const BadgerOrganization = useMemo(() => getBadgerOrganizationAbi(), []);
    
    // Might look a little funky but cleaner than a switch IMO.
    // If revoke is true, then we check if there is just one holder for a single revoke.
    // If ids is a single id, then we call the revoke function with multiple holders.
    // If ids is an array, then we call revoke with multiple different badges.
    // If revoke is false, same checks but for minting instead of revoke
    const revoke = action === "Revoke" ? true : false
    const method = revoke ? 
        holders.length === 1 ? "revoke" : 
        typeof(ids) === "number" ? "revokeBatch" : "revokeFullBatch"
        :
        holders.length === 1 ? "leaderMint" :
        typeof(ids) === "number" ? "leaderMintBatch" : "leaderMintFullBatch"

    // This should also clean/check the addresses as well.
    holders.forEach((holder, index) => {
        if (holder === "") {
            holders.pop(index)
        }
    })

    // Amounts will need to be changed to be an array of arrays for each badge.
    // For now it's standard for just one.
    amounts = Array(holders.length).fill(amounts)

    if (holders.length === 1) 
        holders = holders[0]

    const args = [
        holders,
        ids,
        amounts,
    ]

    // Contracts currently have bytes data if it's a mint only, not revoke.
    if (!revoke) 
        args.push("0x")

    let error;
    const { config, isSuccess } = usePrepareContractWrite({
        addressOrName: orgAddress,
        contractInterface: BadgerOrganization.abi,
        functionName: method,
        args: args,
        enabled: isTxReady,
        onError(e) {
            error = e
        }
    })

    const { writeAsync } = useContractWrite(config);

    return { write: writeAsync, isSuccess, error };
}

/*
    Changes delegates of badge(s) with id(s) from orgAddress. 
    If revoke is true then delegates are removed.
*/
export const useSetDelegates = (isTxReady, orgAddress, ids, delegates, action) => {
    const BadgerOrganization = useMemo(() => getBadgerOrganizationAbi(), []);

    const revoke = action === "Remove Delegate" ? true : false
    const isDelegateArray = Array(delegates.length).fill(!revoke);
    const method = typeof(ids) === "number" ?  "setDelegates" : "setDelegatesBatch";

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

    let error;
    const { config, isSuccess } = usePrepareContractWrite({
        addressOrName: orgAddress,
        contractInterface: BadgerOrganization.abi,
        functionName: method,
        args: args,
        enabled: isTxReady,
        onError(e) {
            error = e
        }
    })

    const { writeAsync } = useContractWrite(config);

    return { write: writeAsync, isSuccess, error };
}