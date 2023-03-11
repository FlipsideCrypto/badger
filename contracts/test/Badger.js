// badger: 0x2f070d13
// org: 0x7a3851dc
// org logic: 0xd2779f52
// badger configured: 0x56dbdf14
// hook: 0x6847c1d5
// manager: 0x56dbdf14
// ierc165: 0x01ffc9a7

const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

function getManagerKey(badgeId, manager) {
    const encoded = ethers.utils.defaultAbiCoder.encode(["uint256", "address"], [badgeId, manager]);
    return ethers.utils.solidityKeccak256(["bytes"], [encoded]);
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

    async function deployNewManagedOrganization() {
        const { organization, owner, otherAccount } = await loadFixture(deployNewOrganization);

        // set organization manager to other account 
        const Manager = await ethers.getContractFactory("BadgerManagerClaimable");
        const manager = await Manager.deploy();
        await manager.deployed();

        return { manager, organization, owner, otherAccount }
    }

    async function deployNewHook() {
        const { organization, owner, otherAccount } = await loadFixture(deployNewOrganization);

        const Hook = await ethers.getContractFactory("BadgerTransferBound");
        hook = await Hook.deploy();
        hook = await hook.deployed();

        return { hook, organization, owner, otherAccount }
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
            expect(await organization.contractURI()).to.equal("ipfs/org");
        });

        it("call: supportsInterface(IBadger || IERC165)", async function () {
            const { badgerFactory } = await loadFixture(deployBadgerFactory);

            expect(await badgerFactory.supportsInterface("0x01ffc9a7")).to.equal(true);
            expect(await badgerFactory.supportsInterface("0x2f070d13")).to.equal(true);
        });

        it("revert: constructor(0x00) cannot be zero address", async function () {
            const BadgerFactory = await ethers.getContractFactory("Badger");

            await expect(BadgerFactory.deploy(ethers.constants.AddressZero))
                .to.be.revertedWith("Badger::constructor: _implementation cannot be the zero address.");
        });
    });

    describe("BadgerOrganization.sol", async function () {
        it("call: mint()", async function () {
            const { organization, owner } = await loadFixture(deployNewOrganization);

            await expect(organization.mint(owner.address, 0, 100, "0x"))
                .to.emit(organization, "TransferSingle")
                .withArgs(owner.address, ethers.constants.AddressZero, owner.address, 0, 100)
        });

        it("revert: mint() missing permission", async function () {
            const { organization, otherAccount } = await loadFixture(deployNewOrganization);

            await expect(organization.connect(otherAccount).mint(otherAccount.address, 0, 100, "0x"))
                .to.be.revertedWith("BadgerScout::onlyBadgeManager: Only Managers can call this.")
        });

        it("call: mintBatch()", async function () {
            const { organization, owner, otherAccount } = await loadFixture(deployNewOrganization);

            await expect(organization.mintBatch([owner.address, otherAccount.address], 1, [100, 200], "0x"))
                .to.emit(organization, "TransferSingle")
                .withArgs(owner.address, ethers.constants.AddressZero, owner.address, 1, 100)
        });

        it("revert: mintBatch() missing permission", async function () {
            const { organization, otherAccount } = await loadFixture(deployNewOrganization);

            await expect(organization.connect(otherAccount).mintBatch([otherAccount.address], 1, [100], "0x"))
                .to.be.revertedWith("BadgerScout::onlyBadgeManager: Only Managers can call this.")
        });

        it("revert: mintBatch() invalid array lengths", async function () {
            const { organization, otherAccount } = await loadFixture(deployNewOrganization);

            await expect(organization.mintBatch([otherAccount.address], 1, [100, 100], "0x"))
                .to.be.revertedWith("BadgerOrganization::mintBatch: _tos and _amounts must be the same length.")
        });

        it("call: revoke()", async function () {
            const { organization, owner, otherAccount } = await loadFixture(deployNewOrganization);

            await organization.mint(otherAccount.address, 0, 100, "0x");

            await expect(organization.revoke(otherAccount.address, 0, 100))
                .to.emit(organization, "TransferSingle")
                .withArgs(owner.address, otherAccount.address, ethers.constants.AddressZero, 0, 100)
        });

        it("revert: revoke() missing permission", async function () {
            const { organization, otherAccount } = await loadFixture(deployNewOrganization);

            await expect(organization.connect(otherAccount).revoke(otherAccount.address, 0, 100))
                .to.be.revertedWith("BadgerScout::onlyBadgeManager: Only Managers can call this.")
        });

        it("call: revokeBatch()", async function () {
            const { organization, owner, otherAccount } = await loadFixture(deployNewOrganization);

            await organization.mintBatch([otherAccount.address], 1, [100], "0x");

            await expect(organization.revokeBatch([otherAccount.address], 1, [100]))
                .to.emit(organization, "TransferSingle")
                .withArgs(owner.address, otherAccount.address, ethers.constants.AddressZero, 1, 100)
        });

        it("revert: revokeBatch() missing permission", async function () {
            const { organization, otherAccount } = await loadFixture(deployNewOrganization);

            await expect(organization.connect(otherAccount).revokeBatch([otherAccount.address], 1, [100]))
                .to.be.revertedWith("BadgerScout::onlyBadgeManager: Only Managers can call this.")
        });

        it("revert: revokeBatch() invalid array lengths", async function () {
            const { organization, otherAccount } = await loadFixture(deployNewOrganization);

            await expect(organization.revokeBatch([otherAccount.address], 1, [100, 200]))
                .to.be.revertedWith("BadgerOrganization::revokeBatch: _from and _amounts must be the same length.")
        });

        it("call: forfeit()", async function () {
            const { organization, otherAccount } = await loadFixture(deployNewOrganization);

            await organization.mint(otherAccount.address, 0, 100, "0x");

            await expect(organization.connect(otherAccount).forfeit(0, 100, "0x"))
                .to.emit(organization, "TransferSingle")
                .withArgs(otherAccount.address, otherAccount.address, ethers.constants.AddressZero, 0, 100)
        });

        it("call: uri()", async function () {
            const { organization } = await loadFixture(deployNewOrganization);

            expect(await organization.uri(0)).to.equal("ipfs/uri/{id}/");
        });
    });

    describe("BadgerOrganizationLogic.sol", async function () {
        it("call: setOrganizationURI('placeholder')", async function () {
            const { organization } = await loadFixture(deployNewOrganization);

            await expect(organization.setOrganizationURI("ipfs/newuri"))
                .to.emit(organization, "OrganizationUpdated")
                .withArgs("ipfs/newuri")
        });

        // todo: test organization manager success

        it("revert: setOrganizationURI('')", async function () {
            const { organization } = await loadFixture(deployNewOrganization);

            await expect(organization.setOrganizationURI(""))
                .to.be.revertedWith("BadgerScout::setOrganizationURI: URI must be set.")
        });

        it("revert: setOrganizationURI('placeholder') missing permission", async function () {
            const { organization, otherAccount } = await loadFixture(deployNewOrganization);

            await expect(organization.connect(otherAccount).setOrganizationURI("ipfs/newuri"))
                .to.be.revertedWith("BadgerScout::onlyOrganizationManager: Only the Owner or Organization Manager can call this.")
        });

        it("call: setBadgeURI(0, 'placeholder')", async function () {
            const { organization } = await loadFixture(deployNewOrganization);

            await (
                expect(organization.setBadgeURI(0, "ipfs/newuri"))
                    .to.emit(organization, "URI")
                    .withArgs("ipfs/newuri", 0)
            );

            expect(await organization.uri(0)).to.equal("ipfs/newuri");
        });

        it("call: setBadgeURI(0, 'managerSuccess')", async function () {
            const { organization, owner, otherAccount } = await loadFixture(deployNewOrganization);

            await organization.connect(owner)['setManagers(uint256,address[],bool[])'](
                0,
                [otherAccount.address],
                [true]
            );

            await expect(organization.connect(otherAccount).setBadgeURI(0, "ipfs/managerSuccess"))
                .to.emit(organization, "URI")
                .withArgs("ipfs/managerSuccess", 0)

            expect(await organization.uri(0)).to.equal("ipfs/managerSuccess");
        });

        it("revert: setBadgeURI(0, '')", async function () {
            const { organization } = await loadFixture(deployNewOrganization);

            expect(organization.setBadgeURI(0, ""))
                .to.be.revertedWith("BadgerScout::setBadgeURI: URI must be set.")
        });

        it("revert: setBadgeURI(0, 'placeholder') missing permission", async function () {
            const { organization, otherAccount } = await loadFixture(deployNewOrganization);

            expect(organization.connect(otherAccount).setBadgeURI(0, "ipfs/newuri"))
                .to.be.revertedWith("BadgerScout::onlyBadgeManager: Only Managers can call this.")
        });

        it("revert: setManagers(0, [other], [true]) missing permission", async function () {
            const { organization, otherAccount } = await loadFixture(deployNewOrganization);

            await expect(organization.connect(otherAccount)['setManagers(uint256,address[],bool[])'](0, [otherAccount.address], [true]))
                .to.be.revertedWith("BadgerScout::onlyOrganizationManager: Only the Owner or Organization Manager can call this.")
        });

        it("revert: setManagers(0, [], [true]) arrays not equal", async function () {
            const { organization } = await loadFixture(deployNewOrganization);

            await expect(organization['setManagers(uint256,address[],bool[])'](0, [], [true]))
                .to.be.revertedWith("BadgerScout::setManagers: _managers and _isManager must be the same length.")
        });

        it("revert: setManagers([other], []) arrays not equal", async function () {
            const { organization, otherAccount } = await loadFixture(deployNewOrganization);

            await expect(organization['setManagers(address[],bool[])']([otherAccount.address], []))
                .to.be.revertedWith("BadgerScout::setManagers: _managers and _isManager must be the same length.")
        });

        it("revert: setManagers([other], [true]) missing permission", async function () {
            const { organization, otherAccount } = await loadFixture(deployNewOrganization);

            await expect(organization.connect(otherAccount)['setManagers(address[],bool[])']([otherAccount.address], [true]))
                .to.be.revertedWith("Ownable: caller is not the owner")
        });

        it("revert: setManagers([address0], [true])", async function () {
            const { organization } = await loadFixture(deployNewOrganization);

            await expect(organization['setManagers(address[],bool[])']([ethers.constants.AddressZero], [true]))
                .to.be.revertedWith("BadgerScout::setManagers: Manager cannot be the zero address.")
        });

        it("revert: setManagers(0, [address0], [true])", async function () {
            const { organization } = await loadFixture(deployNewOrganization);

            await expect(organization['setManagers(uint256,address[],bool[])'](0, [ethers.constants.AddressZero], [true]))
                .to.be.revertedWith("BadgerScout::setManagers: Manager cannot be the zero address.")
        });

        it("call: setManagers(0, [other], [true])", async function () {
            const { organization, otherAccount } = await loadFixture(deployNewOrganization);

            const managerKey = getManagerKey(0, otherAccount.address);

            await (
                expect(organization['setManagers(uint256,address[],bool[])'](
                    0, [otherAccount.address], [true]
                )).to.emit(organization, "ManagerUpdated")
                    .withArgs(managerKey, otherAccount.address, true)
            );
        });

        it("call: setManagers([other], [true])", async function () {
            const { organization, otherAccount } = await loadFixture(deployNewOrganization);

            const managerKey = getOrgManagerKey(otherAccount.address);

            await (
                expect(organization['setManagers(address[],bool[])'](
                    [otherAccount.address], [true]
                )).to.emit(organization, "ManagerUpdated")
                    .withArgs(managerKey, otherAccount.address, true)
            );
        });

        // setHooks
        it("revert: setHooks(0, [other], [true]) missing permission", async function () {
            const { organization, hook, otherAccount } = await loadFixture(deployNewHook);

            const slot = ethers.utils.solidityKeccak256(["uint256", "address"], [0, hook.address]);

            await (
                expect(organization.connect(otherAccount).setHooks(slot, [hook.address], [true]))
                    .to.be.revertedWith("BadgerScout::onlyOrganizationManager: Only the Owner or Organization Manager can call this.")
            );
        });

        it("revert: setHooks(0, [other], [true]) arrays wrong length", async function () {
            const { organization, hook, owner } = await loadFixture(deployNewHook);

            const target = ethers.Wallet.createRandom();

            const slot = ethers.utils.solidityKeccak256(["uint256", "address"], [0, target.address]);

            await (
                expect(organization.connect(owner).setHooks(slot, [target.address], [true, true]))
                    .to.be.revertedWith("BadgerScout::setHooks: _hooks and _isHook must be the same length.")
            );
        });

        it("revert: setHooks(0, [address0], [true]) zero address", async function () {
            const { organization, owner } = await loadFixture(deployNewOrganization);

            const slot = ethers.utils.solidityKeccak256(["uint256", "address"], [0, ethers.constants.AddressZero]);

            await expect(organization.connect(owner).setHooks(slot, [ethers.constants.AddressZero], [true]))
                .to.be.revertedWith("BadgerScout::setHooks: Hook cannot be the zero address.")
        });

        it("revert: setHooks(0, [other], [true]) not a contract", async function () {
            const { organization, otherAccount } = await loadFixture(deployNewOrganization);

            const slot = ethers.utils.solidityKeccak256(["uint256", "address"], [0, otherAccount.address]);

            await expect(organization.setHooks(slot, [otherAccount.address], [true]))
                .to.be.revertedWith("BadgerOrganizationHooked::_configManager: Manager is not a contract.")
        });

        it("call: setHooks(0, [other], [true])", async function () {
            const { organization, hook, owner } = await loadFixture(deployNewHook);

            const slot = ethers.utils.solidityKeccak256(["uint256", "address"], [0, hook.address]);

            const hookConfig = ethers.utils.defaultAbiCoder.encode(["uint256", "bool"], [0, true]);

            const transactionsData = [
                organization.interface.encodeFunctionData("setHooks", [slot, [hook.address], [true]]),
                organization.interface.encodeFunctionData("configHook", [slot, hook.address, hookConfig])
            ];

            await expect(organization.connect(owner).multicall(transactionsData))
                .to.emit(organization, "HookUpdated").withArgs(slot, hook.address, true)
                .to.emit(organization, "HookConfigured").withArgs(slot, hookConfig);
        });

        // configHook
        it("revert: configHook(slot, hook, '0x')", async function () {
            const { organization, hook, owner } = await loadFixture(deployNewHook);

            const slot = ethers.utils.solidityKeccak256(["uint256", "address"], [0, hook.address]);

            await expect(organization.connect(owner).configHook(slot, hook.address, "0x"))
                .to.be.revertedWith("BadgerOrganizationHooked::_configHook: Hook is not enabled.")
        });

        it("revert: configHook(0, hook, config) missing permission", async function () {
            const { organization, hook, otherAccount } = await loadFixture(deployNewHook);

            const slot = ethers.utils.solidityKeccak256(["uint256", "address"], [0, hook.address]);

            const hookConfig = ethers.utils.defaultAbiCoder.encode(["uint256", "bool"], [0, true]);

            await expect(organization.connect(otherAccount).configHook(slot, hook.address, hookConfig))
                .to.be.revertedWith("BadgerScout::onlyOrganizationManager: Only the Owner or Organization Manager can call this.")
        });

        // configManager
        it("call: configManager(manager, config)", async function () {
            const { manager, organization, owner } = await loadFixture(deployNewManagedOrganization);

            const managerKey = getOrgManagerKey(manager.address)
            const config = ethers.utils.defaultAbiCoder.encode(["uint256", "uint256"], [0, 1000]);

            const transactions = [
                organization.interface.encodeFunctionData("setManagers(address[],bool[])", [[manager.address], [true]]),
                organization.interface.encodeFunctionData("configManager(address,bytes)", [manager.address, config])
            ]

            await expect(organization.connect(owner).multicall(transactions))
                .to.emit(organization, "ManagerConfigured").withArgs(managerKey, config);
        });

        it("call: configManager(0, manager, config)", async function () {
            const { manager, organization, owner } = await loadFixture(deployNewManagedOrganization);

            const managerKey = getManagerKey(0, manager.address)
            const config = ethers.utils.defaultAbiCoder.encode(["uint256", "uint256"], [0, 1000]);

            const transactions = [
                organization.interface.encodeFunctionData("setManagers(uint256,address[],bool[])", [0, [manager.address], [true]]),
                organization.interface.encodeFunctionData("configManager(uint256,address,bytes)", [0, manager.address, config])
            ]

            await expect(organization.connect(owner).multicall(transactions))
                .to.emit(organization, "ManagerConfigured").withArgs(managerKey, config);
        });

        it("revert: configManager(manager, config) missing permission", async function () {
            const { manager, organization, otherAccount } = await loadFixture(deployNewManagedOrganization);

            const config = ethers.utils.defaultAbiCoder.encode(["uint256", "uint256"], [0, 1000]);

            await expect(organization.connect(otherAccount)["configManager(address,bytes)"](manager.address, config))
                .to.be.revertedWith("BadgerScout::onlyOrganizationManager: Only the Owner or Organization Manager can call this.")
        });

        it("revert: configManager(0, manager, config) missing permission", async function () {
            const { manager, organization, otherAccount } = await loadFixture(deployNewManagedOrganization);

            const config = ethers.utils.defaultAbiCoder.encode(["uint256", "uint256"], [0, 1000]);

            await expect(organization.connect(otherAccount)["configManager(uint256,address,bytes)"](0, manager.address, config))
                .to.be.revertedWith("BadgerScout::onlyBadgeManager: Only Managers can call this.")
        });

        it("revert: configManager(manager, config) Manager not enabled", async function () {
            const { manager, organization } = await loadFixture(deployNewManagedOrganization);

            const config = ethers.utils.defaultAbiCoder.encode(["uint256", "uint256"], [0, 1000]);

            await expect(organization["configManager(address,bytes)"](manager.address, config))
                .to.be.revertedWith("BadgerOrganizationHooked::_configManager: Manager is not enabled.")
        });


        it("revert: configManager(manager, config) Not configurable module", async function () {
            const { manager, organization, otherAccount } = await loadFixture(deployNewManagedOrganization);

            const config = ethers.utils.defaultAbiCoder.encode(["uint256", "uint256"], [0, 1000]);

            await expect(organization.connect(otherAccount)["configManager(address,bytes)"](manager.address, config))
                .to.be.revertedWith("BadgerScout::onlyOrganizationManager: Only the Owner or Organization Manager can call this.")
        });

        it("revert: configManager(manager, config) Manager not contract", async function () {
            const { owner, organization, otherAccount } = await loadFixture(deployNewManagedOrganization);

            const config = ethers.utils.defaultAbiCoder.encode(["uint256", "uint256"], [0, 1000]);

            const transactions = [
                organization.interface.encodeFunctionData("setManagers(address[],bool[])", [[otherAccount.address], [true]]),
                organization.interface.encodeFunctionData("configManager(address,bytes)", [otherAccount.address, config])
            ]

            await expect(organization.connect(owner).multicall(transactions))
                .to.be.revertedWith("BadgerOrganizationHooked::_configManager: Manager is not a contract.")
        });

        it("revert: configManager(manager, config) Manager not configured module", async function () {
            const { badgerFactory, owner, organization } = await loadFixture(deployNewOrganization);

            const config = ethers.utils.defaultAbiCoder.encode(["uint256", "uint256"], [0, 1000]);

            const transactions = [
                organization.interface.encodeFunctionData("setManagers(address[],bool[])", [[badgerFactory.address], [true]]),
                organization.interface.encodeFunctionData("configManager(address,bytes)", [badgerFactory.address, config])
            ]

            await expect(organization.connect(owner).multicall(transactions))
                .to.be.revertedWith("BadgerOrganizationHooked::_configManager: Manager is not a configured Badger module.")
        });

        // isOrganizationManager
        it("call: isOrganizationManager(owner)", async function () {
            const { organization, owner, otherAccount } = await loadFixture(deployNewOrganization);

            const random = ethers.Wallet.createRandom();
            const tx = await organization.connect(owner)['setManagers(address[],bool[])']([otherAccount.address], [true])
            await tx.wait();

            expect(await organization.isOrganizationManager(owner.address)).to.be.true;
            expect(await organization.isOrganizationManager(otherAccount.address)).to.be.true;
            expect(await organization.isOrganizationManager(random.address)).to.be.false;
        });

        // isBadgeManager
        it("call: isBadgeManager(0, owner)", async function () {
            const { organization, owner, otherAccount } = await loadFixture(deployNewOrganization);

            const tx = await organization.connect(owner)['setManagers(uint256,address[],bool[])'](0, [otherAccount.address], [true])
            await tx.wait();

            const random = ethers.Wallet.createRandom();

            expect(await organization.isBadgeManager(0, owner.address)).to.be.true;
            expect(await organization.isBadgeManager(0, otherAccount.address)).to.be.true;
            expect(await organization.isBadgeManager(0, random.address)).to.be.false;
        });

        // supportsInterface
        it("call: supportsInterface(0xd2779f52)", async function () {
            const { organization } = await loadFixture(deployNewOrganization);

            expect(await organization.supportsInterface("0x01ffc9a7")).to.equal(true);
            expect(await organization.supportsInterface("0xd2779f52")).to.equal(true);
            expect(await organization.supportsInterface("0x7a3851dc")).to.equal(true);
        });

        it("revert: initialize(0) already initialized", async function () {
            const { organization, owner } = await loadFixture(deployNewOrganization);

            org = {
                deployer: owner.address,
                uri: "x",
                organizationURI: "x",
                name: "x",
                symbol: "X"
            }

            await expect(organization.initialize(org)).to.be.revertedWith("Initializable: contract is already initialized");
        });
    });

    describe("BadgerHooked.sol", async function () {
        it("call: getHooks(slot):", async function () {
            const { organization, hook, owner } = await loadFixture(deployNewHook);

            const slot = ethers.utils.solidityKeccak256(["uint256", "address"], [0, hook.address]);

            await organization.connect(owner).setHooks(slot, [hook.address], [true]);

            expect(await organization.getHooks(slot)).to.deep.equal([hook.address]);
        });

        it("call: setHook(slot, hook, false)", async function () {
            const { organization, hook, owner } = await loadFixture(deployNewHook);

            const slot = ethers.utils.solidityKeccak256(["uint256", "address"], [0, hook.address]);

            await organization.connect(owner).setHooks(slot, [hook.address], [false])

            expect(await organization.getHooks(slot)).to.deep.equal([]);
        });

        it("revert: setHook(slot, random, true)", async function () {
            const { organization, owner } = await loadFixture(deployNewHook);

            const slot = ethers.utils.solidityKeccak256(["uint256", "address"], [0, organization.address]);

            await expect(organization.connect(owner).setHooks(slot, [organization.address], [true]))
                .to.be.revertedWith("BadgerHooks::_setHook: Hook does not implement IBadgerHook.")
        });

        it("revert: mint() Transfer bound", async function () {
            const { organization, hook, otherAccount, owner } = await loadFixture(deployNewHook);

            /// Make token transfer bound
            const BEFORE_TRANSFER_SLOT = await organization.BEFORE_TRANSFER();
            const hookConfig = ethers.utils.defaultAbiCoder.encode(["uint256", "bool"], [0, true]);

            /// set transfer bound hook, configure it, and mint a badge to a user.
            const transactions = [
                organization.interface.encodeFunctionData("setHooks", [BEFORE_TRANSFER_SLOT, [hook.address], [true]]),
                organization.interface.encodeFunctionData("configHook", [BEFORE_TRANSFER_SLOT, hook.address, hookConfig]),
                organization.interface.encodeFunctionData("mint", [otherAccount.address, 0, 100, "0x"])
            ]

            /// Execute the setup transactions
            await expect(organization.connect(owner).multicall(transactions))
                .to.emit(organization, "HookUpdated").withArgs(BEFORE_TRANSFER_SLOT, hook.address, true)
                .to.emit(organization, "HookConfigured").withArgs(BEFORE_TRANSFER_SLOT, hookConfig)
                .to.emit(organization, "TransferSingle").withArgs(owner.address, ethers.constants.AddressZero, otherAccount.address, 0, 100)

            /// See if transfer bound works as expected
            await expect(organization.connect(otherAccount).safeTransferFrom(otherAccount.address, owner.address, 0, 100, "0x"))
                .to.be.revertedWith("BadgerTransferBound::execute: Invalid permission to transfer token.")
        });

        it("call: supportsInterface(0x6847c1d5)", async function () {
            const { hook } = await loadFixture(deployNewHook);

            expect(await hook.supportsInterface("0x7cc2d017")).to.equal(false);
            expect(await hook.supportsInterface("0x6847c1d5")).to.equal(true); //IBadgerHook interface
            expect(await hook.supportsInterface("0x01ffc9a7")).to.equal(true); // IERC165
            expect(await hook.supportsInterface("0x56dbdf14")).to.equal(true); // IBadgerConfigured
        });
    });
});