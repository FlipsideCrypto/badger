import { useMemo } from "react";
import { usePrepareContractWrite, useContractWrite } from 'wagmi';

const BadgerAddresses = JSON.parse(process.env.REACT_APP_BADGER_HOUSE_ADDRESSES)

// Gets the ABI for sash contracts.
export function getBadgerOrganizationAbi() {
    try {
        const abi = require('@abis/BadgerOrganization.json');
        return {abi: abi}
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
        const address = BadgerAddresses[chainName]
        return {
            abi: abi,
            address: address
        }
    }
    catch (err) {
        console.error('Error importing Badger:', err);
        return {error: err}
    }
}

// Creates a new sash contract for an organization.
export const useBadgerPress = (chainName) => {
    const Badger = useMemo(() => getBadgerAbi(chainName), [chainName]);
    let response = {status: 'unprepared', message: 'Transaction not prepared.'};

    console.log('badger address', Badger.address);

    const { config } = usePrepareContractWrite({
        addressOrName: Badger.address,
        contractInterface: Badger.abi,
        functionName: "createOrganization",
        args: [""],
        onSettled() {
            response = {status: 'prepared', message: 'Transaction prepared.'};
        },
        onSuccess(data) {
            response = {status: 'success', message: data};
        },
        onError (err) {
            response = {status: 'error', message: err};
        }
    })

    const { writeAsync } = useContractWrite(config);

    return { write: writeAsync, response };
}

// Creates a badge from a cloned sash contract.
export const useCreateBadge = (badge) => {
    const BadgerOrganization = useMemo(() => getBadgerOrganizationAbi(), []);
    let response = {status: 'unprepared', message: 'Transaction not prepared.'};

    let args = [
        badge.contract_address,
        badge.token_id,
        badge.account_bound,
        badge.signer || "",
        badge.token_uri,
        badge.payment_token || [0, "", 0, 0],
        badge.delegates || []
    ]

    console.log('args', args)

    const { config } = usePrepareContractWrite({
        addressOrName: badge.contract_address,
        contractInterface: BadgerOrganization.abi,
        functionName: "setBadge",
        args: args,
        enabled: Boolean(badge.token_uri),
        onSettled() {
            response = {status: 'prepared', message: 'Transaction prepared.'};
            console.log('response', response)
        },
        onSuccess(data) {
            response = {status: 'success', message: data};
            console.log('response', response)
        },
        onError (err) {
            response = {status: 'error', message: err};
            console.log('response', response)
        }
    })

    const { writeAsync } = useContractWrite(config);

    return { write: writeAsync, response };
}

// Creates a badge from a cloned sash contract.
// The recklessly unprepared version of wagmi contract interaction
// is probably not the best UX, however, we only receive the uri after the final
// json pin request and managing this on the front end is more work and complexity than it's worth IMO.
export const useCreateBadgeUnprepared = (badge) => {
    const BadgerOrganization = useMemo(() => getBadgerOrganizationAbi(), []);
    let response;

    const { sendTransaction } = useContractWrite({
        mode: 'recklesslyUnprepared',
        addressOrName: badge.contract_address,
        contractInterface: BadgerOrganization.abi,
        functionName: "setBadge",
        args: [
            badge.token_id,
            badge.account_bound,
            badge.signer || "",
            badge.token_uri,
            badge.payment_token || [0, "", 0, 0],
            badge.delegates || []
        ],
        enabled: Boolean(badge.token_uri),
        onSettled() {
            response = {status: 'prepared', message: 'Transaction prepared.'};
        },
        onSuccess(data) {
            response = {status: 'success', message: data};
        },
        onError (err) {
            response = {status: 'error', message: err};;
        }
    })

    return { write: sendTransaction, response };
}

/* 
    Determines which function to call based on if it is a revoke or a mint,
    if there are multiple badge ids, and if there are multiple holders.
*/
export const useManageBadgeOwnership = (sashAddress, holders, ids, amounts, revoke) => {
    const BadgerOrganization = useMemo(() => getBadgerOrganizationAbi(), []);
    let response = {status: 'unprepared', message: 'Transaction not prepared.'};

    // Might look a little funky but cleaner than a switch IMO.
    // If revoke is true, then we check if there is just one holder for a single revoke.
    // If ids is a single id, then we call the revoke function with multiple holders.
    // If ids is an array, then we call revoke with multiple different badges.
    // If revoke is false, same checks but for minting instead of revoke
    const method = revoke ? 
        holders.length === 1 ? "revoke" : 
            ids.length === 1 ? "revokeBatch" : "revokeFullBatch" 
        :
        holders.length === 1 ? "leaderMint" :
            ids.length === 1 ? "leaderMintBatch" : "leaderMintFullBatch"
    

    const { config } = usePrepareContractWrite({
        addressOrName: sashAddress,
        contractInterface: BadgerOrganization.abi,
        functionName: method,
        args: [
            holders,
            ids,
            amounts,
            ""
        ],
        onSettled() {
            response = {status: 'prepared', message: 'Transaction prepared.'};
        },
        onSuccess(data) {
            response = {status: 'success', message: data};
        },
        onError (err) {
            response = {status: 'error', message: err};;
        }
    })

    const { writeAsync } = useContractWrite(config);

    return { write: writeAsync, response };
}

/*
    Changes delegates of badge(s) with id(s) from sashAddress. 
    If revoke is true then delegate/leaders are removed.
*/
export const useSetDelegates = (sashAddress, ids, leaders, revoke) => {
    const BadgerOrganization = useMemo(() => getBadgerOrganizationAbi(), []);
    let response = {status: 'unprepared', message: 'Transaction not prepared.'};

    const isDelegateArray = Array(leaders.length).fill(!revoke);
    const method = ids.length > 1 ? "setDelegatesBatch" : "setDelegates";
    

    const { config } = usePrepareContractWrite({
        addressOrName: sashAddress,
        contractInterface: BadgerOrganization.abi,
        functionName: method,
        args: [
            ids,
            leaders,
            isDelegateArray,
        ],
        onSettled() {
            response = {status: 'prepared', message: 'Transaction prepared.'};
        },
        onSuccess(data) {
            response = {status: 'success', message: data};
        },
        onError (err) {
            response = {status: 'error', message: err};;
        }
    })

    const { writeAsync } = useContractWrite(config);

    return { write: writeAsync, response };
}