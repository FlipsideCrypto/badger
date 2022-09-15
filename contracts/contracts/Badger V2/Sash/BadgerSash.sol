// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import { ERC1155NonFungible } from "../ERC/ERC1155NonFungible.sol";
import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract BadgerSash is
      ERC1155NonFungible
    , Initializable
{ 
    address public badger;

    uint256 totalSupply;

    constructor(
        string memory _uri
    ) 
        ERC1155NonFungible(_uri)
    {}

    function initialize(
        address _badger
    )
        external
        initializer
    { 
        badger = _badger;
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