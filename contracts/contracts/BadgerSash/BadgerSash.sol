// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import { BadgerSashInterface } from "./interfaces/BadgerSashInterface.sol";

import { ERC1155Upgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import { ERC1155ReceiverUpgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155ReceiverUpgradeable.sol";

import { BadgerScout } from "./BadgerScout.sol";

contract BadgerSash is 
      BadgerSashInterface
    , ERC1155Upgradeable
    , BadgerScout
{
    /**
     * @notice Allow money to be sent to this contract just in case some organization
     *         has that use case.
     */
    receive() external payable {}

    /**
     * @notice Initialize the Sash with the starting state needed.
     * @param _owner The owner of the Sash. (Ideally a multi-sig).
     * @param _uri The base URI for the Sash.
     */
    function initialize(
          address _owner
        , string memory _uri
    )
        external
        initializer
    { 
        /// @dev Initialize the BadgeScout contract.
        _initialize(_owner);

        /// @dev Initialize the NFT side of the Sash.
        __ERC1155_init(_uri);
    }

    /**
     * @notice Returns the metadata URI for a given badge.
     * @param _id The id of the badge to get the metadata URI for.
     * @return The metadata URI for the badge.
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
        /// @dev If the badge has a custom URI, return that.
        if (bytes(badges[_id].uri).length > 0) {
            return badges[_id].uri;
        } 

        /// @dev Otherwise, return the default URI.
        return string(
            abi.encodePacked(
                  "https://badger.utc24.io/api/?seed="
                , string(
                      abi.encodePacked(
                          address(this)
                        , _id
                      )
                 )
            )
        );
    }

    /**
     * @dev Allows the leader of a badge to mint the badge they are leading.
     * @param _to The address to mint the badge to.
     * @param _id The id of the badge to mint.
     * @param _amount The amount of the badge to mint.
     * @param _data The data to pass to the receiver.
     * 
     * Requirements:
     * - `_msgSender` must be the leader of the badge.
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
        onlySewnBadge(_id)
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
     * @notice Allows a leader of a badge to mint a batch of recipients in a single transaction.
     *         Enabling the ability to seamlessly roll out a new "season" with a single batch
     *         instead of needing hundreds of individual events. Because of this common use case,
     *         the constant is designed around the _id rather than the _to address.
     * @param _tos The addresses to mint the badge to.
     * @param _id The id of the badge to mint.
     * @param _amounts The amounts of the badge to mint.
     * @param _data The data to pass to the receiver.
     */
    function leaderMintBatch(
          address[] memory _tos
        , uint256 _id
        , uint256[] memory _amounts
        , bytes memory _data
    )
        external
        virtual
        onlyLeader(_id)
        onlySewnBadge(_id)
    {
        require(
            _tos.length == _amounts.length,
            "BadgeSash::leaderMintBatch: _tos and _amounts must be the same length."
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

    /**
     * @notice Allows a user to mint a claim that has been designated to them.
     * @dev This function is only used when the mint is being paid with ETH or has no payment at all.
     *      To use this with no payment, the `tokenType` of NATIVE with `quantity` of 0 must be used.
     * @param _signature The signature that is being used to verify the authenticity of claim.
     * @param _id The id of the badge being claimed.
     * @param _quantity The amount of the badge being claimed.
     * @param _data Any data that is being passed to the mint function.
     * 
     * Requirements:
     * - `_id` must corresponding to an existing Badge config.
     * - `_signature` must be a valid signature of the claim.
     */
    function claimMint(
          bytes calldata _signature
        , uint256 _id
        , uint256 _quantity
        , bytes memory _data
    ) 
        override
        external
        payable
        virtual
        onlySewnBadge(_id)
    { 
        /// @dev Verify that the signer signed the message permitting a mint of `_id`
        ///      to `_msgSender()` for `_quantity` amount.
        require(
            _verify(
                  _msgSender()
                , _id
                , _quantity
                , _data
                , _signature
            ),
            "BadgerSash::claimMint: Invalid signature."
        );

        /// @dev Confirm that the payment token is valid.
        PaymentToken memory paymentToken = badges[_id].paymentToken;

        /// @dev Determine that the claimer is providing sufficient funds.
        require(
                 paymentToken.tokenType == TOKEN_TYPE.NATIVE 
              && paymentToken.quantity  * _quantity == msg.value
            , "BadgerSash::claimMint: Incorrect amount of ETH sent."
        );
                
        /// @dev Mint the badge to the user.
        _mint(
              _msgSender()
            , _id
            , _quantity
            , _data
        );
    }

    /**
     * @notice Allows the owner and leader of a contract to revoke a badge from a user.
     * @param _from The address to revoke the badge from.
     * @param _id The id of the badge to revoke.
     * @param _amount The amount of the badge to revoke.
     *
     * Requirements:
     * - `_msgSender` must be the owner or leader of the badge.
     */
    function revoke(
          address _from
        , uint256 _id
        , uint256 _amount
    )
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
     * @notice Allows the owner and leaders of a contract to revoke badges from a user.
     * @param _froms The addresses to revoke the badge from.
     * @param _id The id of the badge to revoke.
     * @param _amounts The amount of the badge to revoke.
     *
     * Requirements:
     * - `_msgSender` must be the owner or leader of the badge.
     */
    function revokeBatch(
          address[] memory _froms
        , uint256 _id
        , uint256[] memory _amounts
    )
        external
        virtual
        onlyLeader(_id)
    {
        require(
            _froms.length == _amounts.length,
            "BadgeSash::revokeBatch: _from and _amounts must be the same length."
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
     * @notice Allows the owner of a badge to forfeit their ownership.
     * @param _id The id of the badge to forfeit.
     * @param _amount The amount of the badge to forfeit.
     */
    function forfeit(
          uint256 _id
        , uint256 _amount
    )
        external
        virtual
    {
        /// @dev Revoke the badge from the user.
        _burn(
              _msgSender()
            , _id
            , _amount
        );
    }

    /**
     * @notice Allows the owner of a badge to transfer it when it is not account bound however when it is 
     *         account bound it will not allow the transfer unless the sender is a Leader or the Sash owner.
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
    {
        /// @dev Confirm that the transfer can proceed if the account is not token bound
        ///      or the message sender is a leader of the badge.
        require(
              /// @dev Prevent a normal user from transferring an account bound token.
              ///      While allowing them to transfer if the token is not account bound.
              !badges[_id].accountBound 
              || (
                  /// @dev If the target or source is the internal contract
                  (
                       _to == address(this) 
                    || _from == address(this)
                  )
                  /// @dev If the sender is a leader of the badge.
                  || (
                        _msgSender() == owner() 
                        || badges[_id].addressIsLeader[_msgSender()]
                     )
              )
            , "BadgeSash::safeTransferFrom: Missing the proper transfer permissions."
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
     * @notice Prohibits anyone from making a batch transfer of tokens. This is in place because
     *         doing so would be extremely inefficient gas wise and introduces many significant
     *         holes in the opening and closing of permissions.
     * @dev This prohibition does not prevent batch minting.
     */
    function safeBatchTransferFrom(
          address
        , address 
        , uint256[] memory 
        , uint256[] memory 
        , bytes memory 
    )
        override
        public
        virtual
    {
        revert("BadgeSash::safeBatchTransferFrom: Batch transfers are not supported.");
    }

    /**
     * @notice Allows seamless payment & minting of a Badge when the full criteria has been met. 
     * @param _from The source of the payment token.
     * @param _id The id of payment token.
     * @param _amount The amount of payment token.
     * @param _data The minting data.
     *
     * Requirements:
     * - `badgeId
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
              uint256 badgeId
            , bytes memory signature
        ) = abi.decode(
              _data
            , (
                  uint256
                , bytes
              )
        );

        Badge storage badge = badges[badgeId];

        /// @dev If the Badge has a signer, verify that the signature is valid.
        if (badge.signer != address(0)) {
            require(
                  _verify(
                        _from
                      , badgeId
                      , _amount
                      , _data
                      , signature
                  )
                , "BadgeSash::onERC1155Received: Invalid signature."
            );
        }

        /// @dev If the badge is account bound, add the user to the list of leaders.
        PaymentToken storage paymentToken = badge.paymentToken;

        /// @dev Handle the Payment Token if there is one. Native token would be handled
        ///      through `claimMint`.
        if (paymentToken.quantity != 0) { 
            /// @dev Confirm that the payment token being supplied is the one expected.
            require(
                  paymentToken.tokenAddress == _msgSender()
                , "BadgeSash::onERC1155Received: Invalid payment token."
            );

            ///  @dev Confirm that the payment token being supplied is the correct amount.
            require(
                  paymentToken.tokenId == _id
                , "BadgeSash::onERC1155Received: Incorrect payment token."
            );

            /// @dev Confirm that the payment token being supplied is the correct amount.
            require(
                  paymentToken.quantity <= _amount
                , "BadgeSash::onERC1155Received: Insufficient payment token."
            );
        }

        /// @dev Mint the badge to the user.
        _mint(
              _from
            , badgeId
            , _amount
            , ""
        );

        return this.onERC1155Received.selector;
    }    

    /**
     * @notice Prohibits anyone from making a batch transfer of tokens. This is in place because
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
        require(
              _msgSender() == address(this)
            , "BadgeSash::onERC1155BatchReceived: Only BadgeSash can receive tokens."
        );

        return this.onERC1155BatchReceived.selector;
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
        return super.supportsInterface(_interfaceId);
    }
}
