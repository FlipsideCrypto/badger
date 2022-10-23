// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import { BadgerExecutor } from "./BadgerExecutor.sol";

contract BadgerModules is 
    BadgerExecutor 
{ 

    /*//////////////////////////////////////////////////////////////
                           MODULE STATE
    //////////////////////////////////////////////////////////////*/

    address internal constant SENTINEL_MODULES = address(0x1);

    mapping(address => address) internal modules;

    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    event EnabledModule(address module);

    event DisabledModule(address module);

    event ExecutionFromModuleSuccess(address indexed module);

    event ExecutionFromModuleFailure(address indexed module);

    /*//////////////////////////////////////////////////////////////
                              MODIFIERS
    //////////////////////////////////////////////////////////////*/

    modifier authorized() {
        // This is a function call as it minimized the bytecode size
        require(msg.sender == address(this), "GS031");
        _;
    }

    /*//////////////////////////////////////////////////////////////
                                SETTERS
    //////////////////////////////////////////////////////////////*/

    function setupModules(
          address to
        , bytes memory data
    ) 
        internal {
        require(
              modules[SENTINEL_MODULES] == address(0)
            , "GS100"
        );
        
        modules[SENTINEL_MODULES] = SENTINEL_MODULES;
        if (to != address(0))
            // Setup has to complete successfully or transaction fails.
            require(
                execute(
                        to
                      , 0
                      , data
                      , Enum.Operation.DelegateCall
                      , gasleft()
                  )
                , "GS000");
    }

    /// @dev Allows to add a module to the whitelist.
    ///      This can only be done via a Safe transaction.
    /// @notice Enables the module `module` for the Safe.
    /// @param module Module to be whitelisted.
    function enableModule(address module) 
        public 
        authorized 
    {
        // Module address cannot be null or sentinel.
        require(
              module != address(0) && module != SENTINEL_MODULES
            , "GS101"
        );

        // Module cannot be added twice.
        require(
              modules[module] == address(0)
            , "GS102"
        );
        
        modules[module] = modules[SENTINEL_MODULES];
        modules[SENTINEL_MODULES] = module;
        
        emit EnabledModule(module);
    }

    /// @dev Allows to remove a module from the whitelist.
    ///      This can only be done via a Safe transaction.
    /// @notice Disables the module `module` for the Safe.
    /// @param prevModule Module that pointed to the module to be removed in the linked list
    /// @param module Module to be removed.
    function disableModule(
          address prevModule
        , address module
    ) 
        public 
        authorized 
    {
        // Validate module address and check that it corresponds to module index.
        require(
              module != address(0) && module != SENTINEL_MODULES
            , "GS101"
        );
        
        require(
              modules[prevModule] == module
            , "GS103"
        );
        
        modules[prevModule] = modules[module];
        modules[module] = address(0);
        
        emit DisabledModule(module);
    }

    /// @dev Allows a Module to execute a Safe transaction without any further confirmations.
    /// @param to Destination address of module transaction.
    /// @param value Ether value of module transaction.
    /// @param data Data payload of module transaction.
    /// @param operation Operation type of module transaction.
    function execTransactionFromModule(
        address to,
        uint256 value,
        bytes memory data,
        Enum.Operation operation
    ) 
        public 
        virtual 
        returns (
            bool success
        ) 
    {
        // Only whitelisted modules are allowed.
        require(
              msg.sender != SENTINEL_MODULES && modules[msg.sender] != address(0)
            , "GS104"
        );
        
        // Execute transaction without further confirmations.
        success = execute(
              to
            , value
            , data
            , operation
            , gasleft()
        );
        
        if (success) emit ExecutionFromModuleSuccess(msg.sender);
        else emit ExecutionFromModuleFailure(msg.sender);
    }

    /// @dev Allows a Module to execute a Safe transaction without any further confirmations and return data
    /// @param to Destination address of module transaction.
    /// @param value Ether value of module transaction.
    /// @param data Data payload of module transaction.
    /// @param operation Operation type of module transaction.
    function execTransactionFromModuleReturnData(
          address to
        , uint256 value
        , bytes memory data
        , Enum.Operation operation
    ) 
        public 
        returns (
              bool success
            , bytes memory returnData
        ) 
    {
        success = execTransactionFromModule(
              to
            , value
            , data
            , operation
        );

        // solhint-disable-next-line no-inline-assembly
        assembly {
            // Load free memory location
            let ptr := mload(0x40)
            // We allocate memory for the return data by setting the free memory location to
            // current free memory location + data size + 32 bytes for data size value
            mstore(0x40, add(ptr, add(returndatasize(), 0x20)))
            // Store the size
            mstore(ptr, returndatasize())
            // Store the data
            returndatacopy(add(ptr, 0x20), 0, returndatasize())
            // Point the return data to the correct memory location
            returnData := ptr
        }
    }

    /*//////////////////////////////////////////////////////////////
                                GETTERS
    //////////////////////////////////////////////////////////////*/

    /// @dev Returns if an module is enabled
    /// @param _module The address of the module to check the state of.
    /// @return True if the module is enabled
    function isModuleEnabled(address _module) 
        public 
        view 
        returns (
            bool
        ) 
    {
        return SENTINEL_MODULES != _module && modules[_module] != address(0);
    }

    /// @dev Returns array of modules up to the given page length.
    /// @param _head Start of the page in cursor linked list.
    /// @param _size Maximum number of modules that should be returned.
    /// @return array Array of modules.
    /// @return next Start of the next page.
    function getModulesPaginated(
          address _head
        , uint256 _size
    ) 
        external 
        view 
        returns (
              address[] memory array
            , address next
        ) 
    {
        // Init array with max page size
        array = new address[](_size);

        // Populate return array
        uint256 moduleCount = 0;
        address currentModule = modules[_head];

        /// @dev Loop through connected modules until end of page or end of list is reached.
        while (currentModule != address(0x0) && currentModule != SENTINEL_MODULES && moduleCount < _size) {
            array[moduleCount] = currentModule;
            currentModule = modules[currentModule];
            moduleCount++;
        }
        next = currentModule;

        // Set correct size of returned array
        // solhint-disable-next-line no-inline-assembly
        assembly {
            mstore(array, moduleCount)
        }
    }
}