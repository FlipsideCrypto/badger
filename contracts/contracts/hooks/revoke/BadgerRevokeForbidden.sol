// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

/// @dev Core dependencies.
import {BadgerHookHook} from "../types/BadgerHookHook.sol";

/**
 * @dev Hook module that prevents tokens from being revokeed.
 * @author CHANCE (@nftchance)
 * @author masonthechain (@masonthechain)
 */
contract BadgerRevokeForbidden is BadgerHookHook {
    ////////////////////////////////////////////////////////
    ///                      STATE                       ///
    ////////////////////////////////////////////////////////

    /// @dev The schema used for the config method.
    string public constant override CONFIG_SCHEMA = "uint256,bool";

    /// @dev Mapping of Organization to Badge Id to revoke forbidden status.
    mapping(address => mapping(uint256 => bool)) public forbidden;

    ////////////////////////////////////////////////////////
    ///                     SETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * See {IBadgerHook-config}.
     */
    function config(bytes calldata _data) public virtual override {
        /// @dev Decode the configuration data forwarded from the Organization.
        (uint256 _id, bool _isforbidden) = abi.decode(_data, (uint256, bool));

        /// @dev Set the state of revoke being `forbidden` for a Badge id.
        forbidden[msg.sender][_id] = _isforbidden;
    }

    /**
     * See {IBadgerHook-execute}.
     */
    function execute(bytes calldata _data) public virtual override {
        /// @dev Decode the transfer data forwarded from the Organization.
        (, , uint256 _id, ) = abi.decode(
            _data,
            (address, address, uint256, uint256)
        );

        /// @dev Enforce the token being revoked has not been forbidden.
        require(
            !forbidden[msg.sender][_id],
            "BadgerRevokeForbidden::execute: Invalid permission to revoke token."
        );
    }
}
