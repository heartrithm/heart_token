#!/usr/bin/python3

from brownie import HeartToken, accounts


def main():
    return HeartToken.deploy(1e21, {"from": accounts[0]})
