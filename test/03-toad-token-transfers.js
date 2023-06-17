// We import Chai to use its asserting functions here.
const { expect } = require("chai");
const test_utils = require("../utils/test_utils");

describe("ERC20 transfer checks", function () {

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

  describe("Transfer checks", function () {

    it("should have all accounts with allowances equal to zero.", async function () {

      expect(await environment.token.allowance(environment.token.address, environment.token.address)).to.equal(0);
      expect(await environment.token.allowance(environment.token.address, environment.owner.address)).to.equal(0);
      expect(await environment.token.allowance(environment.token.address, environment.account1.address)).to.equal(0);
      expect(await environment.token.allowance(environment.owner.address, environment.token.address)).to.equal(0);
      expect(await environment.token.allowance(environment.owner.address, environment.owner.address)).to.equal(0);
      expect(await environment.token.allowance(environment.owner.address, environment.account1.address)).to.equal(0);
      expect(await environment.token.allowance(environment.account1.address, environment.token.address)).to.equal(0);
      expect(await environment.token.allowance(environment.account1.address, environment.owner.address)).to.equal(0);
      expect(await environment.token.allowance(environment.account1.address, environment.account1.address)).to.equal(0);

    });

    it("should transfer 100 tokens from owner to account1", async function () {

      let amount = ethers.utils.parseUnits('100',decimals);
      expect(await environment.token.balanceOf(environment.owner.address)).to.be.greaterThanOrEqual(amount);
      expect(await environment.token.transfer(environment.account1.address, amount)).to.changeEtherBalances(
        [environment.owner.address, environment.account1.address],
        [-'100', '100']
      );

    });

    it("should fail transferring 199901 tokens from owner to account1", async function () {

      let amount = ethers.utils.parseUnits('199900');
      expect(await environment.token.transfer(environment.owner.address,environment.account1.address, amount)).to.be.revertedWith('ERC20: transfer amount exceeds balance');
      await test_utils.tokenBalances("AFTER transfer", environment);
      await test_utils.tokenAllowances("AFTER transfer", environment);

    });

  });

});

