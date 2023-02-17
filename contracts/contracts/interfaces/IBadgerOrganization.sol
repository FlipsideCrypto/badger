// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

interface IBadgerOrganization {
    /*//////////////////////////////////////////////////////////////
                                SETTERS
    //////////////////////////////////////////////////////////////*/

    /**
     * @dev Allows a Manager of a Badge to mint to a user.
     * @param _to The address to mint the Badge to.
     * @param _id The id of the Badge to mint.
     * @param _amount The amount of the Badge to mint.
     * @param _data The data to pass to the receiver.
     *
     * Requirements:
     * - `_msgSender` must be a Manager of the Badge or Organization.
     */
    function leaderMint(
        address _to,
        uint256 _id,
        uint256 _amount,
        bytes memory _data
    ) external;

    /**
     * @notice Allows a Manager of a Badge to mint a batch of recipients in a single transaction,
     *         enabling the ability to seamlessly roll out a new "season" with a single batch
     *         instead of needing hundreds of individual events. Because of this common use case,
     *         the constant is designed around the _id rather than the _to address.
     * @param _tos The addresses to mint the Badge to.
     * @param _id The id of the Badge to mint.
     * @param _amounts The amounts of the Badge to mint.
     * @param _data The data to pass to the receiver.
     *
     * Requirements:
     * - `_msgSender` must be a Manager of the Badge or Organization.
     */
    function leaderMintBatch(
        address[] memory _tos,
        uint256 _id,
        uint256[] memory _amounts,
        bytes memory _data
    ) external;

    /**
     * @notice Allows a Manager of a Badge to revoke a Badge from a user.
     * @param _from The address to revoke the Badge from.
     * @param _id The id of the Badge to revoke.
     * @param _amount The amount of the Badge to revoke.
     *
     * Requirements:
     * - `_msgSender` must be a Manager of the Badge or Organization.
     */
    function revoke(
        address _from,
        uint256 _id,
        uint256 _amount
    ) external;

    /**
     * @notice Allows a Manager to revoke Badges from a user.
     * @param _froms The addresses to revoke the badge from.
     * @param _id The id of the badge to revoke.
     * @param _amounts The amount of the badge to revoke.
     *
     * Requirements:
     * - `_msgSender` must be a Manager of the Badge or Organization.
     */
    function revokeBatch(
        address[] memory _froms,
        uint256 _id,
        uint256[] memory _amounts
    ) external;

    /**
     * @notice Allows the owner of a Badge to forfeit their ownership.
     * @param _id The id of the Badge to forfeit.
     * @param _amount The amount of the Badge to forfeit.
     * @param _data The data to pass to the receiver.
     */
    function forfeit(
        uint256 _id,
        uint256 _amount,
        bytes memory _data
    ) external;
}
