import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ethers } from "ethers";
import { usePrepareContractWrite, useContractWrite } from "wagmi"

import {
    getPrimaryImplementation,
    getBadgerOrganizationAbi,
    getBadgerAbi,
    useFees,
    useIPFS,
    useIPFSImageHash,
    useIPFSMetadataHash,
    useUser
} from "@hooks";

import { postOrgRequest } from "@utils";

import { IPFS_GATEWAY_URL } from "@static";

// TODO: Refactor the image field to be stored as a hash on the obj
// TODO: Do the same for the contract hash

// IPFS has been the major pain point of this project so let's fix that.
// on success of transaction, should pin the image through the calling of a hook

// sometimes though, we will know the hash when calling the transaction without using an image so having to pass the image in the hooks is wrong and was has been causing a lot of issues
// Basically the only thing that changes between all the code in this file is the args, the function name and whether or not it is using ipfs or not
// I see no reason we couldn't easily have a useOrg and useBadge hook that takes in the args and function name and then does the rest of the work

// The real architecture I want is useCreateOrg, useEditOrg and then inside each of those have logic for openOrgTx
// The initial hooks were written in a way that required a lot of logic to be above the component any time it was used
// This is a step in the right direction, but I want to get to a point where the hooks are the only thing that needs to be imported

const getOrgFormTxArgs = ({ functionName, authenticatedAddress, name, symbol, imageHash, contractHash }) => {
    if (functionName === "setOrganizationURI") {
        return [IPFS_GATEWAY_URL + contractHash]
    } else if (functionName === "createOrganization") {
        const organizationStruct = {
            deployer: authenticatedAddress,
            uri: IPFS_GATEWAY_URL + imageHash,
            organizationURI: IPFS_GATEWAY_URL + contractHash,
            name,
            symbol
        }

        return [organizationStruct]
    }
}

const useOrg = ({ obj, functionName }) => {
    const fees = useFees();

    const { authenticatedAddress, chain } = useUser();

    const Badger = useMemo(() => {
        if (obj.ethereum_address) return getBadgerOrganizationAbi();

        return getBadgerAbi(chain.name);
    }, [functionName, chain.name]);

    const isReady = Badger && fees && authenticatedAddress;

    const overrides = { gasPrice: fees?.gasPrice };

    // TODO: Args
    const args = []

    const { config, isSuccess: isPrepared } = usePrepareContractWrite({
        enabled: isReady,
        addressOrName: obj.ethereum_address || Badger.address,
        contractInterface: Badger.abi,
        functionName,
        args,
        overrides,
        onError: (e) => {
            const err = e?.error?.message || e?.data?.message || e

            throw new Error(err);
        }
    })

    const { writeAsync } = useContractWrite(config);

    // We are separating the openOrg logic because every function called through this needs to have a post request following
    const openOrgTx = async ({
        onError = (e) => { console.error(e) },
        onLoading = () => { },
        onSuccess = ({ tx, org, response }) => { }
    }) => {
        try {
            onLoading()

            const tx = await writeAsync()

            const txReceipt = await tx.wait()

            if (txReceipt.status === 0) throw new Error("Error submitting transaction.");

            const response = await postOrgRequest(obj)

            if (!response.ok) throw new Error("Error submitting Organization request.")

            onSuccess({ tx, obj, response })
        } catch (e) {
            onError(e);
        }
    }

    return { openOrgTx }
}

