// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

/// @dev Core dependencies.
import {BadgerOrganizationHook} from "../BadgerOrganizationHook.sol";

/**
 * @dev Transfer module that enforces accountBound logic.
 * @author CHANCE (@nftchance)
 * @author masonthechain (@masonthechain)
 */
contract BadgerTransferBound is BadgerOrganizationHook {
    ////////////////////////////////////////////////////////
    ///                      STATE                       ///
    ////////////////////////////////////////////////////////

    /// @dev Mapping of token addresses to accountBound status.
    mapping(address => mapping(uint256 => bool)) public transferable;

    ////////////////////////////////////////////////////////
    ///                     SETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * See {IBadgerHook-config}.
     */
    function config(bytes calldata _data) public virtual override {
        /// @dev Decode the configuration data forwarded from the Organization.
        (uint256 _id, bool _accountBound) = abi.decode(_data, (uint256, bool));

        /// @dev Set the accountBound status for the token.
        transferable[msg.sender][_id] = _accountBound;
    }

    /**
     * See {IBadgerHook-execute}.
     */
    function execute(bytes calldata _data) public virtual override {
        /// @dev Decode the transfer data forwarded from the Organization.
        (, address _from, address _to, uint256 _id, , ) = abi.decode(
            _data,
            (address, address, address, uint256, uint256, bytes)
        );

        /// @dev Require the transfer to be from or to the zero address.
        require(
            _from == address(0) ||
                _to == address(0) ||
                transferable[msg.sender][_id],
            "BadgerTransferBound::execute: Invalid permission to transfer token."
        );
    }
}
