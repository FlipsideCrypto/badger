// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

/// @dev Factory input.
import {Badger} from "./Badger.sol";

/// @dev Core dependencies.
import {IBadgerScout} from "./interfaces/IBadgerScout.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract BadgerScout is IBadgerScout, Ownable, ERC1155 {
    /// @dev The name of the contract.
    string public immutable name;

    /// @dev The symbol of the contract.
    string public immutable symbol;

    /// @dev The URI for the Organization/contract.
    string public organizationURI;

    /// @dev Mapping from token ID to badge
    mapping(uint256 => Badge) public badges;

    /// @dev Tracking the Manages of a Badge.
    mapping(bytes32 => bool) public managerKeyToIsManager;

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
            "BadgerScout::onlyOrganizationManager: Must be Owner or Organization Manager."
        );
        _;
    }

    /**
     * @notice Confirm that only owner or the leader of a Badge passes.
     * @param _id The id of the Badge being accessed.
     */
    modifier onlyBadgeManager(uint256 _id) {
        require(
            _isBadgeManager(_id, _msgSender()),
            "BadgerScout::onlyBadgeManager: Only leaders can call this."
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
        require(
            bytes(_uri).length > 0,
            "BadgerScout::setOrganizationURI: URI must be set."
        );

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
        require(
            bytes(_uri).length > 0,
            "BadgerScout::setBadge: URI must be set."
        );

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
        require(
            bytes(_uri).length > 0,
            "BadgerScout::setBadgeURI: URI must be set."
        );

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
        require(
            _managers.length == _isManager.length,
            "BadgerScout::setManagers: `_managers` and `_isManager` arrays must be the same length."
        );

        /// @dev Load the stack.
        uint256 i;

        /// @dev Loop through the arrays and update the state of the Managers.
        for (i; i < _managers.length; i++) {
            /// @dev Update the state of the Manager for the Badge.
            _setManager(keccak256(abi.encode(_managers[i])), _isManager[i]);
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
        require(
            _managers.length == _isManager.length,
            "BadgerScout::setManagers: `_managers` and `_isManager` arrays must be the same length."
        );

        /// @dev Load the stack.
        uint256 i;

        /// @dev Loop through the arrays and update the state of the Managers.
        for (i; i < _managers.length; i++) {
            /// @dev Update the state of the Manager for the Badge.
            _setManager(
                keccak256(abi.encode(_id, _managers[i])),
                _isManager[i]
            );
        }
    }

    /**
     * See {IBadgerScout.setManagers}
     */
    function setManagersBatch(
        address[] calldata _managers,
        bool[] calldata _isManager
    ) public virtual override onlyOwner {
        /// @dev Confirm the arrays provided are of the same length
        require(
            _managers.length == _isManager.length,
            "BadgerScout::setManagersBatch: _ids, _isManager, and _isManager must be the same length."
        );

        /// @dev Load the stack.
        uint256 i;

        /// @dev Loop through the arrays and update the state of the Managers.
        for (i; i < _managers.length; i++) {
            /// @dev Update the state of the Manager for the Badge.
            _setManager(keccak256(abi.encode(_managers[i])), _isManager[i]);
        }
    }

    /**
     * See {IBadgerScout.setManagers}
     */
    function setManagersBatch(
        uint256[] calldata _ids,
        address[] calldata _managers,
        bool[] calldata _isManager
    ) public virtual override onlyOrganizationManager {
        /// @dev Confirm the arrays provided are of the same length
        require(
            _ids.length == _managers.length &&
                _managers.length == _isManager.length,
            "BadgerScout::setManagersBatch: _ids, _isManager, and _isManager must be the same length."
        );

        /// @dev Load the stack.
        uint256 i;

        /// @dev Loop through the arrays and update the state of the Managers.
        for (i; i < _managers.length; i++) {
            /// @dev Update the state of the Manager for the Badge.
            _setManager(
                keccak256(abi.encode(_ids[i], _managers[i])),
                _isManager[i]
            );
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
        return badges[_id].config && 1 == 1;
    }

    /*//////////////////////////////////////////////////////////////
                            INTERNAL SETTERS
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Converts a boolean into a bit and packs it into the config.
     * @param _id The ID of the badge.
     * @param _bit The bit to pack.
     * @param _value The value to pack.
     */
    function _setBit(
        uint256 _id,
        uint256 _bit,
        bool _value
    ) internal virtual {
        if (_value) {
            badges[_id].config |= (1 << _bit);
        } else {
            badges[_id].config &= ~(1 << _bit);
        }
    }

    /**
     * @notice Allows the owner of the contract to update the Organization URI.
     * @param _uri The new URI for the Organization.
     */
    function _setOrganizationURI(string memory _uri) internal virtual {
        /// @dev Establish the URI used for the contract (Organization) metadata.
        organizationURI = _uri;

        /// @dev Announce the URI change.
        emit OrganizationUpdated(_uri);
    }

    /**
     * @notice Create a badge in the Organization.
     * @param _id The id of the badge being created.
     * @param _accountBound Whether or not the badge is account bound.
     * @param _uri The URI for the badge.
     * @param _managers The addresses of the delegates.
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
     * @notice Sets the URI for the badge and emits event that URI was updated.
     * @param _id The ID of the badge.
     * @param _uri The URI of the badge.
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

    /*//////////////////////////////////////////////////////////////
                            INTERNAL GETTERS
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Confirms whether this address is a Manager of the Organization or not.
     */
    function _isOrganizationManager(address _address)
        internal
        view
        virtual
        returns (bool)
    {
        return (_address == owner() ||
            managerKeyToIsManager[keccak256(_address)]);
    }

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
     * @notice Confirms whether this token is in a state to be a transferred or not.
     * @param _id The id of the token to check.
     * @param _from The address of the token owner.
     * @param _to The address of the token recipient.
     */
    function _isTransferReady(
        address _operator,
        address _from,
        address _to,
        uint256 _id
    ) internal view {
        /// @dev Confirm that the transfer can proceed if the account is not token bound
        ///      or the message sender is a leader of the badge.
        return
            _from == address(0) ||
            _to == address(0) ||
            _isBadgeManager(_id, _operator) ||
            !getAccountBound(_id);
    }

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
}
