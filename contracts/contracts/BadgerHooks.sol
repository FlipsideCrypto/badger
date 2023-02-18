// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

/// @dev Core dependencies.
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

// TODO: Need to add `badges` and `managerKeys` to the BadgerScout interface

contract BadgerHooks {
    using EnumerableSet for EnumerableSet.AddressSet;

    ////////////////////////////////////////////////////////
    ///                      STATE                       ///
    ////////////////////////////////////////////////////////

    /// @dev The hooks that are processed when their triggers hit.
    /// @notice Instead of needing to loop through all of the hooks, we can
    ///         just loop through the hooks that are registered for the
    ///         specific trigger without having to have a handle mechanism
    ///         for every type of hook.
    /// @notice There is no quality enforcement on the hooks beyond a validating
    ///         the supplied address is a contract address due to the inherent
    ///         nature of suppporting multiple interfaces and functions from a
    ///         a single Hook Postman.
    /// @dev Slot 0: reversed for `beforeSetHook`
    /// @dev Slot 1: reserved for `beforeMintingHook`
    /// @dev Slot 2: reserved for `beforeRevokingHook`
    /// @dev Slot 3: reserved for `beforeForfeitHook`
    /// @dev Slot 4: reserved for `beforeTransferHook`
    mapping(uint8 => EnumerableSet.AddressSet) internal hooks;

    ////////////////////////////////////////////////////////
    ///                 INTERNAL SETTERS                 ///
    ////////////////////////////////////////////////////////

    /**
     */
    function _setHook(
        uint8 _slot,
        address _slotHook,
        bool _isActive
    ) internal {
        if (_isActive) {
            _beforeSetHook(_slot, _slotHook, _isActive); /// @dev Call the `beforeSetHook` hook.

            hooks[_slot].add(_slotHook); /// --- @dev Add the item to the slot.
        } else hooks[_slot].remove(_slotHook); /// @dev If the hook is not active, remove it from the set.
    }

    function _beforeMintHook(
        address _to,
        uint256 _id,
        uint256 _amount,
        bytes memory _data
    ) internal {
        // Build the data to be passed to the hooks.
        bytes memory data = abi.encodeWithSignature(
            "beforeMintingHook(address,uint256,uint256,bytes)",
            _to,
            _id,
            _amount,
            _data
        );

        // Call the hooks.
        _hook(0, data, "beforeMintingHook");
    }

    function _beforeRevokeHook(
        address _from,
        uint256 _id,
        uint256 _amount
    ) internal {
        bytes memory data = abi.encodeWithSignature(
            "beforeRevokeHook(address,uint256,uint256)",
            _from,
            _id,
            _amount
        );

        _hook(1, data, "beforeRevokeHook");
    }

    function _beforeForfeitHook(
        address _from,
        uint256 _id,
        uint256 _amount
    ) internal {
        bytes memory data = abi.encodeWithSignature(
            "beforeForfeitHook(address,uint256,uint256)",
            _from,
            _id,
            _amount
        );

        _hook(2, data, "beforeForfeitHook");
    }

    function _beforeTransferHook(
        address _operator,
        address _from,
        address _to,
        uint256[] memory _ids,
        uint256[] memory _amounts,
        bytes memory _data
    ) internal {
        bytes memory data = abi.encodeWithSignature(
            "beforeTransferHook(address,address,address,uint256[],uint256[],bytes)",
            _operator,
            _from,
            _to,
            _ids,
            _amounts,
            _data
        );

        _hook(3, data, "beforeTransferHook");
    }

    function _hook(
        uint8 _slot,
        bytes memory _data,
        bytes memory _key
    ) internal {
        /// @dev Retrieve the hooks out of storage.
        address[] storage slotHooks = hooks[_slot];

        /// @dev Load the stack.
        uint256 i;

        /// @dev Loop through the hooks and call them.
        for (i; i < slotHooks.length; i++) {
            // Make the low level call the hook using the supplied data.
            (bool success, ) = slotHooks[i].call(_data);

            /// @dev If the hook fails, revert the transaction.
            require(
                success,
                string(
                    abi.encodePacked(
                        "BadgerHooks::",
                        _key,
                        ": Hook failed to allow execution."
                    )
                )
            );
        }
    }
}
