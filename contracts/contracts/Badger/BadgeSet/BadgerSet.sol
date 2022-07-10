// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import { ERC1155Upgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";
import { Base64 } from "../Base64.sol";


/**
 * @title Badgem V1: On Chain Credential Issuer and Membership Manager
 * @author @masonthechain and @nftchance 
 * @dev Implementation of ERC1155 Token Standard with account bound ownership and
 *      role based management of tokens to allow organizations to frictionlessly 
 *      document roles, rewards, and accomplishments of their members with an on-chain 
 *      token requiring minimal setup and upkeep. Badger lets a community manager 
 *      or DAO operators designate their community on chain and to utilize other 
 *      products such as guild.xyz to token gate spaces for their members.
 * @dev Badger utilizies EIP-1167 Minimal Proxies to allow the organization users
 *      to clone the base Badger V1 contract and delegate function calls to that
 *      pre-deployed base contract in order to vastly reduce the cost and complexity 
 *      of getting a contract deployed when a drastically custom solution is not needed.
 * @dev This implementation is considered V1 as there are more use cases that will inevitably 
 *      appear in the future, such as optimizing for Ethereum mainnet, altering the base ERC1155, 
 *      having vote governance for admin functions, or allowing various collection management 
 *      permissions from non-admin promoted accounts. However, V1 is to be put in the hands of 
 *      organizations currently desiring this functionality with no current alternative and to 
 *      get feedback how this tokenized management could be adapted to other use cases.
 */

