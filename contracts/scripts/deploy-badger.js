// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`. When running the script with `npx hardhat run <script>` you'll find the Hardhat Runtime Environment's members available in the global scope.

// to verify, run: 'npx hardhat verify ==constructor-args scripts/arguments.js CONTRACT_ADDRESS --network rinkeby 

const hre = require("hardhat");

const { getChainId, ethers } = require("hardhat");

async function main() {
    // Compiling all of the contracts again just in case
    await hre.run('compile');

    const [deployer] = await ethers.getSigners();
    console.log(`✅ Connected to ${deployer.address}`);
    
    const chainId = await getChainId()
    
    /*//////////////////////////////////////////////////////////////
                    DEPLOYING MASTER SASH CONTRACT
    //////////////////////////////////////////////////////////////*/

    const BadgerOrganization = await ethers.getContractFactory("BadgerOrganization");
    sashMaster = await BadgerOrganization.deploy();
    sashMaster = await sashMaster.deployed();
    console.log("✅ Base Sash Deployed.")

    console.table({
        "Chain ID": chainId,
        "Deployer": deployer.address,
        "Master Address": sashMaster.address,
        "Remaining ETH Balance": parseInt((await deployer.getBalance()).toString()) / 1000000000000000000,
    })

    /*//////////////////////////////////////////////////////////////
                        DEPLOYING HOUSE CONTRACT
    //////////////////////////////////////////////////////////////*/    
    const Badger = await ethers.getContractFactory("Badger");
    house = await Badger.deploy(sashMaster.address);
    house = await house.deployed();

    console.table({
        "Chain ID": chainId,
        "Deployer": deployer.address,
        "Badger House Address": house.address,
        "Remaining ETH Balance": parseInt((await deployer.getBalance()).toString()) / 1000000000000000000,
    })

    // // Verifying
    if (chainId != '31337') {
        // Give time for etherscan to confirm the contract before verifying.
        await new Promise(r => setTimeout(r, 30000));
        await hre.run("verify:verify", {
            address: sashMaster.address,
            constructorArguments: [],
        });
        console.log("✅ Master Sash Verified.")

        await new Promise(r => setTimeout(r, 30000));
        await hre.run("verify:verify", {
            address: house.address,
            constructorArguments: [sashMaster.address],
        });
        console.log("✅ Badger House Verified.")
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });