// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

interface IBadgerOrganization {
    /*//////////////////////////////////////////////////////////////
                                SETTERS
    //////////////////////////////////////////////////////////////*/

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
        address _to,
        uint256 _id,
        uint256 _amount,
        bytes memory _data
    ) external;

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
        address[] memory _tos,
        uint256 _id,
        uint256[] memory _amounts,
        bytes memory _data
    ) external;

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
        address _from,
        uint256 _id,
        uint256 _amount
    ) external;

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
        address[] memory _froms,
        uint256 _id,
        uint256[] memory _amounts
    ) external;

    /**
     * @notice Allows the owner of a badge to forfeit their ownership.
     * @param _id The id of the badge to forfeit.
     * @param _amount The amount of the badge to forfeit.
     * @param _data The data to pass to the receiver.
     */
    function forfeit(
        uint256 _id,
        uint256 _amount,
        bytes memory _data
    ) external;
}
