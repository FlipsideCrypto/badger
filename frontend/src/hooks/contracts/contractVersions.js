import { ethers } from "ethers";

const BADGER_ADDRESSES = JSON.parse(process.env.REACT_APP_BADGER_ADDRESSES);

function getBadgerAddress(chainID) {
    try {
        return BADGER_ADDRESSES[chainID];
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
            address
        }
    } catch (err) {
        console.error('Error importing Badger:', err);
        return { error: err }
    }
}

export {
    getBadgerAddress,
    getBadgerOrganizationAbi,
    getBadgerAbi
}