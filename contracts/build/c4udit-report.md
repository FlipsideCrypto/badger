# c4udit Report

## Files analyzed
- ../contracts/Badger.sol
- ../contracts/BadgerNetwork.sol
- ../contracts/BadgerOrganization.sol
- ../contracts/BadgerOrganizationLogic.sol
- ../contracts/hooks/BadgerHook.sol
- ../contracts/hooks/BadgerHooked.sol
- ../contracts/hooks/forfeit/BadgerForfeitForbidden.sol
- ../contracts/hooks/hook/BadgerHookBlocklist.sol
- ../contracts/hooks/mint/BadgerMintMax.sol
- ../contracts/hooks/mint/BadgerMintMaxAllowance.sol
- ../contracts/hooks/mint/BadgerMintMaxSupply.sol
- ../contracts/hooks/mint/BadgerMintSelf.sol
- ../contracts/hooks/revoke/BadgerRevokeForbidden.sol
- ../contracts/hooks/transfer/BadgerTransferBlocklist.sol
- ../contracts/hooks/transfer/BadgerTransferBound.sol
- ../contracts/hooks/transfer/BadgerTransferBoundManaged.sol
- ../contracts/hooks/types/BadgerForfeitHook.sol
- ../contracts/hooks/types/BadgerHookHook.sol
- ../contracts/hooks/types/BadgerMintHook.sol
- ../contracts/hooks/types/BadgerRevokeHook.sol
- ../contracts/hooks/types/BadgerTransferHook.sol
- ../contracts/interfaces/IBadger.sol
- ../contracts/interfaces/IBadgerConfigured.sol
- ../contracts/interfaces/IBadgerHook.sol
- ../contracts/interfaces/IBadgerHooked.sol
- ../contracts/interfaces/IBadgerManaged.sol
- ../contracts/interfaces/IBadgerOrganization.sol
- ../contracts/interfaces/IBadgerOrganizationLogic.sol
- ../contracts/interfaces/IBadgerOrganizationStruct.sol
- ../contracts/managers/BadgerManaged.sol
- ../contracts/managers/BadgerManager.sol
- ../contracts/managers/BadgerManagerClaimable.sol
- ../contracts/managers/BadgerManagerPaidERC1155.sol
- ../contracts/managers/BadgerManagerPaidERC20.sol
- ../contracts/managers/BadgerManagerPaidERC721.sol
- ../contracts/managers/BadgerManagerPaidNative.sol
- ../contracts/managers/BadgerManagerSignature.sol

## Issues found

### Cache Array Length Outside of Loop

