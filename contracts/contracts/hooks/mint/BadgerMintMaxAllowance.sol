// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

/// @dev Core dependencies.
import {BadgerMintHook} from "../types/BadgerMintHook.sol";

/**
 * @dev Mint module that enforces a max mint per operator for a Badge.
 * @author CHANCE (@nftchance)
 * @author masonthechain (@masonthechain)
 */
contract BadgerMintMaxAllowance is BadgerMintHook {
    ////////////////////////////////////////////////////////
    ///                      STATE                       ///
    ////////////////////////////////////////////////////////

    /// @dev The schema used for the config method.
    string public constant override CONFIG_SCHEMA = "uint256,uint256";

    /// @dev Mapping of token addresses to accountBound status.
    mapping(address => mapping(uint256 => uint256)) public maxMint;

    /// @dev Keep track of the number of tokens minted.
    mapping(address => mapping(uint256 => mapping(address => uint256)))
        public minted;

    ////////////////////////////////////////////////////////
    ///                     SETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * See {IBadgerHook-config}.
     */
    function config(bytes calldata _data) public virtual override {
        /// @dev Decode the configuration data forwarded from the Organization.
        (uint256 _id, uint256 _max) = abi.decode(_data, (uint256, uint256));

        /// @dev Require the max to be greater than zero.
        require(
            _max != 0,
            "BadgerMintMaxAllowance::config: Max must be greater than zero."
        );

        /// @dev Set the max mint for the token.
        maxMint[msg.sender][_id] = _max;
    }

    /**
     * See {IBadgerHook-execute}.
     */
    function execute(bytes calldata _data) public virtual override {
        /// @dev Decode the transfer data forwarded from the Organization.
        (address _operator, , uint256 _id, uint256 _amount, ) = abi.decode(
            _data,
            (address, address, uint256, uint256, bytes)
        );

        /// @dev Increment the minted amount.
        minted[msg.sender][_id][_operator] += _amount;

        /// @dev Ensure the minted amount is less than the set max.
        require(
            minted[msg.sender][_id][_operator] <= maxMint[msg.sender][_id],
            "BadgerMintMaxAllowance::execute: Max mint reached."
        );
    }
}
