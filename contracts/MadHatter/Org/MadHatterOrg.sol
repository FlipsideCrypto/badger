// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";

import "@openzeppelin/contracts/utils/Strings.sol";

contract MadHatterOrg is 
      Initializable
    , OwnableUpgradeable
    , ERC1155Upgradeable 
{
    using Strings for uint256;

    bytes4 private constant CONTRACT_URI_INTERFACE_ID = 0xe8a3d485;

    string public contractURIHash;

    struct Badge {
        string title;
        string imageHash;
    }

    // Allows for multiple addresses to have the master permissions to distribute and revoke tokens.
    mapping(address => bool) public admins;

    mapping(uint256 => Badge) public badges;

    error AdminOnly();
    error IssuersOnly();

    error BadgeExists();
    error BadgeDoesNotExist();
    error BadgesAreBoundToAddress();

    modifier onlyAdmins() {
        if (!admins[_msgSender()]) revert AdminOnly();
        _;
    }

    function initialize(
          string memory _baseURI        // ipfs hash
        , string memory _contractURI    // ipfs hash
        , Badge[] memory _badges
    ) 
        public
        virtual
        initializer
    {
        __ERC1155_init(_baseURI);

        contractURIHash = _contractURI;

        admins[_msgSender()] = true;

        for(
            uint256 i;
            i < _badges.length;
            i++
        ) {
            badges[i] = _badges[i];
        }
    }

    function burnBadge(
        uint256 _badgeId
    ) 
        public
        virtual
    {
        _burn(
              _msgSender()
            , _badgeId
            , balanceOf(_msgSender(), _badgeId)
        );
    }
    /*///////////////////////////////////////////////////
                    ADMIN CONTROLS
    ///////////////////////////////////////////////////*/
    function createBadgeType(
          uint256 _badgeId
        , string calldata _title
        , string calldata _imageHash
    ) 
        public
        virtual
        onlyAdmins()
    {
        if(bytes(badges[_badgeId].title).length != 0) revert BadgeExists();

        badges[_badgeId] = Badge(
              _title
            , _imageHash
        );
    }

    function updateBadgeType(
          uint256 _badgeId
        , string calldata _title
        , string calldata _imageHash
    ) 
        public
        virtual
        onlyAdmins()
    {
        badges[_badgeId] = Badge(
              _title
            , _imageHash
        );
    }

    function mintBadge(
          uint256 _badgeId
        , address _to
    )
        public
        virtual
        onlyAdmins()
    {
        if(bytes(badges[_badgeId].title).length != 0) revert BadgeDoesNotExist();

        _mint(
              _to
            , _badgeId
            , 1
            , ""
        );
    }

    function revokeBadge(
          uint256 _badgeId
        , address _from
    ) 
        public
        virtual
        onlyAdmins()
    {
        _burn(
              _from
            , _badgeId
            , balanceOf(_from, _badgeId)
        );
    }

    function updateAdminRole(
          address _address
        , bool _isAdmin
    )
        public
        virtual
        onlyOwner()
    {
        admins[_address] = _isAdmin;
    }

    /*///////////////////////////////////////////////////
                    TOKEN METADATA
    ///////////////////////////////////////////////////*/
    function uri(
        uint256 _tokenId
    )
        override
        public
        virtual
        view
        returns (
            string memory tokenURI
        )

    {

    }

    /*///////////////////////////////////////////////////
                    CONTRACT METADATA
    ///////////////////////////////////////////////////*/
    function setContractURI(
        string memory _contractURIHash
    )
        public
        onlyOwner()
    { 
        contractURIHash = _contractURIHash;
    }

    /**
     * @notice Returns the accesible url of the contract level metadata
     */
    function contractURI() 
        public 
        view 
        returns (
            string memory
        ) 
    {
        return string(
            abi.encodePacked(
                  "ipfs://"
                , contractURIHash
            )
        );
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        override
        public
        virtual
        view
        returns (
            bool
        )
    {
        return
               interfaceId == CONTRACT_URI_INTERFACE_ID
            || super.supportsInterface(interfaceId);
    }

    /*///////////////////////////////////////////////////
                ACCOUNT BOUND LOGIC
    ///////////////////////////////////////////////////*/

    function setApprovalForAll(
          address operator
        , bool approved
    ) 
        override
        public
        virtual
    {
        revert BadgesAreBoundToAddress();
    }

    function isApprovedForAll(
          address account
        , address operator
    ) 
        override
        public 
        view 
        virtual 
        returns (
            bool
        ) 
    {
        return false;
    }

    function safeTransferFrom(
          address from
        , address to
        , uint256 id
        , uint256 amount
        , bytes memory data
    ) 
        public 
        virtual 
        override 
    {
        _validateTransferability(from, to);
        super.safeTransferFrom(
              from
            , to
            , id
            , amount
            , data
        );
    }

    function safeBatchTransferFrom(
          address from
        , address to
        , uint256[] memory ids
        , uint256[] memory amounts
        , bytes memory data
    ) 
        public 
        virtual 
        override 
    {
        _validateTransferability(from, to);
        super.safeBatchTransferFrom(
              from
            , to
            , ids
            , amounts
            , data
        );
    }

    function _validateTransferability(
          address _from
        , address _to
    )
        internal
        view
    {
        if (
            !admins[_from]
            && _from != address(0)
            && _to != address(0)
        ) revert BadgesAreBoundToAddress();
    }
}