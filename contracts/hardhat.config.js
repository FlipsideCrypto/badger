require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require('hardhat-deploy');
require("hardhat-watcher");
require("hardhat-tracer");

require("@nomiclabs/hardhat-etherscan");

const { 
    PRIVATE_KEY, 
    ALCHEMY_API_KEY, 
    ETHERSCAN_API_KEY,
    SEED_PHRASE,
} = require("./secrets.json");

task("accounts", "Prints the list of accounts", async(taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: {
        compilers: [
            {
              version: "0.8.7",
                settings: {
                    optimizer: { // Keeps the amount of gas used in check
                        enabled: true,
                        runs: 1000
                    }
                }
            },
            {
              version: "0.8.9",
              settings: {
                optimizer: { // Keeps the amount of gas used in check
                    enabled: true,
                    runs: 1000
                }
            }
            }
        ],
    },
    gasReporter: {
        currency: 'USD',
        gasPrice: 60,
        coinmarketcap: '9896bb6e-1429-4e65-8ba8-eb45302f849b',
        showMethodSig: true,
        showTimeSpent: true,
    },
    watcher: {
        compilation: {
            tasks: ["compile"],
            files: ["./contracts"],
            verbose: true,
        },
        ci: {
            tasks: ["clean", { command: "compile", params: { quiet: true } }, { command: "test", params: { noCompile: true, testFiles: ["testfile.ts"] } }],
        }
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY
    },
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            gas: "auto",
            gasPrice: "auto",
            saveDeployments: false,
        },
        rinkeby: {
            url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
            accounts: [`0x${PRIVATE_KEY}`],
            gasPrice: 5000000000, // 5 gwei
        },
        mainnet: {
            url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
            accounts: { mnemonic: SEED_PHRASE },
            gasPrice: 50000000000, // 50 gwei
        },
    },
};