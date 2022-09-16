// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol"; 
import { ERC1155Upgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import { ERC1155HolderUpgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155HolderUpgradeable.sol";
import { ERC1155ReceiverUpgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155ReceiverUpgradeable.sol";

import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import "hardhat/console.sol";

contract BadgerSash is 
      Initializable 
    , OwnableUpgradeable
    , ERC1155Upgradeable
    , ERC1155HolderUpgradeable 
{
    using ECDSA for bytes32;
    
    /// @dev The processing information for this token.
    struct Badge { 
        bool accountBound;
        address signer;
        string uri;
        uint256 price;
        mapping(address => bool) addressIsLeader;
    }

    /// @dev Mapping from token ID to badge
    mapping(uint256 => Badge) public badges;

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
        /// @dev Initialize the ownership structure of this Sash.
        __Ownable_init();
        transferOwnership(_owner);
        
        /// @dev Initialize the NFT side of the Sash.
        __ERC1155_init(_uri);
    }

    /**
     * @notice Make sure that only owner or the leader of a badge passes.
     * @param _id The id of the badge being accessed.
     */
    modifier onlyLeader(
        uint256 _id
    ) {
        require (
            _msgSender() == owner() ||
            badges[_id].addressIsLeader[_msgSender()],
            "BadgeSash::onlyLeader: Only leaders can call this."
        );
        _;
    }

    /**
     * @notice Make sure that actions can only be performed on badges that exist.
     */    
    modifier onlySewnBadge(
        uint256 _id
    ) { 
        require (
            badges[_id].signer != address(0),
            "BadgeSash::onlySewnSash: Only sewn sashes can call this."
        );
        _;
    }

    /**
     * @notice Returns the metadata URI for a given badge.
     * @param _id The id of the badge to get the metadata URI for.
     * @return The metadata URI for the badge.
     */    
    function uri(
        uint256 _id
    )
        public
        view
        virtual
        override
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
     * @notice Create a badge in the sash.
     * @param _id The id of the badge being created.
     * @param _accountBound Whether or not the badge is account bound.
     * @param _signer The address of the signer.
     * @param _uri The URI for the badge.
     * @param _price The price of the badge.
     * @param _leaders The addresses of the leaders.
     * 
     * Requirements:
     * - `_id` must not already exist.
     */
    function setBadge(
          uint256 _id
        , bool _accountBound
        , address _signer
        , string memory _uri
        , uint256 _price
        , address[] memory _leaders
    )
        external
        virtual
        onlyOwner()
    {
        Badge storage badge = badges[_id];

        require(
            badge.signer == address(0),
            "BadgeSash::setBadge: Badge already exists."
        );

        /// @dev Set the state variables of the Badge.
        badge.accountBound = _accountBound;
        badge.signer = _signer;
        badge.uri = _uri;
        badge.price = _price;

        for (
            uint256 i; 
            i < _leaders.length; 
            i++
        ) {
            badge.addressIsLeader[_leaders[i]] = true;
        }
    }

    /**
     * @notice Set the signer for the contract.
     * @param _signer The address of the signer.
     */
    function setSigner(
          uint256 _id
        , address _signer
    )
        external
        virtual
        onlyLeader(_id)
        onlySewnBadge(_id)
    {
        badges[_id].signer = _signer;
    }

    /**
     * @notice Allow the owner of the organization to control the leaders of the Badge.
     * @param _id The id of the badge.
     * @param _leaders The address of the leader that we are updating the status of.
     * @param _isLeader The status of the leaders being updated.
     * 
     * Requirements:
     * - Only the owner of the contract can call this function.
     */
    function setLeaders(
          uint256 _id
        , address[] calldata _leaders
        , bool[] calldata _isLeader
    )
        external
        virtual
        onlyOwner()
        onlySewnBadge(_id)
    {
        require(
              _leaders.length == _isLeader.length
            , "BadgeSash::setLeaders: Leaders and isLeader arrays must be the same length."
        );

        /// @dev Loop through the leaders and update their status.        
        for (
            uint256 i; 
            i < _leaders.length; 
            i++
        ) {
            badges[_id].addressIsLeader[_leaders[i]] = _isLeader[i];
        }
    }

    /**
     * @notice Allow anyone to see the leaders of the Badge.
     * @param _id The id of the badge.
     * @return The leaders of the badge.
     */
    function isLeader(
          uint256 _id
        , address _leader
    )
        external
        view
        virtual
        onlySewnBadge(_id)
        returns (
            bool
        )
    {
        return badges[_id].addressIsLeader[_leader];
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
     * @notice Allows a sash to define a signer that will enable the claiming of a badge.
     * @param _to The address to mint the badge to.
     * @param _id The id of the badge to mint.
     * @param _amount The amount of the badge to mint.
     * @param _data The data to pass to the receiver.
     * @param _signature The signature of the signer.
     * @return true if signer of the signature was the signer that gives permission to mint.
     */
    function _verify(
        address _to,
        uint256 _id,
        uint256 _amount,
        bytes memory _data,
        bytes memory _signature
    )
        internal
        view
        returns (
            bool
        )
    {
        /// @dev Compile the message that would have been signed.
        bytes32 message = keccak256(
            abi.encodePacked(
                  _to
                , _id
                , _amount
                , _data
            )
        );

        /// @dev Recover the signer from the signature.
        return message.toEthSignedMessageHash().recover(_signature) == badges[_id].signer;
    }

    /**
     * @notice Allows a user to mint a claim that has been designated to them.
     * @param _signature The signature that is being used to verify the authenticity of claim.
     * @param _id The id of the badge being claimed.
     * @param _quantity The amount of the badge being claimed.
     * @param _data Any data that is being passed to the mint function.
     * 
     * Requirements:
     * - `_signature` must be a valid signature of the claim.
     */
    function claimMint(
          bytes calldata _signature
        , uint256 _id
        , uint256 _quantity
        , bytes memory _data
    ) 
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

        /// @dev Determine that the claimer is providing sufficient funds.
        require(
              badges[_id].price * _quantity == msg.value
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
     * @param _from The addresses to revoke the badge from.
     * @param _ids The id of the badge to revoke.
     * @param _amounts The amount of the badge to revoke.
     *
     * Requirements:
     * - `_msgSender` must be the owner or leader of the badge.
     */
    function revokeBatch(
          address _from
        , uint256[] memory _ids
        , uint256[] memory _amounts
    )
        external
        virtual
        onlyLeader(_ids[0])
    {
        _burnBatch(
              _from
            , _ids
            , _amounts
        );
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
              !badges[_id].accountBound 
              || _to == address(this)
              || (
                    _msgSender() == owner() 
                    || badges[_id].addressIsLeader[_msgSender()]
                )
            , "BadgeSash::safeTransferFrom: Account bound badges cannot be transferred by anyone but Leaders."
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
        returns (bytes4)
    {
        require(
              _msgSender() == address(this)
            , "BadgeSash::onERC1155Received: Only BadgeSash can receive tokens."
        );

        /// @dev Get the badge id and signature from the data.
        (
              uint256 badgeId
            , bytes memory signature
        ) = abi.decode(_data, (uint256, bytes));

        /// @dev If the Badge has a signer, verify that the signature is valid.
        if (badges[badgeId].signer != address(0)) {
            require(
                _verify(
                      _from
                    , badgeId
                    , _amount
                    , _data
                    , signature
                ),
                "BadgeSash::onERC1155Received: Invalid signature."
            );
        }

        // TODO: Implement the use of payment tokens and checking if the payment token for the target badge is the one being sent
        // TODO: Mint the token.

        return this.onERC1155Received.selector;
    }    

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
     * @notice Allows the owner of a Sash to withdraw funds that it has generated.
     * 
     * Requirements:
     * - `_msgSender` must be the owner of the Sash.
     */
    function withdrawETH()
        external
        virtual
        onlyOwner()
    {
        (bool success, ) = owner().call{value: address(this).balance}("");

        require(
              success
            , "BadgeSash::withdrawETH: Failed to withdraw ETH."
        );
    }

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
        returns (bool)
    {
        return super.supportsInterface(_interfaceId);
    }
}
