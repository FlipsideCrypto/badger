import { ethers } from "ethers";

const BADGER_ADDRESSES_DICT = JSON.parse(process.env.REACT_APP_BADGER_ADDRESSES);
const BADGER_ADDRESSES = Object.keys(BADGER_ADDRESSES_DICT).reduce((acc, key) => {
    acc[key] = BADGER_ADDRESSES_DICT[key][0];
    return acc;
}, {});

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

function getBadgerAbi(chainName) {
    try {
        const abi = require('@abis/Badger.json');
        const address = getBadgerAddress(chainName);
        return {
            abi: new ethers.utils.Interface(abi),
            address: address
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