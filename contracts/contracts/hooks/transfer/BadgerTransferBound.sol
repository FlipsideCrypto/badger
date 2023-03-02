// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

/// @dev Core dependencies.
import {BadgerTransferHook} from "../types/BadgerTransferHook.sol";

/**
 * @dev Transfer module that enforces accountBound logic.
 * @author CHANCE (@nftchance)
 * @author masonthechain (@masonthechain)
 */
contract BadgerTransferBound is BadgerTransferHook {
    ////////////////////////////////////////////////////////
    ///                      STATE                       ///
    ////////////////////////////////////////////////////////

    /// @dev The schema used for the config method.
    string public constant override CONFIG_SCHEMA = "uint256,bool";

    /// @dev Mapping of token addresses to accountBound status.
    mapping(address => mapping(uint256 => bool)) public accountBound;

    ////////////////////////////////////////////////////////
    ///                     SETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * See {IBadgerHook-config}.
     */
    function config(bytes calldata _data) public virtual override {
        /// @dev Decode the configuration data forwarded from the Organization.
        (uint256 _id, bool _accountBound) = abi.decode(_data, (uint256, bool));

        /// @dev Set the accountBound status for the token.
        accountBound[msg.sender][_id] = _accountBound;
    }

    /**
     * See {IBadgerHook-execute}.
     */
    function execute(bytes calldata _data) public virtual override {
        /// @dev Decode the transfer data forwarded from the Organization.
        (, address _from, address _to, uint256[] memory _ids, , ) = abi.decode(
            _data,
            (address, address, address, uint256[], uint256[], bytes)
        );

        /// @dev Load the stack.
        uint256 i;
        uint256 idsLength = _ids.length;
        bool isZero = _from == address(0) || _to == address(0);

        /// @dev Loop through all of the tokens moving.
        for (i; i < idsLength; i++) {
            /// @dev Require the transfer to be from or to the zero address.
            require(
                isZero ||
                    !accountBound[msg.sender][_ids[i]],
                "BadgerTransferBound::execute: Invalid permission to transfer token."
            );
        }
    }
}