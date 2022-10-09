// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

interface BadgerScoutInterface {
    /*//////////////////////////////////////////////////////////////
                                SCHEMAS
    //////////////////////////////////////////////////////////////*/

    /// @dev The structure of a Payment Token.
    struct PaymentToken { 
        bytes32 paymentKey;     /// @dev keccak256(abi.encodePacked(tokenAddress,tokenId));
        uint256 amount;         /// @dev Amount needed per badge to claim.
    }

    /// @dev The processing information for this Badger.
    struct Badge { 
        uint256 config;                 /// @dev Bitpacked claimable, accountBound and signer.
        string uri;                     /// @dev The URI for the badge.
        PaymentToken paymentToken;      /// @dev The payment token required to mint a badge.
    }

    /*//////////////////////////////////////////////////////////////
                                SETTERS
    //////////////////////////////////////////////////////////////*/

    function setOrganizationURI(
        string memory _uri
    )   
        external;

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
        external;

    /**
     * @notice Allows the owner of the contract to set a Badge as claimable or not.
     * @param _id The id of the badge being updated.
     * @param _claimable Whether the badge is claimable or not.
     */
    function setClaimable(
        uint256 _id
      , bool _claimable
    )
        external;

    /**
     * @notice Control the account bound status of a badge.
     * @param _id The id of the badge being updated.
     * @param _accountBound The new account bound status.
     */
    function setAccountBound(
        uint256 _id
      , bool _accountBound
    )
        external;

    /**
     * @notice Set the signer for the Badge.
     * @param _signer The address of the signer.
     */
    function setSigner(
        uint256 _id
      , address _signer
    )
        external;

    /**
     * @notice Set the uri for a Badge.
     * @param _uri The address of the signer.
     */
    function setBadgeURI(
        uint256 _id
      , string memory _uri
    )
        external;

    /**
     * @notice Set the payment for a specific badge id.
     * @param _id The id of the badge being accessed.
     * @param _paymentToken The payment token for the badge.
     */
    function setPaymentToken(
        uint256 _id
      , PaymentToken memory _paymentToken
    )
        external;

    /**
     * @notice Allow the owner of the organization to control the leaders of the Badge.
     * @param _id The id of the badge.
     * @param _delegates The address of the delegates that we are updating the status of.
     * @param _isDelegate The status of the delegates being updated.
     */
    function setDelegates(
        uint256 _id
      , address[] calldata _delegates
      , bool[] calldata _isDelegate
    )
        external;

    /**
     * @notice Allow the owner of the organization to control the delegates of multiple badges in one transaction.
     * @dev This functionality is not exposed through the Dashboard UI however you can call this function directly.
     * @param _ids The ids of the badges.
     * @param _delegates The address of the delegates that we are updating the status of.
     * @param _isDelegate The status of the delegates being updated.
     */
    function setDelegatesBatch(
        uint256[] calldata _ids
      , address[] calldata _delegates
      , bool[] calldata _isDelegate
    )
        external;

    /*//////////////////////////////////////////////////////////////
                                GETTERS
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Get the config for a specific badge id.
     * @param _id The id of the badge being accessed.
     * @return True if the badge is claimable, false otherwise. 
     */
    function getClaimable(
        uint256 _id
    )
        external
        view
        returns (
            bool
        );

    /**
     * @notice Get the config for a specific badge id.
     * @param _id The id of the badge being accessed.
     * @return True if the badge is account bound, false otherwise. 
     */
    function getAccountBound(
        uint256 _id
    )
        external
        view
        returns (
            bool
        );

    /**
     * @notice Get the signer for a specific badge id.
     * @param _id The id of the badge being accessed.
     * @return The address of the signer. 
     */
    function getSigner(
        uint256 _id
    )
        external
        view
        returns (
            address
        );

    /**
     * @notice Allow anyone to see the delegates of a Badge.
     * @param _id The id of the badge.
     * @param _delegate The address of the delegate.
     * @return True if `_delegate` is a delegate, false otherwise.
     */
    function isDelegate(
        uint256 _id
      , address _delegate
    )
        external
        view
        returns (
            bool
        );
}