// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

/// @dev Core dependencies.
import {BadgerManager} from "./BadgerManager.sol";
import {BadgerOrganization} from "../BadgerOrganization.sol";

/**
 * @dev Implements the ability for individuals to claim Badges with an open
 *      link to the Organization.
 * @author CHANCE (@nftchance)
 * @author masonthechain (@masonthechain)
 */
contract BadgerManagerClaimable is BadgerManager {
    ////////////////////////////////////////////////////////
    ///                      STATE                       ///
    ////////////////////////////////////////////////////////

    /// @dev The schema used for the config method.
    string public constant override CONFIG_SCHEMA = "uint256,uint256";

    /// @dev Keep track of the amount of the Badge to mint with each claim.
    mapping(address => mapping(uint256 => uint256)) public amounts;

    ////////////////////////////////////////////////////////
    ///                     SETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * See {IBadgerConfigured-config}.
     */
    function config(bytes calldata _data) public virtual {
        /// @dev Decode the config data forwarded from the Organization.
        (uint256 _id, uint256 _amount) = abi.decode(_data, (uint256, uint256));

        require(
            _amount != 0,
            "BadgerManagerClaimable::config: Amount must be greater than zero."
        );

        /// @dev Set the amount of the Badge to mint with each claim.
        amounts[msg.sender][_id] = _amount;
    }

    /**
     * @dev Sets a new Badge as an open claim.
     * @param _targetOrganization The Organization to mint the Badge for.
     * @param _id The ID of the Badge to mint.
     * @param _data The data to pass to the mint method.
     */
    function mint(
        address _targetOrganization,
        uint256 _id,
        bytes calldata _data
    ) external {
        /// @dev Mint a new badge for the organization.
        BadgerOrganization(_targetOrganization).mint(
            msg.sender,
            _id,
            amounts[msg.sender][_id],
            _data
        );
    }
}
