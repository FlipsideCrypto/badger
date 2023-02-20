// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

/// @dev Core dependencies.
import {BadgerOrganizationHook} from "../BadgerOrganizationHook.sol";

/**
 * @dev Mint module that enforces self-operation logic only preventing
 *      a user from minting a token to another address.
 * @author CHANCE (@nftchance)
 * @author masonthechain (@masonthechain)
 */
contract BadgerMintSelf is BadgerOrganizationHook {
    ////////////////////////////////////////////////////////
    ///                      STATE                       ///
    ////////////////////////////////////////////////////////

    /// @dev Mapping of token addresses to accountBound status.
    mapping(address => mapping(uint256 => bool)) public selfOperated;

    ////////////////////////////////////////////////////////
    ///                     SETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * See {IBadgerHook-config}.
     */
    function config(bytes calldata _data) public virtual override {
        /// @dev Decode the configuration data forwarded from the Organization.
        (uint256 _id, bool _selfOperated) = abi.decode(_data, (uint256, bool));

        /// @dev Set the state of self-operation only for the token.
        selfOperated[msg.sender][_id] = _selfOperated;
    }

    /**
     * See {IBadgerHook-execute}.
     */
    function execute(bytes calldata _data) public virtual override {
        /// @dev Decode the transfer data forwarded from the Organization.
        (address _operator, address _to, uint256 _id, , ) = abi.decode(
            _data,
            (address, address, uint256, uint256, bytes)
        );

        /// @dev Determine if the Badge is self-operated.
        bool operatorManaged = selfOperated[msg.sender][_id] == false;

        require(
            _operator == _to || operatorManaged,
            "BadgerMintSelfOperated::execute: Only mint to self"
        );
    }
}
