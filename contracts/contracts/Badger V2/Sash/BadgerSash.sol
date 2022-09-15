// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import { ERC1155 } from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract BadgerSash is
      ERC1155
    , Initializable
{ 
    struct Badge { 
        bool permanent;
        string uri;
        uint256 maxSupply;
        uint256 totalSupply;
        uint256 maxPerSash;
    }

    /// @dev Keep track of who the absolute leader is.
    address public leader;

    Badge[] public badges;

    constructor(
        string memory _uri
    ) 
        ERC1155(_uri)
    {
        
    }


    modifier onlyLeader() {
        require(msg.sender == leader, "Only leader can mint");
        _;
    }

    function initialize(
        address _leader
    )
        external
        initializer
    { 
        leader = _leader;
    }

    function sewBadge(
          Badge calldata _badge
        , uint256 _badgeId
    )
        public
        virtual
        onlyLeader()
    {
        require(
              _msgSender() == leader
            , "BadgerSash::sewBadge: Only the leader can sew badges."
        );

        Badge storage badge = badges[_badgeId];

        /// @dev Confirm that the badge id being sewn is valid.
        require(
              !badge.permanent || 
              badge.totalSupply + badge.maxSupply == 0
            , "BadgerSash::sewBadge: Badge already exists."
        );

        /// @dev Send the badge off to the press!        
        badges[_badgeId] = _badge;
    }

    function mint(
          uint256 _badgeId
        , address _to
        , uint256 _amount
        , bytes memory _data
    ) 
        public
        virtual
    {
        Badge storage badge = badges[_badgeId];

        // TODO: Import from toolbox Dynamic Qualifers

        _mint(
            _to,
            _badgeId,
            _amount,
            _data 
        );
    }

    function burn(
        uint256[] memory ids,
        uint256[] memory amounts
    )
        public
        virtual
    {
        
    }
}