// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

interface BadgerSashInterface { 
    function initialize(
          address owner
        , string memory uri
    )
        external;

    function leaderMint(
          address to
        , uint256 tokenId
        , uint256 quantity
        , bytes memory data
    )
        external;

    function leaderMintBatch(
          address[] memory tos
        , uint256 id
        , uint256[] memory quantities
        , bytes memory data
    )
        external;

    function claimMint(
          bytes calldata _signature
        , uint256 tokenId
        , uint256 quantity
        , bytes memory data
    )
        external
        payable;

    function revoke(
          address from
        , uint256 tokenId
        , uint256 quantity
    )
        external;

    function revokeBatch(
          address[] memory froms
        , uint256 id
        , uint256[] memory quantities
    )
        external;

    function forfeit(
          uint256 tokenId
        , uint256 quantity
    )
        external;
}