const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
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

    async function deployNewManagedOrganization() {
        const { organization, owner, otherAccount } = await loadFixture(deployNewOrganization);

        // set organization manager to other account 
        const Manager = await ethers.getContractFactory("BadgerManagerClaimable");
        const manager = await Manager.deploy();
        await manager.deployed();

        return { manager, organization, owner, otherAccount }
    }

    describe("BadgerManagerClaimable.sol", async function () {
        it("call: supportsInterface(0x6847c1d5)", async function () {
            const { manager } = await loadFixture(deployNewManagedOrganization);

            expect(await manager.supportsInterface("0x7cc2d017")).to.equal(false);
            expect(await manager.supportsInterface("0x56dbdf14")).to.equal(true); // Manager interface
            expect(await manager.supportsInterface("0x01ffc9a7")).to.equal(true); // IERC165
        });

        it("call: mint()", async function () {
            const { manager, organization, owner, otherAccount } = await loadFixture(deployNewManagedOrganization);

            const config = ethers.utils.defaultAbiCoder.encode(["uint256", "uint256"], [0, 1000]);

            const transactions = [
                organization.interface.encodeFunctionData("setManagers(address[],bool[])", [[manager.address], [true]]),
                organization.interface.encodeFunctionData("configManager(address,bytes)", [manager.address, config])
            ]

            await organization.connect(owner).multicall(transactions);

            expect(await manager.connect(otherAccount).mint(organization.address, 0, "0x"))
                .to.emit(organization, "Minted")
                .withArgs(otherAccount.address, ethers.constants.AddressZero, 0, 1000);
        });

        it("revert: configManager(manager, (0,0)) amount is 0", async function () {
            const { manager, organization, owner } = await loadFixture(deployNewManagedOrganization);

            const config = ethers.utils.defaultAbiCoder.encode(["uint256", "uint256"], [0, 0]);

            const transactions = [
                organization.interface.encodeFunctionData("setManagers(address[],bool[])", [[manager.address], [true]]),
                organization.interface.encodeFunctionData("configManager(address,bytes)", [manager.address, config])
            ]

            await expect(organization.connect(owner).multicall(transactions))
                .to.be.revertedWith("BadgerManagerClaimable::config: Amount must be greater than zero.");
        });
    });
});