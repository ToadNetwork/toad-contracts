# toadFarm test

Separated instructions per testing each *toad.network* related SmartContract.

toad.network **toad-solo farm** test suite:

## toad.network toad farm specific setup

This steps apply for `ToadFarm.sol`.

To deploy your own instance of the token to perform its test, you'll have to compile it to generate the corresponding JSON artifacts:

1.  Update the `hardhat.config.js` file to match the requested version of solidity:

In ToadFarm.sol it is `0.5.10`.

2. To reduce complexity, ensure the Smart Contract file is the only file on the `contracts` folder:

3. Update the script `deploy.js` to map the corresponding SmartContract factory:

For ToadFarm.sol, this sits around line 8 and would end as follows:

```js
const myContract = await ethers.getContractFactory("ToadFarm");
```

4. *Temporary* update the ToadFarm.sol to match your deployment details:

line **42**: replace with your ganache/testnet **owner** address (e.g., as per [README-01](./README-01-test-toad.md#toad-test-environment)).
```
owner = address(0x9DDb22b121693C2011A8d4dab1E6c04ba3716B2A);
```
line **153**: replace with your ganache/testnet **Toad.sol smartContract** address (e.g., as per [README-01](./README-01-test-toad.md#toad-test-environment)).
```
bep20 = TOKEN(address(0xc07a7a2A1A658d94c6A2Ec57317fA8ee7093f4a3)); //toad
```

5. compile the artifacts with hardhat

```sh
bbrujas@bbrujas:~/git/toadnetwork/toad-contracts> npx hardhat compile
Compiled 1 Solidity file successfully
bbrujas@bbrujas:~/git/toadnetwork/toad-contracts>
```

5. run the test that you want to (i.e., ToadFarm's tests):

```sh
npx hardhat test test/local/toadFarm/01-toad_farm-detail.js
```

6. run all the tests under test folder:

```sh
npx hardhat test
```

Results are printed as per execution.

## testing

There are different type of tests defined for *toad.network toad farm contract*, those under local folder are valid on local testing environments (ganache) while the testnets ones are disigned to be tested against public decentralised networks.

### ganache

You can deploy and test an instance of TOAD Smart Contract to test in your local Ganache by executing the following steps:

Install Ganache --> You can get some guidance for your platform [here](https://trufflesuite.com/ganache/)

Run ganache as per your preferred setup and keep note of the port and addresses you've set it up for.

Configure your `.config` file as per the following requirements (assuming ganache listening on IPv4 localhost and default 7545 port):

```config
NODE_HTTP_URL_GANACHE = "http://127.0.0.1"
GANACHE_PORT = 7545
TOAD_FARM_JSON = "../../artifacts/hardhat/contracts/ToadFarm.sol/ToadFarm.json"
TOAD_FARM_GANACHE = "0xa7E05F26b0FBA37229381E9Cb44B0911690e509d"
```

Follow the [execution](./README.md#howto-test-this) instructions **1**, **2**, **3** and after last one, execute the deploy command `npx hardhat run scripts/deploy.js` with your configuration.

> @Dev: As deploying to a local testnet, the verification process cannot follow as it would on a normal testchain, hence you can ignore the error safely.

Once finished deploying, remember to write down the address output and update your `TOAD_FARM_GANACHE=` part of the `.config` file.

Example

```sh
npx hardhat run scripts/deploy.js --network ganache
Verify Contract Address: 0xa7E05F26b0FBA37229381E9Cb44B0911690e509d
Sleeping.....
NomicLabsHardhatPluginError: Trying to verify a contract in a network with chain id 1337, but the plugin doesn't recognize it as a supported chain.
```

Once your contract has been deployed on your ganache environment, you can test all the available test under the `test/local` folder with no issues.

The tests under the `test/testnet` folder are coded using events, hence you'll have to set up ganache in a different manner so that events can be emitted from your ganache app (WS subscription available since Ganache 7.0.0).

### public testnets

You can deploy the contracts in any chan for testing. There are several testnets that provide tokens through faucets and will allow you to perform a deeper set of tests and check other things like event emission.

To achieve this, follow similar steps to what has been done for Ganache, but replace the "deployment" and "testing" networks to such of your preference.

### toad-test-environment

To elaborate this README.md and test its validity, TOAD FARM smart Contract was deployed on local and test environments on the following addresses:

- Ganache(local): `0xa7E05F26b0FBA37229381E9Cb44B0911690e509d`
- Mumbai: `0x786D15F3E26CEb38eaAa682a3a015dA9a88Bc02e`

Addresses used for the tests:
- deployer: `0x9DDb22b121693C2011A8d4dab1E6c04ba3716B2A`
- account1: `0x3fC7db974197797be75749592339d42Eb0E1f8b8`

# END