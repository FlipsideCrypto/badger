const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

async function getEncodedHookConfig(hook, config) {
    const schema = (await hook.CONFIG_SCHEMA()).split(',');
    return ethers.utils.defaultAbiCoder.encode(schema, config);
}
function getOrgManagerKey(manager) {
    const encoded = ethers.utils.defaultAbiCoder.encode(["address"], [manager]);
    return ethers.utils.solidityKeccak256(["bytes"], [encoded]);
}

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

        const Hook = await ethers.getContractFactory("BadgerMintSelf");
        hook = await Hook.deploy();
        hook = await hook.deployed();

        const HOOK_SLOT = await organization.BEFORE_MINT();
        const hookConfig = await getEncodedHookConfig(hook, [0, true]);

        const transactions = [
            organization.interface.encodeFunctionData("setHooks", [HOOK_SLOT, [hook.address], [true]]),
            organization.interface.encodeFunctionData("configHook", [HOOK_SLOT, hook.address, hookConfig]),
        ]

        await expect(organization.connect(owner).multicall(transactions))
            .to.emit(organization, "HookUpdated").withArgs(HOOK_SLOT, hook.address, true)
            .to.emit(organization, "HookConfigured").withArgs(HOOK_SLOT, hookConfig)

        return { hook, organization, owner, otherAccount }
    }

    describe("BadgerMintSelf.sol", async function () {
        it("call: mint() not operator managed", async function () {
            const { organization, owner, otherAccount } = await loadFixture(deployNewHooksOrganization);

            const random = ethers.Wallet.createRandom();

            const SLOT = await organization.BEFORE_MINT();
            const config = await getEncodedHookConfig(hook, [0, false]);

            const transactions = [
                organization.interface.encodeFunctionData("setManagers(address[],bool[])", [[otherAccount.address], [true]]),
                organization.interface.encodeFunctionData("configHook", [SLOT, hook.address, config]),
            ]

            await expect(organization.connect(owner).multicall(transactions))
                .to.emit(organization, "ManagerUpdated").withArgs(getOrgManagerKey(otherAccount.address), true)
                .to.emit(organization, "HookConfigured").withArgs(SLOT, config)

            await expect(organization.connect(otherAccount).mint(random.address, 0, 1000, "0x"))
                .to.emit(organization, "TransferSingle")
                .withArgs(otherAccount.address, ethers.constants.AddressZero, random.address, 0, 1000)
        });

        it("call: mint()", async function () {
            const { organization, owner } = await loadFixture(deployNewHooksOrganization);

            await expect(organization.mint(owner.address, 0, 1000, "0x"))
                .to.emit(organization, "TransferSingle")
                .withArgs(owner.address, ethers.constants.AddressZero, owner.address, 0, 1000)
        });

        it("revert: mint() only to self", async function () {
            const { organization, otherAccount } = await loadFixture(deployNewHooksOrganization);

            await expect(organization.mint(otherAccount.address, 0, 501, "0x"))
                .to.be.revertedWith("BadgerMintSelfOperated::execute: Only mint to self")
        });

    });
});