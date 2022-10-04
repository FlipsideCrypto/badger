import { usePrepareContractWrite, useContractWrite } from 'wagmi';

const badgerHouseAddresses = JSON.parse(process.env.REACT_APP_BADGER_HOUSE_ADDRESSES)

// Gets the ABI for sash contracts.
export const useBadgerOrganizationAbi = () => {
    console.log('useBadgerOrganizationAbi');
    try {
        const abi = require('@abis/BadgerOrganization.json');
        return {abi: abi}
    }
    catch (err) {
        console.error('Error importing BadgerOrganization:', err);
        return {error: err}
    }
}

// Gets the abi and chain specific address for the BadgerHouse contract.
export const useBadgerHouseAbi = (chainName) => {
    try {
        const abi = require('@abis/BadgerHouse.json');
        const address = badgerHouseAddresses[chainName]
        return {
            abi: abi,
            address: address
        }
    }
    catch (err) {
        console.error('Error importing BadgerHouse:', err);
        return {error: err}
    }
}

// Creates a new sash contract for an organization.
export const useBadgerHousePress = (chainName) => {
    const badgerHouse = useBadgerHouseAbi(chainName);
    let response = {status: 'unprepared', message: 'Transaction not prepared.'};

    const { config } = usePrepareContractWrite({
        addressOrName: badgerHouse.address,
        contractInterface: badgerHouse.abi,
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
export const useCreateBadge = (sashAddress, id, accountBound, signer, uri, paymentToken, delegates) => {
    const BadgerOrganization = useBadgerOrganizationAbi();
    let response = {status: 'unprepared', message: 'Transaction not prepared.'};

    const { config } = usePrepareContractWrite({
        addressOrName: sashAddress,
        contractInterface: BadgerOrganization.abi,
        functionName: "setBadge",
        args: [
            id,
            accountBound,
            signer || "",
            uri,
            paymentToken || [],
            delegates || []
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
    Determines which function to call based on if it is a revoke or a mint,
    if there are multiple badge ids, and if there are multiple holders.
*/
export const useManageBadgeOwnership = (sashAddress, holders, ids, amounts, revoke) => {
    const BadgerOrganization = useBadgerOrganizationAbi();
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
export const usesetDelegates = (sashAddress, ids, leaders, revoke) => {
    const BadgerOrganization = useBadgerOrganizationAbi();
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