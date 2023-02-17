// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

/// @dev Core dependencies.
import {IBadgerOrganization} from "./interfaces/IBadgerOrganization.sol";
import {BadgerScout} from "./BadgerScout.sol";

/**
 * @dev Badger Organizations are localized ecosystems of members, managers and
 *      badges. With a system of harmonious management, on-chain Organizations
 *      can unlock the power of secure permission systems and access policies
 *      by minting ERC1155 Badges to their members.
 * @author CHANCE (@nftchance)
 * @author masonthechain (@masonthechain)
 */
contract BadgerOrganization is IBadgerOrganization, BadgerScout {
    ////////////////////////////////////////////////////////
    ///                   CONSTRUCTOR                    ///
    ////////////////////////////////////////////////////////

    constructor() BadgerScout() {}

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
        _mint(_to, _id, _amount, _data);
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
        _validateLengths(_tos.length, _amounts.length);

        /// @dev Load the stack.
        uint256 i;

        /// @dev Mint the badge to all of the recipients with their given amount.
        for (i; i < _tos.length; i++) {
            /// @dev Mint the badges to the users.
            _mint(_tos[i], _id, _amounts[i], _data);
        }
    }

    /**
     * @notice Allows Organization and Badge Managers to batch mint Badges.
     * @dev This is an extremely gassy and bad implementation of batch processing
     *      for Ethereum mainnet. However, because many organizations do not live on ETH
     *      this function enables the user a simpler front-end experience.
     * @dev If you are minting through a custom contract. Recommended usage is
     *      to use the `mintBatch` function instead by doing 1 Badge at a time.
     * @param _tos The addresses to mint the Badge to.
     * @param _ids The ids of the Badges to mint.
     * @param _amounts The amounts of the Badges to mint.
     *
     * Requirements:
     * - `_tos`, `_ids`, and `_amounts` must be the same length.
     * - `_msgSender` must be a Manager of the Badge or Organization.
     */
    function mintFullBatch(
        address[] memory _tos,
        uint256[] memory _ids,
        uint256[] memory _amounts,
        bytes memory _data
    ) external virtual {
        /// @dev Make sure that the supplied arrays are equal in length.
        _validateLengths(_tos.length, _ids.length, _amounts.length);

        /// @dev Load the stack.
        uint256 i;
        uint256 id;

        /// @dev Mint the Badge to all of the recipients with their given amount.
        for (i; i < _tos.length; i++) {
            id = _ids[i];

            /// @dev Make sure the user has permission to mint this Badge.
            require(
                _isBadgeManager(id, _msgSender()),
                "BadgerOrganization::mintFullBatch: Only a Manager of the Badge can mint."
            );

            /// @dev Mint the Badges to the users.
            _mint(_tos[i], id, _amounts[i], _data);
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
        _burn(_from, _id, _amount);
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
        _validateLengths(_froms.length, _amounts.length);

        /// @dev Load the stack.
        uint256 i;

        /// @dev Revoke the Badge from all of the recipients with their given amount.
        for (i; i < _froms.length; i++) {
            /// @dev Revoke the Badge from the user.
            _burn(_froms[i], _id, _amounts[i]);
        }
    }

    /**
     * @notice Allows Organization and Badge Managers to revoke Badges from a user.
     * @dev This is an extremely gassy and bad implementation of batch processing
     *      for Ethereum mainnet. However, because many organizations do not live on ETH
     *      this function enables the user a simpler front-end experience.
     * @dev If you are revoking through a custom contract. Recommended usage is
     *      to use the `revokeBatch` function instead.
     * @param _froms The addresses to revoke the Badge from.
     * @param _ids The id of the Badge to revoke.
     * @param _amounts The amount of the Badge to revoke.
     *
     * Requirements:
     * - `_tos`, `_ids`, and `_amounts` must be the same length.
     * - `_msgSender` must be a Manager of the Badge or Organization.
     */
    function revokeFullBatch(
        address[] memory _froms,
        uint256[] memory _ids,
        uint256[] memory _amounts
    ) external virtual {
        /// @dev Make sure that the supplied arrays are equal in length.
        _validateLengths(_froms.length, _ids.length, _amounts.length);

        /// @dev Load the stack.
        uint256 i;
        uint256 id;

        for (i; i < _froms.length; i++) {
            id = _ids[i];

            /// @dev Make sure the user has permission to revoke this Badge.
            require(
                _isBadgeManager(id, _msgSender()),
                "BadgerOrganization::revokeFullBatch: Only a Manager of the Badge can revoke."
            );

            /// @dev Revoke the badge from the user.
            _burn(_froms[i], _ids[i], _amounts[i]);
        }
    }

    /**
     * See {IBadgerOrganization.forfeit}
     */
    function forfeit(
        uint256 _id,
        uint256 _amount,
        bytes memory _data
    ) external virtual override {
        /// @dev Revoke the Badge from the user.
        _burn(_msgSender(), _id, _amount);
    }

    ////////////////////////////////////////////////////////
    ///                     GETTERS                      ///
    ////////////////////////////////////////////////////////

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
        string memory _uri = badges[_id].uri;

        /// @dev If a custom URI has been set for this Badge, return it.
        if (bytes(_uri).length > 0) {
            return _uri;
        }

        /// @dev Use the default base URI with the token id added.
        return super.uri(_id);
    }

    /**
     * @notice Returns the metadata URI for the Organization.
     * @return The metadata URI for the Organization.
     */
    function contractURI() public view returns (string memory) {
        return organizationURI;
    }
}
