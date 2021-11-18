def test_delegate(accounts, token):
    assert token.delegate(accounts[1])

    assert token.getCurrentVotes(accounts[1]) == token.balanceOf(accounts[0])
    assert token.getCurrentVotes(accounts[0]) == 0

    assert token.delegates(accounts[0]) == accounts[1]


def test_delegate_without_balance(accounts, token):
    assert token.delegate(accounts[2], {"from": accounts[1]})
    assert token.getCurrentVotes(accounts[2]) == 0
    assert token.getCurrentVotes(accounts[1]) == 0


def test_checkpoints(accounts, token):
    start_balance = token.balanceOf(accounts[0])
    assert token.numCheckpoints(accounts[0]) == 0

    token.transfer(accounts[1], 42, {"from": accounts[0]})

    assert token.numCheckpoints(accounts[0]) == 0

    assert token.getPastTotalSupply(0) == 0
    assert token.getPastTotalSupply(1) == start_balance
