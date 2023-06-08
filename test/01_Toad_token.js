// We import Chai to use its asserting functions here.
const { expect } = require("chai");
const test_utils = require("../utils/test_utils");

describe("ERC20 token basic checks", function () {

  let token, owner, account1, account2;
  let name = 'Toad Network';
  let symbol = 'TOAD';
  let initialSupply = '200000';
  let decimals = 18;

  before(async () => {
    const Token = (await ethers.getContractFactory("Toad"));
    token = await Token.deploy();
    await token.deployed();

    [_owner, _account1] = await ethers.getSigners();
    environment = {
      owner: _owner,
      account1: _account1,
      token: token
    }

    console.log(`contract address(signer): ${environment.token.address}(${environment.token.signer.address})`);
    console.log(`owner: ${environment.owner.address}`);
    console.log(`acc1: ${environment.account1.address}`);

  })
  describe("Initial setup", function () {

    it("should be signed by acc0", async () => {
      expect(environment.token.signer.address).to.equal(environment.owner.address)
    });

    it("should have correct name", async () => {
      expect(await environment.token.name()).to.equal(name)
    });

    it("should have correct symbol", async () => {
      expect(await environment.token.symbol()).to.equal(symbol)
    });

    it("should have correct initial supply", async () => {
      expect(await environment.token.totalSupply()).to.equal(ethers.utils.parseUnits(initialSupply, decimals))
    });

    it("should have 18 decimals", async () => {
      expect(await environment.token.decimals()).to.equal(decimals)
    });

    it(`should be all assigned to owner address`, async () => {
      expect(await environment.token.balanceOf(environment.owner.address)).to.equal(ethers.utils.parseUnits(initialSupply, decimals))
    })

  });

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

    it("should create an allowance of 100 tokens from owner to account1.", async function () {

      await environment.token.approve(environment.account1.address, ethers.utils.parseUnits('100', decimals));

      expect(await environment.token.allowance(environment.owner.address, environment.account1.address)).to.equal(ethers.utils.parseUnits('100', decimals));

    });

    it("should reduce in 50 tokens the allowance from owner to account1.", async function () {

      await environment.token.decreaseAllowance(environment.account1.address, ethers.utils.parseUnits('50', decimals));

      expect(await environment.token.allowance(environment.owner.address, environment.account1.address)).to.equal(ethers.utils.parseUnits('50', decimals));

    });

    it("should NOT decrease the allowance of owner to account1 in 100 tokens.", async function () {

      await expect(environment.token.decreaseAllowance(environment.account1.address, ethers.utils.parseUnits('100', decimals))).to.be.revertedWith('ERC20: decreased allowance below zero');

    });

    it("should increase in 10 tokens the allowance from owner to account1.", async function () {

      expect(await environment.token.allowance(environment.owner.address, environment.account1.address)).to.equal(ethers.utils.parseUnits('50', decimals));

      await environment.token.increaseAllowance(environment.account1.address, ethers.utils.parseUnits('10', decimals));

      expect(await environment.token.allowance(environment.owner.address, environment.account1.address)).to.equal(ethers.utils.parseUnits('60', decimals));

    });

  });

  describe("Transfer checks", function () {

    it("should have all accounts with allowances set as past actions.", async function () {

      expect(await environment.token.allowance(environment.token.address, environment.token.address)).to.equal(0);
      expect(await environment.token.allowance(environment.token.address, environment.owner.address)).to.equal(0);
      expect(await environment.token.allowance(environment.token.address, environment.account1.address)).to.equal(0);
      expect(await environment.token.allowance(environment.owner.address, environment.token.address)).to.equal(0);
      expect(await environment.token.allowance(environment.owner.address, environment.owner.address)).to.equal(0);
      expect(await environment.token.allowance(environment.owner.address, environment.account1.address)).to.equal(ethers.utils.parseUnits('60', decimals));
      expect(await environment.token.allowance(environment.account1.address, environment.token.address)).to.equal(0);
      expect(await environment.token.allowance(environment.account1.address, environment.owner.address)).to.equal(0);
      expect(await environment.token.allowance(environment.account1.address, environment.account1.address)).to.equal(0);

    });

    it("should increase in 100 tokens the allowance from token to owner.", async function () {

      let amount = ethers.utils.parseUnits('100',decimals);
      let allowance = await environment.token.allowance(environment.owner.address, environment.account1.address)
      let totalApproval = BigInt(amount) + BigInt(allowance);

      await environment.token.approve(environment.account1.address, ethers.utils.parseUnits(totalApproval.toString(), 'wei'));
      await environment.token.approve(environment.token.address, ethers.utils.parseUnits(totalApproval.toString(), 'wei'));
      allowance = await environment.token.allowance(environment.owner.address, environment.account1.address);

      expect(allowance).to.be.greaterThan(amount);
      expect(allowance).to.equal(totalApproval);
    });

    it("should transfer 100 tokens from owner to account1", async function () {

      let amount = ethers.utils.parseUnits('100');
      expect(await token.allowance(environment.owner.address, environment.account1.address)).to.be.greaterThan(amount);
      expect(await token.balanceOf(environment.owner.address)).to.be.greaterThanOrEqual(amount);
      expect(await token.transfer(environment.account1.address, amount)).to.changeEtherBalances(
        [environment.owner.address, environment.account1.address],
        [-'100', '100']
      );

    });

    it("should fail transferring 500 tokens from owner to account1", async function () {

      let amount = ethers.utils.parseUnits('500');
      expect(await environment.token.transfer(environment.account1.address, amount)).to.be.revertedWith('ERC20: transfer amount exceeds allowance');
      await test_utils.tokenBalances("AFTER transfer", environment);

    });

  });

});

