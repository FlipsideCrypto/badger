const { assert } = require('chai')

var chai = require('chai')
    .use(require('chai-as-promised'))
    .should()

const { ethers } = require("hardhat");

// TODO: Payment token needs to be tested THOROUGHLY tested.
//      cases: no payment token
//             native payment
//             1155 payment
// TODO: State var updates
// TODO: Subscription Implementation
// TODO: Batch functions
// TODO: Make every array field batchable
// TODO: Should there be an ERC20 payment type?

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

        // bytes32 encode token address and token id using the contract and use as paymentKey
        paymentKey1155 = ethers.utils.solidityKeccak256(
            ["address", "uint256"],
            [mock1155.address, 0]
        );

        paymentAmount = 0;

        paymentToken1155 = [
            paymentKey1155,
            paymentAmount
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

        // TODO: Test createOrganization() payment token deployments

        // onERC1155Received() tests
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

        it('setBadge(delegates) success', async () => {
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

    // describe("No Payment Sash", function() {
    //     it('Leader can mint', async() => {
    //         const _badgeId = 0;
    //         const _amount = 1;

    //         await sashPress.connect(leaderSigner).leaderMint(
    //               userSigner.address
    //             , _badgeId
    //             , _amount
    //             , "0x"
    //         )

    //         assert.equal(await sashPress.balanceOf(userSigner.address, _badgeId), _amount)
    //     });

    //     it('Leader can revoke', async() => {
    //         const _badgeId = 0;
    //         const _amount = 1;
    //         const balanceBefore = await sashPress.balanceOf(userSigner.address, _badgeId);

    //         await sashPress.connect(leaderSigner).revoke(
    //               userSigner.address
    //             , _badgeId
    //             , _amount
    //         )

    //         const balanceAfter = await sashPress.balanceOf(userSigner.address, _badgeId);
    //         assert.equal(balanceAfter.toString(), (balanceBefore.sub(_amount)).toString())
    //     });

    //     it('Owner can airdrop mint', async() => {
    //         const _badgeId = 0;
    //         const _amount = 1;
    //         const balanceBefore = await sashPress.balanceOf(userSigner.address, _badgeId);

    //         await sashPress.connect(owner).leaderMintBatch(
    //                 [userSigner.address, signer1.address]
    //             , _badgeId
    //             , [_amount, _amount]
    //             , "0x"
    //         )

    //         const balanceAfter = await sashPress.balanceOf(userSigner.address, _badgeId);
    //         assert.equal(balanceAfter.toString(), (balanceBefore.add(_amount)).toString())
    //     });

    //     it('Owner can revoke', async() => {
    //         const _badgeId = 0;
    //         const _amount = 1;
    //         const balanceBefore = await sashPress.balanceOf(userSigner.address, _badgeId);

    //         await sashPress.connect(owner).revoke(
    //                 userSigner.address
    //             , _badgeId
    //             , _amount
    //         )

    //         const balanceAfter = await sashPress.balanceOf(userSigner.address, _badgeId);
    //         assert.equal(balanceAfter.toString(), (balanceBefore.sub(_amount)).toString())
    //     });

    //     it('Admin and Leaders can set signer', async() => {
    //         await sashPress.connect(owner).setSigner(
    //             0,
    //             owner.address
    //         )

    //         const { signer: signer1 } = await sashPress.badges(0);

    //         assert.equal(signer1.toString(), owner.address);

    //         await sashPress.connect(owner).setSigner(
    //             0,
    //             sigSigner.address
    //         )

    //         const { signer: signer2 } = await sashPress.badges(0);

    //         assert.equal(signer2.toString(), sigSigner.address);
    //     });

    //     it('Users cannot set signer', async() => {
    //         await sashPress.connect(userSigner).setSigner(
    //             0,
    //             signer1.address
    //         ).should.be.revertedWith("BadgerScout::onlyLeader: Only leaders can call this.")
    //     });

    //     it('User can claim', async() => {
    //         const _badgeId = 0;
    //         const _quantity = 1;

    //         const messageHash = ethers.utils.solidityKeccak256(
    //             ["address", "uint256", "uint256"], 
    //             [userSigner.address, _badgeId, _quantity]
    //         )

    //         const messageHashArrayify = ethers.utils.arrayify(messageHash);

    //         const _signature = await sigSigner.signMessage(messageHashArrayify);

    //         await sashPress.connect(userSigner).claimMint(
    //               _signature        // bytes calldata _signature
    //             , _badgeId          // uint256 _id
    //             , _quantity         // uint256 _quantity
    //             , "0x"              // bytes memory _data
    //         );
    //     });

    //     it('User can revoke own badge', async() => {
    //         const _badgeId = 0;
    //         const _quantity = 1;
    //         const balanceBefore = await sashPress.balanceOf(userSigner.address, _badgeId);

    //         await sashPress.connect(userSigner).forfeit(
    //             _badgeId,
    //             _quantity
    //         )

    //         const balanceAfter = await sashPress.balanceOf(userSigner.address, _badgeId);
    //         assert.equal(balanceAfter, balanceBefore - _quantity)
    //     });

    //     it('Can batch mint and revoke', async() => {
    //         await sashPress.connect(owner).leaderMintBatch(
    //             [signer1.address, userSigner.address],
    //             0,
    //             [1, 2],
    //             "0x"
    //         );
    //         assert.equal(await sashPress.balanceOf(signer1.address, 0), 2);
    //         assert.equal(await sashPress.balanceOf(userSigner.address, 0), 2);

    //         await sashPress.connect(owner).revokeBatch(
    //             [signer1.address, userSigner.address],
    //             0,
    //             [1, 2]
    //         )
    //         assert.equal(await sashPress.balanceOf(signer1.address, 0), 1);
    //         assert.equal(await sashPress.balanceOf(userSigner.address, 0), 0);
    //     })
    //     it('Cannot move soul bound', async() => {
    //         await sashPress.connect(signer1).safeTransferFrom(
    //             signer1.address,
    //             userSigner.address,
    //             0,
    //             1,
    //             "0x"
    //         ).should.be.revertedWith("BadgerOrganization::safeTransferFrom: Missing the proper transfer permissions.")
    //     })
    //     // it('Leader can move soulbound', async() => {
    //     //     await sashPress.connect(leaderSigner).safeTransferFrom(
    //     //         signer1.address,
    //     //         userSigner.address,
    //     //         0,
    //     //         1,
    //     //         "0x"
    //     //     )
    //     //     assert.equal(await sashPress.balanceOf(signer1.address, 0), 0);
    //     //     assert.equal(await sashPress.balanceOf(userSigner.address, 0), 1);
    //     // })
    // });

    // describe("Security Tests", function() {
    //     it("User cannot create badge", async() => {

    //     })
    //     it("User cannot set leader", async() => {

    //     })
    //     it("User cannot set signer", async() => {

    //     })
    //     it("User cannot revoke", async() => {

    //     })
    //     it("User cannot create badge", async() => {

    //     })
    //     it("Leader cannot set leader", async() => {

    //     })
    //     it("Cannot initialize twice", async() => {

    //     })
    //     it("Cannot mint uncreated badge", async() => {

    //     })
    //     it("Batch transfer always reverts", async() => {

    //     })
    // });

    // describe("Native Payment Sash", function() {
    //     it('Initialized New Sash', async() => {
    //         cloneTx = await house.connect(owner).createOrganization("0x");
    //         cloneTx = await cloneTx.wait();

    //         sashPressAddress = cloneTx.events[0].address;
    //         sashPress = await sashMaster.attach(sashPressAddress);

    //         assert.equal(await sashPress.owner(), owner.address);
    //     });

    //     it('Sash Initialized.', async () => {
    //         assert.equal(await sashPress.owner(), owner.address)
    //     })

    //     it('Can create Sash', async() => {
    //         const _badgeId = 0;
    //         const _paymentToken = [
    //             0,                          // enum TOKEN_TYPE
    //             signer1.address,            // address tokenAddress
    //             0,                          // uint256 tokenId
    //             100                         // uint256 quantity
    //         ]

    //         await sashPress.connect(owner).setBadge(
    //               _badgeId                      //   uint256 _id
    //             , false                         // , bool _accountBound
    //             , sigSigner.address             // , address _signer
    //             , "https://badger.utc24.io/0"   // , string memory _uri
    //             , _paymentToken                 // , paymentToken memory _paymentToken
    //             , [leaderSigner.address]        // , address[] memory _leaders
    //         )

    //         const { signer } = await sashPress.badges(0);

    //         assert.equal(signer.toString(), sigSigner.address);
    //     });

    //     it('Owner can designate leader', async() => {
    //         await sashPress.setDelegates(0, [leaderSigner.address, signer1.address], [true, true]);

    //         assert.equal(await sashPress.isDelegate(0, leaderSigner.address), true);
    //         assert.equal(await sashPress.isDelegate(0, signer1.address), true);
    //     });

    //     it('Leader can mint', async() => {
    //         const _badgeId = 0;
    //         const _amount = 1;

    //         await sashPress.connect(leaderSigner).leaderMint(
    //               userSigner.address
    //             , _badgeId
    //             , _amount
    //             , "0x"
    //         )

    //         assert.equal(await sashPress.balanceOf(userSigner.address, _badgeId), _amount)
    //     });

    //     it('Leader can revoke', async() => {
    //         const _badgeId = 0;
    //         const _amount = 1;
    //         const balanceBefore = await sashPress.balanceOf(userSigner.address, _badgeId);

    //         await sashPress.connect(leaderSigner).revoke(
    //               userSigner.address
    //             , _badgeId
    //             , _amount
    //         )

    //         const balanceAfter = await sashPress.balanceOf(userSigner.address, _badgeId);
    //         assert.equal(balanceAfter.toString(), (balanceBefore.sub(_amount)).toString())
    //     });

    //     it('Owner can airdrop mint', async() => {
    //         const _badgeId = 0;
    //         const _amount = 1;
    //         const balanceBefore = await sashPress.balanceOf(userSigner.address, _badgeId);

    //         await sashPress.connect(owner).leaderMintBatch(
    //                 [userSigner.address, signer1.address]
    //             , _badgeId
    //             , [_amount, _amount]
    //             , "0x"
    //         )

    //         const balanceAfter = await sashPress.balanceOf(userSigner.address, _badgeId);
    //         assert.equal(balanceAfter.toString(), (balanceBefore.add(_amount)).toString())
    //     });

    //     it('Owner can revoke', async() => {
    //         const _badgeId = 0;
    //         const _amount = 1;
    //         const balanceBefore = await sashPress.balanceOf(userSigner.address, _badgeId);

    //         await sashPress.connect(owner).revoke(
    //                 userSigner.address
    //             , _badgeId
    //             , _amount
    //         )

    //         const balanceAfter = await sashPress.balanceOf(userSigner.address, _badgeId);
    //         assert.equal(balanceAfter.toString(), (balanceBefore.sub(_amount)).toString())
    //     });

    //     it('User can claim', async() => {
    //         const _badgeId = 0;
    //         const _quantity = 1;

    //         const messageHash = ethers.utils.solidityKeccak256(
    //             ["address", "uint256", "uint256"], 
    //             [userSigner.address, _badgeId, _quantity]
    //         )

    //         const messageHashArrayify = ethers.utils.arrayify(messageHash);

    //         const _signature = await sigSigner.signMessage(messageHashArrayify);

    //         await sashPress.connect(userSigner).claimMint(
    //               _signature        // bytes calldata _signature
    //             , _badgeId          // uint256 _id
    //             , _quantity         // uint256 _quantity
    //             , "0x"              // bytes memory _data
    //             , { value: 100 }
    //         );
    //     });

    //     it('User can revoke own badge', async() => {
    //         const _badgeId = 0;
    //         const _quantity = 1;
    //         const balanceBefore = await sashPress.balanceOf(userSigner.address, _badgeId);

    //         await sashPress.connect(userSigner).forfeit(
    //             _badgeId,
    //             _quantity
    //         )

    //         const balanceAfter = await sashPress.balanceOf(userSigner.address, _badgeId);
    //         assert.equal(balanceAfter, balanceBefore - _quantity)
    //     });

    //     it('Can batch mint and revoke', async() => {
    //         await sashPress.connect(owner).leaderMintBatch(
    //             [signer1.address, userSigner.address],
    //             0,
    //             [1, 2],
    //             "0x"
    //         );
    //         assert.equal(await sashPress.balanceOf(signer1.address, 0), 2);
    //         assert.equal(await sashPress.balanceOf(userSigner.address, 0), 2);

    //         await sashPress.connect(owner).revokeBatch(
    //             [signer1.address, userSigner.address],
    //             0,
    //             [2, 2]
    //         )
    //         assert.equal(await sashPress.balanceOf(signer1.address, 0), 0);
    //         assert.equal(await sashPress.balanceOf(userSigner.address, 0), 0);
    //     })
    // });

    // WTF why is 1155 deploy failing
    // describe("1155 Payment Sash", function() {
    //     it('Initialized New Sash', async() => {
    //         cloneTx = await house.connect(owner).createOrganization("0x");
    //         cloneTx = await cloneTx.wait();

    //         sashPressAddress = cloneTx.events[0].address;
    //         sashPress = await sashMaster.attach(sashPressAddress);

    //         assert.equal(await sashPress.owner(), owner.address);
    //     });

    //     it('Sash and Mock1155 Deployed.', async () => {
    //         assert.equal(await sashPress.owner(), owner.address)
    //         assert.equal(await mock1155.uri(), "testuri/");
    //     })

    //     it('Can create Sash', async() => {
    //         const _badgeId = 0;
    //         const _paymentToken = [
    //             0,                          // enum TOKEN_TYPE
    //             signer1.address,            // address tokenAddress
    //             0,                          // uint256 tokenId
    //             0                           // uint256 quantity
    //         ]

    //         await sashPress.connect(owner).setBadge(
    //               _badgeId                      //   uint256 _id
    //             , true                          // , bool _accountBound
    //             , signer1.address               // , address _signer
    //             , "https://badger.utc24.io/0"   // , string memory _uri
    //             , _paymentToken                 // , paymentToken memory _paymentToken
    //             , []                            // , address[] memory _leaders
    //         )

    //         const { signer } = await sashPress.badges(0);

    //         assert.equal(signer.toString(), signer1.address);
    //     });

    //     it('Badges have correct URI', async() => {
    //         let uri = await sashPress.uri(0)
    //         assert.equal(uri, "https://badger.utc24.io/0")
    //         uri = await sashPress.uri(1);
    //         let lowercaseAddress = sashPress.address.toLowerCase();
    //         assert.equal(uri, "https://badger.utc24.io/api/?seed=" + lowercaseAddress + "1")
    //     })

    //     it('Owner can designate leader', async() => {
    //         await sashPress.setDelegates(0, [leaderSigner.address, signer1.address], [true, true]);

    //         assert.equal(await sashPress.isDelegate(0, leaderSigner.address), true);
    //         assert.equal(await sashPress.isDelegate(0, signer1.address), true);
    //     });

    //     it('Owner can revoke leader', async() => {
    //         await sashPress.setDelegates(0, [signer1.address], [false]);

    //         assert.equal(await sashPress.isDelegate(0, signer1.address), false);
    //     });

    //     it('Leader and user cannot designate leader', async() => {
    //         await sashPress.connect(leaderSigner).setDelegates(
    //             0, [signer1.address], [true]
    //         ).should.be.revertedWith("Ownable: caller is not the owner");
    //         await sashPress.connect(signer1).setDelegates(
    //             0, [signer1.address], [true]
    //         ).should.be.revertedWith("Ownable: caller is not the owner");
    //     });

    //     it('Leader can mint', async() => {
    //         const _badgeId = 0;
    //         const _amount = 1;

    //         await sashPress.connect(leaderSigner).leaderMint(
    //               userSigner.address
    //             , _badgeId
    //             , _amount
    //             , "0x"
    //         )

    //         assert.equal(await sashPress.balanceOf(userSigner.address, _badgeId), _amount)
    //     });

    //     it('Leader can revoke', async() => {
    //         const _badgeId = 0;
    //         const _amount = 1;
    //         const balanceBefore = await sashPress.balanceOf(userSigner.address, _badgeId);

    //         await sashPress.connect(leaderSigner).revoke(
    //               userSigner.address
    //             , _badgeId
    //             , _amount
    //         )

    //         const balanceAfter = await sashPress.balanceOf(userSigner.address, _badgeId);
    //         assert.equal(balanceAfter.toString(), (balanceBefore.sub(_amount)).toString())
    //     });

    //     it('Owner can airdrop mint', async() => {
    //         const _badgeId = 0;
    //         const _amount = 1;
    //         const balanceBefore = await sashPress.balanceOf(userSigner.address, _badgeId);

    //         await sashPress.connect(owner).leaderMintBatch(
    //                 [userSigner.address, signer1.address]
    //             , _badgeId
    //             , [_amount, _amount]
    //             , "0x"
    //         )

    //         const balanceAfter = await sashPress.balanceOf(userSigner.address, _badgeId);
    //         assert.equal(balanceAfter.toString(), (balanceBefore.add(_amount)).toString())
    //     });

    //     it('Owner can revoke', async() => {
    //         const _badgeId = 0;
    //         const _amount = 1;
    //         const balanceBefore = await sashPress.balanceOf(userSigner.address, _badgeId);

    //         await sashPress.connect(owner).revoke(
    //                 userSigner.address
    //             , _badgeId
    //             , _amount
    //         )

    //         const balanceAfter = await sashPress.balanceOf(userSigner.address, _badgeId);
    //         assert.equal(balanceAfter.toString(), (balanceBefore.sub(_amount)).toString())
    //     });

    //     it('Admin and Leaders can set signer', async() => {
    //         await sashPress.connect(owner).setSigner(
    //             0,
    //             owner.address
    //         )

    //         const { signer: signer1 } = await sashPress.badges(0);

    //         assert.equal(signer1.toString(), owner.address);

    //         await sashPress.connect(owner).setSigner(
    //             0,
    //             sigSigner.address
    //         )

    //         const { signer: signer2 } = await sashPress.badges(0);

    //         assert.equal(signer2.toString(), sigSigner.address);
    //     });

    //     it('Users cannot set signer', async() => {
    //         await sashPress.connect(userSigner).setSigner(
    //             0,
    //             signer1.address
    //         ).should.be.revertedWith("BadgerOrganization::onlyLeader: Only leaders can call this.")
    //     });

    //     it('User can claim', async() => {
    //         const _badgeId = 0;
    //         const _quantity = 1;

    //         const messageHash = ethers.utils.solidityKeccak256(
    //             ["address", "uint256", "uint256"], 
    //             [userSigner.address, _badgeId, _quantity]
    //         )

    //         const messageHashArrayify = ethers.utils.arrayify(messageHash);

    //         const _signature = await sigSigner.signMessage(messageHashArrayify);

    //         await sashPress.connect(userSigner).claimMint(
    //               _signature        // bytes calldata _signature
    //             , _badgeId          // uint256 _id
    //             , _quantity         // uint256 _quantity
    //             , "0x"              // bytes memory _data
    //         );
    //     });

    //     it('User can revoke own badge', async() => {
    //         const _badgeId = 0;
    //         const _quantity = 1;
    //         const balanceBefore = await sashPress.balanceOf(userSigner.address, _badgeId);

    //         await sashPress.connect(userSigner).forfeit(
    //             _badgeId,
    //             _quantity
    //         )

    //         const balanceAfter = await sashPress.balanceOf(userSigner.address, _badgeId);
    //         assert.equal(balanceAfter, balanceBefore - _quantity)
    //     });

    //     it('Can batch mint and revoke', async() => {
    //         await sashPress.connect(owner).leaderMintBatch(
    //             [signer1.address, userSigner.address],
    //             0,
    //             [1, 2],
    //             "0x"
    //         );
    //         assert.equal(await sashPress.balanceOf(signer1.address, 0), 2);
    //         assert.equal(await sashPress.balanceOf(userSigner.address, 0), 2);

    //         await sashPress.connect(owner).revokeBatch(
    //             [signer1.address, userSigner.address],
    //             0,
    //             [2, 2]
    //         )
    //         assert.equal(await sashPress.balanceOf(signer1.address, 0), 0);
    //         assert.equal(await sashPress.balanceOf(userSigner.address, 0), 0);
    //     })
    // });
})