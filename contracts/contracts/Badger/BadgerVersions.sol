// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

/// @dev Core dependencies.
import { BadgerVersionsInterface } from "./interfaces/BadgerVersionsInterface.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ERC1155Holder } from "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

/// @dev Helpers.
import { Clones } from "@openzeppelin/contracts/proxy/Clones.sol";
import { BadgerOrganizationInterface } from "../BadgerOrganization/interfaces/BadgerOrganizationInterface.sol";

/// @dev Supported interfaces.
import { IERC1155 } from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

contract BadgerVersions is
      BadgerVersionsInterface 
    , Ownable
    , ERC1155Holder 
{ 
    using Clones for address;


    /*//////////////////////////////////////////////////////////////
                           PROTOCOL STATE
    //////////////////////////////////////////////////////////////*/

    /// @dev All of the versions that are actively running.
    ///      This also enables the ability to self-fork ones product.
    mapping(uint256 => Version) public versions;

    /// @dev Tracking the organizations that one has funded the cost for.
    mapping(bytes32 => uint256) public versionKeyToFunded;

    /*//////////////////////////////////////////////////////////////
                               CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor(
        address _implementation
    ) {
        _setVersion(
              0
            , _implementation
            , address(0)
            , 0
            , 0
        );
    }

    /*//////////////////////////////////////////////////////////////
                                SETTERS
    //////////////////////////////////////////////////////////////*/

    /**
     * See {Badger._setVersion}
     * 
     * Requirements:
     * - The caller must be the owner.
     */    
    function setVersion(
        uint256 _version
      , address _implementation
      , address _tokenAddress
      , uint256 _tokenId
      , uint256 _amount
    ) 
        external
        onlyOwner
    {
        _setVersion(
              _version
            , _implementation
            , _tokenAddress
            , _tokenId
            , _amount
        );
    }

    /*//////////////////////////////////////////////////////////////
                                GETTERS
    //////////////////////////////////////////////////////////////*/

    /**
     * See {BadgerVersionsInterface.getVersion}
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
        )
    {
        return (
              _version
            , versions[_version].implementation
            , versions[_version].license.tokenAddress
            , versions[_version].license.tokenId
            , versions[_version].license.amount
        );
    }

    /**
     * See {BadgerVersionsInterface.getVersionKey}
     */    
    function getVersionKey(
          uint256 _version
        , address _owner
        , VersionLicense memory _license
    ) 
        public 
        pure 
        returns (
            bytes32
        ) 
    {
        return keccak256(
            abi.encodePacked(
                  _version
                , _owner
                , _license.tokenAddress
                , _license.tokenId
            )
        );
    }

    /*//////////////////////////////////////////////////////////////
                            INTERNAL SETTERS
    //////////////////////////////////////////////////////////////*/

    /**
     * See {BadgerVersionsInterface.setVersion}
     */
    function _setVersion(
        uint256 _version
      , address _implementation
      , address _tokenAddress
      , uint256 _tokenId
      , uint256 _amount
    ) 
        internal
    {
        versions[_version] = Version({
              implementation: _implementation
            , license: VersionLicense({
                  tokenAddress: _tokenAddress
                , tokenId: _tokenId
                , amount: _amount
            })
        });
    }

    /**
     * @notice Creates a new Organization to be led by the deploying address.
     * @param _version The version to use for this version and sender.
     * @param _versionKey The version key to use for this Organization.
     * @param _deployer The address that will be the deployer of the Organizatoin contract.
     * @param _uri The base URI used for the metadata of tokens.
     * @param _organizationURI The metadata of the Organization.
     * @param _name The name of the Organization.
     * @param _symbol The symbol of the Organization.
     * @dev The Organization contract is created using the Organization implementation contract.
     */
    function _createOrganization(
          uint256 _version
        , VersionLicense memory _license
        , bytes32 _versionKey
        , address _deployer
        , string memory _uri
        , string memory _organizationURI
        , string memory _name
        , string memory _symbol
    )
        internal
        returns (
            address
        )
    {
        /// @dev If this version is paid deduct from the funded amount of the sender.
        if (_license.amount > 0) {
            versionKeyToFunded[_versionKey] -= _license.amount;
        }

        /// @dev Get the address of the implementation for the desired version.
        address versionImplementation = versions[_version].implementation;

        /// @dev Get the address of the target.
        address organizationAddress = versionImplementation.clone();

        /// @dev Interface with the newly created contract to initialize it. 
        BadgerOrganizationInterface organization = BadgerOrganizationInterface(
            organizationAddress
        );

        /// @dev Deploy the clone contract to serve as the Organization.
        organization.initialize(
              _deployer
            , _uri
            , _organizationURI
            , _name
            , _symbol
        );

        emit OrganizationCreated(
              organizationAddress
            , _deployer
            , versionImplementation
        );

        return organizationAddress;
    }
}