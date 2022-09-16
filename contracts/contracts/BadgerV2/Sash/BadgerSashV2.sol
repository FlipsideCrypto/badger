// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import { ERC1155 } from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import "hardhat/console.sol";

contract BadgerSashV2 is
      ERC1155
    , Initializable
{ 
    enum QUALIFIER_TYPE {
          NATIVE
        , ERC20
        , ERC1155
    }

    struct Qualifier { 
        uint256 badgeId;
        uint32 amount;
    }

    struct Badge { 
        bool permanent;
        uint32 maxSupply;
        uint32 totalSupply;
        uint32 maxPerSash;
        string uri;
        Qualifier[] qualifiers;
    }

    /// @dev Keep track of who the absolute leader is.
    address public leader;

    /// @dev The badges that this Sash is responsible for holding.
    mapping(uint256 => Badge) public badges;

    error BadgesAreBound();

    constructor(
        string memory _uri
    ) 
        ERC1155(_uri)
    { }

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

    /**
     * @notice Allows a leader to sew a badge with the needed information.
     * @param _badge The configuration details of the Badge.
     * @param _badgeId The ID of the badge to be sewn.
     */
    function sewBadge(
          Badge calldata _badge
        , uint256 _badgeId
        , address[] calldata _recipients
        , uint256[] calldata _amounts
        , bytes calldata _data
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

        /// @dev Mint the badges to the recipients if provided at the time of sewing.
        for(
            uint256 i;
            i < _recipients.length;
            i++
        ) { 
            _mint(
                  _recipients[i]
                , _badgeId
                , _amounts[i]
                , _data
            );
        }
    }

    function mint(
          uint256 _leadingBadgeId
        , uint256 _badgeId
        , address _to
        , uint256 _amount
        , bytes memory _data
    ) 
        public
        virtual
    {
        Badge storage badge = badges[_badgeId];

        require(
              badge.maxSupply != 0
            , "BadgerSash::mint: Badge does not exist."
        );

        _mint(
            _to,
            _badgeId,
            _amount,
            _data
        );
    }

    function uri(
        uint256 _badgeId 
    )
        override
        public
        view
        virtual
        returns (
            string memory
        )
    {
        return badges[_badgeId].uri;
    }
}