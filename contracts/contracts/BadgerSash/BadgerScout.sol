// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol"; 
import { ERC1155HolderUpgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155HolderUpgradeable.sol";
import { ERC1155ReceiverUpgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155ReceiverUpgradeable.sol";

import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import { IERC1155 } from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

contract BadgerScout is 
      Initializable 
    , OwnableUpgradeable
    , ERC1155HolderUpgradeable 
{ 
    using ECDSA for bytes32;
    
    /// @dev The types of tokens that are accepted as payment.
    enum TOKEN_TYPE { 
          NATIVE
        , ERC1155
    }

    /// @dev The structure of a Payment Token.
    struct PaymentToken { 
        TOKEN_TYPE tokenType;
        address tokenAddress;
        uint256 tokenId;
        uint256 quantity;
    }

    /// @dev The processing information for this token.
    struct Badge { 
        bool accountBound;
        address signer;
        string uri;
        PaymentToken paymentToken;
        mapping(address => bool) addressIsLeader;
    }

    /// @dev Mapping from token ID to badge
    mapping(uint256 => Badge) public badges;

    /**
     * @notice Initialize the Sash with the starting state needed.
     * @param _owner The owner of the Sash. (Ideally a multi-sig).
     */
    function _initialize(
        address _owner
    )
        internal
        initializer
    { 
        /// @dev Initialize the ownership structure of this Sash.
        __Ownable_init();
        transferOwnership(_owner);
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
     * @notice Create a badge in the sash.
     * @param _id The id of the badge being created.
     * @param _accountBound Whether or not the badge is account bound.
     * @param _signer The address of the signer.
     * @param _uri The URI for the badge.
     * @param _paymentToken The payment token for the badge.
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
        , PaymentToken memory _paymentToken
        , address[] memory _leaders
    )
        external
        virtual
        onlyOwner()
    {
        Badge storage badge = badges[_id];

        require(
              bytes(badge.uri).length == 0
            , "BadgeSash::setBadge: Badge already exists."
        );

        /// @dev Set the state variables of the Badge.
        badge.accountBound = _accountBound;
        badge.signer = _signer;
        badge.uri = _uri;
        badge.paymentToken = _paymentToken;

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
     * 
     * Requirements:
     * - `_msgSender()` must be a leader of the Badge.
     * - `_id` must corresponding to an existing Badge config.
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
     * @notice Set the payment for a specific badge id.
     * @param _id The id of the badge being accessed.
     * @param _paymentToken The payment token for the badge.
     * 
     * Requirements:
     * - `_msgSender()` must be a leader of the Badge.
     * - `_id` must corresponding to an existing Badge config.
     */
    function setPaymentToken(
          uint256 _id
        , PaymentToken memory _paymentToken
    )
        external
        virtual
        onlyLeader(_id)
        onlySewnBadge(_id)
    {
        badges[_id].paymentToken = _paymentToken;
    }

    /**
     * @notice Allow the owner of the organization to control the leaders of the Badge.
     * @param _id The id of the badge.
     * @param _leaders The address of the leader that we are updating the status of.
     * @param _isLeader The status of the leaders being updated.
     * 
     * Requirements:
     * - Only the owner of the contract can call this function.
     * - `_id` must corresponding to an existing Badge config.
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
     * @notice Allow the owner of the organization to control the leaders of multiple badges in one transaction.
     * @dev This functionality is not exposed through the Dashboard UI however you can call this function directly.
     * @param _ids The ids of the badges.
     * @param _leaders The address of the leader that we are updating the status of.
     * @param _isLeader The status of the leaders being updated.
     * 
     * Requirements:
     * - Only the owner of the contract can call this function.
     * - `_id` must corresponding to an existing Badge config.
     */
    function setLeadersBatch(
          uint256[] calldata _ids
        , address[] calldata _leaders
        , bool[] calldata _isLeader
    )
        external
        virtual
        onlyOwner()
    {
        require(
                   _ids.length == _leaders.length 
                && _leaders.length == _isLeader.length
            , "BadgeSash::revokeFullBatch: _froms, _ids, and _amounts must be the same length."
        );

        /// @dev Loop through the leaders and update their status.        
        for (
            uint256 i; 
            i < _ids.length; 
            i++
        ) {
            /// @dev Make sure that this badge exists
            require(
                  bytes(badges[_ids[i]].uri).length != 0
                , "BadgeSash::setLeadersBatch: Badge does not exist."
            );

            badges[_ids[i]].addressIsLeader[_leaders[i]] = _isLeader[i];
        }
    }

    /**
     * @notice Allow anyone to see the leaders of the Badge.
     * @param _id The id of the badge.
     * @return The leaders of the badge.
     * 
     * Requirements:
     * - `_id` must corresponding to an existing Badge config.
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

    /**
     * @notice Allows the owner of a Sash to withdraw any 1155s that it has generated. 
     * @param _token The address of the token to withdraw.
     * @param _to The address to send the tokens to.
     * @param _id The id of the token to withdraw.
     * @param _amount The amount of the token to withdraw.
     */
    function withdrawERC1155(
          address _token
        , address _to
        , uint256 _id
        , uint256 _amount
    )
        external
        virtual
        onlyOwner()
    {
        IERC1155(_token).safeTransferFrom(
              address(this)
            , _to
            , _id
            , _amount
            , ""
        );
    }
}