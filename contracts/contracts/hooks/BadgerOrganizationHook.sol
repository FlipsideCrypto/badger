// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

/// @dev Core dependencies.
import {IBadgerHook} from "../interfaces/IBadgerHook.sol";
import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";

/**
 * @dev Enforcement logic that keeps Hook quality consistent.
 * @author CHANCE (@nftchance)
 * @author masonthechain (@masonthechain)
 */
abstract contract BadgerOrganizationHook is IBadgerHook, IERC165 {
    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(IERC165)
        returns (bool)
    {
        return
            interfaceId == type(IBadgerHook).interfaceId ||
            interfaceId == type(IERC165).interfaceId;
    }
}
