require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

PROVIDER_SEPOLIA=process.env.PROVIDER_SEPOLIA;
PROVIDER_GANACHE=process.env.PROVIDER_GANACHE;
privateKey1=process.env.PRIVATE_KEY_SIGNATURE_1;
privateKey2=process.env.PRIVATE_KEY_SIGNATURE_2;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.7.6",
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
      url: PROVIDER_SEPOLIA,
      accounts: [privateKey1, privateKey2]
    },
    ganache: {
      url: PROVIDER_GANACHE,
      accounts: [privateKey1, privateKey2]
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
  }
}
