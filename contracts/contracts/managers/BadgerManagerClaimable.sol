// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

import {BadgerOrganization} from "../BadgerOrganization.sol";

/**
 * @dev Implements the ability for individuals to claim Badges with an open
 *      link to the Organization.
 * @author CHANCE (@nftchance)
 * @author masonthechain (@masonthechain)
 */
contract BadgerManagerClaimable {
    /**
     * @dev Sets a new Badge as an open claim.
     */
    function mint(
        uint256 _id,
        uint256 _amount,
        bytes calldata _data
    ) external {
        /// @dev Mint a new badge for the organization.
        BadgerOrganization(msg.sender).mint(msg.sender, _id, _amount, _data);
    }
}
