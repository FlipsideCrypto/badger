

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
    const cloneAbi = require('../abis/BadgerSet.json')
    
    const setContractAddress = '0x82fa48f8A2AF501185a3398A9C7b33420b7CeCc9'
    const clonedContract = new ethers.Contract(
        setContractAddress,
        cloneAbi,
        deployer
    );

    var response = await clonedContract.mintBadgeBundle(
          ['0x1ccb2945F1325e061b40Fe5b0B452f0E76fB7278', '0x1ccb2945F1325e061b40Fe5b0B452f0E76fB7278']
        , [0,1]
    );
    response.wait()
    .then((res) => {
        console.log(res)
    })
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });