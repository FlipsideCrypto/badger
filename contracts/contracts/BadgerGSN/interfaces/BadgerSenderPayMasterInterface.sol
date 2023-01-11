// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

interface BadgerSenderPayMasterInterface { 
    /// @dev The structure of the required Badge to send transations.
    struct Badge {
        address token;          /// @dev The ERC1155 token address.
        uint256 id;             /// @dev The ERC1155 token id.
        uint256 amount;         /// @dev The amount of the ERC1155 token needed.
        uint256 subsidyBPS;     /// @dev The % of the transaction fee to subsidize.
    }

    /**
     * @notice Called by the owner of the PayMaster to declare an updated configuration of the PayMaster.
     * @param _index Index of the badge to update.
     * @param _token Address of the ERC1155 token to use for the badge.
     * @param _id ID of the ERC1155 token to use for the badge.
     * @param _amount Amount of the ERC1155 token to use for the badge.
     * @param _subsidyBPS Subsidy to apply to the badge.
     */
    function setBadge(
          uint256 _index
        , uint256 _id
        , address _token
        , uint256 _amount
        , uint256 _subsidyBPS
    ) 
        external;
}