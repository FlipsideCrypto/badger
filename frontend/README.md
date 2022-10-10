## Badger App

The Badger App serves as the interface for the Primitive contracts and self-indexing database. 

### Dev Environment
The Badger app is relatively simple to run.

First, ensure that the .env and .envrc files are created and match the example .envs provided.

**.env** - This set up is intended for a local hardhat node. The Badger Addresses and Implementation contract addresses will change on local deployment, so be sure to update once the [contracts are deployed](https://github.com/utc-24/authkey/blob/main/contracts/README.md). Alternatively, a test net deployment can be used once provided.
``
REACT_APP_API_URL  =  "http://localhost:8000"
REACT_APP_BADGER_ADDRESSES  = {"Hardhat":""}
REACT_APP_BADGER_IMPLEMENTATION  =  ""
REACT_APP_ALCHEMY_API_KEY  =  "P3MGWutejAYN_-7arbflYIPrZRK28kZl"
REACT_APP_PRODUCTION_CHAIN  =  "Hardhat"
``
**.envrc** - Requires a Pro level API key for Font Awesome for icons used.
``
FONTAWESOME_NPM_AUTH_TOKEN=""
``

Once the environment variables are set, install dependencies with:
``npm install`` 
and finally run it with:
 ``npm start``.