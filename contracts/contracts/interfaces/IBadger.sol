// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

/// @dev Factory output.
import {BadgerOrganization} from "../BadgerOrganization/BadgerOrganization.sol";

interface IBadger {
    ////////////////////////////////////////////////////////
    ///                      SCHEMA                      ///
    ////////////////////////////////////////////////////////

    struct Organization {
        address deployer;
        string uri;
        string organizationURI;
        string name;
        string symbol;
    }

    ////////////////////////////////////////////////////////
    ///                     EVENTS                       ///
    ////////////////////////////////////////////////////////

    /// @dev Announce when a new organization has been deployed.
    event OrganizationCreated(
        BadgerOrganization indexed organization,
        address indexed owner,
        uint256 indexed organizationId
    );

    ////////////////////////////////////////////////////////
    ///                     SETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * @dev Deploy a new Badger Organization based on the provided `_organization`.
     * @param _organization The Organization struct containing the details of the new Organization.
     * @return badgerOrganization The newly deployed Organization contract.
     * @return organizationId The `organizationId` of the newly deployed Organization.
     */
    function createOrganization(Organization calldata _organization)
        external
        virtual
        returns (BadgerOrganization badgerOrganization, uint256 organizationId);

    ////////////////////////////////////////////////////////
    ///                     GETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * @dev Determine the address of an Organization contract given its `organizationId`.
     * @param _organizationId The `organizationId` of the Organization.
     * @return The Organization contract that is deployed on the provided `organizationId`.
     */
    function getOrganization(uint256 _organizationId)
        external
        view
        virtual
        returns (BadgerOrganization);

    /**
     * @dev Get the URI of the last deployed Organization.
     * @return The URI of the last deployed Organization.
     */
    function getOrganizationURI() external view virtual returns (string memory);
}
