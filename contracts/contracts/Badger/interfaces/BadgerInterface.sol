// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

interface BadgerInterface {
    /**
     * @notice Creates a new Organization while confirming that the proper funding has been provided.
     * @param _version The version of the Organization that is being created.
     * @param _deployer The address that will be the deployer of the Organization.
     * @param _uri The base URI for the token metadata.
     * @param _organizationURI The metadata of the Organization. (contractURI)
     * @param _name The name of the Organization.
     * @param _symbol The symbol of the Organization.
     * @return The address of the newly created Organization.
     */
    function createOrganization(
        uint256 _version,
        address _deployer,
        string memory _uri,
        string memory _organizationURI,
        string memory _name,
        string memory _symbol
    ) 
        external 
        returns (
            address
        );
}