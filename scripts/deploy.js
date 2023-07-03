const { ethers } = require("hardhat");

async function main() {
  /*
 A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
 so Contract here is a factory for instances of our deployedContract.
 */
  const myContract = await ethers.getContractFactory("Toad");
  // deploy the contract
  const deployedContract = await myContract.deploy();

  await deployedContract.deployed();

  // print the address of the deployed contract
  console.log(
    "Verify Contract Address:",
    deployedContract.address
  );

 
  console.log("Sleeping.....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(30000);
 
  // Verify the contract after deploying in Ether-Polygon Scan web
  await hre.run("verify:verify", { address: deployedContract.address });

}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });