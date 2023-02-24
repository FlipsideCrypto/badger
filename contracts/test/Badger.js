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
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Badger", function () {
    async function deployBadgerFactory() {
        const [owner, otherAccount] = await ethers.getSigners();

        const BadgerFactory = await ethers.getContractFactory("BadgerFactory");
        const badgerFactory = await BadgerFactory.deploy();
        await badgerFactory.deployed();

        return { badgerFactory, owner, otherAccount };
    }

    describe("Deploy", async function () {
        it("Should have the right owner", async function () {
            const { badgerFactory, owner } = await loadFixture(deployBadgerFactory);
            expect(await badgerFactory.owner()).to.equal(owner.address);
        });
    });
});