// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

interface IBadgerOrganizationHooked {
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
