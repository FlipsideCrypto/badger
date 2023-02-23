// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

/// @dev Core dependencies.
import {IBadgerConfigured} from "../interfaces/IBadgerConfigured.sol";
import {ERC165} from "@openzeppelin/contracts/utils/introspection/ERC165.sol";

abstract contract BadgerManager is IBadgerConfigured, ERC165 {
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
            interfaceId == type(IBadgerConfigured).interfaceId ||
            super.supportsInterface(interfaceId);
    }
}
