# HeartRithm
Use this pre-configured template for smart contract projects.?
Features:
- Truffle
- Ganache
- Solidity Test Coverage
## Setup
Requirements:
- Node >= v12
```
$ npm install        # Install dependencies
```
## Compiling
To compile contract run:
```
$ npm run compile
```
## Testing
First, make sure Ganache is running.
Run all tests:
```
$ npm test
```
To run tests in a specific file, run:
```
$ npm test [path/to/file]
```
To run tests and generate test coverage, run:
```
$ npm run coverage
```
## Deploying
* Check is gas price set correctly
  * Go to the link https://etherscan.io/gastracker
* Install all packages
  * Run command:
```
$ npm i
```
* Register account for deployment process
  * Go to the link https://infura.io to set provider
* Create new project on infura
  * Go on the tab "Ethereum" on https://infura.io
  * Click on the button "Create new project" and enter name of project "HeartRithm"
  * Copy project id and write in .env file to PROJECT_ID variable
* Create account on Etherscan
 * Go to the link https://etherscan.io
* Log in into your account ang go on the tab "API-KEYs"
* Create new api-key and write it in .env file to ETHERSCAN_KEY variable
* Get your private key and paste it in .env file to PRIVATE_KEY variable
* Start deploy contract on mainnet
  * Run command:
```
$ truffle migrate --network mainnet
```
* Verify contract on mainnet
  * Run command:
```
$ truffle run verify HeartRithm --network mainnet
```
---