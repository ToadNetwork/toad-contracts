
# toad-contracts
All smart contracts related to [toad.network](https://toad.network)

## Folder structure

```sh
/toad-contracts>tree ./
├── contracts
│   └── Toad.sol
├── _next
│   ├── DevLock.sol
│   ├── ToadBnbFarm.sol
│   ├── ToadBusdFarm.sol
│   ├── ToadFarm.sol
│   └── ToadLPFarm.sol
├── scripts
│   └── deploy.js
├── test
│   ├── local
│   │   ├── 01_toad-token-detail.js
│   │   ├── 02_toad-token-allowance.js
│   │   ├── 03_toad-token-transfer.js
│   │   └── 04_toad-token-transferFrom.js
│   └── testnet
│       └── testnet_toad_token.js
├── utils
│   ├── configEnv.js
│   └── test_utils.js
├── CHANGELOG.md
├── .config
├── .gitignore
├── DevLock.sol
├── env
├── hardhat.config.js
├── package.json
├── README.md
├── Toad.sol
├── ToadBnbFarm.sol
├── ToadBusdFarm.sol
├── ToadFarm.sol
└── ToadLPFarm.sol
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

## HowTo test this

1. Clone project and enter the 'toad-contracts' folder.

```sh
git clone git@github.com:ToadNetwork/toad-contracts.git
```

2. Install project dependencies

```sh
npm i
```

3. follow the "per SmartContract" test guide, please:

- [toad.network DevLock](./README-00-test-devlock.md).
- [toad.network ERC token](./README-01-test-toad.md).
- [toad.network TOAD solo Farm](./README-02-test-toad-farm.md).
- [toad.network TOAD BNB Farm](./README-03-test-toad-bnb-farm.md).
- [toad.network TOAD BUSD Farm](./README-04-test-toad-busd-farm.md).
- [toad.network TOAD LP Farm](./README-05-test-toad-lp-farm.md).

###  setting up your test environment

#### config

This test suite relies on a .config file to setup generic configuration details, revisit those values as them might affect your deployments.

#### environment

This test suite relies on a `.env` file to deliver the *sensible data*. Despite not being the most secure way to hold such sensible data, until we can implement better means to keep them safe, it is heavily advised to have the `.env` file encrypted elsewhere and only making it available AFTER installing necessary packages and related.

`.env` file should contain, at least, the details specified on the `env`sample file provided in this repo. To prepare your environment proceed as follows:

1. Copy env file as .env file

2. Fill the required details. You can add as many networks as desired, just make sure to update hardhat.config.js file accordingly.

3. You are good to go.

> @dev: please remember to keep security as a strong consideration on your developments and, at least, keep separated keys, seeds and passwords between your development and production enviroments.

If you want to generate random paper wallets in an easy manner, please check repositories like shared 'wallet' at [0xtheBlackBay](https://github.com/0xtheblackbay/wallet)

### Some helpful resources (thanks!):

#### smart contracts on-chain
[toadFarm](https://bscscan.com/token/0xe1f1edfbcefb1e924e4a031ed6b4cabc7e570154)
[ToadBUSDFarm](https://bscscan.com/token/0xf08a98fc54797290593ccbcc5d67bd48e315cf72)
[ToadLPFarm](https://bscscan.com/token/0xf08a98fc54797290593ccbcc5d67bd48e315cf72)
[ToadBNBFarm](https://bscscan.com/token/0xf08a98fc54797290593ccbcc5d67bd48e315cf72)

- [other ways of testing](https://ethereum.stackexchange.com/questions/110762/testing-arguments-of-contract-events-with-hardhat-chai).

- [BigNumberErrors](https://ethereum.stackexchange.com/questions/135384/ethers-js-bignumber-errors).

- [BigNumberErrors2](https://ethereum.stackexchange.com/questions/103921/how-do-i-use-bignumber-values-in-hardhat-tests).

- [Alloweddperator](https://ethereum.stackexchange.com/questions/143739/testing-safetransferfrom-with-onlyallowedoperator-using-chai-hardhat).

- [EventProcessing](https://ethereum.stackexchange.com/questions/110004/testing-for-emitted-events-in-hardhat).

- [ExpectOperationsReverted](https://ethereum.stackexchange.com/questions/140035/hardhat-and-chai-testing-how-should-i-write-the-test).

- [0xtheBlackBay](https://github.com/0xtheblackbay/wallet)