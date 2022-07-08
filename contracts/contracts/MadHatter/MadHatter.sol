// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import { ERC1155 } from "../ERC1155/ERC1155.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

import { Clones } from "@openzeppelin/contracts/proxy/Clones.sol";

contract MadHatter is 
    Ownable
{
    using Clones for address;

    /*//////////////////////////////////////////////////////////////
                        ORG DEPLOYMENT SETTINGS
    //////////////////////////////////////////////////////////////*/

    uint256 public version;
    address public orgMaster;
    uint256 public hatterOrgs = 1;
    
    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    event MasterOrgUpdated(
          address indexed oldOrgMaster
        , address indexed newOrgMaster
    );
    
    event OrgCreated(
          address indexed orgMaster
        , address indexed orgAddress
    );

    /*//////////////////////////////////////////////////////////////
                              CONSTRUCTOR 
    //////////////////////////////////////////////////////////////*/

    constructor(
        address _orgMaster
    ) {
        setOrgMaster(_orgMaster);
    }

    /*//////////////////////////////////////////////////////////////
                            ORG CONTROL LOGIC 
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Controls which contract is used as the factory foundation.
     * @param _orgMaster The address of the new Organization factory.
     * 
     * Requires:
     * - Only the owner of MadHatter protocol can update this.
     */
    function setOrgMaster(
        address _orgMaster
    ) 
        internal
        onlyOwner()
    {
        require(orgMaster != _orgMaster, "MadHatter: Same master");

        emit MasterOrgUpdated(orgMaster, _orgMaster);

        orgMaster = _orgMaster;

        unchecked {
            version += 1;
            hatterOrgs = 1;     // Reset the salt
        }
    }

    /**
     * @notice Determines the address that this contract would be deployed 
     *         to when using a clone and the active salt.
     * @param salt The 'randomness' effect applied to the deployment.
     * @return Address of the future organization when deployed using the 
     *         provided salt.
     */
    function getOrgAddress(
        bytes32 salt
    )
        public
        view
        returns (
            address
        )
    {
        require(orgMaster != address(0), "MadHatter: Invalid master");
        return orgMaster.predictDeterministicAddress(salt);
    }

    /**
     * @notice Allows any user to permissionlessly deploy a new org.
     */
    function deployOrg()
        public
        virtual
    {
        bytes32 salt = bytes32(hatterOrgs);

        orgMaster.cloneDeterministic(salt);

        address org = getOrgAddress(salt);

        unchecked {
            hatterOrgs += 1;
        }

        emit OrgCreated(_msgSender(), org);
    }

    /**
     * @notice Admin function in case of address collision to progress salt.
     * @dev The odds of this being needed are monumentally low however 
     *      this is in place for raw protection.
     */
    function forceOrgNonce(
        uint256 _diff
    )
        public
        onlyOwner()
    {
        unchecked {
            hatterOrgs += _diff;
        }
    }
}