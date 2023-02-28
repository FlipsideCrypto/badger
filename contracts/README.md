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

To run the smart contracts you may run:

```bash
npx hardhat test .\test\Badger.js --verbose --fulltrace
```

```ml
·------------------------------------------------------------------------------------|---------------------------|--------------------|-----------------------------·
|                                Solc version: 0.8.16                                ·  Optimizer enabled: true  ·  Runs: 1000000000  ·  Block limit: 30000000 gas  │
·····················································································|···························|····················|······························
|  Methods                                                                                                                                                          │
·······················|·····························································|·············|·············|····················|···············|··············
|  Contract            ·  Method                                                     ·  Min        ·  Max        ·  Avg               ·  # calls      ·  usd (avg)  │
·······················|·····························································|·············|·············|····················|···············|··············
|  Badger              ·  createOrganization((address,string,string,string,string))  ·          -  ·          -  ·            239920  ·            2  ·          -  │
·······················|·····························································|·············|·············|····················|···············|··············
|  BadgerOrganization  ·  forfeit(uint256,uint256,bytes)                             ·          -  ·          -  ·             34810  ·            1  ·          -  │
·······················|·····························································|·············|·············|····················|···············|··············
|  BadgerOrganization  ·  mint(address,uint256,uint256,bytes)                        ·          -  ·          -  ·             59738  ·            2  ·          -  │
·······················|·····························································|·············|·············|····················|···············|··············
|  BadgerOrganization  ·  mintBatch(address[],uint256,uint256[],bytes)               ·          -  ·          -  ·             92999  ·            1  ·          -  │
·······················|·····························································|·············|·············|····················|···············|··············
|  BadgerOrganization  ·  multicall(bytes[])                                         ·          -  ·          -  ·            134945  ·            1  ·          -  │
·······················|·····························································|·············|·············|····················|···············|··············
|  BadgerOrganization  ·  revoke(address,uint256,uint256)                            ·          -  ·          -  ·             36912  ·            1  ·          -  │
·······················|·····························································|·············|·············|····················|···············|··············
|  BadgerOrganization  ·  revokeBatch(address[],uint256,uint256[])                   ·          -  ·          -  ·             38808  ·            1  ·          -  │
·······················|·····························································|·············|·············|····················|···············|··············
|  BadgerOrganization  ·  setBadgeURI(uint256,string)                                ·      52254  ·      57093  ·             54674  ·            2  ·          -  │
·······················|·····························································|·············|·············|····················|···············|··············
|  BadgerOrganization  ·  setManagers(address[],bool[])                              ·          -  ·          -  ·             52276  ·            2  ·          -  │
·······················|·····························································|·············|·············|····················|···············|··············
|  BadgerOrganization  ·  setManagers(uint256,address[],bool[])                      ·          -  ·          -  ·             52571  ·            2  ·          -  │
·······················|·····························································|·············|·············|····················|···············|··············
|  BadgerOrganization  ·  setOrganizationURI(string)                                 ·          -  ·          -  ·             34455  ·            1  ·          -  │
·······················|·····························································|·············|·············|····················|···············|··············
|  Deployments                                                                       ·                                                ·  % of limit   ·             │
·····················································································|·············|·············|····················|···············|··············
|  Badger                                                                            ·          -  ·          -  ·            472614  ·        1.6 %  ·          -  │
·····················································································|·············|·············|····················|···············|··············
|  BadgerOrganization                                                                ·          -  ·          -  ·           4721448  ·       15.7 %  ·          -  │
·····················································································|·············|·············|····················|···············|··············
|  BadgerTransferBound                                                               ·          -  ·          -  ·            526162  ·        1.8 %  ·          -  │
·------------------------------------------------------------------------------------|-------------|-------------|--------------------|---------------|-------------·
```