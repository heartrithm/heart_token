// SPDX-License-Identifier: MIT

pragma solidity 0.8.3;

import "OpenZeppelin/openzeppelin-contracts@4.2.0/contracts/token/ERC20/extensions/ERC20VotesComp.sol";
import "OpenZeppelin/openzeppelin-contracts@4.2.0/contracts/access/AccessControlEnumerable.sol";
import "OpenZeppelin/openzeppelin-contracts@4.2.0/contracts/security/Pausable.sol";

contract HeartToken is AccessControlEnumerable, ERC20VotesComp, Pausable {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    /**
    @title HeartRithm HEART token
    @author Nick Sullivan
    @notice 

    The HEART ERC20 governance token was created for directing the flow of social impact resources from HeartRithm's
    regenerative engine for social impact. Token holders will be able to submit philanthropic projects to be considered
    for voting, and then vote on the allocation of social impact funding. Learn more at www.heartrithm.com/heart-token

    About HeartRithm
    HeartRithm turns code into money in the cryptocurrency ecosystem. We use a combination of algorithmic trading,
    autmated cde robots, and other internal platforms for optimizing yield and generating alpha.

    HeartRithm aims to be a "regenerative engine for social impact" by scaling up to 50% of our revenues to be driven
    to social impact causes.

    @dev 
    Technical notes:
    * We use OpenZeppelin's standard libraries for ERC20 functionality, version 4.2
    * We also use OpenZeppelin's implementation of ERC20Votes was use for the governance functionality
    * We chose to use the "COMP" compatible version, ERC20VotesComp, to be be compatible with industry tooling
    */

    /**
     * @param name the name of the token (HeartRithm)
     * @param symbol the symbole of the token  (HEART)
     * @param initialSupply the amount of tokens that will be minted to the owner upon creation
     */
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) ERC20Permit(name) {
        // Assign the contract creator to all the roles
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _setupRole(MINTER_ROLE, _msgSender());
        _setupRole(PAUSER_ROLE, _msgSender());

        // Mint the initial tokens
        _mint(msg.sender, initialSupply);
    }

    /**
     * @dev Creates `amount` new tokens for `to`.
     *
     * See {ERC20-_mint}.
     *
     * Requirements:
     *
     * - the caller must have the `MINTER_ROLE`.
     */
    function mint(address to, uint256 amount) public virtual {
        require(hasRole(MINTER_ROLE, _msgSender()), "must have minter role to mint");
        _mint(to, amount);
    }

    function burn(uint256 amount) public virtual {
        _burn(_msgSender(), amount);
    }

    /**
     * @dev Destroys `amount` tokens from `account`, deducting from the caller's
     * allowance.
     *
     * See {ERC20-_burn} and {ERC20-allowance}.
     *
     * Requirements:
     *
     * - the caller must have allowance for ``accounts``'s tokens of at least
     * `amount`.
     */
    function burnFrom(address account, uint256 amount) public virtual {
        uint256 currentAllowance = allowance(account, _msgSender());
        require(currentAllowance >= amount, "ERC20: burn amount exceeds allowance");
        unchecked {
            _approve(account, _msgSender(), currentAllowance - amount);
        }
        _burn(account, amount);
    }

    /**
     * @dev Pauses all token transfers.
     *
     * See {ERC20Pausable} and {Pausable-_pause}.
     *
     * Requirements:
     *
     * - the caller must have the `PAUSER_ROLE`.
     */
    function pause() public virtual {
        require(hasRole(PAUSER_ROLE, _msgSender()), "must have pauser role to pause");
        _pause();
    }

    function unpause() public virtual {
        require(hasRole(PAUSER_ROLE, _msgSender()), "must have pauser role to unpause");
        _unpause();
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        // Call the one from ERC20Votes
        super._beforeTokenTransfer(from, to, amount);

        require(!paused(), "ERC20Pausable: token transfer while paused");
    }
}
