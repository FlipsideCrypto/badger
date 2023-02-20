// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

interface IBadgerHook {
    ////////////////////////////////////////////////////////
    ///                     EVENTS                       ///
    ////////////////////////////////////////////////////////

    /// @dev Event that announces when a Hook is configured.
    event HookConfigured(
        address indexed organization,
        uint256 indexed id,
        bytes data
    );

    ////////////////////////////////////////////////////////
    ///                     SETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * @notice Configure the Hook.
     * @param _data The data to configure the Hook.
     *
     * Requirements:
     * - `_msgSender` must be a Manager of the Hook.
     */
    function config(bytes calldata _data) external;

    /**
     * @notice Execute the Hook.
     * @param _data The data to execute the Hook.
     *
     * Requirements:
     * - `_msgSender` must be a Manager of the Hook.
     */
    function execute(bytes calldata _data) external;
}
