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

    async function deployNewHooksOrganization() {
        const { organization, owner, otherAccount } = await loadFixture(deployNewOrganization);

        const Hook = await ethers.getContractFactory("BadgerHookBlocklist");
        hook = await Hook.deploy();
        hook = await hook.deployed();

        const BlacklistHook = await ethers.getContractFactory("BadgerForfeitForbidden");
        blacklistHook = await BlacklistHook.deploy();
        blacklistHook = await blacklistHook.deployed();

        const GoodHook = await ethers.getContractFactory("BadgerTransferBound");
        goodHook = await GoodHook.deploy();
        goodHook = await goodHook.deployed();

        const BEFORE_SET_SLOT = await organization.BEFORE_SET_HOOK();
        const hookConfig = ethers.utils.defaultAbiCoder.encode(["address"], [blacklistHook.address]);

        const transactions = [
            organization.interface.encodeFunctionData("setHooks", [BEFORE_SET_SLOT, [hook.address], [true]]),
            organization.interface.encodeFunctionData("configHook", [BEFORE_SET_SLOT, hook.address, hookConfig]),
        ]

        await expect(organization.connect(owner).multicall(transactions))
            .to.emit(organization, "HookUpdated").withArgs(BEFORE_SET_SLOT, hook.address, true)
            .to.emit(organization, "HookConfigured").withArgs(BEFORE_SET_SLOT, hookConfig)

        return { hook, blacklistHook, goodHook, organization, owner, otherAccount }
    }

    describe("BadgerHookBlocklist.sol", async function () {
        it("call: setHooks()", async function () {
            const { organization, otherAccount, owner } = await loadFixture(deployNewHooksOrganization);

            const BEFORE_TRANSFER_SLOT = await organization.BEFORE_TRANSFER();

            const hookConfig = ethers.utils.defaultAbiCoder.encode(["uint256", "bool"], [0, true]);

            const transactions = [
                organization.interface.encodeFunctionData("setHooks", [BEFORE_TRANSFER_SLOT, [goodHook.address], [true]]),
                organization.interface.encodeFunctionData("configHook", [BEFORE_TRANSFER_SLOT, goodHook.address, hookConfig]),
            ]

            await expect(organization.connect(owner).multicall(transactions))
                .to.emit(organization, "HookUpdated").withArgs(BEFORE_TRANSFER_SLOT, goodHook.address, true)
                .to.emit(organization, "HookConfigured").withArgs(BEFORE_TRANSFER_SLOT, hookConfig)
        });

        it("revert: setHooks() blocklisted hook", async function () {
            const { organization, hook, blacklistHook, otherAccount, owner } = await loadFixture(deployNewHooksOrganization);

            const BEFORE_FORFEIT_SLOT = await organization.BEFORE_FORFEIT();
            const hookConfig = ethers.utils.defaultAbiCoder.encode(["uint256", "bool"], [0, true]);

            const transactions = [
                organization.interface.encodeFunctionData("setHooks", [BEFORE_FORFEIT_SLOT, [blacklistHook.address], [true]]),
                organization.interface.encodeFunctionData("configHook", [BEFORE_FORFEIT_SLOT, blacklistHook.address, hookConfig]),
            ]

            await expect(organization.connect(owner).multicall(transactions))
                .to.be.revertedWith("BadgerHookBlacklist::execute: Cannot enable blocklisted hook.")
        });
    });
});