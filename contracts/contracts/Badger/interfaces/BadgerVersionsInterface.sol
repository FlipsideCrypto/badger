// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

interface BadgerVersionsInterface {

    /*//////////////////////////////////////////////////////////////
                                SCHEMAS
    //////////////////////////////////////////////////////////////*/

    /// @dev The schema of a version.
    struct Version { 
        address owner;
        bytes32 licenseKey;
        uint256 amount;
        bool locked;
    }

    /*//////////////////////////////////////////////////////////////
                                SETTERS
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Allows Badger to control the level of access to specific versions.
     * @dev This enables the ability to have Enterprise versions as well as public versions. None of this
     *      state is immutable as a license model may change in the future. 
     * @param _implementation The implementation address.
     * @param _owner The owner of the version.
     * @param _tokenAddress The token address.
     * @param _tokenId The token ID.
     * @param _amount The amount that this user will have to pay.
     * @param _locked Whether or not this version has been made immutable.
     */
    function setVersion(
          address _implementation 
        , address _owner
        , address _tokenAddress
        , uint256 _tokenId
        , uint256 _amount
        , bool _locked
    )
        external;

    /*//////////////////////////////////////////////////////////////
                                GETTERS
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Build the version key for a version and a sender.
     * @dev If the license for a version is updated, then the previous fundings 
     *      will be lost and no longer active unless the version is reverted back
     *      to the previous configuration. 
     * @param _implementation The implementation address.
     * @return The version key.
     */
    function getVersionKey(
        address _implementation 
    ) 
        external
        view
        returns (
            bytes32
        );

    /**
     * @notice Builds the license key for a version and a sender.
     * @param _versionKey The version key.
     * @param _sender The message sender address.
     * returns The license key for the message sender.
     */
    function getLicenseKey(
          bytes32 _versionKey
        , address _sender
    )
        external
        pure
        returns (
            bytes32
        );
}