#### Impact
Issue Information: [G002](https://github.com/byterocket/c4-common-issues/blob/main/0-Gas-Optimizations.md#g002---cache-array-length-outside-of-loop)

#### Findings:
```
../contracts/BadgerOrganization.sol::54 => uint256 tosLength = _tos.length;
../contracts/BadgerOrganization.sol::57 => tosLength == _amounts.length,
../contracts/BadgerOrganization.sol::58 => "BadgerOrganization::mintBatch: _tos and _amounts must be the same length."
../contracts/BadgerOrganization.sol::97 => uint256 fromsLength = _froms.length;
../contracts/BadgerOrganization.sol::100 => fromsLength == _amounts.length,
../contracts/BadgerOrganization.sol::101 => "BadgerOrganization::revokeBatch: _from and _amounts must be the same length."
../contracts/BadgerOrganization.sol::149 => if (bytes(_uri).length != 0) {
../contracts/BadgerOrganizationLogic.sol::122 => bytes(_uri).length != 0,
../contracts/BadgerOrganizationLogic.sol::141 => bytes(_uri).length != 0,
../contracts/BadgerOrganizationLogic.sol::159 => uint256 managersLength = _managers.length;
../contracts/BadgerOrganizationLogic.sol::163 => managersLength == _isManager.length,
../contracts/BadgerOrganizationLogic.sol::164 => "BadgerScout::setManagers: _managers and _isManager must be the same length."
../contracts/BadgerOrganizationLogic.sol::197 => uint256 managersLength = _managers.length;
../contracts/BadgerOrganizationLogic.sol::201 => managersLength == _isManager.length,
../contracts/BadgerOrganizationLogic.sol::202 => "BadgerScout::setManagers: _managers and _isManager must be the same length."
../contracts/BadgerOrganizationLogic.sol::234 => uint256 hooksLength = _hooks.length;
../contracts/BadgerOrganizationLogic.sol::238 => hooksLength == _isHook.length,
../contracts/BadgerOrganizationLogic.sol::239 => "BadgerScout::setHooks: _hooks and _isHook must be the same length."
../contracts/hooks/BadgerHooked.sol::84 => uint256 hooksLength = _hooks.length();
../contracts/hooks/BadgerHooked.sol::176 => uint256 slotHooksLength = slotHooks.length;
../contracts/hooks/transfer/BadgerTransferBound.sol::51 => uint256 idsLength = _ids.length;
../contracts/hooks/transfer/BadgerTransferBoundManaged.sol::63 => uint256 idsLength = _ids.length;
```
#### Tools used
[c4udit](https://github.com/byterocket/c4udit)

### Use immutable for OpenZeppelin AccessControl's Roles Declarations

#### Impact
Issue Information: [G006](https://github.com/byterocket/c4-common-issues/blob/main/0-Gas-Optimizations.md#g006---use-immutable-for-openzeppelin-accesscontrols-roles-declarations)

#### Findings:
```
../contracts/Badger.sol::139 => return keccak256(abi.encodePacked(_organizationId));
../contracts/BadgerOrganizationLogic.sol::501 => return keccak256(abi.encode(_manager));
../contracts/BadgerOrganizationLogic.sol::516 => return keccak256(abi.encode(_id, _manager));
../contracts/hooks/BadgerHooked.sol::41 => bytes32 public constant BEFORE_SET_HOOK = keccak256("beforeSetHook");
../contracts/hooks/BadgerHooked.sol::44 => bytes32 public constant BEFORE_MINT = keccak256("beforeMintingHook");
../contracts/hooks/BadgerHooked.sol::47 => bytes32 public constant BEFORE_REVOKE = keccak256("beforeRevokingHook");
../contracts/hooks/BadgerHooked.sol::50 => bytes32 public constant BEFORE_FORFEIT = keccak256("beforeForfeitHook");
../contracts/hooks/BadgerHooked.sol::53 => bytes32 public constant BEFORE_TRANSFER = keccak256("beforeTransferHook");
../contracts/managers/BadgerManaged.sol::31 => * @dev The key is a `keccak256` hash of the address of the Manager.
../contracts/managers/BadgerManagerSignature.sol::79 => bytes32 message = keccak256(
```
#### Tools used
[c4udit](https://github.com/byterocket/c4udit)

### Long Revert Strings

#### Impact
Issue Information: [G007](https://github.com/byterocket/c4-common-issues/blob/main/0-Gas-Optimizations.md#g007---long-revert-strings)

#### Findings:
```
../contracts/Badger.sol::7 => import {ERC165} from "@openzeppelin/contracts/utils/introspection/ERC165.sol";
../contracts/Badger.sol::8 => import {Context} from "@openzeppelin/contracts/utils/Context.sol";
../contracts/Badger.sol::12 => import {IBadgerOrganization} from "./interfaces/IBadgerOrganization.sol";
../contracts/Badger.sol::13 => import {IBadgerOrganizationLogic} from "./interfaces/IBadgerOrganizationLogic.sol";
../contracts/Badger.sol::16 => import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
../contracts/Badger.sol::49 => "Badger::constructor: _implementation cannot be the zero address."
../contracts/BadgerNetwork.sol::5 => import {IBadgerConfigured} from "./interfaces/IBadgerConfigured.sol";
../contracts/BadgerOrganization.sol::6 => import {IBadgerOrganization} from "./interfaces/IBadgerOrganization.sol";
../contracts/BadgerOrganization.sol::8 => import {Multicallable} from "solady/src/utils/Multicallable.sol";
../contracts/BadgerOrganization.sol::58 => "BadgerOrganization::mintBatch: _tos and _amounts must be the same length."
../contracts/BadgerOrganization.sol::101 => "BadgerOrganization::revokeBatch: _from and _amounts must be the same length."
../contracts/BadgerOrganizationLogic.sol::9 => import {IBadgerOrganizationLogic} from "./interfaces/IBadgerOrganizationLogic.sol";
../contracts/BadgerOrganizationLogic.sol::12 => import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
../contracts/BadgerOrganizationLogic.sol::13 => import {ERC1155Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
../contracts/BadgerOrganizationLogic.sol::90 => "BadgerScout::onlyOrganizationManager: Only the Owner or Organization Manager can call this."
../contracts/BadgerOrganizationLogic.sol::102 => "BadgerScout::onlyBadgeManager: Only Managers can call this."
../contracts/BadgerOrganizationLogic.sol::123 => "BadgerScout::setOrganizationURI: URI must be set."
../contracts/BadgerOrganizationLogic.sol::142 => "BadgerScout::setBadgeURI: URI must be set."
../contracts/BadgerOrganizationLogic.sol::164 => "BadgerScout::setManagers: _managers and _isManager must be the same length."
../contracts/BadgerOrganizationLogic.sol::175 => "BadgerScout::setManagers: Manager cannot be the zero address."
../contracts/BadgerOrganizationLogic.sol::202 => "BadgerScout::setManagers: _managers and _isManager must be the same length."
../contracts/BadgerOrganizationLogic.sol::213 => "BadgerScout::setManagers: Manager cannot be the zero address."
../contracts/BadgerOrganizationLogic.sol::239 => "BadgerScout::setHooks: _hooks and _isHook must be the same length."
../contracts/BadgerOrganizationLogic.sol::250 => "BadgerScout::setHooks: Hook cannot be the zero address."
../contracts/hooks/BadgerHook.sol::6 => import {ERC165} from "@openzeppelin/contracts/utils/introspection/ERC165.sol";
../contracts/hooks/BadgerHook.sol::8 => import {IBadgerConfigured} from "../interfaces/IBadgerConfigured.sol";
../contracts/hooks/BadgerHooked.sol::8 => import {Address} from "@openzeppelin/contracts/utils/Address.sol";
../contracts/hooks/BadgerHooked.sol::11 => import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
../contracts/hooks/BadgerHooked.sol::12 => import {IBadgerConfigured} from "../interfaces/IBadgerConfigured.sol";
../contracts/hooks/BadgerHooked.sol::16 => import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
../contracts/hooks/BadgerHooked.sol::116 => "BadgerOrganizationHooked::_configManager: Manager is not a contract."
../contracts/hooks/BadgerHooked.sol::122 => "BadgerHooks::_setHook: Hook does not implement IBadgerHook."
../contracts/hooks/BadgerHooked.sol::155 => "BadgerOrganizationHooked::_configHook: Hook is not enabled."
../contracts/hooks/forfeit/BadgerForfeitForbidden.sol::51 => "BadgerForfeitForbidden::execute: Invalid permission to forfeit token."
../contracts/hooks/hook/BadgerHookBlocklist.sol::54 => "BadgerHookBlacklist::execute: Cannot enable blocklisted hook."
../contracts/hooks/mint/BadgerMintMax.sol::42 => "BadgerMintMax::config: Max must be greater than zero."
../contracts/hooks/mint/BadgerMintMax.sol::65 => "BadgerMintMax::execute: Max mint reached."
../contracts/hooks/mint/BadgerMintMaxAllowance.sol::42 => "BadgerMintMaxAllowance::config: Max must be greater than zero."
../contracts/hooks/mint/BadgerMintMaxAllowance.sol::65 => "BadgerMintMaxAllowance::execute: Max mint reached."
../contracts/hooks/mint/BadgerMintMaxSupply.sol::44 => "BadgerMintMaxSupply::config: Max must be greater than the already minted supply."
../contracts/hooks/mint/BadgerMintMaxSupply.sol::67 => "BadgerMintMaxSupply::execute: Max supply exceeded."
../contracts/hooks/mint/BadgerMintSelf.sol::55 => "BadgerMintSelfOperated::execute: Only mint to self"
../contracts/hooks/revoke/BadgerRevokeForbidden.sol::52 => "BadgerRevokeForbidden::execute: Invalid permission to revoke token."
../contracts/hooks/transfer/BadgerTransferBlocklist.sol::55 => "BadgerTransferBlocklist::execute: Invalid permission to transfer token."
../contracts/hooks/transfer/BadgerTransferBound.sol::60 => "BadgerTransferBound::execute: Invalid permission to transfer token."
../contracts/hooks/transfer/BadgerTransferBoundManaged.sol::6 => import {BadgerOrganizationLogic} from "../../BadgerOrganizationLogic.sol";
../contracts/hooks/transfer/BadgerTransferBoundManaged.sol::79 => "BadgerTransferBoundManaged::execute: Invalid permission to transfer token."
../contracts/hooks/types/BadgerMintHook.sol::11 => "address,address,uint256,uint256,bytes";
../contracts/hooks/types/BadgerTransferHook.sol::11 => "address,address,address,uint256[],uint256[],bytes";
../contracts/managers/BadgerManaged.sol::8 => import {Address} from "@openzeppelin/contracts/utils/Address.sol";
../contracts/managers/BadgerManaged.sol::11 => import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
../contracts/managers/BadgerManaged.sol::13 => import {IBadgerConfigured} from "../interfaces/IBadgerConfigured.sol";
../contracts/managers/BadgerManaged.sol::57 => "BadgerOrganizationHooked::_configManager: Manager is not enabled."
../contracts/managers/BadgerManaged.sol::63 => "BadgerOrganizationHooked::_configManager: Manager is not a contract."
../contracts/managers/BadgerManaged.sol::71 => "BadgerOrganizationHooked::_configManager: Manager is not a configured Badger module."
../contracts/managers/BadgerManager.sol::6 => import {IBadgerConfigured} from "../interfaces/IBadgerConfigured.sol";
../contracts/managers/BadgerManager.sol::7 => import {ERC165} from "@openzeppelin/contracts/utils/introspection/ERC165.sol";
../contracts/managers/BadgerManagerClaimable.sol::39 => "BadgerManagerClaimable::config: Amount must be greater than zero."
../contracts/managers/BadgerManagerSignature.sol::10 => import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
../contracts/managers/BadgerManagerSignature.sol::69 => "BadgerManagerSignature::mint: Signature expired."
../contracts/managers/BadgerManagerSignature.sol::75 => "BadgerManagerSignature::mint: Invalid nonce."
../contracts/managers/BadgerManagerSignature.sol::99 => "BadgerManagerSignature::mint: Invalid signer."
```
#### Tools used
[c4udit](https://github.com/byterocket/c4udit)

### Unspecific Compiler Version Pragma

#### Impact
Issue Information: [L003](https://github.com/byterocket/c4-common-issues/blob/main/2-Low-Risk.md#l003---unspecific-compiler-version-pragma)

#### Findings:
```
../contracts/Badger.sol::3 => pragma solidity ^0.8.16;
../contracts/BadgerNetwork.sol::3 => pragma solidity ^0.8.16;
../contracts/BadgerOrganization.sol::3 => pragma solidity ^0.8.16;
../contracts/BadgerOrganizationLogic.sol::3 => pragma solidity ^0.8.16;
../contracts/hooks/BadgerHook.sol::3 => pragma solidity ^0.8.16;
../contracts/hooks/BadgerHooked.sol::3 => pragma solidity ^0.8.16;
../contracts/hooks/forfeit/BadgerForfeitForbidden.sol::3 => pragma solidity ^0.8.16;
../contracts/hooks/hook/BadgerHookBlocklist.sol::3 => pragma solidity ^0.8.16;
../contracts/hooks/mint/BadgerMintMax.sol::3 => pragma solidity ^0.8.16;
../contracts/hooks/mint/BadgerMintMaxAllowance.sol::3 => pragma solidity ^0.8.16;
../contracts/hooks/mint/BadgerMintMaxSupply.sol::3 => pragma solidity ^0.8.16;
../contracts/hooks/mint/BadgerMintSelf.sol::3 => pragma solidity ^0.8.16;
../contracts/hooks/revoke/BadgerRevokeForbidden.sol::3 => pragma solidity ^0.8.16;
../contracts/hooks/transfer/BadgerTransferBlocklist.sol::3 => pragma solidity ^0.8.16;
../contracts/hooks/transfer/BadgerTransferBound.sol::3 => pragma solidity ^0.8.16;
../contracts/hooks/transfer/BadgerTransferBoundManaged.sol::3 => pragma solidity ^0.8.16;
../contracts/hooks/types/BadgerForfeitHook.sol::3 => pragma solidity ^0.8.16;
../contracts/hooks/types/BadgerHookHook.sol::3 => pragma solidity ^0.8.16;
../contracts/hooks/types/BadgerMintHook.sol::3 => pragma solidity ^0.8.16;
../contracts/hooks/types/BadgerRevokeHook.sol::3 => pragma solidity ^0.8.16;
../contracts/hooks/types/BadgerTransferHook.sol::3 => pragma solidity ^0.8.16;
../contracts/interfaces/IBadger.sol::3 => pragma solidity ^0.8.16;
../contracts/interfaces/IBadgerConfigured.sol::3 => pragma solidity ^0.8.16;
../contracts/interfaces/IBadgerHook.sol::3 => pragma solidity ^0.8.16;
../contracts/interfaces/IBadgerHooked.sol::3 => pragma solidity ^0.8.16;
../contracts/interfaces/IBadgerManaged.sol::3 => pragma solidity ^0.8.16;
../contracts/interfaces/IBadgerOrganization.sol::3 => pragma solidity ^0.8.16;
../contracts/interfaces/IBadgerOrganizationLogic.sol::3 => pragma solidity ^0.8.16;
../contracts/interfaces/IBadgerOrganizationStruct.sol::3 => pragma solidity ^0.8.16;
../contracts/managers/BadgerManaged.sol::3 => pragma solidity ^0.8.16;
../contracts/managers/BadgerManager.sol::3 => pragma solidity ^0.8.16;
../contracts/managers/BadgerManagerClaimable.sol::3 => pragma solidity ^0.8.16;
../contracts/managers/BadgerManagerPaidERC1155.sol::3 => pragma solidity ^0.8.16;
../contracts/managers/BadgerManagerPaidERC20.sol::3 => pragma solidity ^0.8.16;
../contracts/managers/BadgerManagerPaidERC721.sol::3 => pragma solidity ^0.8.16;
../contracts/managers/BadgerManagerPaidNative.sol::3 => pragma solidity ^0.8.16;
../contracts/managers/BadgerManagerSignature.sol::3 => pragma solidity ^0.8.16;
```
#### Tools used
[c4udit](https://github.com/byterocket/c4udit)

