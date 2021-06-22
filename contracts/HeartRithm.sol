pragma solidity ^0.8.0;

import "OpenZeppelin/openzeppelin-contracts@4.1.0/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract HeartRithmToken is ERC20PresetMinterPauser {
    constructor() public ERC20PresetMinterPauser("HeartRithm", "HEART") {}
}