// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

interface BadgerSashInterface { 
    function initialize(
          address owner
        , string memory uri
    )
        external;
}