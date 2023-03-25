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

/**
 * @dev BadgerOrganizationLogic contains the back-end logic of a Badger Organization.
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

    /// @dev The URI for the Organization/contract.
    string public organizationURI;

    /// @dev Mapping from token ID to Badge
    mapping(uint256 => string) public uris;

    /// @dev Whether or not the Organization is archived.
    mapping(bytes32 => bool) public archived;

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
    function initialize(
        Organization calldata _organization
    ) external initializer {
        /// @dev Initialize ERC1155.
        __ERC1155_init(_organization.uri);

        /// @dev Transfer ownership to the deployer.
        _transferOwnership(_organization.deployer);

        /// @dev Set the contract URI.
        _setOrganizationURI(_organization.organizationURI);
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
            "BadgerOrganizationLogic::onlyOrganizationManager: Only the Owner or Organization Manager can call this."
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
            "BadgerOrganizationLogic::onlyBadgeManager: Only Managers can call this."
        );
        _;
    }

    ////////////////////////////////////////////////////////
    ///                     SETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * See {IBadgerOrganizationLogic.setOrganizationURI}
     */
    function setOrganizationURI(
        string memory _uri
    ) public virtual override onlyOrganizationManager {
        /// @dev Confirm a valid URI was provided.
        require(
            bytes(_uri).length != 0,
            "BadgerOrganizationLogic::setOrganizationURI: URI must be set."
        );

        /// @dev Set the URI of the Organization.
        _setOrganizationURI(_uri);
    }

    /**
     * See {IBadgerOrganizationLogic.setBadgeURI}
     */
    function setBadgeURI(
        uint256 _id,
        string memory _uri
    ) public virtual override onlyBadgeManager(_id) {
        /// @dev Confirm a valid URI was provided.
        require(
            bytes(_uri).length != 0,
            "BadgerOrganizationLogic::setBadgeURI: URI must be set."
        );

        /// @dev Set the URI of the Badge.
        _setBadgeURI(_id, _uri);
    }

    /**
     * See {IBadgerOrganizationLogic.setArchived}
     */
    function setArchived(
        bool _isArchived
    ) public virtual override onlyOrganizationManager {
        /// @dev Set the archived state of the Organization.
        archived[_managerHash(address(this))] = _isArchived;

        /// @dev Emit the archived event.
        emit OrganizationArchived(_isArchived);
    }

    /**
     * See {IBadgerOrganizationLogic.setArchived}
     */
    function setArchived(
        uint256 _id,
        bool _isArchived
    ) public virtual override onlyBadgeManager(_id) {
        /// @dev Set the archived state of the Badge.
        archived[_badgeManagerHash(_id, address(this))] = _isArchived;

        /// @dev Emit the archived event.
        emit BadgeArchived(_id, _isArchived);
    }

    /**
     * See {IBadgerOrganizationLogic.setManagers}
     */
    function setManagers(
        address[] calldata _managers,
        bool[] calldata _isManager
    ) public virtual override onlyOwner {
        /// @dev Load the stack.
        uint256 i;
        uint256 managersLength = _managers.length;
        address manager;

        require(
            managersLength == _isManager.length,
            "BadgerOrganizationLogic::setManagers: _managers and _isManager must be the same length."
        );

        /// @dev Loop through the arrays and update the state of the Managers.
        for (i; i < managersLength; i++) {
            /// @dev Load the loop stack.
            manager = _managers[i];

            /// @dev Confirm a valid address was provided.
            require(
                manager != address(0),
                "BadgerOrganizationLogic::setManagers: Manager cannot be the zero address."
            );

            /// @dev Update the state of the Manager for the Organization.
            _setManager(manager, _isManager[i]);
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
        /// @dev Load the stack.
        uint256 i;
        uint256 managersLength = _managers.length;
        address manager;

        require(
            managersLength == _isManager.length,
            "BadgerOrganizationLogic::setManagers: _managers and _isManager must be the same length."
        );

        /// @dev Loop through the arrays and update the state of the Managers.
        for (i; i < managersLength; i++) {
            /// @dev Load the loop stack.
            manager = _managers[i];

            /// @dev Confirm a valid address was provided.
            require(
                manager != address(0),
                "BadgerOrganizationLogic::setManagers: Manager cannot be the zero address."
            );

            /// @dev Update the state of the Manager for the Badge.
            _setManager(_id, manager, _isManager[i]);
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
        /// @dev Load the stack.
        uint256 i;
        uint256 hooksLength = _hooks.length;
        address hook;

        require(
            hooksLength == _isHook.length,
            "BadgerOrganizationLogic::setHooks: _hooks and _isHook must be the same length."
        );

        /// @dev Loop through the arrays and update the state of the Hooks.
        for (i; i < hooksLength; i++) {
            /// @dev Load the loop stack.
            hook = _hooks[i];

            /// @dev Confirm a valid address was provided.
            require(
                hook != address(0),
                "BadgerOrganizationLogic::setHooks: Hook cannot be the zero address."
            );

            /// @dev Update the state of the Hook for the Organization.
            _setHook(_slot, hook, _isHook[i]);
        }
    }

    /**
     * See {IBadgerOrganizationLogic.configManager}
     */
    function configManager(
        address _manager,
        bytes calldata _config
    ) public virtual override onlyOrganizationManager {
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
    function isOrganizationManager(
        address _address
    ) public view virtual override returns (bool) {
        /// @dev Determine if the address is an Organization Manager.
        return _isOrganizationManager(_address);
    }

    /**
     * See {IBadgerOrganizationLogic.isBadgeManager}
     */
    function isBadgeManager(
        uint256 _id,
        address _address
    ) public view virtual override returns (bool) {
        /// @dev Determine if the address is a Badge Manager.
        return _isBadgeManager(_id, _address);
    }

    /**
     * See {ERC165-supportsInterface}
     */
    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override returns (bool) {
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
    function _isOrganizationManager(
        address _address
    ) internal view virtual returns (bool) {
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
    function _isBadgeManager(
        uint256 _id,
        address _address
    ) internal view virtual returns (bool) {
        /// @dev Confirm that the address is either a Manager of the Organization or
        ///      a Manager of the Badge.
        return (_isOrganizationManager(_address) ||
            managerKeyToIsManager[_badgeManagerHash(_id, _address)]);
    }
}
