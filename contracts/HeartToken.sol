// SPDX-License-Identifier: MIT

pragma solidity 0.8.3;

import "OpenZeppelin/openzeppelin-contracts@4.1.0/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract HeartToken is ERC20PresetMinterPauser {
    constructor(uint256 initialSupply) ERC20PresetMinterPauser("HeartRithm", "HEART") {
        _mint(msg.sender, initialSupply);
    }
}
