// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

interface BadgerVersionsInterface {
    /*//////////////////////////////////////////////////////////////
                                SCHEMAS
    //////////////////////////////////////////////////////////////*/

    /// @dev The schema of the license control for a version.
    struct VersionLicense { 
        address tokenAddress;         
        uint256 tokenId;              
        uint256 amount;               
    }

    /// @dev The schema of a version.
    struct Version { 
        address implementation;
        VersionLicense license;
    }

    /// @dev Announces when a new Organization is created through the protocol Factory.
    event OrganizationCreated(
        address indexed organization,
        address indexed owner,
        address indexed implementation
    );

    /*//////////////////////////////////////////////////////////////
                                SETTERS
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Allows Badger to control the level of access to specific versions.
     * @dev This enables the ability to have Enterprise versions as well as public versions. None of this
     *      state is immutable as a license model may change in the future. 
     * @param _version The version to update.
     * @param _implementation The implementation address.
     * @param _tokenAddress The token address.
     * @param _tokenId The token ID.
     * @param _amount The amount that this user will have to pay.
     */
    function setVersion(
          uint256 _version
        , address _implementation 
        , address _tokenAddress
        , uint256 _tokenId
        , uint256 _amount
    )
        external;

    /*//////////////////////////////////////////////////////////////
                                GETTERS
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Gets the version information.
     * @param _version The version to get.
     * return The version information.
     */
    function getVersion(
        uint256 _version
    ) 
        external
        view
        returns (
            uint256
          , address
          , address
          , uint256
          , uint256
        );

    /**
     * @notice Build the version key for a version and a sender.
     * @dev If the license for a version is updated, then the previous fundings 
     *      will be lost and no longer active unless the version is reverted back
     *      to the previous configuration. 
     * @param _version The version of the Organization that is being created.
     * @param _owner The address that will be the owner of the Organization.
     * @param _license The license schema for the version.
     * @return The key that tracks the vresion, license and funding.
     */
    function getVersionKey(
          uint256 _version
        , address _owner
        , VersionLicense memory _license
    ) 
        external
        view
        returns (
            bytes32
        );

}