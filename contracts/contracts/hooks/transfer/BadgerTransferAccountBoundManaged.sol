// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

import {BadgerOrganizationLogic} from "../../BadgerOrganizationLogic.sol";

/**
 * @dev Transfer module that enforces accountBound logic with exception
 *      for Badge Managers.
 * @author CHANCE (@nftchance)
 * @author masonthechain (@masonthechain)
 */
contract BadgerAccountBoundManaged {
    /// @dev Process a transfer and confirm that valid conditions have been met.
    function execute(
        address _operator,
        address _from,
        address _to,
        uint256 _id,
        uint256,
        bytes memory
    ) external {
        /// @dev Require the transfer to be from or to the zero address
        ///      or that the operator is a Badge Manager.
        require(
            (_from == address(0) ||
                _to == address(0) ||
                BadgerOrganizationLogic(msg.sender).isBadgeManager(
                    _id,
                    _operator
                )),
            "BadgerAccountBoundManaged::execute: Invalid permission to transfer token."
        );
    }
}
