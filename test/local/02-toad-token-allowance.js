// We import Chai to use its asserting functions here.
const { expect } = require("chai");
const test_utils = require("../utils/test_utils");

//initialise logging
const log4js = require("log4js");
const log = log4js.getLogger("02-token-allowance");

// Initialize log
log4js.configure({
  appenders: {
    console: { type: "console" },
  },
  categories: {
    default: { appenders: ["console"], level: "debug" },
  },
});

describe("ERC20 allowance checks", function () {

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

    log.info(`contract address(signer): ${environment.token.address}(${environment.token.signer.address})`);
    log.info(`owner: ${environment.owner.address}`);
    log.info(`acc1: ${environment.account1.address}`);

  })

  describe("Allowance checks", function () {

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

    it("should allow 100 tokens from owner to account1.", async function () {

      await environment.token.approve(environment.account1.address, ethers.utils.parseUnits('100', decimals));

      expect(await environment.token.allowance(environment.owner.address, environment.account1.address))
        .to.equal(ethers.utils.parseUnits('100', decimals));

    });

    it("should reduce in 50 tokens the allowance from owner to account1.", async function () {

      await environment.token.decreaseAllowance(environment.account1.address, ethers.utils.parseUnits('50', decimals));

      expect(await environment.token.allowance(environment.owner.address, environment.account1.address))
        .to.equal(ethers.utils.parseUnits('50', decimals));

    });

    it("should NOT decrease the allowance from owner to account1 in 100 tokens.", async function () {

      await expect(environment.token.decreaseAllowance(environment.account1.address, ethers.utils.parseUnits('100', decimals)))
        .to.be.revertedWith('ERC20: decreased allowance below zero');

    });

    it("should increase in 10 tokens the allowance from owner to account1.", async function () {

      expect(await environment.token.allowance(environment.owner.address, environment.account1.address))
        .to.equal(ethers.utils.parseUnits('50', decimals));

      await environment.token.increaseAllowance(environment.account1.address, ethers.utils.parseUnits('10', decimals));

      expect(await environment.token.allowance(environment.owner.address, environment.account1.address))
        .to.equal(ethers.utils.parseUnits('60', decimals));

    });

  });

});

