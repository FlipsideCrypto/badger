# Badger Contracts

Badger is an opionionated-by-default primitive designed to drive the actions of on-chain Organizations and their members with Badges. As a primitive, the contracts have been designed to remove the need of including any opinionated logic in the core contracts while maintaining the ability of a user-specific solution. 

While the core contracts are opinionless, `Hooks` and `Managers` can be used to introduce opinionated logic to the system depending on the need of each Badge, Organization or even Manager. Further, instead of having to apply opinion organization-wide, `Hooks` and `Managers` can be applied to a single Badge while still maintaing the ability to set global values when wanted.

```ml
contracts
├─ (🏠 = Organization || 🏷️ = Badge)
├─ hooks 
──├── forfeit
─────├─ 🏷️ BadgerForfeitForbidden - "Forfeiting a Badge is not allowed."
──├── hook
─────├─ 🏠 BadgerHookBlocklist - "Forbids certain addresses from being enabled as a Hook."
──├── mint
─────├─ 🏷️ BadgerMintMax - "Maximum number of Badges that can be minted to a recipient."
─────├─ 🏷️ BadgerMintMaxAllowance - "Maximum number of Badges that can be minted by a specific manager."
─────├─ 🏷️ BadgerMintMaxSupply - "Maximum number of Badges that can be minted."
─────├─ 🏷️ BadgerMintSelf - "Mint mechanism that requires the recipient to be the caller."
──├── revoke
─────├─ 🏷️ BadgerRevokeForbidden - "Revoking a Badge is not allowed."
──├── transfer
─────├─ 🏠 BadgerTransferBlocklist - "Addresses that are not allowed to receive any Badge."
─────├─ 🏷️ BadgerTransferBound - "Enforce account bound functionality per token id."
─────├─ 🏷️ BadgerTransferBoundManaged - "Enforce account bound functionality that can be overridden by a Manager."
──├── types
─────├─ BadgerForfeitHook - "Type declaration of interface for a Forfeit Hook."
─────├─ BadgerHookHook - "Type declaration of interface for a Hook Hook."
─────├─ BadgerMintHook - "Type declaration of interface for a Mint Hook."
─────├─ BadgerRevokeHook - "Type declaration of interface for a Revoke Hook."
─────├─ BadgerTransferHook - "Type declaration of interface for a Transfer Hook."
──├── BadgerHook - "Minimal framework for a Badger Organization Hook."
──├── BadgerHooked - "Logic that drives the consumption of Organization Hooks."
├─ interfaces
──├── IBadger - "Interface to of Badger Factory to enable programatic Organization creation."
──├── IBadgerConfigured - "Interface to a Badger Module that can be configured."
──├── IBadgerHook - "Interface of a Hook powering exogenous logic of an Organization."
──├── IBadgerHooked - "Interface of the logic driving the consumption of Organization Hooks."
──├── IBadgerManaged - "Interface of the logic driving the consumption of Organization Managers."
──├── IBadgerOrganization - "Non-admin interface for Badger Organization consumption."
──├── IBadgerOrganizationLogic - "Admin-level interface for the backend framework that drives an Organization."
├─ managers
──├── 🏷️ BadgerManagerClaimable - "Enable an open-edition claiming where users can claim a Badge at no cost."
──├── 🏷️ BadgerManagerPaidERC20 - "Mint using ERC20s as a Payment Token to mint Badges."
──├── 🏷️ BadgerManagerPaidERC721 - "Mint using ERC721s as a Payment Token to mint Badges."
──├── 🏷️ BadgerManagerPaidERC1155 - "Mint using ERC1155s as a Payment Token to mint Badges."
──├── 🏷️ BadgerManagerPaidNative - "Mint using native tokens as a Payment Token to mint Badges."
──├── 🏷️ BadgerManagerSignature - "Mint gated by a system signature when minting Badges."
├─ Badger - "Factory that deploys new Badger Organizations and Badges."
├─ BadgerNetwork - "Inline controller of configuring a Badger Module."
├─ BadgerOrganization - "The logic driving the non-admin functions of a Badger Organization."
├─ BadgerOrganizationLogic - "The state of the Organization and Badges and all admin-level functions an Organization has."
```

## The Shape of an Organization

Badger Organizations are built with a rather straightforward middle-out approach. Designed to scale in both directions of need: case-specific centralization and decentralization live at the core of how Organizations have been built.

