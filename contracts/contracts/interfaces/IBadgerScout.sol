// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

interface IBadgerScout {
    /*//////////////////////////////////////////////////////////////
                                SCHEMAS
    //////////////////////////////////////////////////////////////*/

    /// @dev The processing information for this Badge.
    struct Badge {
        uint256 config; /// ---- @dev Bitpacked accountBound.
        string uri; /// -------- @dev The URI for the badge.
    }

    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    /// @dev Event that announces when the Organization is updated.
    event OrganizationUpdated(string organizationURI);

    /// @dev Event that announces when the status of a Badge is updated.
    event BadgeUpdated(uint256 indexed badgeId, uint256 indexed config);

    /// @dev Event that announces when the state of a Manager changes.
    event ManagerUpdated(bytes32 indexed managerKey, bool indexed isManager);

    /*//////////////////////////////////////////////////////////////
                                SETTERS
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Set the URI for the Organization.
     * @param _uri The URI for the Organization.
     */
    function setOrganizationURI(string memory _uri) external;

    /**
     * @notice Create a Badge in the Organization.
     * @param _id The id of the Badge being created.
     * @param _accountBound Whether or not the Badge is account bound.
     * @param _uri The URI for the Badge.
     * @param _managers The addresses of the Badge Managers.
     *
     * Requirements:
     * - `_msgSender` must be a Manager of the Badge or Organization.
     * - `_uri` cannot be empty.
     */
    function setBadge(
        uint256 _id,
        bool _accountBound,
        string memory _uri,
        address[] memory _managers
    ) external;

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
     * @param _id The id of the badge.
     * @param _managers The addresses of the Managers to update.
     * @param _isManager The status of the Managers being updated.
     *
     * Requirements:
     * - `_msgSender` must be an Organization Manager.
     */
    function setManagers(
        uint256 _id,
        address[] calldata _managers,
        bool[] calldata _isManager
    ) external;

    /**
     * @notice Allow the Owner of the Organization to control Organization Managers.
     * @param _managers The addresses of the Managers to update.
     * @param _isManager The status of the Managers being updated.
     *
     * Requirements:
     * - `_msgSender` must be the Organization Owner.
     */
    function setManagersBatch(
        address[] calldata _managers,
        bool[] calldata _isManager
    ) external;

    /**
     * @notice Allow Organization Managers to control Badge Managers.
     * @param _ids The ids of the badges.
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

    /*//////////////////////////////////////////////////////////////
                                GETTERS
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Get the config for a specific badge id.
     * @param _id The id of the badge being accessed.
     * @return True if the badge is account bound, false otherwise.
     */
    function getAccountBound(uint256 _id) external view returns (bool);
}
