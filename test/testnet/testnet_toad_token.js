const { expect } = require("chai");
const test_utils = require("../../utils/test_utils");
require("dotenv").config({ path: ".env" });

//initialise logging
const log4js = require("log4js");
const log = log4js.getLogger("testnet-toad-events");

// Initialize log
log4js.configure({
  appenders: {
    console: { type: "console" },
  },
  categories: {
    default: { appenders: ["console"], level: "debug" },
  },
});

const configFileDetails = require("../../utils/configEnv.js").getConfigFile('./.config');

// JSON del ABI del contrato
SMARTCONTRACT_JSON_ABI = require(configFileDetails.TOAD_JSON).abi;
SMARTCONTRACT_DEPLOYED = configFileDetails.TOAD_ADDRESS_MUMBAI;

describe("Toad test-suite", function () {
  let name = 'Toad Network';
  let symbol = 'TOAD';
  let initialSupply = '200000';
  let decimals = 18;
  let defaultAmount = ethers.utils.parseUnits('100', decimals);
  let increaseAmount = ethers.utils.parseUnits('10', decimals);
  let decreaseAmount = ethers.utils.parseUnits('30', decimals);
  let transferAmount = ethers.utils.parseUnits('40', decimals);
  let returnAmount = ethers.utils.parseUnits('25', decimals);
  let amountEth = ethers.utils.parseEther("0.01");

  before(async () => {

    [_owner, _account1] = await ethers.getSigners();

    // Crear una instancia del contrato con el owner del contrato (player1)
    _token = new ethers.Contract(SMARTCONTRACT_DEPLOYED, SMARTCONTRACT_JSON_ABI, _owner);

    environment = {
      owner: _owner,
      account1: _account1,
      token: _token
    }

    log.info(`contract address(signer): ${environment.token.address}(${environment.token.signer.address})`);
    log.info(`owner: ${environment.owner.address}`);
    log.info(`acc1: ${environment.account1.address}`);

  });

  it(`shows balances and allowances @ the beginning.`, async function () {

    await test_utils.tokenBalances("@before", environment);
    await test_utils.tokenAllowances("@before", environment);

  });

  describe("Allowances checks", function () {

    it(`should allow ${defaultAmount} tokens from owner to account1 and emit Approval event.`, async function () {

      await expect(environment.token.approve(environment.account1.address, defaultAmount))
        .to.emit(environment.token, "Approval")
        .withArgs(environment.owner.address, environment.account1.address, defaultAmount.toString());

    });

    it(`should have ${defaultAmount} tokens approved from owner to account1`, async function () {

      expect(await environment.token.allowance(environment.owner.address, environment.account1.address))
        .to.equal(defaultAmount);

    });

    it(`should set allowance to 0 tokens from owner to account1 and emit Approval event.`, async function () {

      await expect(environment.token.approve(environment.account1.address, 0))
        .to.emit(environment.token, "Approval")
        .withArgs(environment.owner.address, environment.account1.address, '0');

    });

    it(`should allow ${defaultAmount} tokens from owner to account1 and emit Approval event.`, async function () {

      await expect(environment.token.approve(environment.account1.address, defaultAmount))
        .to.emit(environment.token, "Approval")
        .withArgs(environment.owner.address, environment.account1.address, defaultAmount.toString());

    });

    it(`should decrease allowance by ${decreaseAmount} tokens from owner to account1 and emit Approval event.`, async function () {

      await expect(environment.token.decreaseAllowance(environment.account1.address, decreaseAmount))
        .to.emit(environment.token, "Approval")
        .withArgs(environment.owner.address, environment.account1.address, (BigInt(defaultAmount) - BigInt(decreaseAmount)).toString());

    });

    it(`should have ${defaultAmount} - ${decreaseAmount} tokens approved from owner to account1`, async function () {

      expect(await environment.token.allowance(environment.owner.address, environment.account1.address))
        .to.equal((BigInt(defaultAmount) - BigInt(decreaseAmount)).toString());

    });

    it(`should increase allowance by ${increaseAmount} tokens from owner to account1 and emit Approval event.`, async function () {

      await expect(environment.token.increaseAllowance(environment.account1.address, increaseAmount))
        .to.emit(environment.token, "Approval")
        .withArgs(environment.owner.address, environment.account1.address, ((BigInt(defaultAmount) - BigInt(decreaseAmount)) + BigInt(increaseAmount)).toString());

    });

    it(`should have (${defaultAmount} - ${decreaseAmount}) + ${increaseAmount} tokens approved from owner to account1`, async function () {

      expect(await environment.token.allowance(environment.owner.address, environment.account1.address))
        .to.equal(((BigInt(defaultAmount) - BigInt(decreaseAmount)) + BigInt(increaseAmount)).toString());

    });

    it(`should revert an allowance from owner to account1 in ${defaultAmount} tokens, ERC20: decreased allowance below zero.`, async function () {

      await expect(environment.token.decreaseAllowance(environment.account1.address, ethers.utils.parseUnits('100', decimals)))
        .to.be.revertedWith('ERC20: decreased allowance below zero');

    });

  });

  describe("Transfer checks", function () {

    it(`should transfer ${transferAmount} tokens from owner to account1`, async function () {

      let amount = transferAmount;

      expect(await environment.token.balanceOf(environment.owner.address)).to.be.greaterThanOrEqual(amount);
      expect(await environment.token.transfer(environment.account1.address, amount)).to.changeEtherBalances(
        [environment.owner.address, environment.account1.address],
        [-amount, amount]
      );

    });

    it(`should transfer ${returnAmount} tokens from account1 to owner`, async function () {

      let amount = returnAmount;

      expect(await environment.token.balanceOf(environment.account1.address)).to.be.greaterThanOrEqual(amount);
      expect(await environment.token.connect(environment.account1).transfer(environment.owner.address, amount)).to.changeEtherBalances(
        [environment.account1.address, environment.owner.address],
        [-returnAmount, returnAmount]
      );

    });

    it(`should fail transferring ${returnAmount} tokens from account1 to owner, balance exceeded`, async function () {

      let amount = returnAmount;

      await expect(environment.token.connect(environment.account1).transfer(environment.owner.address, amount))
        .to.be.revertedWith('ERC20: transfer amount exceeds balance');

    });

    it(`should transfer '15' tokens from account1 to owner`, async function () {

      let amount = ethers.utils.parseUnits('15', decimals);

      expect(await environment.token.balanceOf(environment.account1.address)).to.be.greaterThanOrEqual(amount);
      expect(await environment.token.connect(environment.account1).transfer(environment.owner.address, amount)).to.changeEtherBalances(
        [environment.account1.address, environment.owner.address],
        [-amount, amount]
      );

    });
  
    it(`shows balances and allowances @transfers.`, async function () {

      await test_utils.tokenBalances("@transfers", environment);
      await test_utils.tokenAllowances("@transfers", environment);

    });

  });

  describe("Ending state", function () {

    //it("should revert TOAD balances to all accounts", async function () {
    //  let amount = ethers.utils.parseUnits('40', decimals);
    //  expect(await environment.token.balanceOf(environment.account1.address)).to.be.greaterThanOrEqual(amount);
    //  expect(await environment.token.connect(environment.account1).transfer(environment.owner.address, amount)).to.changeEtherBalances(
    //    [environment.account1.address, environment.owner.address],
    //    [-'40', '40']
    //  );
    //});

    it(`shows balances and allowances @end.`, async function () {

      await test_utils.tokenBalances("@end", environment);
      await test_utils.tokenAllowances("@end", environment);

    });

  });

});