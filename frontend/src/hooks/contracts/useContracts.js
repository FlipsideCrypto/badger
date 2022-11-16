import { useMemo, useState } from "react";
import { usePrepareContractWrite, useContractWrite } from "wagmi"
import { ethers } from "ethers";

import { 
    getPrimaryImplementation,
    getBadgerOrganizationAbi,
    getBadgerAbi,
} from "./contractVersions";
import useFees from "@hooks/useFees";

import { IPFS_GATEWAY_URL } from "@static/constants/links";

// Creates a new sash contract for an organization.
export const useCreateOrg = (isTxReady, orgObj, imageHash, contractHash, address, chainName) => {
    const Badger = useMemo(() => getBadgerAbi(chainName), [chainName]);
    const [ error, setError ] = useState();

    const args = [
        getPrimaryImplementation(),
        address,
        IPFS_GATEWAY_URL + imageHash,
        IPFS_GATEWAY_URL + contractHash,
        orgObj.name,
        orgObj.symbol,
    ]

    console.log('useCotnract::', 'img', imageHash, 'uri', contractHash)
    
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
            const err = e?.error?.message || e?.data?.message || e
            setError(err);
            console.error('Error creating Org: ', err);
        }
    })

    const { writeAsync } = useContractWrite(config);

    return { write: writeAsync, isSuccess, error };
}

// Edit the contract URI of an organization and update the image, description, and name.
export const useEditOrg = (isTxReady, contractAddress, contractUriHash) => {
    const BadgerOrganization = useMemo(() => getBadgerOrganizationAbi(), []);
    const [ error, setError ] = useState();

    const args = [
        IPFS_GATEWAY_URL + contractUriHash
    ]
    
    const fees = useFees();
    const { config, isSuccess } = usePrepareContractWrite({
        addressOrName: contractAddress,
        contractInterface: BadgerOrganization.abi,
        functionName: "setOrganizationURI",
        args: args,
        enabled: Boolean(fees && isTxReady),
        overrides: {
            gasPrice: fees?.gasPrice,
        },
        onError(e) {
            const err = e?.error?.message || e?.data?.message || e
            setError(err);
            console.error('Error updating Org: ', err);
        }
    })

    const { writeAsync } = useContractWrite(config);

    return { write: writeAsync, isSuccess, error };
}

// Creates a badge from a cloned sash contract.
export const useSetBadge = (isTxReady, contractAddress, tokenUri, badge) => {
    const BadgerOrganization = useMemo(() => getBadgerOrganizationAbi(), []);
    const [ error, setError ] = useState();

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
        badge.signer || contractAddress, // Cannot have an empty string so we use the org as signer
        tokenUri || "0x",
        badge.payment_token || [ethers.constants.HashZero, 0],
        badge.delegates || [],
    ]
    
    const fees = useFees();
    const { config, isSuccess } = usePrepareContractWrite({
        addressOrName: contractAddress,
        contractInterface: BadgerOrganization.abi,
        functionName: "setBadge",
        args: args,
        enabled: Boolean(fees && isTxReady && tokenUri !== "0x"),
        overrides: {
            gasPrice: fees?.gasPrice,
        },
        onError(e) {
            const err = e?.error?.message || e?.data?.message || e
            setError(err);
            console.error('Error creating Badge: ', err);
        }
    })

    const { writeAsync } = useContractWrite(config);
    return { write: writeAsync, isSuccess, error };
}

// Determines which function to call based on if it is a revoke or a mint,
// if there are multiple badge ids, and if there are multiple holders.
export const useManageBadgeOwnership = (isTxReady, orgAddress, ids, users, action, amounts) => {
    const BadgerOrganization = useMemo(() => getBadgerOrganizationAbi(), []);
    const [ error, setError ] = useState();
    
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
            const err = e?.error?.message || e?.data?.message || e
            setError(err);
            console.error('Error managing badge ownership: ', err);
        }
    })

    const { writeAsync } = useContractWrite(config);

    return { write: writeAsync, isSuccess, error };
}

// Changes delegates of badge(s) with id(s) from orgAddress. 
// If revoke is true then delegates are removed.
export const useSetDelegates = (isTxReady, orgAddress, ids, delegates, action) => {
    const BadgerOrganization = useMemo(() => getBadgerOrganizationAbi(), []);
    const [ error, setError ] = useState();

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
            const err = e?.error?.message || e?.data?.message || e
            setError(err);
            console.error('Error setting delegates: ', err);
        }
    })

    const { writeAsync } = useContractWrite(config);

    return { write: writeAsync, isSuccess, error };
}

// Transfer the ownership of an organization to a new address.
export const useTransferOwnership = (isTxReady, orgAddress, newOwner) => {
    const BadgerOrganization = useMemo(() => getBadgerOrganizationAbi(), []);
    const [ error, setError ] = useState();

    const args = [
        newOwner,
    ]

    const fees = useFees();
    const { config, isSuccess } = usePrepareContractWrite({
        addressOrName: orgAddress,
        contractInterface: BadgerOrganization.abi,
        functionName: "transferOwnership",
        args: args,
        enabled: Boolean(fees && isTxReady),
        overrides: {
            gasPrice: fees?.gasPrice,
        },
        onError(e) {
            const err = e?.error?.message || e?.data?.message || e
            setError(err);
            console.error('Error transferring ownership: ', err);
        }
    })

    const { writeAsync } = useContractWrite(config);

    return { write: writeAsync, isSuccess, error };
}

// Transfer the ownership of a badge to a new address.
// TODO: This should be changed to support the intended functionality of withdrawing all assets from the org.
export const useRenounceOwnership = (isTxReady, orgAddress) => {
    const BadgerOrganization = useMemo(() => getBadgerOrganizationAbi(), []);
    const [ error, setError ] = useState();

    const fees = useFees();
    const { config, isSuccess } = usePrepareContractWrite({
        addressOrName: orgAddress,
        contractInterface: BadgerOrganization.abi,
        functionName: "renounceOwnership",
        args: [],
        enabled: Boolean(fees && isTxReady),
        overrides: {
            gasPrice: fees?.gasPrice,
        },
        onError(e) {
            const err = e?.error?.message || e?.data?.message || e
            setError(err);
            console.error('Error transferring ownership: ', err);
        }
    })

    const { writeAsync } = useContractWrite(config);

    return { write: writeAsync, isSuccess, error };
}