// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

interface IBadgerHooked {
    ////////////////////////////////////////////////////////
    ///                     EVENTS                       ///
    ////////////////////////////////////////////////////////

    /// @dev Event that announces when a hook is updated.
    event HookUpdated(
        bytes32 indexed hookKey,
        address indexed hook,
        bool indexed isHook
    );

    /// @dev Event that announces when the config of a hook changes.
    event HookConfigured(bytes32 indexed hookKey, bytes data);

    ////////////////////////////////////////////////////////
    ///                     GETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * @dev Returns the hooks for a given slot.
     * @param _slot The slot to get hooks for.
     * @return The hooks for the given slot.
     */
    function getHooks(bytes32 _slot) external view returns (address[] memory);
}
