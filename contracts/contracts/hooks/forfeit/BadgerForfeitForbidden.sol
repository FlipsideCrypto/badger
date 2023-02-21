// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

/// @dev Core dependencies.
import {BadgerHookHook} from "../types/BadgerHookHook.sol";

/**
 * @dev Hook module that prevents tokens from being forfeited.
 * @author CHANCE (@nftchance)
 * @author masonthechain (@masonthechain)
 */
contract BadgerForfeitForbidden is BadgerHookHook {
    ////////////////////////////////////////////////////////
    ///                      STATE                       ///
    ////////////////////////////////////////////////////////

    /// @dev Mapping of Organization to Badge Id to forfeit forbidden status.
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

        /// @dev Set the state of forfeit being `forbidden` for a Badge id.
        forbidden[msg.sender][_id] = _isforbidden;
    }

    /**
     * See {IBadgerHook-execute}.
     */
    function execute(bytes calldata _data) public virtual override {
        /// @dev Decode the transfer data forwarded from the Organization.
        (, uint256 _id, ) = abi.decode(_data, (address, uint256, uint256));

        /// @dev Enforce the hook being processed is not blocklisted.
        /// @notice Will not run when the hook is being disabled to bypass
        ///         a module that may be reverting or otherwise blocking.
        require(
            !forbidden[msg.sender][_id],
            "BadgerForfeitforbidden::execute: Invalid permission to forfeit token."
        );
    }

    ////////////////////////////////////////////////////////
    ///                     GETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * See {IBadgerHook-configSchema}.
     */
    function configSchema()
        public
        pure
        virtual
        override
        returns (string memory)
    {
        return "uint256,bool";
    }
}
