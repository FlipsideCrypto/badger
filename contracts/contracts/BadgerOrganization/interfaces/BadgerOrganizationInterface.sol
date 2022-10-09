// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

interface BadgerOrganizationInterface { 
    /**
     * @notice Initialize the Organization with the starting state needed.
     * @param _owner The owner of the Organization. (Ideally a multi-sig).
     * @param _uri The base URI for the Organization.
     * @param _contractURI The URI for the contract metadata.
     * @param _name The name of the Organization.
     * @param _symbol The symbol of the Organization.
     */
    function initialize(
          address _owner
        , string memory _uri
        , string memory _contractURI
        , string memory _name
        , string memory _symbol
    )
        external;

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
        external;

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
        external;

    /**
     * @notice Allows a user to mint a claim that has been designated to them.
     * @dev This function is only used when the mint is being paid with ETH or has no payment at all.
     *      To use this with no payment, the `tokenType` of NATIVE with `quantity` of 0 must be used.
     * @param _signature The signature that is being used to verify the authenticity of claim.
     * @param _id The id of the badge being claimed.
     * @param _amount The amount of the badge being claimed.
     * @param _data Any data that is being passed to the mint function.
     * 
     * Requirements:
     * - `_id` must corresponding to an existing Badge config.
     * - `_signature` must be a valid signature of the claim.
     */
    function claimMint(
          bytes calldata _signature
        , uint256 _id 
        , uint256 _amount 
        , bytes memory _data
    )
        external
        payable;

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
        external;

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
        external;

    /**
     * @notice Allows the owner of a badge to forfeit their ownership.
     * @param _id The id of the badge to forfeit.
     * @param _amount The amount of the badge to forfeit.
     */
    function forfeit(
          uint256 _id
        , uint256 _amount
    )
        external;

    /**
     * @notice Allows the owner of a badge to deposit ETH to fund the claiming of a badge.
     * @param _id The id of the badge to deposit ETH for.
     */
    function depositETH(
        uint256 _id
    )
        external
        payable;

    /**
     * @notice Allows the owner of a badge to deposit an ERC20 into the contract.
     * @param _id The id of the badge to deposit for.
     * @param _token The address of the token to deposit.
     * @param _amount The amount of the token to deposit.
     */
    function depositERC20(
          uint256 _id
        , address _token
        , uint256 _amount
    )
        external;
}