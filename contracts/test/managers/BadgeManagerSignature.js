const { loadFixture, time } = require("@nomicfoundation/hardhat-network-helpers");
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

    async function deployNewSignatureManagedOrganization() {
        const { organization, owner, otherAccount } = await loadFixture(deployNewOrganization);

        // set organization manager to other account 
        const Manager = await ethers.getContractFactory("BadgerManagerSignature");
        const manager = await Manager.deploy();
        await manager.deployed();

        const config = ethers.utils.defaultAbiCoder.encode(["uint256", "address"], [0, otherAccount.address]);

        const transactions = [
            organization.interface.encodeFunctionData("setManagers(address[],bool[])", [[manager.address], [true]]),
            organization.interface.encodeFunctionData("configManager(address,bytes)", [manager.address, config])
        ]

        await organization.connect(owner).multicall(transactions);

        return { manager, organization, owner, otherAccount }
    }

    describe("BadgerManagerSignature.sol", async function () {
        it("call: mint()", async function () {
            const { manager, organization, otherAccount } = await loadFixture(deployNewSignatureManagedOrganization);

            const [, , random] = await ethers.getSigners();

            /// get current timestamp from ethers
            const _deadline = await time.latest() + 1000;
            const _nonce = 0;
            const _data = "0x";

            /// get signature of mint from otherAccount
            const messageHash = ethers.utils.solidityKeccak256(
                ["address", "uint256", "uint256", "uint256", "uint256", "address"],
                [random.address, 0, 1000, _nonce, _deadline, organization.address]
            );

            const _signature = await otherAccount.signMessage(ethers.utils.arrayify(messageHash));

            expect(await manager.connect(random).mint(
                organization.address, 0, 1000, _data, _signature, _nonce, _deadline
            ))
                .to.emit(organization, "TransferSingle")
                .withArgs(ethers.constants.AddressZero, ethers.constants.AddressZero, otherAccount.address, 0, 1000);
        });

        it("revert: mint() invalid signer", async function () {
            const { manager, organization, owner, otherAccount } = await loadFixture(deployNewSignatureManagedOrganization);

            const [, , random] = await ethers.getSigners();

            /// get current timestamp from ethers
            const _deadline = await time.latest() + 1000;
            const _nonce = 0;
            const _data = "0x";

            /// get signature of mint from otherAccount
            const messageHash = ethers.utils.solidityKeccak256(
                ["address", "uint256", "uint256", "uint256", "uint256", "address"],
                [random.address, 0, 1000, _nonce, _deadline, organization.address]
            );

            const _signature = await owner.signMessage(ethers.utils.arrayify(messageHash));

            await expect(manager.connect(random).mint(
                organization.address, 0, 1000, _data, _signature, _nonce, _deadline
            )).to.be.revertedWith("BadgerManagerSignature::mint: Invalid signer.");
        });

        it("revert: mint() invalid nonce", async function () {
            const { manager, organization, otherAccount } = await loadFixture(deployNewSignatureManagedOrganization);

            const [, , random] = await ethers.getSigners();

            /// get current timestamp from ethers
            const _deadline = await time.latest() + 1000;
            const _nonce = 1;
            const _data = "0x";

            /// get signature of mint from otherAccount
            const messageHash = ethers.utils.solidityKeccak256(
                ["address", "uint256", "uint256", "uint256", "uint256", "address"],
                [random.address, 0, 1000, _nonce, _deadline, organization.address]
            );

            const _signature = await otherAccount.signMessage(ethers.utils.arrayify(messageHash));

            await expect(manager.connect(random).mint(
                organization.address, 0, 1000, _data, _signature, _nonce, _deadline
            )).to.be.revertedWith("BadgerManagerSignature::mint: Invalid nonce.");
        });

        it("revert: mint() invalid deadline", async function () {
            const { manager, organization, otherAccount } = await loadFixture(deployNewSignatureManagedOrganization);

            const [, , random] = await ethers.getSigners();

            /// get current timestamp from ethers
            const _deadline = await time.latest() - 1000;
            const _nonce = 0;
            const _data = "0x";

            /// get signature of mint from otherAccount
            const messageHash = ethers.utils.solidityKeccak256(
                ["address", "uint256", "uint256", "uint256", "uint256", "address"],
                [random.address, 0, 1000, _nonce, _deadline, organization.address]
            );

            const _signature = await otherAccount.signMessage(ethers.utils.arrayify(messageHash));

            await expect(manager.connect(random).mint(
                organization.address, 0, 1000, _data, _signature, _nonce, _deadline
            )).to.be.revertedWith("BadgerManagerSignature::mint: Signature expired.");
        });
    });
});