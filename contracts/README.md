# Badger Contracts

The primitive of Badger has been designed to offer a maximum amount of optionality to every consuming user. 

## The Manager Pattern

Every Badge Organization and Badge has an optional set of `Managers` that permits shared-access to admin-level functions of the relative scope.

* An Organization Manager operates as one would expect to a real-world business; the owner implicitly trusts the manager and has given shared access to key functions.
    * Create, mint and revoke new Badges.
    * Adjust the delegates of all Badges.
    * The only action that an Organization Manager cannot do is add new Managers or resign from the position however the Owner may remove the Manager.
* A Badge Manager operates with shared logic to the Organization Manager while strictly scoped to the level of a single token.
    * Mint and revoke the assigned Badge.
    * The only action that an Badge Manager cannot do is add new Managers or resign from the position however the Owner and other Organization Managers may remove the Badge Manager.

## Psuedonym Bound Badges

The only 'required' functionality that cannot be adjusted being the ability for Badge holders to `forfeit` their Badges. Badger is a set of contracts aimed at providing a flexible and modular system to drive on-chain permissions and access policies.

While a user has the ability to mark a Badge as `accountBound` (or not), every user will always have the ability to forfeit their token to prevent the token from being used by a malicious actor or standing as a liability to the user in form of scarlet letter.

Additionally, a user may have many wallets and therefore more than 1 "soul". In order to prevent a user from being able to use a Badge in multiple wallets, the user may mark their Badge as `psuedonymBound`. This will prevent the user from being able to use the Badge in any other wallet while establishing the correct social contract that Badges are not means of **identity resolution**.

# When the contracts are updated

- [ ] Update the abis in the api at `~.\api\abis`
- [ ] Update the abis in the front-end at `~.\frontend\src\abis\`