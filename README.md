# HEART token 💓

[![CircleCI](https://circleci.com/gh/heartrithm/heart_token.svg?style=svg)](https://circleci.com/gh/heartrithm/heart_token)
[![pre-commit](https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit&logoColor=white)](https://github.com/pre-commit/pre-commit)
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/ambv/black)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


### HEART Governance token
<img width="100" align="right" src="assets/heart-token-logo.png">

The HEART ERC20 governance token was created for directing the flow of social impact resources from [HeartRithm](https://www.heartrithm.com)'s regenerative engine for social impact. Token holders will be able to submit philanthropic projects to be considered for voting, and then vote on the allocation of social impact funding. Learn more at [www.heartrithm.com/heart-token](https://www.heartrithm.com/heart-token).

### About HeartRithm

<img width="50" align="right" src="assets/heartrithm-logo.png">

[HeartRithm](https://www.heartrithm.com) turns code into money in the cryptocurrency ecosystem. We use a combination of algorithmic trading, automated code robots, and other internal platforms for optimizing yield and generating alpha.

HeartRithm aims to be a "regenerative engine for social impact" by scaling up to 50% of our revenues to be driven to social impact causes.

### Technical notes

* We use [OpenZeppelin](https://openzeppelin.com/)'s standard libraries for ERC20 functionality, version 4.2
* We also use OpenZeppelins implementation of ERC20Votes was use for the governance functionality
* We chose to use the "COMP" compatible version, ERC20VotesComp, to be be compatible with industry tooling

## Contract details

* [HEART Token Contract on Etherscan](https://etherscan.io/token/0x01ede4853171324d8040180c010a29c521bdb6cc)
* [HEART Token Source Code](contracts/HeartToken.sol)
* [HEART Token Contract Owner](https://etherscan.io/address/0x4Ea12717Ca435CCF7c2b017569C0be0F1A635f39)


## Development

#### Installation

Python

1. Set up the python virtual env of your choice. Tested with Python 3.9
1. `pip install -r requirements-dev.txt`
1. Set up git pre-commit hooks with `pre-commit install`

Node/Ganache

1. Install node / npm (via [nvm](https://github.com/nvm-sh/nvm) recommended)
1. Install [ganache](https://www.trufflesuite.com/ganache) for a local blockchain (`npm install -g ganache-cli`)

#### Formatting/linting

Install prettier with `npm install -g prettier prettier-plugin-solidity`

`prettier --write $Contract.sol`

Install solhint with `npm install -g solhint`

`solhint $Contract.sol`

#### Brownie

We use [brownie](https://eth-brownie.readthedocs.io/en/stable/) for python based smart contract development, testing, and deployment

Run tests with `brownie test`
