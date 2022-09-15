require ("hardhat-gas-reporter");
require ('hardhat-deploy');
require ("hardhat-watcher");
require ("hardhat-tracer");
require ("hardhat-abi-exporter");
require ("hardhat-api-builder");
require ("hardhat-docgen");
require ("@nomiclabs/hardhat-waffle");
require ("@nomiclabs/hardhat-etherscan");

require ("dotenv").config();

task("accounts", "Prints the list of accounts", async(taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

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
        coinmarketcap: process.env.COINMARKETCAP_API_KEY,
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
    abiExporter: {
        path: './abis',
        runOnCompile: true,
        clear: true,
        flat: true,
        spacing: 2,
    },
    etherscan: {
        // apiKey: ETHERSCAN_API_KEY
        apiKey: process.env.POLYGON_API_KEY
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
            url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
            accounts: [`0x${process.env.PRIVATE_KEY}`],
            gasPrice: 5000000000, // 5 gwei
        },
        mainnet: {
            url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
            accounts: { mnemonic: process.env.SEED_PHRASE },
            gasPrice: 50000000000, // 50 gwei
        },
        polygon: {
            url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
            accounts: [`0x${process.env.PRIVATE_KEY}`],
            gasPrice: 'auto'
        },
        mumbai: {
            url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_MUMBAI_KEY}`,
            accounts: [`0x${process.env.PRIVATE_KEY}`],
            gas: 3000000,
            gasPrice: 100000000000 // 100 gwei
        }
    },
};