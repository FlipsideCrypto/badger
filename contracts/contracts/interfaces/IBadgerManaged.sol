// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

interface IBadgerManaged {
    ////////////////////////////////////////////////////////
    ///                     EVENTS                       ///
    ////////////////////////////////////////////////////////

    /// @dev Event that announces when the state of a Manager changes.
    event ManagerUpdated(
        bytes32 indexed managerKey,
        address indexed manager,
        bool indexed isManager
    );

    /// @dev Event that announces when the config of a Manager changes.
    event ManagerConfigured(bytes32 indexed managerKey, bytes data);
}
