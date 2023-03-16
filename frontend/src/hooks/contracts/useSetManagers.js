import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { usePrepareContractWrite, useContractWrite } from "wagmi"

import { getBadgerOrganizationAbi, useFees, useUser } from "@hooks";

const getManagerArgs = ({ data }) => {
    if (data.tokenId)
        return [data.tokenId, data.addresses, data.statuses];
    else
        return [data.addresses, data.statuses];
}

const useSetManagers = ({ obj }) => {
    const fees = useFees();

    const { orgAddress } = useParams();

    const { chain, address } = useUser();

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const BadgerOrg = useMemo(() => { return getBadgerOrganizationAbi() }, [])

    const isReady = BadgerOrg && fees && address;
    const isInputValid = obj.addresses.length > 0 && obj.addresses.length === obj.statuses.length;

    const functionName = obj.tokenId ? "setManagers(uint256,address[],bool[])" : "setManagers(address[],bool[])";
    const args = getManagerArgs({ data: obj });

    const overrides = { gasPrice: fees?.gasPrice };

    const { config, isSuccess: isPrepared } = usePrepareContractWrite({
        enabled: isReady && isInputValid,
        address: orgAddress,
        abi: BadgerOrg.abi,
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

    const openSetManagers = async ({
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
            console.error('e', e)

            onError(e);
        }
    }

    return { openSetManagers, isPrepared, isLoading, isSuccess }
}

export {
    useSetManagers
}