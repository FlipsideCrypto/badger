// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol"; 
import { ERC1155HolderUpgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155HolderUpgradeable.sol";
import { ERC1155ReceiverUpgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155ReceiverUpgradeable.sol";
import { ERC721HolderUpgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC721/utils/ERC721HolderUpgradeable.sol";

import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import { IERC1155 } from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import { IERC1155ReceiverUpgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol";
import { IERC721ReceiverUpgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol";

contract BadgerScout is 
      OwnableUpgradeable
    , ERC1155HolderUpgradeable 
    , ERC721HolderUpgradeable
{ 
    using ECDSA for bytes32;

    /// @dev The structure of a Payment Token.
    struct PaymentToken { 
        uint8 tokenType;        /// @dev 0 = ETH, 1 = ERC20, 2 = ERC721, 3 = ERC1155
        uint256 amount;         /// @dev Amount per badge.
        bytes32 paymentKey;     /// @dev keccak256(abi.encodePacked(tokenAddress,tokenId));
    }

    /// @dev The processing information for this token.
    struct Badge { 
        bool claimable;                 /// @dev If the badge is claimable.
        bool accountBound;              /// @dev Whether or not owners of Badges can transfer them.
        address signer;                 /// @dev The signer that blocks minting.
        string uri;                     /// @dev The URI for the badge.
        PaymentToken paymentToken;      /// @dev The payment token required to mint a badge.
        mapping(address => bool) addressIsDelegate;
    }

    address public constant DOLPHIN_ETH = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    /// @dev The URI for the Organization / contract. 
    string public organizationURI;

    /// @dev Mapping from token ID to badge
    mapping(uint256 => Badge) public badges;

    /// @dev The name of the contract. Optional for ERC-1155. (Good EIP authors :))
    string public name;

    /// @dev The symbol of the contract. Optional for ERC-1155.
    string public symbol;

    /// @dev Tracking the badges that one has funded the cost for.
    mapping(bytes32 => uint256) badgePaymentKeyToFunded;

    /// @dev Event that announces when the Organization is updated.
    event OrganizationUpdated();

    /// @dev Event that announces when the status of a Badge is updated.
    event BadgeUpdated(
        uint256 indexed badgeId
    );

    /// @dev Event that announces when a payment token is deposited for a Badge.
    event PaymentTokenDeposited(
          uint256 indexed badgeId
        , address indexed payer
        , uint256 amount
    );

    /**
     * @notice Make sure that only owner or the leader of a badge passes.
     * @param _id The id of the badge being accessed.
     */
    modifier onlyLeader(
        uint256 _id
    ) {
        require (
                 _msgSender() == owner() 
              || badges[_id].addressIsDelegate[_msgSender()]
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

    modifier onlyClaimableBadge(
        uint256 _id
    ) {
        require (
                 badges[_id].signer != address(0)
              || badges[_id].claimable
            , "BadgerScout::onlyClaimableBadge: Can only call this for claimable badges."
        );
        _;
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
        returns (
            bool
        )
    {
        return badges[_id].addressIsDelegate[_delegate];
    }

    /**
     * @notice Confirms that a message sender is calling a Badge that exists 
     *         as well as is a leader of that badge.
     * @param _id The id of the badge to check.
     * 
     * Requirements:
     * - The Badger must exist.
     * - The `_msgSender()` must be a leader of the badge.
     */
    function _verifyFullBatch(
        uint256 _id
    )
        internal
        view
        virtual
    { 
        /// @dev Get the badge.
        Badge storage badge = badges[_id];

        /// @dev Confirm the Badge exists.
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
     * @notice Allows an Organization to define a signer that will enable the claiming of a badge.
     * @param _to The address to mint the badge to.
     * @param _id The id of the badge to mint.
     * @param _amount The amount of the badge to mint.
     * @param _data The data to pass to the receiver.
     * @param _signature The signature of the signer.
     */
    function _verifySignature(
        address _to,
        uint256 _id,
        uint256 _amount,
        bytes memory _data,
        bytes memory _signature
    )
        internal
        view
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

        require(
              message.toEthSignedMessageHash().recover(_signature) == badges[_id].signer
            , "BadgerScout::_verifySignature: Invalid signature."
        );
    }

    function _verifyPayment(
            uint256 _badgeId 
          , address _address
          , uint256 _id
    )
        internal
        view
        returns (
            bytes32 paymentTokenKey
        )
    { 
        /// @dev Get the Badge object.
        Badge storage badge = badges[_badgeId];

        paymentTokenKey = keccak256(
            abi.encodePacked(
                  _address 
                , _id              
            )
        );

        require(
              paymentTokenKey == badge.paymentToken.paymentKey
            , "BadgerScout::_verifyPayment: Invalid payment token."
        );
    }

    function _verifyDeposit(
          uint256 _badgeId 
        , address _address
        , uint256 _id
        , address _from
        , uint256 _amount
    )
        internal
    {
        /// @dev Confirm that the token is a valid payment token.
        bytes32 paymentTokenKey = _verifyPayment(
              _badgeId
            , _address
            , _id         
        );

        /// @dev Build the key that is used to track what an individual has funded.
        bytes32 paymentKey = (
            keccak256(
                abi.encodePacked(
                      paymentTokenKey
                    , _from
                )
            )
        );

        /// @dev Increase the funding the user has associated for this badge.
        badgePaymentKeyToFunded[paymentKey] += _amount;

        emit PaymentTokenDeposited(
              _badgeId
            , _from
            , _amount
        );
    }

    function _verifyFunding(
          bytes32 _paymentTokenKey
        , uint256 _amount
    )
        internal
    {
        /// @dev Confirm that the user is trying to mint at least one.
        require(
              _amount > 0
            , "BadgerScout::_verifyFunding: Amount must be greater than 0."
        );

        /// @dev Build the key that is used to track what an individual has funded.
        bytes32 paymentKey = (
            keccak256(
                abi.encodePacked(
                      _paymentTokenKey 
                    , _msgSender()
                )
            )
        );

        /// @dev Confirm that the user has funded the badge or that the Badge is free.
        require(
              badgePaymentKeyToFunded[paymentKey] >= _amount
            , "BadgerScout::_verifyFunding: User has not funded the badge."
        );

        /// @dev Lower the amount funded.
        badgePaymentKeyToFunded[paymentKey] -= _amount;
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
     * @notice Allows the owner of the contract to update the Organization URI.
     * @param _uri The new URI for the Organization.
     */
    function _setOrganizationURI(
        string memory _uri
    )
        internal
        virtual
    {
        organizationURI = _uri;

        emit OrganizationUpdated();
    }

    /**
     * See {BadgerScout._setOrganization}
     */
    function setOrganizationURI(
        string memory _uri
    )
        external
        virtual
        onlyOwner
    {
        _setOrganizationURI(_uri);
    }

    /**
     * @notice Create a badge in the Organization.
     * @param _id The id of the badge being created.
     * @param _claimable Whether the badge is claimable or not.
     * @param _accountBound Whether or not the badge is account bound.
     * @param _signer The address of the signer.
     * @param _uri The URI for the badge.
     * @param _paymentToken The payment token for the badge.
     * @param _delegates The addresses of the delegates.
     */
    function setBadge(
          uint256 _id
        , bool _claimable
        , bool _accountBound
        , address _signer
        , string memory _uri
        , PaymentToken memory _paymentToken
        , address[] memory _delegates 
    )
        external
        virtual
        onlyLeader(_id)
    {
        require(
              bytes(_uri).length > 0
            , "BadgerScout::setBadge: URI must be set."
        );

        Badge storage badge = badges[_id];

        /// @dev Set the state variables of the Badge.
        badge.claimable = _claimable;
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

        emit BadgeUpdated(_id);
    }


    /**
     * @notice Allows the owner of the contract to set a Badge as claimable or not.
     * @param _id The id of the badge being updated.
     * @param _claimable Whether the badge is claimable or not.
     */
    function setClaimable(
          uint256 _id
        , bool _claimable
    )
        external
        virtual
        onlyLeader(_id)
        onlyRealBadge(_id)
    {
        badges[_id].claimable = _claimable;

        emit BadgeUpdated(_id);
    }

    /**
     * @notice Control the account bound status of a badge.
     * @param _id The id of the badge being updated.
     * @param _accountBound The new account bound status.
     */
    function setAccountBound(
          uint256 _id
        , bool _accountBound
    )
        external
        virtual
        onlyLeader(_id)
        onlyRealBadge(_id)
    {
        badges[_id].accountBound = _accountBound;

        emit BadgeUpdated(_id);
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

        emit BadgeUpdated(_id);
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
    function setBadgeURI(
          uint256 _id
        , string memory _uri
    )
        external
        virtual
        onlyLeader(_id)
        onlyRealBadge(_id)
    {
        require(
              bytes(_uri).length > 0
            , "BadgerScout::setBadgeURI: URI must be set."
        );

        badges[_id].uri = _uri;

        emit BadgeUpdated(_id);
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

        emit BadgeUpdated(_id);
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
        onlyLeader(_id)
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

        emit BadgeUpdated(_id);
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
    {
        require(
                   _ids.length == _delegates.length 
                && _delegates.length == _isDelegate.length
            , "BadgerScout::setDelegatesBatch: _ids, _delegates, and _isDelegate must be the same length."
        );

        /// @dev Loop through the badges and update the delegates statuses.        
        uint256 i;
        uint256 id;
        for (
            i; 
            i < _ids.length; 
            i++
        ) {
            id = _ids[i];

            /// @dev Confirm that the token exists and that the caller is a leader.
            _verifyFullBatch(id);

            badges[id].addressIsDelegate[_delegates[i]] = _isDelegate[i];

            emit BadgeUpdated(id);
        }
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
        virtual
        payable
        onlyOwner
    {
        (bool success, bytes memory returnData) = _to.call{value: _value}(_data);
        require(success, string(returnData));
    }
}