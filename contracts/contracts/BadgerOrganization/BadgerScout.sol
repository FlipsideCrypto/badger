// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

/// @dev Core dependencies.
import { BadgerScoutInterface } from "./interfaces/BadgerScoutInterface.sol";
import { OwnableUpgradeable } from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol"; 
import { ERC1155HolderUpgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155HolderUpgradeable.sol";
import { ERC721HolderUpgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC721/utils/ERC721HolderUpgradeable.sol";

/// @dev Helpers.
import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/// @dev Supported interfaces.
import { IERC1155 } from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import { IERC1155ReceiverUpgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol";
import { IERC721ReceiverUpgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol";

contract BadgerScout is 
      BadgerScoutInterface
    , OwnableUpgradeable
    , ERC1155HolderUpgradeable 
    , ERC721HolderUpgradeable
{ 
    using ECDSA for bytes32;

    /*//////////////////////////////////////////////////////////////
                           ORGANIZATION STATE
    //////////////////////////////////////////////////////////////*/

    /// @dev The address used to denote the ETH token.
    address public constant DOLPHIN_ETH = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    /// @dev The URI for the Organization/contract. 
    string public organizationURI;

    /// @dev The name of the contract.
    string public name;

    /// @dev The symbol of the contract.
    string public symbol;

    /// @dev Mapping from token ID to badge
    mapping(uint256 => Badge) public badges;

    /// @dev Tracking the badges that one has funded the cost for.
    mapping(bytes32 => uint256) badgePaymentKeyToFunded;

    /// @dev Tracking the delegates of a Badge.
    mapping(bytes32 => bool) public badgeDelegateKeyToIsDelegate;

    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    /// @dev Event that announces when the Organization is updated.
    event OrganizationUpdated(string organizationURI);

    /// @dev Event that announces when the status of a Badge is updated.
    event BadgeUpdated(
        Badge badge
    );

    /// @dev Event that announces when a payment token is deposited for a Badge.
    event PaymentTokenDeposited(
          uint256 indexed badgeId
        , address indexed payer
        , uint256 indexed amount
    );

    /*//////////////////////////////////////////////////////////////
                             MODIFIERS
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Make sure that only owner or the leader of a badge passes.
     * @param _id The id of the badge being accessed.
     * 
     * Requirements:
     * - The caller must be the owner or the leader of the badge.
     */
    modifier onlyLeader(
        uint256 _id
    ) {
        require (
                 _msgSender() == owner() 
              || badgeDelegateKeyToIsDelegate[
                    keccak256(
                        abi.encodePacked(
                              _id
                            , _msgSender()
                        )
                    )
                ]
            , "BadgerScout::onlyLeader: Only leaders can call this."
        );
        _;
    }

    /**
     * @notice Make sure that actions can only be performed on badges that exist.
     * @param _id The id of the badge being accessed.
     * 
     * Requirements:
     * - The badge must exist.
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

    /*//////////////////////////////////////////////////////////////
                                SETTERS
    //////////////////////////////////////////////////////////////*/

    /**
     * See {BadgerScoutInterface.setOrganizationURI}
     * 
     * Requirements:
     * - The caller must be the owner.
     */
    function setOrganizationURI(
        string memory _uri
    )
        override
        public
        virtual
        onlyOwner
    {
        _setOrganizationURI(_uri);
    }

    /**
     * See {BadgerScoutInterface.setBadge}
     * 
     * Requirements:
     * - The caller must be a leader of the Organization.
     * - The URI must not be blank.
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
        override
        public
        virtual
        onlyLeader(_id)
    {
        require(
              bytes(_uri).length > 0
            , "BadgerScout::setBadge: URI must be set."
        );

        Badge storage badge = badges[_id];

        /// @dev Set the config of the Badge.
        badge.config = 0;

        /// @dev Set the claimable bit of the Badge.
        _setBit(
              _id
            , 0
            , _claimable
        );

        /// @dev Set the account bound bit of the Badge.
        _setBit(
              _id
            , 1
            , _accountBound
        );

        /// @dev Set the signer of the Badge.
        _setSigner(
              _id
            , _signer
        );
        
        badge.uri = _uri;
        badge.paymentToken = _paymentToken;

        /// @dev Update the state of all the delegates.
        for (
            uint256 i; 
            i < _delegates.length; 
            i++
        ) {
            badgeDelegateKeyToIsDelegate[keccak256(
                abi.encodePacked(
                      _id
                    , _delegates[i]
                )
            )] = true;
        }

        emit BadgeUpdated(badge);
    }

    /**
     * See {BadgerScoutInterface.setClaimable}
     * 
     * Requirements:
     * - The caller must be a leader of the Organization.
     * - The badge must exist.
     */
    function setClaimable(
          uint256 _id
        , bool _claimable
    )
        override
        public
        virtual
        onlyLeader(_id)
        onlyRealBadge(_id)
    {
        /// @dev Set the claimable bit of the Badge.
        _setBit(
              _id
            , 0
            , _claimable
        );

        emit BadgeUpdated(badges[_id]);
    }

    /**
     * See {BadgerScoutInterface.setAccountBound}
     * 
     * Requirements:
     * - The caller must be a leader of the Organization.
     * - The badge must exist.
     */
    function setAccountBound(
          uint256 _id
        , bool _accountBound
    )
        override
        public
        virtual
        onlyLeader(_id)
        onlyRealBadge(_id)
    {
        /// @dev Set the account bound bit of the Badge.
        _setBit(
              _id
            , 1
            , _accountBound
        );

        emit BadgeUpdated(badges[_id]);
    }

    /**
     * See {BadgerScoutInterface.setSigner}
     * 
     * Requirements:
     * - The caller must be a leader of the Organization.
     * - The badge must exist.
     */
    function setSigner(
          uint256 _id
        , address _signer
    )
        override
        public
        virtual
        onlyLeader(_id)
        onlyRealBadge(_id)
    {
        /// @dev Override the existing data and bitpack _signer into the config of the Badge.
        _setSigner(
              _id
            , _signer
        );
    
        emit BadgeUpdated(badges[_id]);
    }

    /**
     * See {BadgerScoutInterface.setBadgeURI}
     * 
     * Requirements:
     * - The caller must be a leader of the Organization.
     * - The badge must exist.
     * - The URI must not be blank.
     */
    function setBadgeURI(
          uint256 _id
        , string memory _uri
    )
        override
        public
        virtual
        onlyLeader(_id)
        onlyRealBadge(_id)
    {
        require(
              bytes(_uri).length > 0
            , "BadgerScout::setBadgeURI: URI must be set."
        );

        Badge storage badge = badges[_id];

        badge.uri = _uri;

        emit BadgeUpdated(badge);
    }

    /**
     * See {BadgerScoutInterface.setPaymentToken}
     * 
     * Requirements:
     * - The caller must be a leader of the Organization.
     * - The badge must exist.
     */
    function setPaymentToken(
          uint256 _id
        , PaymentToken memory _paymentToken
    )
        public
        virtual
        onlyLeader(_id)
        onlyRealBadge(_id)
    {
        Badge storage badge = badges[_id];

        badge.paymentToken = _paymentToken;

        emit BadgeUpdated(badge);
    }

    /**
     * See {BadgerScoutInterface.setDelegate}
     * 
     * Requirements:
     * - The caller must be a leader of the Organization.
     * - The badge must exist.
     * - The arrays must be the same length.
     */
    function setDelegates(
          uint256 _id
        , address[] calldata _delegates
        , bool[] calldata _isDelegate
    )
        override
        public
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
            badgeDelegateKeyToIsDelegate[keccak256(
                abi.encodePacked(
                      _id
                    , _delegates[i]
                )
            )] = _isDelegate[i];
        }

        emit BadgeUpdated(badges[_id]);
    }

    /**
     * See {BadgerScoutInterface.setDelegatesBatch}
     * 
     * Requirements:
     * - The arrays must be the same length.
     */
    function setDelegatesBatch(
          uint256[] calldata _ids
        , address[] calldata _delegates
        , bool[] calldata _isDelegate
    )
        override
        public
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

            badgeDelegateKeyToIsDelegate[keccak256(
                abi.encodePacked(
                      id
                    , _delegates[i]
                )
            )] = _isDelegate[i];

            emit BadgeUpdated(badges[id]);
        }
    }

    /*//////////////////////////////////////////////////////////////
                                GETTERS
    //////////////////////////////////////////////////////////////*/

    /**
     * See {BadgerScoutInterface.getClaimable}
     */
    function getClaimable(
        uint256 _id
    )
        override
        public
        view
        virtual
        returns (
            bool
        )
    {
        return (badges[_id].config & (1 << 0)) != 0;
    }

    /**
     * See {BadgerScoutInterface.getAccountBound}
     */
    function getAccountBound(
        uint256 _id
    )  
        override
        public
        view
        virtual
        returns (
            bool
        )
    { 
        return (badges[_id].config & (1 << 1)) != 0;
    }

    /**
     * See {BadgerScoutInterface.getSigner}
     */
    function getSigner(
        uint256 _id
    )
        override
        public
        view
        virtual
        returns (
            address
        )
    {
        return address(uint160(badges[_id].config >> 2));
    }

    /**
     * See {BadgerScoutInterface.isDelegate}
     */
    function isDelegate(
          uint256 _id
        , address _delegate
    )
        public
        view
        virtual
        returns (
            bool
        )
    {
        return badgeDelegateKeyToIsDelegate[
            keccak256(
                abi.encodePacked(
                      _id
                    , _delegate
                )
            )
        ];
    }

    /*//////////////////////////////////////////////////////////////
                            INTERNAL SETTERS
    //////////////////////////////////////////////////////////////*/

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

        emit OrganizationUpdated(_uri);
    }

    /**
     * @notice Converts a boolean into a bit and packs it into the config.
     * @param _id The ID of the badge.
     * @param _bit The bit to pack.
     * @param _value The value to pack.
     */
    function _setBit(
          uint256 _id
        , uint256 _bit
        , bool _value
    )
        internal
        virtual
    {
        if (_value) {
            badges[_id].config |= (1 << _bit);
        } else {
            badges[_id].config &= ~(1 << _bit);
        }
    }

    /**
     * @notice Sets the signer for the badge.
     * @param _id The ID of the badge.
     * @param _signer The address of the signer.
     */    
    function _setSigner(
          uint256 _id
        , address _signer
    )
        internal
        virtual
    {
        badges[_id].config &= 0x0000000000000000000000000000000000000000000000000000000000000003;
        badges[_id].config |= uint256(uint160(_signer)) << 2;
    }

    /**
     * @notice Handle the token-agnostic depositing of funds needed
     *         to claim a Badge.
     * @param _badgeId The id of the badge being claimed.
     * @param _address The address of the user claiming the badge.
     * @param _id The id of the payment token being used.
     * @param _from The address of the user sending the funds.
     * @param _amount The amount of funds being sent.
     */
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

    /**
     * @notice Verify that the message sender has funded this payment token
     *         with an amount greater than or equal to the amount required.
     * @param _paymentTokenKey The key of the payment token.
     * @param _amount The amount that the user is trying to claim.
     *
     * Requirements:
     * - The user must have funded the payment token with an amount greater than 
     *   or equal to the amount required.
     */
    function _verifyFunding(
          bytes32 _paymentTokenKey
        , uint256 _amount
    )
        internal
    {
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

    /*//////////////////////////////////////////////////////////////
                            INTERNAL GETTERS
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Confirms that a message sender is calling a Badge that exists 
     *         as well as is a leader of that badge.
     * @param _id The id of the badge to check.
     * 
     * Requirements:
     * - The Badger must exist.
     * - The caller must be a leader of the Organization.
     */
    function _verifyFullBatch(
        uint256 _id
    )
        internal
        view
    { 
        /// @dev Get the badge.
        Badge storage badge = badges[_id];

        /// @dev Confirm the Badge exists.
        require(
              bytes(badge.uri).length != 0
            , "BadgerScout::_verifyFullBatch: Can only call this for setup badges."
        );
        
        /// @dev Only allow the owner or leader to mint the badge.
        require (
                 _msgSender() == owner() 
              || isDelegate(
                       _id
                     , _msgSender()
                 )
            , "BadgerScout::_verifyFullBatch: Only leaders can call this."
        );
    }        

    /**
     * @notice Confirms that a message sender is calling a Badge that exists
     *         and is ready to be minted.
     * @param _id The id of the badge to check.
     * 
     * Requirements:
     * - The Badger must exist.
     * - The Badge must have a signer set or be marked as claimable.
     */
    function _verifyBadge(
        uint256 _id
    )
        internal
        view
    { 
        /// @dev Get the badge.
        Badge storage badge = badges[_id];

        require (
              bytes(badge.uri).length > 0
            , "BadgerScout::_verifyBadge: Can only call this for setup badges."
        );

        require (
                 getSigner(_id) != address(0)
              || getClaimable(_id)
            , "BadgerScout::_verifyBadge: Can only call this for claimable badges."
        );
    }

    /**
     * @notice Allows an Organization to define a signer that will enable the claiming of a badge.
     * @param _to The address to mint the badge to.
     * @param _id The id of the badge to mint.
     * @param _amount The amount of the badge to mint.
     * @param _data The data to pass to the receiver.
     * @param _signature The signature of the signer.
     * 
     * Requirements:
     * - The signature provided must be valid for the badge.
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
              message.toEthSignedMessageHash().recover(_signature) == getSigner(_id)
            , "BadgerScout::_verifySignature: Invalid signature."
        );
    }

    /**
     * @notice Connfirms that the provided payment token is valid for the badge.
     * @param _badgeId The id of the badge.
     * @param _address The address of the payment token.
     * @param _id The id of the payment token.
     * 
     * Requirements:
     * - The payment token must be valid for the badge.
     */
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

    /**
     * @notice Confirms whether this token is in a state to be a transferred or not.
     * @param _id The id of the token to check. 
     * @param _from The address of the token owner.
     * @param _to The address of the token recipient.
     * 
     * Requirements:
     * - The token must be in a state to be transferred.
     */
    function _verifyTransfer(
          uint256 _id
        , address _from
        , address _to
    )
        internal
        view
    {
        /// @dev Confirm that the transfer can proceed if the account is not token bound
        ///      or the message sender is a leader of the badge.
        require(
              /// @dev Prevent a normal user from transferring an account bound token.
              ///      While allowing them to transfer if the token is not account bound.
              !getAccountBound(_id)
              || (
                  /// @dev If the target or source is the internal contract
                  (
                       _to == address(this) 
                    || _from == address(this)
                  )
                  /// @dev If the sender is a leader of the badge.
                  || (
                           _msgSender() == owner() 
                        || isDelegate(
                                  _id
                                , _msgSender()
                           )
                     )
              )
            , "BadgerScout::_verifyTransfer: Missing the proper transfer permissions."
        );
    }

    /*//////////////////////////////////////////////////////////////
                        EXTERNAL ORGANIZATION CONTROL
    //////////////////////////////////////////////////////////////*/

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