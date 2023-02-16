// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

interface IBadgerScout {
    /*//////////////////////////////////////////////////////////////
                                SCHEMAS
    //////////////////////////////////////////////////////////////*/

    /// @dev The processing information for this Badger.
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

    /// @dev Event that announces when the state of a Delegate changes.
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
     * @notice Create a badge in the Organization.
     * @param _id The id of the badge being created.
     * @param _accountBound Whether or not the badge is account bound.
     * @param _uri The URI for the badge.
     * @param _managers The addresses of the delegates.
     */
    function setBadge(
        uint256 _id,
        bool _accountBound,
        string memory _uri,
        address[] memory _managers
    ) external;

    /**
     * @notice Set the uri for a Badge.
     * @param _uri The address of the signer.
     */
    function setBadgeURI(uint256 _id, string memory _uri) external;

    /**
     * @notice Allow the Owner of the Organization to assign high-level Managers.
     * @param _managers The addresses of the Managers to update.
     * @param _isManager The status of the Managers being updated.
     */
    function setManagers(
        address[] calldata _managers,
        bool[] calldata _isManager
    ) external;

    /**
     * @notice Allow Organization Owners and Managers to control Badge Management.
     * @param _id The id of the badge.
     * @param _managers The addresses of the Managers to update.
     * @param _isManager The status of the Managers being updated.
     */
    function setManagers(
        uint256 _id,
        address[] calldata _managers,
        bool[] calldata _isManager
    ) external;

    /**
     * @notice Allow the Owner of the Organization to assign high-level Managers.
     * @dev This functionality is not exposed through the Dashboard UI however you can call this function directly.
     * @param _managers The addresses of the Managers to update.
     * @param _isManager The status of the Managers being updated.
     */
    function setManagersBatch(
        address[] calldata _managers,
        bool[] calldata _isManager
    ) external;

    /**
     * @notice Allow Organization Owners and Managers to control Badge Management..
     * @dev This functionality is not exposed through the Dashboard UI however you can call this function directly.
     * @param _ids The ids of the badges.
     * @param _managers The addresses of the Managers to update.
     * @param _isManager The status of the Managers being updated.
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
