// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import { BadgerVersions } from "./BadgerVersions.sol";

/**
 * @title  Badger 
 * @author masonchain & nftchance
 * @notice A contract that allows users to mint Badger Organizations with a permissionless system
 *         that has two operating states. Free to use, and license based. The license
 *         operates through the purchasing of an ERC1155 token that is then sent to this contract
 *         to as a form of payment. 
 */
contract Badger is 
    BadgerVersions
{ 
    constructor(
        address _implementation
    ) 
        BadgerVersions(_implementation) 
    {}

    /**
     * @notice Creates a new Organization while confirming that the proper funding has been provided.
     * @param _version The version of the Organization that is being created.
     * @param _deployer The address that will be the deployer of the Organization.
     * @param _uri The base URI for the token metadata.
     * @param _organizationURI The metadata of the Organization. (contractURI)
     * @param _name The name of the Organization.
     * @param _symbol The symbol of the Organization.
     * 
     * Requirements:
     * - The license requirements must be met.
     */  
    function createOrganization(
          uint256 _version
        , address _deployer
        , string memory _uri
        , string memory _organizationURI
        , string memory _name
        , string memory _symbol
    ) 
        external
        virtual
        returns (
            address
        )
    { 
        /// @dev Determine the license schema associated with the version being used.
        VersionLicense memory license = versions[_version].license;

        /// @dev Get the hashed version key to track the funding of the msg sender.
        string memory versionKey = getVersionKey(
              _version
            , _msgSender()
            , license
        );

        /// @dev Allow Organization creation if the version is free or if the sender
        ///     has funded the version an amount larger than the required amount.
        require(
                   license.tokenAddress == address(0)
                || versionToFundedAmount[versionKey] / license.amount >= 1
              , "Badger::createOrganization: License requirements not met." 
        );

        /// @dev Deploy the Organization contract for the deployer chosen.
        /// @notice This enables the ability for other contracts to call this function 
        ///         as well as inner-organization network from other protocols.
        /// @notice This means to deploy an Organization, a protocol would hook into 
        ///         this function and then deploy the Organization contract. This also means
        ///         that a exogenous protocol could be offering third-party extensions of 
        ///         Badger through a sub-licensing system.
        address organization = _createOrganization(
              _version
            , license
            , versionKey
            , _deployer
            , _uri
            , _organizationURI
            , _name
            , _symbol
        );

        return organization;
    }

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
        /// @dev Recover the boolean of whether or not this deposit is being used for payment
        ///      as well as the uint256 of the version being used.
        (
              bool isPayment
            , uint256 version
        ) = abi.decode(_data, (bool, uint256));

        /// @dev Allow the normal depositing of the token while enabling the ability 
        ///      to have a payment system.
        if(isPayment) { 
            /// @dev Get the license schema associated with the version being funded.
            VersionLicense memory license = versions[version].license;

            /// @dev Confirm the token received is the payment token for the version being funded.
            require(
                _msgSender() == license.tokenAddress
                , "Badger::onERC1155Received: Invalid license token."
            );

            /// @dev Confirm the token id received is the payment token id for the license id being deployed.
            require(
                _id == license.tokenId
                , "Badger::onERC1155Received: Invalid license token."
            );

            /// @dev Get the hashed version key to track the funding of the funder.
            string memory versionKey = getVersionKey(
                  version
                , _from
                , license
            );

            /// @dev Fund the deployment of the Organization contract to 
            ///      the account covering the cost of the payment (not the transaction sender).
            versionKeyToFunded[versionKey] += _amount;
        }

        /// @dev Return the ERC1155 success response.
        return this.onERC1155Received.selector;
    }

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
}