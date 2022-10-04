const { assert } = require('chai')

var chai = require('chai')
    .use(require('chai-as-promised'))
    .should()

const { ethers } = require("hardhat");

describe("BadgerHouse", function() {
    before(async() => {
        [owner, signer1, signer2, signer3] = await ethers.getSigners();

        const BadgerSash = await ethers.getContractFactory("BadgerSash");
        sashMaster = await BadgerSash.deploy("");
        sashMaster = await sashMaster.deployed();

        const BadgerHouse = await ethers.getContractFactory("BadgerHouse");
        house = await BadgerHouse.deploy(sashMaster.address);
        house = await house.deployed();

        // const Subscription = await ethers.getContractFactory("ERC1155Badger");
        // subscription = await Subscription.deploy("");
        // subscription = await subscription.deployed();
        // await house.setSubscriptionImplementation(
        //     subscription.address
        // );
    });

    describe("New Sash", function() {
        it('Initialized New Sash', async() => {
            cloneTx = await house.connect(owner).createOrganization();
            cloneTx = await cloneTx.wait();
            
            sashPressAddress = cloneTx.events[0].address;
            sashPress = await sashMaster.attach(sashPressAddress);

            assert.equal(await sashPress.leader(), owner.address);
        });

        it('Can mint Sash', async() => {
            _badge = [
                true,
                5000,
                0,
                5,
                "ipfs://120404120412"
            ];
            _badgeId = 0;
            _recipients = [
                owner.address,
                signer1.address,
                signer2.address,
            ]
            _amounts = [
                2,
                3,
                4
            ]
            
            await sashPress.connect(owner).sewBadge(
                _badge,
                _badgeId,
                _recipients,
                _amounts,
                "0x"
            )

            assert.equal(await sashPress.balanceOf(owner.address, 0), _amounts[0])
            assert.equal(await sashPress.balanceOf(signer1.address, 0), _amounts[1])
            assert.equal(await sashPress.balanceOf(signer2.address, 0), _amounts[2])
        })
    });
})