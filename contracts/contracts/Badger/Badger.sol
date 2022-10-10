// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

/// @dev Core dependencies.
import { BadgerInterface } from "./interfaces/BadgerInterface.sol";
import { BadgerVersions } from "./BadgerVersions.sol";

import "hardhat/console.sol";

/**
 * @title  Badger 
 * @author nftchance & masonchain
 * @notice Today in the vast majority of Web3 there is a vast amount of "locks" that 
 *         determine if someone has access to perform an action however there are very 
 *         few ways to acquire the "keys" to the locks. Badger solves this by digitalizing 
 *         centralized organization management while maintaing the full capacity to cover 
 *         the more generalized and decentralized use-cases through time.
 */
contract Badger is 
      BadgerInterface
    , BadgerVersions
{ 
    /*//////////////////////////////////////////////////////////////
                               CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor(
        address _implementation
    ) 
        BadgerVersions(_implementation) 
    {}

    /*//////////////////////////////////////////////////////////////
                            PROTOCOL LOGIC
    //////////////////////////////////////////////////////////////*/

    /**
     * See {BadgerInterface.createOrganization}.
     *
     * Requirements:
     * - All requirements have been forgone in this function to enable the functionality 
     *   of an individual extending the `BadgerOrganization` or `BadgerScout` contracts
     *   while still maintaing the ability to have the official Badger front-end detect
     *   the deployment and allow the user to interact with the organization without
     *   needing to spin up their own front-end.
     * - This means that if someone does not have all the functionality they need or want,
     *   they can deploy a parent contract that extends the `BadgerOrganization` or
     *  `BadgerScout` contracts and then deploy their own version of the `Badger` contract
     *   that points to their own implementation and then deploy through this function.
     */  
    function createOrganization(
          address _implementation
        , address _deployer
        , string memory _uri
        , string memory _organizationURI
        , string memory _name
        , string memory _symbol
    ) 
        override
        public
        virtual
        returns (
            address
        )
    { 
        /// @dev Load the version.
        Version memory version = versions[_implementation];

        /// @dev Get the users license key to determine how much funding has been provided.
        /// @notice Can deploy for someone but must have the cost covered themselves.
        bytes32 licenseKey = getLicenseKey(
              version.licenseKey
            , _msgSender()
        );

        /// @dev Deploy the Organization contract for the deployer chosen.
        /// @notice This enables the ability for other contracts to call this function 
        ///         as well as inner-organization network from other protocols.
        /// @notice This means to deploy an Organization, a protocol would hook into 
        ///         this function and then deploy the Organization contract. This also means
        ///         that a exogenous protocol could be offering third-party extensions of 
        ///         Badger through a sub-licensing system.
        address organization = _createOrganization(
              _implementation
            , licenseKey
            , version.amount
            , _deployer
            , _uri
            , _organizationURI
            , _name
            , _symbol
        );

        return organization;
    }

    /*//////////////////////////////////////////////////////////////
                            RECEIVABLE LOGIC
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Funds a new Organization when the license model is enabled and 
     *         the user has transfered their license to this contract. The license, is a 
     *         lifetime license.
     * @param _from The address of the account who owns the created Organization.
     * @return Selector response of the license token successful transfer.
     */
    function onERC1155Received(
          address 
        , address _from
        , uint256 _id
        , uint256 _amount
        , bytes memory _data
    ) 
        override 
        public 
        returns (
            bytes4
        ) 
    {
        /// @dev Return the typical ERC-1155 response if transfer is not intended to be a payment.
        if(bytes(_data).length == 0) {
            return this.onERC1155Received.selector;
        }
        
        /// @dev Recover the implementation address from `_data`.
        address implementation = abi.decode(
              _data
            , (address)
        );

        /// @dev Confirm that the token being transferred is the one expected.
        require(
              keccak256(
                  abi.encodePacked(
                        _msgSender()
                      , _id 
                  )
              ) == versions[implementation].licenseKey
            , "Badger::onERC1155Received: Invalid license key."
        );

        /// @dev Get the version license key to track the funding of the msg sender.
        bytes32 licenseKey = getLicenseKey(
              versions[implementation].licenseKey
            , _from
        );

        /// @dev Fund the deployment of the Organization contract to 
        ///      the account covering the cost of the payment (not the transaction sender).
        versionKeyToFunded[licenseKey] += _amount;

        /// @dev Return the ERC1155 success response.
        return this.onERC1155Received.selector;
    }

    /*//////////////////////////////////////////////////////////////
                         EXTERNAL PROTOCOL LOGIC
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Allows protocol Governors to execute protocol level transaction.
     * @dev This enables the ability to execute pre-built transfers without having to 
     *      explicitly define what tokens this contract can receive.
     * @param _to The address to execute the transaction on.
     * @param _data The data to pass to the receiver.
     * @param _value The amount of ETH to send with the transaction.
     */
    function execTransaction(
          address _to
        , bytes calldata _data
        , uint256 _value
    )
        external
        virtual
        payable
        onlyOwner
    {
        /// @dev Make the call.
        (
              bool success
            , bytes memory returnData
        ) = _to.call{value: _value}(_data);

        /// @dev Force that the transfer/transaction emits a successful response. 
        require(
              success
            , string(returnData)
        );
    }

    /**
     * @notice Signals to external callers that this is a Badger contract.
     * @param _interfaceId The interface ID to check.
     * @return True if the interface ID is supported.
     */
    function supportsInterface(
        bytes4 _interfaceId
    ) 
        override
        public
        view
        returns (
            bool
        ) 
    {
        return (
               _interfaceId == type(BadgerInterface).interfaceId
            || super.supportsInterface(_interfaceId)
        );
    }
}