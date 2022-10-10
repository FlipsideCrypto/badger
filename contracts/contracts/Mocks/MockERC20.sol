// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockERC20 is
    ERC20
{
    constructor(
        string memory _name,
        string memory _symbol
    )
        ERC20(_name, _symbol)
    { }

    function mint(
        address _to,
        uint256 _amount
    )
        external
    {
        _mint(
            _to,
            _amount
        );
    }
}