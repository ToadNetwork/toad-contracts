
# toad-contracts
All smart contracts related to [toad.network](https://toad.network)

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
