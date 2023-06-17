// We import Chai to use its asserting functions here.
const { expect } = require("chai");
const test_utils = require("../utils/test_utils");

describe("ERC20 transferFrom checks", function () {

  let name = 'Toad Network';
  let symbol = 'TOAD';
  let initialSupply = '200000';
  let decimals = 18;

  before(async () => {
    const Token = (await ethers.getContractFactory("Toad"));
    let _token = await Token.deploy();
    await _token.deployed();

    [_owner, _account1] = await ethers.getSigners();
    environment = {
      owner: _owner,
      account1: _account1,
      token: _token
    }

    console.log(`contract address(signer): ${environment.token.address}(${environment.token.signer.address})`);
    console.log(`owner: ${environment.owner.address}`);
    console.log(`acc1: ${environment.account1.address}`);

  })

});

