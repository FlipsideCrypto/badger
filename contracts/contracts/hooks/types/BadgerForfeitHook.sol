// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

/// @dev Core dependencies.
import {BadgerOrganizationHook} from "../BadgerOrganizationHook.sol";

abstract contract BadgerForfeitHook is BadgerOrganizationHook {
    /// @dev The schema used for the execute method.
    string public constant override EXECUTE_SCHEMA = "address,uint256,uint256";
}
