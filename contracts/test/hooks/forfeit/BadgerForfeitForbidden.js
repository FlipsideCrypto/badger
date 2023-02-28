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

    async function deployNewHookOrganization() {
        const { organization, owner, otherAccount } = await loadFixture(deployNewOrganization);

        const Hook = await ethers.getContractFactory("BadgerForfeitForbidden");
        hook = await Hook.deploy();
        hook = await hook.deployed();

        return { hook, organization, owner, otherAccount }
    }

    describe("BadgerForfeitForbidden.sol", async function () {
        it("call: forfeit()", async function () {
            const { organization, hook, otherAccount, owner } = await loadFixture(deployNewHookOrganization);

            const BEFORE_FORFEIT_SLOT = await organization.BEFORE_FORFEIT();
            const hookConfig = ethers.utils.defaultAbiCoder.encode(["uint256", "bool"], [0, false]);

            const transactions = [
                organization.interface.encodeFunctionData("setHooks", [BEFORE_FORFEIT_SLOT, [hook.address], [true]]),
                organization.interface.encodeFunctionData("configHook", [BEFORE_FORFEIT_SLOT, hook.address, hookConfig]),
                organization.interface.encodeFunctionData("mint", [otherAccount.address, 0, 100, "0x"])
            ]
            await expect(organization.connect(owner).multicall(transactions))

            await expect(organization.connect(otherAccount).forfeit(0, 100, "0x"))
                .to.emit(organization, "TransferSingle").withArgs(otherAccount.address, otherAccount.address, ethers.constants.AddressZero, 0, 100)
        });

        it("revert: forfeit() forfeit forbidden", async function () {
            const { organization, hook, otherAccount, owner } = await loadFixture(deployNewHookOrganization);

            const BEFORE_FORFEIT_SLOT = await organization.BEFORE_FORFEIT();
            const hookConfig = ethers.utils.defaultAbiCoder.encode(["uint256", "bool"], [0, true]);

            /// set hook, configure it, and mint a badge to a user.
            const transactions = [
                organization.interface.encodeFunctionData("setHooks", [BEFORE_FORFEIT_SLOT, [hook.address], [true]]),
                organization.interface.encodeFunctionData("configHook", [BEFORE_FORFEIT_SLOT, hook.address, hookConfig]),
                organization.interface.encodeFunctionData("mint", [otherAccount.address, 0, 100, "0x"])
            ]

            await expect(organization.connect(owner).multicall(transactions))
                .to.emit(organization, "HookUpdated").withArgs(BEFORE_FORFEIT_SLOT, hook.address, true)
                .to.emit(organization, "HookConfigured").withArgs(BEFORE_FORFEIT_SLOT, hookConfig)
                .to.emit(organization, "TransferSingle").withArgs(owner.address, ethers.constants.AddressZero, otherAccount.address, 0, 100);

            await expect(organization.connect(otherAccount).forfeit(0, 100, "0x"))
                .to.be.revertedWith("BadgerForfeitForbidden::execute: Invalid permission to forfeit token.")
        });

        it("call: forfeit() can disable hook", async function () {
            const { organization, hook, otherAccount, owner } = await loadFixture(deployNewHookOrganization);

            const BEFORE_FORFEIT_SLOT = await organization.BEFORE_FORFEIT();
            const hookConfig = ethers.utils.defaultAbiCoder.encode(["uint256", "bool"], [0, true]);

            /// set hook, configure it, and mint a badge to a user.
            const transactions = [
                organization.interface.encodeFunctionData("setHooks", [BEFORE_FORFEIT_SLOT, [hook.address], [true]]),
                organization.interface.encodeFunctionData("configHook", [BEFORE_FORFEIT_SLOT, hook.address, hookConfig]),
                organization.interface.encodeFunctionData("mint", [otherAccount.address, 0, 100, "0x"])
            ]

            await expect(organization.connect(owner).multicall(transactions))
                .to.emit(organization, "HookUpdated").withArgs(BEFORE_FORFEIT_SLOT, hook.address, true)
                .to.emit(organization, "HookConfigured").withArgs(BEFORE_FORFEIT_SLOT, hookConfig)
                .to.emit(organization, "TransferSingle").withArgs(owner.address, ethers.constants.AddressZero, otherAccount.address, 0, 100);

            await organization.setHooks(BEFORE_FORFEIT_SLOT, [hook.address], [false]);

            await expect(organization.connect(otherAccount).forfeit(0, 100, "0x"))
                .to.emit(organization, "TransferSingle").withArgs(otherAccount.address, otherAccount.address, ethers.constants.AddressZero, 0, 100)
        });
    });
});