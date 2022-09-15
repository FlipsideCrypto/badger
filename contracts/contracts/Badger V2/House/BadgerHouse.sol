// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ERC1155Holder } from "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";

import { BadgerSashInterface } from "../Sash/interfaces/BadgerSashInterface.sol";
import { IERC1155 } from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

import { Clones } from "@openzeppelin/contracts/proxy/Clones.sol";

/**
 * @title Badger House
 * @author masonchain & nftchance
 * @notice A contract that allows users to mint Badger Sash NFTs with a permissionless system
 *         that has two operating states. Free to use, and subscription based. The subscription
 *         operates through the purchasing of an ERC1155 token that is then sent to this contract
 *         to as a form of permanent staking. 
 */
contract BadgerHouse is 
      Ownable
    , ERC1155Holder
{ 
    using Clones for address;

    /// @dev The sash contract that is being used for current deployments.
    BadgerSashInterface public sashImplementation;

    /// @dev The contract that is being used as the Subscription implementation.
    IERC1155 public subscriptionImplementation;

    bool subscriptionEnabled = false;

    constructor(
        address _sashImplementation
    ) {
        _setSashImplementation(_sashImplementation);
    }

    /**
     * @notice Stores and controls which contract is used when creating new Sashs.
     * @param _sashImplementation The address of the Sash implementation.
     */
    function _setSashImplementation(
        address _sashImplementation
    ) 
        internal 
    {
        sashImplementation = BadgerSashInterface(_sashImplementation);
    }

    /**
     * See {BadgerHouse._setSashImplementation}
     * 
     * Requirements:
     * - The caller must be the owner.
     */    
    function setSashImplementation(
        address _sashImplementation
    ) 
        public 
        onlyOwner()
    {
        _setSashImplementation(_sashImplementation);
    }    

    /**
     * @notice Sets the subscription implementation which allows the Badger protocol to
     *         exit growth mode and enable the subscription feature.
     *
     * Requirements:
     * - The caller must be the owner.
     */
    function setSubscriptionImplementation(
        address _subscriptionImplementation
    ) 
        public 
        onlyOwner()
    {
        subscriptionImplementation = IERC1155(_subscriptionImplementation);
    }

    /**
     * @notice Creates a new Sash contract to be led by the deploying address.
     * @param _deployer The address that will be the deployer of the Sash contract.
     * @dev The Sash contract is created using the Sash implementation contract.
     */
    function _createSashPress(
        address _deployer
    )
        internal
    {
        /// @dev Get the address of the target.
        address sashAddress = address(sashImplementation).clone();

        /// @dev Interface with the newly created contract to initialize it. 
        BadgerSashInterface sash = BadgerSashInterface(sashAddress);

        /// @dev Deploy the clone contract to serve as the Press for the Sash and it's badges.
        sash.initialize(_deployer);
    }

    /**
     * @notice Creates a new Sash act whie while the subscription model is NOT enabled.
     * 
     * Requirements:
     * - The subscription model must not be active.
     */
    function createSashPress() 
        external
        virtual
    { 
        require(
                address(subscriptionImplementation) == address(0)
              , "BadgerHouse::createSashPress: Subscription mode is enabled." 
        );

        /// @dev Deploy the Sash contract.
        _createSashPress(_msgSender());
    }

    /**
     * @notice Creates a new Sash when the subscription model is enabled and the user has
     *         transfer their subscription token to this contract. The subscription, is a lifetime
     *         subscription.
     * @param _operator The address of the operator who is creating the Sash.
     * @return Selector response of the subscription token successful transfer.
     */
    function onERC1155Received(
          address _operator
        , address 
        , uint256 
        , uint256 
        , bytes memory 
    ) 
        override 
        public 
        returns (bytes4) 
    {
        require(
              _msgSender() == address(subscriptionImplementation)
            , "BadgerHouse::onERC1155Received: Only the subscription implementation can call this function."
        );

        /// @dev Deploy the Sash contract.
        _createSashPress(
            _operator
        );

        return this.onERC1155Received.selector;
    }
}