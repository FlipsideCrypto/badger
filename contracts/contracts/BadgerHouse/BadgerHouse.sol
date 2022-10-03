// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import { BadgerVersions } from "./BadgerVersions.sol";

/**
 * @title  Badger House
 * @author masonchain & nftchance
 * @notice A contract that allows users to mint Badger Sash NFTs with a permissionless system
 *         that has two operating states. Free to use, and subscription based. The subscription
 *         operates through the purchasing of an ERC1155 token that is then sent to this contract
 *         to as a form of permanent staking. 
 */
contract BadgerHouse is 
    BadgerVersions
{ 
    constructor(
        address _implementation
    ) 
        BadgerVersions(_implementation) 
    {}

    /**
     * @notice Creates a new Sash act whie while the subscription model is NOT enabled.
     * 
     * Requirements:
     * - The subscription model must not be active.
     */
    function createSashPress(string memory _uri) 
        external
        virtual
        returns (address)
    { 
        require(
                versions[activeVersion].license.tokenAddress == address(0)
              , "BadgerHouse::createSashPress: Subscription mode is enabled." 
        );

        /// @dev Deploy the Sash contract.
        address sash = _createSashPress(
              activeVersion
            , _msgSender()
            , _uri
        );

        return sash;
    }

    /**
     * @notice Creates a new Sash when the subscription model is enabled and the user has
     *         transfer their subscription token to this contract. The subscription, is a lifetime
     *         subscription.
     * @param _from The address of the account who owns the created Organization.
     * @return Selector response of the subscription token successful transfer.
     */
    function onERC1155Received(
          address 
        , address _from
        , uint256 
        , uint256 
        , bytes memory _data 
    ) 
        override 
        public 
        returns (bytes4) 
    {
        /// @dev Get the version of the Sash contract to be deployed.
        uint256 version = abi.decode(_data, (uint256));

        /// @dev Confirm the token received is the payment token for the license id being deployed.
        require(
              _msgSender() == versions[version].license.tokenAddress
            , "BadgerHouse::onERC1155Received: Only the subscription implementation can call this function."
        );

        /// @dev Deploy the Sash contract.
        _createSashPress(
              version
            , _from
            , ""
        );

        return this.onERC1155Received.selector;
    }
}