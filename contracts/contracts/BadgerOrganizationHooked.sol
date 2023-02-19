// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

/// @dev Libraries.
import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

/**
 * @dev Every Badger Organization contact is built with the ability to hook into
 *      new core functionality as the consuming Organization and members evolve.
 *      With hooks, Organizations can utilize standardized or custom logic to
 *      extend the functionality of the Badger Organization simply by adding a
 *      hook contract to the Organization.
 * @author CHANCE (@nftchance)
 * @author masonthechain (@masonthechain)
 */
contract BadgerOrganizationHooked {
    using EnumerableSet for EnumerableSet.AddressSet;

    ////////////////////////////////////////////////////////
    ///                      STATE                       ///
    ////////////////////////////////////////////////////////

    /// @dev The hooks that are processed when a new hook is added.
    bytes32 public constant BEFORE_SET_HOOK = keccak256("beforeSetHook");

    /// @dev The hooks that are processed when a new Badge is minted.
    bytes32 public constant BEFORE_MINT = keccak256("beforeMintingHook");

    /// @dev The hooks that are processed when a Badge is revoked.
    bytes32 public constant BEFORE_REVOKE = keccak256("beforeRevokingHook");

    /// @dev The hooks that are processed when a Badge is forfeited.
    bytes32 public constant BEFORE_FORFEIT = keccak256("beforeForfeitHook");

    /// @dev The hooks that are processed when a Badge is transferred.
    bytes32 public constant BEFORE_TRANSFER = keccak256("beforeTransferHook");

    /// @dev ABI of the function that is called when a new hook is added.
    string public constant BEFORE_SET_HOOK_ABI =
        "beforeSetHook(bytes,address,bool)";

    /// @dev ABI of the function that is called when a new Badge is minted.
    string public constant BEFORE_MINT_ABI =
        "beforeMintingHook(address,uint256,uint256,bytes)";

    /// @dev ABI of the function that is called when a Badge is revoked.
    string public constant BEFORE_REVOKE_ABI =
        "beforeRevokingHook(address,uint256,uint256,bytes)";

    /// @dev ABI of the function that is called when a Badge is forfeited.
    string public constant BEFORE_FORFEIT_ABI =
        "beforeForfeitHook(address,uint256,uint256,bytes)";

    /// @dev ABI of the function that is called when a Badge is transferred.
    string public constant BEFORE_TRANSFER_ABI =
        "beforeTransferHook(address,address,uint256,uint256,bytes)";

    /// @dev The hooks that are processed when their triggers hit.
    /// @notice Instead of needing to loop through all of the hooks, we can
    ///         just loop through the hooks that are registered for the
    ///         specific trigger without having to have a handle mechanism
    ///         for every type of hook.
    /// @notice There is no quality enforcement on the hooks beyond a validating
    ///         the supplied address is a contract address due to the inherent
    ///         nature of suppporting multiple interfaces and functions from a
    ///         a single Hook Postman.
    mapping(bytes32 => EnumerableSet.AddressSet) internal hooks;

    ////////////////////////////////////////////////////////
    ///                 INTERNAL SETTERS                 ///
    ////////////////////////////////////////////////////////

    /**
     * @dev Update the state of hooks for a specified slot.
     * @param _slot The slot to update.
     * @param _slotHook The hook to add or remove.
     * @param _isHook Whether or not the hook is active.
     */
    function _setHook(
        bytes32 _slot,
        address _slotHook,
        bool _isHook
    ) internal {
        require(
            _slotHook.code.length > 0,
            "BadgerHooks::_setHook: Hook must be a contract address."
        );

        /// @dev If the hook is active, add it to the set.
        if (_isHook) {
            /// @dev Before setting a new hook, process any Organization hooks.
            _hook(
                BEFORE_SET_HOOK,
                abi.encodeWithSignature(
                    BEFORE_SET_HOOK_ABI,
                    _slot,
                    _slotHook,
                    _isHook
                )
            );

            /// @dev Add the hook to the set.
            hooks[_slot].add(_slotHook);
        } else {
            /// @dev If the hook is not active, remove it from the set.
            hooks[_slot].remove(_slotHook);
        }
    }

    /**
     * @dev Process the hooks for a specified slot.
     * @param _slot The slot to process.
     * @param _data The data to pass to the hooks.
     */
    function _hook(bytes32 _slot, bytes memory _data) internal {
        /// @dev Get the hooks for the slot.
        address[] memory slotHooks = hooks[_slot].values();

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
                        _slot,
                        ": Hook failed to allow execution."
                    )
                )
            );
        }
    }
}
