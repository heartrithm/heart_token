// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "eth-token-recover/contracts/TokenRecover.sol";

contract HeartRithm is ERC20, TokenRecover{
    using SafeMath for uint256;
    using Address for address;

    constructor() public ERC20("HeartRithm", "HEART") {}

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function burn(address account, uint256 amount) external onlyOwner {
        _burn(account, amount);
    }
}
