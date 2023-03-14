import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { usePrepareContractWrite, useContractWrite } from "wagmi"

import { getBadgerOrganizationAbi, useFees, useUser } from "@hooks";

const getBadgeFormTxArgs = ({ data, functionName }) => {
    if (functionName === "setBadgeURI" && data.uriHash)
        return [data.token_id, data.uriHash];
}

const useBadgeForm = ({ obj, functionName }) => {
    const fees = useFees();

    const { orgAddress } = useParams();

    const { authenticatedAddress, chain } = useUser();

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const BadgerOrg = useMemo(() => { return getBadgerOrganizationAbi() }, [])

    const args = getBadgeFormTxArgs({
        data: obj,
        functionName: functionName
    });

    const isReady = BadgerOrg && fees && authenticatedAddress && !!args;

    const overrides = { gasPrice: fees?.gasPrice };
    
    const { config, isSuccess: isPrepared } = usePrepareContractWrite({
        enabled: isReady,
        addressOrName: orgAddress,
        contractInterface: BadgerOrg.abi,
        functionName,
        chainId: chain.id,
        args,
        overrides,
        onError: (e) => {
            const err = e?.error?.message || e?.data?.message || e
            throw new Error(err);
        }
    });

    const { writeAsync } = useContractWrite(config);

    const openBadgeFormTransaction = async ({
        onError = (e) => { console.error(e) },
        onLoading = () => { },
        onSuccess = ({ config, chain, tx, receipt }) => { }
    }) => {
        try {
            setIsLoading(true);
            setIsSuccess(false);
            onLoading();

            const tx = await writeAsync();

            const receipt = await tx.wait();

            if (receipt.status === 0) throw new Error("Error submitting transaction");

            receipt.events = receipt.logs.filter((log) => log.address === orgAddress).map((log) => BadgerOrg.abi.parseLog(log))
    
            setIsLoading(false)
            setIsSuccess(true)

            onSuccess({ config, chain, tx, receipt })
        } catch (e) {
            onError(e);
        }
    }

    return { openBadgeFormTransaction, isPrepared, isLoading, isSuccess }
}

const useBadge = ({ obj, image, functionName }) => {

}

export { 
    useBadgeForm, 
    useBadge
}