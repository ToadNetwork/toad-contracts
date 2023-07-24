const { expect } = require("chai");
const test_utils = require("../../../utils/test_utils");
require("dotenv").config({ path: ".env" });

const log4js = require("log4js");
const log = log4js.getLogger("01-toad-farm-details");
log4js.configure({
  appenders: {
    console: { type: "console" },
  },
  categories: {
    default: { appenders: ["console"], level: "debug" },
  },
});

const configFileDetails = require("../../../utils/configEnv.js").getConfigFile('./.config');

SMARTCONTRACT_JSON_ABI = require(configFileDetails.TOAD_FARM_JSON).abi;
SMARTCONTRACT_DEPLOYED = configFileDetails.TOAD_FARM_MUMBAI;
FARM_TOKEN = configFileDetails.TOAD_ADDRESS_MUMBAI;

describe("ERC20 basic checks", function () {

  let name = 'Toad Farm';
  let symbol = 'TOADF';
  let decimals = 18;
  let dividendPool = 0;
  let lastDripTime, burnAddress, TOKEN;
  let totalPlayer = 0;
  let totalDonation = 0;

  before(async () => {

    [_owner, _account1] = await ethers.getSigners();

    let _farm = new ethers.Contract(SMARTCONTRACT_DEPLOYED, SMARTCONTRACT_JSON_ABI, _owner);
    //let _farm = await Contract.deploy();
    //await _farm.deployed();

    environment = {
      owner: _owner,
      account1: _account1,
      farm: _farm
    }

    log.info(`contract address(signer): ${environment.farm.address}(${environment.farm.signer.address})`);
    log.info(`owner: ${environment.owner.address}`);
    log.info(`acc1: ${environment.account1.address}`);

  })

  describe("Initial setup", function () {

    it("should be signed by acc0", async () => {
      expect(environment.farm.signer.address).to.equal(environment.owner.address)
    });

    it("should have correct name", async () => {
      expect(await environment.farm.name()).to.equal(name)
    });

    it("should have correct symbol", async () => {
      expect(await environment.farm.symbol()).to.equal(symbol)
    });

    it("should have 18 decimals", async () => {
      expect(await environment.farm.decimals()).to.equal(decimals)
    });

    it("should have 0 TOKEN in the farm", async () => {
      expect(await environment.farm.totalTokenBalance()).to.equal(0)
    });

    it("should have 0 tokensupply.", async () => {
      expect(await environment.farm.totalSupply()).to.equal(0)
    });

    it("should have 0 dividends for accounts[0] and accounts[1].", async () => {
      expect(await environment.farm.totalSupply()).to.equal(0)
    });

  });

});

