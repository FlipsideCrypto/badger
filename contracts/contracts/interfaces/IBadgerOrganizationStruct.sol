// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

interface IBadgerOrganizationStruct {
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
}
