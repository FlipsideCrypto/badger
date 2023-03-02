require("hardhat-gas-reporter");
require('hardhat-deploy');
require("hardhat-watcher");
require("hardhat-tracer");
require("hardhat-abi-exporter");
require("@nomiclabs/hardhat-etherscan");
require('solidity-coverage');
require('@nomicfoundation/hardhat-chai-matchers')
require("dotenv").config();

// All of these keys have been knowingly leaked to make the startup process easier for new onboards.
// Do not use any of these keys in production.
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;
const PRIVATE_KEY_ACCOUNTS = [process.env.PRIVATE_KEY];

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

task("deploy", "Deploys the protocol")
    .addFlag("verify", "Verify the deployed contracts on Etherscan")
    .setAction(async (taskArgs, hre) => {
        // Compiling all of the contracts again just in case
        await hre.run('compile');
        
        const [deployer] = await ethers.getSigners();
        const balance = ethers.utils.formatEther(await deployer.getBalance());
    
        console.table({
            "Deployer Address": deployer.address,
            "Deployer Balance": balance,
        })
        
        const BadgerSingleton = await ethers.getContractFactory("BadgerOrganization");
        badgerSingleton = await BadgerSingleton.deploy();
        badgerSingleton = await badgerSingleton.deployed();
        console.log("✅ Organization Implementation Deployed.");
        
        const chainId = await getChainId();
        organizationDeployment = {
            "Chain ID": chainId,
            "Deployer": deployer.address,
            "Organization Implementation Address": badgerSingleton.address,
            "Remaining ETH Balance": parseInt((await deployer.getBalance()).toString()) / 1000000000000000000,
        };
        console.table(organizationDeployment);

        // Deploy the protocol
        const BadgerFactory = await ethers.getContractFactory("Badger");
        badgerFactory = await BadgerFactory.deploy(badgerSingleton.address);
        badgerFactory = await badgerFactory.deployed();
        console.log("✅ Badger Deployed.");

        badgerDeployment = {
            "Chain ID": chainId,
            "Deployer": deployer.address,
            "Badger Address": badgerFactory.address,
            "Remaining ETH Balance": parseInt((await deployer.getBalance()).toString()) / 1000000000000000000,
        }
        console.table(badgerDeployment);

        // Verifying
        if (taskArgs.verify !== false && chainId != '31337') {

            // Give time for etherscan to confirm the contract before verifying.
            await new Promise(r => setTimeout(r, 30000));
            await hre.run("verify:verify", {
                address: organizationMaster.address,
                constructorArguments: [],
            });
            console.log("✅ Organization Implementation Verified.")

            await new Promise(r => setTimeout(r, 30000));
            await hre.run("verify:verify", {
                address: badger.address,
                constructorArguments: [badger.address],
            });
            console.log("✅ Badger Verified.")
        }
    });


module.exports = {
    solidity: {
        compilers: [
            {
                version: "0.8.16",
                settings: {
                    optimizer: { // Keeps the amount of gas used in check
                        enabled: true,
                        runs: 1000000000
                    }
                }
            }
        ],
    },
    gasReporter: {
        currency: 'USD',
        gasPrice: 60,
        coinmarketcap: COINMARKETCAP_API_KEY,
        showMethodSig: true,
        showTimeSpent: true,
        noColors: true,
        outputFile: 'build/gas-report.txt'
    },
    watcher: {
        compilation: {
            tasks: ["compile"],
            files: ["./contracts"],
            verbose: true,
        },
        ci: {
            tasks: ["clean", { command: "compile", params: { quiet: true } }, { command: "test", params: { noCompile: true, testFiles: ["./test/"] } }],
        }
    },
    etherscan: {
        apiKey: {
            goerli: ETHERSCAN_API_KEY,
            mumbai: POLYGONSCAN_API_KEY,
            mainnet: ETHERSCAN_API_KEY,
            matic: POLYGONSCAN_API_KEY,
        }
    },
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 1337,
            gas: "auto",
            gasPrice: "auto",
            saveDeployments: false,
            mining: {
                auto: true
                // auto: false,
                // order: 'fifo',
                // interval: 1500,
            }
        },
        goerli: {
            url: `https://eth-goerli.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
            accounts: PRIVATE_KEY_ACCOUNTS,
            gasPrice: 5000000000, // 5 gwei
        },
        mumbai: {
            url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
            accounts: PRIVATE_KEY_ACCOUNTS,
            gas: 3000000,
            gasPrice: 100000000000 // 100 gwei
        },
        mainnet: {
            url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
            accounts: PRIVATE_KEY_ACCOUNTS,
            gasPrice: 50000000000, // 50 gwei
        },
        polygon: {
            url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
            accounts: PRIVATE_KEY_ACCOUNTS,
            gasPrice: 'auto'
        },
    },
    abiExporter: [{
        path: './build/abis/',
        runOnCompile: true,
        clear: true,
        flat: true,
        format: "json"
    }, {
        path: '../frontend/src/abis/',
        runOnCompile: true,
        clear: true,
        flat: true,
        spacing: 4,
        format: "json"
    }, {
        path: '../api/abis/',
        runOnCompile: true,
        clear: true,
        flat: true,
        pretty: true
    }, {
        path: '../api/abis/full/',
        runOnCompile: true,
        clear: true,
        flat: true,
        format: "json"
    }]
};