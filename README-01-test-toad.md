# toad test

Separated instructions per testing each *toad.network* related SmartContract.

toad.network **ERC20 token** test suite:

## toad.network erc20 token specific setup

This steps apply for `Toad.sol`.

To deploy your own instance of the token to perform its test, you'll have to compile it to generate the corresponding JSON artifacts:

1.  Update the `hardhat.config.js` file to match the requested version of solidity:

In Toad.sol it is `0.7.6`.

2. To reduce complexity, ensure the Smart Contract file is the only file on the `contracts` folder:

3. Update the script `deploy.js` to map the corresponding SmartContract factory:

For Toad.sol, this sits around line 8 and would end as follows:

```js
const myContract = await ethers.getContractFactory("Toad");
```

4. compile the artifacts with hardhat

```sh
npx hardhat compile
```

5. run the test that you want to (i.e., Toad's tests):

```sh
npx hardhat test test/local/toad/01-toad_token-detail.js
```

6. run all the tests under test folder:

```sh
npx hardhat test
```

Results are printed as per execution.

## testing

There are different type of tests defined for *toad.network erc20 token*, those under local folder are valid on local testing environments (ganache) while the testnets ones are disigned to be tested against public decentralised networks.

### ganache

You can deploy and test an instance of TOAD Smart Contract to test in your local Ganache by executing the following steps:

Install Ganache --> You can get some guidance for your platform [here](https://trufflesuite.com/ganache/)

Run ganache as per your preferred setup and keep note of the port and addresses you've set it up for.

Configure your `.config` file as per the following requirements (assuming ganache listening on IPv4 localhost and default 7545 port):

```config
NODE_HTTP_URL_GANACHE = "http://127.0.0.1"
GANACHE_PORT = 7545
TOAD_JSON = "../../artifacts/hardhat/contracts/Toad.sol/Toad.json"
TOAD_ADDRESS_GANACHE = ""
```

Follow the [execution](./README.md#howto-test-this) instructions **1**, **2**, **3** and after last one, execute the deploy command `npx hardhat run scripts/deploy.js` with your configuration.

> @Dev: As deploying to a local testnet, the verification process cannot follow as it would on a normal testchain, hence you can ignore the error safely.

Once finished deploying, remember to write down the address output and update your `TOAD_ADDRESS_GANACHE=` part of the `.config` file.

Example

```sh
npx hardhat run scripts/deploy.js --network ganache
Verify Contract Address: 0xc07a7a2A1A658d94c6A2Ec57317fA8ee7093f4a3
Sleeping.....
NomicLabsHardhatPluginError: Trying to verify a contract in a network with chain id 1337, but the plugin doesn't recognize it as a supported chain.
```

Once your contract has been deployed on your ganache environment, you can test all the available test under the `test/local` folder with no issues.

The tests under the `test/testnet` folder are coded using events, hence you'll have to set up ganache in a different manner so that events can be emitted from your ganache app (WS subscription available since Ganache 7.0.0).

### public testnets

You can deploy the contracts in any chan for testing. There are several testnets that provide tokens through faucets and will allow you to perform a deeper set of tests and check other things like event emission.

To achieve this, follow similar steps to what has been done for Ganache, but replace the "deployment" and "testing" networks to such of your preference.

### toad-test-environment

To elaborate this README.md and test its validity, TOAD ERC20 token was deployed on local and test environments on the following addresses:

- Ganache(local): `0xc07a7a2A1A658d94c6A2Ec57317fA8ee7093f4a3`
- Mumbai: `0x79FD7F11e1581729563440639559c98927dC7210`

Addresses used for the tests:
- deployer: `0x9DDb22b121693C2011A8d4dab1E6c04ba3716B2A`
- account1: `0x3fC7db974197797be75749592339d42Eb0E1f8b8`

# END