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

        const BadgerOrgVersion = await ethers.getContractFactory("BadgerOrganization");
        badgerOrgVersion = await BadgerOrgVersion.deploy();
        badgerOrgVersion.deployed();

        const BadgerFactory = await ethers.getContractFactory("Badger");
        badgerFactory = await BadgerFactory.deploy(badgerOrgVersion.address);
        badgerFactory = await badgerFactory.deployed();

        return { badgerFactory, owner };
    }

    async function deployNewOrganization() {
        const { badgerFactory, owner } = await loadFixture(deployBadgerFactory);

        const organization = {
            deployer: owner.address,
            uri: "ipfs/uri",
            organizationURI: "ipfs/org",
            name: "Badger",
            symbol: "BADGER"
        }

        const tx = await badgerFactory.connect(owner).createOrganization(organization);
        const receipt = await tx.wait();

        const orgAddress = receipt.events[4].args['organization'];

        const BadgerOrganization = await ethers.getContractFactory("BadgerOrganization");
        const org = new ethers.Contract(
            orgAddress,
            BadgerOrganization.interface,
            owner
        );

        return { badgerFactory, org, owner };
    }

    describe("Badger.sol", async function () {
        it("createOrganization() success", async function () {
            const { badgerFactory, owner } = await loadFixture(deployBadgerFactory);

            const organization = {
                deployer: owner.address,
                uri: "ipfs/uri",
                organizationURI: "ipfs/org",
                name: "Badger",
                symbol: "BADGER"
            }

            await (
                expect(badgerFactory.connect(owner).createOrganization(organization)
                ).to.emit(badgerFactory, "OrganizationCreated")
            );
        });
    });

    describe("BadgerOrganization.sol", async function () {
        it("setOrganizationURI() success", async function () {
            const { badgerFactory, org, owner } = await loadFixture(deployNewOrganization);

            await (
                expect(org.connect(owner).setOrganizationURI("ipfs/newuri"))
                    .to.emit(org, "OrganizationUpdated")
                    .withArgs("ipfs/newuri")
            );
        });

        it("setOrganizationURI() fail", async function () {
            const { badgerFactory, org, owner } = await loadFixture(deployNewOrganization);

            await (
                expect(org.connect(owner).setOrganizationURI(""))
                    .to.be.revertedWith("BadgerScout::setOrganizationURI: URI must be set.")
            );
        });

        it("setBadgeURI() success", async function () {
            const { badgerFactory, org, owner } = await loadFixture(deployNewOrganization);

            await (
                expect(org.connect(owner).setBadgeURI(0, "ipfs/newuri"))
                    .to.emit(org, "URI")
                    .withArgs("ipfs/newuri", 0)
            );
        });

        it("setBadgeURI() fail", async function () {
            const { badgerFactory, org, owner } = await loadFixture(deployNewOrganization);

            await (
                expect(org.connect(owner).setBadgeURI(0, ""))
                    .to.be.revertedWith("BadgerScout::setBadgeURI: URI must be set.")
            );
        });



        it("mint() success", async function () {
            const { badgerFactory, org, owner } = await loadFixture(deployNewOrganization);

            await (
                expect(org.mint(owner.address, 0, 100, "0x"))
                    .to.emit(org, "TransferSingle")
                    .withArgs(owner.address, ethers.constants.AddressZero, owner.address, 0, 100)
            );
        });

        it("getOrganization() success", async function () {
            const { badgerFactory, org, owner } = await loadFixture(deployNewOrganization);

            await (
                expect(await badgerFactory.getOrganization(0))
                    .to.be.equal(org.address)
            )
        });
    });
});