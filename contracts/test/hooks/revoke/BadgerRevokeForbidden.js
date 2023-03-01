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

        const Hook = await ethers.getContractFactory("BadgerRevokeForbidden");
        hook = await Hook.deploy();
        hook = await hook.deployed();

        const HOOK_SLOT = await organization.BEFORE_TRANSFER();
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

    describe("BadgerRevokeForbidden.sol", async function () {
        it("call: revoke() no hook", async function () {
            const { organization, owner, otherAccount } = await loadFixture(deployNewOrganization);

            const random = ethers.Wallet.createRandom();

            const transactions = [
                organization.interface.encodeFunctionData("mint", [random.address, 0, 1000, "0x"]),
                organization.interface.encodeFunctionData("setManagers(address[],bool[])", [[otherAccount.address], [true]]),
            ];

            await expect(organization.connect(owner).multicall(transactions))
                .to.emit(organization, "TransferSingle").withArgs(owner.address, ethers.constants.AddressZero, random.address, 0, 1000)
                .to.emit(organization, "ManagerUpdated").withArgs(getOrgManagerKey(otherAccount.address), true)

            await expect(organization.connect(otherAccount).revoke(random.address, 0, 1000))
                .to.emit(organization, "TransferSingle").withArgs(otherAccount.address, random.address, ethers.constants.AddressZero, 0, 1000)
        });

        it("revert: revoke() revoke forbidden", async function () {
            const { organization, otherAccount, owner } = await loadFixture(deployNewHooksOrganization);

            const random = ethers.Wallet.createRandom();

            const managerKey = getOrgManagerKey(otherAccount.address);

            const transactions = [
                organization.interface.encodeFunctionData("setManagers(address[],bool[])", [[otherAccount.address], [true]]),
                organization.interface.encodeFunctionData("mint", [random.address, 0, 1000, "0x"]),
            ]

            await expect(organization.connect(owner).multicall(transactions))
                .to.emit(organization, "TransferSingle").withArgs(owner.address, ethers.constants.AddressZero, random.address, 0, 1000)
                .to.emit(organization, "ManagerUpdated").withArgs(managerKey, true)

            await expect(organization.connect(otherAccount).revoke(random.address, 0, 1000))
                .to.be.revertedWith("BadgerRevokeForbidden::execute: Invalid permission to revoke token.")
        });

        it("revert: revoke() not manager", async function () {
            const { organization, hook, otherAccount, owner } = await loadFixture(deployNewHooksOrganization);

            const random = ethers.Wallet.createRandom();

            await expect(organization.mint(random.address, 0, 1000, "0x"))
                .to.emit(organization, "TransferSingle")
                .withArgs(owner.address, ethers.constants.AddressZero, random.address, 0, 1000)

            await expect(organization.connect(otherAccount).revoke(random.address, 0, 1000))
                .to.be.revertedWith("BadgerScout::onlyBadgeManager: Only Managers can call this.");
        });

        it("revert: revoke() is manager", async function () {
            const { organization, otherAccount, owner } = await loadFixture(deployNewHooksOrganization);

            const random = ethers.Wallet.createRandom();

            transactions = [
                organization.interface.encodeFunctionData("setManagers(address[],bool[])", [[otherAccount.address], [true]]),
                organization.interface.encodeFunctionData("mint", [random.address, 0, 1000, "0x"]),
            ]
            
            await expect(organization.connect(owner).multicall(transactions))
                .to.emit(organization, "TransferSingle").withArgs(owner.address, ethers.constants.AddressZero, random.address, 0, 1000)
                .to.emit(organization, "ManagerUpdated").withArgs(getOrgManagerKey(otherAccount.address), true)

            await expect(organization.connect(otherAccount).revoke(random.address, 0, 1000))
                .to.be.revertedWith("BadgerRevokeForbidden::execute: Invalid permission to revoke token.")
        });

        it("call: revoke() disabled hook", async function () {
            const { organization, hook, otherAccount, owner } = await loadFixture(deployNewHooksOrganization);

            const HOOK_SLOT = await organization.BEFORE_TRANSFER();
            const hookConfig = await getEncodedHookConfig(hook, [0, false]);
            const random = ethers.Wallet.createRandom();

            /// disable the hook
            await expect(organization.configHook(HOOK_SLOT, hook.address, hookConfig))
                .to.emit(organization, "HookConfigured").withArgs(HOOK_SLOT, hookConfig)

            const transactions = [
                organization.interface.encodeFunctionData("setManagers(address[],bool[])", [[otherAccount.address], [true]]),
                organization.interface.encodeFunctionData("mint", [random.address, 0, 1000, "0x"]),
            ]

            await expect(organization.connect(owner).multicall(transactions))
                .to.emit(organization, "TransferSingle").withArgs(owner.address, ethers.constants.AddressZero, random.address, 0, 1000)
                .to.emit(organization, "ManagerUpdated").withArgs(getOrgManagerKey(otherAccount.address), true)

            await expect(organization.connect(otherAccount).revoke(random.address, 0, 1000))
                .to.emit(organization, "TransferSingle").withArgs(otherAccount.address, random.address, ethers.constants.AddressZero, 0, 1000)
        });
    });
});