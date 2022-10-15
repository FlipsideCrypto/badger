// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

/// @dev Core dependencies.
import { BadgerOrganizationInterface } from "./interfaces/BadgerOrganizationInterface.sol";
import { ERC1155Upgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import { BadgerScout } from "./BadgerScout.sol";

/// @dev Helpers.
import { StringsUpgradeable } from "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";
import { ERC1155ReceiverUpgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155ReceiverUpgradeable.sol";
import { IERC20Upgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import { SafeERC20Upgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

/// @dev Supported interfaces.
import { IERC1155Upgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol";
import { IERC1155ReceiverUpgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol";
import { IERC721ReceiverUpgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol";

contract BadgerOrganization is 
      BadgerOrganizationInterface
    , ERC1155Upgradeable
    , BadgerScout
{
    using StringsUpgradeable for uint256;
    using SafeERC20Upgradeable for IERC20Upgradeable;

    /*//////////////////////////////////////////////////////////////
                            INITIALIZATION
    //////////////////////////////////////////////////////////////*/

    /**
     * See {BadgerOrganizationInterface.initialize}
     */
    function initialize(
          address _owner
        , string memory _uri
        , string memory _organizationURI
        , string memory _name
        , string memory _symbol
    )
        external
        initializer
    { 
        /// @dev Set the contract URI.
        _setOrganizationURI(_organizationURI);

        /// @dev Set the name and symbol of the contract.
        name = _name;
        symbol = _symbol;

        /// @dev Initialize the NFT side of the Organization.
        __ERC1155_init(_uri);
        /// @dev Initialize the BadgeScout contract.
        __Ownable_init();
        /// @dev Set ownership of the BadgeScout contract.
        transferOwnership(_owner);
    }

    /*//////////////////////////////////////////////////////////////
                          ORGANIZATION LOGIC
    //////////////////////////////////////////////////////////////*/

    /**
     * See {BadgerOrganizationInterface.leaderMint}
     * 
     * Requirements:
     * - The caller must be a leader of the Organization.
     * - The Badge must exist.
     */    
    function leaderMint(
          address _to
        , uint256 _id
        , uint256 _amount
        , bytes memory _data
    ) 
        override
        external
        virtual
        onlyLeader(_id)
        onlyRealBadge(_id)
    {
        /// @dev Mint the badge to the user.
        _mint(
              _to
            , _id
            , _amount
            , _data
        );
    }

    /**
     * See {BadgerOrganizationInterface.leaderMintBatch}
     * 
     * Requirements:
     * - The caller must be a leader of the Organization.
     * - The Badge must exist.
     * - The arrays must be the same length.
     */
    function leaderMintBatch(
          address[] memory _tos
        , uint256 _id
        , uint256[] memory _amounts
        , bytes memory _data
    )
        override
        external
        virtual
        onlyLeader(_id)
        onlyRealBadge(_id)
    {
        /// @dev Make sure that the supplied arrays are equal in length.
        require(
            _tos.length == _amounts.length,
            "BadgerOrganization::leaderMintBatch: _tos and _amounts must be the same length."
        );

        /// @dev Mint the badge to all of the recipients with their given amount.
        uint256 i;
        for (
            i; 
            i < _tos.length; 
            i++
        ) {
            /// @dev Mint the badges to the users.
            _mint(
                  _tos[i]
                , _id
                , _amounts[i]
                , _data
            );
        }
    }

    /**
     * @notice Allows the owner and leaders of a contract to batch mint badges.
     * @dev This is an extremely gassy and bad implementation of batch processing 
     *      for Ethereum mainnet. However, because many organizations do not live on ETH
     *      this function enables the user a simpler front-end experience.
     * @dev If you are minting through a custom contract. Recommended usage is 
     *      to use the `mintBatch` function instead by doing 1 Badge at a time.
     * @param _tos The addresses to mint the badge to.
     * @param _ids The id of the badge to mint.
     * @param _amounts The amount of the badge to mint.
     *
     * Requirements:
     * - The arrays must be the same length.
     */      
    function leaderMintFullBatch(
          address[] memory _tos
        , uint256[] memory _ids
        , uint256[] memory _amounts
        , bytes memory _data
    )
        external
        virtual
    {
        require(
                 _tos.length == _ids.length 
              && _ids.length == _amounts.length
            , "BadgerOrganization::leaderMintFullBatch: _froms, _ids, and _amounts must be the same length."
        );

        /// @dev Mint the badge to all of the recipients with their given amount.
        uint256 i;
        uint256 id;
        for (
            i; 
            i < _tos.length; 
            i++
        ) {
            id = _ids[i];

            /// @dev Confirm that the token exists and that the caller is a leader.
            _verifyFullBatch(id);

            /// @dev Mint the badges to the users.
            _mint(
                  _tos[i]
                , id
                , _amounts[i]
                , _data
            );
        }
    }

    /**
     * See {BadgerOrganizationInterface-claimMint}
     * 
     * Requirements:
     * - The Badge must exist.
     * - The amount to mint must be greater than zero.
     * - The caller must have a valid signature or the token be claimable.
     */
    function claimMint(
          bytes calldata _signature
        , uint256 _id
        , uint256 _amount       /// @dev Amount of tokens to mint (not spend).
        , bytes memory _data
    ) 
        override
        external
        payable
        virtual
        onlyRealBadge(_id)
    { 
        /// @dev Confirm that the user is trying to mint at least one.
        require(
              _amount > 0
            , "BadgerScout::claimMint: Amount must be greater than 0."
        );

        if(getSigner(_id) != address(0)) {
            /// @dev Verify that the signer signed the message permitting a mint of `_id`
            ///      to `_msgSender()` for `_quantity` amount.
            _verifySignature(
                  _msgSender()
                , _id
                , _amount
                , _data
                , _signature
            );
        } else { 
            /// @dev If the badge does not have a signer, then it is a free min t
            ///      but need to make sure it has been marked as claimable.
            require(
                  getClaimable(_id)
                , "BadgerOragnization::claimMint: This badge is not claimable."
            );
        }

        /// @dev Get the payment object.
        PaymentToken storage paymentToken = badges[_id].paymentToken;

        /// @dev Confirm the user has already funded the correct amount.
        _verifyFunding(
               paymentToken.paymentKey
             , paymentToken.amount * _amount      /// @dev The cost of minting the lot.
        );

        /// @dev Mint the badge to the user.
        _mint(
              _msgSender()
            , _id
            , _amount
            , _data
        );
    }

    /**
     * See {BadgerOrganizationInterface.revoke}
     * 
     * Requirements:
     * - The caller must be a leader of the Organization.
     * - The Badge must exist.
     */    
    function revoke(
          address _from
        , uint256 _id
        , uint256 _amount
    )
        override
        external
        virtual
        onlyLeader(_id)
    {
        /// @dev Revoke the badge from the user.
        _burn(
              _from
            , _id
            , _amount
        );
    }

    /**
     * See {BadgerOrganizationInterface.revokeBatch}
     * 
     * Requirements:
     * - The caller must be a leader of the Organization.
     * - The Badge must exist.
     * - The arrays must be the same length.
     */    
    function revokeBatch(
          address[] memory _froms
        , uint256 _id
        , uint256[] memory _amounts
    )
        override
        external
        virtual
        onlyLeader(_id)
    {
        require(
            _froms.length == _amounts.length,
            "BadgerOrganization::revokeBatch: _from and _amounts must be the same length."
        );

        uint256 i;
        for(
            i;
            i < _froms.length;
            i++
        ) { 
            /// @dev Revoke the badge from the user.
            _burn(
                  _froms[i]
                , _id
                , _amounts[i]
            );
        }
    }

    /**
     * @notice Allows the owner and leaders of a contract to revoke badges from a user.
     * @dev This is an extremely gassy and bad implementation of batch processing 
     *      for Ethereum mainnet. However, because many organizations do not live on ETH
     *      this function enables the user a simpler front-end experience.
     * @dev If you are revoking through a custom contract. Recommended usage is 
     *      to use the `revokeBatch` function instead.
     * @param _froms The addresses to revoke the badge from.
     * @param _ids The id of the badge to revoke.
     * @param _amounts The amount of the badge to revoke.
     *
     * Requirements:
     * - The arrays must be the same length.
     * - The caller must be a leader of the Organization.
     */
    function revokeFullBatch(
          address[] memory _froms
        , uint256[] memory _ids
        , uint256[] memory _amounts
    )
        external
        virtual
    {
        require(
                   _froms.length == _ids.length 
                && _ids.length == _amounts.length
            , "BadgerOrganization::revokeFullBatch: _froms, _ids, and _amounts must be the same length."
        );

        uint256 i;
        Badge storage badge;
        for(
            i;
            i < _froms.length;
            i++
        ) {
            badge = badges[_ids[i]];

             /// @dev Only allow the owner or leader to mint the badge.
            require (
                    _msgSender() == owner() 
                || isDelegate(
                         _ids[i]
                       , _msgSender()
                  )
                , "BadgerOrganization::_verifyFullBatch: Only leaders can call this."
            );

            /// @dev Revoke the badge from the user.
            _burn(
                  _froms[i]
                , _ids[i]
                , _amounts[i]
            );
        }
    }

    /**
     * See {BadgerOrganizationInterface.forfeit}
     */
    function forfeit(
          uint256 _id
        , uint256 _amount
        , bytes memory _data
    )
        override
        external
        virtual
    {
        /// @dev Revoke the badge from the user.
        _burn(
              _msgSender()
            , _id
            , _amount
        );

        emit BadgeForfeited(
              badges[_id]
            , _amount
            , _data
        );
    }

    /*//////////////////////////////////////////////////////////////
                            TOKEN LOGIC
    //////////////////////////////////////////////////////////////*/

    /**
     * See {ERC1155Upgradeable.uri}
     */    
    function uri(
        uint256 _id
    )
        override
        public
        view
        virtual
        returns (
            string memory
        )
    {
        /// @dev Get the URI for the badge.
        string memory _uri = badges[_id].uri;

        /// @dev If a custom URI has been set for this badge, return it.
        if (bytes(_uri).length > 0) {
            return _uri;
        }
        
        /// @dev Use the default base URI with the token id added.
        return super.uri(_id);
    }

    /**
     * See {ERC1155Upgradeable.safeTransferFrom}
     */    
    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _id,
        uint256 _amount,
        bytes memory _data
    )
        override
        public
        virtual
    {
        /// @dev Confirm that the sender has permission to transfer this token.
        _verifyTransfer(
              _id
            , _from
            , _to
        );

        /// @dev Transfer the badge.
        super.safeTransferFrom(
              _from
            , _to
            , _id
            , _amount
            , _data
        );
    }

    /**
     * See {ERC1155Upgradeable.safeBatchTransferFrom}
     */
    function safeBatchTransferFrom(
        address _from,
        address _to,
        uint256[] memory _ids,
        uint256[] memory _amounts,
        bytes memory _data
    )
        override
        public
        virtual
    {
        /// @dev Confirm that the transfer can proceed if the account is not token bound
        ///      or the message sender is a leader of the badge.
        for(
            uint256 i;
            i < _ids.length;
            i++
        ) {
            /// @dev Confirm that the sender has permission to transfer this token.
            _verifyTransfer(
                  _ids[i]
                , _from
                , _to
            );
        }

        /// @dev Transfer the badge.
        super.safeBatchTransferFrom(
              _from
            , _to
            , _ids
            , _amounts
            , _data
        );
    }

    /*//////////////////////////////////////////////////////////////
                            CLAIMABLE LOGIC
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Allow money to be sent to this contract.
     */
    receive() 
        external 
        payable {}

    /**
     * See {BadgerOrganizationInterface.depositETH}
     */
    function depositETH(
        uint256 _id
    )
        override 
        external
        payable
    {
        /// @dev Verify that the badge exists and is ready to mint.
        _verifyBadge(_id);

        /// @dev Verify that the badge is ETH and deposit them.
        _verifyDeposit(
              _id
            , DOLPHIN_ETH
            , 0
            , _msgSender() 
            , msg.value
        );
    }

    /**
     * See {BadgerOrganizationInterface.depositERC20}
     */
    function depositERC20(
          uint256 _id
        , address _token
        , uint256 _amount
    )
        override
        external
    {
        /// @dev Verify that the badge exists and is ready to mint.
        _verifyBadge(_id);

        /// @dev Transfer the ERC20 into this contract.
        IERC20Upgradeable token = IERC20Upgradeable(_token);

        /// @dev Verify that the tokens being sent are as expected and deposit them.
        _verifyDeposit(
              _id
            , _token
            , 0
            , _msgSender()
            , _amount
        );

        /// @dev Transfer the token into this contract.
        token.transferFrom(
              _msgSender()
            , address(this)
            , _amount
        );
    }

    /*
     * @notice This allows an individual to deposit an ERC1155 token into the contract and 
     *      and fund the minting of a badge.
     * @dev If not data provided see {IERC1155ReceiverUpgradeable.onERC1155Received}
     * @param _operator The address which called `safeTransferFrom` function.
     * @param _from The address which previously owned the token.
     * @param _id The ID of the token being transferred.
     * @param _amount The amount of tokens being transferred.
     * @param _data Additional data that contains the badge id to fund.
     */
    function onERC1155Received(
          address
        , address _from
        , uint256 _id
        , uint256 _amount 
        , bytes memory _data
    )
        override
        public
        virtual
        returns (
            bytes4
        )
    {
        /// @dev Return the typical ERC-1155 response if transfer is not intended to be a payment.
        if(bytes(_data).length == 0) {
            return this.onERC1155Received.selector;
        }

        /// @dev Recover the uint256 for badgeId.
        (uint256 badgeId) = abi.decode(
              _data
            , (uint256)
        );

        /// @dev Verify that the badgeId is the same as the id.
        _verifyBadge(badgeId);

        /// @dev Verify that the tokens being sent are as expected and deposit them.
        _verifyDeposit(
              badgeId
            , _msgSender()
            , _id
            , _from
            , _amount
        );

        return this.onERC1155Received.selector;
    }    

    /**
     * See {IERC1155ReceiverUpgradeable.onERC1155BatchReceived}
     */
    function onERC1155BatchReceived(
          address
        , address
        , uint256[] memory
        , uint256[] memory
        , bytes memory
    )
        override
        public
        virtual
        returns (bytes4)
    {
        return this.onERC1155BatchReceived.selector;
    }

    /**
     * @notice This allows an individual to deposit a ERC721 token into the contract and 
     *      and fund the minting of a badge.
     * If not data provided see {IERC721ReceiverUpgradeable.onERC721Received}
     */
    function onERC721Received(
          address 
        , address _from
        , uint256 
        , bytes memory _data
    )
        override
        public
        virtual
        returns (
            bytes4
        )
    {
        /// @dev Return the typical ERC-1155 response if transfer is not intended to be a payment.
        if(bytes(_data).length == 0) {
            return this.onERC721Received.selector;
        }

        /// @dev Recover the uint256 for badgeId.
        (uint256 badgeId) = abi.decode(
              _data
            , (uint256)
        );

        /// @dev Verify that the Badge exists and is ready to mint.
        _verifyBadge(badgeId);

        /// @dev Verify that the tokens being sent are as expected and deposit them.
        _verifyDeposit(
              badgeId 
            , _msgSender()
            , 0
            , _from
            , 1
        );

        return this.onERC721Received.selector;
    }

    /*//////////////////////////////////////////////////////////////
                      EXTERNAL ORGANIZATION LOGIC
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Returns the metadata URI for the organization.
     * @return The metadata URI for the organization.
     */
    function contractURI() 
        public 
        view 
        returns (
            string memory
        ) 
    {
        return organizationURI;
    }

    /**
     * See {IERC165Upgradeable.supportsInterface}
     */
    function supportsInterface(
        bytes4 _interfaceId
    )
        override(
            ERC1155Upgradeable
          , ERC1155ReceiverUpgradeable
        )
        public
        virtual
        view
        returns (
            bool
        )
    {
        return (
               _interfaceId == type(IERC1155Upgradeable).interfaceId 
            || _interfaceId == type(IERC1155ReceiverUpgradeable).interfaceId
            || _interfaceId == type(IERC721ReceiverUpgradeable).interfaceId
            || super.supportsInterface(_interfaceId)
        );
    }
}
