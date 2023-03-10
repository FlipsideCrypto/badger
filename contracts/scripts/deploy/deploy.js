// We require the Hardhat Runtime Environment explicitly here. 

// This is optional but useful for running the script in a standalone fashion through `node <script>`. 
// When running the script with `npx hardhat run <script>` you'll find the Hardhat Runtime Environment's 
// members available in the global scope.

// to verify, run: 'npx hardhat verify ==constructor-args scripts/arguments.js CONTRACT_ADDRESS --network rinkeby 

const fs = require('fs');
const hre = require("hardhat");

const { getChainId, ethers } = require("hardhat");

async function main() {
    // Run the node and then run the contracts in a child process that uses the node network
    hre.run('node');

    // sleep for 5 seconds to allow the node to start
    await new Promise(r => setTimeout(r, 5000));

    // Compiling all of the contracts again just in case
    await hre.run('compile');

    const [deployer] = await ethers.getSigners();
    console.log(`✅ Connected to ${deployer.address}`);
    
    const chainId = await getChainId()   
    
    // Deploying the primitive master BadgerOrganization contract that is used for clones
    const BadgerOrganization = await ethers.getContractFactory("BadgerOrganization");
    organizationMaster = await BadgerOrganization.deploy();
    organizationMaster = await organizationMaster.deployed();
    console.log("✅ Organization Implementation Deployed.")

    organizationDeployment = {
        "Chain ID": chainId,
        "Deployer": deployer.address,
        "Organization Implementation Address": organizationMaster.address,
        "Remaining ETH Balance": parseInt((await deployer.getBalance()).toString()) / 1000000000000000000,
    }
    console.table(organizationDeployment)

    // Deploy the protocol
    const Badger = await ethers.getContractFactory("Badger");
    badger = await Badger.deploy(organizationMaster.address);
    badger = await badger.deployed();
    console.log("✅ Badger Deployed.")

    badgerDeployment = {
        "Chain ID": chainId,
        "Deployer": deployer.address,
        "Badger Address": badger.address,
        "Remaining ETH Balance": parseInt((await deployer.getBalance()).toString()) / 1000000000000000000,
    }
    console.table(badgerDeployment)

    // Verifying
    if (chainId != '1337') {
        // Give time for etherscan to confirm the contract before verifying.
        await new Promise(r => setTimeout(r, 30000));
        await hre.run("verify:verify", {
            address: organizationMaster.address,
            constructorArguments: [],
        });
        console.log("✅ Organization Implementation Verified.")

        await new Promise(r => setTimeout(r, 30000));
        await hre.run("verify:verify", {
            address: badger.address,
            constructorArguments: [badger.address],
        });
        console.log("✅ Badger Verified.")
    }

    // Keep Promise open to keep node running
    await new Promise((resolve) => {})
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });