// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

interface IBadgerManager {
    ////////////////////////////////////////////////////////
    ///                      STATE                       ///
    ////////////////////////////////////////////////////////

    function CONFIG_SCHEMA() external view returns (string memory);

    ////////////////////////////////////////////////////////
    ///                     SETTERS                      ///
    ////////////////////////////////////////////////////////

    function config(bytes calldata _data) external;
}
