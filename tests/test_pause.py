import brownie
import pytest


def test_pause(accounts, token):
    assert token.paused() is False
    assert token.pause()
    assert token.paused()

    # Transfer should fail while paused
    with pytest.raises(brownie.exceptions.VirtualMachineError) as excinfo:
        token.transferFrom(accounts[0], accounts[2], 50, {"from": accounts[1]})
        assert "token transfer while paused" in str(excinfo)

    assert token.unpause()
    assert token.paused() is False
