// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

/// @dev Core dependencies.
import {BadgerHookHook} from "../types/BadgerHookHook.sol";

/**
 * @dev Hook module that prevents certain hooks from being enabled.
 * @author CHANCE (@nftchance)
 * @author masonthechain (@masonthechain)
 */
contract BadgerHookBlocklist is BadgerHookHook {
    ////////////////////////////////////////////////////////
    ///                      STATE                       ///
    ////////////////////////////////////////////////////////

    /// @dev Mapping of Organization to Hook to blocklisted status.
    mapping(address => mapping(address => bool)) public blocked;

    ////////////////////////////////////////////////////////
    ///                     SETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * See {IBadgerHook-config}.
     */
    function config(bytes calldata _data) public virtual override {
        /// @dev Decode the configuration data forwarded from the Organization.
        address _hook = abi.decode(_data, (address));

        /// @dev Forever lock away the hook from being enabled.
        blocked[msg.sender][_hook] = true;
    }

    /**
     * See {IBadgerHook-execute}.
     */
    function execute(bytes calldata _data) public virtual override {
        /// @dev Decode the transfer data forwarded from the Organization.
        (, address _slotHook, bool _isHook) = abi.decode(
            _data,
            (bytes32, address, bool)
        );

        /// @dev Enforce the hook being processed is not blocklisted.
        /// @notice Will not run when the hook is being disabled to bypass
        ///         a module that may be reverting or otherwise blocking.
        require(
            !_isHook || !blocked[msg.sender][_slotHook],
            "BadgerHookBlacklist::execute: Cannot enable blocklisted hook."
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
        return "address";
    }
}
