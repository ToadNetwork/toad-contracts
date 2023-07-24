require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const PRIVATE_KEY_1 = process.env.PRIVATE_KEY_SIGNATURE_1;
const PRIVATE_KEY_2 = process.env.PRIVATE_KEY_SIGNATURE_2;
const ETHERSCAN_KEY = process.env.ETHERSCAN_POLYGON;

const configFileDetails = require("./utils/configEnv.js").getConfigFile('./.config');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  //defaultNetwork: "hardhat",
  solidity: {
    version: "0.5.17", //"0.7.6" "0.5.10"
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
    },
    sepolia: {
      url: configFileDetails.NODE_HTTP_URL_SEPOLIA,
      accounts: [PRIVATE_KEY_1, PRIVATE_KEY_2]
    },
    mumbai: {
      url: process.env.NODE_HTTP_URL_MUMBAI,
      accounts: [PRIVATE_KEY_1, PRIVATE_KEY_2]
    },
    testbsc: {
      url: configFileDetails.NODE_HTTP_URL_BSCTEST,
      accounts: [PRIVATE_KEY_1, PRIVATE_KEY_2]
    },
    ganache: {
      url: configFileDetails.NODE_HTTP_URL_GANACHE + ":" + configFileDetails.GANACHE_PORT + "/",
      accounts: [PRIVATE_KEY_1, PRIVATE_KEY_2]
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache/hardhat",
    artifacts: "./artifacts/hardhat"
  },
  mocha: {
    timeout: 40000
  },
  etherscan: {
    apiKey: ETHERSCAN_KEY
  }
}
