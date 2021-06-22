#!/usr/bin/python3

from brownie import HeartToken, accounts


def main():
    return HeartToken.deploy({"from": accounts[0]})
