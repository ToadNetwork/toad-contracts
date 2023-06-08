// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

//initialise logging
const log4js = require("log4js");
const log = log4js.getLogger("deploy");

// Initialize log
log4js.configure({
    appenders: {
        console: { type: "console" },
    },
    categories: {
        default: { appenders: ["console"], level: "debug" },
    }
});

async function main() {

  const Contract = await hre.ethers.getContractFactory("Toad");
  const contract = await Contract.deploy();

  await toad.deployed();

  log.info(
    `Smart Contract deployed to ${contract.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  log.error(error);
  process.exitCode = 1;
});