const useOrgForm = ({ obj, image }) => {
    const fees = useFees();

    const { hash: imageHash } = useIPFSImageHash(image)

    const metadata = {
        name: obj.name,
        description: obj.description,
        image: imageHash,
        attributes: obj.attributes
    }

    const { hash: contractHash } = useIPFSMetadataHash(metadata)

    const { pinImage, pinMetadata } = useIPFS({
        image: image,
        data: metadata
    })

    const { authenticatedAddress, chain } = useUser();

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const functionName = obj.ethereum_address ? "setOrganizationURI" : "createOrganization";

    const Badger = useMemo(() => {
        if (obj.ethereum_address) return getBadgerOrganizationAbi();

        return getBadgerAbi(chain.name);
    }, [functionName, chain.name]);

    const isReady = Badger && fees && !!authenticatedAddress;

    const args = getOrgFormTxArgs({
        functionName,
        authenticatedAddress,
        name: obj.name,
        symbol: obj.symbol,
        imageHash,
        contractHash
    });

    const overrides = { gasPrice: fees?.gasPrice };

    const { config, isSuccess: isPrepared } = usePrepareContractWrite({
        enabled: isReady,
        addressOrName: obj.ethereum_address || Badger.address,
        contractInterface: Badger.abi,
        functionName,
        args,
        overrides,
        onError: (e) => {
            const err = e?.error?.message || e?.data?.message || e

            throw new Error(err);
        }
    })

    const { writeAsync } = useContractWrite(config);

    const openOrgFormTx = async ({
        onError = (e) => { console.error(e) },
        onLoading = () => { },
        onSuccess = ({ config, tx, receipt }) => { }
    }) => {
        try {
            setIsLoading(true) && onLoading()

            const tx = await writeAsync()

            const [txReceipt, imageHash, metadataHash] = await Promise.all([
                tx.wait(),
                pinImage(image),
                pinMetadata(metadata)
            ])

            if (txReceipt.status === 0) throw new Error("Error submitting transaction.");

            setIsSuccess(true) && onSuccess({ config, tx, txReceipt })
        } catch (e) {
            console.error(e);

            onError(e);
        }
    }

    return { openOrgFormTx, isPrepared, isLoading, isSuccess };
}

/**
 * @dev Hook to trigger and handle a transaction that calls `createOrganization` on the Badger contract.
 */
const useCreateOrg = ({ enabled, name, symbol, imageHash, contractHash }) => {
    const navigate = useNavigate();

    const fees = useFees();

    const { authenticatedAddress, chain } = useUser();

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const Badger = useMemo(() => getBadgerAbi(chain.name), [chain.name]);

    const orgCreatedTopic = Badger.abi.getEventTopic("OrganizationCreated");

    const isReady = Boolean(enabled && fees && Badger);

    const args = getOrgFormTxArgs({ functionName: "createOrganization", authenticatedAddress, name, symbol, imageHash, contractHash });

    const { config, isSuccess: isPrepared } = usePrepareContractWrite({
        addressOrName: Badger.address,
        contractInterface: Badger.abi,
        functionName: "createOrganization",
        args: args,
        enabled: isReady,
        overrides: { gasPrice: fees?.gasPrice },
        onError(e) {
            const err = e?.error?.message || e?.data?.message || e

            throw new Error(err);
        }
    })

    const { writeAsync } = useContractWrite(config);

    const openCreateOrgTx = async ({
        onError = (e) => { console.error(e) },
        onLoading = () => { },
        onSuccess = ({ tx, org, response }) => { }
    }) => {
        try {
            setIsLoading(true) && onLoading();

            const tx = await writeAsync();

            const [txReceipt, imageHash, metadataHash] = await Promise.all([
                tx.wait(),
                null,
                null
                // pinImage(objImage),
                // pinMetadata(objMetadata),
            ]);

            if (txReceipt.status === 0) throw new Error("Error submitting Organization transaction.");

            const orgCreatedEvent = txReceipt.logs.find((log) => log.topics[0] === orgCreatedTopic);
            const orgEvent = Badger.abi.decodeEventLog("OrganizationCreated", orgCreatedEvent.data, orgCreatedEvent.topics);
            const contractAddress = orgEvent.organization;

            if (!contractAddress) throw new Error("Could not find event emission from Organization creation.");

            const org = {
                ...org,
                ethereum_address: contractAddress,
                contract_uri_hash: metadataHash,
                image_hash: imageHash,
                chain: chain.name,
                owner: authenticatedAddress, // don't do it like this
                is_active: true
            }

            const response = await postOrgRequest(org);

            if (!response.ok) throw new Error("Error creating Organization in database.");

            navigate(`/dashboard/organization/${response.id}/`);

            setIsSuccess(true) && onSuccess({ tx, org, response });
        } catch (e) {
            console.error(e);

            setIsSuccess(false) && onError(e);
        }
    }

    return { openCreateOrgTx, isPrepared, isLoading, isSuccess };
}