At the core, Organizations are deployed by a Factory and instantiated with just an Owner. An Owner has the ability to empower Managers, connect Hooks, create Badges and more all in a single interface and localized smart contract.

* There are Organizations with Badges and Managers.
* There are Badges with Members and Managers.
* There are Modules that can be plugged in at a object-level to enable new functionality.

*Organizations grow and evolve over time and Badger is prepared to support that change.* With `Hooks`, not only can old functionality be disabled, but new `Hooks` and `Managers` can be integrated that drive the future needs without abandoning the historical power and integration of the existing Organization.

## The Manager Pattern

Every Organization and Badge has an optional set of `Managers` that permits shared access to admin-level functions of the relative scope.

* An Organization Manager operates as one would expect to a real-world business; the owner implicitly trusts the manager and has given shared access to key functions.
    * Create, mint and revoke new Badges.
    * Adjust the delegates of all Badges.
    * The only action that an Organization Manager cannot do is add new Managers or resign from the position however the Owner may remove the Manager.
* A Badge Manager operates with shared logic to the Organization Manager while strictly scoped to the level of a single token.
    * Mint and revoke the assigned Badge.
    * The only action that an Badge Manager cannot do is add new Managers or resign from the position however the Owner and other Organization Managers may remove the Badge Manager.

## Immutable Hooks and Managers

When developing Hooks and Managers that drive a Badger Organization, it has been made of utmost important to make modules ***immutable and ownerless***. Meaning, while the Badger team may develop and deploy a module that Organizations consume, there is no mechanism of changing the connected smart contract. With this architecture, everything is constantly localized to the sender of the message.

* When writing the configuration, the reference is set to the `msg.sender`.
* Execution of a `Hook` is triggered by the consuming Organization, not an external reference or sender.
* Usage of a `Manager` precedes the execution of an Organization action.
* A Badge can be assigned many `Managers` and `Hooks` specific to the needs of each Badge.

Although there has been a foundational framework of hooks and managers offered. Those with the knowledge and experience to write their own hooks and managers are encouraged to do so.

* **Hook Hooks:** Hooks that are triggered when a hook is set with an active `isHook`.
* **Mint Hooks:** Hooks that are triggered when a Badge is minted.
* **Revoke Hooks:** Hooks that are triggered when a Badge is revoked.
* **Forfeit Hooks:** Hooks that are triggered when a Badge is forfeited.
* **Transfer Hooks:** Hooks that are triggered when a Badge is transferred.

## Revokability

Out of the gate, Badger Organizations are empowered with the ability to have `Revokable` Badges under the control of Organization and Badge Managers (depending on the respective configuration of each.) Badger is designed to drive complex permissions and on-chain access policies with the addition of permission revocation: a critical feature to any permission system.

Although Badges are designed to be revokable by default, a `RevokeHook` may be applied to a Badge to prevent revocation such as `BadgerRevokeForbidden.sol`. This is useful for Badges that are meant to be permanent and not revokable.

## Eternal Forfeits

The final piece of semi-opinion included in the default operation of Badger is that token forfeiture is recommended and enabled by default however again by be prevented with a hook in `ForfeitHook` such as `BadgerForfeitForbidden.sol`.

> Notably, while the mechanism of permanent account binding is possible, it is not recommended. This is because the social contract of Badges is that they are not means of identity resolution and that a Badge holder may forfeit their Badge at any time.

## Types...? In Solidity?

The Badger Organization is designed to be a framework for the creation of Badges and Organizations. To enable this, consumption of Hooks is driven by the decoding of the `bytes` data that is passed to the `execute` function. This is done by the `BadgerOrganizationHooked.sol` contract. 

With a DRY approach, the types offered serve as a boilerplate template to implement a new hook of a specific type.

* `CONFIG_SCHEMA` reflects the bytes schema needed when calling `.config()`
* `EXECUTE_SCHEMA` reflects the bytes schema needed when calling `.execute()`

## Audit

Badger V6 is in the process of being audited. Responses will be made public once it has been completed and all issues have been resolved.

## Testing the Contract

It is important that we know the contract is healthy and fully covered with tests at all times. While 100% coverage does not mean there is no nuance to keep in mind, it does allow you to move forward without constant concern of being blindsided.

```bash
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
