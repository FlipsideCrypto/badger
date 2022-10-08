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
     * @notice Creates a new Organization while the subscription model is NOT enabled.
     * 
     * Requirements:
     * - The license model must not be active on the `activeVersion` license defintion.
     */  
    function createOrganization(
          uint256 _version
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
        require(
                   versions[_version].license.tokenAddress == address(0)
                || versionToFundedAmount[_version][msg.sender] >= versions[_version].license.amount
              , "Badger::createOrganization: Subscription mode is enabled." 
        );

        /// @dev Deploy the Organization contract.
        address organization = _createOrganization(
              _version
            , _msgSender()
            , _uri
            , _organizationURI
            , _name
            , _symbol
        );

        return organization;
    }

    /**
     * @notice Creates a new Organization when the license model is enabled and the user has
     *         transfered their license to this contract. The license, is a 
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
        /// @dev Get the version of the Organization contract to be deployed.
        uint256 version = abi.decode(_data, (uint256));

        VersionLicense memory license = versions[version].license;

        /// @dev Confirm the token received is the payment token for the license id being deployed.
        require(
              _msgSender() == license.tokenAddress
            , "Badger::onERC1155Received: Only the license implementation can call this function."
        );

        /// @dev Confirm the token id received is the payment token id for the license id being deployed.
        require(
              _id == license.tokenId
            , "Badger::onERC1155Received: Only the license implementation can call this function."
        );

        /// @dev Fund the deployment of the Organization contract to the account covering the cost of the payment.
        /// @dev This means that if an Organization wants to deploy through a Gnosis Safe, the
        ///      Safe must hold the token and send it to the contract. Alternatively, the Safe
        ///      can permission a delegate at the token level and the allowed sender can process this 
        ///      transaction to send it to. The organization ownership will always go to the account that pays.
        versionToFundedAmount[version][_from] += _amount;

        return this.onERC1155Received.selector;
    }

    /**
     * @notice Allows the Owner to execute an Organization level transaction.
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
        (bool success, bytes memory returnData) = _to.call{value: _value}(_data);
        require(success, string(returnData));
    }
}