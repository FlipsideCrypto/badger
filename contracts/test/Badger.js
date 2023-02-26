// Things to do:
// - confirm that all the events are correct -- don't just run the transaction and assume things are ok
// - layout organization variants (this is how we will find out what needs to be changed still)
// - use module fixtures (once the base is tested)
// - implement organization variants using modules in /variants/ which will be specific configurations
// - confirm that we have tested coverage of non-configured managers, and configured hooks and managers
//   of organizations so that this file can be used to test the core functionality of the organization

// Model front-end tx stack
// Test multicall and other custom needs for front-end

// badger: 0x2f070d13
// org: 0x7a3851dc
// org logic: 0xd2779f52

const { time, loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Badger", function () {
    async function deployBadgerSingleton() {
        const BadgerSingleton = await ethers.getContractFactory("BadgerOrganization");
        const badgerSingleton = await BadgerSingleton.deploy();
        await badgerSingleton.deployed();

        return { badgerSingleton }
    }

    async function deployBadgerFactory() {
        const [owner, otherAccount] = await ethers.getSigners();

        const { badgerSingleton } = await loadFixture(deployBadgerSingleton);

        const BadgerFactory = await ethers.getContractFactory("Badger");
        const badgerFactory = await BadgerFactory.deploy(badgerSingleton.address);
        await badgerFactory.deployed();

        expect(await badgerFactory.implementation()).to.equal(badgerSingleton.address);

        return { badgerFactory, owner, otherAccount };
    }

    async function deployNewOrganization() {
        const { badgerFactory, owner, otherAccount } = await loadFixture(deployBadgerFactory);

        const config = {
            deployer: owner.address,
            uri: "ipfs/uri/{id}/",
            organizationURI: "ipfs/org",
            name: "Badger",
            symbol: "BADGER"
        }

        const tx = await badgerFactory.connect(owner).createOrganization(config);
        const receipt = await tx.wait();

        const organizationCreatedEvent = receipt.events.find(e => e.event === "OrganizationCreated");

        const orgAddress = organizationCreatedEvent.args.organization;

        const organization = await ethers.getContractAt("BadgerOrganization", orgAddress);

        return { badgerFactory, organization, owner, otherAccount };
    }

    describe("Badger.sol", async function () {
        it("call: createOrganization({ ...placeholder })", async function () {
            const { badgerFactory, organization } = await loadFixture(deployNewOrganization);

            const organizations = await badgerFactory.organizations();
            expect(organizations).to.equal(1);

            expect(await badgerFactory.getOrganization(organizations - 1)).to.equal(organization.address);

            expect(await organization.name()).to.equal("Badger");
            expect(await organization.symbol()).to.equal("BADGER");
            expect(await organization.uri(1)).to.equal("ipfs/uri/{id}/");
            expect(await organization.organizationURI()).to.equal("ipfs/org");
        });

        it("call: supportsInterface(IBadger || IERC165)", async function () {
            const { badgerFactory } = await loadFixture(deployBadgerFactory);

            expect(await badgerFactory.supportsInterface("0x01ffc9a7")).to.equal(true);
            expect(await badgerFactory.supportsInterface("0x2f070d13")).to.equal(true);
        });
    });

    describe("BadgerOrganization.sol", async function () {
        it("call: setOrganizationURI('placeholder')", async function () {
            const { organization } = await loadFixture(deployNewOrganization);

            await (
                expect(organization.setOrganizationURI("ipfs/newuri"))
                    .to.emit(organization, "OrganizationUpdated")
                    .withArgs("ipfs/newuri")
            );
        });

        it("revert: setOrganizationURI('')", async function () {
            const { organization } = await loadFixture(deployNewOrganization);

            await (
                expect(organization.setOrganizationURI(""))
                    .to.be.revertedWith("BadgerScout::setOrganizationURI: URI must be set.")
            );
        });

        it("revert: setOrganizationURI('placeholder') missing permission", async function () {
            const { organization, otherAccount } = await loadFixture(deployNewOrganization);

            await (
                expect(organization.connect(otherAccount).setOrganizationURI("ipfs/newuri"))
                    .to.be.revertedWith("BadgerScout::onlyOrganizationManager: Only the Owner or Organization Manager can call this.")
            );
        });

        it("call: setBadgeURI(0, 'placeholder')", async function () {
            const { organization } = await loadFixture(deployNewOrganization);

            await (
                expect(organization.setBadgeURI(0, "ipfs/newuri"))
                    .to.emit(organization, "URI")
                    .withArgs("ipfs/newuri", 0)
            );
        });

        it("revert: setBadgeURI(0, '')", async function () {
            const { organization } = await loadFixture(deployNewOrganization);

            await (
                expect(organization.setBadgeURI(0, ""))
                    .to.be.revertedWith("BadgerScout::setBadgeURI: URI must be set.")
            );
        });

        // it("mint() success", async function () {
        //     const { badgerFactory, org, owner } = await loadFixture(deployNewOrganization);

        //     await (
        //         expect(org.mint(owner.address, 0, 100, "0x"))
        //             .to.emit(org, "TransferSingle")
        //             .withArgs(owner.address, ethers.constants.AddressZero, owner.address, 0, 100)
        //     );
        // });

        // it("getOrganization() success", async function () {
        //     const { badgerFactory, org, owner } = await loadFixture(deployNewOrganization);

        //     await (
        //         expect(await badgerFactory.getOrganization(0))
        //             .to.be.equal(org.address)
        //     )
        // });
    });
});