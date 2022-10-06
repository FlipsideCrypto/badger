

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`. When running the script with `npx hardhat run <script>` you'll find the Hardhat Runtime Environment's members available in the global scope.

// to verify, run: 'npx hardhat verify ==constructor-args scripts/arguments.js CONTRACT_ADDRESS --network rinkeby 

const hre = require("hardhat");

const { assert } = require('chai');
const { getChainId, ethers } = require("hardhat");

const cloneAbi = [{"inputs":[],"name":"AdminOnly","type":"error"},{"inputs":[],"name":"BadgeDoesNotExist","type":"error"},{"inputs":[],"name":"BadgeExists","type":"error"},{"inputs":[],"name":"BadgesAreBoundToAddress","type":"error"},{"inputs":[],"name":"BundleLengthsInvalid","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"indexed":false,"internalType":"uint256[]","name":"values","type":"uint256[]"}],"name":"TransferBatch","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"TransferSingle","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"value","type":"string"},{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"}],"name":"URI","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"admins","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_badgeId","type":"uint256"}],"name":"badgeImage","outputs":[{"internalType":"string","name":"imageString","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_badgeId","type":"uint256"}],"name":"badgeTraits","outputs":[{"internalType":"string","name":"traitString","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"badges","outputs":[{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"imageHash","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"accounts","type":"address[]"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"}],"name":"balanceOfBatch","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_badgeId","type":"uint256"}],"name":"burnBadge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"contractURIHash","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_badgeId","type":"uint256"},{"internalType":"string","name":"_title","type":"string"},{"internalType":"string","name":"_description","type":"string"},{"internalType":"string","name":"_imageHash","type":"string"}],"name":"createBadgeType","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"_badgeIds","type":"uint256[]"},{"components":[{"internalType":"string","name":"title","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"string","name":"imageHash","type":"string"}],"internalType":"struct BadgerSet.Badge[]","name":"_badges","type":"tuple[]"}],"name":"createBadgeTypeBundle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_baseURI","type":"string"},{"internalType":"string","name":"_contractURI","type":"string"},{"internalType":"string","name":"_collectionDescription","type":"string"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_badgeId","type":"uint256"}],"name":"mintBadge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_addresses","type":"address[]"},{"internalType":"uint256[]","name":"_badgeIds","type":"uint256[]"}],"name":"mintBadgeBundle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"uint256","name":"_badgeId","type":"uint256"}],"name":"revokeBadge","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"amounts","type":"uint256[]"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeBatchTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_contractURIHash","type":"string"}],"name":"setContractURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"bool","name":"_isAdmin","type":"bool"}],"name":"updateAdminRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_badgeId","type":"uint256"},{"internalType":"string","name":"_title","type":"string"},{"internalType":"string","name":"_description","type":"string"},{"internalType":"string","name":"_imageHash","type":"string"}],"name":"updateBadgeType","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_badgeId","type":"uint256"}],"name":"uri","outputs":[{"internalType":"string","name":"badgeURI","type":"string"}],"stateMutability":"view","type":"function"}]
const proxyAbi = [{"inputs":[{"internalType":"address","name":"_masterContract","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldMasterContract","type":"address"},{"indexed":true,"internalType":"address","name":"newMasterContract","type":"address"}],"name":"MasterContractUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"master","type":"address"},{"indexed":true,"internalType":"address","name":"setAddress","type":"address"}],"name":"NewSetCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"badgerSets","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"deploySet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_diff","type":"uint256"}],"name":"forceBadgerNonce","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"salt","type":"bytes32"}],"name":"getSetAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"masterContract","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

async function main() {
    // Compiling all of the contracts again just in case
    await hre.run('compile');

    const [deployer] = await ethers.getSigners();
    console.log(`✅ Connected to ${deployer.address}`);

    const chainId = await hre.getChainId()
    
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

    clone = await house.createOrganization("0x")
    clone = await clone.wait();

    // let newSet = proxy.deploySet();
    // newSet = await newSet.wait();

    const setContractAddress = clone.events[3].args[0]
    const clonedContract = sashMaster.attach(setContractAddress)

    sashPressAddress = clone.events[3].args['organization']
    sashPress = await sashMaster.attach(sashPressAddress);

    const tokenId = 2

    res = await sashPress.setBadge(
        tokenId,
        false,
        "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        "https://ipfs.io/ipfs//QmcQ8tzotwPv5qZa1ZkjbZHFZ9iSCKfrabcndYMchhSnA9",
        [0, '0x0000000000000000000000000000000000000000', 0, 0],
        []
        // {gasLimit: 200000}
    )
    res = await res.wait();
    console.log('Badge Type created', res)

    res = await sashPress.badges(tokenId)
    console.log('Badge Type', res)

    res = await clonedContract.mintBadge(
        deployer.address,
        tokenId,
        {gasLimit: 100000}
    )
    res = res.wait()
    console.log('Badge Type minted', res)
    await new Promise(r => setTimeout(r, 15000));

    res = await clonedContract.uri(tokenId)

    console.log(res)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });