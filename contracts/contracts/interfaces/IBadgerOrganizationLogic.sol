// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

interface IBadgerOrganizationLogic {
    ////////////////////////////////////////////////////////
    ///                     EVENTS                       ///
    ////////////////////////////////////////////////////////

    /// @dev Event that announces when the Organization is updated.
    event OrganizationUpdated(string organizationURI);

    /// @dev Event that announces when the state of a Manager changes.
    event ManagerUpdated(bytes32 indexed managerKey, bool indexed isManager);

    ////////////////////////////////////////////////////////
    ///                     SETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * @notice Set the URI for the Organization.
     * @param _uri The URI for the Organization.
     */
    function setOrganizationURI(string memory _uri) external;

    /**
     * @notice Set the URI for a Badge.
     * @param _uri The URI for the Badge.
     *
     * Requirements:
     * - `_msgSender` must be a Manager of the Badge or Organization.
     * - `_uri` cannot be empty.
     */
    function setBadgeURI(uint256 _id, string memory _uri) external;

    /**
     * @notice Allow the Owner of the Organization to control Organization Managers.
     * @param _managers The addresses of the Managers to update.
     * @param _isManager The status of the Managers being updated.
     *
     * Requirements:
     * - `_msgSender` must be the Organization Owner.
     */
    function setManagers(
        address[] calldata _managers,
        bool[] calldata _isManager
    ) external;

    /**
     * @notice Allow Organization Managers to control Badge Managers.
     * @param _id The id of the Badge.
     * @param _managers The addresses of the Managers to update.
     * @param _isManager The status of the Managers being updated.
     *
     * Requirements:
     * - `_msgSender` must be an Organization Manager or Owner.
     */
    function setManagers(
        uint256 _id,
        address[] calldata _managers,
        bool[] calldata _isManager
    ) external;

    /**
     * @notice Allow Organization Managers to control Badge Managers for multiple Badges.
     * @param _ids The ids of the Badges.
     * @param _managers The addresses of the Managers to update.
     * @param _isManager The status of the Managers being updated.
     *
     * Requirements:
     * - `_msgSender` must be an Organization Manager.
     */
    function setManagersBatch(
        uint256[] calldata _ids,
        address[] calldata _managers,
        bool[] calldata _isManager
    ) external;

    /**
     * @notice Allow Organization Managers to configure Organization Hooks.
     * @dev The slot is used to differentiate between different types of hooks.
     * @param _slot The slot of the hook.
     * @param _hooks The addresses of the hooks to update.
     * @param _isHook The status of the hooks being updated.
     */
    function setHooks(
        bytes32 _slot,
        address[] calldata _hooks,
        bool[] calldata _isHook
    ) external;

    function setHooksBatch(
        bytes32[] calldata _slots,
        address[] calldata _hooks,
        bool[] calldata _isHook
    ) external;

    ////////////////////////////////////////////////////////
    ///                     GETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * @notice Determine if an address is an Organization Manager.
     * @param _manager The address to check.
     * @return True if the address is an Organization Manager, otherwise false.
     */
    function isOrganizationManager(address _manager)
        external
        view
        returns (bool);

    /**
     * @notice Determine if an address is a Badge Manager.
     * @param _id The id of the Badge.
     * @param _manager The address to check.
     * @return True if the address is a Badge Manager, otherwise false.
     */
    function isBadgeManager(uint256 _id, address _manager)
        external
        view
        returns (bool);
}
