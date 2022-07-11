// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import { ERC1155 } from "../ERC1155/ERC1155.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

import { Clones } from "@openzeppelin/contracts/proxy/Clones.sol";

contract Badger is 
    Ownable
{
    using Clones for address;

    /*//////////////////////////////////////////////////////////////
                        SET DEPLOYMENT SETTINGS
    //////////////////////////////////////////////////////////////*/

    uint256 public version;
    address public masterContract;
    uint256 public badgerSets = 1;
    
    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    event MasterContractUpdated(
          address indexed oldMasterContract
        , address indexed newMasterContract
    );
    
    event NewSetCreated(
          address indexed master
        , address indexed setAddress
    );

    /*//////////////////////////////////////////////////////////////
                              CONSTRUCTOR 
    //////////////////////////////////////////////////////////////*/

    constructor(
        address _masterContract
    ) {
        setMasterContract(_masterContract);
    }

    /*//////////////////////////////////////////////////////////////
                        BADGE SET CONTROL LOGIC 
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Controls which contract is used as the factory foundation.
     * @param _masterContract The address of the new BadgeSet factory.
     * 
     * Requires:
     * - Only the owner of Badger protocol can update this.
     */
    function setMasterContract(
        address _masterContract
    ) 
        internal
        onlyOwner()
    {
        require(masterContract != _masterContract, "Badger: Same master");

        emit MasterContractUpdated(masterContract, _masterContract);

        masterContract = _masterContract;

        unchecked {
            version += 1;
            badgerSets = 1;     // Reset the salt
        }
    }

    /**
     * @notice Determines the address that this contract would be deployed 
     *         to when using a clone and the active salt.
     * @param salt The 'randomness' effect applied to the deployment.
     * @return Address of the future organization when deployed using the 
     *         provided salt.
     */
    function getSetAddress(
        bytes32 salt
    )
        public
        view
        returns (
            address
        )
    {
        require(masterContract != address(0), "Badger: Invalid master");
        return masterContract.predictDeterministicAddress(salt);
    }

    /**
     * @notice Allows any user to permissionlessly deploy a new Badge Set.
     */
    function deploySet()
        public
        virtual
    {
        bytes32 salt = bytes32(badgerSets);

        masterContract.cloneDeterministic(salt);

        address set_address = getSetAddress(salt);

        unchecked {
            badgerSets += 1;
        }

        emit NewSetCreated(_msgSender(), set_address);
    }

    /**
     * @notice Admin function in case of address collision to progress salt.
     * @dev The odds of this being needed are monumentally low however 
     *      this is in place for raw protection.
     */
    function forceBadgerNonce(
        uint256 _diff
    )
        public
        onlyOwner()
    {
        unchecked {
            badgerSets += _diff;
        }
    }
}