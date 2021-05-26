// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";
import "eth-token-recover/contracts/TokenRecover.sol";

contract HeartRithm is ERC20PresetMinterPauser, TokenRecover {

    constructor() public ERC20PresetMinterPauser("HeartRithm", "HEART") {}
}