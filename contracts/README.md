# Badger Contracts

The primitive of Badger has been designed to offer a maximum amount of optionality to every consuming user. 

```ml
contracts
├─ hooks
| ├─ forfeit
| | ├─ BadgerForfeitForbidden - "Forfeiting a Badge is not allowed per token id."
| ├─ hook
| | ├─ BadgerHookBlocklist - "Define a list of hooks that are not allowed."
| ├─ mint
| | ├─ BadgerMintMax - "Define a maximum number of Badges that can be minted to a recipient per token id."
| | ├─ BadgerMintMaxAllowance - "Define a maximum number of Badges that can be minted by a specific manager per token id."
| | ├─ BadgerMintMaxSupply - "Define a maximum number of Badges that can be minted per token id."
| | ├─ BadgerMintSelf - "Enforce a mint mechanism that requires the recipient to be the caller per token id."
| ├─ revoke
| | ├─ BadgerRevokeForbidden - "Revoking a Badge is not allowed per token id."
| ├─ transfer
| | ├─ BadgerTransferBlocklist - "Define a list of addresses that are not allowed to receive any Badge in the Organization."
| | ├─ BadgerTransferBound - "Enforce account bound functionality per token id."
| | ├─ BadgerTransferBoundManaged - "Enforce account bound functionality per token id that can be overridden by a Manager."
| ├─ types
| | ├─ BadgerForfeitHook - "Hooks that are called before a Badge is forfeited."
| | ├─ BadgerHookHook - "Hooks that are called before a Hook is added or removed."
| | ├─ BadgerMintHook - "Hooks that are called before a Badge is minted."
| | ├─ BadgerRevokeHook - "Hooks that are called before a Badge is revoked."
| | ├─ BadgerTransferHook - "Hooks that are called before a Badge is transferred."
| ├─ BadgerOrganizationHook - "The public interface to the Hooks of an Organization."
| ├─ BadgerOrganizationHooked - "The backend framework that drives the BadgerOrganizationHook."
├─ interfaces
| ├─ IBadger - "The public interface to a Badge and the Managers within."
| ├─ IBadgerHook - "The public interface to the Hooks of an Organization."
| ├─ IBadgerOrganization - "The public interface to an Organization and the Badges within."
| ├─ IBadgerOrganizationLogic - "The public interface to the backend framework that drives the BadgerOrganization."
├─ managers
| ├─ BadgerManagerClaimable - "Enable an open-edition claiming where users can claim a Badge at no cost."
| ├─ BadgerManagerPaidERC20 - "Run a mint using ERC20s as a Payment Token to mint Badges."
| ├─ BadgerManagerPaidERC721 - "Run a mint using ERC721s as a Payment Token to mint Badges."
| ├─ BadgerManagerPaidERC1155 - "Run a mint using ERC1155s as a Payment Token to mint Badges."
| ├─ BadgerManagerPaidNative - "Run a mint using native tokens as a Payment Token to mint Badges."
| ├─ BadgerManagerSignature - "Run a mint gated by a system signature when minting Badges."
├─ BadgerOrganization - "The public interface to an Organization and the Badges within."
├─ BadgerOrganizationLogic - "The backend framework that drives the BadgerOrganization."
```

## The Manager Pattern

Every Badge Organization and Badge has an optional set of `Managers` that permits shared-access to admin-level functions of the relative scope.

* An Organization Manager operates as one would expect to a real-world business; the owner implicitly trusts the manager and has given shared access to key functions.
    * Create, mint and revoke new Badges.
    * Adjust the delegates of all Badges.
    * The only action that an Organization Manager cannot do is add new Managers or resign from the position however the Owner may remove the Manager.
* A Badge Manager operates with shared logic to the Organization Manager while strictly scoped to the level of a single token.
    * Mint and revoke the assigned Badge.
    * The only action that an Badge Manager cannot do is add new Managers or resign from the position however the Owner and other Organization Managers may remove the Badge Manager.

## Account (Psuedonym) Bound Badges

The only 'required' functionality that cannot be adjusted being the ability for Badge holders to `forfeit` their Badges. Badger is a set of contracts aimed at providing a flexible and modular system to drive on-chain permissions and access policies.

While a user has the ability to mark a Badge as `accountBound` (or not), every user will always have the ability to forfeit their token to prevent the token from being used by a malicious actor or standing as a liability to the user in form of scarlet letter.

Additionally, a user may have many wallets and therefore more than 1 "soul". In order to prevent a user from being able to use a Badge in multiple wallets, the user may mark their Badge as `psuedonymBound`. This will prevent the user from being able to use the Badge in any other wallet while establishing the correct social contract that Badges are not means of **identity resolution**.