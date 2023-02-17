// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

/// @dev Factory input.
import {Badger} from "./Badger.sol";

/// @dev Core dependencies.
import {IBadgerScout} from "./interfaces/IBadgerScout.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

/**
 * @dev BadgerScout contains the back-end logic of a Badger Organization.
 * @author CHANCE (@nftchance)
 * @author masonthechain (@masonthechain)
 */
contract BadgerScout is IBadgerScout, Ownable, ERC1155 {
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
    mapping(uint256 => Badge) public badges;

    /// @dev Tracking the Managers of a Badge.
    mapping(bytes32 => bool) public managerKeyToIsManager;

    ////////////////////////////////////////////////////////
    ///                   CONSTRUCTOR                    ///
    ////////////////////////////////////////////////////////

    constructor() ERC1155(Badger(msg.sender).getOrganizationURI()) {
        /// @dev Get the Organization details from the factory.
        (
            address _deployer,
            ,
            string memory _organizationURI,
            string memory _name,
            string memory _symbol
        ) = Badger(msg.sender).organization();

        /// @dev Set ownership of the Organization.
        transferOwnership(_deployer);

        /// @dev Set the contract URI.
        _setOrganizationURI(_organizationURI);

        /// @dev Set the immutable name and symbol of the contract.
        name = _name;
        symbol = _symbol;
    }

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

    /**
     * See {IBadgerScout.setOrganizationURI}
     */
    function setOrganizationURI(string memory _uri)
        public
        virtual
        override
        onlyOrganizationManager
    {
        /// @dev Confirm a valid URI was provided.
        _validateURI(_uri);

        /// @dev Set the URI of the Organization.
        _setOrganizationURI(_uri);
    }

    /**
     * See {IBadgerScout.setBadge}
     */
    function setBadge(
        uint256 _id,
        bool _accountBound,
        string memory _uri,
        address[] memory _managers
    ) public virtual override onlyBadgeManager(_id) {
        /// @dev Confirm a valid URI was provided.
        _validateURI(_uri);

        /// @dev Update the Badge configuration.
        _setBadge(_id, _accountBound, _uri, _managers);
    }

    /**
     * See {IBadgerScout.setBadgeURI}
     */
    function setBadgeURI(uint256 _id, string memory _uri)
        public
        virtual
        override
        onlyBadgeManager(_id)
    {
        /// @dev Confirm a valid URI was provided.
        _validateURI(_uri);

        /// @dev Set the URI of the Badge.
        _setBadgeURI(_id, _uri);
    }

    /**
     * See {IBadgerScout.setManagers}
     */
    function setManagers(
        address[] calldata _managers,
        bool[] calldata _isManager
    ) public virtual override onlyOwner {
        /// @dev Confirm the arrays provided are of the same length.
        _validateLengths(_managers.length, _isManager.length);

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
     * See {IBadgerScout.setManagers}
     */
    function setManagers(
        uint256 _id,
        address[] calldata _managers,
        bool[] calldata _isManager
    ) public virtual override onlyOrganizationManager {
        /// @dev Confirm the arrays provided are of the same length.
        _validateLengths(_managers.length, _isManager.length);

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
     * See {IBadgerScout.setManagersBatch}
     */
    function setManagersBatch(
        uint256[] calldata _ids,
        address[] calldata _managers,
        bool[] calldata _isManager
    ) public virtual override onlyOrganizationManager {
        /// @dev Confirm the arrays provided are of the same length
        _validateLengths(_ids.length, _managers.length, _isManager.length);

        /// @dev Load the stack.
        uint256 i;
        bytes32 managerHash;

        /// @dev Loop through the arrays and update the state of the Managers.
        for (i; i < _managers.length; i++) {
            /// @dev Calculate the hash for the Organization Manager.
            managerHash = _badgeManagerHash(_ids[i], _managers[i]);

            /// @dev Update the state of the Manager for the Badge.
            _setManager(managerHash, _isManager[i]);
        }
    }

    /*//////////////////////////////////////////////////////////////
                                GETTERS
    //////////////////////////////////////////////////////////////*/

    /**
     * See {IBadgerScout.getAccountBound}
     */
    function getAccountBound(uint256 _id)
        public
        view
        virtual
        override
        returns (bool)
    {
        /// @dev If the value in config can be masked to `1` then the first slot
        ///      is active, and thus the boolean is `true`.
        return (badges[_id].config & 1) == 1;
    }

    /*//////////////////////////////////////////////////////////////
                            INTERNAL SETTERS
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Converts a boolean into a bit and packs it into the config.
     * @param _id The ID of the Badge.
     * @param _bit The bit to pack.
     * @param _value The value to pack.
     */
    function _setBit(
        uint256 _id,
        uint256 _bit,
        bool _value
    ) internal virtual {
        if (_value) {
            /// @dev Set the bit and shift it to the correct position.
            badges[_id].config |= (1 << _bit);
        } else {
            /// @dev Unset the bit and shift it to the correct position.
            badges[_id].config &= ~(1 << _bit);
        }
    }

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
     * @notice Create a Badge in the Organization.
     * @param _id The id of the Badge being created.
     * @param _accountBound Whether or not the Badge is account bound.
     * @param _uri The URI for the Badge.
     * @param _managers The addresses of the Badge Managers.
     */
    function _setBadge(
        uint256 _id,
        bool _accountBound,
        string memory _uri,
        address[] memory _managers
    ) internal virtual {
        /// @dev Retrieve the Badge from storage.
        Badge storage badge = badges[_id];

        /// @dev Set the URI of the Badge.
        _setBadgeURI(_id, _uri);

        /// @dev Set the account bound bit of the Badge.
        _setBit(_id, 0, _accountBound);

        /// @dev Load the stack.
        uint256 i;

        /// @dev Loop through all the Managers provided and mark them as such.
        /// @notice Adding Managers through this function marks all of them as
        ///         `true` for the Badge.
        for (i; i < _managers.length; i++) {
            /// @dev Update the state of all the Managers.
            _setManager(keccak256(abi.encode(_id, _managers[i])), true);
        }

        /// @dev Announce the Badge update.
        emit BadgeUpdated(_id, badge.config);
    }

    /**
     * @notice Sets the URI for the Badge and emits event that URI was updated.
     * @param _id The ID of the Badge.
     * @param _uri The URI of the Badge.
     */
    function _setBadgeURI(uint256 _id, string memory _uri) internal virtual {
        /// @dev Set the URI of the Badge.
        badges[_id].uri = _uri;

        /// @dev Announce the URI change for ERC1155 compliance.
        emit URI(_uri, _id);
    }

    /**
     * @notice Packs the logic for updating the state of a Manager into a reusable function.
     * @dev The key is a `keccak256` hash of the address of the Manager.
     * @param _key The key used to identify the Manager.
     * @param _isManager The state of the Manager.
     */
    function _setManager(bytes32 _key, bool _isManager) internal virtual {
        /// @dev Save the Manager state based on the encoded key.
        managerKeyToIsManager[_key] = _isManager;

        /// @dev Announce the change of Manager state.
        emit ManagerUpdated(_key, _isManager);
    }

    /**
     * @notice Enforces account bound Badges to be transferred only when permissioned.
     * @param _operator The address of the operator.
     * @param _from The address of the Badge owner.
     * @param _to The address of the Badge recipient.
     * @param _ids The ids of the Badges being transferred.
     * @param _amounts The amounts of the Badges being transferred.
     * @param _data The data of the Badges being transferred.
     */
    function _beforeTokenTransfer(
        address _operator,
        address _from,
        address _to,
        uint256[] memory _ids,
        uint256[] memory _amounts,
        bytes memory _data
    ) internal virtual override {
        /// @dev Load the stack.
        uint256 i;

        /// @dev Loop through all the IDs and confirm that the transfer is ready.
        for (i; i < _ids.length; i++) {
            /// @dev Confirm that every token being transferred can be managed by
            ///      the message sender.
            require(
                _isTransferReady(_operator, _from, _to, _ids[i]),
                "BadgerScout::_beforeTokenTransfer: Transfer not ready."
            );
        }

        /// @dev Call the parent function.
        super._beforeTokenTransfer(
            _operator,
            _from,
            _to,
            _ids,
            _amounts,
            _data
        );
    }

    /*//////////////////////////////////////////////////////////////
                            INTERNAL GETTERS
    //////////////////////////////////////////////////////////////*/

    /**
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
        return (_address == owner() ||
            managerKeyToIsManager[keccak256(abi.encode(_address))]);
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
        return (_isOrganizationManager(_address) ||
            managerKeyToIsManager[keccak256(abi.encode(_id, _address))]);
    }

    /**
     * @notice Confirms whether this Badge is in a state to be a transferred or not.
     * @param _id The id of the Badge to check.
     * @param _from The address of the Badge owner.
     * @param _to The address of the Badge recipient.
     * @return True if the Badge is in a state to be transferred, false otherwise.
     */
    function _isTransferReady(
        address _operator,
        address _from,
        address _to,
        uint256 _id
    ) internal view returns (bool) {
        /// @dev Confirm that the transfer can proceed if the Badge is not account bound
        ///      or the message sender is a Manager, or it's a mint/burn.
        return
            _from == address(0) ||
            _to == address(0) ||
            _isBadgeManager(_id, _operator) ||
            !getAccountBound(_id);
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

    /*//////////////////////////////////////////////////////////////
                        INTERNAL VALIDATORS
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Enforces that the length of three arrays are equal.
     * @param _length1 The first array length.
     * @param _length2 The second array length.
     * @param _length3 The third array length.
     */
    function _validateLengths(
        uint256 _length1,
        uint256 _length2,
        uint256 _length3
    ) internal pure {
        require(
            _length1 == _length2 && _length2 == _length3,
            "BadgerScout::_validateLengths: Array lengths must be equal."
        );
    }

    /**
     * @notice Enforces that the length of two arrays are equal.
     * @param _length1 The first array length.
     * @param _length2 The second array length.
     */
    function _validateLengths(uint256 _length1, uint256 _length2)
        internal
        pure
    {
        require(
            _length1 == _length2,
            "BadgerScout::_validateLengths: Array lengths must be equal."
        );
    }

    /**
     * @notice Enforces a Badge URI to not be set to an empty string.
     * @param _uri The URI to check.
     */
    function _validateURI(string memory _uri) internal pure {
        require(
            bytes(_uri).length > 0,
            "BadgerScout::_validateURI: URI must be set."
        );
    }
}
