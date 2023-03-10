// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

import {IBadgerConfigured} from "./interfaces/IBadgerConfigured.sol";

contract BadgerNetwork {
    function _configNetwork(address _manager, bytes calldata _config)
        internal
        virtual
    {
        /// @dev Get the configured target that is being configured.
        IBadgerConfigured target = IBadgerConfigured(_manager);

        /// @dev Set the configuration for the target.
        target.config(_config);
    }
}
