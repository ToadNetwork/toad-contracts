// We import Chai to use its asserting functions here.
const { expect } = require("chai");
const test_utils = require("../../../utils/test_utils");

//initialise logging
const log4js = require("log4js");
const log = log4js.getLogger("04-token-transferFrom");

// Initialize log
log4js.configure({
  appenders: {
    console: { type: "console" },
  },
  categories: {
    default: { appenders: ["console"], level: "debug" },
  },
});

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

    log.debug(`contract address(signer): ${environment.token.address}(${environment.token.signer.address})`);
    log.debug(`owner: ${environment.owner.address}`);
    log.debug(`acc1: ${environment.account1.address}`);

    await test_utils.tokenBalances("Balances at start", environment);
    await test_utils.tokenAllowances("Allowances at start:", environment);

  })

  describe("TransferFrom checks", function () {

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

    it("should fail transferring 100 tokens from owner to account1, allowance exceeded.", async function () {

      let amount = ethers.utils.parseUnits('100', decimals);

      expect(await environment.token.balanceOf(environment.owner.address)).to.be.greaterThanOrEqual(amount);
      await expect(environment.token.transferFrom(environment.owner.address, environment.account1.address, amount))
        .to.be.revertedWith('ERC20: transfer amount exceeds allowance');

    });

    it("should transfer 100 tokens from owner to account1", async function () {

      let amount = ethers.utils.parseUnits('100', decimals);
      await environment.token.approve(environment.token.address, amount);
      await environment.token.approve(environment.owner.address, amount);

      expect(await environment.token.allowance(environment.owner.address, environment.token.address))
        .to.equal(amount);

      expect(await environment.token.balanceOf(environment.owner.address)).to.be.greaterThanOrEqual(amount);
      expect(await environment.token.transferFrom(environment.owner.address, environment.account1.address, amount)).to.changeEtherBalances(
        [environment.owner.address, environment.account1.address],
        [-'100', '100']
      );

    });

    it("should fail transferring 50 tokens from account1 to owner, allowance exceeded.", async function () {

      let amount = ethers.utils.parseUnits('50', decimals);

      expect(await environment.token.balanceOf(environment.account1.address)).to.be.greaterThanOrEqual(amount);
      await expect(environment.token.connect(environment.account1).transferFrom(environment.account1.address, environment.owner.address, amount))
        .to.be.revertedWith('ERC20: transfer amount exceeds allowance');

    });

    it("should transfer 50 tokens from account1 to owner", async function () {

      let amount = ethers.utils.parseUnits('50', decimals);
      await environment.token.connect(environment.account1).approve(environment.token.address, amount);
      await environment.token.connect(environment.account1).approve(environment.account1.address, amount);

      expect(await environment.token.allowance(environment.account1.address, environment.token.address))
        .to.equal(amount);

      expect(await environment.token.balanceOf(environment.account1.address)).to.be.greaterThanOrEqual(amount);
      expect(await environment.token.connect(environment.account1).transferFrom(environment.account1.address, environment.owner.address, amount)).to.changeEtherBalances(
        [environment.account1.address, environment.owner.address],
        [-'50', '50']
      );

    });

    it("should fail transferring 51 tokens from account1 to owner, balance exceeded", async function () {

      let amount = ethers.utils.parseUnits('51', decimals);
      await environment.token.connect(environment.account1).approve(environment.token.address, amount);
      await environment.token.connect(environment.account1).approve(environment.account1.address, amount);

      expect(await environment.token.allowance(environment.account1.address, environment.token.address))
        .to.equal(amount);

      await expect(environment.token.connect(environment.account1).transferFrom(environment.account1.address, environment.owner.address, amount))
        .to.be.revertedWith('ERC20: transfer amount exceeds balance');

    });

  });

});

