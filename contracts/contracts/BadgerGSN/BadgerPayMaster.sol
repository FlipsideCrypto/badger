// SPDX-License-Identifier: MIT OR Apache-2.0

pragma solidity ^0.8.16;
pragma experimental ABIEncoderV2;

import { BasePaymaster, GsnTypes } from "@opengsn/contracts/src/BasePaymaster.sol";
import { IForwarder } from "@opengsn/contracts/src/forwarder/IForwarder.sol";

contract BadgerPayMaster is BasePaymaster {
    address public currentPayer;

    mapping(address => uint256) balances;

    function versionPaymaster()
        override
        external
        view
        virtual
        returns (string memory)
    {
        return "3.0.0-beta.2+opengsn";
    }

    function _preRelayedCall(
          GsnTypes.RelayRequest calldata relayRequest
        , bytes calldata signature
        , bytes calldata approvalData
        , uint256 maxPossibleGas
    )
        override
        internal
        virtual
        returns (
              bytes memory context
            , bool revertOnRecipientRevert
        )
    {
        (
            address payer, , 
        ) = abi.decode(
            relayRequest.request.data,
            (
                  address
                , uint256
                , uint256
            )
        );

        require(
               balances[payer] >= maxPossibleGas
            , "BadgerPayMaster::_preRelayedCall: not enough balance."
        );
        
        currentPayer = payer;

        (signature, approvalData);
        return ("", true);
    }

    function _postRelayedCall(
          bytes calldata context
        , bool success
        , uint256 gasUseWithoutPost
        , GsnTypes.RelayData calldata relayData
    ) 
        override 
        internal 
        virtual 
    {
        balances[currentPayer] -= gasUseWithoutPost;
        (context, success, relayData);
    }

    function deposit() 
        public 
        payable 
    {
        relayHub.depositFor{value: msg.value}(address(this));
        balances[msg.sender] += msg.value;
    }

    function refund() 
        public 
    {
        uint256 toRefund = balances[msg.sender];
        balances[msg.sender] = 0;
        
        withdrawRelayHubDepositTo(
              toRefund
            , payable(msg.sender)
        );
    }
}