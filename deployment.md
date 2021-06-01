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
* Check is gas price set correctly in truffle-config file in describing mainnet network
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
# Main functions
## totalSupply()
This function allows to calculate and return the total amount of the token that exists in circulation.
## balanceOf()
This function allows a smart contract to store and return the balance of the provided address.
## approve()
When calling this function, the owner of the contract authorizes, or approves, the given address to withdraw instances of the token from the owner’s address.
## transfer()
This function lets the owner of the contract send a given amount of the token to another address just like a conventional cryptocurrency transaction.
## transferFrom()
This function allows a smart contract to automate the transfer process and send a given amount of the token on behalf of the owner.
## mint()
Creates amount tokens and assigns them to account, increasing the total supply.
Destroys amount tokens from account, reducing the total supply.
## pause()
This function allows to pauses all token transfers.
## unpause()
This function allows to unpauses all token transfers. Users can transfer tokens again.
## recoverERC20()
TokenRecover allows the contract owner to recover any ERC20 token sent into the contract for error.
# How to use the functionality
Go to your contract on Etherscan by entering the address in the search box. On the tab "Contract" go to the "Write Contract" tab.  
Nex step is connect your wallet. Tap on the "Connect to Web3" button and choose your wallet. Then you can execute token operations whitch are below on that Etherscan page.

For example:  
To recover ERC20 token tap on the "recoverERC20" and enter the address of token that must be transferred from contract address and amount of this tokens and tap button "Write".  
To mint tokens tap on the "mint" button, enter the address of recipient and amount of tokens. Then click "Write".  
To see balance of your or another user account go to the "Read Contract" tab, enter address of user and tap "Query". Also you can add token to your wallet and view the information there.

