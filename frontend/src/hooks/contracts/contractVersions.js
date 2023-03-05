import { ethers } from "ethers";

const PRIMARY_IMPLEMENTATION = process.env.REACT_APP_BADGER_SINGLETON;
const PRIMARY_PRODUCTION_CHAIN = process.env.REACT_APP_PRODUCTION_CHAIN;

// Gets the Badger implementation to clone based on the version.
// TODO: Add versioning
function getPrimaryImplementation() {
    return PRIMARY_IMPLEMENTATION;
}

// Putting the parse into a try catch block to account for missing env var breaking the app.
function getBadgerAddress(chainName) {
    console.log('chain name', chainName)
    try {
        const BADGER_ADDRESSES = JSON.parse(process.env.REACT_APP_BADGER_ADDRESSES);
        const address = BADGER_ADDRESSES[chainName] ? BADGER_ADDRESSES[chainName] : BADGER_ADDRESSES[PRIMARY_PRODUCTION_CHAIN];
        console.log('BADGER_ADDRESSES', BADGER_ADDRESSES)
        console.log('address', address)
        return address;
    }
    catch {
        console.error(`Badger contract address not found in .env.`)
        return null;
    }
}

// Gets the ABI for sash contracts.
// TODO: Add versioning
function getBadgerOrganizationAbi() {
    try {
        const abi = require('@abis/BadgerOrganization.json');
        return { abi: new ethers.utils.Interface(abi) }
    }
    catch (err) {
        console.error('Error importing BadgerOrganization:', err);
        return { error: err }
    }
}

// Gets the abi and chain specific address for the Badger contract.
function getBadgerAbi(chainName) {
    try {
        const abi = require('@abis/Badger.json');
        const address = getBadgerAddress(chainName);
        console.log('getbadgeabi address', address)
        return {
            abi: new ethers.utils.Interface(abi),
            address: address
        }
    }
    catch (err) {
        console.error('Error importing Badger:', err);
        return { error: err }
    }
}

export {
    getPrimaryImplementation,
    getBadgerAddress,
    getBadgerOrganizationAbi,
    getBadgerAbi
}