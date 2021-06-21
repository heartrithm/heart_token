#!/usr/bin/python3

from brownie import HeartRithmToken, accounts


def main():
    return HeartRithmToken.deploy({"from": accounts[0]})
