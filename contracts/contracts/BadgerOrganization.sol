// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

/// @dev Core dependencies.
import {IBadgerOrganization} from "./interfaces/IBadgerOrganization.sol";
import {BadgerOrganizationLogic} from "./BadgerOrganizationLogic.sol";
import {Multicallable} from "solady/src/utils/Multicallable.sol";

/**
 * @dev Badger Organizations are localized ecosystems of members, managers and
 *      badges. With a system of harmonious management, on-chain Organizations
 *      can unlock the power of secure permission systems and access policies
 *      by minting ERC1155 Badges to their members.
 * @dev Explicit references to the `BadgerOrganizationLogic` contract are used
 *      to improve developer experience, readability and enable call traces.
 * @author CHANCE (@nftchance)
 * @author masonthechain (@masonthechain)
 */
contract BadgerOrganization is
    IBadgerOrganization,
    BadgerOrganizationLogic,
    Multicallable
{
    ////////////////////////////////////////////////////////
    ///                     SETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * See {IBadgerOrganization.mint}
     */
    function mint(
        address _to,
        uint256 _id,
        uint256 _amount,
        bytes memory _data
    ) external virtual override onlyBadgeManager(_id) {
        /// @dev Mint the Badge to the user.
        BadgerOrganizationLogic._mint(_msgSender(), _to, _id, _amount, _data);
    }

    /**
     * See {IBadgerOrganization.mintBatch}
     */
    function mintBatch(
        address[] memory _tos,
        uint256 _id,
        uint256[] memory _amounts,
        bytes memory _data
    ) external virtual override onlyBadgeManager(_id) {
        /// @dev Make sure that the supplied arrays are equal in length.
        require(
            _tos.length == _amounts.length,
            "BadgerOrganization::mintBatch: _tos and _amounts must be the same length."
        );

        /// @dev Load the stack.
        address operator = _msgSender();
        uint256 i;

        /// @dev Mint the badge to all of the recipients with their given amount.
        for (i; i < _tos.length; i++) {
            /// @dev Mint the badges to the users.
            BadgerOrganizationLogic._mint(
                operator,
                _tos[i],
                _id,
                _amounts[i],
                _data
            );
        }
    }

    /**
     * See {IBadgerOrganization.revoke}
     */
    function revoke(
        address _from,
        uint256 _id,
        uint256 _amount
    ) external virtual override onlyBadgeManager(_id) {
        /// @dev Revoke the Badge from the user.
        _revoke(_msgSender(), _from, _id, _amount);
    }

    /**
     * See {IBadgerOrganization.revokeBatch}
     */
    function revokeBatch(
        address[] memory _froms,
        uint256 _id,
        uint256[] memory _amounts
    ) external virtual override onlyBadgeManager(_id) {
        /// @dev Make sure that the supplied arrays are equal in length.
        require(
            _froms.length == _amounts.length,
            "BadgerOrganization::revokeBatch: _from and _amounts must be the same length."
        );

        /// @dev Load the stack.
        address operator = _msgSender();
        uint256 i;

        /// @dev Revoke the Badge from all of the recipients with their given amount.
        for (i; i < _froms.length; i++) {
            /// @dev Revoke the Badge from the user.
            _revoke(operator, _froms[i], _id, _amounts[i]);
        }
    }

    /**
     * See {IBadgerOrganization.forfeit}
     */
    function forfeit(
        uint256 _id,
        uint256 _amount,
        bytes memory
    ) external virtual override {
        /// @dev Revoke the Badge from the user.
        _forfeit(_msgSender(), _id, _amount);
    }

    ////////////////////////////////////////////////////////
    ///                     GETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * @notice Returns the metadata URI for the Organization.
     * @return The metadata URI for the Organization.
     */
    function contractURI() public view returns (string memory) {
        return organizationURI;
    }

    /**
     * See {ERC1155.uri}
     */
    function uri(uint256 _id)
        public
        view
        virtual
        override
        returns (string memory)
    {
        /// @dev Get the URI for the Badge.
        string memory _uri = uris[_id];

        /// @dev If a custom URI has been set for this Badge, return it.
        if (bytes(_uri).length > 0) {
            return _uri;
        }

        /// @dev Use the default base URI with the token id added.
        return super.uri(_id);
    }

    /**
     * See {ERC165-supportsInterface}
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override
        returns (bool)
    {
        return
            interfaceId == type(IBadgerOrganization).interfaceId ||
            super.supportsInterface(interfaceId);
    }
}
