// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

/// @dev Core dependencies.
import {BadgerOrganizationHook} from "../BadgerOrganizationHook.sol";

/**
 * @dev Mint module that enforces a max supply for a Badge.
 * @author CHANCE (@nftchance)
 * @author masonthechain (@masonthechain)
 */
contract BadgerMintMaxSupply is BadgerOrganizationHook {
    ////////////////////////////////////////////////////////
    ///                      STATE                       ///
    ////////////////////////////////////////////////////////

    /// @dev Mapping of Organization address to Badge Id to Max Supply.
    mapping(address => mapping(uint256 => uint256)) public maxSupply;

    /// @dev Keep track of the number of tokens minted.
    mapping(address => mapping(uint256 => uint256)) public totalSupply;

    ////////////////////////////////////////////////////////
    ///                     SETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * See {IBadgerHook-config}.
     */
    function config(bytes calldata _data) public virtual override {
        /// @dev Decode the configuration data forwarded from the Organization.
        (uint256 _id, uint256 _maxSupply) = abi.decode(
            _data,
            (uint256, uint256)
        );

        /// @dev Require the max to be greater than zero.
        require(
            _maxSupply > totalSupply[msg.sender][_id],
            "BadgerMintMaxSupply::config: Max must be greater than the already minted supply."
        );

        /// @dev Set the max supply for the token.
        maxSupply[msg.sender][_id] = _maxSupply;
    }

    /**
     * See {IBadgerHook-execute}.
     */
    function execute(bytes calldata _data) public virtual override {
        /// @dev Decode the transfer data forwarded from the Organization.
        (, , uint256 _id, uint256 _amount, ) = abi.decode(
            _data,
            (address, address, uint256, uint256, bytes)
        );

        /// @dev Add the newly minted amount to the total supply.
        totalSupply[msg.sender][_id] += _amount;

        /// @dev Ensure the max supply has not been exceeded.
        require(
            totalSupply[msg.sender][_id] <= maxSupply[msg.sender][_id],
            "BadgerMintMaxSupply::execute: Max supply exceeded."
        );
    }
}
