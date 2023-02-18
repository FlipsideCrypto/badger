// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

interface IBadgerScout {
    /*//////////////////////////////////////////////////////////////
                                SCHEMAS
    //////////////////////////////////////////////////////////////*/

    /// @dev The processing information for this Badge.
    struct Badge {
        bool accountBound; /// ---- @dev Whether or not the Badge is account bound.
        string uri; /// ----------- @dev The URI for the badge.
    }

    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    /// @dev Event that announces when the Organization is updated.
    event OrganizationUpdated(string organizationURI);

    /// @dev Event that announces when the status of a Badge is updated.
    event BadgeUpdated(uint256 indexed badgeId, bool indexed accountBound);

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
}
