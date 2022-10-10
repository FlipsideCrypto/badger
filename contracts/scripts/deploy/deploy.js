// We require the Hardhat Runtime Environment explicitly here. 

// This is optional but useful for running the script in a standalone fashion through `node <script>`. 
// When running the script with `npx hardhat run <script>` you'll find the Hardhat Runtime Environment's 
// members available in the global scope.

// to verify, run: 'npx hardhat verify ==constructor-args scripts/arguments.js CONTRACT_ADDRESS --network rinkeby 

const fs = require('fs');
const hre = require("hardhat");

const { getChainId, ethers } = require("hardhat");

async function main() {
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

    // Dump the deployment results to a file
    // Determine which version to write to
    // use timestamp to denote version
    const timestamp = Date.now();
    const versionKey = `${chainId}v${timestamp.toString()}`

    // Create the deployment dictionary
    const deployment = {
        "Chain ID": chainId,
        "Deployer": deployer.address,
        "Badger Address": badger.address,
        "Organization Implementation Address": organizationMaster.address,
        "Remaining ETH Balance": parseInt((await deployer.getBalance()).toString()) / 1000000000000000000,
    }

    // Save abi file to frontend/src/abis/
    // export the abi for badger
    fs.writeFileSync(
        `../frontend/src/abis/Badger.json`, 
        JSON.stringify(JSON.parse(badger.interface.format('json')), null, 4), 
        'utf8'
    );

    // export for abi for the organization
    fs.writeFileSync(
        `../frontend/src/abis/BadgerOrganization.json`,
        JSON.stringify(JSON.parse(organizationMaster.interface.format('json')), null, 4),
        'utf8'
    );

    // Create deployments folder
    const deploymentsFolder = './scripts/deploy/deployments';

    if (!fs.existsSync(deploymentsFolder)){
        fs.mkdirSync(deploymentsFolder);
    }

    // Add the new version to the list of versions
    fs.writeFileSync(
        `./scripts/deploy/deployments/${versionKey}.json`, 
        JSON.stringify(deployment, null, 4), 
        'utf8'
    );
    console.log(`✅ Deployment ${versionKey} saved to deployments folder.`)

    // Verifying
    if (chainId != '31337') {
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
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });