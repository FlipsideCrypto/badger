// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import { BadgerOrganizationInterface } from "./interfaces/BadgerOrganizationInterface.sol";

import { ERC1155Upgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import { ERC1155ReceiverUpgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155ReceiverUpgradeable.sol";
import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";

import { BadgerScout } from "./BadgerScout.sol";

import { IERC1155ReceiverUpgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol";
import { IERC1155Upgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol";
import { IERC721ReceiverUpgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol";

contract BadgerOrganization is 
      BadgerOrganizationInterface
    , ERC1155Upgradeable
    , BadgerScout
{
    using Strings for uint256;
    using Strings for address;

    /// @dev The name of the contract. Optional for ERC-1155. (Good EIP authors :))
    string public name;
    /// @dev The symbol of the contract. Optional for ERC-1155.
    string public symbol;

    /**
     * @notice Allow money to be sent to this contract just in case some organization
     *         has that use case.
     */
    receive() external payable {}

    /**
     * See {BadgerOrganizationInterface-initialize}
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

    /**
     * @notice Returns the metadata URI for a given badge.
     * @param _id The id of the badge to get the metadata URI for.
     * @return The metadata URI for the badge.
     *
     * Requirements:
     * - Badge of `_id` must exist.
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
        if (bytes(badges[_id].uri).length > 0) {
            return badges[_id].uri;
        }
        
        return super.uri(_id);
    }

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
     * See {BadgerOrganizationInterface-leaderMint}
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
     * See {BadgerOrganizationInterface-leaderMintBatch}
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
    {
        require(
            _tos.length == _amounts.length,
            "BadgerOrganization::leaderMintBatch: _tos and _amounts must be the same length."
        );

        /// @dev Mint the badge to all of the recipients with their given amount.
        for (uint256 i = 0; i < _tos.length; i++) {
            _mint(
                _tos[i]
                , _id
                , _amounts[i]
                , _data
            );
        }
    }

    function _verifyFullBatch(
        uint256 _id
    )
        internal
        view
        virtual
    { 
        /// @dev Get the badge.
        Badge storage badge = badges[_id];

        require(
                bytes(badge.uri).length != 0
            , "BadgerOrganization::_verifyFullBatch: Badge does not exist."
        );
        
        /// @dev Only allow the owner or leader to mint the badge.
        require (
                   _msgSender() == owner() 
                || badge.addressIsDelegate[_msgSender()]
            , "BadgerOrganization::_verifyFullBatch: Only leaders can call this."
        );
    }        

    /**
     * @notice Allows the owner and leaders of a contract to batch mint badges.
     * @dev This is an extremely gassy and bad implementation of batch processing 
     *      for Ethereum mainnet. However, because many organizations do not live on ETH
     *      this function enables the user a simpler front-end experience.
     * @dev If you are minting through a custom contract. Recommended usage is 
     *      to use the `mintBatch` function instead by doing 1 Badge at a time.
     * @param _tos The addresses to mint the badge to.
     * @param _ids The id of the badge to revoke.
     * @param _amounts The amount of the badge to revoke.
     *
     * Requirements:
     * - `_froms`, `_ids`, and `_amounts` must be the same length.
     * - `_msgSender` must be the owner or leader of the badge.
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
        for (uint256 i = 0; i < _tos.length; i++) {
            /// @dev Confirm that the token exists and that the caller is a leader.
            _verifyFullBatch(_ids[i]);

            _mint(
                _tos[i]
                , _ids[i]
                , _amounts[i]
                , _data
            );
        }
    }

    /**
     * See {BadgerOrganizationInterface-claimMint}
     */
    function claimMint(
          bytes calldata _signature
        , uint256 _id
        , uint256 _amount
        , bytes memory _data
    ) 
        override
        external
        payable
        virtual
        onlyRealBadge(_id)
    { 
        /// @dev Verify that the signer signed the message permitting a mint of `_id`
        ///      to `_msgSender()` for `_quantity` amount.
        require(
            _verify(
                  _msgSender()
                , _id
                , _amount
                , _data
                , _signature
            ),
            "BadgerOrganization::claimMint: Invalid signature."
        );

        /// @dev Confirm that the payment token is valid.
        PaymentToken memory paymentToken = badges[_id].paymentToken;

        /// @dev Determine that the claimer is providing sufficient funds.
        require(
                 paymentToken.tokenType == TOKEN_TYPE.NATIVE 
              && paymentToken.amount  * _amount == msg.value
            , "BadgerOrganization::claimMint: Incorrect amount of ETH sent."
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
     * See {BadgerOrganizationInterface-revoke}
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
        onlyRealBadge(_id)
    {
        /// @dev Revoke the badge from the user.
        _burn(
              _from
            , _id
            , _amount
        );
    }

    /**
     * See {BadgerOrganizationInterface-revokeBatch}
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
        onlyRealBadge(_id)
    {
        require(
            _froms.length == _amounts.length,
            "BadgerOrganization::revokeBatch: _from and _amounts must be the same length."
        );

        for(
            uint256 i;
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
     * - `_froms`, `_ids`, and `_amounts` must be the same length.
     * - `_msgSender` must be the owner or leader of the badge.
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

        for(
            uint256 i;
            i < _froms.length;
            i++
        ) {
            /// @dev Confirm that the token exists and that the caller is a leader.
            _verifyFullBatch(_ids[i]);

            /// @dev Revoke the badge from the user.
            _burn(
                  _froms[i]
                , _ids[i]
                , _amounts[i]
            );
        }
    }

    /**
     * See {BadgerOrganizationInterface-setDelegates}
     */
    function forfeit(
          uint256 _id
        , uint256 _amount
    )
        override
        external
        virtual
        onlyRealBadge(_id)
    {
        /// @dev Revoke the badge from the user.
        _burn(
              _msgSender()
            , _id
            , _amount
        );
    }

    /**
     * @notice Confirms whether this token is in a state to be a transferred or not.
     * @param _id The id of the token to check. 
     * @param _from The address of the token owner.
     * @param _to The address of the token recipient.
     */
    function _verifyTransfer(
          uint256 _id
        , address _from
        , address _to
    )
        internal
        view
        virtual
    {
        Badge storage badge = badges[_id];

        /// @dev Confirm that the transfer can proceed if the account is not token bound
        ///      or the message sender is a leader of the badge.
        require(
              /// @dev Prevent a normal user from transferring an account bound token.
              ///      While allowing them to transfer if the token is not account bound.
              !badge.accountBound 
              || (
                  /// @dev If the target or source is the internal contract
                  (
                       _to == address(this) 
                    || _from == address(this)
                  )
                  /// @dev If the sender is a leader of the badge.
                  || (
                        _msgSender() == owner() 
                        || badge.addressIsDelegate[_msgSender()]
                     )
              )
            , "BadgerOrganization::safeTransferFrom: Missing the proper transfer permissions."
        );
    }

    /**
     * @notice Allows the owner of a badge to transfer it when it is not account bound however when it is 
     *         account bound it will not allow the transfer unless the sender is a Delegate or the Organization owner.
     * @param _from The address to transfer the badge from.
     * @param _to The address to transfer the badge to.
     * @param _id The id of the badge to transfer.
     * @param _amount The amount of the badge to transfer.
     * @param _data The data to pass to the receiver.
     * 
     * Requirements:
     * - Badge must not be account bound.
     *  OR the target of this token is this contract.
     *  OR the sender is a leader of the badge being transferred.
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
        onlyRealBadge(_id)
    {
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
     * @notice Allows the owner of a badge to transfer it when it is not account bound however when it is
     *        account bound it will not allow the transfer unless the sender is a Delegate or the Organization owner.
     * @param _from The address to transfer the badge from.
     * @param _to The address to transfer the badge to.
     * @param _ids The id of the badge to transfer.
     * @param _amounts The amount of the badge to transfer.
     * @param _data The data to pass to the receiver.
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

    /**
     * @notice Allows seamless payment & minting of a Badge when the full criteria has been met. 
     * @param _from The source of the payment token.
     * @param _id The id of payment token.
     * @param _amount The amount of payment token.
     * @param _data The minting data.
     *
     * Requirements:
     * - `signature` must be a valid signature from the owner of the badge.
     * - token id `badgeId` takes payment in an ERC1155 token.
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
        /// @dev Get the badge id and signature from the data.
        (
              uint256 _badgeId
            , bytes memory signature
        ) = abi.decode(
              _data
            , (
                  uint256
                , bytes
              )
        );

        Badge storage badge = badges[_badgeId];

        /// @dev If the Badge has a signer serving as a gate, verify that the signature is valid.
        if (badge.signer != address(0)) {
            require(
                  _verify(
                        _from
                      , _badgeId
                      , _amount
                      , _data
                      , signature
                  )
                , "BadgerOrganization::onERC1155Received: Invalid signature."
            );
        }

        PaymentToken storage paymentToken = badge.paymentToken;

        /// @dev Confirm that the payment token being supplied is the one expected.
        require(
              _msgSender() == paymentToken.tokenAddress 
            , "BadgerOrganization::onERC1155Received: Invalid payment token."
        );

        /// @dev Confirm that the payment token being supplied is the correct id.
        require(
                paymentToken.id == _id
            , "BadgerOrganization::onERC1155Received: Incorrect payment token."
        );

        /// @dev Use the amount of tokens provided in the receipt to determine how many badges can be minted. 
        uint256 amount = _amount / paymentToken.amount;

        /// @dev Confirm that the payment token being supplied is the correct amount.
        require(
              amount > 0
            , "BadgerOrganization::onERC1155Received: Insufficient payment token."
        );

        /// @dev Mint the badge to the user.
        _mint(
              _from
            , _badgeId
            , _amount
            , _data
        );

        return this.onERC1155Received.selector;
    }    

    /**
     * @notice Prohibits anyone from making a batch transfer of tokens as a payment. This is in place because
     *         doing so would be extremely inefficient gas wise and introduces many significant
     *         holes in the opening and closing of permissions.
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

    function onERC721Received(
          address
        , address
        , uint256
        , bytes memory
    )
        override
        public
        virtual
        returns (
            bytes4
        )
    {
        return this.onERC721Received.selector;
    }

    /**
     * @notice Handles the interface detection for ERC-1155 and the Receiver of ERC-1155s.
     * @param _interfaceId The interface to check.  
     * @return True if the interface is supported.
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
               _interfaceId == type(IERC1155ReceiverUpgradeable).interfaceId 
            || _interfaceId == type(IERC1155Upgradeable).interfaceId
            || _interfaceId == type(IERC721ReceiverUpgradeable).interfaceId
            || super.supportsInterface(_interfaceId)
        );
    }
}
