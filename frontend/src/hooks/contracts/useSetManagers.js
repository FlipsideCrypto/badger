import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { ethers } from "ethers";

import { getBadgerOrganizationAbi, useFees, useUser } from "@hooks";

import { addressValidator } from "@utils";

const getManagerKey = ({badgeId, manager}) => {
    const encoded = ethers.utils.defaultAbiCoder.encode(["uint256", "address"], [badgeId, manager]);
    return ethers.utils.solidityKeccak256(["bytes"], [encoded]);
}

/// TODO: Get the manager schema from the contract if it is one.
const getManagerConfigSchema = async ({ manager }) => {

}

const getSetManagerArgs = ({ organization, tokenId, managers, isManagers, configs }) => {
    let args = [];
    let functionName = "";

    const { cleanedAddresses } = addressValidator(managers);
    
    if (cleanedAddresses.length === 0 || isManagers.length !== cleanedAddresses.length || tokenId === null)
        return { functionName: "", args: [] };

    // TokenId determines whether it is an org or token manager.
    if (tokenId) {
        functionName = "setManagers(uint256,address[],bool[])"
        args = [tokenId, cleanedAddresses, isManagers];
    } else {
        functionName = "setManagers(address[],bool[])"
        args = [cleanedAddresses, isManagers];
    }
    
    // If any managers have a config, we are multicalling the config function with the setManagers function.
    if (configs.length > 0) {
        // Make the setManagers function the first argument of the multicall.
        args = [args];
        for (const config of configs) {
            // TODO: get the config schema from the contract
            // const configSchema = await getManagerConfigSchema({manager: config.manager});
            // const configHash = ethers.utils.defaultAbiCoder.encode([configSchema], [config.args])

            const configHash = ethers.utils.defaultAbiCoder.encode(["uint256","bool"], [tokenId, true])
            const configTx = organization.abi.encodeFunctionData(
                tokenId ? "configManager(uint256,address,bytes)" : "configManager(address,bytes)",
                [tokenId, config.manager, configHash]
            );

            args.push(configTx);
        }
            

        return { functionName: "multicall", args: [args] };
    }


    return { functionName, args };
}

const useSetManagers = ({ obj }) => {
    const fees = useFees();

    const { orgAddress } = useParams();

    const { chain, address } = useUser();

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const BadgerOrg = useMemo(() => { return getBadgerOrganizationAbi() }, []);

    const { functionName, args } = getSetManagerArgs({ 
        organization: BadgerOrg,
        tokenId: obj.tokenId,
        managers: obj.managers,
        isManagers: obj.isManagers,
        configs: obj.configs
     });

    const isReady = BadgerOrg && fees && address && !!args;

    const overrides = { gasPrice: fees?.gasPrice };

    const { config, isSuccess: isPrepared } = usePrepareContractWrite({
        enabled: isReady,
        address: orgAddress,
        abi: BadgerOrg.abi,
        functionName: functionName,
        chainId: chain.id,
        args,
        overrides,
        onError: (e) => {
            const err = e?.error?.message || e?.data?.message || e
            throw new Error(err);
        }
    });

    const { writeAsync } = useContractWrite(config);

    const openManagerTransaction = async ({
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

    return { openManagerTransaction, isPrepared, isLoading, isSuccess }
}

export {
    useSetManagers
}