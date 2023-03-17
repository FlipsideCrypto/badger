import { ethers } from "ethers";

// TODO: add ENS
const addressValidator = (addresses) => {
    let invalid = []
    let cleanedAddresses = []

    addresses.forEach((address, index) => {
        /// if empty string, skip
        if (!address || !address.trim()) return

        address = address.trim().toLowerCase();
            
        if (address.length !== 42 || !ethers.utils.isAddress(address))
            invalid.push({index: index, address: address})
    
        cleanedAddresses.push(address);    
    })

    if (invalid.length > 0)
        console.error("Invalid addresses: " + invalid.map(i => i.index).join(", ") + " (" + invalid.map(i => i.address).join(", ") + ")");
        // throw new Error("Invalid addresses at index: " + invalid.map(i => i.index).join(", ") + " (" + invalid.map(i => i.address).join(", ") + ")")

    return { cleanedAddresses, invalid }
}

export { addressValidator }