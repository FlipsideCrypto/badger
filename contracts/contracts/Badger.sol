// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

/// @dev Core dependencies.
import {IBadger} from "./interfaces/IBadger.sol";
import {ERC165} from "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import {Context} from "@openzeppelin/contracts/utils/Context.sol";

/// @dev Helper dependencies.
import {BadgerOrganization} from "./BadgerOrganization.sol";
import {IBadgerOrganization} from "./interfaces/IBadgerOrganization.sol";
import {IBadgerOrganizationLogic} from "./interfaces/IBadgerOrganizationLogic.sol";

/// @dev Libraries.
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";

/**
 * @dev Badger is a low-level primitive powering middle-out on-chain access policies
 *      for Organizations and and their members with ERC-1155 Badges.
 * @notice Every Organization is a self-contained ecosystem of Badges, Managers
 *         and Members. To power the needs of complex access mechanisms, Badger
 *         utilizes a CREATE2 factory pattern to deploy new Organizations for
 *         the active version of the contract.
 * @author CHANCE (@nftchance)
 * @author masonthechain (@masonthechain)
 */
contract Badger is IBadger, ERC165, Context {
    using Clones for address;

    ////////////////////////////////////////////////////////
    ///                      STATE                       ///
    ////////////////////////////////////////////////////////

    /// @dev The address of the implementation contract for the minimal proxy.
    address public immutable implementation;

    /// @dev Keep track of how many organizations have been deployed.
    uint256 public organizations;

    ////////////////////////////////////////////////////////
    ///                   CONSTRUCTOR                    ///
    ////////////////////////////////////////////////////////

    constructor(address _implementation) {
        /// @dev Confirm that the implementation address is not the zero address.
        require(
            _implementation != address(0),
            "Badger::constructor: _implementation cannot be the zero address."
        );

        /// @dev Set the implementation address.
        implementation = _implementation;
    }

    ////////////////////////////////////////////////////////
    ///                     SETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * See {IBadger-createOrganization}.
     */
    function createOrganization(Organization calldata _organization)
        public
        virtual
        returns (BadgerOrganization badgerOrganization, uint256 organizationId)
    {
        /// @dev Keep track of the number of organizations deployed.
        unchecked {
            organizationId = organizations++;
        }

        /// @dev Determine what the address will be.
        address organizationAddress = implementation.cloneDeterministic(
            _organizationHash(organizationId)
        );

        /// @dev Interface with the Organization.
        badgerOrganization = BadgerOrganization(organizationAddress);

        /// @dev Initialize the Organization.
        badgerOrganization.initialize(_organization);

        /// @dev Announce the creation of the Organization.
        emit OrganizationCreated(
            badgerOrganization,
            _msgSender(),
            organizationId
        );
    }

    ////////////////////////////////////////////////////////
    ///                     GETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * See {IBadger-getOrganization}.
     */
    function getOrganization(uint256 _organizationId)
        public
        view
        virtual
        override
        returns (BadgerOrganization)
    {
        return
            BadgerOrganization(
                implementation.predictDeterministicAddress(
                    _organizationHash(_organizationId),
                    address(this)
                )
            );
    }

    /**
     * See {ERC1155-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override
        returns (bool)
    {
        return
            interfaceId == type(IBadger).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    ////////////////////////////////////////////////////////
    ///                INTERNAL GETTERS                  ///
    ////////////////////////////////////////////////////////

    function _organizationHash(uint256 _organizationId)
        internal
        pure
        returns (bytes32)
    {
        return keccak256(abi.encodePacked(_organizationId));
    }
}
