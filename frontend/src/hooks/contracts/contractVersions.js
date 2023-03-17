import { ethers } from "ethers";

import { BADGER_DEPLOYMENTS } from "trybadger";

function getBadgerAddress(chainID) {
    try {
        return BADGER_DEPLOYMENTS[chainID]["badger"];
    } catch {
        console.error(`Badger contract address not found in .env.`)
        return null;
    }
}

function getBadgerOrganizationAbi() {
    try {
        const abi = require('@abis/BadgerOrganization.json');
        return { abi: new ethers.utils.Interface(abi) }
    } catch (err) {
        console.error('Error importing BadgerOrganization:', err);
        return { error: err }
    }
}

function getBadgerAbi(chainID) {
    try {
        const abi = require('@abis/Badger.json');
        const address = getBadgerAddress(chainID);
        return {
            abi: new ethers.utils.Interface(abi),
            address,
        }
    } catch (err) {
        console.error('Error importing Badger:', err);
        return { error: err }
    }
}

function getTransferBoundAddress(chainId) {
    try {
        return BADGER_DEPLOYMENTS[chainId]["transferBoundHook"];
    } catch {
        console.error(`Transfer Bound contract address not found in .env.`)
        return null;
    }
}

export {
    getBadgerAddress,
    getBadgerOrganizationAbi,
    getBadgerAbi,
    getTransferBoundAddress
}