## Badger API

The API serves and stores related ownership of Orgs and Badgers to users, as well as any custom tags applied to a user by the Owner of an Org.

Authentication is gated to a wallet address with the use of Sign In With Ethereum. In order for any access to data related to a User's Organizations or Badges, the front end client must have used SIWE to prove their ownership of that address. If ownership of an address is not confirmed, that client will have no access to any data stored in the database.

## Prerequisites

- fork the repo
- terminal: `cd api`
- install Docker

- terminaL `npm i`
- setup your `.env` (in `~root/contracts/`) to reflect `example.env`

**Important:** If you do not set Pinata keys in your `.env`, you will not be able to upload images to IPFS which will currently cause the API to halt and fail.

#### Running the API

The development environment for the API is built using Docker to minimize the amount of pain experienced when getting things running. Docker is super confusing so if you know how to do this better, please submit a PR <3.

- `docker compose run web python manage.py migrate`
- `docker compose up --build`