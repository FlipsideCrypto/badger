// SPDX-License-Identifier: MIT OR Apache-2.0

pragma solidity ^0.8.16;
pragma experimental ABIEncoderV2;

/// @dev Core dependencies.
import { BadgerSenderPayMasterInterface } from "./interfaces/BadgerSenderPayMasterInterface.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { BasePaymaster, GsnTypes } from "@opengsn/contracts/src/BasePaymaster.sol";

/// @dev Helpers.
import { IERC1155 } from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import { IForwarder } from "@opengsn/contracts/src/forwarder/IForwarder.sol";

contract BadgerSenderPayMaster is 
      BadgerSenderPayMasterInterface
    , Ownable
    , BasePaymaster 
{
    /*//////////////////////////////////////////////////////////////
                                 STATE
    //////////////////////////////////////////////////////////////*/

    mapping(uint256 => Badge) public badges;

    /*//////////////////////////////////////////////////////////////
                              CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor(
          address _badgeToken
        , uint256 _badgeId
        , uint256 _badgeAmount
        , uint256 _badgeSubsidyBPS
    ) {
        _setBadge(
              0
            , _badgeToken
            , _badgeId
            , _badgeAmount
            , _badgeSubsidyBPS
        );
    }

    /*//////////////////////////////////////////////////////////////
                                SETTERS
    //////////////////////////////////////////////////////////////*/

    /**
     * See {BadgerSenderPayMasterInterface.setBadge}
     *
     * Requirements:
     * - Caller must be the owner of the contract.
     */
    function setBadge(
          uint256 _index
        , uint256 _id
        , address _token
        , uint256 _amount
        , uint256 _subsidyBPS
    ) 
        override
        external 
        onlyOwner
    {
        _setBadge(
              _index
            , _token
            , _id
            , _amount
            , _subsidyBPS
        );
    }

    /*//////////////////////////////////////////////////////////////
                                GETTERS
    //////////////////////////////////////////////////////////////*/

    function versionPaymaster()
        external
        view
        virtual
        returns (string memory)
    {
        return "3.0.0-beta.2+opengsn";
    }

    /*//////////////////////////////////////////////////////////////
                            INTERNAL SETTERS
    //////////////////////////////////////////////////////////////*/

    /**
     * See {BadgerSenderPayMasterInterface.setBadge}
     */
    function _setBadge(
          uint256 _index
        , address _token
        , uint256 _id
        , uint256 _amount
        , uint256 _subsidyBPS
    ) 
        internal 
    {
        badges[_index] = Badge({
            token: _token,
            id: _id,
            amount: _amount,
            subsidyBPS: _subsidyBPS
        });
    }
    
    /**
     * @notice Called by the relay hub to validate if this paymaster is willing to pay for a relayed call.
     * @param relayRequest All the information about the request and relayed call providing the ability 
     *                     to verify the relayed call's signature and senders badge balance.
     * @return context to be passed to preRelayedCall and postRelayedCall
     * @return revertOnRecipientRevert if true, the relayed call will be reverted if the recipient reverted.
     */
    function _preRelayedCall(
          GsnTypes.RelayRequest calldata relayRequest
        , bytes calldata 
        , bytes calldata 
        , uint256
    )
        override
        internal
        virtual
        returns (
              bytes memory context
            , bool revertOnRecipientRevert
        )
    {
        /// @dev Recover the payer and verification badge index in the PayMaster from the request data.
        (
              address payer
            , uint256 badgeIndex
            , 
        ) = abi.decode(
            relayRequest.request.data,
            (
                  address
                , uint256
                , uint256
            )
        );

        /// @dev Get the badge definition in the paymaster.
        Badge storage badge = badges[badgeIndex];

        /// @dev Check that the sender holds the proper balance.
        uint256 badgeBalance = IERC1155(badge.token).balanceOf(
              payer
            , badge.id
        );

        /// @dev Enforce the badge balance.
        require(
               badgeBalance >= badge.amount
            , "BadgerPayMaster::_preRelayedCall: lacking sufficient credentials."
        );

        /// @dev Return the payer and badge index in the context.
        return (
              abi.encode(
                  payer
                , badgeIndex
            )
            , true
        );
    }

    /**
     * @notice Allows for inline processing after the relay has called the transaction.
     * @dev Called after the relayed call. This method is not called if the relayed call reverted.
     */
    function _postRelayedCall(
          bytes calldata
        , bool
        , uint256
        , GsnTypes.RelayData calldata
    ) 
        override 
        internal 
        virtual 
    { 
        /// @dev Nothing to do here.
    }
}