// Things to do:
// - use fixtures
// - confirm that all the events are correct -- don't just run the transaction and assume things are ok
// - layout organization variants (this is how we will find out what needs to be changed still)
// - use module fixtures (once the base is tested)
// - implement organization variants using modules in /variants/ which will be specific configurations
// - confirm that we have tested coverage of non-configured managers, and configured hooks and managers
//   of organizations so that this file can be used to test the core functionality of the organization

// Model front-end tx stack
// Test multicall and other custom needs for front-end

/// imports
const { expect } = require("chai");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");


describe("Badger", function () {
    async function deployBadgerFactory() {
        const [owner] = await ethers.getSigners();

        const BadgerFactory = await ethers.getContractFactory("Badger");
        const badgerFactory = await BadgerFactory.deploy();
        await badgerFactory.deployed();

        return { badgerFactory, owner };
    }

    async function deployNewOrganization() {
        const { badgerFactory, owner } = await loadFixture(deployBadgerFactory);

        organization = [
            owner.address,
            "ipfs/uri",
            "ipfs/org",
            "Badger",
            "BADGER"
        ]

        const tx = await badgerFactory.connect(owner).createOrganization(organization);
        const receipt = await tx.wait();

        const orgAddress = receipt.events[3].args['organization'];

        const BadgerOrganization = await ethers.getContractFactory("BadgerOrganization");
        const org = new ethers.Contract(
            orgAddress,
            BadgerOrganization.interface,
            owner
        );

        return { badgerFactory, org, owner };
    }

    describe("Badger.sol", async function () {
        it("getOrganizationURI() can get organization URI.", async function () {
            const { badgerFactory } = await loadFixture(deployNewOrganization);

            organization = await badgerFactory.getOrganization(1);
            await expect(organization).to.equal(org.address);
        });
        it("getOrganization() can get organization.", async function () {
            const { badgerFactory, org, owner } = await loadFixture(deployNewOrganization);

            organization = await badgerFactory.getOrganization(1);
            await expect(organization).to.equal(org.address);
        });
    });
});