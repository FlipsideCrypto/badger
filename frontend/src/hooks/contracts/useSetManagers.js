import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { usePrepareContractWrite, useContractWrite } from "wagmi"
import { ethers } from "ethers";

import { getBadgerOrganizationAbi, useFees, useUser } from "@hooks";

import { addressValidator } from "@utils";

const getManagerArgs = ({ data }) => {
    if (data.tokenId)
        return [data.tokenId, data.addresses, data.statuses];
    else
        return [data.addresses, data.statuses];
}

const getHookAndManagerConfig = ({ contractAddress, args }) => {
    /// TODO: get the schema of the contract
    /// const hook = new ethers.Contract(contractAddress, BadgerConfigured, provider);
    /// const schema = await hook.CONFIG_SCHEMA().split(',');
    const schema = "uint256,bool".split(',');

    if (schema.length !== args.length)
        throw new Error("Invalid arguments for hook/manager configuration");

    return ethers.utils.defaultAbiCoder.encode([schema, args]);
}


const getManagerMulticallArgs = ({ data }) => {
    // Validate the addresses
    const { cleanedAddresses: addresses, invalid } = addressValidator(data.addresses);
    
    let encodedTransactions = [];

    // Validate the setManager transaction
    if (invalid.length !== 0 || addresses.length === 0 || addresses.length !== data.statuses.length)
        throw new Error("Invalid arguments for manager configuration");

    let args = [];
    let functionName = "";

    // Determine if it's org and badge level and adjust the function signature and args.
    if (data.tokenId) {
        args = [data.tokenId, addresses, data.statuses];
        functionName = "setManagers(uint256,address[],bool[])";
    } else {
        args = [addresses, data.statuses];
        functionName = "setManagers(address[],bool[])";
    }
    
    // Push the setManager transaction to the transaction array
    encodedTransactions.push(data.organization.interface.encodeFunctionData(functionName, args));

    // Push the configManager transactions for each manager to the transaction array
    for (const address in addresses) {
        const config = getHookAndManagerConfig({ contractAddress: address, args: data.configs[address] });

        // Adjust for overloaded function signatures
        if (data.tokenId) {
            args = [data.tokenId, address, config];
            functionName = "configManager(uint256,address,bytes)";
        } else {
            args = [address, config];
            functionName = "configManager(address,bytes)";
        }
        // Push the configManager transaction to the transaction array
        encodedTransactions.push(data.organization.interface.encodeFunctionData("configManager(address,bytes)", [address, config]));
    }

    console.log('encodedTransactions', encodedTransactions)
    return [encodedTransactions];
}

const useSetManagers = ({ obj }) => {
    const fees = useFees();

    const { orgAddress } = useParams();

    const { authenticatedAddress, chain } = useUser();

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const BadgerOrg = useMemo(() => { return getBadgerOrganizationAbi() }, [])

    const isReady = BadgerOrg && fees && authenticatedAddress;
    const isInputValid = obj.addresses.length > 0 && obj.addresses.length === obj.statuses.length;
    
    const args = getManagerArgs({ data: obj });

    const overrides = { gasPrice: fees?.gasPrice };
    
    const { config, isSuccess: isPrepared } = usePrepareContractWrite({
        enabled: isReady && isInputValid,
        address: orgAddress,
        abi: BadgerOrg.abi,
        functionName: "multicall",
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