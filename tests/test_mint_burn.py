import brownie
import pytest


def test_mint(accounts, token):
    start_balance = token.balanceOf(accounts[0])
    token.mint(accounts[1], 42)

    assert token.balanceOf(accounts[0]) == start_balance

    assert token.balanceOf(accounts[1]) == 42


def test_burn_from(accounts, token):
    token.mint(accounts[0], 75)
    token.increaseAllowance(accounts[0], 75)
    token.decreaseAllowance(accounts[0], 25)
    token.burnFrom(accounts[0], 50)

    assert token.balanceOf(accounts[0]) == 1000000000000000000025


def test_mint_permissions(accounts, token):
    with pytest.raises(brownie.exceptions.VirtualMachineError) as excinfo:
        token.snapshot({"from": accounts[1]})
        assert "must have minter role to mint" in str(excinfo)


def test_burn(accounts, token):
    start_balance = token.balanceOf(accounts[0])
    token.burn(10)

    with pytest.raises(brownie.exceptions.VirtualMachineError) as excinfo:
        token.burn(start_balance)
        assert "burn amount exceeds balance" in str(excinfo)

    assert token.balanceOf(accounts[0]) == start_balance - 10
