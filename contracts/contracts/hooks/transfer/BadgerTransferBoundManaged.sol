// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

/// @dev Consumer dependencies.
import {BadgerOrganizationLogic} from "../../BadgerOrganizationLogic.sol";

/// @dev Core dependencies.
import {BadgerOrganizationHook} from "../BadgerOrganizationHook.sol";

/**
 * @dev Transfer module that enforces transferable logic that can be
 *      overridden by Badge Managers.
 * @author CHANCE (@nftchance)
 * @author masonthechain (@masonthechain)
 */
contract BadgerTransferBoundManaged is BadgerOrganizationHook {
    ////////////////////////////////////////////////////////
    ///                      STATE                       ///
    ////////////////////////////////////////////////////////

    /// @dev Mapping of token addresses to transferable status.
    mapping(address => mapping(uint256 => bool)) public transferable;

    ////////////////////////////////////////////////////////
    ///                     SETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * See {IBadgerHook-config}.
     */
    function config(bytes calldata _data) public virtual override {
        /// @dev Decode the configuration data forwarded from the Organization.
        (uint256 _id, bool _transferable) = abi.decode(_data, (uint256, bool));

        /// @dev Set the transferable status for the token.
        transferable[msg.sender][_id] = _transferable;
    }

    /**
     * See {IBadgerHook-execute}.
     */
    function execute(bytes calldata _data) public virtual override {
        /// @dev Decode the transfer data forwarded from the Organization.
        (address _operator, address _from, address _to, uint256 _id, , ) = abi
            .decode(
                _data,
                (address, address, address, uint256, uint256, bytes)
            );

        /// @dev Require the transfer to be from or to the zero address.
        require(
            _from == address(0) ||
                _to == address(0) ||
                transferable[msg.sender][_id] ||
                BadgerOrganizationLogic(msg.sender).isBadgeManager(
                    _id,
                    _operator
                ),
            "BadgerTransferBoundManaged::execute: Invalid permission to transfer token."
        );
    }
}
