// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

/// @dev Core dependencies.
import {IBadgerManaged} from "../interfaces/IBadgerManaged.sol";
import {BadgerNetwork} from "../BadgerNetwork.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

/// @dev Helper dependencies.
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";

import {IBadgerConfigured} from "../interfaces/IBadgerConfigured.sol";

contract BadgerManaged is IBadgerManaged, BadgerNetwork {
    using Address for address;

    ////////////////////////////////////////////////////////
    ///                      STATE                       ///
    ////////////////////////////////////////////////////////

    /// @dev Tracking the Managers of a Badge.
    mapping(bytes32 => bool) public managerKeyToIsManager;

    ////////////////////////////////////////////////////////
    ///                     SETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * @notice Packs the logic for updating the state of a Manager into a reusable function.
     * @dev The key is a `keccak256` hash of the address of the Manager.
     * @param _key The key used to identify the Manager.
     * @param _isManager The state of the Manager.
     */
    function _setManager(bytes32 _key, bool _isManager) internal virtual {
        /// @dev Save the Manager state based on the encoded key.
        managerKeyToIsManager[_key] = _isManager;

        /// @dev Announce the change of Manager state.
        emit ManagerUpdated(_key, _isManager);
    }

    /**
     * @notice Packs the logic for updating the config of a Manager into a reusable function.
     * @param _manager The address of the Manager.
     * @param _key The key used to identify the Manager.
     * @param _config The configuration of the Manager.
     */
    function _configManager(
        address _manager,
        bytes32 _key,
        bytes calldata _config
    ) internal virtual {
        /// @dev Confirm the manager is active.
        require(
            managerKeyToIsManager[_key],
            "BadgerOrganizationHooked::_configManager: Manager is not enabled."
        );

        /// @dev Confirm the manager being configured is a contract.
        require(
            _manager.isContract(),
            "BadgerOrganizationHooked::_configManager: Manager is not a contract."
        );

        /// @dev Confirm the address is a configured badger module.
        require(
            IERC165(_manager).supportsInterface(
                type(IBadgerConfigured).interfaceId
            ),
            "BadgerOrganizationHooked::_configManager: Manager is not a configured Badger module."
        );

        /// @dev Announce the configuration of the manager.
        emit ManagerConfigured(_key, _config);

        /// @dev Configure the manager network object.
        _configNetwork(_manager, _config);
    }
}
