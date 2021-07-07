import brownie
import pytest


def test_snapshot(accounts, token):
    token.snapshot()

    assert token.balanceOfAt(accounts[0], 1) == token.balanceOf(accounts[0])
    assert token.totalSupplyAt(1) == token.balanceOf(accounts[0])


def test_snapshot_permissions(accounts, token):
    with pytest.raises(brownie.exceptions.VirtualMachineError) as excinfo:
        token.snapshot({"from": accounts[1]})
        assert "must have snapshot role to snapshot" in str(excinfo)
