![opengraph](frontend/src/static/images/opengraph.png)

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

## Running The Dapp

- Node.js 
- Docker

### Prerequisites
- fork the repo
- setup `.env` to reflect `example.env` with your choosing of keys
- terminal: `docker compose build` (let everything build)
- grab the contract addresses that were just deployed with docker (the address will remain the same) in `.env`
- terminal: `docker compose up --build`

### Helpers

- Migrating the database: The Badger backend is built using Django. Anytime there are changes to the database schema the migrations need to be made and applied. If you're just forking, we've already pre-built the migrations, you just need to apply them to your database. Migrations are automatically applied when you build using Docker, but if you have an issue this is how you can migrate the database manually. 
    - terminal: `docker compose run --rm web python manage.py migrate`

To run the tests with coverage included:
- terminal: `npx hardhat coverage --network localhost`

## Contract Tests

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
      ✔ Should deploy the Badger contract (99ms)
      ✔ Should deploy the Organization contract (99ms)
      ✔ createOrganization() success (533ms)
      ✔ createOrganization() success: payable (1494ms)
      ✔ createOrganization() fail: insufficient funding (173ms)
      ✔ onERC1155Received() fail: invalid payment token (976ms)
    Badger: BadgerVersions.sol
      ✔ setVersion() success (307ms)
      ✔ setVersion() success: exogenous (1103ms)
      ✔ setVersion() fail: locked (451ms)
      ✔ setVersion() fail: not allowed to set payment token (1163ms)
      ✔ getVersionKey() success (76ms)
      ✔ getLicenseKey() success (104ms)
      ✔ execTransaction() success (489ms)
      ✔ execTransaction() fail: is not built (176ms)
      ✔ execTranscation() fail: is not owner (185ms)
      ✔ supportsInterface() success (346ms)
    Badger: BadgerScout.sol
      ✔ initialize() fail: cannot call twice (131ms)
      ✔ setOrganizationURI() success (291ms)
      ✔ setOrganizationURI() fail: not owner (108ms)
      ✔ setBadge() success (442ms)
      ✔ setBadge() fail: not leader (118ms)
      ✔ setBadge() fail: uri cannot be empty (122ms)
      ✔ setBadge() success (359ms)
      ✔ setClaimable() success (386ms)
      ✔ setClaimable() fail: not real badge (113ms)
      ✔ setClaimable() fail: not leader (138ms)
      ✔ setAccountBound() success (721ms)
      ✔ setAccountBound() fail: not real badge (90ms)
      ✔ setAccountBound() fail: not leader (119ms)
      ✔ setSigner() success (662ms)
      ✔ setSigner() fail: not real badge (113ms)
      ✔ setSigner() fail: not leader (82ms)
      ✔ setBadgeURI() success (225ms)
      ✔ setBadgeURI() fail: not real badge (125ms)
      ✔ setBadgeURI() fail: not leader (113ms)
      ✔ setBadgeURI() fail: uri cannot be empty (105ms)
      ✔ setPaymentToken() success (228ms)
      ✔ setPaymentToken() fail: not real badge (113ms)
      ✔ setPaymentToken() fail: not leader (138ms)
      ✔ setDelegates() success (635ms)
      ✔ setDelegates() fail: not real badge (97ms)
      ✔ setDelegates() fail: not leader (105ms)
      ✔ setDelegates() fail: arrays not equal length (109ms)
      ✔ setDelegatesBatch() success (321ms)
      ✔ setDelegatesBatch() fail: not real badge (129ms)
      ✔ setDelegatesBatch() fail: not leader (130ms)
      ✔ setDelegatesBatch() fail: arrays not equal length (92ms)
      ✔ execTransaction() success (510ms)
      ✔ execTransaction() fail: is not built (138ms)
      ✔ execTranscation() fail: is not owner (142ms)
    Badger: BadgerOrganization.sol
      ✔ leaderMint() success (227ms)
      ✔ leaderMint() fail: not real badge (124ms)
      ✔ leaderMint() fail: not leader (111ms)
      ✔ leaderMintBatch() success (230ms)
      ✔ leaderMintBatch() fail: not real badge (141ms)
      ✔ leaderMintBatch() fail: not leader (112ms)
      ✔ leaderMintBatch() fail: arrays not equal length (120ms)
      ✔ leaderMintFullBatch() success (249ms)
      ✔ leaderMintFullBatch() success: delegate (342ms)
      ✔ leaderMintFullBatch() fail: not real badge (125ms)
      ✔ leaderMintFullBatch() fail: not leader (159ms)
      ✔ leaderMintFullBatch() fail: arrays not equal length (169ms)
      ✔ revoke() success (214ms)
      ✔ revoke() fail: insufficient balance (111ms)
      ✔ revoke() fail: not leader (144ms)
      ✔ revokeBatch() (428ms)
      ✔ revokeBatch() fail: not leader (128ms)
      ✔ revokeBatch() fail: arrays not equal length (108ms)
      ✔ revokeFullBatch() success (232ms)
      ✔ revokeFullBatch() success: delegate (389ms)
      ✔ revokeFullBatch() fail: insufficient balance (112ms)
      ✔ revokeFullBatch() fail: not leader (167ms)
      ✔ revokeFullBatch() fail: arrays not equal length (94ms)
      ✔ forfeit() success (137ms)
      ✔ forfeit() fail: insufficient balance (142ms)
      ✔ safeTransferFrom() success (568ms)
      ✔ safeTransferFrom() success: leader can transfer account bound (835ms)
      ✔ safeTransferFrom() success: delegate can transfer account bound (931ms)
      ✔ safeTransferFrom() success: can transfer to contract (403ms)
      ✔ safeTransferFrom() fail: transferring out of contract as user (99ms)
      ✔ safeTransferFrom() fail: account bound (539ms)
      ✔ safeBatchTransferFrom() success (543ms)
      ✔ safeBatchTransferFrom() success: leader can transfer account bound (887ms)
      ✔ safeBatchTransferFrom() success: delegate can transfer account bound (1151ms)
      ✔ safeBatchTransferFrom() success: can transfer to contract (451ms)
      ✔ safeBatchTransferFrom() fail: transferring out of contract as user (125ms)
      ✔ safeBatchTransferFrom() fail: account bound (497ms)
      ✔ depositETH() success (711ms)
      ✔ depositETH() fail: not real badge (110ms)
      ✔ depositETH() fail: not claimable (637ms)
      ✔ depositETH() fail: invalid payment token (650ms)
      ✔ depositERC20() success (1256ms)
      ✔ depositERC20() fail: not real badge (172ms)
      ✔ depositERC20() fail: not claimable (392ms)
      ✔ depositERC20() fail: invalid payment token (618ms)
      ✔ depositERC20() fail: not enough allowance (933ms)
      ✔ onERC1155Received() success (1041ms)
      ✔ onERC1155Received() success: normal transfer (467ms)
      ✔ onERC1155Received() fail: not real badge (208ms)
      ✔ onERC1155Received() fail: not claimable (420ms)
      ✔ onERC1155Received() fail: invalid payment token (694ms)
      ✔ onERC1155Received() fail: not enough balance (709ms)
      ✔ onERC721Received() success (3531ms)
      ✔ onERC721Received() success: normal transfer (263ms)
      ✔ onERC721Received() fail: not real badge (187ms)
      ✔ onERC721Received() fail: not claimable (935ms)
      ✔ onERC721Received() fail: invalid payment token (728ms)
      ✔ claimMint() success: signature (1877ms)
      ✔ claimMint() success: claimable (1709ms)
      ✔ claimMint() fail: invalid nonce (1666ms)
      ✔ claimMint() fail: invalid signature (1579ms)
      ✔ claimMint() fail: not real badge (930ms)
      ✔ claimMint() fail: not claimable (342ms)
      ✔ claimMint() fail: amount is zero (125ms)
      ✔ claimMint() fail: has not funded (313ms)
      ✔ uri() success: has badge uri (90ms)
      ✔ uri() success: no badge uri (129ms)
      ✔ contractURI() success (103ms)
      ✔ supportsInterface() success (490ms)


  119 passing (55s)

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
