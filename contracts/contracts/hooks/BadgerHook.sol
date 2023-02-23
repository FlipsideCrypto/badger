// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

/// @dev Core dependencies.
import {IBadgerHook} from "../interfaces/IBadgerHook.sol";
import {ERC165} from "@openzeppelin/contracts/utils/introspection/ERC165.sol";

/**
 * @dev Enforcement logic that keeps Hook quality consistent.
 * @author CHANCE (@nftchance)
 * @author masonthechain (@masonthechain)
 */
abstract contract BadgerHook is IBadgerHook, ERC165 {
    /**
     * @dev See {ERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override
        returns (bool)
    {
        return
            interfaceId == type(IBadgerHook).interfaceId ||
            super.supportsInterface(interfaceId);
    }
}
