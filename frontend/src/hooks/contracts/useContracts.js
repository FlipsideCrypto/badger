import { useMemo, useState } from "react";

import { usePrepareContractWrite, useContractWrite } from "wagmi"

import {
    getBadgerOrganizationAbi,
    getBadgerAbi,
    useFees,
    useUser
} from "@hooks";

import { IPFS_GATEWAY_URL } from "@static";

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

const useOrgForm = ({ obj }) => {
    const fees = useFees();

    const { authenticatedAddress, chain } = useUser();

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const functionName = obj.ethereum_address ? "setOrganizationURI" : "createOrganization";

    const Badger = useMemo(() => {
        if (obj.ethereum_address) return getBadgerOrganizationAbi();

        return getBadgerAbi(chain.id);
    }, [functionName, chain.id]);

    const isReady = Badger && fees && !!authenticatedAddress;

    const args = getOrgFormTxArgs({
        functionName,
        authenticatedAddress,
        name: obj.name,
        symbol: obj.symbol,
        imageHash: obj.imageHash,
        contractHash: obj.contractHash
    });

    console.log(args)

    const overrides = { gasPrice: fees?.gasPrice };

    const { config, isSuccess: isPrepared } = usePrepareContractWrite({
        enabled: isReady,
        address: obj.ethereum_address || Badger.address,
        abi: Badger.abi,
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
        onSuccess = ({ config, chain, tx, receipt }) => { }
    }) => {
        try {
            setIsLoading(true);
            setIsSuccess(false);
            onLoading()

            const tx = await writeAsync()

            const receipt = await tx.wait()

            receipt.events = receipt.logs.filter((log) => log.address === Badger.address).map((log) => Badger.abi.parseLog(log))

            setIsLoading(false);
            setIsSuccess(true);

            onSuccess({ config, chain, tx, receipt })
        } catch (e) {
            console.error(e);

            onError(e);
        }
    }

    return { openOrgFormTx, isPrepared, isLoading, isSuccess };
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
    useOrgForm,
    useTransferOwnership,
    useRenounceOwnership
}