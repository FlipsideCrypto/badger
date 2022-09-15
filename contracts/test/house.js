const { assert } = require('chai')

var chai = require('chai')
    .use(require('chai-as-promised'))
    .should()

const { ethers } = require("hardhat");

describe("BadgerHouse", function() {
    before(async() => {
        [owner, signer1, signer2, signer3] = await ethers.getSigners();

        // This is a place holder
        // const Subscription = await ethers.getContractFactory("ERC1155Badger");
        // subscription = await Subscription.deploy("");
        // subscription = await subscription.deployed();

        const BadgerSash = await ethers.getContractFactory("BadgerSash");
        sashMaster = await BadgerSash.deploy("");
        sashMaster = await sashMaster.deployed();

        const BadgerHouse = await ethers.getContractFactory("BadgerHouse");
        house = await BadgerHouse.deploy(sashMaster.address);
        house = await house.deployed();

        // await house.setSubscriptionImplementation(
        //     subscription.address
        // );

        console.log('Gets here')

        cloneTx = await house.connect(owner).createSashPress();
        cloneTx = await cloneTx.wait();
        
        console.log(cloneTx);

        sashPressAddress = cloneTx.events[0].address;
        sashPress = await sashMaster.attach(sashPressAddress);
    });

    describe("New Sash", function() {
        it('Initialized New Sash', async() => {
            
        });
    });
})