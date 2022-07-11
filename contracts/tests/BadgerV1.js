const { optionGroupUnstyledClasses } = require('@mui/base');
const { assert } = require('chai')

var chai = require('chai')
    .use(require('chai-as-promised'))
    .should()

const { ethers } = require("hardhat");

describe("Badger", function() {
    before(async() => {
        [owner, signer1, signer2, signer3] = await ethers.getSigners();

        const HatterOrg = await ethers.getContractFactory("BadgerSet");
        org = await HatterOrg.deploy();
        org = await org.deployed();
        
        const HatterProxy = await ethers.getContractFactory("Badger");
        proxy = await HatterProxy.deploy(
            org.address
        );
        proxy = await proxy.deployed();

        cloneTx = await proxy.connect(owner).deploySet();
        cloneTx = await cloneTx.wait();
        
        testOrgAddress = cloneTx.events[0].args[1]
        testOrg = await org.attach(testOrgAddress);
    });

    describe("New Set", function() {
        it('Initialized Test Set', async() => {

            await testOrg.connect(owner).initialize(
                  "BASEURI"
                , "CONTRACTURI"
                , "This is the org description"
            )

            assert.equal("CONTRACTURI", (await testOrg.contractURIHash()).toString())
        });

        it('Test Org Owner is Admin', async() => {
            assert.equal(await testOrg.admins(owner.address), true)
        });

        it('Creating New Badge Type', async() => {
            await testOrg.createBadgeType(
                1,
                "Badge 2",
                "This is badge 2 desc",
                "BADGE2IMAGE"
            );

            const badge = await testOrg.badges(1);

            assert.equal("Badge 2", badge[0].toString())
        });

        it('Creating New Badge Type Bundle', async() => {
            const badges = [
                ["Contributor", "This is the Contributor Badge.", "IMAGEHASH"],
                ["Governance", "This is the Governance Badge.", "IMAGEHASH"],
                ["Member", "This is the Member Badge.", "IMAGEHASH"],
            ]

            const ids = [2, 3, 4]

            await testOrg.createBadgeTypeBundle(
                ids,
                badges
            );

            const badge = await testOrg.badges(3);

            assert.equal("Governance", badge[0].toString())
        });

        it('Minting Badge', async() => {
            await testOrg.mintBadge(signer1.address, 1);

            assert.equal(1, await testOrg.balanceOf(signer1.address, 1))
        });

        it('Minting Badge Bundle', async() => {
            const ids = [2, 2, 3, 3]
            const addresses = [signer2.address, signer3.address, signer2.address, signer3.address]


            await testOrg.mintBadgeBundle(addresses, ids);

            assert.equal(1, await testOrg.balanceOf(signer2.address, 3))
            assert.equal(1, await testOrg.balanceOf(signer3.address, 2))
        });

        it('Non Admins Cannot Mint', async() => {
            await testOrg.connect(signer1).mintBadge(
                signer1.address,
                1
            ).should.be.rejectedWith('AdminOnly()');
        });

        it('Badge Owner Cannot Transfer', async() => {
            await testOrg.connect(signer1).safeTransferFrom(
                signer1.address,
                signer2.address,
                1, 
                1,
                []
            ).should.be.rejectedWith('BadgesAreBoundToAddress()');

            await testOrg.connect(signer1).safeBatchTransferFrom(
                signer1.address,
                signer2.address,
                [1], 
                [1],
                []
            ).should.be.rejectedWith('BadgesAreBoundToAddress()');
        });

        it('Badge Owner Can Burn', async() => {
            await testOrg.connect(signer1).burnBadge(1);
            assert.equal(0, await testOrg.balanceOf(signer1.address, 1))

            // Revert the burn
            await testOrg.connect(owner).mintBadge(signer1.address, 1);
        })

        it('Admin Can Revoke A Badge', async() => {
            await testOrg.connect(owner).revokeBadge(signer1.address, 1);
            assert.equal(0, await testOrg.balanceOf(signer1.address, 1))

            // Revert the burn
            await testOrg.connect(owner).mintBadge(signer1.address, 1);
        })
    });
});