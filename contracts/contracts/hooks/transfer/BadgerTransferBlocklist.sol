// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

/// @dev Core dependencies.
import {BadgerTransferHook} from "../types/BadgerTransferHook.sol";

/**
 * @dev Transfer module that enforces prevents an Organization
 *      Badge from being transferred to certain addresses.
 * @notice The `bool` is included in the decoded config to prevent
 *         disastorous states when Marketplaces inevitably change.
 * @author CHANCE (@nftchance)
 * @author masonthechain (@masonthechain)
 */
contract BadgerTransferBlocklist is BadgerTransferHook {
    ////////////////////////////////////////////////////////
    ///                      STATE                       ///
    ////////////////////////////////////////////////////////

    /// @dev The schema used for the config method.
    string public constant override CONFIG_SCHEMA = "address,bool";

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