// Edit the contract URI of an organization and update the image, description, and name.
const useEditOrg = ({ enabled, contractAddress, contractUriHash }) => {
    const navigate = useNavigate();

    const fees = useFees();

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const BadgerOrganization = useMemo(() => getBadgerOrganizationAbi(), []);

    const isReady = Boolean(enabled && fees && BadgerOrganization);

    const args = [
        IPFS_GATEWAY_URL + contractUriHash
    ]

    const { config, isSuccess: isPrepared } = usePrepareContractWrite({
        addressOrName: contractAddress,
        contractInterface: BadgerOrganization.abi,
        functionName: "setOrganizationURI",
        args: args,
        enabled: isReady,
        overrides: { gasPrice: fees?.gasPrice },
        onError(e) {
            const err = e?.error?.message || e?.data?.message || e

            throw new Error(err);
        }
    })

    const { writeAsync } = useContractWrite(config);

    const openCreateOrgTx = async ({
        onError = (e) => { console.error(e) },
        onLoading = () => { },
        onSuccess = ({ tx, org, response }) => { }
    }) => {
        try {
            setIsLoading(true) && onLoading();

            const tx = await writeAsync();

            const [txReceipt, imageHash, metadataHash] = await Promise.all([
                tx.wait(),
                null,
                null
                // pinImage(objImage),  
                // pinMetadata({
                //     name: obj.name,
                //     description: obj.description,
                //     imageHash: objImage,
                // })
            ])

            if (txReceipt.status === 0) throw new Error("Error submitting Organization transaction.");

            const org = {
                ...org,
                contract_uri_hash: metadataHash,
                image_hash: imageHash,
            }

            const response = await postOrgRequest(org);

            if (!response.ok) throw new Error("Error creating Organization in database.");

            navigate(`/dashboard/organization/${response.id}/`);

            setIsSuccess(true) && onSuccess({ tx, org, response });
        } catch (e) {
            console.error(e);

            setIsSuccess(false) && onError(e);
        }
    }

    return { openCreateOrgTx, isPrepared, isLoading, isSuccess };
}

// Creates a badge from a cloned sash contract.
const useSetBadge = (isTxReady, contractAddress, tokenUri, badge) => {
    const BadgerOrganization = useMemo(() => getBadgerOrganizationAbi(), []);
    const [error, setError] = useState();

    let badgeObj = badge

    // This should also clean/check the addresses as well.
    badgeObj?.delegates?.forEach((delegate, index) => {
        if (typeof delegate === "object")
            badgeObj.delegates[index] = delegate.ethereum_address
        if (delegate === "")
            badgeObj.delegates.pop(index)
    })

    const args = [
        badgeObj.token_id,
        badgeObj.claimable,
        badgeObj.account_bound,
        badgeObj.signer || contractAddress, // Cannot have an empty string so we use the org as signer
        tokenUri || "0x",
        badgeObj.payment_token || [ethers.constants.HashZero, 0],
        badgeObj.delegates || [],
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
        addressOrName: orgAddress,
        contractInterface: BadgerOrganization.abi,
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
        addressOrName: orgAddress,
        contractInterface: BadgerOrganization.abi,
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

// Transfer the ownership of an organization to a new address.
const useTransferOwnership = (isTxReady, orgAddress, newOwner) => {
    const BadgerOrganization = useMemo(() => getBadgerOrganizationAbi(), []);
    const [error, setError] = useState();

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
const useRenounceOwnership = (isTxReady, orgAddress) => {
    const BadgerOrganization = useMemo(() => getBadgerOrganizationAbi(), []);
    const [error, setError] = useState();

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

export {
    useCreateOrg,
    useEditOrg,
    useOrgForm,
    useSetBadge,
    useManageBadgeOwnership,
    useSetDelegates,
    useTransferOwnership,
    useRenounceOwnership,
}