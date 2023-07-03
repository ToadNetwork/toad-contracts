
# toad-contracts
All smart contracts related to [toad.network](https://toad.network)

## Folder structure

```sh
/toad-contracts>tree ./
├── CHANGELOG.md
├── contracts
│   └── Toad.sol
├── DevLock.sol
├── env
├── hardhat.config.js
├── _next
│   ├── DevLock.sol
│   ├── ToadBnbFarm.sol
│   ├── ToadBusdFarm.sol
│   ├── ToadFarm.sol
│   └── ToadLPFarm.sol
├── package.json
├── README.md
├── scripts
│   └── deploy.js
├── test
│   └── 01_Toad_token.js
├── ToadBnbFarm.sol
├── ToadBusdFarm.sol
├── ToadFarm.sol
├── ToadLPFarm.sol
├── Toad.sol
└── utils
    └── test_utils.js
```

## Token

### Toad.sol

- Bep20 token with 200,000 pre minted tokens and no minting capabilities outside its constructor, which mean no more tokens can ever be minted.

## Farms

- Farms were seeded with 70,000 of the pre minted toad.

- All farms have a dividend pool that drips 1% of its value every day, that 1% is then distributed among all stakers based on their share.

### ToadFarm.sol

- TOAD only farm, stakers can deposit the TOAD token to earn more TOAD.

- Pre funded with 25,000 TOAD.

### ToadBnbFarm.sol

- TOAD-BNB farm, stakers can deposit cake-lp tokens (received after providing liquidity) to earn TOAD.

- Pre funded with 25,000 TOAD.

### ToadBnbFarm.sol

- TOAD-BUSD farm, stakers can deposit cake-lp tokens (received after providing liquidity) to earn TOAD.

- Pre funded with 20,000 TOAD.

## Liquidity Farms

### ToadLPFarm.sol

 - The liquidity farm introduces the DPLP (Decentralized Perpetual Liquidity Protocol).

 ### The DPLP aims to: 

1.  Prevent developers from controlling a large share of the liquidity on DAMM (Decentralized Autonomous Market Makers), like PancakeSwap.

2. Incentivize liquidity providers to keep providing liquidity for TOAD by growing their liquidity share.

3. Create a perpetual pool of rewards to keep LP providers within the network without the need to keep minting more tokens and inflating the supply.

###  How does the DPLP achieve that:

- The smart contract has been pre-funded with all the liquidity that was added by the team.

- The reward pool drips 1% of its value every day and distributes those LP tokens to the stakers based on their share.

- It also requires the stakers to pay a 10% fee when depositing and removing their LP tokens from the smart contract. Those fees go back to the farming pool. By implementing this mechanism the DPLP makes sure the reward pool will never run out. Therefore creating perpetual incentives to keep providing liquidity for TOAD. 

## testing

### HowTo test this

1. Clone project and enter the 'toad-contracts' folder.

```sh
git clone git@github.com:ToadNetwork/toad-contracts.git
```

2. Install project dependencies

```sh
npm i
```

3. compile the artifacts with hardhat

```sh
npx hardhat compile
```

4. run the test that you want to (i.e., Toad's tests):

```sh
npx hardhat test test/local/01-toad_token-details.js
```

5. run all the tests under test folder (not recommended due to load and unadverted failures due to asynchronous calls):

```sh
npx hardhat test
```

Results are printed as per execution.

###  setting up your test environment

#### environment

This test suite relies on a .env file to deliver the "sensible" data. Despite not being the most secure way to hold such sensible data, until we can implement a better mean to keep it safe, it is heavily advised to have the '.env' file encrypted elsewhere and only making it available AFTER installing necessary packages and related.

.env file should contain, at least, the details specified on the `env`sample file provided in this repo. To prepare your environment proceed as follows:

1. Copy env file as .env file

2. Fill the required details (you can add as many networks as desired, just make sure to update hardhat.config.js file accordingly)

3. You are good to go.

> @dev: please remember to keep security as a strong consideration on your developments and, at least, keep separated keys, seeds and passwords between your development and production enviroments.

If you want to generate random paper wallets in an easy manner, please check repositories like shared 'wallet' at [0xtheBlackBay](https://github.com/0xtheblackbay/wallet)

#### ganache

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

Follow the [execution](#howto-test-this) instructions **1**, **2**, **3** and after last one, execute the deploy command `npx hardhat run scripts/deploy.js` with your preferred testing details. As deploying to a local testenet, the verification process cannot follow as it would on a normal testchain, hence you can ignore the error safely. Just write down the addressed output and write it down on your `TOAD_ADDRESS_GANACHE=` part of the `.config` file.

Example

```sh
npx hardhat run scripts/deploy.js --network ganache
Verify Contract Address: 0xc07a7a2A1A658d94c6A2Ec57317fA8ee7093f4a3
Sleeping.....
NomicLabsHardhatPluginError: Trying to verify a contract in a network with chain id 1337, but the plugin doesn't recognize it as a supported chain.
```

Once your contract has been deployed on your ganache environment, you can test all the available test under the `test/local` folder with no issues.

The tests under the `test/testnet` folder are coded using events, hence you'll have to set up ganache in a different manner so that events can be emitted from your ganache app (WS subscription available since Ganache 7.0.0).

#### Other testnet.

You can deply the toad contract in any chan for testing. There are several testnets that provide tokens through faucets and will allow you to perform a deeper set of tests and check other things like event emission.

To achieve this, follow similar steps to what has been done for Ganache, but replace the "deployment" and "testing" networks to such of your preference.

For instance, to elaborate this README.md and test its validity, TOAD was deployed to Mumbai on address `0x79FD7F11e1581729563440639559c98927dC7210` where it has been tested for a while.

### Some helpful resources (thanks!):

- [other ways of testing](https://ethereum.stackexchange.com/questions/110762/testing-arguments-of-contract-events-with-hardhat-chai).
- [BigNumberErrors](https://ethereum.stackexchange.com/questions/135384/ethers-js-bignumber-errors).
- [BigNumberErrors2](https://ethereum.stackexchange.com/questions/103921/how-do-i-use-bignumber-values-in-hardhat-tests).
- [Alloweddperator](https://ethereum.stackexchange.com/questions/143739/testing-safetransferfrom-with-onlyallowedoperator-using-chai-hardhat).
- [EventProcessing](https://ethereum.stackexchange.com/questions/110004/testing-for-emitted-events-in-hardhat).
- [ExpectOperationsReverted](https://ethereum.stackexchange.com/questions/140035/hardhat-and-chai-testing-how-should-i-write-the-test).
- [0xtheBlackBay](https://github.com/0xtheblackbay/wallet)