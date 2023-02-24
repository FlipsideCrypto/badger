const { assert } = require('chai')

var chai = require('chai')
    .use(require('chai-as-promised'))
    .should()

const { ethers } = require("hardhat");

function getManagerKey(badgeId, manager) {
    const encoded = ethers.utils.defaultAbiCoder.encode(["uint256", "address"], [badgeId, manager]);
    return ethers.utils.solidityKeccak256(["bytes"], [encoded]);
}

describe("Badger", function () {
    before(async () => {
        [owner, signer1, userSigner, orgManagerSigner, badgeManagerSigner, sigSigner] = await ethers.getSigners();

        // Deploy the base Badger
        const Badger = await ethers.getContractFactory("Badger");
        badger = await Badger.deploy();
        badger = await badger.deployed();

        // Deploy an Organization for testing through Badger
        const tx = await badger.connect(owner).createOrganization([
            owner.address,
            "baseuri",
            "contractURI",
            "name",
            "symbol",
        ]);
        const receipt = await tx.wait();
        const orgAddress = receipt.events[3].args['organization'];

        // Attach the created Organization to the BadgerOrganization contract
        const BadgerOrganization = await ethers.getContractFactory("BadgerOrganization");
        org = new ethers.Contract(orgAddress, BadgerOrganization.interface, owner);
    });
    
    describe("Badger: Badger.sol", async () => {
        it('Should deploy the Badger contract', async () => {
            badgerState = await badger.organization();
            assert.equal(badgerState.deployer, owner.address);
        });
        
        it('createOrganization() success', async () => {
            assert.equal(await org.owner(), owner.address);
        });
    });

    describe("Badger: BadgerScout.sol", async () => {
        it('setOrganizationURI() success', async () => {
            await org.connect(owner).setOrganizationURI(
                "newURI"
            );
        })

        it('setOrganizationURI() fail: not manager', async () => {
            await org.connect(signer1).setOrganizationURI(
                "newURI"
            ).should.be.revertedWith(
                "BadgerScout::onlyOrganizationManager: Only the Owner or Organization Manager can call this."
            )
        })

        it('setBadge() success', async () => {
            tx = await org.connect(owner).setBadge(
                0,
                false,
                "uri",
                []
            )
            await tx.wait()

            uri = await org.uri(0);

            assert.equal(
                uri,
                "uri"
            );
        })

        it('setBadge() fail: not Manager', async () => {
            await org.connect(signer1).setBadge(
                0,
                false,
                "uri",
                []
            ).should.be.revertedWith("BadgerScout::onlyBadgeManager: Only Managers can call this.")
        })

        it('setBadge() fail: uri cannot be empty', async () => {
            await org.connect(owner).setBadge(
                0,
                false,
                "",
                []
            ).should.be.revertedWith("BadgerScout::setBadge: URI must be set.")
        })

        it('setBadge() success', async () => {
            await org.connect(owner).setBadge(
                0,
                false,
                "uri",
                [badgeManagerSigner.address]
            )
        })

        it('setBadgeURI() success', async () => {
            await org.connect(owner).setBadgeURI(
                0,
                "uri"
            )
        })

        it('setBadgeURI() fail: not manager', async () => {
            await org.connect(signer1).setBadgeURI(
                0,
                "uri"
            ).should.be.revertedWith("BadgerScout::onlyBadgeManager: Only Managers can call this.")
        });

        it('setBadgeURI() fail: uri cannot be empty', async () => {
            await org.connect(owner).setBadgeURI(
                0,
                ""
            ).should.be.revertedWith("BadgerScout::setBadgeURI: URI must be set.")
        });

        it('setManagers() success', async () => {
            tx = await org.connect(owner)['setManagers(uint256,address[],bool[])'](
                0,
                [badgeManagerSigner.address],
                [true]
            )
            await tx.wait()

            key = getManagerKey(0, badgeManagerSigner.address);

            assert.equal(
                await org.managerKeyToIsManager(key),
                true
            );
        })

        it('setManagers() fail: not managers', async () => {
            await org.connect(signer1)['setManagers(uint256,address[],bool[])'](
                0,
                [badgeManagerSigner.address],
                [true]
            ).should.be.revertedWith("BadgerScout::onlyOrganizationManager: Only the Owner or Organization Manager can call this.")
        });

        it('setManagers() fail: arrays not equal length', async () => {
            await org.connect(owner)['setManagers(uint256,address[],bool[])'](
                0,
                [badgeManagerSigner.address],
                [true, false]
            ).should.be.revertedWith("BadgerScout::setManagers: _managers and _isManager must be the same length.")
        });

        it('setManagersBatch() success', async () => {
            tx = await org.connect(owner).setManagersBatch(
                [0, 0],
                [badgeManagerSigner.address, badgeManagerSigner.address],
                [true, false]
            )
            await tx.wait()

            key = getManagerKey(0, badgeManagerSigner.address);

            assert.equal(
                await org.managerKeyToIsManager(key),
                false
            );
        })

        it('setManagersBatch() fail: not manager', async () => {
            await org.connect(signer1).setManagersBatch(
                [0, 0],
                [badgeManagerSigner.address, badgeManagerSigner.address],
                [true, false]
            ).should.be.revertedWith("BadgerScout::onlyOrganizationManager: Only the Owner or Organization Manager can call this.")
        });

        it('setManagersBatch() fail: arrays not equal length', async () => {
            await org.connect(owner).setManagersBatch(
                [0, 0],
                [badgeManagerSigner.address, badgeManagerSigner.address],
                [true]
            ).should.be.revertedWith("BadgerScout::setManagersBatch: _ids, _managers, and _isManager must be the same length.")
        });
    })

    describe("Badger: BadgerOrganization.sol", async () => {
        it("mint() success", async () => {
            await org.connect(owner).mint(
                signer1.address,
                0,
                1,
                "0x"
            )
        })

        it("mint() fail: not manager", async () => {
            await org.connect(signer1).mint(
                signer1.address,
                0,
                1,
                "0x"
            ).should.be.revertedWith("BadgerScout::onlyBadgeManager: Only Managers can call this.")
        });

        it("mintBatch() success", async () => {
            await org.connect(owner).mintBatch(
                [signer1.address, badgeManagerSigner.address],
                0,
                [1, 1],
                "0x"
            )
        })

        it("mintBatch() fail: not manager", async () => {
            await org.connect(signer1).mintBatch(
                [signer1.address, badgeManagerSigner.address],
                0,
                [1, 1],
                "0x"
            ).should.be.revertedWith("BadgerScout::onlyBadgeManager: Only Managers can call this.")
        });

        it("mintBatch() fail: arrays not equal length", async () => {
            await org.connect(owner).mintBatch(
                [signer1.address, badgeManagerSigner.address],
                0,
                [1, 1, 1],
                "0x"
            ).should.be.revertedWith("BadgerOrganization::mintBatch: _tos and _amounts must be the same length.")
        });

        it("mintFullBatch() success", async () => {
            await org.connect(owner).mintFullBatch(
                [signer1.address, badgeManagerSigner.address],
                [0, 0],
                [1, 1],
                "0x"
            )
        })

        it("mintFullBatch() success: delegate", async() => { 
            await org.connect(owner)['setManagers(uint256,address[],bool[])'](
                0,
                [badgeManagerSigner.address],
                [true]
            )

            await org.connect(badgeManagerSigner).mintFullBatch(
                [signer1.address, badgeManagerSigner.address],
                [0, 0],
                [1, 1],
                "0x"
            )
        })

        it("mintFullBatch() fail: not manager", async () => {
            await org.connect(signer1).mintFullBatch(
                [signer1.address, badgeManagerSigner.address],
                [0, 0],
                [1, 1],
                "0x"
            ).should.be.revertedWith("BadgerOrganization::mintFullBatch: Only a Manager of the Badge can mint.")
        });

        it("mintFullBatch() fail: arrays not equal length", async () => {
            await org.connect(owner).mintFullBatch(
                [signer1.address, badgeManagerSigner.address],
                [0, 0],
                [1, 1, 1],
                "0x"
            ).should.be.revertedWith("BadgerOrganization::mintFullBatch: _froms, _ids, and _amounts must be the same length.");
        });

        it("revoke() success", async () => {
            await org.connect(owner).revoke(
                signer1.address,
                0,
                1,
            )
        })

        it("revoke() fail: insufficient balance", async () => {
            await org.connect(owner).revoke(
                signer1.address,
                1000,
                1,
            ).should.be.revertedWith("ERC1155: burn amount exceeds balance")
        });

        it("revoke() fail: not manager", async () => {
            await org.connect(signer1).revoke(
                signer1.address,
                0,
                1,
            ).should.be.revertedWith("BadgerScout::onlyBadgeManager: Only Managers can call this.")
        });

        it('revokeBatch()', async () => {
            // mint 10 badge 0s to signer1
            await org.connect(owner).mint(
                signer1.address,
                0,
                10,
                "0x"
            )

            await org.connect(owner).revokeBatch(
                [signer1.address, badgeManagerSigner.address],
                0,
                [1, 1],
            )
        })

        it("revokeBatch() fail: not manager", async () => {
            await org.connect(signer1).revokeBatch(
                [signer1.address, badgeManagerSigner.address],
                0,
                [1, 1],
            ).should.be.revertedWith("BadgerScout::onlyBadgeManager: Only Managers can call this.")
        });

        it("revokeBatch() fail: arrays not equal length", async () => {
            await org.connect(owner).revokeBatch(
                [signer1.address, badgeManagerSigner.address],
                0,
                [1, 1, 1],
            ).should.be.revertedWith("BadgerOrganization::revokeBatch: _from and _amounts must be the same length.")
        });

        it("revokeFullBatch() success", async () => {
            await org.connect(owner).revokeFullBatch(
                [signer1.address, badgeManagerSigner.address],
                [0, 0],
                [1, 1],
            )
        })

        it("revokeFullBatch() success: delegate", async () => {
            await org.connect(owner)['setManagers(uint256,address[],bool[])'](
                0,
                [badgeManagerSigner.address],
                [true]
            )

            await org.connect(badgeManagerSigner).revokeFullBatch(
                [signer1.address],
                [0],
                [1],
            )
        })

        it('revokeFullBatch() fail: insufficient balance', async () => {
            await org.connect(owner).revokeFullBatch(
                [signer1.address, badgeManagerSigner.address],
                [1000, 1000],
                [1, 1],
            ).should.be.revertedWith("ERC1155: burn amount exceeds balance")
        })

        it("revokeFullBatch() fail: not manager", async () => {
            await org.connect(signer1).revokeFullBatch(
                [signer1.address, badgeManagerSigner.address],
                [0, 0],
                [1, 1],
            ).should.be.revertedWith("BadgerOrganization::revokeFullBatch: Only a Manager of the Badge can revoke.")
        });

        it("revokeFullBatch() fail: arrays not equal length", async () => {
            await org.connect(owner).revokeFullBatch(
                [signer1.address, badgeManagerSigner.address],
                [0, 0],
                [1, 1, 1],
            ).should.be.revertedWith("BadgerOrganization::revokeFullBatch: _froms, _ids, and _amounts must be the same length.")
        });

        it("forfeit() success", async () => {
            await org.connect(signer1).forfeit(
                0,
                1,
                "0x"
            )
        });

        it("forfeit() fail: insufficient balance", async () => {
            await org.connect(signer1).forfeit(
                0,
                10000,
                "0x"
            ).should.be.revertedWith("ERC1155: burn amount exceeds balance")
        })

        it("safeTransferFrom() success", async () => {
            // Set the account bound token to be transferable
            await org.connect(owner).setBadge(
                0,
                false,
                "uri",
                []
            );

            // Try and transfer the account bound token to another account will succeed
            await org.connect(signer1).safeTransferFrom(
                signer1.address,
                userSigner.address,
                0,
                1,
                "0x"
            )
        })

        it('safeTransferFrom() success: manager can transfer account bound', async () => {
            // Set this badge as account bound
            await org.connect(owner).setBadge(
                0,
                true,
                "uri",
                []
            );

            // mint a token to the owner to test transferring
            await org.connect(owner).mint(
                owner.address,
                0,
                2,
                "0x"
            )

            // Try and transfer the account bound token to another account will succeed
            await org.connect(owner).safeTransferFrom(
                owner.address,
                userSigner.address,
                0,
                1,
                "0x"
            )
        })

        it("safeTransferFrom() success: Manager can transfer account bound", async () => {
            // Set this badge as account bound
            await org.connect(owner).setBadge(
                0,
                true,
                "uri",
                []
            );

            // mint a token to the owner to test transferring
            await org.connect(owner).mint(
                badgeManagerSigner.address,
                0,
                2,
                "0x"
            )

            // Set the delegate
            await org.connect(owner)['setManagers(uint256,address[],bool[])'](
                0,
                [badgeManagerSigner.address],
                [true]
            )

            // Try and transfer the account bound token to another account will succeed
            await org.connect(badgeManagerSigner).safeTransferFrom(
                badgeManagerSigner.address,
                userSigner.address,
                0,
                1,
                "0x"
            )
        });

        it("safeTransferFrom() fail: transferring out of contract as user", async () => {
            await org.connect(signer1).safeTransferFrom(
                org.address,
                userSigner.address,
                0,
                1,
                "0x"
            ).should.be.revertedWith("ERC1155: caller is not token owner nor approved")
        })

        it("safeTransferFrom() fail: account bound", async () => {
            // Set this badge as account bound
            await org.connect(owner).setBadge(
                0,
                true,
                "uri",
                []
            );
            // mint a stand in
            await org.connect(owner).mint(
                signer1.address,
                0,
                1,
                "0x"
            )

            // Try and transfer the account bound token to another account will fail
            await org.connect(signer1).safeTransferFrom(
                signer1.address,
                userSigner.address,
                0,
                1,
                "0x"
            ).should.be.revertedWith("BadgerScout::_beforeTokenTransfer: Transfer not ready.")
        })

        it("safeBatchTransferFrom() success", async () => {
            // Set the account bound token to be transferable
            await org.connect(owner).setBadge(
                0,
                false,
                "uri",
                []
            );

            // Try and transfer the account bound token to another account will succeed
            await org.connect(signer1).safeBatchTransferFrom(
                signer1.address,
                userSigner.address,
                [0, 0],
                [1, 1],
                "0x"
            )
        })

        it('safeBatchTransferFrom() success: manager can transfer account bound', async () => {
            // Set this badge as account bound
            await org.connect(owner).setBadge(
                0,
                true,
                "uri",
                []
            );

            // mint a token to the owner to test transferring
            await org.connect(owner).mint(
                owner.address,
                0,
                2,
                "0x"
            )

            // Try and transfer the account bound token to another account will succeed
            await org.connect(owner).safeBatchTransferFrom(
                owner.address,
                userSigner.address,
                [0, 0],
                [1, 1],
                "0x"
            )
        })

        it("safeBatchTransferFrom() success: Manager can transfer account bound", async () => {
            // Set this badge as account bound
            await org.connect(owner).setBadge(
                0,
                true,
                "uri",
                []
            );

            // mint a token to the owner to test transferring
            await org.connect(owner).mint(
                badgeManagerSigner.address,
                0,
                2,
                "0x"
            )

            // Set the delegate
            await org.connect(owner)['setManagers(uint256,address[],bool[])'](
                0,
                [badgeManagerSigner.address],
                [true]
            )

            // Try and transfer the account bound token to another account will succeed
            await org.connect(badgeManagerSigner).safeBatchTransferFrom(
                badgeManagerSigner.address,
                userSigner.address,
                [0, 0],
                [1, 1],
                "0x"
            )
        });

        it("safeBatchTransferFrom() fail: transferring out of contract as user", async () => {
            await org.connect(signer1).safeBatchTransferFrom(
                org.address,
                userSigner.address,
                [0, 0],
                [1, 1],
                "0x"
            ).should.be.revertedWith("ERC1155: caller is not token owner nor approved")
        })

        it("safeBatchTransferFrom() fail: account bound", async () => {
            // Set this badge as account bound
            await org.connect(owner).setBadge(
                0,
                true,
                "uri",
                []
            );

            // mint a stand in
            await org.connect(owner).mint(
                signer1.address,
                0,
                1,
                "0x"
            )

            // Try and transfer the account bound token to another account will fail
            await org.connect(signer1).safeBatchTransferFrom(
                signer1.address,
                userSigner.address,
                [0, 0],
                [1, 1],
                "0x"
            ).should.be.revertedWith("BadgerScout::_beforeTokenTransfer: Transfer not ready.")
        })

        it("uri() success: has badge uri", async () => {
            assert.equal(
                await org.uri(0),
                "uri"
            )
        })

        it("uri() success: no badge uri", async () => {
            assert.equal(
                await org.uri(1),
                "baseuri"
            )
        })

        it('contractURI() success', async () => {
            assert.equal(
                await org.contractURI(),
                "newURI"
            )
        })
    })
})