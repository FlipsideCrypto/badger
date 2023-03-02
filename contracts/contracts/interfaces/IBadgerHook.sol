// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

/// @dev Core dependencies.
import {IBadgerConfigured} from "./IBadgerConfigured.sol";

/**
 * @notice Interface for a Badger Hook that can be configured and executed.
 * @dev It is critical to understand that Hooks should only ever be configured
 *      and executed by their consumer. Under no circumstances should anyone
 *      ever directly interact with a hook, and if you build a protocol with
 *      expectation of things working a certain way, you should always test.
 *      AGAIN, DO NOT DIRECTLY INTERACT WITH HOOKS IT IS NOT SUPPORTED.
 */
interface IBadgerHook is IBadgerConfigured {
    ////////////////////////////////////////////////////////
    ///                      STATE                       ///
    ////////////////////////////////////////////////////////

    function EXECUTE_SCHEMA() external view returns (string memory);

    ////////////////////////////////////////////////////////
    ///                     SETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * @notice Execute the Hook.
     * @param _data The data to execute the Hook.
     */
    function execute(bytes calldata _data) external;
}
