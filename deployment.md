## Deployment Instructions

Prep:

1. Get an API key for Infura and set it with `export WEB3_INFURA_PROJECT_ID=xxxxxx`
2. Get an API Key for Etherscan and set it with `export ETHERSCAN_TOKEN=yyyyyy`

#### Test net deployment

Initial supply is the number of tokens plus 18 decimals.
42e24 = 42M tokens

```sh
# set up
rm -rf build reports
brownie compile
brownie test
brownie console --network=ropsten
```

```python

# Set up the gas to "fast"
>>> from brownie.network.gas.strategies import GasNowStrategy
>>> gas_strategy = GasNowStrategy("fast")

# Set default gas strategy for all transactions
>>> from brownie.network import gas_price
>>> gas_price(gas_strategy)

# Pull in the wallet for the supplied private key - this is the "owner" of the smart contract
>>> wallet = accounts.add("$private_key")

# Deploy the smart contract to the network
>>> HeartToken.deploy("HeartRithm", "HEART", 42e24, {'from': wallet}, publish_source=True)

```

#### Live deployment

Same as above, but use live wallet address, and `brownie console --network=mainnet`


