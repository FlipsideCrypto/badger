// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

interface BadgerOrganizationChainInterface { 
    function chain(
          bytes memory _signature
        , uint256 _id
        , uint256 _amount
        , bytes memory _data
    ) 
        external 
        view 
        returns (
            bool success 
        );
}