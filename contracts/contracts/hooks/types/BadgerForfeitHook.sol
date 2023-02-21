// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

/// @dev Core dependencies.
import {BadgerOrganizationHook} from "../BadgerOrganizationHook.sol";

abstract contract BadgerForfeitHook is BadgerOrganizationHook {
    ////////////////////////////////////////////////////////
    ///                     GETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * See {IBadgerHook-executeSchema}.
     */
    function executeSchema()
        public
        pure
        virtual
        override
        returns (string memory)
    {
        return "address,uint256,uint256";
    }
}
