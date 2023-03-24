import { useMemo, useState } from "react";

import { usePrepareContractWrite, useContractWrite } from "wagmi"

import {
    getBadgerOrganizationAbi,
    getBadgerAbi,
    useFees,
    useUser,
    useWindowMessage
} from "@hooks";

import { IPFS_GATEWAY_URL } from "@static";

const getOrgFormTxArgs = ({ functionName, address, name, symbol, imageHash, contractHash }) => {
    if (functionName === "setOrganizationURI") {
        return [IPFS_GATEWAY_URL + contractHash]
    } else if (functionName === "createOrganization") {
        const organizationStruct = {
            deployer: address,
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

    const { chain, address } = useUser();

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const functionName = obj.ethereum_address ? "setOrganizationURI" : "createOrganization";

    const Badger = useMemo(() => {
        if (obj.ethereum_address) return getBadgerOrganizationAbi();
        return getBadgerAbi(chain.id);
    }, [functionName, chain.id]);

    const isReady = Badger && fees && !!address;

    const args = getOrgFormTxArgs({
        functionName,
        address,
        name: obj.name,
        symbol: obj.symbol,
        imageHash: obj.imageHash,
        contractHash: obj.contractHash
    });

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

    const { window } = useWindowMessage();

    const openOrgFormTx = async ({
        onError = (e) => { console.error(e) },
        onLoading = () => { },
        onSuccess = ({ config, chain, tx, receipt }) => { }
    }) => {
        try {
            setIsLoading(true);
            setIsSuccess(false);
            window.onLoading({
                className: "transaction",
                message: {
                    title: "Mining transaction. This may take a few seconds.",
                    body: "Badger hasn't detected your Organization changes yet. Please give us a few minutes to check the chain.",
                    txHash: "0x"
                }
            })
            
            const tx = await writeAsync()
            
            onLoading();

            const receipt = await tx.wait()

            receipt.events = receipt.logs.filter((log) => log.address === Badger.address).map((log) => Badger.abi.parseLog(log))

            setIsLoading(false);
            setIsSuccess(true);

            onSuccess({ config, chain, tx, receipt })
            window.onSuccess();
        } catch (e) {
            onError(e);
            window.onError();
        }
    }

    return { openOrgFormTx, isPrepared, isLoading, isSuccess };
}

export {
    useOrgForm
}