contract BadgerSet is 
      Initializable
    , OwnableUpgradeable
    , ERC1155Upgradeable 
{
    using Strings for uint256;

    // Interface ID to allow interfacing with the contract metadata.
    bytes4 private constant CONTRACT_URI_INTERFACE_ID = 0xe8a3d485;

    /// @dev IPFS Hash containing contract metadata
    string public contractURIHash;

    /// @dev Description of the organization and the usage of their Badges.
    string private collectionDescription;

    /// @dev Allows for multiple addresses to have the master permissions to distribute and revoke tokens.
    mapping(address => bool) public admins;

    /// @dev Mapping of the tokenId of each Badge type to the Badge struct metadata info.
    mapping(uint256 => Badge) public badges;

    /// @dev Struct storing each each token's metadata and image reference.
    struct Badge {
        string title;
        string description;
        string imageHash;
    }

    error AdminOnly();
    error BadgeExists();
    error BadgeDoesNotExist();
    error BadgesAreBoundToAddress();
    error BundleLengthsInvalid();

    /// @dev Equivalent of constructors for Minimal Proxy cloning.
    function initialize(
          string memory _baseURI        // ipfs hash
        , string memory _contractURI    // ipfs hash
        , string memory _collectionDescription
    ) 
        public
        virtual
        initializer
    {
        __ERC1155_init(_baseURI);

        contractURIHash = _contractURI;
        collectionDescription = _collectionDescription;
        admins[_msgSender()] = true;
    }

    /// @dev Prevents actions by non-admin addresses.
    modifier onlyAdmins() {
        if (!admins[_msgSender()]) revert AdminOnly();
        _;
    }

    /// @dev Prevents actions on non-existing badge types.
    modifier onlyExistingBadges(uint256 _badgeId) {
        if(bytes(badges[_badgeId].title).length == 0) revert BadgeDoesNotExist();
        _;
    }

    /**
     *  @notice Allows Badge holders the option to forfeit their badge via burning.
     *          Tokens are account bound and non-transferrable to non-admin accounts
     *          with the exception of this function. If you wish to forfeit your earned
     *          badge of your own accord, this is the function to call.
     *  @param  _badgeId The token ID of the badge to forfeit and burn.
     * Requires:
     *  - Sender must have at least one of the param badge type.
     */
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
    /**
     *  @notice Allows an admin to create a new Badge type and initialize
     *          the title of the badge and the associated token image.
     *  @param  _badgeId The token ID to be used for the new Badge.
     *  @param  _title The name of the badge.
     *  @param  _imageHash The IPFS hash for the token image.
     *
     * Requires:
     *  - Caller to be an admin of this collection.
     *  - The badgeId to not already be in use.
     */
    function createBadgeType(
          uint256 _badgeId
        , string calldata _title
        , string calldata _description
        , string calldata _imageHash
    ) 
        public
        virtual
        onlyAdmins()
    {
        if(bytes(badges[_badgeId].title).length != 0) revert BadgeExists();

        badges[_badgeId] = Badge(
              _title
            , _description
            , _imageHash
        );
    }

    /**
     *  @notice Allows an admin to create a multiple new Badge types 
     *  and initialize the titles and token images.
     *  @param  _badgeIds The token IDs to be used for the new Badges.
     *  @param  _badges The Badge information to be initialized.
     *
     * Requires:
     *  - Caller to be an admin of this collection.
     *  - The badgeIds to not already be in use.
     */
    function createBadgeTypeBundle(
          uint256[] calldata _badgeIds
        , Badge[] calldata _badges
    ) 
        public
        virtual
        onlyAdmins()
    {

        if(_badgeIds.length != _badges.length) revert BundleLengthsInvalid();

        for(
            uint256 i;
            i < _badgeIds.length;
            i++
        ) {
            uint256 _badgeId = _badgeIds[i];

            if(bytes(badges[_badgeId].title).length != 0) revert BadgeExists();

            badges[_badgeId] = _badges[i];
        }
    }

    /**
     *  @notice Allows an admin to update the title or image of an
     *          already initialized badge.
     *  @notice This will change the metadata for all current holders.
     *  @param  _badgeId The token ID of the Badge to be updated.
     *  @param  _title The new name of the badge.
     *  @param  _imageHash The new IPFS hash for the token image.
     *
     * Requires:
     *  - Caller to be an admin of this collection.
     */

    function updateBadgeType(
          uint256 _badgeId
        , string calldata _title
        , string calldata _description
        , string calldata _imageHash
    ) 
        public
        virtual
        onlyAdmins()
    {
        badges[_badgeId] = Badge(
              _title
            , _description
            , _imageHash
        );
    }

    /**
     *  @notice Allows an admin to mint and issue a Badge to an address.
     *  @param  _to The address to award the badge to.
     *  @param  _badgeId The token ID of the Badge to be awarded.
     *
     * Requires:
     *  - Caller to be an admin of this collection.
     *  - The Badge ID to have been initialized with createBadgeType()
     */
    function mintBadge(
          address _to
        , uint256 _badgeId
    )
        public
        virtual
        onlyAdmins()
        onlyExistingBadges(_badgeId)
    {
        _mint(
              _to
            , _badgeId
            , 1
            , ""
        );
    }

    /**
     *  @notice Allows an admin to mint and issue multiple Badge to various addresses.
     *  @param  _addresses The addresses to award badges to.
     *  @param  _badgeIds The token IDs of the Badge to be awarded.
     *
     * Requires:
     *  - Caller to be an admin of this collection.
     *  - The Badge ID to have been initialized with createBadgeType()
     */
    function mintBadgeBundle(
          address[] calldata _addresses
        , uint256[] calldata _badgeIds
    )
        public
        virtual
        onlyAdmins()
    {
        if(_badgeIds.length != _addresses.length) revert BundleLengthsInvalid();

        for(
            uint256 i; 
            i < _addresses.length; 
            i++
        ) {
            uint256 _badgeId = _badgeIds[i];
            if(bytes(badges[_badgeId].title).length == 0) revert BadgeDoesNotExist();

            _mint(
                  _addresses[i]
                , _badgeId
                , 1
                , ""
            );
        }
    }

    /**
     *  @notice Allows an admin to revoke a Badge and burn it from a holder.
     *  @notice This is not intended to be used for achievement based badges,
     *          however we implemented this function to allow the use case
     *          for organizations that use the ownership of these badgets
     *          to curate their members for various use cases such as queryable
     *          data or on-chain payments.
     *  @param  _from The address to revoke the Badge from.
     *  @param  _badgeId The token ID of the Badge to be awarded.
     *
     * Requires:
     *  - Caller to be an admin of this collection.
     *  - The from address to currently own one or more of this Badge type.
     */
    function revokeBadge(
          address _from
        , uint256 _badgeId
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

    /**
     *  @notice Allows the owner of the contract to add more admins that can create,
     *          issue, update, or revoke Badges.
     *  @param  _address The address to be added or removed as an admin.
     *  @param  _isAdmin True if address is to be added as an admin, false to remove.
     *
     * Requires:
     *  - Caller to be the owner of the contract.
     */
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

    /*//////////////////////////////////////////////////////////
                        TOKEN METADATA
    //////////////////////////////////////////////////////////*/
    function badgeImage(
        uint256 _badgeId
    )
        public
        virtual
        view
        onlyExistingBadges(_badgeId)
        returns (
            string memory imageString
        )
    {
        imageString = string(
            abi.encodePacked(
                  "ipfs://"
                , badges[_badgeId].imageHash
            )
        );

        return imageString;
    }

    /**
     * @notice Generates the on-chain metadata for each Badge.
     * @param  _badgeId The id of the token to get the traits data for.
     * @return traitString encoded json in the form of a string detailing the 
     *         retrieved badge traits.
     * 
     * Requires:
     * - Badge ID must exist
     */
    function badgeTraits(
        uint256 _badgeId
    )
        public
        virtual
        view
        onlyExistingBadges(_badgeId)
        returns (
            string memory traitString
        )
    {
        traitString = string(
            abi.encodePacked(
                  '{"trait_type":"Badge Title","value":"'
                , badges[_badgeId].title
                , '"}'
            )
        );

        return traitString;
    }

    /**
     * @notice Generates the on-chain metadata for each Badge.
     * @param  _badgeId The id of the token to get the uri data for.
     * @return badgeURI encoded json in the form of a string detailing the 
     *         retrieved badge.
     * 
     * Requires:
     * - Badge ID must exist
     */
    function uri(
        uint256 _badgeId
    )
        override
        public
        virtual
        view
        onlyExistingBadges(_badgeId)
        returns (
            string memory badgeURI
        )
    {
        Badge memory _badge = badges[_badgeId];
        
        // Build the metadata string and return it as encoded data
        badgeURI = string(
            abi.encodePacked(
                  "data:application/json;base64,"
                , Base64.encode(
                    bytes(  
                        abi.encodePacked(
                              '{"name":"'
                            , _badge.title
                            , '","description":"'
                            , _badge.description
                            , collectionDescription
                            , '","image":"'
                            , badgeImage(_badgeId)
                            , '","attributes":['
                            , badgeTraits(_badgeId)
                            , ']}'
                        )
                    )
                )
            )
        );
    }

    /*//////////////////////////////////////////////////////////
                        CONTRACT METADATA
    //////////////////////////////////////////////////////////*/
    /**
     * @notice Allows each contract clone to have metadata of its own.
     *         Specifically useful for a description and avatar for the
     *         Badge collection when viewed on popular marketplaces or
     *         other wallet viewing sites.
     * @param _contractURIHash The IPFS hash containing the contract 
     *                         metadata.
     * 
     * Requires:
     * - Caller to be the owner of the contract.
     */
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

    /**
     * @dev See {IERC165-supportsInterface}.
     * @dev CONTRACT_URI_INTERFACE_ID enables contractURI usage.
     */
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

    /*//////////////////////////////////////////////////////////
                        ACCOUNT BOUND LOGIC
    //////////////////////////////////////////////////////////*/

    /**
     * @notice This function will revert everytime, as all Badger Badges
     *         are intended to be account bound in all cases except revokation
     *         by a community admin.
     */
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

    /**
     * @notice This function will return true only for operation by a community admin, 
     *         as all Badger Badges are intended to be account bound wit the exception
     *         of admin management.
     * @notice For more information on this design choice see { revokeBadge() }.
     */
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
        if(admins[operator]) return true;
        return false;
    }

    /**
     * @notice All transfers are disabled for account bound tokens
     *         with the exception of the burnBadge() and revokeBadge()
     *         functions for a holder and an admin respectively.
     */
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
        revert BadgesAreBoundToAddress();
    }

    /**
     * @notice All transfers are disabled for account bound tokens
     *         with the exception of the burnBadge() and revokeBadge()
     *         functions for a holder and an admin respectively.
     */
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
        revert BadgesAreBoundToAddress();
    }
}