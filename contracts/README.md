# Badger Primitive & Protocol

In this repository is contained the base primitive of Badger (`BadgerOrganization.sol`) as well as the Badger protocol (`Badger.sol`) on top of it.

## Badger Primitive

The Badger primitive is a simple contract that allows for the creation of a collection of NFTs that are all owned by the same address. This is useful for organizations that want to issue NFTs to their members, but don't want to have to manage a collection of NFTs for each member.

With the unique model in place an on-chain Organization can generate the keys needed to access all of the existing Web3 gates and locks.

Built on the standard ERC-1155, Badges allow for top-down management of any on-chain organization.

* The tokens can be account bound, but they don't have to be.
* There can be custom signers.
    * This unlocks first-party claim gates and external development under the control of the Organization owner.  
* The tokens can be minted and burned.
* The tokens can operate with trie-like permissions.
    * Achieved without breaking the composability of any standard or any of the existing locks in the market. Anyone that conforms to already released standards will be able to use Badger as keys.   
* The tokens can be used as a way to bootstrap on-chain roles and token-gated areas for their members.

## Running The Tests / Contributing

```
- fork the repo
- npm i 
- setup your .env (in ~root/contracts/) to reflect example.env
- npx hardhat coverage --network localhost
```

## Tests
```
Version
=======
> solidity-coverage: v0.8.2

Instrumenting for coverage...
=============================

> Badger\Badger.sol
> Badger\BadgerVersions.sol
> Badger\interfaces\BadgerInterface.sol
> Badger\interfaces\BadgerVersionsInterface.sol
> BadgerOrganization\BadgerOrganization.sol
> BadgerOrganization\BadgerScout.sol
> BadgerOrganization\interfaces\BadgerOrganizationInterface.sol
> BadgerOrganization\interfaces\BadgerScoutInterface.sol
> Mocks\MockERC1155.sol
> Mocks\MockERC20.sol
> Mocks\MockERC721.sol

Compilation:
============

Compiled 50 Solidity files successfully
> server:            http://127.0.0.1:8545

Network Info
============
> port:         localhost
> network:      v2.13.2

Compiled 50 Solidity files successfully


  Badger
    Badger: Badger.sol
      ✔ Should deploy the Badger contract (136ms)
      ✔ createOrganization() success (732ms)
      ✔ createOrganization() success: payable (1653ms)
      ✔ createOrganization() fail: insufficient funding (166ms)
      ✔ onERC1155Received() fail: invalid payment token (993ms)
    Badger: BadgerVersions.sol
      ✔ setVersion() success (353ms)
      ✔ setVersion() success: exogenous (422ms)
      ✔ setVersion() fail: not owner (222ms)
      ✔ setVersion() fail: locked (557ms)
      ✔ setVersion() fail: not allowed to set payment token (462ms)
      ✔ getVersionKey() success (76ms)
      ✔ getLicenseKey() success (130ms)
      ✔ execTransaction() success (488ms)
      ✔ execTransaction() fail: is not built (177ms)
      ✔ execTranscation() fail: is not owner (171ms)
      ✔ supportsInterface() success (349ms)
    Badger: BadgerScout.sol
      ✔ initialize() fail: cannot call twice (132ms)
      ✔ setOrganizationURI() success (265ms)
      ✔ setOrganizationURI() fail: not owner (117ms)
      ✔ setBadge() success (489ms)
      ✔ setBadge() fail: not leader (130ms)
      ✔ setBadge() fail: uri cannot be empty (123ms)
      ✔ setBadge() success (496ms)
      ✔ setClaimable() success (367ms)
      ✔ setClaimable() fail: not real badge (133ms)
      ✔ setClaimable() fail: not leader (93ms)
      ✔ setAccountBound() success (803ms)
      ✔ setAccountBound() fail: not real badge (129ms)
      ✔ setAccountBound() fail: not leader (109ms)
      ✔ setSigner() success (789ms)
      ✔ setSigner() fail: not real badge (98ms)
      ✔ setSigner() fail: not leader (142ms)
      ✔ setBadgeURI() success (165ms)
      ✔ setBadgeURI() fail: not real badge (129ms)
      ✔ setBadgeURI() fail: not leader (139ms)
      ✔ setBadgeURI() fail: uri cannot be empty (92ms)
      ✔ setPaymentToken() success (231ms)
      ✔ setPaymentToken() fail: not real badge (56ms)
      ✔ setPaymentToken() fail: not leader (131ms)
      ✔ setDelegates() success (806ms)
      ✔ setDelegates() fail: not real badge (114ms)
      ✔ setDelegates() fail: not leader (124ms)
      ✔ setDelegates() fail: arrays not equal length (111ms)
      ✔ setDelegatesBatch() success (334ms)
      ✔ setDelegatesBatch() fail: not real badge (115ms)
      ✔ setDelegatesBatch() fail: not leader (138ms)
      ✔ setDelegatesBatch() fail: arrays not equal length (137ms)
      ✔ execTransaction() success (497ms)
      ✔ execTransaction() fail: is not built (141ms)
      ✔ execTranscation() fail: is not owner (128ms)
    Badger: BadgerOrganization.sol
      ✔ leaderMint() success (198ms)
      ✔ leaderMint() fail: not real badge (113ms)
      ✔ leaderMint() fail: not leader (93ms)
      ✔ leaderMintBatch() success (246ms)
      ✔ leaderMintBatch() fail: not real badge (146ms)
      ✔ leaderMintBatch() fail: not leader (153ms)
      ✔ leaderMintBatch() fail: arrays not equal length (173ms)
      ✔ leaderMintFullBatch() success (210ms)
      ✔ leaderMintFullBatch() success: delegate (409ms)
      ✔ leaderMintFullBatch() fail: not real badge (127ms)
      ✔ leaderMintFullBatch() fail: not leader (106ms)
      ✔ leaderMintFullBatch() fail: arrays not equal length (123ms)
      ✔ revoke() success (184ms)
      ✔ revoke() fail: insufficient balance (113ms)
      ✔ revoke() fail: not leader (123ms)
      ✔ revokeBatch() (471ms)
      ✔ revokeBatch() fail: not leader (123ms)
      ✔ revokeBatch() fail: arrays not equal length (107ms)
      ✔ revokeFullBatch() success (216ms)
      ✔ revokeFullBatch() success: delegate (500ms)
      ✔ revokeFullBatch() fail: insufficient balance (110ms)
      ✔ revokeFullBatch() fail: not leader (108ms)
      ✔ revokeFullBatch() fail: arrays not equal length (109ms)
      ✔ forfeit() success (202ms)
      ✔ forfeit() fail: insufficient balance (124ms)
      ✔ safeTransferFrom() success (667ms)
      ✔ safeTransferFrom() success: leader can transfer account bound (782ms)
      ✔ safeTransferFrom() success: delegate can transfer account bound (1165ms)
      ✔ safeTransferFrom() success: can transfer to contract (434ms)
      ✔ safeTransferFrom() fail: transferring out of contract as user (114ms)
      ✔ safeTransferFrom() fail: account bound (529ms)
      ✔ safeBatchTransferFrom() success (748ms)
      ✔ safeBatchTransferFrom() success: leader can transfer account bound (952ms)
      ✔ safeBatchTransferFrom() success: delegate can transfer account bound (1106ms)
      ✔ safeBatchTransferFrom() success: can transfer to contract (431ms)
      ✔ safeBatchTransferFrom() fail: transferring out of contract as user (115ms)
      ✔ safeBatchTransferFrom() fail: account bound (542ms)
      ✔ depositETH() success (667ms)
      ✔ depositETH() fail: not real badge (158ms)
      ✔ depositETH() fail: not claimable (533ms)
      ✔ depositETH() fail: invalid payment token (650ms)
      ✔ depositERC20() success (1397ms)
      ✔ depositERC20() fail: not real badge (128ms)
      ✔ depositERC20() fail: not claimable (455ms)
      ✔ depositERC20() fail: invalid payment token (571ms)
      ✔ depositERC20() fail: not enough allowance (1067ms)
      ✔ onERC1155Received() success (1135ms)
      ✔ onERC1155Received() success: normal transfer (520ms)
      ✔ onERC1155Received() fail: not real badge (200ms)
      ✔ onERC1155Received() fail: not claimable (368ms)
      ✔ onERC1155Received() fail: invalid payment token (673ms)
      ✔ onERC1155Received() fail: not enough balance (668ms)
      ✔ onERC721Received() success (3615ms)
      ✔ onERC721Received() success: normal transfer (355ms)
      ✔ onERC721Received() fail: not real badge (254ms)
      ✔ onERC721Received() fail: not claimable (1001ms)
      ✔ onERC721Received() fail: invalid payment token (768ms)
      ✔ claimMint() success: signature (1817ms)
      ✔ claimMint() success: claimable (1773ms)
      ✔ claimMint() fail: invalid signature (1404ms)
      ✔ claimMint() fail: not real badge (833ms)
      ✔ claimMint() fail: not claimable (372ms)
      ✔ claimMint() fail: amount is zero (108ms)
      ✔ claimMint() fail: has not funded (391ms)
      ✔ uri() success: has badge uri (86ms)
      ✔ uri() success: no badge uri (138ms)
      ✔ contractURI() success (155ms)
      ✔ supportsInterface() success (654ms)


  118 passing (54s)

----------------------------------|----------|----------|----------|----------|----------------|
File                              |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
----------------------------------|----------|----------|----------|----------|----------------|
 BadgerOrganization\              |      100 |      100 |      100 |      100 |                |
  BadgerOrganization.sol          |      100 |      100 |      100 |      100 |                |
  BadgerScout.sol                 |      100 |      100 |      100 |      100 |                |
 BadgerOrganization\interfaces\   |      100 |      100 |      100 |      100 |                |
  BadgerOrganizationInterface.sol |      100 |      100 |      100 |      100 |                |
  BadgerScoutInterface.sol        |      100 |      100 |      100 |      100 |                |
 Badger\                          |      100 |      100 |      100 |      100 |                |
  Badger.sol                      |      100 |      100 |      100 |      100 |                |
  BadgerVersions.sol              |      100 |      100 |      100 |      100 |                |
 Badger\interfaces\               |      100 |      100 |      100 |      100 |                |
  BadgerInterface.sol             |      100 |      100 |      100 |      100 |                |
  BadgerVersionsInterface.sol     |      100 |      100 |      100 |      100 |                |
 Mocks\                           |      100 |      100 |      100 |      100 |                |
  MockERC1155.sol                 |      100 |      100 |      100 |      100 |                |
  MockERC20.sol                   |      100 |      100 |      100 |      100 |                |
  MockERC721.sol                  |      100 |      100 |      100 |      100 |                |
----------------------------------|----------|----------|----------|----------|----------------|
All files                         |      100 |      100 |      100 |      100 |                |
----------------------------------|----------|----------|----------|----------|----------------|
```