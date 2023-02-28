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
// badger configured: 0x56dbdf14

const { time, loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
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
    });

    describe("BadgerOrganization.sol", async function () {
        it("call: mint()", async function () {
            const { organization, owner } = await loadFixture(deployNewOrganization);

            await (
                expect(organization.mint(owner.address, 0, 100, "0x"))
                    .to.emit(organization, "TransferSingle")
                    .withArgs(owner.address, ethers.constants.AddressZero, owner.address, 0, 100)
            );
        });

        it("revert: mint() missing permission", async function () {
            const { organization, otherAccount } = await loadFixture(deployNewOrganization);

            await (
                expect(organization.connect(otherAccount).mint(otherAccount.address, 0, 100, "0x"))
                    .to.be.revertedWith("BadgerScout::onlyBadgeManager: Only Managers can call this.")
            );
        });

        it("call: mintBatch()", async function () {
            const { organization, owner, otherAccount } = await loadFixture(deployNewOrganization);

            await (
                expect(organization.mintBatch([owner.address, otherAccount.address], 1, [100, 200], "0x"))
                    .to.emit(organization, "TransferSingle")
                    .withArgs(owner.address, ethers.constants.AddressZero, owner.address, 1, 100)
            );
        });

        it("revert: mintBatch() missing permission", async function () {
            const { organization, otherAccount } = await loadFixture(deployNewOrganization);

            await (
                expect(organization.connect(otherAccount).mintBatch([otherAccount.address], 1, [100], "0x"))
                    .to.be.revertedWith("BadgerScout::onlyBadgeManager: Only Managers can call this.")
            );
        });

        it("call: revoke()", async function () {
            const { organization, owner, otherAccount } = await loadFixture(deployNewOrganization);

            await organization.mint(otherAccount.address, 0, 100, "0x");

            await (
                expect(organization.revoke(otherAccount.address, 0, 100))
                    .to.emit(organization, "TransferSingle")
                    .withArgs(owner.address, otherAccount.address, ethers.constants.AddressZero, 0, 100)
            );
        });

        it("revert: revoke() missing permission", async function () {
            const { organization, otherAccount } = await loadFixture(deployNewOrganization);

            await (
                expect(organization.connect(otherAccount).revoke(otherAccount.address, 0, 100))
                    .to.be.revertedWith("BadgerScout::onlyBadgeManager: Only Managers can call this.")
            );
        });

        it("call: revokeBatch()", async function () {
            const { organization, owner, otherAccount } = await loadFixture(deployNewOrganization);

            await organization.mintBatch([otherAccount.address], 1, [100], "0x");

            await (
                expect(organization.revokeBatch([otherAccount.address], 1, [100]))
                    .to.emit(organization, "TransferSingle")
                    .withArgs(owner.address, otherAccount.address, ethers.constants.AddressZero, 1, 100)
            );
        });

        it("revert: revokeBatch() missing permission", async function () {
            const { organization, otherAccount } = await loadFixture(deployNewOrganization);

            await (
                expect(organization.connect(otherAccount).revokeBatch([otherAccount.address], 1, [100]))
                    .to.be.revertedWith("BadgerScout::onlyBadgeManager: Only Managers can call this.")
            );
        });

        it("call: forfeit()", async function () {
            const { organization, otherAccount } = await loadFixture(deployNewOrganization);

            await organization.mint(otherAccount.address, 0, 100, "0x");

            await (
                expect(organization.connect(otherAccount).forfeit(0, 100, "0x"))
                    .to.emit(organization, "TransferSingle")
                    .withArgs(otherAccount.address, otherAccount.address, ethers.constants.AddressZero, 0, 100)
            );
        });
    });

    describe("BadgerOrganizationLogic.sol", async function () {
        it("call: setOrganizationURI('placeholder')", async function () {
            const { organization } = await loadFixture(deployNewOrganization);

            await (
                expect(organization.setOrganizationURI("ipfs/newuri"))
                    .to.emit(organization, "OrganizationUpdated")
                    .withArgs("ipfs/newuri")
            );
        });

        // todo: test organization manager success

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

        it("call: setBadgeURI(0, 'managerSuccess')", async function () {
            const { organization, owner, otherAccount } = await loadFixture(deployNewOrganization);

            await organization.connect(owner)['setManagers(uint256,address[],bool[])'](
                0,
                [otherAccount.address],
                [true]
            );

            await (
                expect(organization.connect(otherAccount).setBadgeURI(0, "ipfs/managerSuccess"))
                    .to.emit(organization, "URI")
                    .withArgs("ipfs/managerSuccess", 0)
            );
        });

        it("revert: setBadgeURI(0, '')", async function () {
            const { organization } = await loadFixture(deployNewOrganization);

            await (
                expect(organization.setBadgeURI(0, ""))
                    .to.be.revertedWith("BadgerScout::setBadgeURI: URI must be set.")
            );
        });

        it("revert: setBadgeURI(0, 'placeholder') missing permission", async function () {
            const { organization, otherAccount } = await loadFixture(deployNewOrganization);

            await (
                expect(organization.connect(otherAccount).setBadgeURI(0, "ipfs/newuri"))
                    .to.be.revertedWith("BadgerScout::onlyBadgeManager: Only Managers can call this.")
            );
        });

        it("revert: setManagers(0, [other], [true]) missing permission", async function () {
            const { organization, otherAccount } = await loadFixture(deployNewOrganization);

            await (
                expect(organization.connect(otherAccount)['setManagers(uint256,address[],bool[])'](0, [otherAccount.address], [true]))
                    .to.be.revertedWith("BadgerScout::onlyOrganizationManager: Only the Owner or Organization Manager can call this.")
            );
        });

        it("revert: setManagers(0, [], [true]) arrays not equal", async function () {
            const { organization } = await loadFixture(deployNewOrganization);

            await (
                expect(organization['setManagers(uint256,address[],bool[])'](0, [], [true]))
                    .to.be.revertedWith("BadgerScout::setManagers: _managers and _isManager must be the same length.")
            );
        });

        it("revert: setManagers([other], []) arrays not equal", async function () {
            const { organization, otherAccount } = await loadFixture(deployNewOrganization);

            await (
                expect(organization['setManagers(address[],bool[])']([otherAccount.address], []))
                    .to.be.revertedWith("BadgerScout::setManagers: _managers and _isManager must be the same length.")
            );
        });

        it("call: setManagers(0, [other], [true])", async function () {
            const { organization, otherAccount } = await loadFixture(deployNewOrganization);

            const managerKey = getManagerKey(0, otherAccount.address);

            await (
                expect(organization['setManagers(uint256,address[],bool[])'](
                    0, [otherAccount.address], [true]
                )).to.emit(organization, "ManagerUpdated")
                    .withArgs(managerKey, true)
            );
        });

        it("call: setManagers([other], [true])", async function () {
            const { organization, otherAccount } = await loadFixture(deployNewOrganization);

            const managerKey = getOrgManagerKey(otherAccount.address);

            await (
                expect(organization['setManagers(address[],bool[])'](
                    [otherAccount.address], [true]
                )).to.emit(organization, "ManagerUpdated")
                    .withArgs(managerKey, true)
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

        // configManager
        // it.only("call: configManager(0, owner, 0, true)", async function () {
        //     const { organization, owner, otherAccount, hook } = await loadFixture(deployNewHook);

        //     const managerKey = getManagerKey(0, hook.address);
        //     // tx = await organization.connect(owner)['setManagers(uint256,address[],bool[])'](0, [hook.address], [true])
        //     // tx = await tx.wait();

        //     // await expect(organization['configManager(uint256,address,bytes)'](0, hook.address, "0x"))
        //     //     .to.emit(organization, "ManagerConfigured").withArgs(managerKey, "0x");

        //     const transactions = [
        //         organization.interface.encodeFunctionData('setManagers(uint256,address[],bool[])', [0, [hook.address], [true]]),
        //         organization.interface.encodeFunctionData("configManager(uint256,address,bytes)", [0, hook.address, "0x"])
        //     ]

        //     await expect(organization.connect(owner).multicall(transactions))
        //         .to.emit(organization, "ManagerUpdated").withArgs(managerKey, true)
        //         .to.emit(organization, "ManagerConfigured").withArgs(managerKey, "0x");

        // });

        // configManager

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

            expect(await organization.supportsInterface("0xd2779f52")).to.equal(true);
        });

    });
});