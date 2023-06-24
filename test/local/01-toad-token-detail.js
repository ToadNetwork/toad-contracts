// We import Chai to use its asserting functions here.
const { expect } = require("chai");
const test_utils = require("../../utils/test_utils");

//initialise logging
const log4js = require("log4js");
const log = log4js.getLogger("01-token-details");

// Initialize log
log4js.configure({
  appenders: {
    console: { type: "console" },
  },
  categories: {
    default: { appenders: ["console"], level: "debug" },
  },
});

describe("ERC20 basic checks", function () {

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

});

