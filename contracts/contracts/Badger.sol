// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

/// @dev Core dependencies.
import {IBadger} from "./interfaces/IBadger.sol";
import {ERC165} from "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import {BadgerOrganization} from "./BadgerOrganization.sol";

/// @dev Libraries.
import {Bytes32AddressLib} from "solmate/src/utils/Bytes32AddressLib.sol";

// TODO: Implement the public interface functions to call config for hooks and managers
// TODO: Implement multicall for BadgerOrganizations
// TODO: Revert factory pattern to use MinimalProxyFactory instead of CREATE2

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
contract Badger is IBadger, ERC165 {
    using Bytes32AddressLib for address;
    using Bytes32AddressLib for bytes32;

    ////////////////////////////////////////////////////////
    ///                      STATE                       ///
    ////////////////////////////////////////////////////////

    /// @dev Keep track of how many organizations have been deployed for use
    ///      as `salt` for the `create2` opcode.
    uint256 organizations;

    /// @dev Hotslot for the last deployed organization.
    Organization public organization;

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

        /// @dev Set the hotslot for the last deployed organization.
        organization = _organization;

        /// @dev Deploy the new organization using the `create2` opcode.
        badgerOrganization = new BadgerOrganization{
            salt: bytes32(organizations)
        }();

        /// @dev Announce the creation of the Organization.
        emit OrganizationCreated(
            badgerOrganization,
            msg.sender,
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
                payable(
                    keccak256(
                        abi.encodePacked(
                            /// @dev Prefix of the contract.
                            bytes1(0xff),
                            /// @dev Address of the factory contract.
                            address(this),
                            /// @dev Salt used to deploy the contract.
                            bytes32(_organizationId),
                            /// @dev Hash of the contract bytecode.
                            keccak256(
                                abi.encodePacked(
                                    type(BadgerOrganization).creationCode
                                )
                            )
                        )
                    ).fromLast20Bytes()
                )
            );
    }

    /**
     * See {IBadger-getOrganizationURI}.
     */
    function getOrganizationURI() public view virtual returns (string memory) {
        /// @dev Retrieve the value from the hotslot.
        return organization.uri;
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
}
