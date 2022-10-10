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
import { IERC1155ReceiverUpgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol";

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
    mapping(address => Version) public versions;

    /// @dev Tracking the organizations that one has funded the cost for.
    mapping(bytes32 => uint256) public versionKeyToFunded;

    /*//////////////////////////////////////////////////////////////
                                 EVENTS
    //////////////////////////////////////////////////////////////*/

    /// @dev Announces when a Version configuration is updated through the protocol Factory.
    event VersionUpdated(
          address indexed implementation
        , Version indexed version
    );

    /// @dev Announces when a new Organization is created through the protocol Factory.
    event OrganizationCreated(
        address indexed organization,
        address indexed owner,
        address indexed implementation
    );

    /*//////////////////////////////////////////////////////////////
                               CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor(
        address _implementation
    ) {
        /// @dev Initialize the foundational version of Badger.
        _setVersion(
              _implementation
            , _msgSender()
            , keccak256(
                  abi.encodePacked(
                      address(0)
                      , uint256(0)
                  )
              )
            , 0
            , false
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
     * - If the caller is not the owner, cannot set a Payment Token as they cannot withdraw.
     */    
    function setVersion(
          address _implementation
        , address _owner
        , address _tokenAddress
        , uint256 _tokenId
        , uint256 _amount
        , bool _locked
    ) 
        override
        public
        virtual
    {
        /// @dev Load the existing Version object.
        Version memory version = versions[_implementation];

        /// @dev Prevent editing of a version once it has been locked.
        require(
              !version.locked
            , "BadgerVersions::_setVersion: Cannot update a locked version."
        );

        /// @dev Only the owner can set the version.
        require(
                 version.owner == address(0)
              || version.owner == _msgSender()
            , "BadgerVersions::_setVersion: You do not have permission to edit this version."
        );

        /// @dev Make sure that no exogenous version controllers can set a payment
        ///      as there is not a mechanism for them to withdraw.
        if(_msgSender() != owner()) {
            require(
                     _tokenAddress == address(0)
                  && _tokenId == 0
                  && _amount == 0
                , "BadgerVersions::_setVersion: You do not have permission to set a payment token."
            );
        }

        /// @dev Set the version configuration.
        _setVersion(
              _implementation
            , _owner
            , keccak256(
                  abi.encodePacked(
                        _tokenAddress
                      , _tokenId
                  )
              )
            , _amount
            , _locked
        );
    }

    /*//////////////////////////////////////////////////////////////
                                GETTERS
    //////////////////////////////////////////////////////////////*/

    /**
     * See {BadgerVersionsInterface.getVersionKey}
     */    
    function getVersionKey(
        address _implementation 
    ) 
        override
        public 
        view 
        virtual
        returns (
            bytes32
        ) 
    {
        return versions[_implementation].licenseKey;
    }

    /**
     * See {BadgerVersionsInterface.getLicenseKey}
     */
    function getLicenseKey(
          bytes32 _versionKey
        , address _sender
    )
        override
        public
        pure
        returns (
            bytes32
        )
    {
        return keccak256(
            abi.encodePacked(
                  _versionKey
                , _sender
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
          address _implementation
        , address _owner
        , bytes32 _licenseKey
        , uint256 _amount
        , bool _locked
    ) 
        internal
    {
        /// @dev Set the version configuration.
        versions[_implementation] = Version({
              owner: _owner
            , licenseKey: _licenseKey
            , amount: _amount
            , locked: _locked
        });

        /// @dev Announce that the version has been updated to index it on the front-end.
        emit VersionUpdated(
              _implementation
            , versions[_implementation]
        );
    }

    /**
     * @notice Creates a new Organization to be led by the deploying address.
     * @param _implementation The address of the implementation to be used.
     * @param _licenseKey The license key of the individual processing the Organization creation.
     * @param _versionCost The cost of deploying the version.
     * @param _deployer The address that will be the deployer of the Organizatoin contract.
     * @param _uri The base URI used for the metadata of tokens.
     * @param _organizationURI The metadata of the Organization.
     * @param _name The name of the Organization.
     * @param _symbol The symbol of the Organization.
     * @dev The Organization contract is created using the Organization implementation contract.
     */
    function _createOrganization(
          address _implementation
        , bytes32 _licenseKey
        , uint256 _versionCost
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
        /// @dev Deduct the amount of payment that is needed to cover deployment of this version.
        /// @notice This will revert if an individual has not funded it with at least the needed amount
        ///         to cover the cost of the version.
        /// @dev If deploying a free version or using an exogenous contract, the cost will be 
        ///      zero and proceed normally.
        versionKeyToFunded[_licenseKey] -=  _versionCost;

        /// @dev Get the address of the target.
        address organizationAddress = _implementation.clone();

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
        
        /// @dev Announce the creation of the Organization.
        emit OrganizationCreated(
              organizationAddress
            , _deployer
            , _implementation
        );

        return organizationAddress;
    }

    /**
     * @notice Signals to external callers that this is a BadgerVersions contract.
     * @param _interfaceId The interface ID to check.
     * @return True if the interface ID is supported.
     */
    function supportsInterface(
        bytes4 _interfaceId
    ) 
        override
        public 
        view 
        virtual
        returns (
            bool
        ) 
    {
        return (
               _interfaceId == type(BadgerVersionsInterface).interfaceId
            || _interfaceId == type(IERC1155ReceiverUpgradeable).interfaceId
        );
    }
}