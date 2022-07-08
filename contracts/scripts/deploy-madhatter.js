// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`. When running the script with `npx hardhat run <script>` you'll find the Hardhat Runtime Environment's members available in the global scope.

// to verify, run: 'npx hardhat verify ==constructor-args scripts/arguments.js CONTRACT_ADDRESS --network rinkeby 

const hre = require("hardhat");

const { assert } = require('chai')

async function main() {
    // Compiling all of the contracts again just in case
    await hre.run('compile');

    const [deployer] = await ethers.getSigners();
    console.log(`✅ Connected to ${deployer.address}`);

    
    /*//////////////////////////////////////////////////////////////
                        DEPLOYING BASE CONTRACT
    //////////////////////////////////////////////////////////////*/

    const HatterOrg = await ethers.getContractFactory("MadHatterOrg");
    org = await HatterOrg.deploy();
    org = await org.deployed();
    console.log("✅ Base Org Deployed.")

    console.table({
        "Contract Name": await org.name(),
        "Deployer": deployer.address,
        "Contract Address": org.address,
        "Remaining ETH Balance": parseInt((await deployer.getBalance()).toString()) / 1000000000000000000,
    })

    // Verifying
    // if (chainId != '31337') {
    //     // Give time for etherscan to confirm the contract before verifying.
    //     await new Promise(r => setTimeout(r, 30000));
    //     await hre.run("verify:verify", {
    //         address: org.address,
    //         constructorArguments: [
    //             ...arguments
    //         ],
    //     });
    //     console.log("✅ Base Org Verified.")
    // }

    /*//////////////////////////////////////////////////////////////
                        DEPLOYING PROXY MANAGER
    //////////////////////////////////////////////////////////////*/    
    const HatterProxy = await ethers.getContractFactory("MadHatter");
    proxy = await HatterProxy.deploy(
        org.address
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