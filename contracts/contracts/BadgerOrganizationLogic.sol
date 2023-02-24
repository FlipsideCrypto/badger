// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

/// @dev Factory input.
import {Badger} from "./Badger.sol";

/// @dev Core dependencies.
import {IBadgerOrganizationLogic} from "./interfaces/IBadgerOrganizationLogic.sol";
import {BadgerManaged} from "./managers/BadgerManaged.sol";
import {BadgerHooked} from "./hooks/BadgerHooked.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {ERC1155Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";

/// @dev Configuration dependencies.
import {IBadgerConfigured} from "./interfaces/IBadgerConfigured.sol";

/**
 * @dev BadgerScout contains the back-end logic of a Badger Organization.
 * @author CHANCE (@nftchance)
 * @author masonthechain (@masonthechain)
 */
contract BadgerOrganizationLogic is
    IBadgerOrganizationLogic,
    BadgerHooked,
    BadgerManaged,
    OwnableUpgradeable,
    ERC1155Upgradeable
{
    ////////////////////////////////////////////////////////
    ///                      STATE                       ///
    ////////////////////////////////////////////////////////

    /// @dev The name of the contract.
    string public name;

    /// @dev The symbol of the contract.
    string public symbol;

    /// @dev The URI for the Organization/contract.
    string public organizationURI;

    /// @dev Mapping from token ID to Badge
    mapping(uint256 => string) public uris;

    ////////////////////////////////////////////////////////
    ///               BLOCKING CONSTRUCTOR               ///
    ////////////////////////////////////////////////////////

    constructor() {
        _disableInitializers();
    }

    ////////////////////////////////////////////////////////
    ///                   INITIALIZER                    ///
    ////////////////////////////////////////////////////////

    /**
     * @notice Initialize the BadgerOrganizationLogic contract.
     * @param _organization The Organization struct.
     */
    function initialize(Organization calldata _organization)
        public
        virtual
        initializer
    {
        /// @dev Initialize ERC1155.
        __ERC1155_init(_organization.uri);

        /// @dev Initialize Ownable.
        __Ownable_init();

        /// @dev Transfer ownership to the deployer.
        transferOwnership(_organization.deployer);

        /// @dev Set the contract URI.
        _setOrganizationURI(_organization.organizationURI);

        /// @dev Set the immutable name and symbol of the contract.
        name = _organization.name;
        symbol = _organization.symbol;
    }

    ////////////////////////////////////////////////////////
    ///                    MODIFIERS                     ///
    ////////////////////////////////////////////////////////

    /**
     * @notice Confirm that only the Owner or an Organization Manager passes.
     */
    modifier onlyOrganizationManager() {
        require(
            _isOrganizationManager(_msgSender()),
            "BadgerScout::onlyOrganizationManager: Only the Owner or Organization Manager can call this."
        );
        _;
    }

    /**
     * @notice Confirm that only a Manager of a Badge passes.
     * @param _id The id of the Badge being accessed.
     */
    modifier onlyBadgeManager(uint256 _id) {
        require(
            _isBadgeManager(_id, _msgSender()),
            "BadgerScout::onlyBadgeManager: Only Managers can call this."
        );
        _;
    }

    ////////////////////////////////////////////////////////
    ///                     SETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * See {IBadgerOrganizationLogic.setOrganizationURI}
     */
    function setOrganizationURI(string memory _uri)
        public
        virtual
        override
        onlyOrganizationManager
    {
        /// @dev Confirm a valid URI was provided.
        require(
            bytes(_uri).length > 0,
            "BadgerScout::setOrganizationURI: URI must be set."
        );

        /// @dev Set the URI of the Organization.
        _setOrganizationURI(_uri);
    }

    /**
     * See {IBadgerOrganizationLogic.setBadgeURI}
     */
    function setBadgeURI(uint256 _id, string memory _uri)
        public
        virtual
        override
        onlyBadgeManager(_id)
    {
        /// @dev Confirm a valid URI was provided.
        require(
            bytes(_uri).length > 0,
            "BadgerScout::setBadgeURI: URI must be set."
        );

        /// @dev Set the URI of the Badge.
        _setBadgeURI(_id, _uri);
    }

    /**
     * See {IBadgerOrganizationLogic.setManagers}
     */
    function setManagers(
        address[] calldata _managers,
        bool[] calldata _isManager
    ) public virtual override onlyOwner {
        /// @dev Confirm the arrays provided are of the same length.
        require(
            _managers.length == _isManager.length,
            "BadgerScout::setManagers: _managers and _isManager must be the same length."
        );

        /// @dev Load the stack.
        uint256 i;
        bytes32 managerHash;

        /// @dev Loop through the arrays and update the state of the Managers.
        for (i; i < _managers.length; i++) {
            /// @dev Calculate the hash for the Organization Manager.
            managerHash = _managerHash(_managers[i]);

            /// @dev Update the state of the Manager for the Organization.
            _setManager(managerHash, _isManager[i]);
        }
    }

    /**
     * See {IBadgerOrganizationLogic.setManagers}
     */
    function setManagers(
        uint256 _id,
        address[] calldata _managers,
        bool[] calldata _isManager
    ) public virtual override onlyOrganizationManager {
        /// @dev Confirm the arrays provided are of the same length.
        require(
            _managers.length == _isManager.length,
            "BadgerScout::setManagers: _managers and _isManager must be the same length."
        );

        /// @dev Load the stack.
        uint256 i;
        bytes32 managerHash;

        /// @dev Loop through the arrays and update the state of the Managers.
        for (i; i < _managers.length; i++) {
            /// @dev Calculate the hash for the Organization Manager.
            managerHash = _badgeManagerHash(_id, _managers[i]);

            /// @dev Update the state of the Manager for the Badge.
            _setManager(managerHash, _isManager[i]);
        }
    }

    /**
     * See {IBadgerOrganizationLogic.setHooks}
     */
    function setHooks(
        bytes32 _slot,
        address[] calldata _hooks,
        bool[] calldata _isHook
    ) public virtual override onlyOrganizationManager {
        /// @dev Confirm the arrays provided are of the same length.
        require(
            _hooks.length == _isHook.length,
            "BadgerScout::setHooks: _hooks and _isHook must be the same length."
        );

        /// @dev Load the stack.
        uint256 i;

        /// @dev Loop through the arrays and update the state of the Hooks.
        for (i; i < _hooks.length; i++) {
            /// @dev Update the state of the Hook for the Organization.
            _setHook(_slot, _hooks[i], _isHook[i]);
        }
    }

    /**
     * See {IBadgerOrganizationLogic.configManager}
     */
    function configManager(address _manager, bytes calldata _config)
        public
        virtual
        override
        onlyOrganizationManager
    {
        /// @dev Configure the Organization manager.
        _configManager(_manager, _managerHash(_manager), _config);
    }

    /**
     * See {IBadgerOrganizationLogic.configManager}
     */
    function configManager(
        uint256 _id,
        address _manager,
        bytes calldata _config
    ) public virtual override onlyBadgeManager(_id) {
        /// @dev Configure the Badge manager.
        _configManager(_manager, _badgeManagerHash(_id, _manager), _config);
    }

    /**
     * See {IBadgerOrganizationLogic.configHook}
     */
    function configHook(
        bytes32 _slot,
        address _slotHook,
        bytes calldata _config
    ) public virtual override onlyOrganizationManager {
        /// @dev Configure the Organization hook.
        _configHook(_slotHook, _slot, _config);
    }

    ////////////////////////////////////////////////////////
    ///                     GETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * See {IBadgerOrganizationLogic.isOrganizationManager}
     */
    function isOrganizationManager(address _address)
        public
        view
        virtual
        override
        returns (bool)
    {
        /// @dev Determine if the address is an Organization Manager.
        return _isOrganizationManager(_address);
    }

    /**
     * See {IBadgerOrganizationLogic.isBadgeManager}
     */
    function isBadgeManager(uint256 _id, address _address)
        public
        view
        virtual
        override
        returns (bool)
    {
        /// @dev Determine if the address is a Badge Manager.
        return _isBadgeManager(_id, _address);
    }

    /**
     * See {ERC165-supportsInterface}
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override
        returns (bool)
    {
        return
            interfaceId == type(IBadgerOrganizationLogic).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    ////////////////////////////////////////////////////////
    ///                 INTERNAL SETTERS                 ///
    ////////////////////////////////////////////////////////

    /**
     * @notice Allows the Owner of the contract to update the Organization URI.
     * @param _uri The new URI for the Organization.
     */
    function _setOrganizationURI(string memory _uri) internal virtual {
        /// @dev Establish the URI used for the contract (Organization) metadata.
        organizationURI = _uri;

        /// @dev Announce the URI change.
        emit OrganizationUpdated(_uri);
    }

    /**
     * @notice Sets the URI for the Badge and emits event that URI was updated.
     * @param _id The ID of the Badge.
     * @param _uri The URI of the Badge.
     */
    function _setBadgeURI(uint256 _id, string memory _uri) internal virtual {
        /// @dev Set the URI of the Badge.
        uris[_id] = _uri;

        /// @dev Announce the URI change for ERC1155 compliance.
        emit URI(_uri, _id);
    }

    /**
     * @notice Runs enforcement logic before minting a token beyond the
     *         primary implementation of permissions.
     * @dev Enables things such as Total Supply, Responsive Capacity, Etc.
     * @param _operator The address of the operator.
     * @param _to The address of the user.
     * @param _id The id of the Badge.
     * @param _amount The amount of the Badge to mint.
     */
    function _mint(
        address _operator,
        address _to,
        uint256 _id,
        uint256 _amount,
        bytes memory _data
    ) internal virtual {
        /// @dev Before minting, process any Organization hooks.
        _hook(BEFORE_MINT, abi.encode(_operator, _to, _id, _amount, _data));

        /// @dev Mint the Badge to the user.
        ERC1155Upgradeable._mint(_to, _id, _amount, _data);
    }

    /**
     * @notice Revoke a Badge from a user.
     * @dev Enables the ability to have condition specific revocation logic such as
     *      a time based revocation or preventing the act of all together.
     * @param _from The address of the user.
     * @param _id The id of the Badge.
     * @param _amount The amount of the Badge to revoke.
     */
    function _revoke(
        address _operator,
        address _from,
        uint256 _id,
        uint256 _amount
    ) internal virtual {
        /// @dev Before minting, process any Organization hooks.
        _hook(BEFORE_REVOKE, abi.encode(_operator, _from, _id, _amount));

        /// @dev Revoke the Badge from the user.
        ERC1155Upgradeable._burn(_from, _id, _amount);
    }

    /**
     * @notice Burn the Badge from the user.
     * @dev Enables the ability run exogenous logic before forfeiting a Badge.
     * @param _from The address of the user.
     * @param _id The id of the Badge.
     * @param _amount The amount of the Badge to burn.
     */
    function _forfeit(
        address _from,
        uint256 _id,
        uint256 _amount
    ) internal virtual {
        /// @dev Before revoking, process any Organization hooks.
        _hook(BEFORE_FORFEIT, abi.encode(_from, _id, _amount));

        /// @dev Burn the Badge held by the user.
        ERC1155Upgradeable._burn(_from, _id, _amount);
    }

    /**
     * See {ERC1155._beforeTokenTransfer}
     * @dev Enables the ability to have modules such as Account Bound, etc.
     */
    function _beforeTokenTransfer(
        address _operator,
        address _from,
        address _to,
        uint256[] memory _ids,
        uint256[] memory _amounts,
        bytes memory _data
    ) internal virtual override {
        /// @dev Before transferring, process any Organization hooks.
        _hook(
            BEFORE_TRANSFER,
            abi.encode(_operator, _from, _to, _ids, _amounts, _data)
        );

        /// @dev Do not call the super as it is an empty function.
    }

    ////////////////////////////////////////////////////////
    ///                 INTERNAL GETTERS                 ///
    ////////////////////////////////////////////////////////

    /*
     * @notice Confirms whether this address is a Manager of the Organization or not.
     * @param _address The address of the Manager to check.
     * @return True if the address is a Manager of the Organization, false otherwise.
     */
    function _isOrganizationManager(address _address)
        internal
        view
        virtual
        returns (bool)
    {
        /// @dev Confirm that the address is either the Owner of the contract or
        ///      a Manager of the Organization.
        return (_address == owner() ||
            managerKeyToIsManager[_managerHash(_address)]);
    }

    /**
     * @notice Confirms whether this address is a Manager of the Badge or not.
     * @param _id The id of the Badge to check.
     * @param _address The address of the Manager to check.
     * @return True if the address is a Manager of the Badge or Organization, false otherwise.
     */
    function _isBadgeManager(uint256 _id, address _address)
        internal
        view
        virtual
        returns (bool)
    {
        /// @dev Confirm that the address is either a Manager of the Organization or
        ///      a Manager of the Badge.
        return (_isOrganizationManager(_address) ||
            managerKeyToIsManager[_badgeManagerHash(_id, _address)]);
    }

    /**
     * @notice Calculates the hash that would be used for this sender pointer reference.
     * @param _manager The address of the alleged Manager.
     * @return The hash of the Manager.
     */
    function _managerHash(address _manager) internal pure returns (bytes32) {
        /// @dev Build the hash of the Manager.
        return keccak256(abi.encode(_manager));
    }

    /**
     * @notice Calculates the hash that would be used for this sender pointer reference.
     * @param _id The id of the Badge.
     * @param _manager The address of the alleged Manager.
     * @return The hash of the Manager.
     */
    function _badgeManagerHash(uint256 _id, address _manager)
        internal
        pure
        returns (bytes32)
    {
        /// @dev Build the hash of the Manager.
        return keccak256(abi.encode(_id, _manager));
    }
}
