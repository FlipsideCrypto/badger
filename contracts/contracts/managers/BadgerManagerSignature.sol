// SPDX-License-Identifier: AGPL-3.0-or-later

pragma solidity ^0.8.16;

/// @dev Core dependencies.
import {BadgerManager} from "./BadgerManager.sol";
import {BadgerOrganization} from "../BadgerOrganization.sol";

/// @dev Helper dependencies.
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/**
 * @dev Implements the ability for individuals to mint Badges with a
 *      valid signature from the signer of the Badge.
 * @author CHANCE (@nftchance)
 * @author masonthechain (@masonthechain)
 */
contract BadgerManagerSignature is BadgerManager {
    ////////////////////////////////////////////////////////
    ///                      STATE                       ///
    ////////////////////////////////////////////////////////

    /// @dev The schema used for the config method.
    string public constant override CONFIG_SCHEMA = "uint256,address";

    /// @dev Keep track of the signer for minting a Badge.
    mapping(address => mapping(uint256 => address)) public signers;

    /// @dev Tracking the nonce of each wallet that could have a valid signature.
    mapping(address => uint256) nonces;

    ////////////////////////////////////////////////////////
    ///                     SETTERS                      ///
    ////////////////////////////////////////////////////////

    /**
     * See {IBadgerManager-config}.
     */
    function config(bytes calldata _data) public virtual {
        /// @dev Decode the config data forwarded from the Organization.
        (uint256 _id, address _signer) = abi.decode(_data, (uint256, address));

        /// @dev Set the signer for minting a Badge.
        signers[msg.sender][_id] = _signer;
    }

    /**
     * @dev Allows individuals to mint a Badge with a valid signature.
     * @param _targetOrganization The Organization to mint the Badge for.
     * @param _id The ID of the Badge to mint.
     * @param _amount The amount of the Badge to mint.
     * @param _data The data to pass to the mint method.
     * @param _signature The signature to validate.
     * @param _nonce The nonce to validate.
     * @param _deadline The deadline to validate.
     */
    function mint(
        address _targetOrganization,
        uint256 _id,
        uint256 _amount,
        bytes calldata _data,
        bytes calldata _signature,
        uint256 _nonce,
        uint256 _deadline
    ) external {
        /// @dev Confirm the signature has not expired.
        require(
            _deadline >= block.timestamp,
            "BadgerManagerSignature::mint: Signature expired."
        );

        /// @dev Confirm the nonce is equal to the value + 1.
        require(
            _nonce == nonces[msg.sender]++,
            "BadgerManagerSignature::mint: Invalid nonce."
        );

        /// @dev Confirm the signature is valid.
        require(
            _signature.length == 65,
            "BadgerManagerSignature::mint: Invalid signature length."
        );

        /// @dev Recover the signer from the signature.
        bytes32 message = keccak256(
            abi.encodePacked(
                msg.sender,
                _id,
                _amount,
                _data,
                _nonce,
                _deadline,
                address(this)
            )
        );

        /// @dev Hash the message.
        bytes32 hash = ECDSA.toEthSignedMessageHash(message);

        /// @dev Recover the signer.
        address signer = ECDSA.recover(hash, _signature);

        /// @dev Validate the signer.
        require(
            signer == signers[msg.sender][_id],
            "BadgerManagerSignature::mint: Invalid signer."
        );

        /// @dev Mint a new badge for the organization.
        BadgerOrganization(_targetOrganization).mint(
            msg.sender,
            _id,
            _amount,
            _data
        );
    }
}
