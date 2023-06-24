const { expect } = require("chai");
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

const configFileDetails = require("../utils/configEnv.js").getConfigFile('./.config');

// JSON del ABI del contrato
SMARTCONTRACT_JSON_ABI = require(configFileDetails.TOAD_JSON).abi;
SMARTCONTRACT_DEPLOYED = configFileDetails.TOAD_ADDRESS_GANACHE;

describe("Toad", function () {
  let token, owner, account1;
  let entryFee = ethers.utils.parseEther("0.01");

  before(async () => {

    [_owner, _account1] = await ethers.getSigners();

    // Crear una instancia del contrato con el owner del contrato (player1)
    token = new ethers.Contract(SMARTCONTRACT_DEPLOYED, SMARTCONTRACT_JSON_ABI, _owner);

    environment = {
      owner: _owner,
      account1: _account1,
      token: _token
    }

    console.log(`contract address(signer): ${environment.token.address}(${environment.token.signer.address})`);
    console.log(`owner: ${environment.owner.address}`);
    console.log(`acc1: ${environment.account1.address}`);

  });

  it("should allow 100 tokens from owner to account1 and emit Approved event.", async function () {

    await expect(environment.token.approve(environment.account1.address, ethers.utils.parseUnits('100', decimals)))
      .to.emit(environment.toad, "Approval")
      .withArgs(environment.account1.address,(ethers.utils.parseUnits('100', decimals)).toString());

  });

});