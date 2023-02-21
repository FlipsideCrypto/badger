// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

/**
 * @notice Interface for a Badger Hook that can be configured and executed.
 * @dev It is critical to understand that Hooks should only ever be configured
 *      and executed by their consumer. Under no circumstances should anyone
 *      ever directly interact with a hook, and if you build a protocol with
 *      expectation of things working a certain way, you should always test.
 *      AGAIN, DO NOT DIRECTLY INTERACT WITH HOOKS IT IS NOT SUPPORTED.
 */
interface IBadgerHook {
    ////////////////////////////////////////////////////////
    ///                     SETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * @notice Configure the Hook.
     * @param _data The data to configure the Hook.
     */
    function config(bytes calldata _data) external;

    /**
     * @notice Execute the Hook.
     * @param _data The data to execute the Hook.
     */
    function execute(bytes calldata _data) external;

    ////////////////////////////////////////////////////////
    ///                     GETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * @notice Get the schema for the Hook configuration.
     */
    function configSchema() external view returns (string memory);

    /**
     * @notice Get the schema for the Hook execution.
     */
    function executeSchema() external view returns (string memory);
}
