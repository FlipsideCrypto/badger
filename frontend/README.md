## Badger App

The Badger App serves as the interface for the Primitive contracts and self-indexing database. 

## Running The Repository

**Important:** No matter how hard you try if you do not make sure the items below are completed before trying to run the front-end, things will not function properly. Yes, there are a lot of things you have to setup and configure to get a local version running. There are lots of moving pieces. 

Getting the frontend can only be done after the contracts have been taken care of as well as the backend is running.

### Pre-requisites

- fork the repo

- [run local hardhat node](../contracts/README.md#running-local-hardhat-node)
- [deploy contracts to local hardhat node](../contracts/README.md#deploying-to-local-hardhat-node)
- [run local api](../api/README.md#running-the-api)

- terminal: `cd frontend`
- terminal: `npm i`
- setup your .env (in ~root/frontend/) to reflect example.env
- setup your .envrc (in ~root/frontend/) to reflect example.envrc

**Important:** `.envrc` - Requires a Pro level API key for Font Awesome for icons used. Things will not work properly without a pro key.

### Running The App
- `npm start`
