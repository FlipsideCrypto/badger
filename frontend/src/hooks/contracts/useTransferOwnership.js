import { useMemo, useState } from "react";

import { usePrepareContractWrite, useContractWrite } from "wagmi"

import {
    getBadgerOrganizationAbi,
    useFees,
    useUser
} from "@hooks";

// Transfer the ownership of an organization to a new address.
const useTransferOwnership = (isTxReady, orgAddress, newOwner) => {
    const BadgerOrganization = useMemo(() => getBadgerOrganizationAbi(), []);
    const [error, setError] = useState();

    const args = [
        newOwner,
    ]

    const fees = useFees();
    const { config, isSuccess } = usePrepareContractWrite({
        address: orgAddress,
        abi: BadgerOrganization.abi,
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
        address: orgAddress,
        abi: BadgerOrganization.abi,
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

export { useTransferOwnership }