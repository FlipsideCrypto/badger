// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import { ERC1155 } from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract BadgerSash is
      ERC1155
    , Initializable
{ 
    address public leader;

    uint256 totalSupply;

    constructor(
        string memory _uri
    ) 
        ERC1155(_uri)
    {}

    function initialize(
        address _leader
    )
        external
        initializer
    { 
        leader = _leader;
    }

    /**
     * @notice Enables the minting of a sash within an organization.
     */
    function mint() 
        external 
    {
        _mint(
              _msgSender()
            , totalSupply++
            , 1
            , "0x"
        );

        
    }

    function burn(
        uint256[] memory ids,
        uint256[] memory amounts
    )
        external
    {
        // Heirarchy stuff
    }
}