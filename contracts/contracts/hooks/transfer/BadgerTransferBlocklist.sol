// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

/// @dev Core dependencies.
import {BadgerOrganizationHook} from "../BadgerOrganizationHook.sol";

/**
 * @dev Transfer module that enforces prevents an Organization
 *      Badge from being transferred to certain addresses.
 * @author CHANCE (@nftchance)
 * @author masonthechain (@masonthechain)
 */
contract BadgerTransferBlocklist is BadgerOrganizationHook {
    ////////////////////////////////////////////////////////
    ///                      STATE                       ///
    ////////////////////////////////////////////////////////

    /// @dev Mapping of token addresses to accountBound status.
    mapping(address => mapping(address => bool)) public blocked;

    ////////////////////////////////////////////////////////
    ///                     SETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * See {IBadgerHook-config}.
     */
    function config(bytes calldata _data) public virtual override {
        /// @dev Decode the configuration data forwarded from the Organization.
        (address _target, bool _blocked) = abi.decode(_data, (address, bool));

        /// @dev Set the receiving state for the token.
        blocked[msg.sender][_target] = _blocked;
    }

    /**
     * See {IBadgerHook-execute}.
     */
    function execute(bytes calldata _data) public virtual override {
        /// @dev Decode the transfer data forwarded from the Organization.
        (, , address _to, , , ) = abi.decode(
            _data,
            (address, address, address, uint256[], uint256[], bytes)
        );

        /// @dev Loop through all of the tokens moving.
        require(
            !blocked[msg.sender][_to],
            "BadgerTransferBlocklist::execute: Invalid permission to transfer token."
        );
    }
}
