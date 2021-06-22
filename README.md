# HEART token

### HEART Governance token
<img width="100" align="right" src="assets/heart-token-logo.png">

The HEART ERC20 governance token was created for directing the flow of social impact resources from [HeartRithm](https://www.heartrithm.com)'s regenerative engine for social impact. Token holders will be able to submit philanthropic projects to be considered for voting, and then vote on the allocation of social impact funding. Learn more at [www.heartrithm.com/heart-token](https://www.heartrithm.com/heart-token). 

### About HeartRithm

<img width="50" align="right" src="assets/heartrithm-logo.png">

[HeartRithm](https://www.heartrithm.com) turns code into money in the cryptocurrency ecosystem. We use a combination of algorithmic trading, automated code robots, and other internal platforms for optimizing yield and generating alpha.

HeartRithm aims to be a "regenerative engine for social impact" by scaling up to 50% of our revenues to be driven to social impact causes.

## Contract details

(link to source) (link to etherscan)

### TODO
#### Contract creation
* [x] Decide on tokenomics (available supply, decimals, fixed vs capped, etc)
* [x] Decide on sidecar contract mechanism 
* [x] Deploy on Testnet
* [ ] Audit

#### Pre funding phase

* [ ] Deploy on MainNet
* [ ] Verify ownership on Etherscan
* [ ] Verify contract on Etherscan
* [ ] Add [Contract Metadata](https://info.etherscan.com/how-to-update-token-information-on-token-page/) (symbol, icon) on Etherscan 
* [ ] Website (heartrithm.com/heart-token)

#### Funding phase
* [ ] Create Liquidity Pools on Dexes (note this establishes price, based on how much liquidity is added on either side of the pool)
    * Uniswap
    * Sushiswap

#### Listings
* [ ] Coingecko
* [ ] Coinmarketcap



## Development

#### Installation

Python 

1. Set up the python virtual env of your choice
1. `pip install -r requirements-dev.txt` (which will install eth-brownie)

Node/Ganache

1. Install node / npm (via [nvm](https://github.com/nvm-sh/nvm) recommended)
1. Install [ganache](https://www.trufflesuite.com/ganache) for a local blockchain (`npm install -g ganache-cli`)

#### Brownie

We use [brownie](https://eth-brownie.readthedocs.io/en/stable/) for python based smart contract development, testing, and deployment

Run tests with `brownie test` 


