const { assert } = require('chai')

var chai = require('chai')
    .use(require('chai-as-promised'))
    .should()

const { ethers } = require("hardhat");

describe("Badger", function () {
    before(async () => {
        [owner, signer1, userSigner, leaderSigner, sigSigner] = await ethers.getSigners();

        // Deploy the base Organization
        const BadgerOrganization = await ethers.getContractFactory("BadgerOrganization");
        organizationMaster = await BadgerOrganization.deploy();
        organizationMaster = await organizationMaster.deployed();

        // Deploy the base Badger
        const Badger = await ethers.getContractFactory("Badger");
        badger = await Badger.deploy(organizationMaster.address);
        badger = await badger.deployed();

        const Mock1155 = await ethers.getContractFactory("MockERC1155");
        mock1155 = await Mock1155.deploy("testuri");
        mock1155 = await mock1155.deployed();

        const Mock20 = await ethers.getContractFactory("MockERC20");
        mock20 = await Mock20.deploy("testtoken", "test");
        mock20 = await mock20.deployed();

        const Mock721 = await ethers.getContractFactory("MockERC721");
        mock721 = await Mock721.deploy("name", "symbol");
        mock721 = await mock721.deployed();

        // Deploy an Organization for testing through Badger
        childOrganizationTx = await badger.connect(owner).createOrganization(
            organizationMaster.address,
            owner.address,
            "baseuri",
            "contractURI",
            "name",
            "symbol",
        );
        childOrganizationTx = await childOrganizationTx.wait();

        childOrganizationAddress = childOrganizationTx.events[4].args['organization']
        childOrganization = await organizationMaster.attach(childOrganizationAddress);

        assert.equal(await childOrganization.owner(), owner.address);

        const DOLPHIN_ETH = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

        paymentKeyETH = ethers.utils.solidityKeccak256(
            ["address", "uint256"],
            [DOLPHIN_ETH, 0]
        )

        paymentKey20 = ethers.utils.solidityKeccak256(
            ["address", "uint256"],
            [mock20.address, 0]
        )

        // bytes32 encode token address and token id using the contract and use as paymentKey
        paymentKey1155 = ethers.utils.solidityKeccak256(
            ["address", "uint256"],
            [mock1155.address, 0]
        );

        paymentKey721 = ethers.utils.solidityKeccak256(
            ["address", "uint256"],
            [mock721.address, 0]
        );

        paymentAmount = 0;

        paymentTokenETH = [
            paymentKeyETH,
            ethers.utils.parseEther("1")
        ]

        paymentToken20 = [
            paymentKey20,
            1
        ]

        paymentToken1155 = [
            paymentKey1155,
            paymentAmount
        ]

        paymentToken721 = [
            paymentKey721,
            1
        ]

    });

    describe("Badger: Badger.sol", async () => {
        it('Should deploy the Badger contract', async () => {
            assert.equal(await badger.owner(), owner.address);
        });

        // createOrganization() tests
        it('createOrganization() success', async () => {
            cloneTx = await badger.connect(owner).createOrganization(
                organizationMaster.address,
                owner.address,
                "uri",
                "contractURI",
                "name",
                "symbol",
            );
            cloneTx = await cloneTx.wait();

            organizationAddress = cloneTx.events[4].args['organization']
            organization = await organizationMaster.attach(organizationAddress);

            assert.equal(await organization.owner(), owner.address);
        });

        it('createOrganization() success: payable', async () => {
            // mint 10 of the mock1155 to signer1
            await mock1155.connect(owner).mint(signer1.address, 0, 10, "0x");

            // set the new version using an 1155 as payment
            await badger.connect(owner).setVersion(
                organizationMaster.address,
                owner.address,
                mock1155.address,
                0,
                10,
                false
            );

            transferData = ethers.utils.defaultAbiCoder.encode(
                ["address"],
                [organizationMaster.address]
            )

            // transfer the 1155 into the contract
            await mock1155.connect(signer1).safeTransferFrom(
                signer1.address, 
                badger.address, 
                0, 
                10, 
                transferData
            );

            // create the organization
            cloneTx = await badger.connect(signer1).createOrganization(
                organizationMaster.address,
                owner.address,
                "uri",
                "contractURI",
                "name",
                "symbol",
            );
            cloneTx = await cloneTx.wait();

            organizationAddress = cloneTx.events[4].args['organization']
            organization = await organizationMaster.attach(organizationAddress);

            assert.equal(await organization.owner(), owner.address);
        })

        it("createOrganization() fail: insufficient funding", async() => { 
            // create the organization
            await badger.connect(owner).createOrganization(
                organizationMaster.address,
                owner.address,
                "uri",
                "contractURI",
                "name",
                "symbol",
            ).should.be.rejected;
        })

        it("onERC1155Received() fail: invalid payment token", async() => {
            const Mock1155 = await ethers.getContractFactory("MockERC1155");
            mock11552 = await Mock1155.connect(leaderSigner).deploy("testuri");
            mock11552 = await mock11552.deployed();

            // transfering fails
            transferData = ethers.utils.defaultAbiCoder.encode(
                ["address"],
                [organizationMaster.address]
                )

            // mint the 11552 to signer1
            await mock11552.connect(owner).mint(signer1.address, 0, 10, "0x");

            // make sure the two 1155 contracts arent equal
            assert.notEqual(mock1155.address, mock11552.address);

            // transfer the 1155 into the contract
            await mock11552.connect(signer1).safeTransferFrom(
                signer1.address, 
                badger.address, 
                0, 
                10, 
                transferData
            ).should.be.revertedWith("Badger::onERC1155Received: Invalid license key.");
        })
    });

    describe('Badger: BadgerVersions.sol', async () => {
        // setVersion() tests
        it('setVersion() success', async () => {
            await badger.connect(owner).setVersion(
                organizationMaster.address,
                owner.address,
                "0x0000000000000000000000000000000000000000",
                0,
                0,
                false
            );
        });

        it('setVersion() success: exogenous', async () => {
            await badger.connect(sigSigner).setVersion(
                "0x0000000000000000000000000000000000000012",
                sigSigner.address,
                "0x0000000000000000000000000000000000000000",
                0,
                0,
                false
            );

            // setting payment token fails
            await badger.connect(sigSigner).setVersion(
                "0x0000000000000000000000000000000000000012",
                sigSigner.address,
                "0x0000000000000000000000000000000000000000",
                1,
                0,
                true
            ).should.be.rejectedWith("BadgerVersions::_setVersion: You do not have permission to set a payment token.");
        });

        it('setVersion() fail: not owner', async () => {
            await badger.connect(signer1).setVersion(
                organizationMaster.address,
                owner.address,
                "0x0000000000000000000000000000000000000000",
                0,
                0,
                false
            ).should.be.revertedWith("BadgerVersions::_setVersion: You do not have permission to edit this version.")
        })

        it('setVersion() fail: locked', async () => {
            await badger.connect(owner).setVersion(
                organizationMaster.address,
                owner.address,
                "0x0000000000000000000000000000000000000000",
                0,
                0,
                true
            );

            await badger.connect(owner).setVersion(
                organizationMaster.address,
                owner.address,
                "0x0000000000000000000000000000000000000000",
                0,
                0,
                false
            ).should.be.revertedWith("BadgerVersions::_setVersion: Cannot update a locked version.");
        })

        it('setVersion() fail: not allowed to set payment token', async () => {
            await badger.connect(signer1).setVersion(
                "0x0000000000000000000000000000000000000001",
                owner.address,
                "0x0000000000000000000000000000000000000001",
                0,
                0,
                false
            ).should.be.revertedWith("BadgerVersions::_setVersion: You do not have permission to set a payment token.")

            await badger.connect(signer1).setVersion(
                "0x0000000000000000000000000000000000000001",
                owner.address,
                "0x0000000000000000000000000000000000000000",
                1,
                0,
                false
            ).should.be.revertedWith("BadgerVersions::_setVersion: You do not have permission to set a payment token.")

            await badger.connect(signer1).setVersion(
                "0x0000000000000000000000000000000000000001",
                owner.address,
                "0x0000000000000000000000000000000000000000",
                0,
                1,
                false
            ).should.be.revertedWith("BadgerVersions::_setVersion: You do not have permission to set a payment token.")
        })

        // getVersionKey() tests
        it('getVersionKey() success', async () => {
            assert.equal(
                await badger.getVersionKey(
                    organizationMaster.address,
                ),
                "0xa86d54e9aab41ae5e520ff0062ff1b4cbd0b2192bb01080a058bb170d84e6457"
            );
        });

        // getLicenseKey() tests
        it('getLicenseKey() success', async () => {
            assert.equal(
                await badger.getLicenseKey(
                    "0xa86d54e9aab41ae5e520ff0062ff1b4cbd0b2192bb01080a058bb170d84e6457",
                    "0x0000000000000000000000000000000000000000"
                ), "0xc2eaf2f7d95b44216efc92a0ebad6e5757dddba9e9bbeadcec3eb9b83b5bb8b9"
            )
        })

        it('execTransaction() success', async () => {
            // mint a mock to the contract
            await mock1155.connect(owner).mint(
                badger.address, 0, 1, "0x");

            // build the transfer transaction
            const transferTx = await mock1155.populateTransaction.safeTransferFrom(
                badger.address, owner.address, 0, 1, "0x");

            // Transfer mock1155 to signer1
            await badger.connect(owner).execTransaction(
                mock1155.address,
                transferTx.data,
                0,
            )
        })

        it('execTransaction() fail: is not built', async () => {
            await badger.connect(owner).execTransaction(
                organizationMaster.address,
                "0x0000000000000000000000000000000000000000",
                0
            ).should.be.reverted;
        });

        it('execTranscation() fail: is not owner', async () => {
            await badger.connect(signer1).execTransaction(
                badger.address,
                "0x00000000",
                0
            ).should.be.revertedWith("Ownable: caller is not the owner")
        });

        // supportsInterface() tests
        it('supportsInterface() success', async () => {
            // Test ERC1155HolderUpgradeable
            assert.equal(
                await badger.supportsInterface(
                    "0x4e2312e0"
                ), true
            )

            // Test BadgerInterface
            assert.equal(
                await badger.supportsInterface(
                    "0x7b366213"
                ), true
            )

            // Test BadgerVersionsInterface
            assert.equal(
                await badger.supportsInterface(
                    "0x52550d16"
                ), true
            )
        });
    });

    describe("Badger: BadgerScout.sol", async () => {
        it("initialize() fail: cannot call twice", async() => { 
            await childOrganization.connect(signer1).initialize(
                signer1.address,
                "uri",
                "contracturi",
                "name",
                "symbol"
            ).should.be.revertedWith("Initializable: contract is already initialized");
        })

        it('setOrganizationURI() success', async () => {
            await childOrganization.connect(owner).setOrganizationURI(
                "newURI"
            );
        })

        it('setOrganizationURI() fail: not owner', async () => {
            await childOrganization.connect(signer1).setOrganizationURI(
                "newURI"
            ).should.be.revertedWith("Ownable: caller is not the owner")
        })

        it('setBadge() success', async () => {
            await childOrganization.connect(owner).setBadge(
                0,
                false,
                true,
                owner.address,
                "uri",
                paymentToken1155,
                []
            )

            signer = await childOrganization.getSigner(0);

            assert.equal(
                signer,
                owner.address
            );
        })

        it('setBadge() fail: not leader', async () => {
            await childOrganization.connect(signer1).setBadge(
                0,
                false,
                true,
                owner.address,
                "uri",
                paymentToken1155,
                []
            ).should.be.revertedWith("BadgerScout::onlyLeader: Only leaders can call this.")
        })

        it('setBadge() fail: uri cannot be empty', async () => {
            await childOrganization.connect(owner).setBadge(
                0,
                false,
                true,
                owner.address,
                "",
                paymentToken1155,
                []
            ).should.be.revertedWith("BadgerScout::setBadge: URI must be set.")
        })

        it('setBadge() success', async () => {
            await childOrganization.connect(owner).setBadge(
                0,
                false,
                true,
                owner.address,
                "uri",
                paymentToken1155,
                [leaderSigner.address]
            )
        })

        it('setClaimable() success', async () => {
            await childOrganization.connect(owner).setClaimable(
                0,
                true
            )

            assert.equal(
                await childOrganization.getClaimable(0),
                true
            );
        })

        it('setClaimable() fail: not real badge', async () => {
            await childOrganization.connect(owner).setClaimable(
                1,
                true
            ).should.be.revertedWith("BadgerScout::onlyRealBadge: Can only call this for setup badges.")
        })

        it('setClaimable() fail: not leader', async () => {
            await childOrganization.connect(signer1).setClaimable(
                0,
                true
            ).should.be.revertedWith("BadgerScout::onlyLeader: Only leaders can call this.")
        });

        it('setAccountBound() success', async () => {
            await childOrganization.connect(owner).setAccountBound(
                0,
                true
            )

            assert.equal(
                await childOrganization.getAccountBound(0),
                true
            );

            await childOrganization.connect(owner).setAccountBound(
                0,
                false
            )

            assert.equal(
                await childOrganization.getAccountBound(0),
                false
            );
        })

        it('setAccountBound() fail: not real badge', async () => {
            await childOrganization.connect(owner).setAccountBound(
                1,
                true
            ).should.be.revertedWith("BadgerScout::onlyRealBadge: Can only call this for setup badges.")
        })

        it('setAccountBound() fail: not leader', async () => {
            await childOrganization.connect(signer1).setAccountBound(
                0,
                true
            ).should.be.revertedWith("BadgerScout::onlyLeader: Only leaders can call this.")
        });

        it('setSigner() success', async () => {
            await childOrganization.connect(owner).setSigner(
                0,
                owner.address
            )

            assert.equal(
                await childOrganization.getSigner(0),
                owner.address
            );

            await childOrganization.connect(owner).setSigner(
                0,
                "0x0000000000000000000000000000000000000000"
            )

            assert.equal(
                await childOrganization.getSigner(0),
                "0x0000000000000000000000000000000000000000"
            );
        })

        it('setSigner() fail: not real badge', async () => {
            await childOrganization.connect(owner).setSigner(
                1,
                owner.address
            ).should.be.revertedWith("BadgerScout::onlyRealBadge: Can only call this for setup badges.")
        })

        it('setSigner() fail: not leader', async () => {
            await childOrganization.connect(signer1).setSigner(
                0,
                owner.address
            ).should.be.revertedWith("BadgerScout::onlyLeader: Only leaders can call this.")
        });

        it('setBadgeURI() success', async () => {
            await childOrganization.connect(owner).setBadgeURI(
                0,
                "uri"
            )
        })

        it('setBadgeURI() fail: not real badge', async () => {
            await childOrganization.connect(owner).setBadgeURI(
                1000,
                "uri"
            ).should.be.revertedWith("BadgerScout::onlyRealBadge: Can only call this for setup badges.")
        })

        it('setBadgeURI() fail: not leader', async () => {
            await childOrganization.connect(signer1).setBadgeURI(
                0,
                "uri"
            ).should.be.revertedWith("BadgerScout::onlyLeader: Only leaders can call this.")
        });

        it('setBadgeURI() fail: uri cannot be empty', async () => {
            await childOrganization.connect(owner).setBadgeURI(
                0,
                ""
            ).should.be.revertedWith("BadgerScout::setBadgeURI: URI must be set.")
        });

        it('setPaymentToken() success', async () => {
            await childOrganization.connect(owner).setPaymentToken(
                0,
                paymentToken1155
            )
        })

        it('setPaymentToken() fail: not real badge', async () => {
            await childOrganization.connect(owner).setPaymentToken(
                1000,
                paymentToken1155
            ).should.be.revertedWith("BadgerScout::onlyRealBadge: Can only call this for setup badges.")
        })

        it('setPaymentToken() fail: not leader', async () => {
            await childOrganization.connect(signer1).setPaymentToken(
                0,
                paymentToken1155
            ).should.be.revertedWith("BadgerScout::onlyLeader: Only leaders can call this.")
        });

        it('setDelegates() success', async () => {
            await childOrganization.connect(owner).setDelegates(
                0,
                [leaderSigner.address],
                [true]
            )

            assert.equal(
                await childOrganization.isDelegate(0, leaderSigner.address),
                true
            );

            await childOrganization.connect(leaderSigner).setSigner(
                0,
                leaderSigner.address
            )

            assert.equal(
                await childOrganization.getSigner(0),
                leaderSigner.address
            );
        })

        it('setDelegates() fail: not real badge', async () => {
            await childOrganization.connect(owner).setDelegates(
                1000,
                [leaderSigner.address],
                [true]
            ).should.be.revertedWith("BadgerScout::onlyRealBadge: Can only call this for setup badges.")
        })

        it('setDelegates() fail: not leader', async () => {
            await childOrganization.connect(signer1).setDelegates(
                0,
                [leaderSigner.address],
                [true]
            ).should.be.revertedWith("BadgerScout::onlyLeader: Only leaders can call this.")
        });

        it('setDelegates() fail: arrays not equal length', async () => {
            await childOrganization.connect(owner).setDelegates(
                0,
                [leaderSigner.address],
                [true, false]
            ).should.be.revertedWith("BadgerScout::setDelegates: _delegates and _isDelegate arrays must be the same length.")
        });

        it('setDelegatesBatch() success', async () => {
            await childOrganization.connect(owner).setDelegatesBatch(
                [0, 0],
                [leaderSigner.address, leaderSigner.address],
                [true, false]
            )

            assert.equal(
                await childOrganization.isDelegate(0, leaderSigner.address),
                false
            );
        })

        it('setDelegatesBatch() fail: not real badge', async () => {
            await childOrganization.connect(owner).setDelegatesBatch(
                [1000, 1000],
                [leaderSigner.address, leaderSigner.address],
                [true, false]
            ).should.be.revertedWith("BadgerScout::_verifyFullBatch: Can only call this for setup badges.")
        })

        it('setDelegatesBatch() fail: not leader', async () => {
            await childOrganization.connect(signer1).setDelegatesBatch(
                [0, 0],
                [leaderSigner.address, leaderSigner.address],
                [true, false]
            ).should.be.revertedWith("BadgerScout::_verifyFullBatch: Only leaders can call this.")
        });

        it('setDelegatesBatch() fail: arrays not equal length', async () => {
            await childOrganization.connect(owner).setDelegatesBatch(
                [0, 0],
                [leaderSigner.address, leaderSigner.address],
                [true]
            ).should.be.revertedWith("BadgerScout::setDelegatesBatch: _ids, _delegates, and _isDelegate must be the same length.")
        });

        it('execTransaction() success', async () => {
            // mint a mock to the contract
            await mock1155.connect(owner).mint(
                childOrganization.address, 0, 11, "0x");

            // build the transfer transaction
            const transferTx = await mock1155.populateTransaction.safeTransferFrom(
                childOrganization.address, owner.address, 0, 1, "0x");

            // Transfer mock1155 to signer1
            await childOrganization.connect(owner).execTransaction(
                mock1155.address,
                transferTx.data,
                0,
            )
        })

        it('execTransaction() fail: is not built', async () => {
            await childOrganization.connect(owner).execTransaction(
                organizationMaster.address,
                "0x0000000000000000000000000000000000000000",
                0
            ).should.be.reverted;
        });

        it('execTranscation() fail: is not owner', async () => {
            await childOrganization.connect(signer1).execTransaction(
                badger.address,
                "0x00000000",
                0
            ).should.be.revertedWith("Ownable: caller is not the owner")
        });
    })

    describe("Badger: BadgerOrganization.sol", async () => {
        it("leaderMint() success", async () => {
            await childOrganization.connect(owner).leaderMint(
                signer1.address,
                0,
                1,
                "0x"
            )
        })

        it("leaderMint() fail: not real badge", async () => {
            await childOrganization.connect(owner).leaderMint(
                signer1.address,
                1000,
                1,
                "0x"
            ).should.be.revertedWith("BadgerScout::onlyRealBadge: Can only call this for setup badges.")
        });

        it("leaderMint() fail: not leader", async () => {
            await childOrganization.connect(signer1).leaderMint(
                signer1.address,
                0,
                1,
                "0x"
            ).should.be.revertedWith("BadgerScout::onlyLeader: Only leaders can call this.")
        });

        it("leaderMintBatch() success", async () => {
            await childOrganization.connect(owner).leaderMintBatch(
                [signer1.address, leaderSigner.address],
                0,
                [1, 1],
                "0x"
            )
        })

        it("leaderMintBatch() fail: not real badge", async () => {
            await childOrganization.connect(owner).leaderMintBatch(
                [signer1.address, leaderSigner.address],
                1000,
                [1, 1],
                "0x"
            ).should.be.revertedWith("BadgerScout::onlyRealBadge: Can only call this for setup badges.")
        });

        it("leaderMintBatch() fail: not leader", async () => {
            await childOrganization.connect(signer1).leaderMintBatch(
                [signer1.address, leaderSigner.address],
                0,
                [1, 1],
                "0x"
            ).should.be.revertedWith("BadgerScout::onlyLeader: Only leaders can call this.")
        });

        it("leaderMintBatch() fail: arrays not equal length", async () => {
            await childOrganization.connect(owner).leaderMintBatch(
                [signer1.address, leaderSigner.address],
                0,
                [1, 1, 1],
                "0x"
            ).should.be.revertedWith("BadgerOrganization::leaderMintBatch: _tos and _amounts must be the same length.")
        });

        it("leaderMintFullBatch() success", async () => {
            await childOrganization.connect(owner).leaderMintFullBatch(
                [signer1.address, leaderSigner.address],
                [0, 0],
                [1, 1],
                "0x"
            )
        })

        it("leaderMintFullBatch() success: delegate", async() => { 
            await childOrganization.connect(owner).setDelegates(
                0,
                [leaderSigner.address],
                [true]
            )

            await childOrganization.connect(leaderSigner).leaderMintFullBatch(
                [signer1.address, leaderSigner.address],
                [0, 0],
                [1, 1],
                "0x"
            )
        })

        it("leaderMintFullBatch() fail: not real badge", async () => {
            await childOrganization.connect(owner).leaderMintFullBatch(
                [signer1.address, leaderSigner.address],
                [1000, 1000],
                [1, 1],
                "0x"
            ).should.be.revertedWith("BadgerScout::_verifyFullBatch: Can only call this for setup badges.")
        });

        it("leaderMintFullBatch() fail: not leader", async () => {
            await childOrganization.connect(signer1).leaderMintFullBatch(
                [signer1.address, leaderSigner.address],
                [0, 0],
                [1, 1],
                "0x"
            ).should.be.revertedWith("BadgerScout::_verifyFullBatch: Only leaders can call this.")
        });

        it("leaderMintFullBatch() fail: arrays not equal length", async () => {
            await childOrganization.connect(owner).leaderMintFullBatch(
                [signer1.address, leaderSigner.address],
                [0, 0],
                [1, 1, 1],
                "0x"
            ).should.be.revertedWith("BadgerOrganization::leaderMintFullBatch: _froms, _ids, and _amounts must be the same length.")
        });

        it("revoke() success", async () => {
            await childOrganization.connect(owner).revoke(
                signer1.address,
                0,
                1,
            )
        })

        it("revoke() fail: insufficient balance", async () => {
            await childOrganization.connect(owner).revoke(
                signer1.address,
                1000,
                1,
            ).should.be.revertedWith("ERC1155: burn amount exceeds balance")
        });

        it("revoke() fail: not leader", async () => {
            await childOrganization.connect(signer1).revoke(
                signer1.address,
                0,
                1,
            ).should.be.revertedWith("BadgerScout::onlyLeader: Only leaders can call this.")
        });

        it('revokeBatch()', async () => {
            // mint 10 badge 0s to signer1
            await childOrganization.connect(owner).leaderMint(
                signer1.address,
                0,
                10,
                "0x"
            )

            await childOrganization.connect(owner).revokeBatch(
                [signer1.address, leaderSigner.address],
                0,
                [1, 1],
            )
        })

        it("revokeBatch() fail: not leader", async () => {
            await childOrganization.connect(signer1).revokeBatch(
                [signer1.address, leaderSigner.address],
                0,
                [1, 1],
            ).should.be.revertedWith("BadgerScout::onlyLeader: Only leaders can call this.")
        });

        it("revokeBatch() fail: arrays not equal length", async () => {
            await childOrganization.connect(owner).revokeBatch(
                [signer1.address, leaderSigner.address],
                0,
                [1, 1, 1],
            ).should.be.revertedWith("BadgerOrganization::revokeBatch: _from and _amounts must be the same length.")
        });

        it("revokeFullBatch() success", async () => {
            await childOrganization.connect(owner).revokeFullBatch(
                [signer1.address, leaderSigner.address],
                [0, 0],
                [1, 1],
            )
        })

        it("revokeFullBatch() success: delegate", async () => {
            await childOrganization.connect(owner).setDelegates(
                0,
                [leaderSigner.address],
                [true]
            )

            await childOrganization.connect(leaderSigner).revokeFullBatch(
                [signer1.address],
                [0],
                [1],
            )
        })

        it('revokeFullBatch() fail: insufficient balance', async () => {
            await childOrganization.connect(owner).revokeFullBatch(
                [signer1.address, leaderSigner.address],
                [1000, 1000],
                [1, 1],
            ).should.be.revertedWith("ERC1155: burn amount exceeds balance")
        })

        it("revokeFullBatch() fail: not leader", async () => {
            await childOrganization.connect(signer1).revokeFullBatch(
                [signer1.address, leaderSigner.address],
                [0, 0],
                [1, 1],
            ).should.be.revertedWith("BadgerOrganization::_verifyFullBatch: Only leaders can call this.")
        });

        it("revokeFullBatch() fail: arrays not equal length", async () => {
            await childOrganization.connect(owner).revokeFullBatch(
                [signer1.address, leaderSigner.address],
                [0, 0],
                [1, 1, 1],
            ).should.be.revertedWith("BadgerOrganization::revokeFullBatch: _froms, _ids, and _amounts must be the same length.")
        });

        it("forfeit() success", async () => {
            await childOrganization.connect(signer1).forfeit(
                0,
                1,
                "0x"
            )
        });

        it("forfeit() fail: insufficient balance", async () => {
            await childOrganization.connect(signer1).forfeit(
                0,
                10000,
                "0x"
            ).should.be.revertedWith("ERC1155: burn amount exceeds balance")
        })

        it("safeTransferFrom() success", async () => {
            // Set the account bound token to be transferable
            await childOrganization.connect(owner).setAccountBound(
                0,
                false
            );

            assert.equal(
                await childOrganization.getAccountBound(0),
                false
            )

            // Try and transfer the account bound token to another account will succeed
            await childOrganization.connect(signer1).safeTransferFrom(
                signer1.address,
                userSigner.address,
                0,
                1,
                "0x"
            )
        })

        it('safeTransferFrom() success: leader can transfer account bound', async () => {
            // Set this badge as account bound
            await childOrganization.connect(owner).setAccountBound(
                0,
                true
            );

            assert.equal(
                await childOrganization.getAccountBound(0),
                true
            )

            // mint a token to the owner to test transferring
            await childOrganization.connect(owner).leaderMint(
                owner.address,
                0,
                2,
                "0x"
            )

            // Try and transfer the account bound token to another account will succeed
            await childOrganization.connect(owner).safeTransferFrom(
                owner.address,
                userSigner.address,
                0,
                1,
                "0x"
            )
        })

        it("safeTransferFrom() success: delegate can transfer account bound", async () => {
            // Set this badge as account bound
            await childOrganization.connect(owner).setAccountBound(
                0,
                true
            );

            assert.equal(
                await childOrganization.getAccountBound(0),
                true
            )

            // mint a token to the owner to test transferring
            await childOrganization.connect(owner).leaderMint(
                leaderSigner.address,
                0,
                2,
                "0x"
            )

            // Set the delegate
            await childOrganization.connect(owner).setDelegates(
                0,
                [leaderSigner.address],
                [true]
            )

            // Try and transfer the account bound token to another account will succeed
            await childOrganization.connect(leaderSigner).safeTransferFrom(
                leaderSigner.address,
                userSigner.address,
                0,
                1,
                "0x"
            )
        });

        it("safeTransferFrom() success: can transfer to contract", async () => {
            // mint a token to the owner to test transferring
            await childOrganization.connect(owner).leaderMint(
                signer1.address,
                0,
                2,
                "0x"
            )

            // Try and transfer the account bound token to another account will succeed
            await childOrganization.connect(signer1).safeTransferFrom(
                signer1.address,
                childOrganization.address,
                0,
                1,
                "0x"
            )
        })

        it("safeTransferFrom() fail: transferring out of contract as user", async () => {
            await childOrganization.connect(signer1).safeTransferFrom(
                childOrganization.address,
                userSigner.address,
                0,
                1,
                "0x"
            ).should.be.revertedWith("ERC1155: caller is not token owner nor approved")
        })

        it("safeTransferFrom() fail: account bound", async () => {
            // Set this badge as account bound
            await childOrganization.connect(owner).setAccountBound(
                0,
                true
            );

            // mint a stand in
            await childOrganization.connect(owner).leaderMint(
                signer1.address,
                0,
                1,
                "0x"
            )

            // Try and transfer the account bound token to another account will fail
            await childOrganization.connect(signer1).safeTransferFrom(
                signer1.address,
                userSigner.address,
                0,
                1,
                "0x"
            ).should.be.revertedWith("BadgerScout::_verifyTransfer: Missing the proper transfer permissions.")
        })

        it("safeBatchTransferFrom() success", async () => {
            // Set the account bound token to be transferable
            await childOrganization.connect(owner).setAccountBound(
                0,
                false
            );

            assert.equal(
                await childOrganization.getAccountBound(0),
                false
            )

            // Try and transfer the account bound token to another account will succeed
            await childOrganization.connect(signer1).safeBatchTransferFrom(
                signer1.address,
                userSigner.address,
                [0, 0],
                [1, 1],
                "0x"
            )
        })

        it('safeBatchTransferFrom() success: leader can transfer account bound', async () => {
            // Set this badge as account bound
            await childOrganization.connect(owner).setAccountBound(
                0,
                true
            );

            assert.equal(
                await childOrganization.getAccountBound(0),
                true
            )

            // mint a token to the owner to test transferring
            await childOrganization.connect(owner).leaderMint(
                owner.address,
                0,
                2,
                "0x"
            )

            // Try and transfer the account bound token to another account will succeed
            await childOrganization.connect(owner).safeBatchTransferFrom(
                owner.address,
                userSigner.address,
                [0, 0],
                [1, 1],
                "0x"
            )
        })

        it("safeBatchTransferFrom() success: delegate can transfer account bound", async () => {
            // Set this badge as account bound
            await childOrganization.connect(owner).setAccountBound(
                0,
                true
            );

            assert.equal(
                await childOrganization.getAccountBound(0),
                true
            )

            // mint a token to the owner to test transferring
            await childOrganization.connect(owner).leaderMint(
                leaderSigner.address,
                0,
                2,
                "0x"
            )

            // Set the delegate
            await childOrganization.connect(owner).setDelegates(
                0,
                [leaderSigner.address],
                [true]
            )

            // Try and transfer the account bound token to another account will succeed
            await childOrganization.connect(leaderSigner).safeBatchTransferFrom(
                leaderSigner.address,
                userSigner.address,
                [0, 0],
                [1, 1],
                "0x"
            )
        });

        it("safeBatchTransferFrom() success: can transfer to contract", async () => {
            // mint a token to the owner to test transferring
            await childOrganization.connect(owner).leaderMint(
                signer1.address,
                0,
                2,
                "0x"
            )

            // Try and transfer the account bound token to another account will succeed
            await childOrganization.connect(signer1).safeBatchTransferFrom(
                signer1.address,
                childOrganization.address,
                [0, 0],
                [1, 1],
                "0x"
            )
        })

        it("safeBatchTransferFrom() fail: transferring out of contract as user", async () => {
            await childOrganization.connect(signer1).safeBatchTransferFrom(
                childOrganization.address,
                userSigner.address,
                [0, 0],
                [1, 1],
                "0x"
            ).should.be.revertedWith("ERC1155: caller is not token owner nor approved")
        })

        it("safeBatchTransferFrom() fail: account bound", async () => {
            // Set this badge as account bound
            await childOrganization.connect(owner).setAccountBound(
                0,
                true
            );

            // mint a stand in
            await childOrganization.connect(owner).leaderMint(
                signer1.address,
                0,
                1,
                "0x"
            )

            // Try and transfer the account bound token to another account will fail
            await childOrganization.connect(signer1).safeBatchTransferFrom(
                signer1.address,
                userSigner.address,
                [0, 0],
                [1, 1],
                "0x"
            ).should.be.revertedWith("BadgerScout::_verifyTransfer: Missing the proper transfer permissions.")
        })

        it("depositETH() success", async () => {
            /// set claimable to true
            await childOrganization.connect(owner).setClaimable(
                0,
                true
            )

            // set 1 ETH as the payment token 
            await childOrganization.connect(owner).setPaymentToken(
                0,
                paymentTokenETH
            );

            // deposit the eth
            await childOrganization.connect(signer1).depositETH(0, {
                value: ethers.utils.parseEther("1")
            })
        })

        it('depositETH() fail: not real badge', async () => {
            await childOrganization.connect(signer1).depositETH(1000, {
                value: ethers.utils.parseEther("1")
            }).should.be.revertedWith("BadgerScout::_verifyBadge: Can only call this for setup badges.")
        })

        it("depositETH() fail: not claimable", async () => {
            // set signer to none
            await childOrganization.connect(owner).setSigner(
                0,
                "0x0000000000000000000000000000000000000000"
            )

            await childOrganization.connect(owner).setClaimable(
                0,
                false
            );

            await childOrganization.connect(signer1).depositETH(0, {
                value: ethers.utils.parseEther("1")
            }).should.be.revertedWith("BadgerScout::_verifyBadge: Can only call this for claimable badges.")
        })

        it("depositETH() fail: invalid payment token", async () => {
            await childOrganization.connect(owner).setPaymentToken(
                0,
                paymentToken1155
            )

            // set the badge as claimable
            await childOrganization.connect(owner).setClaimable(
                0,
                true
            );

            await childOrganization.connect(signer1).depositETH(0, {
                value: ethers.utils.parseEther("1")
            }).should.be.revertedWith("BadgerScout::_verifyPayment: Invalid payment token.")
        })

        it('depositERC20() success', async () => {
            // set the badge as claimable
            await childOrganization.connect(owner).setClaimable(
                0,
                true
            );

            // set the payment token
            await childOrganization.connect(owner).setPaymentToken(
                0,
                paymentToken20
            );

            // mint some tokens to the signer
            await mock20.connect(owner).mint(
                signer1.address,
                1000
            )

            // approve the contract to spend the tokens
            await mock20.connect(signer1).approve(
                childOrganization.address,
                1000
            )

            // deposit the tokens
            await childOrganization.connect(signer1).depositERC20(
                0,
                mock20.address,
                1
            )
        })

        it('depositERC20() fail: not real badge', async () => {
            await childOrganization.connect(signer1).depositERC20(
                1000,
                mock20.address,
                1
            ).should.be.revertedWith("BadgerScout::_verifyBadge: Can only call this for setup badges.")
        })

        it('depositERC20() fail: not claimable', async () => {
            // set the badge as claimable
            await childOrganization.connect(owner).setClaimable(
                0,
                false
            );

            await childOrganization.connect(signer1).depositERC20(
                0,
                mock20.address,
                1
            ).should.be.revertedWith("BadgerScout::_verifyBadge: Can only call this for claimable badges.")
        })

        it('depositERC20() fail: invalid payment token', async () => {
            // set the badge as claimable
            await childOrganization.connect(owner).setClaimable(
                0,
                true
            );

            // set the payment token
            await childOrganization.connect(owner).setPaymentToken(
                0,
                paymentToken1155
            );

            await childOrganization.connect(signer1).depositERC20(
                0,
                mock20.address,
                1
            ).should.be.revertedWith("BadgerScout::_verifyPayment: Invalid payment token.")
        })

        it('depositERC20() fail: not enough allowance', async () => {
            // set the badge as claimable
            await childOrganization.connect(owner).setClaimable(
                0,
                true
            );

            // set the payment token
            await childOrganization.connect(owner).setPaymentToken(
                0,
                paymentToken20
            );

            // mint some tokens to the signer
            await mock20.connect(owner).mint(
                signer1.address,
                1000
            )

            // deposit the tokens
            await childOrganization.connect(signer1).depositERC20(
                0,
                mock20.address,
                10000000
            ).should.be.revertedWith("ERC20: insufficient allowance")
        })

        it("onERC1155Received() success", async () => {
            // set the badge as claimable
            await childOrganization.connect(owner).setClaimable(
                0,
                true
            );

            // set the payment token
            await childOrganization.connect(owner).setPaymentToken(
                0,
                paymentToken1155
            );

            // mint some tokens to the signer
            await mock1155.connect(owner).mint(
                signer1.address,
                0,
                15,
                "0x"
            )

            // encode 0 as badge into the data
            const data = ethers.utils.defaultAbiCoder.encode(
                ["uint256"],
                [0]
            )

            assert.notEqual(
                data,
                "0x"
            )

            // transfer the token to the contract
            await mock1155.connect(signer1).safeTransferFrom(
                signer1.address,
                childOrganization.address,
                0,
                1,
                data
            );
        });

        it("onERC1155Received() success: normal transfer", async () => {
            await mock1155.connect(owner).mint(
                signer1.address,
                0,
                15,
                "0x"
            )

            // transfer the token to the contract
            await mock1155.connect(signer1).safeTransferFrom(
                signer1.address,
                childOrganization.address,
                0,
                1,
                "0x"
            );
        })

        it("onERC1155Received() fail: not real badge", async () => {
            // encode 1000 as badge into the data
            const data = ethers.utils.defaultAbiCoder.encode(
                ["uint256"],
                [1000]
            )

            // transfer the token to the contract
            await mock1155.connect(signer1).safeTransferFrom(
                signer1.address,
                childOrganization.address,
                0,
                1,
                data
            ).should.be.revertedWith("BadgerScout::_verifyBadge: Can only call this for setup badges.")
        });

        it("onERC1155Received() fail: not claimable", async () => {
            // set the badge as claimable
            await childOrganization.connect(owner).setClaimable(
                0,
                false
            );

            // encode 0 as badge into the data
            const data = ethers.utils.defaultAbiCoder.encode(
                ["uint256"],
                [0]
            )

            // transfer the token to the contract
            await mock1155.connect(signer1).safeTransferFrom(
                signer1.address,
                childOrganization.address,
                0,
                1,
                data
            ).should.be.revertedWith("BadgerScout::_verifyBadge: Can only call this for claimable badges.")
        });

        it("onERC1155Received() fail: invalid payment token", async () => {
            // set the badge as claimable
            await childOrganization.connect(owner).setClaimable(
                0,
                true
            );

            // set the payment token
            await childOrganization.connect(owner).setPaymentToken(
                0,
                paymentToken20
            );

            // encode 0 as badge into the data
            const data = ethers.utils.defaultAbiCoder.encode(
                ["uint256"],
                [0]
            )

            // transfer the token to the contract
            await mock1155.connect(signer1).safeTransferFrom(
                signer1.address,
                childOrganization.address,
                0,
                1,
                data
            ).should.be.revertedWith("BadgerScout::_verifyPayment: Invalid payment token.")
        });

        it("onERC1155Received() fail: not enough balance", async () => {
            // set the badge as claimable
            await childOrganization.connect(owner).setClaimable(
                0,
                true
            );

            // set the payment token
            await childOrganization.connect(owner).setPaymentToken(
                0,
                paymentToken1155
            );

            // encode 0 as badge into the data
            const data = ethers.utils.defaultAbiCoder.encode(
                ["uint256"],
                [0]
            )

            // transfer the token to the contract
            await mock1155.connect(signer1).safeTransferFrom(
                signer1.address,
                childOrganization.address,
                0,
                10000000,
                data
            ).should.be.revertedWith("ERC1155: insufficient balance for transfer")
        });

        it("onERC721Received() success", async () => {
            // set the badge as claimable
            await childOrganization.connect(owner).setClaimable(
                0,
                true
            );

            // set the payment token
            await childOrganization.connect(owner).setPaymentToken(
                0,
                paymentToken721
            );

            // mint 50 tokens to the signer
            for (let i = 0; i < 10; i++) {
                tx = await mock721.connect(owner).mint(
                    signer1.address,
                    i
                )
                tx.wait()
            }

            const data = ethers.utils.defaultAbiCoder.encode(
                ["uint256"],
                [0]
            )

            // build the overloaded safeTransferFrom function
            await mock721.connect(signer1)["safeTransferFrom(address,address,uint256,bytes)"](
                signer1.address,
                childOrganization.address,
                0,
                data
            )
        });

        it("onERC721Received() success: normal transfer", async () => {
            await mock721.connect(signer1)["safeTransferFrom(address,address,uint256,bytes)"](
                signer1.address,
                childOrganization.address,
                2,
                "0x"
            )
        })

        it("onERC721Received() fail: not real badge", async () => {
            // encode 1000 as badge into the data
            const data = ethers.utils.defaultAbiCoder.encode(
                ["uint256"],
                [1000]
            )

            // build the overloaded transfer from
            await mock721.connect(signer1)["safeTransferFrom(address,address,uint256,bytes)"](
                signer1.address,
                childOrganization.address,
                1,
                data
            ).should.be.revertedWith("BadgerScout::_verifyBadge: Can only call this for setup badges.")
        });

        it("onERC721Received() fail: not claimable", async () => {
            // set the badge as claimable
            await childOrganization.connect(owner).setClaimable(
                0,
                false
            );

            // set signer as none
            await childOrganization.connect(owner).setSigner(
                0,
                "0x0000000000000000000000000000000000000000"
            );

            // encode 0 as badge into the data
            const data = ethers.utils.defaultAbiCoder.encode(
                ["uint256"],
                [0]
            )

            await mock721.connect(owner).mint(
                signer1.address,
                55
            )

            // transfer the token to the contract
            await mock721.connect(signer1)["safeTransferFrom(address,address,uint256,bytes)"](
                signer1.address,
                childOrganization.address,
                55,
                data
            ).should.be.revertedWith("BadgerScout::_verifyBadge: Can only call this for claimable badges.")
        });

        it("onERC721Received() fail: invalid payment token", async () => {
            // set the badge as claimable
            await childOrganization.connect(owner).setClaimable(
                0,
                true
            );

            // set the payment token
            await childOrganization.connect(owner).setPaymentToken(
                0,
                paymentToken20
            );

            // encode 0 as badge into the data
            const data = ethers.utils.defaultAbiCoder.encode(
                ["uint256"],
                [0]
            )

            // transfer the token to the contract
            await mock721.connect(signer1)["safeTransferFrom(address,address,uint256,bytes)"](
                signer1.address,
                childOrganization.address,
                3,
                data
            ).should.be.revertedWith("BadgerScout::_verifyPayment: Invalid payment token.")
        });

        it("claimMint() success: signature", async () => {
            mnemonic = "test test test test test test test test test test test junk";
            claimSigner = await ethers.Wallet.fromMnemonic(mnemonic, "m/44'/60'/0'/0/1");

            // set the badge as claimable
            await childOrganization.connect(owner).setSigner(
                0,
                claimSigner.address
            )

            const messageHash = ethers.utils.solidityKeccak256(
                ["address", "uint256", "uint256", "bytes"],
                [
                    signer1.address,
                    0,
                    1,
                    "0x"
                ]
            )

            // sign the message hash
            const signature = await claimSigner.signMessage(ethers.utils.arrayify(messageHash))

            // set the payment token
            await childOrganization.connect(owner).setPaymentToken(
                0,
                paymentToken20
            );

            // mint some tokens to the signer
            await mock20.connect(owner).mint(
                signer1.address,
                1000
            )

            // approve the contract to spend the tokens
            await mock20.connect(signer1).approve(
                childOrganization.address,
                1000
            )

            // deposit the tokens
            await childOrganization.connect(signer1).depositERC20(
                0,
                mock20.address,
                1
            )

            // claim the mint
            await childOrganization.connect(signer1).claimMint(
                signature,
                0,
                1,
                "0x"
            )
        })

        it("claimMint() success: claimable", async () => {
            // set signer as none
            await childOrganization.connect(owner).setSigner(
                0,
                "0x0000000000000000000000000000000000000000"
            );

            // set the badge as claimable
            await childOrganization.connect(owner).setClaimable(
                0,
                true
            );

            // set the payment token
            await childOrganization.connect(owner).setPaymentToken(
                0,
                paymentToken20
            );

            // mint some tokens to the signer
            await mock20.connect(owner).mint(
                signer1.address,
                1000
            )

            // approve the contract to spend the tokens
            await mock20.connect(signer1).approve(
                childOrganization.address,
                1000
            )

            // deposit the tokens
            await childOrganization.connect(signer1).depositERC20(
                0,
                mock20.address,
                1
            )

            // claim the mint
            await childOrganization.connect(signer1).claimMint(
                "0x",
                0,
                1,
                "0x"
            )
        })

        it("claimMint() fail: invalid signature", async () => {
            mnemonic = "test test test test test test test test test test test junk";
            claimSigner = await ethers.Wallet.fromMnemonic(mnemonic, "m/44'/60'/0'/0/1");

            // set the badge as claimable
            await childOrganization.connect(owner).setSigner(
                0,
                signer1.address
            )

            const messageHash = ethers.utils.solidityKeccak256(
                ["address", "uint256", "uint256", "bytes"],
                [
                    signer1.address,
                    0,
                    1,
                    "0x"
                ]
            )

            // sign the message hash
            const signature = await claimSigner.signMessage(ethers.utils.arrayify(messageHash))

            // set the payment token
            await childOrganization.connect(owner).setPaymentToken(
                0,
                paymentToken20
            );

            // mint some tokens to the signer
            await mock20.connect(owner).mint(
                signer1.address,
                1000
            )

            // approve the contract to spend the tokens
            await mock20.connect(signer1).approve(
                childOrganization.address,
                1000
            )

            // deposit the tokens
            await childOrganization.connect(signer1).depositERC20(
                0,
                mock20.address,
                1
            )

            // claim the mint
            await childOrganization.connect(signer1).claimMint(
                signature,
                0,
                1,
                "0x"
            ).should.be.revertedWith("BadgerScout::_verifySignature: Invalid signature.")
        })

        it("claimMint() fail: not real badge", async () => {
            // set badge as claimable
            await childOrganization.connect(owner).setClaimable(
                0,
                true
            );

            // set signer to none
            await childOrganization.connect(owner).setSigner(
                0,
                "0x0000000000000000000000000000000000000000"
            );

            // deposit
            await childOrganization.connect(signer1).depositERC20(
                0,
                mock20.address,
                100
            )

            // claim the mint
            await childOrganization.connect(signer1).claimMint(
                "0x",
                1000,
                1,
                "0x"
            ).should.be.revertedWith("BadgerScout::onlyRealBadge: Can only call this for setup badges.")
        })

        it("claimMint() fail: not claimable", async () => {
            // set badge as not claimable
            await childOrganization.connect(owner).setClaimable(
                0,
                false
            );

            // claim the mint
            await childOrganization.connect(signer1).claimMint(
                "0x",
                0,
                1,
                "0x"
            ).should.be.revertedWith("BadgerOragnization::claimMint: This badge is not claimable.")
        });

        it("claimMint() fail: amount is zero", async () => {
            // claim the mint
            await childOrganization.connect(sigSigner).claimMint(
                "0x",
                0,
                0,
                "0x"
            ).should.be.revertedWith("BadgerScout::claimMint: Amount must be greater than 0.")
        })

        it("claimMint() fail: has not funded", async () => {
            // set badge as claimable
            await childOrganization.connect(owner).setClaimable(
                0,
                true
            );

            // claim the mint
            await childOrganization.connect(sigSigner).claimMint(
                "0x",
                0,
                1,
                "0x"
            ).should.be.revertedWith("BadgerScout::_verifyFunding: User has not funded the badge.")
        })

        it("uri() success: has badge uri", async () => {
            assert.equal(
                await childOrganization.uri(0),
                "uri"
            )
        })

        it("uri() success: no badge uri", async () => {
            assert.equal(
                await childOrganization.uri(1),
                "baseuri"
            )
        })

        it('contractURI() success', async () => {
            assert.equal(
                await childOrganization.contractURI(),
                "newURI"
            )
        })

        it('supportsInterface() success', async () => {
            // Test ERC1155Upgradeable
            assert.equal(
                await childOrganization.supportsInterface("0xd9b67a26"),
                true
            );

            // Test ERC1155HolderUpgradeable
            assert.equal(
                await childOrganization.supportsInterface(
                    "0x4e2312e0"
                ), true
            )

            // Test ERC721ReceiverUpgradeable
            assert.equal(
                await childOrganization.supportsInterface(
                    "0x150b7a02"
                ), true
            )

            // Test ERC165Upgradeable
            assert.equal(
                await childOrganization.supportsInterface(
                    "0x01ffc9a7"
                ), true
            )
        });
    })
})