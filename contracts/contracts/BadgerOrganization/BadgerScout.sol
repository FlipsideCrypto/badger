// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol"; 
import { ERC1155HolderUpgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155HolderUpgradeable.sol";
import { ERC1155ReceiverUpgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155ReceiverUpgradeable.sol";

import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import { IERC1155 } from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

contract BadgerScout is 
      OwnableUpgradeable
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
        uint256 id;
        uint256 amount;
    }

    /// @dev The processing information for this token.
    struct Badge { 
        bool accountBound;
        address signer;
        string uri;
        PaymentToken paymentToken;
        mapping(address => bool) addressIsDelegate;
    }

    /// @dev Mapping from token ID to badge
    mapping(uint256 => Badge) public badges;

    /**
     * @notice Make sure that only owner or the leader of a badge passes.
     * @param _id The id of the badge being accessed.
     */
    modifier onlyLeader(
        uint256 _id
    ) {
        require (
              _msgSender() == owner() ||
              badges[_id].addressIsDelegate[_msgSender()]
            , "BadgerScout::onlyLeader: Only leaders can call this."
        );
        _;
    }

    /**
     * @notice Make sure that actions can only be performed on badges that exist.
     */    
    modifier onlyRealBadge(
        uint256 _id
    ) { 
        require (
              bytes(badges[_id].uri).length > 0
            , "BadgerScout::onlyRealBadge: Can only call this for setup badges."
        );
        _;
    }

    /**
     * @notice Create a badge in the Organization.
     * @param _id The id of the badge being created.
     * @param _accountBound Whether or not the badge is account bound.
     * @param _signer The address of the signer.
     * @param _uri The URI for the badge.
     * @param _paymentToken The payment token for the badge.
     * @param _delegates The addresses of the delegates.
     */
    function setBadge(
          uint256 _id
        , bool _accountBound
        , address _signer
        , string memory _uri
        , PaymentToken memory _paymentToken
        , address[] memory _delegates 
    )
        external
        virtual
        onlyOwner
    {
        Badge storage badge = badges[_id];

        /// @dev Set the state variables of the Badge.
        badge.accountBound = _accountBound;
        badge.signer = _signer;
        badge.uri = _uri;
        badge.paymentToken = _paymentToken;

        /// @dev Update the state of all the delegates.
        for (
            uint256 i; 
            i < _delegates.length; 
            i++
        ) {
            badge.addressIsDelegate[_delegates[i]] = true;
        }
    }

    /**
     * @notice Set the signer for the Badge.
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
        onlyRealBadge(_id)
    {
        badges[_id].signer = _signer;
    }

    /**
     * @notice Set the uri for a Badge.
     * @param _uri The address of the signer.
     * 
     * Requirements:
     * - `_msgSender()` must be a leader of the Badge.
     * - `_id` must corresponding to an existing Badge config.
     * - `_uri` must not be null.
     */
    function setURI(
          uint256 _id
        , string memory _uri
    )
        external
        virtual
        onlyLeader(_id)
        onlyRealBadge(_id)
    {
        badges[_id].uri = _uri;
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
        onlyRealBadge(_id)
    {
        badges[_id].paymentToken = _paymentToken;
    }

    /**
     * @notice Allow the owner of the organization to control the leaders of the Badge.
     * @param _id The id of the badge.
     * @param _delegates The address of the delegates that we are updating the status of.
     * @param _isDelegate The status of the delegates being updated.
     * 
     * Requirements:
     * - Only the owner of the contract can call this function.
     * - `_id` must corresponding to an existing Badge config.
     */
    function setDelegates(
          uint256 _id
        , address[] calldata _delegates
        , bool[] calldata _isDelegate
    )
        external
        virtual
        onlyOwner
        onlyRealBadge(_id)
    {
        require(
              _delegates.length == _isDelegate.length
            , "BadgerScout::setDelegates: _delegates and _isDelegate arrays must be the same length."
        );

        /// @dev Loop through the delegates and update their status.        
        for (
            uint256 i; 
            i < _delegates.length; 
            i++
        ) {
            badges[_id].addressIsDelegate[_delegates[i]] = _isDelegate[i];
        }
    }

    /**
     * @notice Allow the owner of the organization to control the delegates of multiple badges in one transaction.
     * @dev This functionality is not exposed through the Dashboard UI however you can call this function directly.
     * @param _ids The ids of the badges.
     * @param _delegates The address of the delegates that we are updating the status of.
     * @param _isDelegate The status of the delegates being updated.
     * 
     * Requirements:
     * - Only the owner of the contract can call this function.
     */
    function setDelegatesBatch(
          uint256[] calldata _ids
        , address[] calldata _delegates
        , bool[] calldata _isDelegate
    )
        external
        virtual
        onlyOwner()
    {
        require(
                   _ids.length == _delegates.length 
                && _delegates.length == _isDelegate.length
            , "BadgerScout::setDelegatesBatch: _ids, _delegates, and _isDelegate must be the same length."
        );

        /// @dev Loop through the badges and update the delegates statuses.        
        for (
            uint256 i; 
            i < _ids.length; 
            i++
        ) {
            badges[_ids[i]].addressIsDelegate[_delegates[i]] = _isDelegate[i];
        }
    }

    /**
     * @notice Allow anyone to see the delegates of a Badge.
     * @param _id The id of the badge.
     * @param _delegate The address of the delegate.
     * @return Boolean of whether or not the provided address is a delegate.
     * 
     * Requirements:
     * - `_id` must corresponding to an existing Badge config.
     */
    function isDelegate(
          uint256 _id
        , address _delegate
    )
        external
        view
        virtual
        onlyRealBadge(_id)
        returns (
            bool
        )
    {
        return badges[_id].addressIsDelegate[_delegate];
    }

    /**
     * @notice Allows an Organization to define a signer that will enable the claiming of a badge.
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
     * @notice Allows the Owner to execute an Organization level transaction.
     * @param _to The address to execute the transaction on.
     * @param _data The data to pass to the receiver.
     * @param _value The amount of ETH to send with the transaction.
     */
    function execTransaction(
          address _to
        , bytes calldata _data
        , uint256 _value
    )
        external
        payable
        onlyOwner
    {
        (bool success, bytes memory returnData) = _to.call{value: _value}(_data);
        require(success, string(returnData));
    }
}