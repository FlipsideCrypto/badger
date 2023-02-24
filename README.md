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