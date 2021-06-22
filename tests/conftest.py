#!/usr/bin/python3

import pytest


@pytest.fixture(scope="function", autouse=True)
def isolate(fn_isolation):
    # perform a chain rewind after completing each test, to ensure proper isolation
    # https://eth-brownie.readthedocs.io/en/v1.10.3/tests-pytest-intro.html#isolation-fixtures
    pass


@pytest.fixture(scope="module")
def token(HeartRithmToken, accounts):
    t = HeartRithmToken.deploy({"from": accounts[0]})

    # Create an initial supply and assign it to owner
    t.mint(accounts[0], 1e21)

    return t
