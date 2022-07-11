// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`. When running the script with `npx hardhat run <script>` you'll find the Hardhat Runtime Environment's members available in the global scope.

// to verify, run: 'npx hardhat verify ==constructor-args scripts/arguments.js CONTRACT_ADDRESS --network rinkeby 

const hre = require("hardhat");

const { assert } = require('chai');
const { getChainId, ethers } = require("hardhat");

async function main() {
    // Compiling all of the contracts again just in case
    await hre.run('compile');

    const [deployer] = await ethers.getSigners();
    console.log(`✅ Connected to ${deployer.address}`);
    
    const chainId = await hre.getChainId()
    
    /*//////////////////////////////////////////////////////////////
                        DEPLOYING BASE CONTRACT
    //////////////////////////////////////////////////////////////*/

    const BadgerSet = await ethers.getContractFactory("BadgerSet");
    set = await BadgerSet.deploy();
    set = await set.deployed();
    console.log("✅ Base Set Deployed.")

    console.table({
        "Chain ID": chainId,
        "Deployer": deployer.address,
        "Contract Address": set.address,
        "Remaining ETH Balance": parseInt((await deployer.getBalance()).toString()) / 1000000000000000000,
    })

    // Verifying
    // if (chainId != '31337') {
    //     // Give time for etherscan to confirm the contract before verifying.
    //     await new Promise(r => setTimeout(r, 30000));
    //     await hre.run("verify:verify", {
    //         address: set.address,
    //         constructorArguments: [
    //             ...arguments
    //         ],
    //     });
    //     console.log("✅ Base set Verified.")
    // }

    /*//////////////////////////////////////////////////////////////
                        DEPLOYING PROXY MANAGER
    //////////////////////////////////////////////////////////////*/    
    const BadgerProxy = await ethers.getContractFactory("Badger");
    proxy = await BadgerProxy.deploy(
        set.address
    );
    proxy = await proxy.deployed();
    console.log("✅ Proxy Deployed.")

    console.table({
        "Deployer": deployer.address,
        "Contract Address": proxy.address,
        "Remaining ETH Balance": parseInt((await deployer.getBalance()).toString()) / 1000000000000000000,
    })
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });