import { useEffect, useMemo, useState } from "react";
import { usePrepareContractWrite, useContractWrite, useFeeData } from 'wagmi';
import { ethers } from "ethers";

import { IPFS_GATEWAY_URL } from "@static/constants/links";
const PRIMARY_IMPLEMENTATION = process.env.REACT_APP_BADGER_IMPLEMENTATION;
const PRIMARY_PROD_CHAIN = process.env.REACT_APP_PRODUCTION_CHAIN;

// TODO: Set getBadgerAddress to support versions

// Putting the parse into a try catch block to account for missing env var breaking the app.
export function getBadgerAddress(chainName) {
    try {
        const BADGER_ADDRESSES = JSON.parse(process.env.REACT_APP_BADGER_ADDRESSES);
        const address = BADGER_ADDRESSES[chainName] ? BADGER_ADDRESSES[chainName] : BADGER_ADDRESSES[PRIMARY_PROD_CHAIN];
        return address;
    }
    catch {
        console.error(`Badger contract address not found in .env.`)
        return null;
    }
}

// Gets the abi and chain specific address for the Badger contract.
export function getBadgerAbi(chainName, version) {
    if (version === undefined) return { abi: null, address: null };

    try {
        const abi = require(`@abis/${version}_Badger.json`);
        const address = getBadgerAddress(chainName, version);
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

// Gets the ABI for sash contracts.
export function getBadgerOrganizationAbi(version) {
    if (version === undefined) return { abi: null, address: null };

    try {
        const abi = require(`@abis/${version}_BadgerOrganization.json`);
        return {abi: new ethers.utils.Interface(abi)}
    }
    catch (err) {
        console.error('Error importing BadgerOrganization:', err);
        return {error: err}
    }
}

// Gets the fees if a transaction is ready and multiplies them by a multiplier
// to help the transaction underpriced errors commonly being had on polygon.
export function useFees() {
    const [fees, setFees] = useState(null);
    const { data } = useFeeData({
        watch: false,
        cacheTime: 5000,
    });

    useEffect(() => {
        if (data) {
            const multiplier = 1.1;
            const big_mul = ethers.BigNumber.from(Math.floor(multiplier * 100));
            let suggestedGas = {};
            suggestedGas.gasPrice = data.gasPrice.mul(big_mul).div(100);
            setFees(suggestedGas);
        }
    }, [data, setFees]);

    return fees;
}

// Creates a new sash contract for an organization.
export const useBadgerFactory = (isTxReady, orgObj, address, chainName) => {
    const Badger = orgObj.version && getBadgerAbi(chainName, orgObj?.version)

    const args = [
        PRIMARY_IMPLEMENTATION,
        address,
        IPFS_GATEWAY_URL + imageHash,
        IPFS_GATEWAY_URL + contractHash,
        orgObj.name,
        orgObj.symbol,
    ]
    
    let error;
    const fees = useFees();
    const { config, isSuccess } = usePrepareContractWrite({
        addressOrName: Badger.address,
        contractInterface: Badger.abi,
        functionName: "createOrganization",
        args: args,
        enabled: Boolean(fees && isTxReady),
        overrides: {
            gasPrice: fees?.gasPrice,
        },
        onError(e) {
            console.error('Error creating Org: ', e);
            error = e
        }
    })

    const { writeAsync } = useContractWrite(config);

    return { write: writeAsync, isSuccess, error };
}

// Creates a badge from a cloned sash contract.
export const useCreateBadge = (isTxReady, badge, version) => {
    const BadgerOrganization = useMemo(() => getBadgerOrganizationAbi(version), [version]);

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
        badge.signer || badge.ethereum_address, // Cannot have an empty string so we use the org as signer
        tokenUri,
        badge.payment_token || [ethers.constants.HashZero, 0],
        badge.delegates || [],
    ]
    
    let error;
    const fees = useFees();
    const { config, isSuccess } = usePrepareContractWrite({
        addressOrName: badge.ethereum_address,
        contractInterface: BadgerOrganization.abi,
        functionName: "setBadge",
        args: args,
        enabled: Boolean(fees && isTxReady),
        overrides: {
            gasPrice: fees?.gasPrice,
        },
        onError(e) {
            console.error('Error creating Badge: ', e);
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
export const useManageBadgeOwnership = (isTxReady, orgAddress, ids, users, action, amounts, version) => {
    const BadgerOrganization = useMemo(() => getBadgerOrganizationAbi(version), [version]);
    
    // Might look a little funky but cleaner than a switch IMO.
    // If revoke is true, then we check if there is just one holder for a single revoke.
    // If ids is a single id, then we call the revoke function with multiple holders.
    // If ids is an array, then we call revoke with multiple different badges.
    // If revoke is false, same checks but for minting instead of revoke
    const revoke = action === "Revoke" ? true : false
    const method = revoke ? 
        users.length === 1 ? "revoke" : 
        typeof(ids) === "number" ? "revokeBatch" : "revokeFullBatch"
        :
        users.length === 1 ? "leaderMint" :
        typeof(ids) === "number" ? "leaderMintBatch" : "leaderMintFullBatch"

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

    let error;
    const fees = useFees();
    const { config, isSuccess } = usePrepareContractWrite({
        addressOrName: orgAddress,
        contractInterface: BadgerOrganization.abi,
        functionName: method,
        args: args,
        enabled: Boolean(fees && isTxReady),
        overrides: {
            gasPrice: fees?.gasPrice,
        },
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
export const useSetDelegates = (isTxReady, orgAddress, ids, delegates, action, version) => {
    const BadgerOrganization = useMemo(() => getBadgerOrganizationAbi(version), [version]);

    const revoke = action === "Remove Manager" ? true : false
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
    const fees = useFees();
    const { config, isSuccess } = usePrepareContractWrite({
        addressOrName: orgAddress,
        contractInterface: BadgerOrganization.abi,
        functionName: method,
        args: args,
        enabled: Boolean(fees && isTxReady),
        overrides: {
            gasPrice: fees?.gasPrice,
        },
        onError(e) {
            error = e
        }
    })

    const { writeAsync } = useContractWrite(config);

    return { write: writeAsync, isSuccess, error };
}