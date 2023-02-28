# c4udit Report

## Files analyzed
- ../../contracts/build/c4udit/examples/Test.sol
- ../../contracts/contracts/Badger.sol
- ../../contracts/contracts/BadgerNetwork.sol
- ../../contracts/contracts/BadgerOrganization.sol
- ../../contracts/contracts/BadgerOrganizationLogic.sol
- ../../contracts/contracts/hooks/BadgerHook.sol
- ../../contracts/contracts/hooks/BadgerHooked.sol
- ../../contracts/contracts/hooks/forfeit/BadgerForfeitForbidden.sol
- ../../contracts/contracts/hooks/hook/BadgerHookBlocklist.sol
- ../../contracts/contracts/hooks/mint/BadgerMintMax.sol
- ../../contracts/contracts/hooks/mint/BadgerMintMaxAllowance.sol
- ../../contracts/contracts/hooks/mint/BadgerMintMaxSupply.sol
- ../../contracts/contracts/hooks/mint/BadgerMintSelf.sol
- ../../contracts/contracts/hooks/revoke/BadgerRevokeForbidden.sol
- ../../contracts/contracts/hooks/transfer/BadgerTransferBlocklist.sol
- ../../contracts/contracts/hooks/transfer/BadgerTransferBound.sol
- ../../contracts/contracts/hooks/transfer/BadgerTransferBoundManaged.sol
- ../../contracts/contracts/hooks/types/BadgerForfeitHook.sol
- ../../contracts/contracts/hooks/types/BadgerHookHook.sol
- ../../contracts/contracts/hooks/types/BadgerMintHook.sol
- ../../contracts/contracts/hooks/types/BadgerRevokeHook.sol
- ../../contracts/contracts/hooks/types/BadgerTransferHook.sol
- ../../contracts/contracts/interfaces/IBadger.sol
- ../../contracts/contracts/interfaces/IBadgerConfigured.sol
- ../../contracts/contracts/interfaces/IBadgerHook.sol
- ../../contracts/contracts/interfaces/IBadgerHooked.sol
- ../../contracts/contracts/interfaces/IBadgerManaged.sol
- ../../contracts/contracts/interfaces/IBadgerOrganization.sol
- ../../contracts/contracts/interfaces/IBadgerOrganizationLogic.sol
- ../../contracts/contracts/interfaces/IBadgerOrganizationStruct.sol
- ../../contracts/contracts/managers/BadgerManaged.sol
- ../../contracts/contracts/managers/BadgerManager.sol
- ../../contracts/contracts/managers/BadgerManagerClaimable.sol
- ../../contracts/contracts/managers/BadgerManagerPaidERC1155.sol
- ../../contracts/contracts/managers/BadgerManagerPaidERC20.sol
- ../../contracts/contracts/managers/BadgerManagerPaidERC721.sol
- ../../contracts/contracts/managers/BadgerManagerPaidNative.sol
- ../../contracts/contracts/managers/BadgerManagerSignature.sol
- ../../contracts/node_modules/@ensdomains/ens/contracts/Deed.sol
- ../../contracts/node_modules/@ensdomains/ens/contracts/DeedImplementation.sol
- ../../contracts/node_modules/@ensdomains/ens/contracts/ENS.sol
- ../../contracts/node_modules/@ensdomains/ens/contracts/ENSRegistry.sol
- ../../contracts/node_modules/@ensdomains/ens/contracts/ENSRegistryWithFallback.sol
- ../../contracts/node_modules/@ensdomains/ens/contracts/FIFSRegistrar.sol
- ../../contracts/node_modules/@ensdomains/ens/contracts/HashRegistrar.sol
- ../../contracts/node_modules/@ensdomains/ens/contracts/Migrations.sol
- ../../contracts/node_modules/@ensdomains/ens/contracts/Registrar.sol
- ../../contracts/node_modules/@ensdomains/ens/contracts/ReverseRegistrar.sol
- ../../contracts/node_modules/@ensdomains/ens/contracts/TestRegistrar.sol
- ../../contracts/node_modules/@ensdomains/resolver/contracts/DefaultReverseResolver.sol
- ../../contracts/node_modules/@ensdomains/resolver/contracts/Migrations.sol
- ../../contracts/node_modules/@ensdomains/resolver/contracts/OwnedResolver.sol
- ../../contracts/node_modules/@ensdomains/resolver/contracts/PublicResolver.sol
- ../../contracts/node_modules/@ensdomains/resolver/contracts/Resolver.sol
- ../../contracts/node_modules/@ensdomains/resolver/contracts/ResolverBase.sol
- ../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/ABIResolver.sol
- ../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/AddrResolver.sol
- ../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/ContentHashResolver.sol
- ../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/DNSResolver.sol
- ../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/InterfaceResolver.sol
- ../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/NameResolver.sol
- ../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/PubkeyResolver.sol
- ../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/TextResolver.sol
- ../../contracts/node_modules/@ensdomains/resolver/test/mocks/dummy.sol
- ../../contracts/node_modules/@ethereum-waffle/mock-contract/src/Doppelganger.sol
- ../../contracts/node_modules/@openzeppelin/contracts/access/AccessControl.sol
- ../../contracts/node_modules/@openzeppelin/contracts/access/AccessControlCrossChain.sol
- ../../contracts/node_modules/@openzeppelin/contracts/access/AccessControlEnumerable.sol
- ../../contracts/node_modules/@openzeppelin/contracts/access/IAccessControl.sol
- ../../contracts/node_modules/@openzeppelin/contracts/access/IAccessControlEnumerable.sol
- ../../contracts/node_modules/@openzeppelin/contracts/access/Ownable.sol
- ../../contracts/node_modules/@openzeppelin/contracts/crosschain/CrossChainEnabled.sol
- ../../contracts/node_modules/@openzeppelin/contracts/crosschain/amb/CrossChainEnabledAMB.sol
- ../../contracts/node_modules/@openzeppelin/contracts/crosschain/amb/LibAMB.sol
- ../../contracts/node_modules/@openzeppelin/contracts/crosschain/arbitrum/CrossChainEnabledArbitrumL1.sol
- ../../contracts/node_modules/@openzeppelin/contracts/crosschain/arbitrum/CrossChainEnabledArbitrumL2.sol
- ../../contracts/node_modules/@openzeppelin/contracts/crosschain/arbitrum/LibArbitrumL1.sol
- ../../contracts/node_modules/@openzeppelin/contracts/crosschain/arbitrum/LibArbitrumL2.sol
- ../../contracts/node_modules/@openzeppelin/contracts/crosschain/errors.sol
- ../../contracts/node_modules/@openzeppelin/contracts/crosschain/optimism/CrossChainEnabledOptimism.sol
- ../../contracts/node_modules/@openzeppelin/contracts/crosschain/optimism/LibOptimism.sol
- ../../contracts/node_modules/@openzeppelin/contracts/crosschain/polygon/CrossChainEnabledPolygonChild.sol
- ../../contracts/node_modules/@openzeppelin/contracts/finance/PaymentSplitter.sol
- ../../contracts/node_modules/@openzeppelin/contracts/finance/VestingWallet.sol
- ../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol
- ../../contracts/node_modules/@openzeppelin/contracts/governance/IGovernor.sol
- ../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol
- ../../contracts/node_modules/@openzeppelin/contracts/governance/compatibility/GovernorCompatibilityBravo.sol
- ../../contracts/node_modules/@openzeppelin/contracts/governance/compatibility/IGovernorCompatibilityBravo.sol
- ../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol
- ../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorPreventLateQuorum.sol
- ../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorProposalThreshold.sol
- ../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorSettings.sol
- ../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorTimelockCompound.sol
- ../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol
- ../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorVotes.sol
- ../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorVotesComp.sol
- ../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol
- ../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/IGovernorTimelock.sol
- ../../contracts/node_modules/@openzeppelin/contracts/governance/utils/IVotes.sol
- ../../contracts/node_modules/@openzeppelin/contracts/governance/utils/Votes.sol
- ../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1155.sol
- ../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1155MetadataURI.sol
- ../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1155Receiver.sol
- ../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1271.sol
- ../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1363.sol
- ../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1363Receiver.sol
- ../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1363Spender.sol
- ../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC165.sol
- ../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1820Implementer.sol
- ../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1820Registry.sol
- ../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC20.sol
- ../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC20Metadata.sol
- ../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC2981.sol
- ../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC3156.sol
- ../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC3156FlashBorrower.sol
- ../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC3156FlashLender.sol
- ../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC4626.sol
- ../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC721.sol
- ../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC721Enumerable.sol
- ../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC721Metadata.sol
- ../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC721Receiver.sol
- ../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC777.sol
- ../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC777Recipient.sol
- ../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC777Sender.sol
- ../../contracts/node_modules/@openzeppelin/contracts/interfaces/draft-IERC1822.sol
- ../../contracts/node_modules/@openzeppelin/contracts/interfaces/draft-IERC2612.sol
- ../../contracts/node_modules/@openzeppelin/contracts/metatx/ERC2771Context.sol
- ../../contracts/node_modules/@openzeppelin/contracts/metatx/MinimalForwarder.sol
- ../../contracts/node_modules/@openzeppelin/contracts/proxy/Clones.sol
- ../../contracts/node_modules/@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol
- ../../contracts/node_modules/@openzeppelin/contracts/proxy/ERC1967/ERC1967Upgrade.sol
- ../../contracts/node_modules/@openzeppelin/contracts/proxy/Proxy.sol
- ../../contracts/node_modules/@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol
- ../../contracts/node_modules/@openzeppelin/contracts/proxy/beacon/IBeacon.sol
- ../../contracts/node_modules/@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol
- ../../contracts/node_modules/@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol
- ../../contracts/node_modules/@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol
- ../../contracts/node_modules/@openzeppelin/contracts/proxy/utils/Initializable.sol
- ../../contracts/node_modules/@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts/security/Pausable.sol
- ../../contracts/node_modules/@openzeppelin/contracts/security/PullPayment.sol
- ../../contracts/node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/utils/ERC1155Receiver.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20FlashMint.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20VotesComp.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Wrapper.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/draft-IERC20Permit.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/presets/ERC20PresetFixedSupply.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/utils/TokenTimelock.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/draft-ERC721Votes.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC777/ERC777.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC777/IERC777.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC777/IERC777Recipient.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC777/IERC777Sender.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/ERC777/presets/ERC777PresetFixedSupply.sol
- ../../contracts/node_modules/@openzeppelin/contracts/token/common/ERC2981.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/Address.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/Arrays.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/Base64.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/Checkpoints.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/Context.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/Counters.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/Create2.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/Multicall.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/Strings.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/Timers.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/escrow/ConditionalEscrow.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/escrow/Escrow.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/escrow/RefundEscrow.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/introspection/ERC165.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/introspection/ERC165Checker.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/introspection/ERC165Storage.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/introspection/ERC1820Implementer.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/introspection/IERC165.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/introspection/IERC1820Implementer.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/introspection/IERC1820Registry.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/math/Math.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/math/SignedMath.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/math/SignedSafeMath.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/structs/BitMaps.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/structs/DoubleEndedQueue.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableMap.sol
- ../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol
- ../../contracts/node_modules/@openzeppelin/contracts/vendor/amb/IAMB.sol
- ../../contracts/node_modules/@openzeppelin/contracts/vendor/arbitrum/IArbSys.sol
- ../../contracts/node_modules/@openzeppelin/contracts/vendor/arbitrum/IBridge.sol
- ../../contracts/node_modules/@openzeppelin/contracts/vendor/arbitrum/IInbox.sol
- ../../contracts/node_modules/@openzeppelin/contracts/vendor/arbitrum/IMessageProvider.sol
- ../../contracts/node_modules/@openzeppelin/contracts/vendor/arbitrum/IOutbox.sol
- ../../contracts/node_modules/@openzeppelin/contracts/vendor/compound/ICompoundTimelock.sol
- ../../contracts/node_modules/@openzeppelin/contracts/vendor/optimism/ICrossDomainMessenger.sol
- ../../contracts/node_modules/@openzeppelin/contracts/vendor/polygon/IFxMessageProcessor.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlCrossChainUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/access/IAccessControlEnumerableUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/access/IAccessControlUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/CrossChainEnabledUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/amb/CrossChainEnabledAMBUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/amb/LibAMBUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/arbitrum/CrossChainEnabledArbitrumL1Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/arbitrum/CrossChainEnabledArbitrumL2Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/arbitrum/LibArbitrumL1Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/arbitrum/LibArbitrumL2Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/errorsUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/optimism/CrossChainEnabledOptimismUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/optimism/LibOptimismUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/polygon/CrossChainEnabledPolygonChildUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/finance/PaymentSplitterUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/finance/VestingWalletUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/IGovernorUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerWith46MigrationUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/compatibility/GovernorCompatibilityBravoUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/compatibility/IGovernorCompatibilityBravoUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorCountingSimpleUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorPreventLateQuorumUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorProposalThresholdUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorSettingsUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorTimelockCompoundUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorTimelockControlUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorVotesCompUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorVotesQuorumFractionUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorVotesUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/IGovernorTimelockUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/utils/IVotesUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/utils/VotesUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1155MetadataURIUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1155ReceiverUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1155Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1271Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1363ReceiverUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1363SpenderUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1363Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC165Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1820ImplementerUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1820RegistryUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC20MetadataUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC20Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC2981Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC3156FlashBorrowerUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC3156FlashLenderUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC3156Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC4626Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC721EnumerableUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC721MetadataUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC721ReceiverUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC721Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC777RecipientUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC777SenderUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC777Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/draft-IERC1822Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/draft-IERC2612Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/metatx/ERC2771ContextUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/metatx/MinimalForwarderUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/ClonesUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/beacon/IBeaconUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/security/PullPaymentUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155PausableUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155URIStorageUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/IERC1155MetadataURIUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/presets/ERC1155PresetMinterPauserUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155HolderUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155ReceiverUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20CappedUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20FlashMintUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PausableUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20SnapshotUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesCompUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20WrapperUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC4626Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/IERC20MetadataUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/draft-ERC20PermitUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/draft-IERC20PermitUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetFixedSupplyUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetMinterPauserUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/utils/TokenTimelockUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721RoyaltyUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721EnumerableUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/draft-ERC721VotesUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/presets/ERC721PresetMinterPauserAutoIdUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/utils/ERC721HolderUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/ERC777Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/IERC777RecipientUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/IERC777SenderUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/IERC777Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/presets/ERC777PresetFixedSupplyUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/common/ERC2981Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/ArraysUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/Base64Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/CheckpointsUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/Create2Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/MulticallUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/StorageSlotUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/TimersUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/SignatureCheckerUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/escrow/ConditionalEscrowUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/escrow/EscrowUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/escrow/RefundEscrowUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165CheckerUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165StorageUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC1820ImplementerUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/IERC1820ImplementerUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/IERC1820RegistryUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SignedMathUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SignedSafeMathUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/BitMapsUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/DoubleEndedQueueUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableMapUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/vendor/amb/IAMBUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/vendor/arbitrum/IArbSysUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/vendor/arbitrum/IBridgeUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/vendor/arbitrum/IInboxUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/vendor/arbitrum/IMessageProviderUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/vendor/arbitrum/IOutboxUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/vendor/compound/ICompoundTimelockUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/vendor/optimism/ICrossDomainMessengerUpgradeable.sol
- ../../contracts/node_modules/@openzeppelin/contracts-upgradeable/vendor/polygon/IFxMessageProcessorUpgradeable.sol
- ../../contracts/node_modules/eth-gas-reporter/mock/contracts/ConvertLib.sol
- ../../contracts/node_modules/eth-gas-reporter/mock/contracts/EncoderV2.sol
- ../../contracts/node_modules/eth-gas-reporter/mock/contracts/EtherRouter/EtherRouter.sol
- ../../contracts/node_modules/eth-gas-reporter/mock/contracts/EtherRouter/Factory.sol
- ../../contracts/node_modules/eth-gas-reporter/mock/contracts/EtherRouter/Resolver.sol
- ../../contracts/node_modules/eth-gas-reporter/mock/contracts/EtherRouter/VersionA.sol
- ../../contracts/node_modules/eth-gas-reporter/mock/contracts/EtherRouter/VersionB.sol
- ../../contracts/node_modules/eth-gas-reporter/mock/contracts/MetaCoin.sol
- ../../contracts/node_modules/eth-gas-reporter/mock/contracts/Migrations.sol
- ../../contracts/node_modules/eth-gas-reporter/mock/contracts/MultiContractFile.sol
- ../../contracts/node_modules/eth-gas-reporter/mock/contracts/Undeployed.sol
- ../../contracts/node_modules/eth-gas-reporter/mock/contracts/VariableConstructor.sol
- ../../contracts/node_modules/eth-gas-reporter/mock/contracts/VariableCosts.sol
- ../../contracts/node_modules/eth-gas-reporter/mock/contracts/Wallets/Wallet.sol
- ../../contracts/node_modules/eth-gas-reporter/mock/test/TestMetacoin.sol
- ../../contracts/node_modules/hardhat/console.sol
- ../../contracts/node_modules/hardhat/sample-projects/javascript/contracts/Lock.sol
- ../../contracts/node_modules/hardhat/sample-projects/typescript/contracts/Lock.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.6/proxy/Proxied.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/UsingDiamondOwner.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/interfaces/IDiamondCut.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.7/proxy/Proxied.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/Diamond.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/UsingDiamondOwner.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/facets/DiamondCutFacet.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/facets/DiamondLoupeFacet.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/facets/DiamondLoupeFacetWithoutSupportsInterface.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/facets/OwnershipFacet.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/initializers/DiamondERC165Init.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/interfaces/IDiamondCut.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/interfaces/IDiamondLoupe.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/interfaces/IERC165.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/interfaces/IERC173.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/access/Ownable.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/interfaces/draft-IERC1822.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/Clones.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/ERC1967/ERC1967Proxy.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/ERC1967/ERC1967Upgrade.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/Proxy.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/beacon/BeaconProxy.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/beacon/IBeacon.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/beacon/UpgradeableBeacon.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/transparent/ProxyAdmin.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/transparent/TransparentUpgradeableProxy.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/utils/Initializable.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/utils/UUPSUpgradeable.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/Address.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/Context.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/StorageSlot.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/introspection/ERC165.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/introspection/ERC165Checker.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/introspection/ERC165Storage.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/introspection/IERC165.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/proxy/EIP173Proxy.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/proxy/EIP173ProxyWithReceive.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/proxy/OptimizedTransparentUpgradeableProxy.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/proxy/Proxied.sol
- ../../contracts/node_modules/hardhat-deploy/solc_0.8/proxy/Proxy.sol
- ../../contracts/node_modules/solady/src/Milady.sol
- ../../contracts/node_modules/solady/src/auth/Ownable.sol
- ../../contracts/node_modules/solady/src/auth/OwnableRoles.sol
- ../../contracts/node_modules/solady/src/utils/Base64.sol
- ../../contracts/node_modules/solady/src/utils/CREATE3.sol
- ../../contracts/node_modules/solady/src/utils/Clone.sol
- ../../contracts/node_modules/solady/src/utils/DateTimeLib.sol
- ../../contracts/node_modules/solady/src/utils/DynamicBufferLib.sol
- ../../contracts/node_modules/solady/src/utils/ECDSA.sol
- ../../contracts/node_modules/solady/src/utils/EIP712.sol
- ../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol
- ../../contracts/node_modules/solady/src/utils/LibBit.sol
- ../../contracts/node_modules/solady/src/utils/LibBitmap.sol
- ../../contracts/node_modules/solady/src/utils/LibClone.sol
- ../../contracts/node_modules/solady/src/utils/LibMap.sol
- ../../contracts/node_modules/solady/src/utils/LibPRNG.sol
- ../../contracts/node_modules/solady/src/utils/LibRLP.sol
- ../../contracts/node_modules/solady/src/utils/LibSort.sol
- ../../contracts/node_modules/solady/src/utils/LibString.sol
- ../../contracts/node_modules/solady/src/utils/MerkleProofLib.sol
- ../../contracts/node_modules/solady/src/utils/MinHeapLib.sol
- ../../contracts/node_modules/solady/src/utils/Multicallable.sol
- ../../contracts/node_modules/solady/src/utils/SSTORE2.sol
- ../../contracts/node_modules/solady/src/utils/SafeCastLib.sol
- ../../contracts/node_modules/solady/src/utils/SafeTransferLib.sol
- ../../contracts/node_modules/solady/src/utils/SignatureCheckerLib.sol
- ../../contracts/node_modules/solmate/src/auth/Auth.sol
- ../../contracts/node_modules/solmate/src/auth/Owned.sol
- ../../contracts/node_modules/solmate/src/auth/authorities/MultiRolesAuthority.sol
- ../../contracts/node_modules/solmate/src/auth/authorities/RolesAuthority.sol
- ../../contracts/node_modules/solmate/src/mixins/ERC4626.sol
- ../../contracts/node_modules/solmate/src/test/Auth.t.sol
- ../../contracts/node_modules/solmate/src/test/Bytes32AddressLib.t.sol
- ../../contracts/node_modules/solmate/src/test/CREATE3.t.sol
- ../../contracts/node_modules/solmate/src/test/DSTestPlus.t.sol
- ../../contracts/node_modules/solmate/src/test/ERC1155.t.sol
- ../../contracts/node_modules/solmate/src/test/ERC20.t.sol
- ../../contracts/node_modules/solmate/src/test/ERC4626.t.sol
- ../../contracts/node_modules/solmate/src/test/ERC721.t.sol
- ../../contracts/node_modules/solmate/src/test/FixedPointMathLib.t.sol
- ../../contracts/node_modules/solmate/src/test/LibString.t.sol
- ../../contracts/node_modules/solmate/src/test/MerkleProofLib.t.sol
- ../../contracts/node_modules/solmate/src/test/MultiRolesAuthority.t.sol
- ../../contracts/node_modules/solmate/src/test/Owned.t.sol
- ../../contracts/node_modules/solmate/src/test/ReentrancyGuard.t.sol
- ../../contracts/node_modules/solmate/src/test/RolesAuthority.t.sol
- ../../contracts/node_modules/solmate/src/test/SSTORE2.t.sol
- ../../contracts/node_modules/solmate/src/test/SafeCastLib.t.sol
- ../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol
- ../../contracts/node_modules/solmate/src/test/SignedWadMath.t.sol
- ../../contracts/node_modules/solmate/src/test/WETH.t.sol
- ../../contracts/node_modules/solmate/src/test/utils/DSInvariantTest.sol
- ../../contracts/node_modules/solmate/src/test/utils/DSTestPlus.sol
- ../../contracts/node_modules/solmate/src/test/utils/Hevm.sol
- ../../contracts/node_modules/solmate/src/test/utils/mocks/MockAuthChild.sol
- ../../contracts/node_modules/solmate/src/test/utils/mocks/MockAuthority.sol
- ../../contracts/node_modules/solmate/src/test/utils/mocks/MockERC1155.sol
- ../../contracts/node_modules/solmate/src/test/utils/mocks/MockERC20.sol
- ../../contracts/node_modules/solmate/src/test/utils/mocks/MockERC4626.sol
- ../../contracts/node_modules/solmate/src/test/utils/mocks/MockERC721.sol
- ../../contracts/node_modules/solmate/src/test/utils/mocks/MockOwned.sol
- ../../contracts/node_modules/solmate/src/test/utils/weird-tokens/MissingReturnToken.sol
- ../../contracts/node_modules/solmate/src/test/utils/weird-tokens/ReturnsFalseToken.sol
- ../../contracts/node_modules/solmate/src/test/utils/weird-tokens/ReturnsGarbageToken.sol
- ../../contracts/node_modules/solmate/src/test/utils/weird-tokens/ReturnsTooLittleToken.sol
- ../../contracts/node_modules/solmate/src/test/utils/weird-tokens/ReturnsTooMuchToken.sol
- ../../contracts/node_modules/solmate/src/test/utils/weird-tokens/ReturnsTwoToken.sol
- ../../contracts/node_modules/solmate/src/test/utils/weird-tokens/RevertingToken.sol
- ../../contracts/node_modules/solmate/src/tokens/ERC1155.sol
- ../../contracts/node_modules/solmate/src/tokens/ERC20.sol
- ../../contracts/node_modules/solmate/src/tokens/ERC721.sol
- ../../contracts/node_modules/solmate/src/tokens/WETH.sol
- ../../contracts/node_modules/solmate/src/utils/Bytes32AddressLib.sol
- ../../contracts/node_modules/solmate/src/utils/CREATE3.sol
- ../../contracts/node_modules/solmate/src/utils/FixedPointMathLib.sol
- ../../contracts/node_modules/solmate/src/utils/LibString.sol
- ../../contracts/node_modules/solmate/src/utils/MerkleProofLib.sol
- ../../contracts/node_modules/solmate/src/utils/ReentrancyGuard.sol
- ../../contracts/node_modules/solmate/src/utils/SSTORE2.sol
- ../../contracts/node_modules/solmate/src/utils/SafeCastLib.sol
- ../../contracts/node_modules/solmate/src/utils/SafeTransferLib.sol
- ../../contracts/node_modules/solmate/src/utils/SignedWadMath.sol

## Issues found

### Don't Initialize Variables with Default Value

#### Impact
Issue Information: [G001](https://github.com/byterocket/c4-common-issues/blob/main/0-Gas-Optimizations.md#g001---dont-initialize-variables-with-default-value)

#### Findings:
```
../../contracts/build/c4udit/examples/Test.sol::4 => uint256 a = 0;
../../contracts/build/c4udit/examples/Test.sol::12 => for (uint256 i = 0; i < array.length; i++) {
../../contracts/node_modules/@ensdomains/ens/contracts/HashRegistrar.sol::438 => for (uint i = 0; i < _hashes.length; i ++) {
../../contracts/node_modules/@ensdomains/ens/contracts/HashRegistrar.sol::522 => uint len = 0;
../../contracts/node_modules/@ensdomains/resolver/contracts/PublicResolver.sol::59 => for(uint i = 0; i < data.length; i++) {
../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/DNSResolver.sol::54 => uint16 resource = 0;
../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/DNSResolver.sol::55 => uint256 offset = 0;
../../contracts/node_modules/@openzeppelin/contracts/finance/PaymentSplitter.sol::55 => for (uint256 i = 0; i < payees.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::324 => for (uint256 i = 0; i < targets.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::341 => for (uint256 i = 0; i < targets.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::91 => for (uint256 i = 0; i < proposers.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::97 => for (uint256 i = 0; i < executors.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::249 => for (uint256 i = 0; i < targets.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::326 => for (uint256 i = 0; i < targets.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts/governance/compatibility/GovernorCompatibilityBravo.sol::132 => for (uint256 i = 0; i < signatures.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorTimelockCompound.sol::103 => for (uint256 i = 0; i < targets.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorTimelockCompound.sol::129 => for (uint256 i = 0; i < targets.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorTimelockCompound.sol::148 => for (uint256 i = 0; i < targets.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::93 => for (uint256 i = 0; i < accounts.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::213 => for (uint256 i = 0; i < ids.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::312 => for (uint256 i = 0; i < ids.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::378 => for (uint256 i = 0; i < ids.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol::47 => for (uint256 i = 0; i < ids.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol::53 => for (uint256 i = 0; i < ids.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol::110 => uint256 low = 0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC777/ERC777.sol::69 => for (uint256 i = 0; i < defaultOperators_.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts/utils/Arrays.sol::26 => uint256 low = 0;
../../contracts/node_modules/@openzeppelin/contracts/utils/Checkpoints.sol::43 => uint256 low = 0;
../../contracts/node_modules/@openzeppelin/contracts/utils/Multicall.sol::19 => for (uint256 i = 0; i < data.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts/utils/Strings.sol::46 => uint256 length = 0;
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol::58 => for (uint256 i = 0; i < proof.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol::71 => for (uint256 i = 0; i < proof.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol::131 => uint256 leafPos = 0;
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol::132 => uint256 hashPos = 0;
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol::133 => uint256 proofPos = 0;
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol::139 => for (uint256 i = 0; i < totalHashes; i++) {
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol::177 => uint256 leafPos = 0;
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol::178 => uint256 hashPos = 0;
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol::179 => uint256 proofPos = 0;
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol::185 => for (uint256 i = 0; i < totalHashes; i++) {
../../contracts/node_modules/@openzeppelin/contracts/utils/introspection/ERC165Checker.sol::62 => for (uint256 i = 0; i < interfaceIds.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts/utils/introspection/ERC165Checker.sol::86 => for (uint256 i = 0; i < interfaceIds.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/finance/PaymentSplitterUpgradeable.sol::60 => for (uint256 i = 0; i < payees.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::330 => for (uint256 i = 0; i < targets.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::347 => for (uint256 i = 0; i < targets.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::100 => for (uint256 i = 0; i < proposers.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::106 => for (uint256 i = 0; i < executors.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::258 => for (uint256 i = 0; i < targets.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::335 => for (uint256 i = 0; i < targets.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/compatibility/GovernorCompatibilityBravoUpgradeable.sol::138 => for (uint256 i = 0; i < signatures.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorTimelockCompoundUpgradeable.sol::108 => for (uint256 i = 0; i < targets.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorTimelockCompoundUpgradeable.sol::134 => for (uint256 i = 0; i < targets.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorTimelockCompoundUpgradeable.sol::153 => for (uint256 i = 0; i < targets.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::98 => for (uint256 i = 0; i < accounts.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::218 => for (uint256 i = 0; i < ids.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::317 => for (uint256 i = 0; i < ids.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::383 => for (uint256 i = 0; i < ids.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol::53 => for (uint256 i = 0; i < ids.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol::59 => for (uint256 i = 0; i < ids.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesUpgradeable.sol::116 => uint256 low = 0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/ERC777Upgradeable.sol::78 => for (uint256 i = 0; i < defaultOperators_.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/ArraysUpgradeable.sol::26 => uint256 low = 0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/CheckpointsUpgradeable.sol::43 => uint256 low = 0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/MulticallUpgradeable.sol::25 => for (uint256 i = 0; i < data.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol::46 => uint256 length = 0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol::58 => for (uint256 i = 0; i < proof.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol::71 => for (uint256 i = 0; i < proof.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol::131 => uint256 leafPos = 0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol::132 => uint256 hashPos = 0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol::133 => uint256 proofPos = 0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol::139 => for (uint256 i = 0; i < totalHashes; i++) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol::177 => uint256 leafPos = 0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol::178 => uint256 hashPos = 0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol::179 => uint256 proofPos = 0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol::185 => for (uint256 i = 0; i < totalHashes; i++) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165CheckerUpgradeable.sol::62 => for (uint256 i = 0; i < interfaceIds.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165CheckerUpgradeable.sol::86 => for (uint256 i = 0; i < interfaceIds.length; i++) {
../../contracts/node_modules/eth-gas-reporter/mock/contracts/VariableCosts.sol::29 => for(uint i = 0; i < adds.length; i++)
../../contracts/node_modules/eth-gas-reporter/mock/contracts/VariableCosts.sol::34 => for(uint i = 0; i < dels.length; i++)
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/Diamond.sol::35 => for (uint256 i = 0; i < _initializations.length; i++) {
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/initializers/DiamondERC165Init.sol::17 => for (uint256 i = 0; i < interfaceIds.length; i++) {
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/initializers/DiamondERC165Init.sol::21 => for (uint256 i = 0; i < interfaceIdsToRemove.length; i++) {
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/introspection/ERC165Checker.sol::62 => for (uint256 i = 0; i < interfaceIds.length; i++) {
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/introspection/ERC165Checker.sol::86 => for (uint256 i = 0; i < interfaceIds.length; i++) {
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::880 => for (uint256 i = 0; i < minLength; i++) {
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::895 => for (uint256 i = 0; i < normalizedIds.length; i++) {
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::914 => for (uint256 i = 0; i < minLength; i++) {
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::935 => for (uint256 i = 0; i < normalizedIds.length; i++) {
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::979 => for (uint256 i = 0; i < minLength; i++) {
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::996 => for (uint256 i = 0; i < normalizedIds.length; i++) {
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1111 => for (uint256 i = 0; i < minLength; i++) {
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1134 => for (uint256 i = 0; i < normalizedIds.length; i++) {
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1159 => for (uint256 i = 0; i < minLength; i++) {
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1188 => for (uint256 i = 0; i < normalizedIds.length; i++) {
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1208 => for (uint256 i = 0; i < minLength; i++) {
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1226 => for (uint256 i = 0; i < normalizedTos.length; i++) {
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1392 => for (uint256 i = 0; i < minLength; i++) {
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1430 => for (uint256 i = 0; i < minLength; i++) {
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1468 => for (uint256 i = 0; i < minLength; i++) {
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1512 => for (uint256 i = 0; i < minLength; i++) {
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1556 => for (uint256 i = 0; i < minLength; i++) {
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1615 => for (uint256 i = 0; i < minLength; i++) {
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1643 => for (uint256 i = 0; i < minLength; i++) {
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1671 => for (uint256 i = 0; i < minLength; i++) {
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1699 => for (uint256 i = 0; i < minLength; i++) {
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1741 => for (uint256 i = 0; i < minLength; i++) {
../../contracts/node_modules/solmate/src/test/utils/DSTestPlus.sol::143 => for (uint256 i = 0; i < a.length; i++) {
../../contracts/node_modules/solmate/src/tokens/ERC1155.sol::93 => for (uint256 i = 0; i < ids.length; ) {
../../contracts/node_modules/solmate/src/tokens/ERC1155.sol::131 => for (uint256 i = 0; i < owners.length; ++i) {
../../contracts/node_modules/solmate/src/tokens/ERC1155.sol::181 => for (uint256 i = 0; i < idsLength; ) {
../../contracts/node_modules/solmate/src/tokens/ERC1155.sol::211 => for (uint256 i = 0; i < idsLength; ) {
```
#### Tools used
[c4udit](https://github.com/byterocket/c4udit)

### Cache Array Length Outside of Loop

#### Impact
Issue Information: [G002](https://github.com/byterocket/c4-common-issues/blob/main/0-Gas-Optimizations.md#g002---cache-array-length-outside-of-loop)

#### Findings:
```
../../contracts/build/c4udit/examples/Test.sol::12 => for (uint256 i = 0; i < array.length; i++) {
../../contracts/contracts/BadgerOrganization.sol::54 => uint256 tosLength = _tos.length;
../../contracts/contracts/BadgerOrganization.sol::57 => tosLength == _amounts.length,
../../contracts/contracts/BadgerOrganization.sol::58 => "BadgerOrganization::mintBatch: _tos and _amounts must be the same length."
../../contracts/contracts/BadgerOrganization.sol::97 => uint256 fromsLength = _froms.length;
../../contracts/contracts/BadgerOrganization.sol::100 => fromsLength == _amounts.length,
../../contracts/contracts/BadgerOrganization.sol::101 => "BadgerOrganization::revokeBatch: _from and _amounts must be the same length."
../../contracts/contracts/BadgerOrganization.sol::149 => if (bytes(_uri).length != 0) {
../../contracts/contracts/BadgerOrganizationLogic.sol::122 => bytes(_uri).length != 0,
../../contracts/contracts/BadgerOrganizationLogic.sol::141 => bytes(_uri).length != 0,
../../contracts/contracts/BadgerOrganizationLogic.sol::159 => uint256 managersLength = _managers.length;
../../contracts/contracts/BadgerOrganizationLogic.sol::163 => managersLength == _isManager.length,
../../contracts/contracts/BadgerOrganizationLogic.sol::164 => "BadgerScout::setManagers: _managers and _isManager must be the same length."
../../contracts/contracts/BadgerOrganizationLogic.sol::197 => uint256 managersLength = _managers.length;
../../contracts/contracts/BadgerOrganizationLogic.sol::201 => managersLength == _isManager.length,
../../contracts/contracts/BadgerOrganizationLogic.sol::202 => "BadgerScout::setManagers: _managers and _isManager must be the same length."
../../contracts/contracts/BadgerOrganizationLogic.sol::234 => uint256 hooksLength = _hooks.length;
../../contracts/contracts/BadgerOrganizationLogic.sol::238 => hooksLength == _isHook.length,
../../contracts/contracts/BadgerOrganizationLogic.sol::239 => "BadgerScout::setHooks: _hooks and _isHook must be the same length."
../../contracts/contracts/hooks/BadgerHooked.sol::84 => uint256 hooksLength = _hooks.length();
../../contracts/contracts/hooks/BadgerHooked.sol::184 => uint256 slotHooksLength = slotHooks.length;
../../contracts/contracts/hooks/transfer/BadgerTransferBound.sol::51 => uint256 idsLength = _ids.length;
../../contracts/contracts/hooks/transfer/BadgerTransferBoundManaged.sol::63 => uint256 idsLength = _ids.length;
../../contracts/node_modules/@ensdomains/ens/contracts/HashRegistrar.sol::304 => require(labels.length != 0);
../../contracts/node_modules/@ensdomains/ens/contracts/HashRegistrar.sol::305 => require(state(labels[labels.length - 1]) != Mode.Owned);
../../contracts/node_modules/@ensdomains/ens/contracts/HashRegistrar.sol::307 => _eraseNodeHierarchy(labels.length - 1, labels, rootNode);
../../contracts/node_modules/@ensdomains/ens/contracts/HashRegistrar.sol::438 => for (uint i = 0; i < _hashes.length; i ++) {
../../contracts/node_modules/@ensdomains/ens/contracts/HashRegistrar.sol::508 => * @dev Returns the length of a given string
../../contracts/node_modules/@ensdomains/ens/contracts/HashRegistrar.sol::510 => * @param s The string to measure the length of
../../contracts/node_modules/@ensdomains/ens/contracts/HashRegistrar.sol::511 => * @return The length of the input string
../../contracts/node_modules/@ensdomains/resolver/contracts/PublicResolver.sol::58 => results = new bytes[](data.length);
../../contracts/node_modules/@ensdomains/resolver/contracts/PublicResolver.sol::59 => for(uint i = 0; i < data.length; i++) {
../../contracts/node_modules/@ensdomains/resolver/contracts/ResolverBase.sol::18 => require(b.length == 20);
../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/ABIResolver.sol::40 => if ((contentType & contentTypes) != 0 && abiset[contentType].length > 0) {
../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/AddrResolver.sol::32 => if(a.length == 0) {
../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/DNSResolver.sol::69 => setDNSRRSet(node, name, resource, data, offset, iter.offset - offset, value.length == 0);
../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/DNSResolver.sol::78 => if (name.length > 0) {
../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/DNSResolver.sol::79 => setDNSRRSet(node, name, resource, data, offset, data.length - offset, value.length == 0);
../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/DNSResolver.sol::129 => if (records[node][version][nameHash][resource].length != 0) {
../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/DNSResolver.sol::135 => if (records[node][version][nameHash][resource].length == 0) {
../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/InterfaceResolver.sol::48 => if(!success || returnData.length < 32 || returnData[31] == 0) {
../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/InterfaceResolver.sol::54 => if(!success || returnData.length < 32 || returnData[31] == 0) {
../../contracts/node_modules/@openzeppelin/contracts/access/AccessControlEnumerable.sol::46 => return _roleMembers[role].length();
../../contracts/node_modules/@openzeppelin/contracts/finance/PaymentSplitter.sol::48 => * All addresses in `payees` must be non-zero. Both arrays must have the same non-zero length, and there must be no
../../contracts/node_modules/@openzeppelin/contracts/finance/PaymentSplitter.sol::52 => require(payees.length == shares_.length, "PaymentSplitter: payees and shares length mismatch");
../../contracts/node_modules/@openzeppelin/contracts/finance/PaymentSplitter.sol::53 => require(payees.length > 0, "PaymentSplitter: no payees");
../../contracts/node_modules/@openzeppelin/contracts/finance/PaymentSplitter.sol::55 => for (uint256 i = 0; i < payees.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::258 => require(targets.length == values.length, "Governor: invalid proposal length");
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::259 => require(targets.length == calldatas.length, "Governor: invalid proposal length");
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::260 => require(targets.length > 0, "Governor: empty proposal");
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::276 => new string[](targets.length),
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::324 => for (uint256 i = 0; i < targets.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::341 => for (uint256 i = 0; i < targets.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::528 => if (params.length == 0) {
../../contracts/node_modules/@openzeppelin/contracts/governance/IGovernor.sol::240 => * Emits a {VoteCast} or {VoteCastWithParams} event depending on the length of params.
../../contracts/node_modules/@openzeppelin/contracts/governance/IGovernor.sol::265 => * Emits a {VoteCast} or {VoteCastWithParams} event depending on the length of params.
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::91 => for (uint256 i = 0; i < proposers.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::97 => for (uint256 i = 0; i < executors.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::244 => require(targets.length == values.length, "TimelockController: length mismatch");
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::245 => require(targets.length == payloads.length, "TimelockController: length mismatch");
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::249 => for (uint256 i = 0; i < targets.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::320 => require(targets.length == values.length, "TimelockController: length mismatch");
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::321 => require(targets.length == payloads.length, "TimelockController: length mismatch");
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::326 => for (uint256 i = 0; i < targets.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts/governance/compatibility/GovernorCompatibilityBravo.sol::62 => _storeProposal(_msgSender(), targets, values, new string[](calldatas.length), calldatas, description);
../../contracts/node_modules/@openzeppelin/contracts/governance/compatibility/GovernorCompatibilityBravo.sol::130 => bytes[] memory fullcalldatas = new bytes[](calldatas.length);
../../contracts/node_modules/@openzeppelin/contracts/governance/compatibility/GovernorCompatibilityBravo.sol::132 => for (uint256 i = 0; i < signatures.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts/governance/compatibility/GovernorCompatibilityBravo.sol::133 => fullcalldatas[i] = bytes(signatures[i]).length == 0
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorTimelockCompound.sol::103 => for (uint256 i = 0; i < targets.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorTimelockCompound.sol::129 => for (uint256 i = 0; i < targets.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorTimelockCompound.sol::148 => for (uint256 i = 0; i < targets.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol::39 => return _quorumNumeratorHistory._checkpoints.length == 0 ? _quorumNumerator : _quorumNumeratorHistory.latest();
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol::47 => uint256 length = _quorumNumeratorHistory._checkpoints.length;
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol::48 => if (length == 0) {
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol::53 => Checkpoints.Checkpoint memory latest = _quorumNumeratorHistory._checkpoints[length - 1];
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol::108 => if (oldQuorumNumerator != 0 && _quorumNumeratorHistory._checkpoints.length == 0) {
../../contracts/node_modules/@openzeppelin/contracts/metatx/ERC2771Context.sol::38 => return msg.data[:msg.data.length - 20];
../../contracts/node_modules/@openzeppelin/contracts/proxy/ERC1967/ERC1967Upgrade.sol::71 => if (data.length > 0 || forceCall) {
../../contracts/node_modules/@openzeppelin/contracts/proxy/ERC1967/ERC1967Upgrade.sol::181 => if (data.length > 0 || forceCall) {
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::80 => * - `accounts` and `ids` must have the same length.
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::89 => require(accounts.length == ids.length, "ERC1155: accounts and ids length mismatch");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::91 => uint256[] memory batchBalances = new uint256[](accounts.length);
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::93 => for (uint256 i = 0; i < accounts.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::206 => require(ids.length == amounts.length, "ERC1155: ids and amounts length mismatch");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::213 => for (uint256 i = 0; i < ids.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::295 => * - `ids` and `amounts` must have the same length.
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::306 => require(ids.length == amounts.length, "ERC1155: ids and amounts length mismatch");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::312 => for (uint256 i = 0; i < ids.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::364 => * - `ids` and `amounts` must have the same length.
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::372 => require(ids.length == amounts.length, "ERC1155: ids and amounts length mismatch");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::378 => for (uint256 i = 0; i < ids.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::414 => * transfers, the length of the `ids` and `amounts` arrays will be 1.
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::425 => * - `ids` and `amounts` have the same, non-zero length.
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::443 => * transfers, the length of the `id` and `amount` arrays will be 1.
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::454 => * - `ids` and `amounts` have the same, non-zero length.
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155.sol::61 => * - `accounts` and `ids` must have the same length.
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155.sol::114 => * - `ids` and `amounts` must have the same length.
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol::46 => * @param ids An array containing ids of each token being transferred (order and length must match values array)
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol::47 => * @param values An array containing amounts of each token being transferred (order and length must match ids array)
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol::47 => for (uint256 i = 0; i < ids.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol::53 => for (uint256 i = 0; i < ids.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol::46 => return bytes(tokenURI).length > 0 ? string(abi.encodePacked(_baseURI, tokenURI)) : super.uri(tokenId);
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol::165 => if (index == snapshots.ids.length) {
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol::189 => if (ids.length == 0) {
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol::192 => return ids[ids.length - 1];
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol::51 => return SafeCast.toUint32(_checkpoints[account].length);
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol::65 => uint256 pos = _checkpoints[account].length;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol::109 => uint256 high = ckpts.length;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol::231 => uint256 pos = ckpts.length;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol::111 => if (returndata.length > 0) {
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol::97 => return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString())) : "";
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol::155 => //solhint-disable-next-line max-line-length
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol::404 => if (reason.length == 0) {
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol::22 => //solhint-disable-next-line max-line-length
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol::46 => return _allTokens.length;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol::97 => uint256 length = ERC721.balanceOf(to);
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol::98 => _ownedTokens[to][length] = tokenId;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol::99 => _ownedTokensIndex[tokenId] = length;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol::107 => _allTokensIndex[tokenId] = _allTokens.length;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol::148 => uint256 lastTokenIndex = _allTokens.length - 1;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol::27 => if (bytes(base).length == 0) {
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol::31 => if (bytes(_tokenURI).length > 0) {
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol::58 => if (bytes(_tokenURIs[tokenId]).length != 0) {
../../contracts/node_modules/@openzeppelin/contracts/token/ERC777/ERC777.sol::69 => for (uint256 i = 0; i < defaultOperators_.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts/utils/Address.sol::37 => // This method relies on extcodesize/address.code.length, which returns 0
../../contracts/node_modules/@openzeppelin/contracts/utils/Address.sol::41 => return account.code.length > 0;
../../contracts/node_modules/@openzeppelin/contracts/utils/Address.sol::210 => if (returndata.length > 0) {
../../contracts/node_modules/@openzeppelin/contracts/utils/Arrays.sol::15 => * values in the array are strictly less than `element`), the array length is
../../contracts/node_modules/@openzeppelin/contracts/utils/Arrays.sol::22 => if (array.length == 0) {
../../contracts/node_modules/@openzeppelin/contracts/utils/Arrays.sol::27 => uint256 high = array.length;
../../contracts/node_modules/@openzeppelin/contracts/utils/Base64.sol::25 => if (data.length == 0) return "";
../../contracts/node_modules/@openzeppelin/contracts/utils/Base64.sol::32 => // The final Base64 length should be `bytes` data length multiplied by 4/3 rounded up
../../contracts/node_modules/@openzeppelin/contracts/utils/Base64.sol::33 => // - `data.length + 2`  -> Round up
../../contracts/node_modules/@openzeppelin/contracts/utils/Base64.sol::36 => string memory result = new string(4 * ((data.length + 2) / 3));
../../contracts/node_modules/@openzeppelin/contracts/utils/Base64.sol::40 => // Prepare the lookup table (skip the first "length" byte)
../../contracts/node_modules/@openzeppelin/contracts/utils/Base64.sol::43 => // Prepare result pointer, jump over length
../../contracts/node_modules/@openzeppelin/contracts/utils/Checkpoints.sol::31 => uint256 pos = self._checkpoints.length;
../../contracts/node_modules/@openzeppelin/contracts/utils/Checkpoints.sol::42 => uint256 high = self._checkpoints.length;
../../contracts/node_modules/@openzeppelin/contracts/utils/Checkpoints.sol::61 => uint256 pos = self._checkpoints.length;
../../contracts/node_modules/@openzeppelin/contracts/utils/Create2.sol::37 => require(bytecode.length != 0, "Create2: bytecode length is zero");
../../contracts/node_modules/@openzeppelin/contracts/utils/Multicall.sol::18 => results = new bytes[](data.length);
../../contracts/node_modules/@openzeppelin/contracts/utils/Multicall.sol::19 => for (uint256 i = 0; i < data.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts/utils/Strings.sol::46 => uint256 length = 0;
../../contracts/node_modules/@openzeppelin/contracts/utils/Strings.sol::48 => length++;
../../contracts/node_modules/@openzeppelin/contracts/utils/Strings.sol::51 => return toHexString(value, length);
../../contracts/node_modules/@openzeppelin/contracts/utils/Strings.sol::55 => * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation with fixed length.
../../contracts/node_modules/@openzeppelin/contracts/utils/Strings.sol::57 => function toHexString(uint256 value, uint256 length) internal pure returns (string memory) {
../../contracts/node_modules/@openzeppelin/contracts/utils/Strings.sol::58 => bytes memory buffer = new bytes(2 * length + 2);
../../contracts/node_modules/@openzeppelin/contracts/utils/Strings.sol::61 => for (uint256 i = 2 * length + 1; i > 1; --i) {
../../contracts/node_modules/@openzeppelin/contracts/utils/Strings.sol::65 => require(value == 0, "Strings: hex length insufficient");
../../contracts/node_modules/@openzeppelin/contracts/utils/Strings.sol::70 => * @dev Converts an `address` with fixed length of 20 bytes to its not checksummed ASCII `string` hexadecimal representation.
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol::29 => revert("ECDSA: invalid signature length");
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol::58 => if (signature.length == 65) {
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol::189 => // 32 is the length in bytes of hash,
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol::203 => return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n", Strings.toString(s.length), s));
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol::58 => for (uint256 i = 0; i < proof.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol::71 => for (uint256 i = 0; i < proof.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol::122 => uint256 leavesLen = leaves.length;
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol::123 => uint256 totalHashes = proofFlags.length;
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol::126 => require(leavesLen + proof.length - 1 == totalHashes, "MerkleProof: invalid multiproof");
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol::168 => uint256 leavesLen = leaves.length;
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol::169 => uint256 totalHashes = proofFlags.length;
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol::172 => require(leavesLen + proof.length - 1 == totalHashes, "MerkleProof: invalid multiproof");
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol::39 => result.length == 32 &&
../../contracts/node_modules/@openzeppelin/contracts/utils/introspection/ERC165Checker.sol::57 => bool[] memory interfaceIdsSupported = new bool[](interfaceIds.length);
../../contracts/node_modules/@openzeppelin/contracts/utils/introspection/ERC165Checker.sol::62 => for (uint256 i = 0; i < interfaceIds.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts/utils/introspection/ERC165Checker.sol::86 => for (uint256 i = 0; i < interfaceIds.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/DoubleEndedQueue.sol::131 => * `length(deque) - 1`.
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/DoubleEndedQueue.sol::156 => function length(Bytes32Deque storage deque) internal view returns (uint256) {
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableMap.sol::99 => function length(Bytes32ToBytes32Map storage map) internal view returns (uint256) {
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableMap.sol::100 => return map._keys.length();
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableMap.sol::111 => * - `index` must be strictly less than {length}.
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableMap.sol::200 => function length(UintToUintMap storage map) internal view returns (uint256) {
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableMap.sol::201 => return length(map._inner);
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableMap.sol::211 => * - `index` must be strictly less than {length}.
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableMap.sol::292 => function length(UintToAddressMap storage map) internal view returns (uint256) {
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableMap.sol::293 => return length(map._inner);
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableMap.sol::303 => * - `index` must be strictly less than {length}.
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableMap.sol::386 => function length(AddressToUintMap storage map) internal view returns (uint256) {
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableMap.sol::387 => return length(map._inner);
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableMap.sol::397 => * - `index` must be strictly less than {length}.
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableMap.sol::478 => function length(Bytes32ToUintMap storage map) internal view returns (uint256) {
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableMap.sol::479 => return length(map._inner);
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableMap.sol::489 => * - `index` must be strictly less than {length}.
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol::65 => // The value is stored at length-1, but we add 1 to all indexes
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol::67 => set._indexes[value] = set._values.length;
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol::91 => uint256 lastIndex = set._values.length - 1;
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol::124 => function _length(Set storage set) private view returns (uint256) {
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol::125 => return set._values.length;
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol::136 => * - `index` must be strictly less than {length}.
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol::190 => function length(Bytes32Set storage set) internal view returns (uint256) {
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol::191 => return _length(set._inner);
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol::202 => * - `index` must be strictly less than {length}.
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol::256 => function length(AddressSet storage set) internal view returns (uint256) {
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol::257 => return _length(set._inner);
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol::268 => * - `index` must be strictly less than {length}.
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol::330 => function length(UintSet storage set) internal view returns (uint256) {
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol::331 => return _length(set._inner);
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol::342 => * - `index` must be strictly less than {length}.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol::52 => return _roleMembers[role].length();
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/finance/PaymentSplitterUpgradeable.sol::49 => * All addresses in `payees` must be non-zero. Both arrays must have the same non-zero length, and there must be no
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/finance/PaymentSplitterUpgradeable.sol::57 => require(payees.length == shares_.length, "PaymentSplitter: payees and shares length mismatch");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/finance/PaymentSplitterUpgradeable.sol::58 => require(payees.length > 0, "PaymentSplitter: no payees");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/finance/PaymentSplitterUpgradeable.sol::60 => for (uint256 i = 0; i < payees.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::264 => require(targets.length == values.length, "Governor: invalid proposal length");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::265 => require(targets.length == calldatas.length, "Governor: invalid proposal length");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::266 => require(targets.length > 0, "Governor: empty proposal");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::282 => new string[](targets.length),
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::330 => for (uint256 i = 0; i < targets.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::347 => for (uint256 i = 0; i < targets.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::534 => if (params.length == 0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/IGovernorUpgradeable.sol::246 => * Emits a {VoteCast} or {VoteCastWithParams} event depending on the length of params.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/IGovernorUpgradeable.sol::271 => * Emits a {VoteCast} or {VoteCastWithParams} event depending on the length of params.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::100 => for (uint256 i = 0; i < proposers.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::106 => for (uint256 i = 0; i < executors.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::253 => require(targets.length == values.length, "TimelockController: length mismatch");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::254 => require(targets.length == payloads.length, "TimelockController: length mismatch");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::258 => for (uint256 i = 0; i < targets.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::329 => require(targets.length == values.length, "TimelockController: length mismatch");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::330 => require(targets.length == payloads.length, "TimelockController: length mismatch");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::335 => for (uint256 i = 0; i < targets.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/compatibility/GovernorCompatibilityBravoUpgradeable.sol::68 => _storeProposal(_msgSender(), targets, values, new string[](calldatas.length), calldatas, description);
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/compatibility/GovernorCompatibilityBravoUpgradeable.sol::136 => bytes[] memory fullcalldatas = new bytes[](calldatas.length);
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/compatibility/GovernorCompatibilityBravoUpgradeable.sol::138 => for (uint256 i = 0; i < signatures.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/compatibility/GovernorCompatibilityBravoUpgradeable.sol::139 => fullcalldatas[i] = bytes(signatures[i]).length == 0
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorTimelockCompoundUpgradeable.sol::108 => for (uint256 i = 0; i < targets.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorTimelockCompoundUpgradeable.sol::134 => for (uint256 i = 0; i < targets.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorTimelockCompoundUpgradeable.sol::153 => for (uint256 i = 0; i < targets.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorVotesQuorumFractionUpgradeable.sol::44 => return _quorumNumeratorHistory._checkpoints.length == 0 ? _quorumNumerator : _quorumNumeratorHistory.latest();
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorVotesQuorumFractionUpgradeable.sol::52 => uint256 length = _quorumNumeratorHistory._checkpoints.length;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorVotesQuorumFractionUpgradeable.sol::53 => if (length == 0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorVotesQuorumFractionUpgradeable.sol::58 => CheckpointsUpgradeable.Checkpoint memory latest = _quorumNumeratorHistory._checkpoints[length - 1];
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorVotesQuorumFractionUpgradeable.sol::113 => if (oldQuorumNumerator != 0 && _quorumNumeratorHistory._checkpoints.length == 0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/metatx/ERC2771ContextUpgradeable.sol::39 => return msg.data[:msg.data.length - 20];
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol::77 => if (data.length > 0 || forceCall) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol::187 => if (data.length > 0 || forceCall) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::85 => * - `accounts` and `ids` must have the same length.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::94 => require(accounts.length == ids.length, "ERC1155: accounts and ids length mismatch");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::96 => uint256[] memory batchBalances = new uint256[](accounts.length);
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::98 => for (uint256 i = 0; i < accounts.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::211 => require(ids.length == amounts.length, "ERC1155: ids and amounts length mismatch");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::218 => for (uint256 i = 0; i < ids.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::300 => * - `ids` and `amounts` must have the same length.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::311 => require(ids.length == amounts.length, "ERC1155: ids and amounts length mismatch");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::317 => for (uint256 i = 0; i < ids.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::369 => * - `ids` and `amounts` must have the same length.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::377 => require(ids.length == amounts.length, "ERC1155: ids and amounts length mismatch");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::383 => for (uint256 i = 0; i < ids.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::419 => * transfers, the length of the `ids` and `amounts` arrays will be 1.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::430 => * - `ids` and `amounts` have the same, non-zero length.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::448 => * transfers, the length of the `id` and `amount` arrays will be 1.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::459 => * - `ids` and `amounts` have the same, non-zero length.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol::46 => * @param ids An array containing ids of each token being transferred (order and length must match values array)
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol::47 => * @param values An array containing amounts of each token being transferred (order and length must match ids array)
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol::61 => * - `accounts` and `ids` must have the same length.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol::114 => * - `ids` and `amounts` must have the same length.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol::53 => for (uint256 i = 0; i < ids.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol::59 => for (uint256 i = 0; i < ids.length; ++i) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155URIStorageUpgradeable.sol::54 => return bytes(tokenURI).length > 0 ? string(abi.encodePacked(_baseURI, tokenURI)) : super.uri(tokenId);
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20SnapshotUpgradeable.sol::171 => if (index == snapshots.ids.length) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20SnapshotUpgradeable.sol::195 => if (ids.length == 0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20SnapshotUpgradeable.sol::198 => return ids[ids.length - 1];
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesUpgradeable.sol::57 => return SafeCastUpgradeable.toUint32(_checkpoints[account].length);
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesUpgradeable.sol::71 => uint256 pos = _checkpoints[account].length;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesUpgradeable.sol::115 => uint256 high = ckpts.length;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesUpgradeable.sol::237 => uint256 pos = ckpts.length;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol::111 => if (returndata.length > 0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol::102 => return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString())) : "";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol::160 => //solhint-disable-next-line max-line-length
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol::409 => if (reason.length == 0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol::28 => //solhint-disable-next-line max-line-length
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol::52 => return _allTokens.length;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol::103 => uint256 length = ERC721Upgradeable.balanceOf(to);
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol::104 => _ownedTokens[to][length] = tokenId;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol::105 => _ownedTokensIndex[tokenId] = length;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol::113 => _allTokensIndex[tokenId] = _allTokens.length;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol::154 => uint256 lastTokenIndex = _allTokens.length - 1;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol::33 => if (bytes(base).length == 0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol::37 => if (bytes(_tokenURI).length > 0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol::64 => if (bytes(_tokenURIs[tokenId]).length != 0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/ERC777Upgradeable.sol::78 => for (uint256 i = 0; i < defaultOperators_.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol::37 => // This method relies on extcodesize/address.code.length, which returns 0
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol::41 => return account.code.length > 0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol::183 => if (returndata.length > 0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/ArraysUpgradeable.sol::15 => * values in the array are strictly less than `element`), the array length is
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/ArraysUpgradeable.sol::22 => if (array.length == 0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/ArraysUpgradeable.sol::27 => uint256 high = array.length;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/Base64Upgradeable.sol::25 => if (data.length == 0) return "";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/Base64Upgradeable.sol::32 => // The final Base64 length should be `bytes` data length multiplied by 4/3 rounded up
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/Base64Upgradeable.sol::33 => // - `data.length + 2`  -> Round up
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/Base64Upgradeable.sol::36 => string memory result = new string(4 * ((data.length + 2) / 3));
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/Base64Upgradeable.sol::40 => // Prepare the lookup table (skip the first "length" byte)
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/Base64Upgradeable.sol::43 => // Prepare result pointer, jump over length
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/CheckpointsUpgradeable.sol::31 => uint256 pos = self._checkpoints.length;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/CheckpointsUpgradeable.sol::42 => uint256 high = self._checkpoints.length;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/CheckpointsUpgradeable.sol::61 => uint256 pos = self._checkpoints.length;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/Create2Upgradeable.sol::37 => require(bytecode.length != 0, "Create2: bytecode length is zero");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/MulticallUpgradeable.sol::24 => results = new bytes[](data.length);
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/MulticallUpgradeable.sol::25 => for (uint256 i = 0; i < data.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol::46 => uint256 length = 0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol::48 => length++;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol::51 => return toHexString(value, length);
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol::55 => * @dev Converts a `uint256` to its ASCII `string` hexadecimal representation with fixed length.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol::57 => function toHexString(uint256 value, uint256 length) internal pure returns (string memory) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol::58 => bytes memory buffer = new bytes(2 * length + 2);
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol::61 => for (uint256 i = 2 * length + 1; i > 1; --i) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol::65 => require(value == 0, "Strings: hex length insufficient");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol::70 => * @dev Converts an `address` with fixed length of 20 bytes to its not checksummed ASCII `string` hexadecimal representation.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol::29 => revert("ECDSA: invalid signature length");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol::58 => if (signature.length == 65) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol::189 => // 32 is the length in bytes of hash,
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol::203 => return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n", StringsUpgradeable.toString(s.length), s));
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol::58 => for (uint256 i = 0; i < proof.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol::71 => for (uint256 i = 0; i < proof.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol::122 => uint256 leavesLen = leaves.length;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol::123 => uint256 totalHashes = proofFlags.length;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol::126 => require(leavesLen + proof.length - 1 == totalHashes, "MerkleProof: invalid multiproof");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol::168 => uint256 leavesLen = leaves.length;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol::169 => uint256 totalHashes = proofFlags.length;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol::172 => require(leavesLen + proof.length - 1 == totalHashes, "MerkleProof: invalid multiproof");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/SignatureCheckerUpgradeable.sol::39 => result.length == 32 &&
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165CheckerUpgradeable.sol::57 => bool[] memory interfaceIdsSupported = new bool[](interfaceIds.length);
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165CheckerUpgradeable.sol::62 => for (uint256 i = 0; i < interfaceIds.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165CheckerUpgradeable.sol::86 => for (uint256 i = 0; i < interfaceIds.length; i++) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/DoubleEndedQueueUpgradeable.sol::131 => * `length(deque) - 1`.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/DoubleEndedQueueUpgradeable.sol::156 => function length(Bytes32Deque storage deque) internal view returns (uint256) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableMapUpgradeable.sol::99 => function length(Bytes32ToBytes32Map storage map) internal view returns (uint256) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableMapUpgradeable.sol::100 => return map._keys.length();
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableMapUpgradeable.sol::111 => * - `index` must be strictly less than {length}.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableMapUpgradeable.sol::200 => function length(UintToUintMap storage map) internal view returns (uint256) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableMapUpgradeable.sol::201 => return length(map._inner);
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableMapUpgradeable.sol::211 => * - `index` must be strictly less than {length}.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableMapUpgradeable.sol::292 => function length(UintToAddressMap storage map) internal view returns (uint256) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableMapUpgradeable.sol::293 => return length(map._inner);
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableMapUpgradeable.sol::303 => * - `index` must be strictly less than {length}.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableMapUpgradeable.sol::386 => function length(AddressToUintMap storage map) internal view returns (uint256) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableMapUpgradeable.sol::387 => return length(map._inner);
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableMapUpgradeable.sol::397 => * - `index` must be strictly less than {length}.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableMapUpgradeable.sol::478 => function length(Bytes32ToUintMap storage map) internal view returns (uint256) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableMapUpgradeable.sol::479 => return length(map._inner);
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableMapUpgradeable.sol::489 => * - `index` must be strictly less than {length}.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol::65 => // The value is stored at length-1, but we add 1 to all indexes
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol::67 => set._indexes[value] = set._values.length;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol::91 => uint256 lastIndex = set._values.length - 1;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol::124 => function _length(Set storage set) private view returns (uint256) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol::125 => return set._values.length;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol::136 => * - `index` must be strictly less than {length}.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol::190 => function length(Bytes32Set storage set) internal view returns (uint256) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol::191 => return _length(set._inner);
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol::202 => * - `index` must be strictly less than {length}.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol::256 => function length(AddressSet storage set) internal view returns (uint256) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol::257 => return _length(set._inner);
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol::268 => * - `index` must be strictly less than {length}.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol::330 => function length(UintSet storage set) internal view returns (uint256) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol::331 => return _length(set._inner);
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol::342 => * - `index` must be strictly less than {length}.
../../contracts/node_modules/eth-gas-reporter/mock/contracts/VariableCosts.sol::29 => for(uint i = 0; i < adds.length; i++)
../../contracts/node_modules/eth-gas-reporter/mock/contracts/VariableCosts.sol::34 => for(uint i = 0; i < dels.length; i++)
../../contracts/node_modules/hardhat/console.sol::8 => uint256 payloadLength = payload.length;
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::72 => for (uint256 facetIndex; facetIndex < _diamondCut.length; facetIndex++) {
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::89 => require(_functionSelectors.length > 0, "LibDiamondCut: No selectors in facet to cut");
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::91 => // uint16 selectorCount = uint16(diamondStorage().selectors.length);
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::93 => uint16 selectorPosition = uint16(ds.facetFunctionSelectors[_facetAddress].functionSelectors.length);
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::97 => ds.facetFunctionSelectors[_facetAddress].facetAddressPosition = uint16(ds.facetAddresses.length);
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::100 => for (uint256 selectorIndex; selectorIndex < _functionSelectors.length; selectorIndex++) {
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::112 => require(_functionSelectors.length > 0, "LibDiamondCut: No selectors in facet to cut");
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::115 => uint16 selectorPosition = uint16(ds.facetFunctionSelectors[_facetAddress].functionSelectors.length);
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::119 => ds.facetFunctionSelectors[_facetAddress].facetAddressPosition = uint16(ds.facetAddresses.length);
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::122 => for (uint256 selectorIndex; selectorIndex < _functionSelectors.length; selectorIndex++) {
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::136 => require(_functionSelectors.length > 0, "LibDiamondCut: No selectors in facet to cut");
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::140 => for (uint256 selectorIndex; selectorIndex < _functionSelectors.length; selectorIndex++) {
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::154 => uint256 lastSelectorPosition = ds.facetFunctionSelectors[_facetAddress].functionSelectors.length - 1;
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::168 => uint256 lastFacetAddressPosition = ds.facetAddresses.length - 1;
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::182 => require(_calldata.length == 0, "LibDiamondCut: _init is address(0) but_calldata is not empty");
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::184 => require(_calldata.length > 0, "LibDiamondCut: _calldata is empty but _init is not address(0)");
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::190 => if (error.length > 0) {
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/Diamond.sol::35 => for (uint256 i = 0; i < _initializations.length; i++) {
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/facets/DiamondLoupeFacet.sol::26 => uint256 numFacets = ds.facetAddresses.length;
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/facets/DiamondLoupeFacetWithoutSupportsInterface.sol::25 => uint256 numFacets = ds.facetAddresses.length;
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/initializers/DiamondERC165Init.sol::17 => for (uint256 i = 0; i < interfaceIds.length; i++) {
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/initializers/DiamondERC165Init.sol::21 => for (uint256 i = 0; i < interfaceIdsToRemove.length; i++) {
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::70 => for (uint256 facetIndex; facetIndex < _diamondCut.length; facetIndex++) {
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::87 => require(_functionSelectors.length > 0, "LibDiamondCut: No selectors in facet to cut");
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::90 => uint96 selectorPosition = uint96(ds.facetFunctionSelectors[_facetAddress].functionSelectors.length);
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::95 => for (uint256 selectorIndex; selectorIndex < _functionSelectors.length; selectorIndex++) {
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::105 => require(_functionSelectors.length > 0, "LibDiamondCut: No selectors in facet to cut");
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::108 => uint96 selectorPosition = uint96(ds.facetFunctionSelectors[_facetAddress].functionSelectors.length);
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::113 => for (uint256 selectorIndex; selectorIndex < _functionSelectors.length; selectorIndex++) {
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::124 => require(_functionSelectors.length > 0, "LibDiamondCut: No selectors in facet to cut");
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::128 => for (uint256 selectorIndex; selectorIndex < _functionSelectors.length; selectorIndex++) {
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::137 => ds.facetFunctionSelectors[_facetAddress].facetAddressPosition = ds.facetAddresses.length;
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::154 => uint256 lastSelectorPosition = ds.facetFunctionSelectors[_facetAddress].functionSelectors.length - 1;
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::168 => uint256 lastFacetAddressPosition = ds.facetAddresses.length - 1;
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::182 => require(_calldata.length == 0, "LibDiamondCut: _init is address(0) but_calldata is not empty");
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::184 => require(_calldata.length > 0, "LibDiamondCut: _calldata is empty but _init is not address(0)");
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::190 => if (error.length > 0) {
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/ERC1967/ERC1967Upgrade.sol::71 => if (data.length > 0 || forceCall) {
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/ERC1967/ERC1967Upgrade.sol::178 => if (data.length > 0 || forceCall) {
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/Address.sol::37 => // This method relies on extcodesize/address.code.length, which returns 0
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/Address.sol::41 => return account.code.length > 0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/Address.sol::210 => if (returndata.length > 0) {
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/introspection/ERC165Checker.sol::57 => bool[] memory interfaceIdsSupported = new bool[](interfaceIds.length);
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/introspection/ERC165Checker.sol::62 => for (uint256 i = 0; i < interfaceIds.length; i++) {
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/introspection/ERC165Checker.sol::86 => for (uint256 i = 0; i < interfaceIds.length; i++) {
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/introspection/ERC165Checker.sol::110 => if (result.length < 32) return false;
../../contracts/node_modules/hardhat-deploy/solc_0.8/proxy/Proxy.sol::54 => if (data.length > 0) {
../../contracts/node_modules/solady/src/auth/OwnableRoles.sol::247 => // Store the length of `ordinals`.
../../contracts/node_modules/solady/src/utils/Base64.sol::38 => // Skip the first slot, which stores the length.
../../contracts/node_modules/solady/src/utils/Base64.sol::73 => // Write the length of the string.
../../contracts/node_modules/solady/src/utils/Base64.sol::134 => // Write the length of the bytes.
../../contracts/node_modules/solady/src/utils/Base64.sol::137 => // Skip the first slot, which stores the length.
../../contracts/node_modules/solady/src/utils/CREATE3.sol::84 => // 0xd6 = 0xc0 (short RLP prefix) + 0x16 (length of: 0x94 ++ proxy ++ 0x01).
../../contracts/node_modules/solady/src/utils/CREATE3.sol::85 => // 0x94 = 0x80 + 0x14 (0x14 = the length of an address, 20 bytes, in hex).
../../contracts/node_modules/solady/src/utils/CREATE3.sol::139 => // 0xd6 = 0xc0 (short RLP prefix) + 0x16 (length of: 0x94 ++ proxy ++ 0x01).
../../contracts/node_modules/solady/src/utils/CREATE3.sol::140 => // 0x94 = 0x80 + 0x14 (0x14 = the length of an address, 20 bytes, in hex).
../../contracts/node_modules/solady/src/utils/Clone.sol::10 => function _getArgBytes(uint256 argOffset, uint256 length)
../../contracts/node_modules/solady/src/utils/Clone.sol::20 => // Store the array length.
../../contracts/node_modules/solady/src/utils/Clone.sol::21 => mstore(arg, length)
../../contracts/node_modules/solady/src/utils/Clone.sol::23 => calldatacopy(add(arg, 0x20), add(offset, argOffset), length)
../../contracts/node_modules/solady/src/utils/Clone.sol::25 => mstore(0x40, and(add(add(arg, 0x3f), length), not(0x1f)))
../../contracts/node_modules/solady/src/utils/Clone.sol::48 => function _getArgUint256Array(uint256 argOffset, uint256 length)
../../contracts/node_modules/solady/src/utils/Clone.sol::58 => // Store the array length.
../../contracts/node_modules/solady/src/utils/Clone.sol::59 => mstore(arg, length)
../../contracts/node_modules/solady/src/utils/Clone.sol::61 => calldatacopy(add(arg, 0x20), add(offset, argOffset), shl(5, length))
../../contracts/node_modules/solady/src/utils/Clone.sol::63 => mstore(0x40, add(add(arg, 0x20), shl(5, length)))
../../contracts/node_modules/solady/src/utils/DynamicBufferLib.sol::47 => // Note that we need to allocate an exta word for the length, and
../../contracts/node_modules/solady/src/utils/DynamicBufferLib.sol::72 => // Store the `capacity` multiplied by `prime` in the word before the `length`.
../../contracts/node_modules/solady/src/utils/DynamicBufferLib.sol::80 => // Store the `capacity` multiplied by `prime` in the word before the `length`.
../../contracts/node_modules/solady/src/utils/ECDSA.sol::57 => // If the signature is exactly 65 bytes in length.
../../contracts/node_modules/solady/src/utils/ECDSA.sol::58 => eq(signature.length, 65),
../../contracts/node_modules/solady/src/utils/ECDSA.sol::169 => if iszero(xor(signature.length, 65)) {
../../contracts/node_modules/solady/src/utils/ECDSA.sol::290 => // The length of "\x19Ethereum Signed Message:\n" is 26 bytes (i.e. 0x1a).
../../contracts/node_modules/solady/src/utils/ECDSA.sol::292 => // ASCII decimal representation of the length of `s` up to about 2 ** 126.
../../contracts/node_modules/solady/src/utils/ECDSA.sol::297 => // The length of `s` is in bytes.
../../contracts/node_modules/solady/src/utils/ECDSA.sol::303 => // Convert the length of the bytes to ASCII decimal representation
../../contracts/node_modules/solady/src/utils/ECDSA.sol::329 => signature.length := 0
../../contracts/node_modules/solady/src/utils/LibPRNG.sol::82 => // if the length of the array is not a power of 2.
../../contracts/node_modules/solady/src/utils/LibPRNG.sol::127 => // if the length of the array is not a power of 2.
../../contracts/node_modules/solady/src/utils/LibRLP.sol::36 => // and as a result it only has a length prefix, 0x80,
../../contracts/node_modules/solady/src/utils/LibRLP.sol::40 => // own value as a length prefix,
../../contracts/node_modules/solady/src/utils/LibRLP.sol::41 => // there is no additional `0x80 + length` prefix that precedes it.
../../contracts/node_modules/solady/src/utils/LibSort.sol::40 => mstore(a, n) // Restore the length of `a`.
../../contracts/node_modules/solady/src/utils/LibSort.sol::210 => mstore(a, n) // Restore the length of `a`.
../../contracts/node_modules/solady/src/utils/LibSort.sol::237 => // If the length of `a` is greater than 1.
../../contracts/node_modules/solady/src/utils/LibSort.sol::538 => mstore(c, shr(5, sub(k, c))) // Store the length of `c`.
../../contracts/node_modules/solady/src/utils/LibSort.sol::575 => mstore(c, shr(5, sub(k, c))) // Store the length of `c`.
../../contracts/node_modules/solady/src/utils/LibSort.sol::626 => mstore(c, shr(5, sub(k, c))) // Store the length of `c`.
../../contracts/node_modules/solady/src/utils/LibString.sol::12 => /// @dev The `length` of the output is too small to contain all the hex digits.
../../contracts/node_modules/solady/src/utils/LibString.sol::32 => // We will need 1 word for the trailing zeros padding, 1 word for the length,
../../contracts/node_modules/solady/src/utils/LibString.sol::40 => // Cache the end of the memory to calculate the length later.
../../contracts/node_modules/solady/src/utils/LibString.sol::56 => let length := sub(end, str)
../../contracts/node_modules/solady/src/utils/LibString.sol::57 => // Move the pointer 32 bytes leftwards to make room for the length.
../../contracts/node_modules/solady/src/utils/LibString.sol::59 => // Store the length.
../../contracts/node_modules/solady/src/utils/LibString.sol::60 => mstore(str, length)
../../contracts/node_modules/solady/src/utils/LibString.sol::76 => let length := mload(str) // Load the string length.
../../contracts/node_modules/solady/src/utils/LibString.sol::79 => mstore(str, add(length, 1)) // Update the string length.
../../contracts/node_modules/solady/src/utils/LibString.sol::88 => /// left-padded to an input length of `length` bytes.
../../contracts/node_modules/solady/src/utils/LibString.sol::90 => /// giving a total length of `length * 2 + 2` bytes.
../../contracts/node_modules/solady/src/utils/LibString.sol::91 => /// Reverts if `length` is too small for the output to contain all the digits.
../../contracts/node_modules/solady/src/utils/LibString.sol::92 => function toHexString(uint256 value, uint256 length) internal pure returns (string memory str) {
../../contracts/node_modules/solady/src/utils/LibString.sol::93 => str = toHexStringNoPrefix(value, length);
../../contracts/node_modules/solady/src/utils/LibString.sol::96 => let strLength := add(mload(str), 2) // Compute the length.
../../contracts/node_modules/solady/src/utils/LibString.sol::99 => mstore(str, strLength) // Write the length.
../../contracts/node_modules/solady/src/utils/LibString.sol::104 => /// left-padded to an input length of `length` bytes.
../../contracts/node_modules/solady/src/utils/LibString.sol::106 => /// giving a total length of `length * 2` bytes.
../../contracts/node_modules/solady/src/utils/LibString.sol::107 => /// Reverts if `length` is too small for the output to contain all the digits.
../../contracts/node_modules/solady/src/utils/LibString.sol::108 => function toHexStringNoPrefix(uint256 value, uint256 length)
../../contracts/node_modules/solady/src/utils/LibString.sol::115 => // We need 0x20 bytes for the trailing zeros padding, `length * 2` bytes
../../contracts/node_modules/solady/src/utils/LibString.sol::116 => // for the digits, 0x02 bytes for the prefix, and 0x20 bytes for the length.
../../contracts/node_modules/solady/src/utils/LibString.sol::119 => str := add(mload(0x40), and(add(shl(1, length), 0x42), not(0x1f)))
../../contracts/node_modules/solady/src/utils/LibString.sol::125 => // Cache the end to calculate the length later.
../../contracts/node_modules/solady/src/utils/LibString.sol::130 => let start := sub(str, add(length, length))
../../contracts/node_modules/solady/src/utils/LibString.sol::150 => // Compute the string's length.
../../contracts/node_modules/solady/src/utils/LibString.sol::152 => // Move the pointer and write the length.
../../contracts/node_modules/solady/src/utils/LibString.sol::161 => /// a length of `20 * 2 + 2` bytes.
../../contracts/node_modules/solady/src/utils/LibString.sol::166 => let strLength := add(mload(str), 2) // Compute the length.
../../contracts/node_modules/solady/src/utils/LibString.sol::169 => mstore(str, strLength) // Write the length.
../../contracts/node_modules/solady/src/utils/LibString.sol::176 => /// a length of `20 * 2` bytes.
../../contracts/node_modules/solady/src/utils/LibString.sol::180 => // We need 0x20 bytes for the trailing zeros padding, 0x20 bytes for the length,
../../contracts/node_modules/solady/src/utils/LibString.sol::189 => // Cache the end to calculate the length later.
../../contracts/node_modules/solady/src/utils/LibString.sol::205 => // Compute the string's length.
../../contracts/node_modules/solady/src/utils/LibString.sol::207 => // Move the pointer and write the length.
../../contracts/node_modules/solady/src/utils/LibString.sol::242 => let strLength := add(mload(str), 2) // Compute the length.
../../contracts/node_modules/solady/src/utils/LibString.sol::245 => mstore(str, strLength) // Write the length.
../../contracts/node_modules/solady/src/utils/LibString.sol::257 => // We need 0x20 bytes for the trailing zeros padding, 0x20 bytes for the length,
../../contracts/node_modules/solady/src/utils/LibString.sol::292 => let strLength := add(mload(str), 2) // Compute the length.
../../contracts/node_modules/solady/src/utils/LibString.sol::295 => mstore(str, strLength) // Write the length.
../../contracts/node_modules/solady/src/utils/LibString.sol::304 => let length := mload(raw)
../../contracts/node_modules/solady/src/utils/LibString.sol::306 => mstore(str, add(length, length)) // Store the length of the output.
../../contracts/node_modules/solady/src/utils/LibString.sol::312 => let end := add(raw, length)
../../contracts/node_modules/solady/src/utils/LibString.sol::424 => // Allocate memory for the length and the bytes,
../../contracts/node_modules/solady/src/utils/LibString.sol::427 => // Store the length of the result.
../../contracts/node_modules/solady/src/utils/LibString.sol::624 => // Store the length.
../../contracts/node_modules/solady/src/utils/LibString.sol::627 => // Allocate memory for the length and the bytes,
../../contracts/node_modules/solady/src/utils/LibString.sol::660 => // Allocate memory for the length and the bytes,
../../contracts/node_modules/solady/src/utils/LibString.sol::728 => // Store the length of `result`.
../../contracts/node_modules/solady/src/utils/LibString.sol::767 => // Allocate memory for the length and the bytes,
../../contracts/node_modules/solady/src/utils/LibString.sol::815 => // Stores the length.
../../contracts/node_modules/solady/src/utils/LibString.sol::817 => // Allocate memory for the length and the bytes,
../../contracts/node_modules/solady/src/utils/LibString.sol::831 => let length := mload(subject)
../../contracts/node_modules/solady/src/utils/LibString.sol::832 => if length {
../../contracts/node_modules/solady/src/utils/LibString.sol::837 => for { let o := length } 1 {} {
../../contracts/node_modules/solady/src/utils/LibString.sol::845 => // Stores the string length.
../../contracts/node_modules/solady/src/utils/LibString.sol::846 => mstore(result, length)
../../contracts/node_modules/solady/src/utils/LibString.sol::848 => let last := add(add(result, 0x20), length)
../../contracts/node_modules/solady/src/utils/LibString.sol::850 => // Allocate memory for the length and the bytes,
../../contracts/node_modules/solady/src/utils/LibString.sol::898 => // Store the length of the result.
../../contracts/node_modules/solady/src/utils/LibString.sol::900 => // Allocate memory for the length and the bytes,
../../contracts/node_modules/solady/src/utils/LibString.sol::952 => // Store the length of the result.
../../contracts/node_modules/solady/src/utils/LibString.sol::954 => // Allocate memory for the length and the bytes,
../../contracts/node_modules/solady/src/utils/LibString.sol::967 => /// @dev Packs a single string with its length into a single word.
../../contracts/node_modules/solady/src/utils/LibString.sol::968 => /// Returns `bytes32(0)` if the length is zero or greater than 31.
../../contracts/node_modules/solady/src/utils/LibString.sol::976 => // Load the length and the bytes.
../../contracts/node_modules/solady/src/utils/LibString.sol::978 => // `length != 0 && length < 32`. Abuses underflow.
../../contracts/node_modules/solady/src/utils/LibString.sol::979 => // Assumes that the length is valid and within the block gas limit.
../../contracts/node_modules/solady/src/utils/LibString.sol::993 => // Allocate 2 words (1 for the length, 1 for the bytes).
../../contracts/node_modules/solady/src/utils/LibString.sol::995 => // Zeroize the length slot.
../../contracts/node_modules/solady/src/utils/LibString.sol::997 => // Store the length and bytes.
../../contracts/node_modules/solady/src/utils/LibString.sol::1004 => /// @dev Packs two strings with their lengths into a single word.
../../contracts/node_modules/solady/src/utils/LibString.sol::1005 => /// Returns `bytes32(0)` if combined length is zero or greater than 30.
../../contracts/node_modules/solady/src/utils/LibString.sol::1014 => // Load the length and the bytes of `a` and `b`.
../../contracts/node_modules/solady/src/utils/LibString.sol::1020 => // Assumes that the lengths are valid and within the block gas limit.
../../contracts/node_modules/solady/src/utils/LibString.sol::1039 => // Allocate 2 words for each string (1 for the length, 1 for the byte). Total 4 words.
../../contracts/node_modules/solady/src/utils/LibString.sol::1041 => // Zeroize the length slots.
../../contracts/node_modules/solady/src/utils/LibString.sol::1044 => // Store the lengths and bytes.
../../contracts/node_modules/solady/src/utils/MerkleProofLib.sol::21 => if proof.length {
../../contracts/node_modules/solady/src/utils/MerkleProofLib.sol::23 => let end := add(proof.offset, shl(5, proof.length))
../../contracts/node_modules/solady/src/utils/MerkleProofLib.sol::64 => for {} eq(add(leafs.length, proof.length), add(flags.length, 1)) {} {
../../contracts/node_modules/solady/src/utils/MerkleProofLib.sol::65 => // For the case where `proof.length + leafs.length == 1`.
../../contracts/node_modules/solady/src/utils/MerkleProofLib.sol::66 => if iszero(flags.length) {
../../contracts/node_modules/solady/src/utils/MerkleProofLib.sol::67 => // `isValid = (proof.length == 1 ? proof[0] : leafs[0]) == root`.
../../contracts/node_modules/solady/src/utils/MerkleProofLib.sol::71 => xor(leafs.offset, mul(xor(proof.offset, leafs.offset), proof.length))
../../contracts/node_modules/solady/src/utils/MerkleProofLib.sol::85 => calldatacopy(hashesFront, leafs.offset, shl(5, leafs.length))
../../contracts/node_modules/solady/src/utils/MerkleProofLib.sol::87 => let hashesBack := add(hashesFront, shl(5, leafs.length))
../../contracts/node_modules/solady/src/utils/MerkleProofLib.sol::89 => // We recycle `flags.length` to save on stack variables
../../contracts/node_modules/solady/src/utils/MerkleProofLib.sol::91 => flags.length := add(hashesBack, shl(5, flags.length))
../../contracts/node_modules/solady/src/utils/MerkleProofLib.sol::124 => if iszero(lt(hashesBack, flags.length)) { break }
../../contracts/node_modules/solady/src/utils/MerkleProofLib.sol::141 => proof.length := 0
../../contracts/node_modules/solady/src/utils/MerkleProofLib.sol::149 => leafs.length := 0
../../contracts/node_modules/solady/src/utils/MerkleProofLib.sol::157 => flags.length := 0
../../contracts/node_modules/solady/src/utils/MinHeapLib.sol::48 => function length(Heap storage heap) internal view returns (uint256) {
../../contracts/node_modules/solady/src/utils/MinHeapLib.sol::49 => return heap.data.length;
../../contracts/node_modules/solady/src/utils/MinHeapLib.sol::75 => /// if the length of the heap exceeds `maxLength`.
../../contracts/node_modules/solady/src/utils/MinHeapLib.sol::124 => // Increment and update the length.
../../contracts/node_modules/solady/src/utils/MinHeapLib.sol::158 => // Decrement and update the length.
../../contracts/node_modules/solady/src/utils/MinHeapLib.sol::171 => // Increment and update the length.
../../contracts/node_modules/solady/src/utils/Multicallable.sol::20 => mstore(0x20, data.length) // Store `data.length` into `results`.
../../contracts/node_modules/solady/src/utils/Multicallable.sol::22 => if iszero(data.length) { return(0x00, 0x40) }
../../contracts/node_modules/solady/src/utils/Multicallable.sol::26 => let end := shl(5, data.length)
../../contracts/node_modules/solady/src/utils/Multicallable.sol::40 => calldataload(o) // The length of the current bytes.
../../contracts/node_modules/solady/src/utils/SSTORE2.sol::80 => // Restore original length of the variable size `data`.
../../contracts/node_modules/solady/src/utils/SSTORE2.sol::109 => // Restore original length of the variable size `data`.
../../contracts/node_modules/solady/src/utils/SSTORE2.sol::126 => // Restore original length of the variable size `data`.
../../contracts/node_modules/solady/src/utils/SSTORE2.sol::171 => // enough 32-byte words for the data and the length of the data,
../../contracts/node_modules/solady/src/utils/SSTORE2.sol::206 => // enough 32-byte words for the data and the length of the data,
../../contracts/node_modules/solady/src/utils/SSTORE2.sol::251 => // enough 32-byte words for the data and the length of the data,
../../contracts/node_modules/solady/src/utils/SignatureCheckerLib.sol::40 => // If the signature is exactly 65 bytes in length.
../../contracts/node_modules/solady/src/utils/SignatureCheckerLib.sol::41 => if iszero(xor(signature.length, 65)) {
../../contracts/node_modules/solady/src/utils/SignatureCheckerLib.sol::73 => mstore(add(m, 0x44), signature.length) // The signature length
../../contracts/node_modules/solady/src/utils/SignatureCheckerLib.sol::75 => calldatacopy(add(m, 0x64), signature.offset, signature.length)
../../contracts/node_modules/solady/src/utils/SignatureCheckerLib.sol::92 => add(signature.length, 0x64), // Length of calldata in memory.
../../contracts/node_modules/solady/src/utils/SignatureCheckerLib.sol::167 => mstore(add(m, 0x44), 65) // Store the length of the signature.
../../contracts/node_modules/solady/src/utils/SignatureCheckerLib.sol::220 => mstore(add(m, 0x44), signature.length) // The signature length
../../contracts/node_modules/solady/src/utils/SignatureCheckerLib.sol::222 => calldatacopy(add(m, 0x64), signature.offset, signature.length)
../../contracts/node_modules/solady/src/utils/SignatureCheckerLib.sol::239 => add(signature.length, 0x64), // Length of calldata in memory.
../../contracts/node_modules/solady/src/utils/SignatureCheckerLib.sol::283 => mstore(add(m, 0x44), 65) // Store the length of the signature.
../../contracts/node_modules/solady/src/utils/SignatureCheckerLib.sol::319 => signature.length := 0
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::841 => if (uint256(uint160(to)) <= 18 || to.code.length > 0) return;
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::873 => if (uint256(uint160(to)) <= 18 || to.code.length > 0) return;
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::875 => uint256 minLength = min2(ids.length, amounts.length);
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::895 => for (uint256 i = 0; i < normalizedIds.length; i++) {
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::909 => uint256 minLength = min2(ids.length, amounts.length);
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::935 => for (uint256 i = 0; i < normalizedIds.length; i++) {
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::951 => if (uint256(uint160(to)) <= 18 || to.code.length > 0) return;
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::971 => if (uint256(uint160(to)) <= 18 || to.code.length > 0) return;
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::973 => uint256 minLength = min3(ids.length, mintAmounts.length, burnAmounts.length);
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::996 => for (uint256 i = 0; i < normalizedIds.length; i++) {
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1019 => if (uint256(uint160(to)) <= 18 || to.code.length > 0) return;
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1079 => if (uint256(uint160(to)) <= 18 || to.code.length > 0) return;
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1101 => if (uint256(uint160(to)) <= 18 || to.code.length > 0) return;
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1105 => uint256 minLength = min3(ids.length, mintAmounts.length, transferAmounts.length);
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1134 => for (uint256 i = 0; i < normalizedIds.length; i++) {
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1153 => uint256 minLength = min3(ids.length, mintAmounts.length, transferAmounts.length);
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1188 => for (uint256 i = 0; i < normalizedIds.length; i++) {
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1203 => uint256 minLength = min3(tos.length, ids.length, amounts.length);
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1210 => address to = tos[i] == address(0) || tos[i].code.length > 0 ? address(0xBEEF) : tos[i];
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1226 => for (uint256 i = 0; i < normalizedTos.length; i++) {
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1384 => uint256 minLength = min3(ids.length, mintAmounts.length, transferAmounts.length);
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1424 => uint256 minLength = min3(ids.length, mintAmounts.length, transferAmounts.length);
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1462 => uint256 minLength = min3(ids.length, mintAmounts.length, transferAmounts.length);
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1506 => uint256 minLength = min3(ids.length, mintAmounts.length, transferAmounts.length);
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1550 => uint256 minLength = min3(ids.length, mintAmounts.length, transferAmounts.length);
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1595 => if (ids.length == transferAmounts.length) revert();
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1610 => uint256 minLength = min2(ids.length, amounts.length);
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1638 => uint256 minLength = min2(ids.length, amounts.length);
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1666 => uint256 minLength = min2(ids.length, amounts.length);
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1694 => uint256 minLength = min2(ids.length, amounts.length);
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1721 => if (ids.length == amounts.length) revert();
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1733 => uint256 minLength = min3(ids.length, mintAmounts.length, burnAmounts.length);
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1765 => if (ids.length == burnAmounts.length) revert();
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1773 => if (tos.length == ids.length) revert();
../../contracts/node_modules/solmate/src/test/ERC721.t.sol::483 => if (uint256(uint160(to)) <= 18 || to.code.length > 0) return;
../../contracts/node_modules/solmate/src/test/ERC721.t.sol::546 => if (uint256(uint160(to)) <= 18 || to.code.length > 0) return;
../../contracts/node_modules/solmate/src/test/LibString.t.sol::26 => assertEq(bytes(libString).length, bytes(oz).length);
../../contracts/node_modules/solmate/src/test/SSTORE2.t.sol::28 => assertBytesEq(SSTORE2.read(SSTORE2.write(testBytes), 0, testBytes.length), testBytes);
../../contracts/node_modules/solmate/src/test/SSTORE2.t.sol::75 => if (testBytes.length == 0) return;
../../contracts/node_modules/solmate/src/test/SSTORE2.t.sol::77 => startIndex = bound(startIndex, 0, testBytes.length);
../../contracts/node_modules/solmate/src/test/SSTORE2.t.sol::88 => if (testBytes.length == 0) return;
../../contracts/node_modules/solmate/src/test/SSTORE2.t.sol::90 => endIndex = bound(endIndex, 0, testBytes.length);
../../contracts/node_modules/solmate/src/test/SSTORE2.t.sol::91 => startIndex = bound(startIndex, 0, testBytes.length);
../../contracts/node_modules/solmate/src/test/SSTORE2.t.sol::106 => if (pointer.code.length > 0) revert();
../../contracts/node_modules/solmate/src/test/SSTORE2.t.sol::116 => if (pointer.code.length > 0) revert();
../../contracts/node_modules/solmate/src/test/SSTORE2.t.sol::127 => if (pointer.code.length > 0) revert();
../../contracts/node_modules/solmate/src/test/SSTORE2.t.sol::137 => startIndex = bound(startIndex, testBytes.length + 1, type(uint256).max);
../../contracts/node_modules/solmate/src/test/SSTORE2.t.sol::148 => endIndex = bound(endIndex, testBytes.length + 1, type(uint256).max);
../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol::161 => (garbage.length < 32 ||
../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol::193 => garbage[31] != bytes1(0x01))) && garbage.length != 0
../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol::207 => if (uint256(uint160(nonContract)) <= 18 || nonContract.code.length > 0) return;
../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol::251 => (garbage.length < 32 ||
../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol::283 => garbage[31] != bytes1(0x01))) && garbage.length != 0
../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol::298 => if (uint256(uint160(nonContract)) <= 18 || nonContract.code.length > 0) return;
../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol::334 => (garbage.length < 32 ||
../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol::366 => garbage[31] != bytes1(0x01))) && garbage.length != 0
../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol::380 => if (uint256(uint160(nonContract)) <= 18 || nonContract.code.length > 0) return;
../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol::391 => if (recipient.code.length > 0 || uint256(uint160(recipient)) <= 18 || recipient == msg.sender) return;
../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol::436 => require(garbage.length != 0 && (garbage.length < 32 || garbage[31] != bytes1(0x01)));
../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol::486 => require(garbage.length != 0 && (garbage.length < 32 || garbage[31] != bytes1(0x01)));
../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol::531 => require(garbage.length != 0 && (garbage.length < 32 || garbage[31] != bytes1(0x01)));
../../contracts/node_modules/solmate/src/test/utils/DSInvariantTest.sol::8 => require(targets.length > 0, "NO_TARGET_CONTRACTS");
../../contracts/node_modules/solmate/src/test/utils/DSTestPlus.sol::33 => let size := add(mload(brutalizeWith), 32) // Add 32 to include the 32 byte length slot.
../../contracts/node_modules/solmate/src/test/utils/DSTestPlus.sol::41 => size, // We want to pass the length of the bytes.
../../contracts/node_modules/solmate/src/test/utils/DSTestPlus.sol::141 => require(a.length == b.length, "LENGTH_MISMATCH");
../../contracts/node_modules/solmate/src/test/utils/DSTestPlus.sol::143 => for (uint256 i = 0; i < a.length; i++) {
../../contracts/node_modules/solmate/src/tokens/ERC1155.sol::70 => to.code.length == 0
../../contracts/node_modules/solmate/src/tokens/ERC1155.sol::85 => require(ids.length == amounts.length, "LENGTH_MISMATCH");
../../contracts/node_modules/solmate/src/tokens/ERC1155.sol::93 => for (uint256 i = 0; i < ids.length; ) {
../../contracts/node_modules/solmate/src/tokens/ERC1155.sol::100 => // An array can't have a total length
../../contracts/node_modules/solmate/src/tokens/ERC1155.sol::110 => to.code.length == 0
../../contracts/node_modules/solmate/src/tokens/ERC1155.sol::124 => require(owners.length == ids.length, "LENGTH_MISMATCH");
../../contracts/node_modules/solmate/src/tokens/ERC1155.sol::126 => balances = new uint256[](owners.length);
../../contracts/node_modules/solmate/src/tokens/ERC1155.sol::131 => for (uint256 i = 0; i < owners.length; ++i) {
../../contracts/node_modules/solmate/src/tokens/ERC1155.sol::163 => to.code.length == 0
../../contracts/node_modules/solmate/src/tokens/ERC1155.sol::177 => uint256 idsLength = ids.length; // Saves MLOADs.
../../contracts/node_modules/solmate/src/tokens/ERC1155.sol::179 => require(idsLength == amounts.length, "LENGTH_MISMATCH");
../../contracts/node_modules/solmate/src/tokens/ERC1155.sol::184 => // An array can't have a total length
../../contracts/node_modules/solmate/src/tokens/ERC1155.sol::194 => to.code.length == 0
../../contracts/node_modules/solmate/src/tokens/ERC1155.sol::207 => uint256 idsLength = ids.length; // Saves MLOADs.
../../contracts/node_modules/solmate/src/tokens/ERC1155.sol::209 => require(idsLength == amounts.length, "LENGTH_MISMATCH");
../../contracts/node_modules/solmate/src/tokens/ERC1155.sol::214 => // An array can't have a total length
../../contracts/node_modules/solmate/src/tokens/ERC721.sol::119 => to.code.length == 0 ||
../../contracts/node_modules/solmate/src/tokens/ERC721.sol::135 => to.code.length == 0 ||
../../contracts/node_modules/solmate/src/tokens/ERC721.sol::197 => to.code.length == 0 ||
../../contracts/node_modules/solmate/src/tokens/ERC721.sol::212 => to.code.length == 0 ||
../../contracts/node_modules/solmate/src/utils/CREATE3.sol::48 => // We start 32 bytes into the code to avoid copying the byte length.
../../contracts/node_modules/solmate/src/utils/CREATE3.sol::55 => require(success && deployed.code.length != 0, "INITIALIZATION_FAILED");
../../contracts/node_modules/solmate/src/utils/CREATE3.sol::75 => // 0xd6 = 0xc0 (short RLP prefix) + 0x16 (length of: 0x94 ++ proxy ++ 0x01)
../../contracts/node_modules/solmate/src/utils/CREATE3.sol::76 => // 0x94 = 0x80 + 0x14 (0x14 = the length of an address, 20 bytes, in hex)
../../contracts/node_modules/solmate/src/utils/LibString.sol::12 => // to keep the free memory pointer word aligned. We'll need 1 word for the length, 1 word for the
../../contracts/node_modules/solmate/src/utils/LibString.sol::25 => // Cache the end of the memory to calculate the length later.
../../contracts/node_modules/solmate/src/utils/LibString.sol::46 => // Compute and cache the final total length of the string.
../../contracts/node_modules/solmate/src/utils/LibString.sol::47 => let length := sub(end, str)
../../contracts/node_modules/solmate/src/utils/LibString.sol::49 => // Move the pointer 32 bytes leftwards to make room for the length.
../../contracts/node_modules/solmate/src/utils/LibString.sol::52 => // Store the string's length at the start of memory allocated for our string.
../../contracts/node_modules/solmate/src/utils/LibString.sol::53 => mstore(str, length)
../../contracts/node_modules/solmate/src/utils/MerkleProofLib.sol::15 => if proof.length {
../../contracts/node_modules/solmate/src/utils/MerkleProofLib.sol::17 => let end := add(proof.offset, shl(5, proof.length))
../../contracts/node_modules/solmate/src/utils/SSTORE2.sol::40 => // We start 32 bytes into the code to avoid copying the byte length.
../../contracts/node_modules/solmate/src/utils/SSTORE2.sol::52 => return readBytecode(pointer, DATA_OFFSET, pointer.code.length - DATA_OFFSET);
../../contracts/node_modules/solmate/src/utils/SSTORE2.sol::58 => return readBytecode(pointer, start, pointer.code.length - start);
../../contracts/node_modules/solmate/src/utils/SSTORE2.sol::69 => require(pointer.code.length >= end, "OUT_OF_BOUNDS");
../../contracts/node_modules/solmate/src/utils/SafeTransferLib.sol::54 => // We use 100 because the length of our calldata totals up like so: 4 + 32 * 3.
../../contracts/node_modules/solmate/src/utils/SafeTransferLib.sol::86 => // We use 68 because the length of our calldata totals up like so: 4 + 32 * 2.
../../contracts/node_modules/solmate/src/utils/SafeTransferLib.sol::118 => // We use 68 because the length of our calldata totals up like so: 4 + 32 * 2.
```
#### Tools used
[c4udit](https://github.com/byterocket/c4udit)

### Use != 0 instead of > 0 for Unsigned Integer Comparison

#### Impact
Issue Information: [G003](https://github.com/byterocket/c4-common-issues/blob/main/0-Gas-Optimizations.md#g003---use--0-instead-of--0-for-unsigned-integer-comparison)

#### Findings:
```
../../contracts/node_modules/@ensdomains/ens/contracts/HashRegistrar.sol::70 => registryStarted = _startDate > 0 ? _startDate : now;
../../contracts/node_modules/@ensdomains/ens/contracts/HashRegistrar.sol::459 => if (idx > 0) {
../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/ABIResolver.sol::40 => if ((contentType & contentTypes) != 0 && abiset[contentType].length > 0) {
../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/DNSResolver.sol::78 => if (name.length > 0) {
../../contracts/node_modules/@openzeppelin/contracts/finance/PaymentSplitter.sol::53 => require(payees.length > 0, "PaymentSplitter: no payees");
../../contracts/node_modules/@openzeppelin/contracts/finance/PaymentSplitter.sol::146 => require(_shares[account] > 0, "PaymentSplitter: account has no shares");
../../contracts/node_modules/@openzeppelin/contracts/finance/PaymentSplitter.sol::165 => require(_shares[account] > 0, "PaymentSplitter: account has no shares");
../../contracts/node_modules/@openzeppelin/contracts/finance/PaymentSplitter.sol::197 => require(shares_ > 0, "PaymentSplitter: shares are 0");
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::260 => require(targets.length > 0, "Governor: empty proposal");
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::135 => return getTimestamp(id) > 0;
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorSettings.sol::100 => require(newVotingPeriod > 0, "GovernorSettings: voting period too low");
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorTimelockCompound.sol::127 => require(eta > 0, "GovernorTimelockCompound: proposal not yet queued");
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorTimelockCompound.sol::147 => if (eta > 0) {
../../contracts/node_modules/@openzeppelin/contracts/governance/utils/Votes.sol::161 => if (from != to && amount > 0) {
../../contracts/node_modules/@openzeppelin/contracts/proxy/ERC1967/ERC1967Upgrade.sol::71 => if (data.length > 0 || forceCall) {
../../contracts/node_modules/@openzeppelin/contracts/proxy/ERC1967/ERC1967Upgrade.sol::181 => if (data.length > 0 || forceCall) {
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol::30 => return ERC1155Supply.totalSupply(id) > 0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol::46 => return bytes(tokenURI).length > 0 ? string(abi.encodePacked(_baseURI, tokenURI)) : super.uri(tokenId);
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol::19 => require(cap_ > 0, "ERC20Capped: cap is 0");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol::146 => require(snapshotId > 0, "ERC20Snapshot: id is 0");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol::213 => if (src != dst && amount > 0) {
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol::235 => if (pos > 0 && ckpts[pos - 1].fromBlock == block.number) {
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol::149 => * Will revert if assets > 0, totalSupply > 0 and totalAssets = 0. That corresponds to a case where any asset
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol::220 => return totalAssets() > 0 || totalSupply() == 0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol::111 => if (returndata.length > 0) {
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/utils/TokenTimelock.sol::72 => require(amount > 0, "TokenTimelock: no tokens to release");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol::97 => return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString())) : "";
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol::31 => if (bytes(_tokenURI).length > 0) {
../../contracts/node_modules/@openzeppelin/contracts/utils/Address.sol::41 => return account.code.length > 0;
../../contracts/node_modules/@openzeppelin/contracts/utils/Address.sol::210 => if (returndata.length > 0) {
../../contracts/node_modules/@openzeppelin/contracts/utils/Arrays.sol::42 => if (low > 0 && array[low - 1] == element) {
../../contracts/node_modules/@openzeppelin/contracts/utils/Checkpoints.sol::63 => if (pos > 0 && self._checkpoints[pos - 1]._blockNumber == block.number) {
../../contracts/node_modules/@openzeppelin/contracts/utils/Counters.sol::34 => require(value > 0, "Counter: decrement overflow");
../../contracts/node_modules/@openzeppelin/contracts/utils/Timers.sol::31 => return timer._deadline > 0;
../../contracts/node_modules/@openzeppelin/contracts/utils/Timers.sol::63 => return timer._deadline > 0;
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol::149 => if (uint256(s) > 0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0) {
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol::145 => if (totalHashes > 0) {
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol::147 => } else if (leavesLen > 0) {
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol::191 => if (totalHashes > 0) {
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol::193 => } else if (leavesLen > 0) {
../../contracts/node_modules/@openzeppelin/contracts/utils/introspection/ERC165Checker.sol::121 => return success && returnSize >= 0x20 && returnValue > 0;
../../contracts/node_modules/@openzeppelin/contracts/utils/math/Math.sol::147 => if (rounding == Rounding.Up && mulmod(x, y, denominator) > 0) {
../../contracts/node_modules/@openzeppelin/contracts/utils/math/Math.sol::172 => if (x >> 128 > 0) {
../../contracts/node_modules/@openzeppelin/contracts/utils/math/Math.sol::176 => if (x >> 64 > 0) {
../../contracts/node_modules/@openzeppelin/contracts/utils/math/Math.sol::180 => if (x >> 32 > 0) {
../../contracts/node_modules/@openzeppelin/contracts/utils/math/Math.sol::184 => if (x >> 16 > 0) {
../../contracts/node_modules/@openzeppelin/contracts/utils/math/Math.sol::188 => if (x >> 8 > 0) {
../../contracts/node_modules/@openzeppelin/contracts/utils/math/Math.sol::192 => if (x >> 4 > 0) {
../../contracts/node_modules/@openzeppelin/contracts/utils/math/Math.sol::196 => if (x >> 2 > 0) {
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol::197 => require(b > 0, errorMessage);
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol::223 => require(b > 0, errorMessage);
../../contracts/node_modules/@openzeppelin/contracts/vendor/optimism/ICrossDomainMessenger.sol::3 => pragma solidity >0.5.0 <0.9.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/finance/PaymentSplitterUpgradeable.sol::58 => require(payees.length > 0, "PaymentSplitter: no payees");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/finance/PaymentSplitterUpgradeable.sol::151 => require(_shares[account] > 0, "PaymentSplitter: account has no shares");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/finance/PaymentSplitterUpgradeable.sol::170 => require(_shares[account] > 0, "PaymentSplitter: account has no shares");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/finance/PaymentSplitterUpgradeable.sol::202 => require(shares_ > 0, "PaymentSplitter: shares are 0");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::266 => require(targets.length > 0, "Governor: empty proposal");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::144 => return getTimestamp(id) > 0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorSettingsUpgradeable.sol::109 => require(newVotingPeriod > 0, "GovernorSettings: voting period too low");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorTimelockCompoundUpgradeable.sol::132 => require(eta > 0, "GovernorTimelockCompound: proposal not yet queued");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorTimelockCompoundUpgradeable.sol::152 => if (eta > 0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/utils/VotesUpgradeable.sol::167 => if (from != to && amount > 0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol::77 => if (data.length > 0 || forceCall) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol::187 => if (data.length > 0 || forceCall) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol::36 => return ERC1155SupplyUpgradeable.totalSupply(id) > 0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155URIStorageUpgradeable.sol::54 => return bytes(tokenURI).length > 0 ? string(abi.encodePacked(_baseURI, tokenURI)) : super.uri(tokenId);
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20CappedUpgradeable.sol::26 => require(cap_ > 0, "ERC20Capped: cap is 0");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20SnapshotUpgradeable.sol::152 => require(snapshotId > 0, "ERC20Snapshot: id is 0");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesUpgradeable.sol::219 => if (src != dst && amount > 0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesUpgradeable.sol::241 => if (pos > 0 && ckpts[pos - 1].fromBlock == block.number) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC4626Upgradeable.sol::154 => * Will revert if assets > 0, totalSupply > 0 and totalAssets = 0. That corresponds to a case where any asset
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC4626Upgradeable.sol::225 => return totalAssets() > 0 || totalSupply() == 0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol::111 => if (returndata.length > 0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/utils/TokenTimelockUpgradeable.sol::83 => require(amount > 0, "TokenTimelock: no tokens to release");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol::102 => return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString())) : "";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol::37 => if (bytes(_tokenURI).length > 0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol::41 => return account.code.length > 0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol::183 => if (returndata.length > 0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/ArraysUpgradeable.sol::42 => if (low > 0 && array[low - 1] == element) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/CheckpointsUpgradeable.sol::63 => if (pos > 0 && self._checkpoints[pos - 1]._blockNumber == block.number) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol::34 => require(value > 0, "Counter: decrement overflow");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/TimersUpgradeable.sol::31 => return timer._deadline > 0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/TimersUpgradeable.sol::63 => return timer._deadline > 0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol::149 => if (uint256(s) > 0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol::145 => if (totalHashes > 0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol::147 => } else if (leavesLen > 0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol::191 => if (totalHashes > 0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol::193 => } else if (leavesLen > 0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165CheckerUpgradeable.sol::121 => return success && returnSize >= 0x20 && returnValue > 0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol::147 => if (rounding == Rounding.Up && mulmod(x, y, denominator) > 0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol::172 => if (x >> 128 > 0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol::176 => if (x >> 64 > 0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol::180 => if (x >> 32 > 0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol::184 => if (x >> 16 > 0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol::188 => if (x >> 8 > 0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol::192 => if (x >> 4 > 0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol::196 => if (x >> 2 > 0) {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol::197 => require(b > 0, errorMessage);
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol::223 => require(b > 0, errorMessage);
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/vendor/optimism/ICrossDomainMessengerUpgradeable.sol::3 => pragma solidity >0.5.0 <0.9.0;
../../contracts/node_modules/eth-gas-reporter/mock/contracts/Wallets/Wallet.sol::22 => if (msg.value > 0)
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::89 => require(_functionSelectors.length > 0, "LibDiamondCut: No selectors in facet to cut");
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::112 => require(_functionSelectors.length > 0, "LibDiamondCut: No selectors in facet to cut");
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::136 => require(_functionSelectors.length > 0, "LibDiamondCut: No selectors in facet to cut");
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::184 => require(_calldata.length > 0, "LibDiamondCut: _calldata is empty but _init is not address(0)");
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::190 => if (error.length > 0) {
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::205 => require(contractSize > 0, _errorMessage);
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::87 => require(_functionSelectors.length > 0, "LibDiamondCut: No selectors in facet to cut");
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::105 => require(_functionSelectors.length > 0, "LibDiamondCut: No selectors in facet to cut");
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::124 => require(_functionSelectors.length > 0, "LibDiamondCut: No selectors in facet to cut");
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::184 => require(_calldata.length > 0, "LibDiamondCut: _calldata is empty but _init is not address(0)");
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::190 => if (error.length > 0) {
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::205 => require(contractSize > 0, _errorMessage);
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/ERC1967/ERC1967Upgrade.sol::71 => if (data.length > 0 || forceCall) {
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/ERC1967/ERC1967Upgrade.sol::178 => if (data.length > 0 || forceCall) {
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/Address.sol::41 => return account.code.length > 0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/Address.sol::210 => if (returndata.length > 0) {
../../contracts/node_modules/hardhat-deploy/solc_0.8/proxy/Proxy.sol::54 => if (data.length > 0) {
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::841 => if (uint256(uint160(to)) <= 18 || to.code.length > 0) return;
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::873 => if (uint256(uint160(to)) <= 18 || to.code.length > 0) return;
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::951 => if (uint256(uint160(to)) <= 18 || to.code.length > 0) return;
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::971 => if (uint256(uint160(to)) <= 18 || to.code.length > 0) return;
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1019 => if (uint256(uint160(to)) <= 18 || to.code.length > 0) return;
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1079 => if (uint256(uint160(to)) <= 18 || to.code.length > 0) return;
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1101 => if (uint256(uint160(to)) <= 18 || to.code.length > 0) return;
../../contracts/node_modules/solmate/src/test/ERC1155.t.sol::1210 => address to = tos[i] == address(0) || tos[i].code.length > 0 ? address(0xBEEF) : tos[i];
../../contracts/node_modules/solmate/src/test/ERC721.t.sol::483 => if (uint256(uint160(to)) <= 18 || to.code.length > 0) return;
../../contracts/node_modules/solmate/src/test/ERC721.t.sol::546 => if (uint256(uint160(to)) <= 18 || to.code.length > 0) return;
../../contracts/node_modules/solmate/src/test/SSTORE2.t.sol::106 => if (pointer.code.length > 0) revert();
../../contracts/node_modules/solmate/src/test/SSTORE2.t.sol::116 => if (pointer.code.length > 0) revert();
../../contracts/node_modules/solmate/src/test/SSTORE2.t.sol::127 => if (pointer.code.length > 0) revert();
../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol::207 => if (uint256(uint160(nonContract)) <= 18 || nonContract.code.length > 0) return;
../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol::298 => if (uint256(uint160(nonContract)) <= 18 || nonContract.code.length > 0) return;
../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol::380 => if (uint256(uint160(nonContract)) <= 18 || nonContract.code.length > 0) return;
../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol::391 => if (recipient.code.length > 0 || uint256(uint160(recipient)) <= 18 || recipient == msg.sender) return;
../../contracts/node_modules/solmate/src/test/utils/DSInvariantTest.sol::8 => require(targets.length > 0, "NO_TARGET_CONTRACTS");
../../contracts/node_modules/solmate/src/utils/FixedPointMathLib.sol::250 => // Add 1 to x * y if x % y > 0. Note this will
../../contracts/node_modules/solmate/src/utils/SignedWadMath.sol::151 => require(x > 0, "UNDEFINED");
```
#### Tools used
[c4udit](https://github.com/byterocket/c4udit)

### Use immutable for OpenZeppelin AccessControl's Roles Declarations

#### Impact
Issue Information: [G006](https://github.com/byterocket/c4-common-issues/blob/main/0-Gas-Optimizations.md#g006---use-immutable-for-openzeppelin-accesscontrols-roles-declarations)

#### Findings:
```
../../contracts/contracts/Badger.sol::139 => return keccak256(abi.encodePacked(_organizationId));
../../contracts/contracts/BadgerOrganizationLogic.sol::501 => return keccak256(abi.encode(_manager));
../../contracts/contracts/BadgerOrganizationLogic.sol::516 => return keccak256(abi.encode(_id, _manager));
../../contracts/contracts/hooks/BadgerHooked.sol::41 => bytes32 public constant BEFORE_SET_HOOK = keccak256("beforeSetHook");
../../contracts/contracts/hooks/BadgerHooked.sol::44 => bytes32 public constant BEFORE_MINT = keccak256("beforeMintingHook");
../../contracts/contracts/hooks/BadgerHooked.sol::47 => bytes32 public constant BEFORE_REVOKE = keccak256("beforeRevokingHook");
../../contracts/contracts/hooks/BadgerHooked.sol::50 => bytes32 public constant BEFORE_FORFEIT = keccak256("beforeForfeitHook");
../../contracts/contracts/hooks/BadgerHooked.sol::53 => bytes32 public constant BEFORE_TRANSFER = keccak256("beforeTransferHook");
../../contracts/contracts/managers/BadgerManaged.sol::31 => * @dev The key is a `keccak256` hash of the address of the Manager.
../../contracts/contracts/managers/BadgerManagerSignature.sol::79 => bytes32 message = keccak256(
../../contracts/node_modules/@ensdomains/ens/contracts/ENSRegistry.sol::69 => * @dev Transfers ownership of a subnode keccak256(node, label) to a new address. May only be called by the owner of the parent node.
../../contracts/node_modules/@ensdomains/ens/contracts/ENSRegistry.sol::75 => bytes32 subnode = keccak256(abi.encodePacked(node, label));
../../contracts/node_modules/@ensdomains/ens/contracts/FIFSRegistrar.sol::13 => address currentOwner = ens.owner(keccak256(abi.encodePacked(rootNode, label)));
../../contracts/node_modules/@ensdomains/ens/contracts/HashRegistrar.sol::268 => inState(keccak256(abi.encode(unhashedName)), Mode.Owned)
../../contracts/node_modules/@ensdomains/ens/contracts/HashRegistrar.sol::271 => bytes32 hash = keccak256(abi.encode(unhashedName));
../../contracts/node_modules/@ensdomains/ens/contracts/HashRegistrar.sol::301 => *        [keccak256('foo'), keccak256('bar')].
../../contracts/node_modules/@ensdomains/ens/contracts/HashRegistrar.sol::413 => return keccak256(abi.encodePacked(hash, owner, value, salt));
../../contracts/node_modules/@ensdomains/ens/contracts/HashRegistrar.sol::419 => bytes32 node = keccak256(abi.encodePacked(rootNode, label));
../../contracts/node_modules/@ensdomains/ens/contracts/HashRegistrar.sol::456 => node = keccak256(abi.encodePacked(node, labels[idx]));
../../contracts/node_modules/@ensdomains/ens/contracts/ReverseRegistrar.sol::51 => bytes32 node = keccak256(abi.encodePacked(ADDR_REVERSE_NODE, label));
../../contracts/node_modules/@ensdomains/ens/contracts/ReverseRegistrar.sol::91 => return keccak256(abi.encodePacked(ADDR_REVERSE_NODE, sha3HexAddress(addr)));
../../contracts/node_modules/@ensdomains/ens/contracts/ReverseRegistrar.sol::116 => ret := keccak256(0, 40)
../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/DNSResolver.sol::64 => nameHash = keccak256(abi.encodePacked(name));
../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/DNSResolver.sol::73 => nameHash = keccak256(name);
../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/DNSResolver.sol::86 => * @param name the keccak-256 hash of the fully-qualified name for which to fetch the record
../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/DNSResolver.sol::126 => bytes32 nameHash = keccak256(name);
../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/InterfaceResolver.sol::7 => bytes4 constant private INTERFACE_INTERFACE_ID = bytes4(keccak256("interfaceImplementer(bytes32,bytes4)"));
../../contracts/node_modules/@ethereum-waffle/mock-contract/src/Doppelganger.sol::50 => bytes32 root = keccak256(data);
../../contracts/node_modules/@ethereum-waffle/mock-contract/src/Doppelganger.sol::55 => if(tail == "") tail = keccak256(data);
../../contracts/node_modules/@ethereum-waffle/mock-contract/src/Doppelganger.sol::58 => tails[root] = keccak256(abi.encodePacked(tail));
../../contracts/node_modules/@ethereum-waffle/mock-contract/src/Doppelganger.sol::70 => __clearQueue(keccak256(data));
../../contracts/node_modules/@ethereum-waffle/mock-contract/src/Doppelganger.sol::76 => bytes32 root = keccak256(data);
../../contracts/node_modules/@ethereum-waffle/mock-contract/src/Doppelganger.sol::81 => if(tail == "") tail = keccak256(data);
../../contracts/node_modules/@ethereum-waffle/mock-contract/src/Doppelganger.sol::84 => tails[root] = keccak256(abi.encodePacked(tail));
../../contracts/node_modules/@ethereum-waffle/mock-contract/src/Doppelganger.sol::96 => __clearQueue(keccak256(data));
../../contracts/node_modules/@ethereum-waffle/mock-contract/src/Doppelganger.sol::119 => bytes32 root = keccak256(msg.data);
../../contracts/node_modules/@ethereum-waffle/mock-contract/src/Doppelganger.sol::133 => root = keccak256(abi.encodePacked(msg.sig));
../../contracts/node_modules/@openzeppelin/contracts/access/AccessControl.sol::23 => * bytes32 public constant MY_ROLE = keccak256("MY_ROLE");
../../contracts/node_modules/@openzeppelin/contracts/access/AccessControlCrossChain.sol::26 => bytes32 public constant CROSSCHAIN_ALIAS = keccak256("CROSSCHAIN_ALIAS");
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::34 => bytes32 public constant BALLOT_TYPEHASH = keccak256("Ballot(uint256 proposalId,uint8 support)");
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::36 => keccak256("ExtendedBallot(uint256 proposalId,uint8 support,string reason,bytes params)");
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::68 => bytes32 msgDataHash = keccak256(_msgData());
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::124 => * and the descriptionHash (bytes32 which itself is the keccak256 hash of the description string). This proposal id
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::139 => return uint256(keccak256(abi.encode(targets, values, calldatas, descriptionHash)));
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::256 => uint256 proposalId = hashProposal(targets, values, calldatas, keccak256(bytes(description)));
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::343 => _governanceCall.pushBack(keccak256(calldatas[i]));
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::454 => _hashTypedDataV4(keccak256(abi.encode(BALLOT_TYPEHASH, proposalId, support))),
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::476 => keccak256(
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::481 => keccak256(bytes(reason)),
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::482 => keccak256(params)
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::27 => bytes32 public constant TIMELOCK_ADMIN_ROLE = keccak256("TIMELOCK_ADMIN_ROLE");
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::28 => bytes32 public constant PROPOSER_ROLE = keccak256("PROPOSER_ROLE");
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::29 => bytes32 public constant EXECUTOR_ROLE = keccak256("EXECUTOR_ROLE");
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::30 => bytes32 public constant CANCELLER_ROLE = keccak256("CANCELLER_ROLE");
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::188 => return keccak256(abi.encode(target, value, data, predecessor, salt));
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::202 => return keccak256(abi.encode(targets, values, payloads, predecessor, salt));
../../contracts/node_modules/@openzeppelin/contracts/governance/compatibility/GovernorCompatibilityBravo.sol::135 => : abi.encodePacked(bytes4(keccak256(bytes(signatures[i]))), calldatas[i]);
../../contracts/node_modules/@openzeppelin/contracts/governance/compatibility/GovernorCompatibilityBravo.sol::152 => bytes32 descriptionHash = keccak256(bytes(description));
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorTimelockCompound.sol::105 => !_timelock.queuedTransactions(keccak256(abi.encode(targets[i], values[i], "", calldatas[i], eta))),
../../contracts/node_modules/@openzeppelin/contracts/governance/utils/Votes.sol::36 => keccak256("Delegation(address delegatee,uint256 nonce,uint256 expiry)");
../../contracts/node_modules/@openzeppelin/contracts/governance/utils/Votes.sol::113 => _hashTypedDataV4(keccak256(abi.encode(_DELEGATION_TYPEHASH, delegatee, nonce, expiry))),
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1363.sol::13 => *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1363.sol::14 => *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1363.sol::15 => *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1363.sol::16 => *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)'))
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1363.sol::22 => *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1363.sol::23 => *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1363Receiver.sol::9 => * 0x88a7ca5c === bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1363Receiver.sol::23 => * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1363Spender.sol::9 => * 0x7b04a2d0 === bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1363Spender.sol::22 => * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC3156FlashBorrower.sol::20 => * @return The keccak256 hash of "IERC3156FlashBorrower.onFlashLoan"
../../contracts/node_modules/@openzeppelin/contracts/metatx/MinimalForwarder.sol::30 => keccak256("ForwardRequest(address from,address to,uint256 value,uint256 gas,uint256 nonce,bytes data)");
../../contracts/node_modules/@openzeppelin/contracts/metatx/MinimalForwarder.sol::42 => keccak256(abi.encode(_TYPEHASH, req.from, req.to, req.value, req.gas, req.nonce, keccak256(req.data)))
../../contracts/node_modules/@openzeppelin/contracts/proxy/Clones.sol::72 => mstore(add(ptr, 0x6c), keccak256(ptr, 0x37))
../../contracts/node_modules/@openzeppelin/contracts/proxy/Clones.sol::73 => predicted := keccak256(add(ptr, 0x37), 0x55)
../../contracts/node_modules/@openzeppelin/contracts/proxy/ERC1967/ERC1967Upgrade.sol::20 => // This is the keccak-256 hash of "eip1967.proxy.rollback" subtracted by 1
../../contracts/node_modules/@openzeppelin/contracts/proxy/ERC1967/ERC1967Upgrade.sol::25 => * This is the keccak-256 hash of "eip1967.proxy.implementation" subtracted by 1, and is
../../contracts/node_modules/@openzeppelin/contracts/proxy/ERC1967/ERC1967Upgrade.sol::103 => * This is the keccak-256 hash of "eip1967.proxy.admin" subtracted by 1, and is
../../contracts/node_modules/@openzeppelin/contracts/proxy/ERC1967/ERC1967Upgrade.sol::140 => * This is bytes32(uint256(keccak256('eip1967.proxy.beacon')) - 1)) and is validated in the constructor.
../../contracts/node_modules/@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol::13 => * The beacon address is stored in storage slot `uint256(keccak256('eip1967.proxy.beacon')) - 1`, so that it doesn't
../../contracts/node_modules/@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol::23 => // bytes4(keccak256("implementation()")) == 0x5c60da1b
../../contracts/node_modules/@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol::38 => // bytes4(keccak256("admin()")) == 0xf851a440
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol::17 => * `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))`
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol::25 => * @return `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))` if transfer is allowed
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol::41 => * `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))`
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol::49 => * @return `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))` if transfer is allowed
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol::29 => bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol::30 => bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20FlashMint.sol::20 => bytes32 private constant _RETURN_VALUE = keccak256("ERC3156FlashBorrower.onFlashLoan");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol::34 => keccak256("Delegation(address delegatee,uint256 nonce,uint256 expiry)");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol::143 => _hashTypedDataV4(keccak256(abi.encode(_DELEGATION_TYPEHASH, delegatee, nonce, expiry))),
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol::29 => keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol::60 => bytes32 structHash = keccak256(abi.encode(_PERMIT_TYPEHASH, owner, spender, value, _useNonce(owner), deadline));
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol::29 => bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol::30 => bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol::40 => bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol::41 => bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC777/ERC777.sol::41 => bytes32 private constant _TOKENS_SENDER_INTERFACE_HASH = keccak256("ERC777TokensSender");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC777/ERC777.sol::42 => bytes32 private constant _TOKENS_RECIPIENT_INTERFACE_HASH = keccak256("ERC777TokensRecipient");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC777/ERC777.sol::74 => _ERC1820_REGISTRY.setInterfaceImplementer(address(this), keccak256("ERC777Token"), address(this));
../../contracts/node_modules/@openzeppelin/contracts/token/ERC777/ERC777.sol::75 => _ERC1820_REGISTRY.setInterfaceImplementer(address(this), keccak256("ERC20Token"), address(this));
../../contracts/node_modules/@openzeppelin/contracts/utils/Create2.sol::63 => bytes32 _data = keccak256(abi.encodePacked(bytes1(0xff), deployer, salt, bytecodeHash));
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol::191 => return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol::203 => return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n", Strings.toString(s.length), s));
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol::216 => return keccak256(abi.encodePacked("\x19\x01", domainSeparator, structHash));
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol::11 => * Note: the hashing algorithm should be keccak256 and pair sorting should be enabled.
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol::16 => * hashing, or use a hash function other than keccak256 for hashing leaves.
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol::209 => value := keccak256(0x00, 0x40)
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol::13 => * they need in their contracts using a combination of `abi.encode` and `keccak256`.
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol::54 => bytes32 hashedName = keccak256(bytes(name));
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol::55 => bytes32 hashedVersion = keccak256(bytes(version));
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol::56 => bytes32 typeHash = keccak256(
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol::83 => return keccak256(abi.encode(typeHash, nameHash, versionHash, block.chainid, address(this)));
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol::93 => * bytes32 digest = _hashTypedDataV4(keccak256(abi.encode(
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol::94 => *     keccak256("Mail(address to,string contents)"),
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol::96 => *     keccak256(bytes(mailContents))
../../contracts/node_modules/@openzeppelin/contracts/utils/introspection/ERC1820Implementer.sol::17 => bytes32 private constant _ERC1820_ACCEPT_MAGIC = keccak256("ERC1820_ACCEPT_MAGIC");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlCrossChainUpgradeable.sol::32 => bytes32 public constant CROSSCHAIN_ALIAS = keccak256("CROSSCHAIN_ALIAS");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol::24 => * bytes32 public constant MY_ROLE = keccak256("MY_ROLE");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::35 => bytes32 public constant BALLOT_TYPEHASH = keccak256("Ballot(uint256 proposalId,uint8 support)");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::37 => keccak256("ExtendedBallot(uint256 proposalId,uint8 support,string reason,bytes params)");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::69 => bytes32 msgDataHash = keccak256(_msgData());
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::130 => * and the descriptionHash (bytes32 which itself is the keccak256 hash of the description string). This proposal id
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::145 => return uint256(keccak256(abi.encode(targets, values, calldatas, descriptionHash)));
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::262 => uint256 proposalId = hashProposal(targets, values, calldatas, keccak256(bytes(description)));
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::349 => _governanceCall.pushBack(keccak256(calldatas[i]));
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::460 => _hashTypedDataV4(keccak256(abi.encode(BALLOT_TYPEHASH, proposalId, support))),
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::482 => keccak256(
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::487 => keccak256(bytes(reason)),
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::488 => keccak256(params)
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::28 => bytes32 public constant TIMELOCK_ADMIN_ROLE = keccak256("TIMELOCK_ADMIN_ROLE");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::29 => bytes32 public constant PROPOSER_ROLE = keccak256("PROPOSER_ROLE");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::30 => bytes32 public constant EXECUTOR_ROLE = keccak256("EXECUTOR_ROLE");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::31 => bytes32 public constant CANCELLER_ROLE = keccak256("CANCELLER_ROLE");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::197 => return keccak256(abi.encode(target, value, data, predecessor, salt));
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::211 => return keccak256(abi.encode(targets, values, payloads, predecessor, salt));
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/compatibility/GovernorCompatibilityBravoUpgradeable.sol::141 => : abi.encodePacked(bytes4(keccak256(bytes(signatures[i]))), calldatas[i]);
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/compatibility/GovernorCompatibilityBravoUpgradeable.sol::158 => bytes32 descriptionHash = keccak256(bytes(description));
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorTimelockCompoundUpgradeable.sol::110 => !_timelock.queuedTransactions(keccak256(abi.encode(targets[i], values[i], "", calldatas[i], eta))),
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/utils/VotesUpgradeable.sol::42 => keccak256("Delegation(address delegatee,uint256 nonce,uint256 expiry)");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/utils/VotesUpgradeable.sol::119 => _hashTypedDataV4(keccak256(abi.encode(_DELEGATION_TYPEHASH, delegatee, nonce, expiry))),
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1363ReceiverUpgradeable.sol::9 => * 0x88a7ca5c === bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1363ReceiverUpgradeable.sol::23 => * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1363SpenderUpgradeable.sol::9 => * 0x7b04a2d0 === bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1363SpenderUpgradeable.sol::22 => * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1363Upgradeable.sol::13 => *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1363Upgradeable.sol::14 => *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1363Upgradeable.sol::15 => *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1363Upgradeable.sol::16 => *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)'))
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1363Upgradeable.sol::22 => *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1363Upgradeable.sol::23 => *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC3156FlashBorrowerUpgradeable.sol::20 => * @return The keccak256 hash of "IERC3156FlashBorrower.onFlashLoan"
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/metatx/MinimalForwarderUpgradeable.sol::31 => keccak256("ForwardRequest(address from,address to,uint256 value,uint256 gas,uint256 nonce,bytes data)");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/metatx/MinimalForwarderUpgradeable.sol::47 => keccak256(abi.encode(_TYPEHASH, req.from, req.to, req.value, req.gas, req.nonce, keccak256(req.data)))
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/ClonesUpgradeable.sol::72 => mstore(add(ptr, 0x6c), keccak256(ptr, 0x37))
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/ClonesUpgradeable.sol::73 => predicted := keccak256(add(ptr, 0x37), 0x55)
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol::26 => // This is the keccak-256 hash of "eip1967.proxy.rollback" subtracted by 1
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol::31 => * This is the keccak-256 hash of "eip1967.proxy.implementation" subtracted by 1, and is
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol::109 => * This is the keccak-256 hash of "eip1967.proxy.admin" subtracted by 1, and is
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol::146 => * This is bytes32(uint256(keccak256('eip1967.proxy.beacon')) - 1)) and is validated in the constructor.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol::17 => * `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))`
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol::25 => * @return `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))` if transfer is allowed
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol::41 => * `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))`
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol::49 => * @return `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))` if transfer is allowed
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/presets/ERC1155PresetMinterPauserUpgradeable.sol::33 => bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/presets/ERC1155PresetMinterPauserUpgradeable.sol::34 => bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20FlashMintUpgradeable.sol::26 => bytes32 private constant _RETURN_VALUE = keccak256("ERC3156FlashBorrower.onFlashLoan");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesUpgradeable.sol::40 => keccak256("Delegation(address delegatee,uint256 nonce,uint256 expiry)");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesUpgradeable.sol::149 => _hashTypedDataV4(keccak256(abi.encode(_DELEGATION_TYPEHASH, delegatee, nonce, expiry))),
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/draft-ERC20PermitUpgradeable.sol::32 => keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/draft-ERC20PermitUpgradeable.sol::67 => bytes32 structHash = keccak256(abi.encode(_PERMIT_TYPEHASH, owner, spender, value, _useNonce(owner), deadline));
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetMinterPauserUpgradeable.sol::33 => bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetMinterPauserUpgradeable.sol::34 => bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/presets/ERC721PresetMinterPauserAutoIdUpgradeable.sol::48 => bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/presets/ERC721PresetMinterPauserAutoIdUpgradeable.sol::49 => bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/ERC777Upgradeable.sol::42 => bytes32 private constant _TOKENS_SENDER_INTERFACE_HASH = keccak256("ERC777TokensSender");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/ERC777Upgradeable.sol::43 => bytes32 private constant _TOKENS_RECIPIENT_INTERFACE_HASH = keccak256("ERC777TokensRecipient");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/ERC777Upgradeable.sol::83 => _ERC1820_REGISTRY.setInterfaceImplementer(address(this), keccak256("ERC777Token"), address(this));
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/ERC777Upgradeable.sol::84 => _ERC1820_REGISTRY.setInterfaceImplementer(address(this), keccak256("ERC20Token"), address(this));
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/Create2Upgradeable.sol::63 => bytes32 _data = keccak256(abi.encodePacked(bytes1(0xff), deployer, salt, bytecodeHash));
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol::191 => return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol::203 => return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n", StringsUpgradeable.toString(s.length), s));
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol::216 => return keccak256(abi.encodePacked("\x19\x01", domainSeparator, structHash));
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol::11 => * Note: the hashing algorithm should be keccak256 and pair sorting should be enabled.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol::16 => * hashing, or use a hash function other than keccak256 for hashing leaves.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol::209 => value := keccak256(0x00, 0x40)
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol::14 => * they need in their contracts using a combination of `abi.encode` and `keccak256`.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol::34 => bytes32 private constant _TYPE_HASH = keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol::55 => bytes32 hashedName = keccak256(bytes(name));
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol::56 => bytes32 hashedVersion = keccak256(bytes(version));
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol::73 => return keccak256(abi.encode(typeHash, nameHash, versionHash, block.chainid, address(this)));
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol::83 => * bytes32 digest = _hashTypedDataV4(keccak256(abi.encode(
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol::84 => *     keccak256("Mail(address to,string contents)"),
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol::86 => *     keccak256(bytes(mailContents))
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC1820ImplementerUpgradeable.sol::23 => bytes32 private constant _ERC1820_ACCEPT_MAGIC = keccak256("ERC1820_ACCEPT_MAGIC");
../../contracts/node_modules/eth-gas-reporter/mock/contracts/EtherRouter/Resolver.sol::30 => return bytes4(keccak256(abi.encodePacked(signature)));
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::13 => bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("diamond.standard.diamond.storage");
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::11 => bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("diamond.standard.diamond.storage");
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/Clones.sol::69 => mstore(add(ptr, 0x6c), keccak256(ptr, 0x37))
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/Clones.sol::70 => predicted := keccak256(add(ptr, 0x37), 0x55)
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/ERC1967/ERC1967Proxy.sol::23 => assert(_IMPLEMENTATION_SLOT == bytes32(uint256(keccak256("eip1967.proxy.implementation")) - 1));
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/ERC1967/ERC1967Upgrade.sol::20 => // This is the keccak-256 hash of "eip1967.proxy.rollback" subtracted by 1
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/ERC1967/ERC1967Upgrade.sol::25 => * This is the keccak-256 hash of "eip1967.proxy.implementation" subtracted by 1, and is
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/ERC1967/ERC1967Upgrade.sol::103 => * This is the keccak-256 hash of "eip1967.proxy.admin" subtracted by 1, and is
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/ERC1967/ERC1967Upgrade.sol::140 => * This is bytes32(uint256(keccak256('eip1967.proxy.beacon')) - 1)) and is validated in the constructor.
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/beacon/BeaconProxy.sol::13 => * The beacon address is stored in storage slot `uint256(keccak256('eip1967.proxy.beacon')) - 1`, so that it doesn't
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/beacon/BeaconProxy.sol::31 => assert(_BEACON_SLOT == bytes32(uint256(keccak256("eip1967.proxy.beacon")) - 1));
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/transparent/ProxyAdmin.sol::26 => // bytes4(keccak256("implementation()")) == 0x5c60da1b
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/transparent/ProxyAdmin.sol::41 => // bytes4(keccak256("admin()")) == 0xf851a440
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/transparent/TransparentUpgradeableProxy.sol::39 => assert(_ADMIN_SLOT == bytes32(uint256(keccak256("eip1967.proxy.admin")) - 1));
../../contracts/node_modules/hardhat-deploy/solc_0.8/proxy/OptimizedTransparentUpgradeableProxy.sol::41 => assert(_ADMIN_SLOT == bytes32(uint256(keccak256("eip1967.proxy.admin")) - 1));
../../contracts/node_modules/solady/src/auth/Ownable.sol::23 => /// @dev `bytes4(keccak256(bytes("Unauthorized()")))`.
../../contracts/node_modules/solady/src/auth/Ownable.sol::26 => /// @dev `bytes4(keccak256(bytes("NewOwnerIsZeroAddress()")))`.
../../contracts/node_modules/solady/src/auth/Ownable.sol::29 => /// @dev `bytes4(keccak256(bytes("NoHandoverRequest()")))`.
../../contracts/node_modules/solady/src/auth/Ownable.sol::48 => /// @dev `keccak256(bytes("OwnershipTransferred(address,address)"))`.
../../contracts/node_modules/solady/src/auth/Ownable.sol::52 => /// @dev `keccak256(bytes("OwnershipHandoverRequested(address)"))`.
../../contracts/node_modules/solady/src/auth/Ownable.sol::56 => /// @dev `keccak256(bytes("OwnershipHandoverCanceled(address)"))`.
../../contracts/node_modules/solady/src/auth/Ownable.sol::74 => ///     let handoverSlot := keccak256(0x00, 0x20)
../../contracts/node_modules/solady/src/auth/Ownable.sol::159 => sstore(keccak256(0x0c, 0x20), expires)
../../contracts/node_modules/solady/src/auth/Ownable.sol::173 => sstore(keccak256(0x0c, 0x20), 0)
../../contracts/node_modules/solady/src/auth/Ownable.sol::187 => let handoverSlot := keccak256(0x0c, 0x20)
../../contracts/node_modules/solady/src/auth/Ownable.sol::224 => result := sload(keccak256(0x0c, 0x20))
../../contracts/node_modules/solady/src/auth/OwnableRoles.sol::16 => /// @dev `bytes4(keccak256(bytes("Unauthorized()")))`.
../../contracts/node_modules/solady/src/auth/OwnableRoles.sol::27 => /// @dev `keccak256(bytes("RolesUpdated(address,uint256)"))`.
../../contracts/node_modules/solady/src/auth/OwnableRoles.sol::38 => ///     let roleSlot := keccak256(0x00, 0x20)
../../contracts/node_modules/solady/src/auth/OwnableRoles.sol::41 => /// they are not clean, as well as keep the `keccak256` under 32-bytes.
../../contracts/node_modules/solady/src/auth/OwnableRoles.sol::58 => let roleSlot := keccak256(0x0c, 0x20)
../../contracts/node_modules/solady/src/auth/OwnableRoles.sol::76 => let roleSlot := keccak256(0x0c, 0x20)
../../contracts/node_modules/solady/src/auth/OwnableRoles.sol::98 => if iszero(and(sload(keccak256(0x0c, 0x20)), roles)) {
../../contracts/node_modules/solady/src/auth/OwnableRoles.sol::119 => if iszero(and(sload(keccak256(0x0c, 0x20)), roles)) {
../../contracts/node_modules/solady/src/auth/OwnableRoles.sol::138 => if iszero(and(sload(keccak256(0x0c, 0x20)), roles)) {
../../contracts/node_modules/solady/src/auth/OwnableRoles.sol::184 => result := iszero(iszero(and(sload(keccak256(0x0c, 0x20)), roles)))
../../contracts/node_modules/solady/src/auth/OwnableRoles.sol::196 => result := eq(and(sload(keccak256(0x0c, 0x20)), roles), roles)
../../contracts/node_modules/solady/src/auth/OwnableRoles.sol::208 => roles := sload(keccak256(0x0c, 0x20))
../../contracts/node_modules/solady/src/utils/CREATE3.sol::51 => /// Equivalent to `keccak256(abi.encodePacked(hex"67363d3d37363d34f03d5260086018f3"))`.
../../contracts/node_modules/solady/src/utils/CREATE3.sol::90 => deployed := keccak256(0x1e, 0x17)
../../contracts/node_modules/solady/src/utils/CREATE3.sol::136 => mstore(0x14, keccak256(0x0b, 0x55))
../../contracts/node_modules/solady/src/utils/CREATE3.sol::145 => deployed := keccak256(0x1e, 0x17)
../../contracts/node_modules/solady/src/utils/ECDSA.sol::276 => // Store into scratch space for keccak256.
../../contracts/node_modules/solady/src/utils/ECDSA.sol::280 => result := keccak256(0x04, 0x3c)
../../contracts/node_modules/solady/src/utils/ECDSA.sol::301 => // `end` marks the end of the memory which we will compute the keccak256 of.
../../contracts/node_modules/solady/src/utils/ECDSA.sol::313 => // Compute the keccak256 of the memory.
../../contracts/node_modules/solady/src/utils/ECDSA.sol::314 => result := keccak256(sub(ptr, 0x1a), sub(end, sub(ptr, 0x1a)))
../../contracts/node_modules/solady/src/utils/EIP712.sol::13 => /// @dev `keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)")`.
../../contracts/node_modules/solady/src/utils/EIP712.sol::36 => bytes32 nameHash = keccak256(bytes(name));
../../contracts/node_modules/solady/src/utils/EIP712.sol::37 => bytes32 versionHash = keccak256(bytes(version));
../../contracts/node_modules/solady/src/utils/EIP712.sol::50 => separator := keccak256(m, 0xa0)
../../contracts/node_modules/solady/src/utils/EIP712.sol::95 => ///     bytes32 digest = _hashTypedData(keccak256(abi.encode(
../../contracts/node_modules/solady/src/utils/EIP712.sol::96 => ///         keccak256("Mail(address to,string contents)"),
../../contracts/node_modules/solady/src/utils/EIP712.sol::98 => ///         keccak256(bytes(mailContents))
../../contracts/node_modules/solady/src/utils/EIP712.sol::113 => digest := keccak256(0x18, 0x42)
../../contracts/node_modules/solady/src/utils/EIP712.sol::162 => separator := keccak256(m, 0xa0)
../../contracts/node_modules/solady/src/utils/LibBitmap.sol::60 => let storageSlot := keccak256(0x00, 0x40)
../../contracts/node_modules/solady/src/utils/LibBitmap.sol::81 => let storageSlot := keccak256(0x00, 0x40)
../../contracts/node_modules/solady/src/utils/LibBitmap.sol::102 => let storageSlot := keccak256(0x00, 0x40)
../../contracts/node_modules/solady/src/utils/LibBitmap.sol::110 => sstore(keccak256(0x00, 0x40), max)
../../contracts/node_modules/solady/src/utils/LibBitmap.sol::114 => let storageSlot := keccak256(0x00, 0x40)
../../contracts/node_modules/solady/src/utils/LibBitmap.sol::127 => let storageSlot := keccak256(0x00, 0x40)
../../contracts/node_modules/solady/src/utils/LibBitmap.sol::135 => sstore(keccak256(0x00, 0x40), 0)
../../contracts/node_modules/solady/src/utils/LibBitmap.sol::139 => let storageSlot := keccak256(0x00, 0x40)
../../contracts/node_modules/solady/src/utils/LibBitmap.sol::185 => bucketBits := shr(offset, shl(offset, sload(keccak256(0x00, 0x40))))
../../contracts/node_modules/solady/src/utils/LibBitmap.sol::190 => bucketBits := sload(keccak256(0x00, 0x40))
../../contracts/node_modules/solady/src/utils/LibClone.sol::143 => hash := keccak256(0x0c, 0x35)
../../contracts/node_modules/solady/src/utils/LibClone.sol::268 => // `keccak256("ReceiveETH(uint256)")`
../../contracts/node_modules/solady/src/utils/LibClone.sol::325 => // `keccak256("ReceiveETH(uint256)")`
../../contracts/node_modules/solady/src/utils/LibClone.sol::384 => // `keccak256("ReceiveETH(uint256)")`
../../contracts/node_modules/solady/src/utils/LibClone.sol::395 => hash := keccak256(sub(data, 0x4c), add(extraLength, 0x6c))
../../contracts/node_modules/solady/src/utils/LibClone.sol::436 => predicted := keccak256(0x00, 0x55)
../../contracts/node_modules/solady/src/utils/LibMap.sol::46 => result := byte(and(31, not(index)), sload(keccak256(0x00, 0x40)))
../../contracts/node_modules/solady/src/utils/LibMap.sol::56 => let s := keccak256(0x00, 0x40) // Storage slot.
../../contracts/node_modules/solady/src/utils/LibMap.sol::74 => let s := keccak256(0x00, 0x40) // Storage slot.
../../contracts/node_modules/solady/src/utils/LibMap.sol::93 => let s := keccak256(0x00, 0x40) // Storage slot.
../../contracts/node_modules/solady/src/utils/LibMap.sol::112 => let s := keccak256(0x00, 0x40) // Storage slot.
../../contracts/node_modules/solady/src/utils/LibMap.sol::131 => let s := keccak256(0x00, 0x40) // Storage slot.
../../contracts/node_modules/solady/src/utils/LibPRNG.sol::31 => // We simply use `keccak256` for a great balance between
../../contracts/node_modules/solady/src/utils/LibPRNG.sol::40 => // `nextRandomness = uint256(keccak256(abi.encode(randomness)))`.
../../contracts/node_modules/solady/src/utils/LibPRNG.sol::43 => result := keccak256(prng, 0x20)
../../contracts/node_modules/solady/src/utils/LibPRNG.sol::59 => result := keccak256(prng, 0x20)
../../contracts/node_modules/solady/src/utils/LibPRNG.sol::76 => // We can just directly use `keccak256`, cuz
../../contracts/node_modules/solady/src/utils/LibPRNG.sol::78 => let r := keccak256(prng, 0x20)
../../contracts/node_modules/solady/src/utils/LibPRNG.sol::121 => // We can just directly use `keccak256`, cuz
../../contracts/node_modules/solady/src/utils/LibPRNG.sol::123 => let r := keccak256(prng, 0x20)
../../contracts/node_modules/solady/src/utils/LibRLP.sol::50 => deployed := keccak256(0x0a, 0x17)
../../contracts/node_modules/solady/src/utils/LibRLP.sol::64 => deployed := keccak256(0x09, add(0x17, i))
../../contracts/node_modules/solady/src/utils/LibString.sol::223 => let hashed := and(keccak256(o, 40), mul(34, mask)) // `0b10001000 ... `
../../contracts/node_modules/solady/src/utils/LibString.sol::374 => if iszero(lt(searchLength, 32)) { h := keccak256(search, searchLength) }
../../contracts/node_modules/solady/src/utils/LibString.sol::383 => if iszero(eq(keccak256(subject, searchLength), h)) {
../../contracts/node_modules/solady/src/utils/LibString.sol::465 => for { let h := keccak256(add(search, 0x20), searchLength) } 1 {} {
../../contracts/node_modules/solady/src/utils/LibString.sol::467 => if eq(keccak256(subject, searchLength), h) {
../../contracts/node_modules/solady/src/utils/LibString.sol::524 => // we shall simply use keccak256 for smaller bytecode size.
../../contracts/node_modules/solady/src/utils/LibString.sol::525 => for { let h := keccak256(add(search, 0x20), searchLength) } 1 {} {
../../contracts/node_modules/solady/src/utils/LibString.sol::526 => if eq(keccak256(subject, searchLength), h) {
../../contracts/node_modules/solady/src/utils/LibString.sol::558 => // Just using keccak256 directly is actually cheaper.
../../contracts/node_modules/solady/src/utils/LibString.sol::563 => keccak256(add(subject, 0x20), searchLength),
../../contracts/node_modules/solady/src/utils/LibString.sol::564 => keccak256(add(search, 0x20), searchLength)
../../contracts/node_modules/solady/src/utils/LibString.sol::582 => // Just using keccak256 directly is actually cheaper.
../../contracts/node_modules/solady/src/utils/LibString.sol::587 => keccak256(
../../contracts/node_modules/solady/src/utils/LibString.sol::592 => keccak256(add(search, 0x20), searchLength)
../../contracts/node_modules/solady/src/utils/LibString.sol::697 => if iszero(lt(searchLength, 32)) { h := keccak256(search, searchLength) }
../../contracts/node_modules/solady/src/utils/LibString.sol::706 => if iszero(eq(keccak256(subject, searchLength), h)) {
../../contracts/node_modules/solady/src/utils/LibString.sol::963 => result := eq(keccak256(add(a, 0x20), mload(a)), keccak256(add(b, 0x20), mload(b)))
../../contracts/node_modules/solady/src/utils/MerkleProofLib.sol::36 => leaf := keccak256(0x00, 0x40)
../../contracts/node_modules/solady/src/utils/MerkleProofLib.sol::122 => mstore(hashesBack, keccak256(0x00, 0x40))
../../contracts/node_modules/solady/src/utils/MinHeapLib.sol::43 => result := sload(keccak256(0x00, 0x20))
../../contracts/node_modules/solady/src/utils/MinHeapLib.sol::109 => let sOffset := keccak256(0x00, 0x20)
../../contracts/node_modules/solady/src/utils/SSTORE2.sol::124 => hash := keccak256(add(data, 0x15), add(dataSize, 0xa))
../../contracts/node_modules/solady/src/utils/SSTORE2.sol::146 => predicted := keccak256(0x00, 0x55)
../../contracts/node_modules/solady/src/utils/SignatureCheckerLib.sol::67 => // `bytes4(keccak256("isValidSignature(bytes32,bytes)"))`.
../../contracts/node_modules/solady/src/utils/SignatureCheckerLib.sol::161 => // `bytes4(keccak256("isValidSignature(bytes32,bytes)"))`.
../../contracts/node_modules/solady/src/utils/SignatureCheckerLib.sol::164 => mstore(m, f) // `bytes4(keccak256("isValidSignature(bytes32,bytes)"))`.
../../contracts/node_modules/solady/src/utils/SignatureCheckerLib.sol::214 => // `bytes4(keccak256("isValidSignature(bytes32,bytes)"))`.
../../contracts/node_modules/solady/src/utils/SignatureCheckerLib.sol::277 => // `bytes4(keccak256("isValidSignature(bytes32,bytes)"))`.
../../contracts/node_modules/solady/src/utils/SignatureCheckerLib.sol::280 => mstore(m, f) // `bytes4(keccak256("isValidSignature(bytes32,bytes)"))`.
../../contracts/node_modules/solmate/src/test/CREATE3.t.sol::13 => bytes32 salt = keccak256(bytes("A salt!"));
../../contracts/node_modules/solmate/src/test/CREATE3.t.sol::31 => bytes32 salt = keccak256(bytes("Salty..."));
../../contracts/node_modules/solmate/src/test/CREATE3.t.sol::38 => bytes32 salt = keccak256(bytes("and sweet!"));
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::13 => keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::96 => keccak256(
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::100 => keccak256(abi.encode(PERMIT_TYPEHASH, owner, address(0xCAFE), 1e18, 0, block.timestamp))
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::144 => keccak256(
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::148 => keccak256(abi.encode(PERMIT_TYPEHASH, owner, address(0xCAFE), 1e18, 1, block.timestamp))
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::162 => keccak256(
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::166 => keccak256(abi.encode(PERMIT_TYPEHASH, owner, address(0xCAFE), 1e18, 0, block.timestamp))
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::181 => keccak256(
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::185 => keccak256(abi.encode(PERMIT_TYPEHASH, owner, address(0xCAFE), 1e18, 0, oldTimestamp))
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::200 => keccak256(
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::204 => keccak256(abi.encode(PERMIT_TYPEHASH, owner, address(0xCAFE), 1e18, 0, block.timestamp))
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::307 => keccak256(
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::311 => keccak256(abi.encode(PERMIT_TYPEHASH, owner, to, amount, 0, deadline))
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::393 => keccak256(
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::397 => keccak256(abi.encode(PERMIT_TYPEHASH, owner, to, amount, nonce, deadline))
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::418 => keccak256(
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::422 => keccak256(abi.encode(PERMIT_TYPEHASH, owner, to, amount, 0, deadline))
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::443 => keccak256(
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::447 => keccak256(abi.encode(PERMIT_TYPEHASH, owner, to, amount, 0, deadline))
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::468 => keccak256(
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::472 => keccak256(abi.encode(PERMIT_TYPEHASH, owner, to, amount, 0, deadline))
../../contracts/node_modules/solmate/src/test/FixedPointMathLib.t.sol::299 => testSqrtBack(uint256(keccak256(abi.encode(x))));
../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol::604 => keccak256(abi.encode(to, keccak256(abi.encode(from, uint256(slot))))),
../../contracts/node_modules/solmate/src/test/utils/DSTestPlus.sol::132 => if (keccak256(a) != keccak256(b)) {
../../contracts/node_modules/solmate/src/tokens/ERC20.sol::131 => keccak256(
../../contracts/node_modules/solmate/src/tokens/ERC20.sol::135 => keccak256(
../../contracts/node_modules/solmate/src/tokens/ERC20.sol::137 => keccak256(
../../contracts/node_modules/solmate/src/tokens/ERC20.sol::168 => keccak256(
../../contracts/node_modules/solmate/src/tokens/ERC20.sol::170 => keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
../../contracts/node_modules/solmate/src/tokens/ERC20.sol::171 => keccak256(bytes(name)),
../../contracts/node_modules/solmate/src/tokens/ERC20.sol::172 => keccak256("1"),
../../contracts/node_modules/solmate/src/utils/CREATE3.sol::35 => bytes32 internal constant PROXY_BYTECODE_HASH = keccak256(PROXY_BYTECODE);
../../contracts/node_modules/solmate/src/utils/CREATE3.sol::59 => address proxy = keccak256(
../../contracts/node_modules/solmate/src/utils/CREATE3.sol::73 => keccak256(
../../contracts/node_modules/solmate/src/utils/MerkleProofLib.sol::36 => leaf := keccak256(0, 64) // Hash both slots of scratch space.
```
#### Tools used
[c4udit](https://github.com/byterocket/c4udit)

### Long Revert Strings

#### Impact
Issue Information: [G007](https://github.com/byterocket/c4-common-issues/blob/main/0-Gas-Optimizations.md#g007---long-revert-strings)

#### Findings:
```
../../contracts/build/c4udit/examples/Test.sol::6 => string b = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
../../contracts/contracts/Badger.sol::7 => import {ERC165} from "@openzeppelin/contracts/utils/introspection/ERC165.sol";
../../contracts/contracts/Badger.sol::8 => import {Context} from "@openzeppelin/contracts/utils/Context.sol";
../../contracts/contracts/Badger.sol::12 => import {IBadgerOrganization} from "./interfaces/IBadgerOrganization.sol";
../../contracts/contracts/Badger.sol::13 => import {IBadgerOrganizationLogic} from "./interfaces/IBadgerOrganizationLogic.sol";
../../contracts/contracts/Badger.sol::16 => import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
../../contracts/contracts/Badger.sol::49 => "Badger::constructor: _implementation cannot be the zero address."
../../contracts/contracts/BadgerNetwork.sol::5 => import {IBadgerConfigured} from "./interfaces/IBadgerConfigured.sol";
../../contracts/contracts/BadgerOrganization.sol::6 => import {IBadgerOrganization} from "./interfaces/IBadgerOrganization.sol";
../../contracts/contracts/BadgerOrganization.sol::8 => import {Multicallable} from "solady/src/utils/Multicallable.sol";
../../contracts/contracts/BadgerOrganization.sol::58 => "BadgerOrganization::mintBatch: _tos and _amounts must be the same length."
../../contracts/contracts/BadgerOrganization.sol::101 => "BadgerOrganization::revokeBatch: _from and _amounts must be the same length."
../../contracts/contracts/BadgerOrganizationLogic.sol::9 => import {IBadgerOrganizationLogic} from "./interfaces/IBadgerOrganizationLogic.sol";
../../contracts/contracts/BadgerOrganizationLogic.sol::12 => import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
../../contracts/contracts/BadgerOrganizationLogic.sol::13 => import {ERC1155Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
../../contracts/contracts/BadgerOrganizationLogic.sol::90 => "BadgerScout::onlyOrganizationManager: Only the Owner or Organization Manager can call this."
../../contracts/contracts/BadgerOrganizationLogic.sol::102 => "BadgerScout::onlyBadgeManager: Only Managers can call this."
../../contracts/contracts/BadgerOrganizationLogic.sol::123 => "BadgerScout::setOrganizationURI: URI must be set."
../../contracts/contracts/BadgerOrganizationLogic.sol::142 => "BadgerScout::setBadgeURI: URI must be set."
../../contracts/contracts/BadgerOrganizationLogic.sol::164 => "BadgerScout::setManagers: _managers and _isManager must be the same length."
../../contracts/contracts/BadgerOrganizationLogic.sol::175 => "BadgerScout::setManagers: Manager cannot be the zero address."
../../contracts/contracts/BadgerOrganizationLogic.sol::202 => "BadgerScout::setManagers: _managers and _isManager must be the same length."
../../contracts/contracts/BadgerOrganizationLogic.sol::213 => "BadgerScout::setManagers: Manager cannot be the zero address."
../../contracts/contracts/BadgerOrganizationLogic.sol::239 => "BadgerScout::setHooks: _hooks and _isHook must be the same length."
../../contracts/contracts/BadgerOrganizationLogic.sol::250 => "BadgerScout::setHooks: Hook cannot be the zero address."
../../contracts/contracts/hooks/BadgerHook.sol::6 => import {ERC165} from "@openzeppelin/contracts/utils/introspection/ERC165.sol";
../../contracts/contracts/hooks/BadgerHook.sol::8 => import {IBadgerConfigured} from "../interfaces/IBadgerConfigured.sol";
../../contracts/contracts/hooks/BadgerHooked.sol::8 => import {Address} from "@openzeppelin/contracts/utils/Address.sol";
../../contracts/contracts/hooks/BadgerHooked.sol::11 => import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
../../contracts/contracts/hooks/BadgerHooked.sol::12 => import {IBadgerConfigured} from "../interfaces/IBadgerConfigured.sol";
../../contracts/contracts/hooks/BadgerHooked.sol::16 => import {EnumerableSet} from "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
../../contracts/contracts/hooks/BadgerHooked.sol::116 => "BadgerHooks::_setHook: Hook does not implement IBadgerHook."
../../contracts/contracts/hooks/BadgerHooked.sol::149 => "BadgerOrganizationHooked::_configHook: Hook is not enabled."
../../contracts/contracts/hooks/BadgerHooked.sol::155 => "BadgerOrganizationHooked::_configManager: Manager is not a contract."
../../contracts/contracts/hooks/BadgerHooked.sol::163 => "BadgerOrganizationHooked::_configManager: Manager is not a configured Badger module."
../../contracts/contracts/hooks/forfeit/BadgerForfeitForbidden.sol::51 => "BadgerForfeitforbidden::execute: Invalid permission to forfeit token."
../../contracts/contracts/hooks/hook/BadgerHookBlocklist.sol::54 => "BadgerHookBlacklist::execute: Cannot enable blocklisted hook."
../../contracts/contracts/hooks/mint/BadgerMintMax.sol::42 => "BadgerMintMax::config: Max must be greater than zero."
../../contracts/contracts/hooks/mint/BadgerMintMax.sol::65 => "BadgerMintMax::execute: Max mint reached."
../../contracts/contracts/hooks/mint/BadgerMintMaxAllowance.sol::42 => "BadgerMintMaxAllowance::config: Max must be greater than zero."
../../contracts/contracts/hooks/mint/BadgerMintMaxAllowance.sol::65 => "BadgerMintMaxAllowance::execute: Max mint reached."
../../contracts/contracts/hooks/mint/BadgerMintMaxSupply.sol::44 => "BadgerMintMaxSupply::config: Max must be greater than the already minted supply."
../../contracts/contracts/hooks/mint/BadgerMintMaxSupply.sol::67 => "BadgerMintMaxSupply::execute: Max supply exceeded."
../../contracts/contracts/hooks/mint/BadgerMintSelf.sol::55 => "BadgerMintSelfOperated::execute: Only mint to self"
../../contracts/contracts/hooks/revoke/BadgerRevokeForbidden.sol::52 => "BadgerRevokeForbidden::execute: Invalid permission to revoke token."
../../contracts/contracts/hooks/transfer/BadgerTransferBlocklist.sol::55 => "BadgerTransferBlocklist::execute: Invalid permission to transfer token."
../../contracts/contracts/hooks/transfer/BadgerTransferBound.sol::60 => "BadgerTransferBound::execute: Invalid permission to transfer token."
../../contracts/contracts/hooks/transfer/BadgerTransferBoundManaged.sol::6 => import {BadgerOrganizationLogic} from "../../BadgerOrganizationLogic.sol";
../../contracts/contracts/hooks/transfer/BadgerTransferBoundManaged.sol::79 => "BadgerTransferBoundManaged::execute: Invalid permission to transfer token."
../../contracts/contracts/hooks/types/BadgerMintHook.sol::11 => "address,address,uint256,uint256,bytes";
../../contracts/contracts/hooks/types/BadgerTransferHook.sol::11 => "address,address,address,uint256[],uint256[],bytes";
../../contracts/contracts/managers/BadgerManaged.sol::8 => import {Address} from "@openzeppelin/contracts/utils/Address.sol";
../../contracts/contracts/managers/BadgerManaged.sol::11 => import {IERC165} from "@openzeppelin/contracts/utils/introspection/IERC165.sol";
../../contracts/contracts/managers/BadgerManaged.sol::13 => import {IBadgerConfigured} from "../interfaces/IBadgerConfigured.sol";
../../contracts/contracts/managers/BadgerManaged.sol::57 => "BadgerOrganizationHooked::_configManager: Manager is not enabled."
../../contracts/contracts/managers/BadgerManaged.sol::63 => "BadgerOrganizationHooked::_configManager: Manager is not a contract."
../../contracts/contracts/managers/BadgerManaged.sol::71 => "BadgerOrganizationHooked::_configManager: Manager is not a configured Badger module."
../../contracts/contracts/managers/BadgerManager.sol::6 => import {IBadgerConfigured} from "../interfaces/IBadgerConfigured.sol";
../../contracts/contracts/managers/BadgerManager.sol::7 => import {ERC165} from "@openzeppelin/contracts/utils/introspection/ERC165.sol";
../../contracts/contracts/managers/BadgerManagerClaimable.sol::39 => "BadgerManagerClaimable::config: Amount must be greater than zero."
../../contracts/contracts/managers/BadgerManagerSignature.sol::10 => import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
../../contracts/contracts/managers/BadgerManagerSignature.sol::69 => "BadgerManagerSignature::mint: Signature expired."
../../contracts/contracts/managers/BadgerManagerSignature.sol::75 => "BadgerManagerSignature::mint: Invalid nonce."
../../contracts/contracts/managers/BadgerManagerSignature.sol::100 => "BadgerManagerSignature::mint: Invalid signer."
../../contracts/node_modules/@ensdomains/resolver/contracts/DefaultReverseResolver.sol::3 => import "@ensdomains/ens/contracts/ENS.sol";
../../contracts/node_modules/@ensdomains/resolver/contracts/DefaultReverseResolver.sol::4 => import "@ensdomains/ens/contracts/ReverseRegistrar.sol";
../../contracts/node_modules/@ensdomains/resolver/contracts/OwnedResolver.sol::3 => import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
../../contracts/node_modules/@ensdomains/resolver/contracts/OwnedResolver.sol::6 => import "./profiles/ContentHashResolver.sol";
../../contracts/node_modules/@ensdomains/resolver/contracts/PublicResolver.sol::4 => import "@ensdomains/ens/contracts/ENS.sol";
../../contracts/node_modules/@ensdomains/resolver/contracts/PublicResolver.sol::7 => import "./profiles/ContentHashResolver.sol";
../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/DNSResolver.sol::4 => import "@ensdomains/dnssec-oracle/contracts/RRUtils.sol";
../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/InterfaceResolver.sol::7 => bytes4 constant private INTERFACE_INTERFACE_ID = bytes4(keccak256("interfaceImplementer(bytes32,bytes4)"));
../../contracts/node_modules/@ensdomains/resolver/test/mocks/dummy.sol::5 => import "@ensdomains/ens/contracts/ENSRegistry.sol";
../../contracts/node_modules/@ethereum-waffle/mock-contract/src/Doppelganger.sol::143 => revert("Mock on the method is not initialized");
../../contracts/node_modules/@openzeppelin/contracts/access/AccessControl.sol::9 => import "../utils/introspection/ERC165.sol";
../../contracts/node_modules/@openzeppelin/contracts/access/AccessControl.sol::180 => require(account == _msgSender(), "AccessControl: can only renounce roles for self");
../../contracts/node_modules/@openzeppelin/contracts/access/AccessControlCrossChain.sol::7 => import "../crosschain/CrossChainEnabled.sol";
../../contracts/node_modules/@openzeppelin/contracts/access/AccessControlEnumerable.sol::8 => import "../utils/structs/EnumerableSet.sol";
../../contracts/node_modules/@openzeppelin/contracts/access/Ownable.sol::70 => require(newOwner != address(0), "Ownable: new owner is the zero address");
../../contracts/node_modules/@openzeppelin/contracts/crosschain/arbitrum/LibArbitrumL1.sol::6 => import {IBridge as ArbitrumL1_Bridge} from "../../vendor/arbitrum/IBridge.sol";
../../contracts/node_modules/@openzeppelin/contracts/crosschain/arbitrum/LibArbitrumL1.sol::8 => import {IOutbox as ArbitrumL1_Outbox} from "../../vendor/arbitrum/IOutbox.sol";
../../contracts/node_modules/@openzeppelin/contracts/crosschain/arbitrum/LibArbitrumL1.sol::39 => require(sender != address(0), "LibArbitrumL1: system messages without sender");
../../contracts/node_modules/@openzeppelin/contracts/crosschain/arbitrum/LibArbitrumL2.sol::6 => import {IArbSys as ArbitrumL2_Bridge} from "../../vendor/arbitrum/IArbSys.sol";
../../contracts/node_modules/@openzeppelin/contracts/crosschain/optimism/LibOptimism.sol::6 => import {ICrossDomainMessenger as Optimism_Bridge} from "../../vendor/optimism/ICrossDomainMessenger.sol";
../../contracts/node_modules/@openzeppelin/contracts/crosschain/polygon/CrossChainEnabledPolygonChild.sol::7 => import "../../security/ReentrancyGuard.sol";
../../contracts/node_modules/@openzeppelin/contracts/crosschain/polygon/CrossChainEnabledPolygonChild.sol::9 => import "../../vendor/polygon/IFxMessageProcessor.sol";
../../contracts/node_modules/@openzeppelin/contracts/finance/PaymentSplitter.sol::6 => import "../token/ERC20/utils/SafeERC20.sol";
../../contracts/node_modules/@openzeppelin/contracts/finance/PaymentSplitter.sol::52 => require(payees.length == shares_.length, "PaymentSplitter: payees and shares length mismatch");
../../contracts/node_modules/@openzeppelin/contracts/finance/PaymentSplitter.sol::146 => require(_shares[account] > 0, "PaymentSplitter: account has no shares");
../../contracts/node_modules/@openzeppelin/contracts/finance/PaymentSplitter.sol::150 => require(payment != 0, "PaymentSplitter: account is not due payment");
../../contracts/node_modules/@openzeppelin/contracts/finance/PaymentSplitter.sol::165 => require(_shares[account] > 0, "PaymentSplitter: account has no shares");
../../contracts/node_modules/@openzeppelin/contracts/finance/PaymentSplitter.sol::169 => require(payment != 0, "PaymentSplitter: account is not due payment");
../../contracts/node_modules/@openzeppelin/contracts/finance/PaymentSplitter.sol::196 => require(account != address(0), "PaymentSplitter: account is the zero address");
../../contracts/node_modules/@openzeppelin/contracts/finance/PaymentSplitter.sol::198 => require(_shares[account] == 0, "PaymentSplitter: account already has shares");
../../contracts/node_modules/@openzeppelin/contracts/finance/VestingWallet.sol::5 => import "../token/ERC20/utils/SafeERC20.sol";
../../contracts/node_modules/@openzeppelin/contracts/finance/VestingWallet.sol::38 => require(beneficiaryAddress != address(0), "VestingWallet: beneficiary is zero address");
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::6 => import "../token/ERC721/IERC721Receiver.sol";
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::7 => import "../token/ERC1155/IERC1155Receiver.sol";
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::9 => import "../utils/cryptography/draft-EIP712.sol";
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::10 => import "../utils/introspection/ERC165.sol";
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::12 => import "../utils/structs/DoubleEndedQueue.sol";
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::34 => bytes32 public constant BALLOT_TYPEHASH = keccak256("Ballot(uint256 proposalId,uint8 support)");
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::36 => keccak256("ExtendedBallot(uint256 proposalId,uint8 support,string reason,bytes params)");
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::194 => * @dev Part of the Governor Bravo's interface: _"The number of votes required in order for a voter to become a proposer"_.
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::253 => "Governor: proposer votes below proposal threshold"
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::258 => require(targets.length == values.length, "Governor: invalid proposal length");
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::259 => require(targets.length == calldatas.length, "Governor: invalid proposal length");
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::263 => require(proposal.voteStart.isUnset(), "Governor: proposal already exists");
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::300 => "Governor: proposal not successful"
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::323 => string memory errorMessage = "Governor: call reverted without message";
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::523 => require(state(proposalId) == ProposalState.Active, "Governor: vote not currently active");
../../contracts/node_modules/@openzeppelin/contracts/governance/IGovernor.sol::6 => import "../utils/introspection/ERC165.sol";
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::7 => import "../token/ERC721/IERC721Receiver.sol";
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::8 => import "../token/ERC1155/IERC1155Receiver.sol";
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::244 => require(targets.length == values.length, "TimelockController: length mismatch");
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::245 => require(targets.length == payloads.length, "TimelockController: length mismatch");
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::258 => require(!isOperation(id), "TimelockController: operation already scheduled");
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::259 => require(delay >= getMinDelay(), "TimelockController: insufficient delay");
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::271 => require(isOperationPending(id), "TimelockController: operation cannot be cancelled");
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::320 => require(targets.length == values.length, "TimelockController: length mismatch");
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::321 => require(targets.length == payloads.length, "TimelockController: length mismatch");
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::345 => require(success, "TimelockController: underlying transaction reverted");
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::352 => require(isOperationReady(id), "TimelockController: operation is not ready");
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::353 => require(predecessor == bytes32(0) || isOperationDone(predecessor), "TimelockController: missing dependency");
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::360 => require(isOperationReady(id), "TimelockController: operation is not ready");
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::375 => require(msg.sender == address(this), "TimelockController: caller must be timelock");
../../contracts/node_modules/@openzeppelin/contracts/governance/compatibility/GovernorCompatibilityBravo.sol::8 => import "../extensions/IGovernorTimelock.sol";
../../contracts/node_modules/@openzeppelin/contracts/governance/compatibility/GovernorCompatibilityBravo.sol::10 => import "./IGovernorCompatibilityBravo.sol";
../../contracts/node_modules/@openzeppelin/contracts/governance/compatibility/GovernorCompatibilityBravo.sol::111 => "GovernorBravo: proposer above threshold"
../../contracts/node_modules/@openzeppelin/contracts/governance/compatibility/GovernorCompatibilityBravo.sol::274 => require(!receipt.hasVoted, "GovernorCompatibilityBravo: vote already cast");
../../contracts/node_modules/@openzeppelin/contracts/governance/compatibility/GovernorCompatibilityBravo.sol::286 => revert("GovernorCompatibilityBravo: invalid vote type");
../../contracts/node_modules/@openzeppelin/contracts/governance/compatibility/IGovernorCompatibilityBravo.sol::51 => * @dev Part of the Governor Bravo's interface: _"The official record of all proposals ever proposed"_.
../../contracts/node_modules/@openzeppelin/contracts/governance/compatibility/IGovernorCompatibilityBravo.sol::71 => * @dev Part of the Governor Bravo's interface: _"Function used to propose a new proposal"_.
../../contracts/node_modules/@openzeppelin/contracts/governance/compatibility/IGovernorCompatibilityBravo.sol::82 => * @dev Part of the Governor Bravo's interface: _"Queues a proposal of state succeeded"_.
../../contracts/node_modules/@openzeppelin/contracts/governance/compatibility/IGovernorCompatibilityBravo.sol::87 => * @dev Part of the Governor Bravo's interface: _"Executes a queued proposal if eta has passed"_.
../../contracts/node_modules/@openzeppelin/contracts/governance/compatibility/IGovernorCompatibilityBravo.sol::111 => * @dev Part of the Governor Bravo's interface: _"Gets the receipt for a voter on a given proposal"_.
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol::94 => require(!proposalvote.hasVoted[account], "GovernorVotingSimple: vote already cast");
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol::104 => revert("GovernorVotingSimple: invalid value for enum VoteType");
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorSettings.sol::100 => require(newVotingPeriod > 0, "GovernorSettings: voting period too low");
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorTimelockCompound.sol::9 => import "../../vendor/compound/ICompoundTimelock.sol";
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorTimelockCompound.sol::99 => require(state(proposalId) == ProposalState.Succeeded, "Governor: proposal not successful");
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorTimelockCompound.sol::106 => "GovernorTimelockCompound: identical proposal action already queued"
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorTimelockCompound.sol::127 => require(eta > 0, "GovernorTimelockCompound: proposal not yet queued");
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol::98 => require(state(proposalId) == ProposalState.Succeeded, "Governor: proposal not successful");
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorVotesComp.sol::7 => import "../../token/ERC20/extensions/ERC20VotesComp.sol";
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol::102 => "GovernorVotesQuorumFraction: quorumNumerator over quorumDenominator"
../../contracts/node_modules/@openzeppelin/contracts/governance/utils/Votes.sol::8 => import "../../utils/cryptography/draft-EIP712.sol";
../../contracts/node_modules/@openzeppelin/contracts/governance/utils/Votes.sol::36 => keccak256("Delegation(address delegatee,uint256 nonce,uint256 expiry)");
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1155MetadataURI.sol::6 => import "../token/ERC1155/extensions/IERC1155MetadataURI.sol";
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1155Receiver.sol::6 => import "../token/ERC1155/IERC1155Receiver.sol";
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1363Receiver.sol::9 => * 0x88a7ca5c === bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1363Receiver.sol::23 => * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1363Spender.sol::9 => * 0x7b04a2d0 === bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1363Spender.sol::22 => * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC165.sol::6 => import "../utils/introspection/IERC165.sol";
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1820Implementer.sol::6 => import "../utils/introspection/IERC1820Implementer.sol";
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1820Registry.sol::6 => import "../utils/introspection/IERC1820Registry.sol";
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC20Metadata.sol::6 => import "../token/ERC20/extensions/IERC20Metadata.sol";
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC2981.sol::6 => import "../utils/introspection/IERC165.sol";
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC3156FlashBorrower.sol::20 => * @return The keccak256 hash of "IERC3156FlashBorrower.onFlashLoan"
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC4626.sol::7 => import "../token/ERC20/extensions/IERC20Metadata.sol";
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC721Enumerable.sol::6 => import "../token/ERC721/extensions/IERC721Enumerable.sol";
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC721Metadata.sol::6 => import "../token/ERC721/extensions/IERC721Metadata.sol";
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC721Receiver.sol::6 => import "../token/ERC721/IERC721Receiver.sol";
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC777Recipient.sol::6 => import "../token/ERC777/IERC777Recipient.sol";
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC777Sender.sol::6 => import "../token/ERC777/IERC777Sender.sol";
../../contracts/node_modules/@openzeppelin/contracts/interfaces/draft-IERC2612.sol::6 => import "../token/ERC20/extensions/draft-IERC20Permit.sol";
../../contracts/node_modules/@openzeppelin/contracts/metatx/MinimalForwarder.sol::7 => import "../utils/cryptography/draft-EIP712.sol";
../../contracts/node_modules/@openzeppelin/contracts/metatx/MinimalForwarder.sol::30 => keccak256("ForwardRequest(address from,address to,uint256 value,uint256 gas,uint256 nonce,bytes data)");
../../contracts/node_modules/@openzeppelin/contracts/metatx/MinimalForwarder.sol::52 => require(verify(req, signature), "MinimalForwarder: signature does not match request");
../../contracts/node_modules/@openzeppelin/contracts/proxy/ERC1967/ERC1967Upgrade.sol::7 => import "../../interfaces/draft-IERC1822.sol";
../../contracts/node_modules/@openzeppelin/contracts/proxy/ERC1967/ERC1967Upgrade.sol::46 => require(Address.isContract(newImplementation), "ERC1967: new implementation is not a contract");
../../contracts/node_modules/@openzeppelin/contracts/proxy/ERC1967/ERC1967Upgrade.sol::93 => require(slot == _IMPLEMENTATION_SLOT, "ERC1967Upgrade: unsupported proxiableUUID");
../../contracts/node_modules/@openzeppelin/contracts/proxy/ERC1967/ERC1967Upgrade.sol::95 => revert("ERC1967Upgrade: new implementation is not UUPS");
../../contracts/node_modules/@openzeppelin/contracts/proxy/ERC1967/ERC1967Upgrade.sol::124 => require(newAdmin != address(0), "ERC1967: new admin is the zero address");
../../contracts/node_modules/@openzeppelin/contracts/proxy/ERC1967/ERC1967Upgrade.sol::160 => require(Address.isContract(newBeacon), "ERC1967: new beacon is not a contract");
../../contracts/node_modules/@openzeppelin/contracts/proxy/ERC1967/ERC1967Upgrade.sol::163 => "ERC1967: beacon implementation is not a contract"
../../contracts/node_modules/@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol::62 => require(Address.isContract(newImplementation), "UpgradeableBeacon: implementation is not a contract");
../../contracts/node_modules/@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol::6 => import "./TransparentUpgradeableProxy.sol";
../../contracts/node_modules/@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol::20 => * "admin cannot fallback to proxy target".
../../contracts/node_modules/@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol::121 => require(msg.sender != _getAdmin(), "TransparentUpgradeableProxy: admin cannot fallback to proxy target");
../../contracts/node_modules/@openzeppelin/contracts/proxy/utils/Initializable.sol::82 => "Initializable: contract is already initialized"
../../contracts/node_modules/@openzeppelin/contracts/proxy/utils/Initializable.sol::108 => require(!_initializing && _initialized < version, "Initializable: contract is already initialized");
../../contracts/node_modules/@openzeppelin/contracts/proxy/utils/Initializable.sol::121 => require(_initializing, "Initializable: contract is not initializing");
../../contracts/node_modules/@openzeppelin/contracts/proxy/utils/Initializable.sol::132 => require(!_initializing, "Initializable: contract is initializing");
../../contracts/node_modules/@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol::6 => import "../../interfaces/draft-IERC1822.sol";
../../contracts/node_modules/@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol::33 => require(address(this) != __self, "Function must be called through delegatecall");
../../contracts/node_modules/@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol::34 => require(_getImplementation() == __self, "Function must be called through active proxy");
../../contracts/node_modules/@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol::43 => require(address(this) == __self, "UUPSUpgradeable: must not be called through delegatecall");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::8 => import "./extensions/IERC1155MetadataURI.sol";
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::11 => import "../../utils/introspection/ERC165.sol";
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::71 => require(account != address(0), "ERC1155: address zero is not a valid owner");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::89 => require(accounts.length == ids.length, "ERC1155: accounts and ids length mismatch");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::126 => "ERC1155: caller is not token owner nor approved"
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::143 => "ERC1155: caller is not token owner nor approved"
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::167 => require(to != address(0), "ERC1155: transfer to the zero address");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::176 => require(fromBalance >= amount, "ERC1155: insufficient balance for transfer");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::206 => require(ids.length == amounts.length, "ERC1155: ids and amounts length mismatch");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::207 => require(to != address(0), "ERC1155: transfer to the zero address");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::218 => require(fromBalance >= amount, "ERC1155: insufficient balance for transfer");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::272 => require(to != address(0), "ERC1155: mint to the zero address");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::305 => require(to != address(0), "ERC1155: mint to the zero address");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::306 => require(ids.length == amounts.length, "ERC1155: ids and amounts length mismatch");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::338 => require(from != address(0), "ERC1155: burn from the zero address");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::347 => require(fromBalance >= amount, "ERC1155: burn amount exceeds balance");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::371 => require(from != address(0), "ERC1155: burn from the zero address");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::372 => require(ids.length == amounts.length, "ERC1155: ids and amounts length mismatch");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::383 => require(fromBalance >= amount, "ERC1155: burn amount exceeds balance");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::404 => require(owner != operator, "ERC1155: setting approval status for self");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::478 => revert("ERC1155: ERC1155Receiver rejected tokens");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::483 => revert("ERC1155: transfer to non ERC1155Receiver implementer");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::501 => revert("ERC1155: ERC1155Receiver rejected tokens");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::506 => revert("ERC1155: transfer to non ERC1155Receiver implementer");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155.sol::6 => import "../../utils/introspection/IERC165.sol";
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol::6 => import "../../utils/introspection/IERC165.sol";
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol::17 => * `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))`
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol::25 => * @return `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))` if transfer is allowed
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol::41 => * `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))`
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol::49 => * @return `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))` if transfer is allowed
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol::22 => "ERC1155: caller is not token owner nor approved"
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol::35 => "ERC1155: caller is not token owner nor approved"
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol::36 => require(!paused(), "ERC1155Pausable: token transfer while paused");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol::57 => require(supply >= amount, "ERC1155: burn amount exceeds totalSupply");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol::7 => import "../extensions/ERC1155Burnable.sol";
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol::8 => import "../extensions/ERC1155Pausable.sol";
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol::9 => import "../../../access/AccessControlEnumerable.sol";
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol::58 => require(hasRole(MINTER_ROLE, _msgSender()), "ERC1155PresetMinterPauser: must have minter role to mint");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol::72 => require(hasRole(MINTER_ROLE, _msgSender()), "ERC1155PresetMinterPauser: must have minter role to mint");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol::87 => require(hasRole(PAUSER_ROLE, _msgSender()), "ERC1155PresetMinterPauser: must have pauser role to pause");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol::101 => require(hasRole(PAUSER_ROLE, _msgSender()), "ERC1155PresetMinterPauser: must have pauser role to unpause");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/utils/ERC1155Receiver.sol::7 => import "../../../utils/introspection/ERC165.sol";
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol::204 => require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol::231 => require(from != address(0), "ERC20: transfer from the zero address");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol::232 => require(to != address(0), "ERC20: transfer to the zero address");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol::237 => require(fromBalance >= amount, "ERC20: transfer amount exceeds balance");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol::281 => require(account != address(0), "ERC20: burn from the zero address");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol::286 => require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol::315 => require(owner != address(0), "ERC20: approve from the zero address");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol::316 => require(spender != address(0), "ERC20: approve to the zero address");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20FlashMint.sol::6 => import "../../../interfaces/IERC3156FlashBorrower.sol";
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20FlashMint.sol::7 => import "../../../interfaces/IERC3156FlashLender.sol";
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20FlashMint.sol::79 => require(amount <= maxFlashLoan(token), "ERC20FlashMint: amount exceeds maxFlashLoan");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20FlashMint.sol::84 => "ERC20FlashMint: invalid return value"
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol::31 => require(!paused(), "ERC20Pausable: token transfer while paused");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol::8 => import "../../../governance/utils/IVotes.sol";
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol::10 => import "../../../utils/cryptography/ECDSA.sol";
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol::34 => keccak256("Delegation(address delegatee,uint256 nonce,uint256 expiry)");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol::164 => require(totalSupply() <= _maxSupply(), "ERC20Votes: total supply risks overflowing votes");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Wrapper.sol::12 => * Users can deposit and withdraw "underlying tokens" and receive a matching number of "wrapped tokens". This is useful
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol::8 => import "../../../utils/cryptography/draft-EIP712.sol";
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol::9 => import "../../../utils/cryptography/ECDSA.sol";
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol::29 => keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol::9 => import "../../../access/AccessControlEnumerable.sol";
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol::55 => require(hasRole(MINTER_ROLE, _msgSender()), "ERC20PresetMinterPauser: must have minter role to mint");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol::69 => require(hasRole(PAUSER_ROLE, _msgSender()), "ERC20PresetMinterPauser: must have pauser role to pause");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol::83 => require(hasRole(PAUSER_ROLE, _msgSender()), "ERC20PresetMinterPauser: must have pauser role to unpause");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol::7 => import "../extensions/draft-IERC20Permit.sol";
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol::56 => "SafeERC20: approve from non-zero to non-zero allowance"
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol::77 => require(oldAllowance >= value, "SafeERC20: decreased allowance below zero");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol::96 => require(nonceAfter == nonceBefore + 1, "SafeERC20: permit did not succeed");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol::113 => require(abi.decode(returndata, (bool)), "SafeERC20: ERC20 operation did not succeed");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/utils/TokenTimelock.sol::37 => require(releaseTime_ > block.timestamp, "TokenTimelock: release time is before current time");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/utils/TokenTimelock.sol::69 => require(block.timestamp >= releaseTime(), "TokenTimelock: current time is before release time");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/utils/TokenTimelock.sol::72 => require(amount > 0, "TokenTimelock: no tokens to release");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol::12 => import "../../utils/introspection/ERC165.sol";
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol::63 => require(owner != address(0), "ERC721: address zero is not a valid owner");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol::114 => require(to != owner, "ERC721: approval to current owner");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol::118 => "ERC721: approve caller is not token owner nor approved for all"
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol::156 => require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner nor approved");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol::181 => require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner nor approved");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol::210 => require(_checkOnERC721Received(from, to, tokenId, data), "ERC721: transfer to non ERC721Receiver implementer");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol::263 => "ERC721: transfer to non ERC721Receiver implementer"
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol::335 => require(ERC721.ownerOf(tokenId) == from, "ERC721: transfer from incorrect owner");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol::336 => require(to != address(0), "ERC721: transfer to the zero address");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol::405 => revert("ERC721: transfer to non ERC721Receiver implementer");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol::6 => import "../../utils/introspection/IERC165.sol";
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol::23 => require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner nor approved");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol::38 => require(index < ERC721.balanceOf(owner), "ERC721Enumerable: owner index out of bounds");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol::53 => require(index < ERC721Enumerable.totalSupply(), "ERC721Enumerable: global index out of bounds");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol::31 => require(!paused(), "ERC721Pausable: token transfer while paused");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol::8 => import "../../../utils/introspection/ERC165.sol";
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol::46 => require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/draft-ERC721Votes.sol::7 => import "../../../governance/utils/Votes.sol";
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol::7 => import "../extensions/ERC721Enumerable.sol";
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol::10 => import "../../../access/AccessControlEnumerable.sol";
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol::83 => require(hasRole(MINTER_ROLE, _msgSender()), "ERC721PresetMinterPauserAutoId: must have minter role to mint");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol::101 => require(hasRole(PAUSER_ROLE, _msgSender()), "ERC721PresetMinterPauserAutoId: must have pauser role to pause");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol::115 => require(hasRole(PAUSER_ROLE, _msgSender()), "ERC721PresetMinterPauserAutoId: must have pauser role to unpause");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC777/ERC777.sol::12 => import "../../utils/introspection/IERC1820Registry.sol";
../../contracts/node_modules/@openzeppelin/contracts/token/ERC777/ERC777.sol::174 => require(_msgSender() != operator, "ERC777: authorizing self as operator");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC777/ERC777.sol::189 => require(operator != _msgSender(), "ERC777: revoking self as operator");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC777/ERC777.sol::219 => require(isOperatorFor(_msgSender(), sender), "ERC777: caller is not an operator for holder");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC777/ERC777.sol::234 => require(isOperatorFor(_msgSender(), account), "ERC777: caller is not an operator for holder");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC777/ERC777.sol::371 => require(from != address(0), "ERC777: transfer from the zero address");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC777/ERC777.sol::372 => require(to != address(0), "ERC777: transfer to the zero address");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC777/ERC777.sol::396 => require(from != address(0), "ERC777: burn from the zero address");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC777/ERC777.sol::406 => require(fromBalance >= amount, "ERC777: burn amount exceeds balance");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC777/ERC777.sol::427 => require(fromBalance >= amount, "ERC777: transfer amount exceeds balance");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC777/ERC777.sol::447 => require(holder != address(0), "ERC777: approve from the zero address");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC777/ERC777.sol::448 => require(spender != address(0), "ERC777: approve to the zero address");
../../contracts/node_modules/@openzeppelin/contracts/token/ERC777/ERC777.sol::501 => require(!to.isContract(), "ERC777: token recipient contract has no implementer for ERC777TokensRecipient");
../../contracts/node_modules/@openzeppelin/contracts/token/common/ERC2981.sol::7 => import "../../utils/introspection/ERC165.sol";
../../contracts/node_modules/@openzeppelin/contracts/token/common/ERC2981.sol::73 => require(feeNumerator <= _feeDenominator(), "ERC2981: royalty fee will exceed salePrice");
../../contracts/node_modules/@openzeppelin/contracts/token/common/ERC2981.sol::99 => require(feeNumerator <= _feeDenominator(), "ERC2981: royalty fee will exceed salePrice");
../../contracts/node_modules/@openzeppelin/contracts/utils/Address.sol::64 => require(success, "Address: unable to send value, recipient may have reverted");
../../contracts/node_modules/@openzeppelin/contracts/utils/Address.sol::119 => return functionCallWithValue(target, data, value, "Address: low-level call with value failed");
../../contracts/node_modules/@openzeppelin/contracts/utils/Address.sol::134 => require(address(this).balance >= value, "Address: insufficient balance for call");
../../contracts/node_modules/@openzeppelin/contracts/utils/Address.sol::148 => return functionStaticCall(target, data, "Address: low-level static call failed");
../../contracts/node_modules/@openzeppelin/contracts/utils/Address.sol::162 => require(isContract(target), "Address: static call to non-contract");
../../contracts/node_modules/@openzeppelin/contracts/utils/Address.sol::175 => return functionDelegateCall(target, data, "Address: low-level delegate call failed");
../../contracts/node_modules/@openzeppelin/contracts/utils/Address.sol::189 => require(isContract(target), "Address: delegate call to non-contract");
../../contracts/node_modules/@openzeppelin/contracts/utils/Base64.sol::15 => string internal constant _TABLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
../../contracts/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol::24 => *         require(Address.isContract(newImplementation), "ERC1967: new implementation is not a contract");
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol::31 => revert("ECDSA: invalid signature 's' value");
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol::33 => revert("ECDSA: invalid signature 'v' value");
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol::57 => "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
../../contracts/node_modules/@openzeppelin/contracts/utils/escrow/ConditionalEscrow.sol::22 => require(withdrawalAllowed(payee), "ConditionalEscrow: payee is not allowed to withdraw");
../../contracts/node_modules/@openzeppelin/contracts/utils/escrow/RefundEscrow.sol::38 => require(beneficiary_ != address(0), "RefundEscrow: beneficiary is the zero address");
../../contracts/node_modules/@openzeppelin/contracts/utils/escrow/RefundEscrow.sol::62 => require(state() == State.Active, "RefundEscrow: can only deposit while active");
../../contracts/node_modules/@openzeppelin/contracts/utils/escrow/RefundEscrow.sol::71 => require(state() == State.Active, "RefundEscrow: can only close while active");
../../contracts/node_modules/@openzeppelin/contracts/utils/escrow/RefundEscrow.sol::80 => require(state() == State.Active, "RefundEscrow: can only enable refunds while active");
../../contracts/node_modules/@openzeppelin/contracts/utils/escrow/RefundEscrow.sol::89 => require(state() == State.Closed, "RefundEscrow: beneficiary can only withdraw while closed");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::35 => require(value <= type(uint248).max, "SafeCast: value doesn't fit in 248 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::52 => require(value <= type(uint240).max, "SafeCast: value doesn't fit in 240 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::69 => require(value <= type(uint232).max, "SafeCast: value doesn't fit in 232 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::86 => require(value <= type(uint224).max, "SafeCast: value doesn't fit in 224 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::103 => require(value <= type(uint216).max, "SafeCast: value doesn't fit in 216 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::120 => require(value <= type(uint208).max, "SafeCast: value doesn't fit in 208 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::137 => require(value <= type(uint200).max, "SafeCast: value doesn't fit in 200 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::154 => require(value <= type(uint192).max, "SafeCast: value doesn't fit in 192 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::171 => require(value <= type(uint184).max, "SafeCast: value doesn't fit in 184 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::188 => require(value <= type(uint176).max, "SafeCast: value doesn't fit in 176 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::205 => require(value <= type(uint168).max, "SafeCast: value doesn't fit in 168 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::222 => require(value <= type(uint160).max, "SafeCast: value doesn't fit in 160 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::239 => require(value <= type(uint152).max, "SafeCast: value doesn't fit in 152 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::256 => require(value <= type(uint144).max, "SafeCast: value doesn't fit in 144 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::273 => require(value <= type(uint136).max, "SafeCast: value doesn't fit in 136 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::290 => require(value <= type(uint128).max, "SafeCast: value doesn't fit in 128 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::307 => require(value <= type(uint120).max, "SafeCast: value doesn't fit in 120 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::324 => require(value <= type(uint112).max, "SafeCast: value doesn't fit in 112 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::341 => require(value <= type(uint104).max, "SafeCast: value doesn't fit in 104 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::358 => require(value <= type(uint96).max, "SafeCast: value doesn't fit in 96 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::375 => require(value <= type(uint88).max, "SafeCast: value doesn't fit in 88 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::392 => require(value <= type(uint80).max, "SafeCast: value doesn't fit in 80 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::409 => require(value <= type(uint72).max, "SafeCast: value doesn't fit in 72 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::426 => require(value <= type(uint64).max, "SafeCast: value doesn't fit in 64 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::443 => require(value <= type(uint56).max, "SafeCast: value doesn't fit in 56 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::460 => require(value <= type(uint48).max, "SafeCast: value doesn't fit in 48 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::477 => require(value <= type(uint40).max, "SafeCast: value doesn't fit in 40 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::494 => require(value <= type(uint32).max, "SafeCast: value doesn't fit in 32 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::511 => require(value <= type(uint24).max, "SafeCast: value doesn't fit in 24 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::528 => require(value <= type(uint16).max, "SafeCast: value doesn't fit in 16 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::545 => require(value <= type(uint8).max, "SafeCast: value doesn't fit in 8 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::577 => require(value >= type(int248).min && value <= type(int248).max, "SafeCast: value doesn't fit in 248 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::595 => require(value >= type(int240).min && value <= type(int240).max, "SafeCast: value doesn't fit in 240 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::613 => require(value >= type(int232).min && value <= type(int232).max, "SafeCast: value doesn't fit in 232 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::631 => require(value >= type(int224).min && value <= type(int224).max, "SafeCast: value doesn't fit in 224 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::649 => require(value >= type(int216).min && value <= type(int216).max, "SafeCast: value doesn't fit in 216 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::667 => require(value >= type(int208).min && value <= type(int208).max, "SafeCast: value doesn't fit in 208 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::685 => require(value >= type(int200).min && value <= type(int200).max, "SafeCast: value doesn't fit in 200 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::703 => require(value >= type(int192).min && value <= type(int192).max, "SafeCast: value doesn't fit in 192 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::721 => require(value >= type(int184).min && value <= type(int184).max, "SafeCast: value doesn't fit in 184 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::739 => require(value >= type(int176).min && value <= type(int176).max, "SafeCast: value doesn't fit in 176 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::757 => require(value >= type(int168).min && value <= type(int168).max, "SafeCast: value doesn't fit in 168 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::775 => require(value >= type(int160).min && value <= type(int160).max, "SafeCast: value doesn't fit in 160 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::793 => require(value >= type(int152).min && value <= type(int152).max, "SafeCast: value doesn't fit in 152 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::811 => require(value >= type(int144).min && value <= type(int144).max, "SafeCast: value doesn't fit in 144 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::829 => require(value >= type(int136).min && value <= type(int136).max, "SafeCast: value doesn't fit in 136 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::847 => require(value >= type(int128).min && value <= type(int128).max, "SafeCast: value doesn't fit in 128 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::865 => require(value >= type(int120).min && value <= type(int120).max, "SafeCast: value doesn't fit in 120 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::883 => require(value >= type(int112).min && value <= type(int112).max, "SafeCast: value doesn't fit in 112 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::901 => require(value >= type(int104).min && value <= type(int104).max, "SafeCast: value doesn't fit in 104 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::919 => require(value >= type(int96).min && value <= type(int96).max, "SafeCast: value doesn't fit in 96 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::937 => require(value >= type(int88).min && value <= type(int88).max, "SafeCast: value doesn't fit in 88 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::955 => require(value >= type(int80).min && value <= type(int80).max, "SafeCast: value doesn't fit in 80 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::973 => require(value >= type(int72).min && value <= type(int72).max, "SafeCast: value doesn't fit in 72 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::991 => require(value >= type(int64).min && value <= type(int64).max, "SafeCast: value doesn't fit in 64 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::1009 => require(value >= type(int56).min && value <= type(int56).max, "SafeCast: value doesn't fit in 56 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::1027 => require(value >= type(int48).min && value <= type(int48).max, "SafeCast: value doesn't fit in 48 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::1045 => require(value >= type(int40).min && value <= type(int40).max, "SafeCast: value doesn't fit in 40 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::1063 => require(value >= type(int32).min && value <= type(int32).max, "SafeCast: value doesn't fit in 32 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::1081 => require(value >= type(int24).min && value <= type(int24).max, "SafeCast: value doesn't fit in 24 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::1099 => require(value >= type(int16).min && value <= type(int16).max, "SafeCast: value doesn't fit in 16 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::1117 => require(value >= type(int8).min && value <= type(int8).max, "SafeCast: value doesn't fit in 8 bits");
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::1132 => require(value <= uint256(type(int256).max), "SafeCast: value doesn't fit in an int256");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlCrossChainUpgradeable.sol::7 => import "../crosschain/CrossChainEnabledUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol::6 => import "./IAccessControlEnumerableUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol::8 => import "../utils/structs/EnumerableSetUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol::9 => import "../utils/introspection/ERC165Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol::186 => require(account == _msgSender(), "AccessControl: can only renounce roles for self");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol::75 => require(newOwner != address(0), "Ownable: new owner is the zero address");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/amb/CrossChainEnabledAMBUpgradeable.sol::6 => import "../CrossChainEnabledUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/amb/CrossChainEnabledAMBUpgradeable.sol::8 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/amb/LibAMBUpgradeable.sol::6 => import { IAMBUpgradeable as AMB_Bridge } from "../../vendor/amb/IAMBUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/arbitrum/CrossChainEnabledArbitrumL1Upgradeable.sol::6 => import "../CrossChainEnabledUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/arbitrum/CrossChainEnabledArbitrumL1Upgradeable.sol::8 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/arbitrum/CrossChainEnabledArbitrumL2Upgradeable.sol::6 => import "../CrossChainEnabledUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/arbitrum/CrossChainEnabledArbitrumL2Upgradeable.sol::8 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/arbitrum/LibArbitrumL1Upgradeable.sol::6 => import { IBridgeUpgradeable as ArbitrumL1_Bridge } from "../../vendor/arbitrum/IBridgeUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/arbitrum/LibArbitrumL1Upgradeable.sol::7 => import { IInboxUpgradeable as ArbitrumL1_Inbox } from "../../vendor/arbitrum/IInboxUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/arbitrum/LibArbitrumL1Upgradeable.sol::8 => import { IOutboxUpgradeable as ArbitrumL1_Outbox } from "../../vendor/arbitrum/IOutboxUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/arbitrum/LibArbitrumL1Upgradeable.sol::39 => require(sender != address(0), "LibArbitrumL1: system messages without sender");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/arbitrum/LibArbitrumL2Upgradeable.sol::6 => import { IArbSysUpgradeable as ArbitrumL2_Bridge } from "../../vendor/arbitrum/IArbSysUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/optimism/CrossChainEnabledOptimismUpgradeable.sol::6 => import "../CrossChainEnabledUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/optimism/CrossChainEnabledOptimismUpgradeable.sol::8 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/optimism/LibOptimismUpgradeable.sol::6 => import { ICrossDomainMessengerUpgradeable as Optimism_Bridge } from "../../vendor/optimism/ICrossDomainMessengerUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/polygon/CrossChainEnabledPolygonChildUpgradeable.sol::6 => import "../CrossChainEnabledUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/polygon/CrossChainEnabledPolygonChildUpgradeable.sol::7 => import "../../security/ReentrancyGuardUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/polygon/CrossChainEnabledPolygonChildUpgradeable.sol::8 => import "../../utils/AddressUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/polygon/CrossChainEnabledPolygonChildUpgradeable.sol::9 => import "../../vendor/polygon/IFxMessageProcessorUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/polygon/CrossChainEnabledPolygonChildUpgradeable.sol::10 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/polygon/CrossChainEnabledPolygonChildUpgradeable.sol::77 => require(AddressUpgradeable.isContract(target), "Address: delegate call to non-contract");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/polygon/CrossChainEnabledPolygonChildUpgradeable.sol::81 => return AddressUpgradeable.verifyCallResult(success, returndata, "Address: low-level delegate call failed");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/finance/PaymentSplitterUpgradeable.sol::6 => import "../token/ERC20/utils/SafeERC20Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/finance/PaymentSplitterUpgradeable.sol::57 => require(payees.length == shares_.length, "PaymentSplitter: payees and shares length mismatch");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/finance/PaymentSplitterUpgradeable.sol::151 => require(_shares[account] > 0, "PaymentSplitter: account has no shares");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/finance/PaymentSplitterUpgradeable.sol::155 => require(payment != 0, "PaymentSplitter: account is not due payment");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/finance/PaymentSplitterUpgradeable.sol::170 => require(_shares[account] > 0, "PaymentSplitter: account has no shares");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/finance/PaymentSplitterUpgradeable.sol::174 => require(payment != 0, "PaymentSplitter: account is not due payment");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/finance/PaymentSplitterUpgradeable.sol::201 => require(account != address(0), "PaymentSplitter: account is the zero address");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/finance/PaymentSplitterUpgradeable.sol::203 => require(_shares[account] == 0, "PaymentSplitter: account already has shares");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/finance/VestingWalletUpgradeable.sol::5 => import "../token/ERC20/utils/SafeERC20Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/finance/VestingWalletUpgradeable.sol::8 => import "../utils/math/MathUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/finance/VestingWalletUpgradeable.sol::49 => require(beneficiaryAddress != address(0), "VestingWallet: beneficiary is zero address");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::6 => import "../token/ERC721/IERC721ReceiverUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::7 => import "../token/ERC1155/IERC1155ReceiverUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::8 => import "../utils/cryptography/ECDSAUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::9 => import "../utils/cryptography/draft-EIP712Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::10 => import "../utils/introspection/ERC165Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::11 => import "../utils/math/SafeCastUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::12 => import "../utils/structs/DoubleEndedQueueUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::35 => bytes32 public constant BALLOT_TYPEHASH = keccak256("Ballot(uint256 proposalId,uint8 support)");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::37 => keccak256("ExtendedBallot(uint256 proposalId,uint8 support,string reason,bytes params)");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::200 => * @dev Part of the Governor Bravo's interface: _"The number of votes required in order for a voter to become a proposer"_.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::259 => "Governor: proposer votes below proposal threshold"
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::264 => require(targets.length == values.length, "Governor: invalid proposal length");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::265 => require(targets.length == calldatas.length, "Governor: invalid proposal length");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::269 => require(proposal.voteStart.isUnset(), "Governor: proposal already exists");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::306 => "Governor: proposal not successful"
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::329 => string memory errorMessage = "Governor: call reverted without message";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::529 => require(state(proposalId) == ProposalState.Active, "Governor: vote not currently active");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/IGovernorUpgradeable.sol::6 => import "../utils/introspection/ERC165Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::6 => import "../access/AccessControlUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::7 => import "../token/ERC721/IERC721ReceiverUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::8 => import "../token/ERC1155/IERC1155ReceiverUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::253 => require(targets.length == values.length, "TimelockController: length mismatch");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::254 => require(targets.length == payloads.length, "TimelockController: length mismatch");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::267 => require(!isOperation(id), "TimelockController: operation already scheduled");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::268 => require(delay >= getMinDelay(), "TimelockController: insufficient delay");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::280 => require(isOperationPending(id), "TimelockController: operation cannot be cancelled");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::329 => require(targets.length == values.length, "TimelockController: length mismatch");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::330 => require(targets.length == payloads.length, "TimelockController: length mismatch");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::354 => require(success, "TimelockController: underlying transaction reverted");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::361 => require(isOperationReady(id), "TimelockController: operation is not ready");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::362 => require(predecessor == bytes32(0) || isOperationDone(predecessor), "TimelockController: missing dependency");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::369 => require(isOperationReady(id), "TimelockController: operation is not ready");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::384 => require(msg.sender == address(this), "TimelockController: caller must be timelock");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerWith46MigrationUpgradeable.sol::6 => import "./TimelockControllerUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerWith46MigrationUpgradeable.sol::43 => "TimelockController: already migrated"
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/compatibility/GovernorCompatibilityBravoUpgradeable.sol::6 => import "../../utils/CountersUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/compatibility/GovernorCompatibilityBravoUpgradeable.sol::7 => import "../../utils/math/SafeCastUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/compatibility/GovernorCompatibilityBravoUpgradeable.sol::8 => import "../extensions/IGovernorTimelockUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/compatibility/GovernorCompatibilityBravoUpgradeable.sol::10 => import "./IGovernorCompatibilityBravoUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/compatibility/GovernorCompatibilityBravoUpgradeable.sol::11 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/compatibility/GovernorCompatibilityBravoUpgradeable.sol::117 => "GovernorBravo: proposer above threshold"
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/compatibility/GovernorCompatibilityBravoUpgradeable.sol::280 => require(!receipt.hasVoted, "GovernorCompatibilityBravo: vote already cast");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/compatibility/GovernorCompatibilityBravoUpgradeable.sol::292 => revert("GovernorCompatibilityBravo: invalid vote type");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/compatibility/IGovernorCompatibilityBravoUpgradeable.sol::7 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/compatibility/IGovernorCompatibilityBravoUpgradeable.sol::57 => * @dev Part of the Governor Bravo's interface: _"The official record of all proposals ever proposed"_.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/compatibility/IGovernorCompatibilityBravoUpgradeable.sol::77 => * @dev Part of the Governor Bravo's interface: _"Function used to propose a new proposal"_.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/compatibility/IGovernorCompatibilityBravoUpgradeable.sol::88 => * @dev Part of the Governor Bravo's interface: _"Queues a proposal of state succeeded"_.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/compatibility/IGovernorCompatibilityBravoUpgradeable.sol::93 => * @dev Part of the Governor Bravo's interface: _"Executes a queued proposal if eta has passed"_.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/compatibility/IGovernorCompatibilityBravoUpgradeable.sol::117 => * @dev Part of the Governor Bravo's interface: _"Gets the receipt for a voter on a given proposal"_.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorCountingSimpleUpgradeable.sol::7 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorCountingSimpleUpgradeable.sol::100 => require(!proposalvote.hasVoted[account], "GovernorVotingSimple: vote already cast");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorCountingSimpleUpgradeable.sol::110 => revert("GovernorVotingSimple: invalid value for enum VoteType");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorPreventLateQuorumUpgradeable.sol::7 => import "../../utils/math/MathUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorPreventLateQuorumUpgradeable.sol::8 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorProposalThresholdUpgradeable.sol::7 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorSettingsUpgradeable.sol::7 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorSettingsUpgradeable.sol::109 => require(newVotingPeriod > 0, "GovernorSettings: voting period too low");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorTimelockCompoundUpgradeable.sol::6 => import "./IGovernorTimelockUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorTimelockCompoundUpgradeable.sol::8 => import "../../utils/math/SafeCastUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorTimelockCompoundUpgradeable.sol::9 => import "../../vendor/compound/ICompoundTimelockUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorTimelockCompoundUpgradeable.sol::10 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorTimelockCompoundUpgradeable.sol::104 => require(state(proposalId) == ProposalState.Succeeded, "Governor: proposal not successful");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorTimelockCompoundUpgradeable.sol::111 => "GovernorTimelockCompound: identical proposal action already queued"
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorTimelockCompoundUpgradeable.sol::132 => require(eta > 0, "GovernorTimelockCompound: proposal not yet queued");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorTimelockControlUpgradeable.sol::6 => import "./IGovernorTimelockUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorTimelockControlUpgradeable.sol::8 => import "../TimelockControllerUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorTimelockControlUpgradeable.sol::9 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorTimelockControlUpgradeable.sol::103 => require(state(proposalId) == ProposalState.Succeeded, "Governor: proposal not successful");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorVotesCompUpgradeable.sol::7 => import "../../token/ERC20/extensions/ERC20VotesCompUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorVotesCompUpgradeable.sol::8 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorVotesQuorumFractionUpgradeable.sol::7 => import "../../utils/CheckpointsUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorVotesQuorumFractionUpgradeable.sol::8 => import "../../utils/math/SafeCastUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorVotesQuorumFractionUpgradeable.sol::9 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorVotesQuorumFractionUpgradeable.sol::107 => "GovernorVotesQuorumFraction: quorumNumerator over quorumDenominator"
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorVotesUpgradeable.sol::8 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/IGovernorTimelockUpgradeable.sol::7 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/utils/VotesUpgradeable.sol::5 => import "../../utils/ContextUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/utils/VotesUpgradeable.sol::6 => import "../../utils/CountersUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/utils/VotesUpgradeable.sol::7 => import "../../utils/CheckpointsUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/utils/VotesUpgradeable.sol::8 => import "../../utils/cryptography/draft-EIP712Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/utils/VotesUpgradeable.sol::10 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/utils/VotesUpgradeable.sol::42 => keccak256("Delegation(address delegatee,uint256 nonce,uint256 expiry)");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1155MetadataURIUpgradeable.sol::6 => import "../token/ERC1155/extensions/IERC1155MetadataURIUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1155ReceiverUpgradeable.sol::6 => import "../token/ERC1155/IERC1155ReceiverUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1155Upgradeable.sol::6 => import "../token/ERC1155/IERC1155Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1363ReceiverUpgradeable.sol::9 => * 0x88a7ca5c === bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1363ReceiverUpgradeable.sol::23 => * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1363SpenderUpgradeable.sol::9 => * 0x7b04a2d0 === bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1363SpenderUpgradeable.sol::22 => * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC165Upgradeable.sol::6 => import "../utils/introspection/IERC165Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1820ImplementerUpgradeable.sol::6 => import "../utils/introspection/IERC1820ImplementerUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1820RegistryUpgradeable.sol::6 => import "../utils/introspection/IERC1820RegistryUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC20MetadataUpgradeable.sol::6 => import "../token/ERC20/extensions/IERC20MetadataUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC20Upgradeable.sol::6 => import "../token/ERC20/IERC20Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC2981Upgradeable.sol::6 => import "../utils/introspection/IERC165Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC3156FlashBorrowerUpgradeable.sol::20 => * @return The keccak256 hash of "IERC3156FlashBorrower.onFlashLoan"
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC3156FlashLenderUpgradeable.sol::6 => import "./IERC3156FlashBorrowerUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC3156Upgradeable.sol::6 => import "./IERC3156FlashBorrowerUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC3156Upgradeable.sol::7 => import "./IERC3156FlashLenderUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC4626Upgradeable.sol::6 => import "../token/ERC20/IERC20Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC4626Upgradeable.sol::7 => import "../token/ERC20/extensions/IERC20MetadataUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC721EnumerableUpgradeable.sol::6 => import "../token/ERC721/extensions/IERC721EnumerableUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC721MetadataUpgradeable.sol::6 => import "../token/ERC721/extensions/IERC721MetadataUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC721ReceiverUpgradeable.sol::6 => import "../token/ERC721/IERC721ReceiverUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC721Upgradeable.sol::6 => import "../token/ERC721/IERC721Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC777RecipientUpgradeable.sol::6 => import "../token/ERC777/IERC777RecipientUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC777SenderUpgradeable.sol::6 => import "../token/ERC777/IERC777SenderUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC777Upgradeable.sol::6 => import "../token/ERC777/IERC777Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/draft-IERC2612Upgradeable.sol::6 => import "../token/ERC20/extensions/draft-IERC20PermitUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/metatx/MinimalForwarderUpgradeable.sol::6 => import "../utils/cryptography/ECDSAUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/metatx/MinimalForwarderUpgradeable.sol::7 => import "../utils/cryptography/draft-EIP712Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/metatx/MinimalForwarderUpgradeable.sol::31 => keccak256("ForwardRequest(address from,address to,uint256 value,uint256 gas,uint256 nonce,bytes data)");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/metatx/MinimalForwarderUpgradeable.sol::57 => require(verify(req, signature), "MinimalForwarder: signature does not match request");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol::7 => import "../../interfaces/draft-IERC1822Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol::8 => import "../../utils/AddressUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol::9 => import "../../utils/StorageSlotUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol::52 => require(AddressUpgradeable.isContract(newImplementation), "ERC1967: new implementation is not a contract");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol::99 => require(slot == _IMPLEMENTATION_SLOT, "ERC1967Upgrade: unsupported proxiableUUID");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol::101 => revert("ERC1967Upgrade: new implementation is not UUPS");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol::130 => require(newAdmin != address(0), "ERC1967: new admin is the zero address");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol::166 => require(AddressUpgradeable.isContract(newBeacon), "ERC1967: new beacon is not a contract");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol::169 => "ERC1967: beacon implementation is not a contract"
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol::199 => require(AddressUpgradeable.isContract(target), "Address: delegate call to non-contract");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol::203 => return AddressUpgradeable.verifyCallResult(success, returndata, "Address: low-level delegate call failed");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol::6 => import "../../utils/AddressUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol::82 => "Initializable: contract is already initialized"
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol::108 => require(!_initializing && _initialized < version, "Initializable: contract is already initialized");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol::121 => require(_initializing, "Initializable: contract is not initializing");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol::132 => require(!_initializing, "Initializable: contract is initializing");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol::6 => import "../../interfaces/draft-IERC1822Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol::7 => import "../ERC1967/ERC1967UpgradeUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol::39 => require(address(this) != __self, "Function must be called through delegatecall");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol::40 => require(_getImplementation() == __self, "Function must be called through active proxy");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol::49 => require(address(this) == __self, "UUPSUpgradeable: must not be called through delegatecall");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/security/PullPaymentUpgradeable.sol::6 => import "../utils/escrow/EscrowUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::7 => import "./IERC1155ReceiverUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::8 => import "./extensions/IERC1155MetadataURIUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::9 => import "../../utils/AddressUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::10 => import "../../utils/ContextUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::11 => import "../../utils/introspection/ERC165Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::12 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::76 => require(account != address(0), "ERC1155: address zero is not a valid owner");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::94 => require(accounts.length == ids.length, "ERC1155: accounts and ids length mismatch");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::131 => "ERC1155: caller is not token owner nor approved"
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::148 => "ERC1155: caller is not token owner nor approved"
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::172 => require(to != address(0), "ERC1155: transfer to the zero address");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::181 => require(fromBalance >= amount, "ERC1155: insufficient balance for transfer");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::211 => require(ids.length == amounts.length, "ERC1155: ids and amounts length mismatch");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::212 => require(to != address(0), "ERC1155: transfer to the zero address");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::223 => require(fromBalance >= amount, "ERC1155: insufficient balance for transfer");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::277 => require(to != address(0), "ERC1155: mint to the zero address");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::310 => require(to != address(0), "ERC1155: mint to the zero address");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::311 => require(ids.length == amounts.length, "ERC1155: ids and amounts length mismatch");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::343 => require(from != address(0), "ERC1155: burn from the zero address");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::352 => require(fromBalance >= amount, "ERC1155: burn amount exceeds balance");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::376 => require(from != address(0), "ERC1155: burn from the zero address");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::377 => require(ids.length == amounts.length, "ERC1155: ids and amounts length mismatch");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::388 => require(fromBalance >= amount, "ERC1155: burn amount exceeds balance");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::409 => require(owner != operator, "ERC1155: setting approval status for self");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::483 => revert("ERC1155: ERC1155Receiver rejected tokens");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::488 => revert("ERC1155: transfer to non ERC1155Receiver implementer");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::506 => revert("ERC1155: ERC1155Receiver rejected tokens");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::511 => revert("ERC1155: transfer to non ERC1155Receiver implementer");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol::6 => import "../../utils/introspection/IERC165Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol::17 => * `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))`
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol::25 => * @return `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))` if transfer is allowed
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol::41 => * `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))`
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol::49 => * @return `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))` if transfer is allowed
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol::6 => import "../../utils/introspection/IERC165Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol::7 => import "../../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol::28 => "ERC1155: caller is not token owner nor approved"
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol::41 => "ERC1155: caller is not token owner nor approved"
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155PausableUpgradeable.sol::7 => import "../../../security/PausableUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155PausableUpgradeable.sol::8 => import "../../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155PausableUpgradeable.sol::43 => require(!paused(), "ERC1155Pausable: token transfer while paused");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol::7 => import "../../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol::63 => require(supply >= amount, "ERC1155: burn amount exceeds totalSupply");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155URIStorageUpgradeable.sol::6 => import "../../../utils/StringsUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155URIStorageUpgradeable.sol::8 => import "../../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/presets/ERC1155PresetMinterPauserUpgradeable.sol::7 => import "../extensions/ERC1155BurnableUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/presets/ERC1155PresetMinterPauserUpgradeable.sol::8 => import "../extensions/ERC1155PausableUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/presets/ERC1155PresetMinterPauserUpgradeable.sol::9 => import "../../../access/AccessControlEnumerableUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/presets/ERC1155PresetMinterPauserUpgradeable.sol::10 => import "../../../utils/ContextUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/presets/ERC1155PresetMinterPauserUpgradeable.sol::11 => import "../../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/presets/ERC1155PresetMinterPauserUpgradeable.sol::68 => require(hasRole(MINTER_ROLE, _msgSender()), "ERC1155PresetMinterPauser: must have minter role to mint");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/presets/ERC1155PresetMinterPauserUpgradeable.sol::82 => require(hasRole(MINTER_ROLE, _msgSender()), "ERC1155PresetMinterPauser: must have minter role to mint");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/presets/ERC1155PresetMinterPauserUpgradeable.sol::97 => require(hasRole(PAUSER_ROLE, _msgSender()), "ERC1155PresetMinterPauser: must have pauser role to pause");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/presets/ERC1155PresetMinterPauserUpgradeable.sol::111 => require(hasRole(PAUSER_ROLE, _msgSender()), "ERC1155PresetMinterPauser: must have pauser role to unpause");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155HolderUpgradeable.sol::7 => import "../../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155ReceiverUpgradeable.sol::6 => import "../IERC1155ReceiverUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155ReceiverUpgradeable.sol::7 => import "../../../utils/introspection/ERC165Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155ReceiverUpgradeable.sol::8 => import "../../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol::7 => import "./extensions/IERC20MetadataUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol::8 => import "../../utils/ContextUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol::9 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol::209 => require(currentAllowance >= subtractedValue, "ERC20: decreased allowance below zero");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol::236 => require(from != address(0), "ERC20: transfer from the zero address");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol::237 => require(to != address(0), "ERC20: transfer to the zero address");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol::242 => require(fromBalance >= amount, "ERC20: transfer amount exceeds balance");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol::286 => require(account != address(0), "ERC20: burn from the zero address");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol::291 => require(accountBalance >= amount, "ERC20: burn amount exceeds balance");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol::320 => require(owner != address(0), "ERC20: approve from the zero address");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol::321 => require(spender != address(0), "ERC20: approve to the zero address");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol::7 => import "../../../utils/ContextUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol::8 => import "../../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20CappedUpgradeable.sol::7 => import "../../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20FlashMintUpgradeable.sol::6 => import "../../../interfaces/IERC3156FlashBorrowerUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20FlashMintUpgradeable.sol::7 => import "../../../interfaces/IERC3156FlashLenderUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20FlashMintUpgradeable.sol::9 => import "../../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20FlashMintUpgradeable.sol::85 => require(amount <= maxFlashLoan(token), "ERC20FlashMint: amount exceeds maxFlashLoan");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20FlashMintUpgradeable.sol::90 => "ERC20FlashMint: invalid return value"
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PausableUpgradeable.sol::7 => import "../../../security/PausableUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PausableUpgradeable.sol::8 => import "../../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PausableUpgradeable.sol::38 => require(!paused(), "ERC20Pausable: token transfer while paused");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20SnapshotUpgradeable.sol::7 => import "../../../utils/ArraysUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20SnapshotUpgradeable.sol::8 => import "../../../utils/CountersUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20SnapshotUpgradeable.sol::9 => import "../../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesCompUpgradeable.sol::7 => import "../../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesUpgradeable.sol::6 => import "./draft-ERC20PermitUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesUpgradeable.sol::7 => import "../../../utils/math/MathUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesUpgradeable.sol::8 => import "../../../governance/utils/IVotesUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesUpgradeable.sol::9 => import "../../../utils/math/SafeCastUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesUpgradeable.sol::10 => import "../../../utils/cryptography/ECDSAUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesUpgradeable.sol::11 => import "../../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesUpgradeable.sol::40 => keccak256("Delegation(address delegatee,uint256 nonce,uint256 expiry)");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesUpgradeable.sol::170 => require(totalSupply() <= _maxSupply(), "ERC20Votes: total supply risks overflowing votes");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20WrapperUpgradeable.sol::7 => import "../utils/SafeERC20Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20WrapperUpgradeable.sol::8 => import "../../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20WrapperUpgradeable.sol::13 => * Users can deposit and withdraw "underlying tokens" and receive a matching number of "wrapped tokens". This is useful
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC4626Upgradeable.sol::7 => import "../utils/SafeERC20Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC4626Upgradeable.sol::8 => import "../../../interfaces/IERC4626Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC4626Upgradeable.sol::9 => import "../../../utils/math/MathUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC4626Upgradeable.sol::10 => import "../../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/draft-ERC20PermitUpgradeable.sol::6 => import "./draft-IERC20PermitUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/draft-ERC20PermitUpgradeable.sol::8 => import "../../../utils/cryptography/draft-EIP712Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/draft-ERC20PermitUpgradeable.sol::9 => import "../../../utils/cryptography/ECDSAUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/draft-ERC20PermitUpgradeable.sol::10 => import "../../../utils/CountersUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/draft-ERC20PermitUpgradeable.sol::11 => import "../../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/draft-ERC20PermitUpgradeable.sol::32 => keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetFixedSupplyUpgradeable.sol::5 => import "../extensions/ERC20BurnableUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetFixedSupplyUpgradeable.sol::6 => import "../../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetMinterPauserUpgradeable.sol::7 => import "../extensions/ERC20BurnableUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetMinterPauserUpgradeable.sol::8 => import "../extensions/ERC20PausableUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetMinterPauserUpgradeable.sol::9 => import "../../../access/AccessControlEnumerableUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetMinterPauserUpgradeable.sol::10 => import "../../../utils/ContextUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetMinterPauserUpgradeable.sol::11 => import "../../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetMinterPauserUpgradeable.sol::65 => require(hasRole(MINTER_ROLE, _msgSender()), "ERC20PresetMinterPauser: must have minter role to mint");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetMinterPauserUpgradeable.sol::79 => require(hasRole(PAUSER_ROLE, _msgSender()), "ERC20PresetMinterPauser: must have pauser role to pause");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetMinterPauserUpgradeable.sol::93 => require(hasRole(PAUSER_ROLE, _msgSender()), "ERC20PresetMinterPauser: must have pauser role to unpause");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol::7 => import "../extensions/draft-IERC20PermitUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol::8 => import "../../../utils/AddressUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol::56 => "SafeERC20: approve from non-zero to non-zero allowance"
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol::77 => require(oldAllowance >= value, "SafeERC20: decreased allowance below zero");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol::96 => require(nonceAfter == nonceBefore + 1, "SafeERC20: permit did not succeed");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol::113 => require(abi.decode(returndata, (bool)), "SafeERC20: ERC20 operation did not succeed");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/utils/TokenTimelockUpgradeable.sol::7 => import "../../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/utils/TokenTimelockUpgradeable.sol::48 => require(releaseTime_ > block.timestamp, "TokenTimelock: release time is before current time");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/utils/TokenTimelockUpgradeable.sol::80 => require(block.timestamp >= releaseTime(), "TokenTimelock: current time is before release time");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/utils/TokenTimelockUpgradeable.sol::83 => require(amount > 0, "TokenTimelock: no tokens to release");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol::8 => import "./extensions/IERC721MetadataUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol::9 => import "../../utils/AddressUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol::10 => import "../../utils/ContextUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol::11 => import "../../utils/StringsUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol::12 => import "../../utils/introspection/ERC165Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol::13 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol::68 => require(owner != address(0), "ERC721: address zero is not a valid owner");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol::119 => require(to != owner, "ERC721: approval to current owner");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol::123 => "ERC721: approve caller is not token owner nor approved for all"
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol::161 => require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner nor approved");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol::186 => require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner nor approved");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol::215 => require(_checkOnERC721Received(from, to, tokenId, data), "ERC721: transfer to non ERC721Receiver implementer");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol::268 => "ERC721: transfer to non ERC721Receiver implementer"
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol::340 => require(ERC721Upgradeable.ownerOf(tokenId) == from, "ERC721: transfer from incorrect owner");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol::341 => require(to != address(0), "ERC721: transfer to the zero address");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol::410 => revert("ERC721: transfer to non ERC721Receiver implementer");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol::6 => import "../../utils/introspection/IERC165Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol::7 => import "../../../utils/ContextUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol::8 => import "../../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol::29 => require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner nor approved");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol::7 => import "./IERC721EnumerableUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol::8 => import "../../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol::44 => require(index < ERC721Upgradeable.balanceOf(owner), "ERC721Enumerable: owner index out of bounds");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol::59 => require(index < ERC721EnumerableUpgradeable.totalSupply(), "ERC721Enumerable: global index out of bounds");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol::7 => import "../../../security/PausableUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol::8 => import "../../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol::38 => require(!paused(), "ERC721Pausable: token transfer while paused");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721RoyaltyUpgradeable.sol::7 => import "../../common/ERC2981Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721RoyaltyUpgradeable.sol::8 => import "../../../utils/introspection/ERC165Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721RoyaltyUpgradeable.sol::9 => import "../../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol::7 => import "../../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol::52 => require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/draft-ERC721VotesUpgradeable.sol::7 => import "../../../governance/utils/VotesUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/draft-ERC721VotesUpgradeable.sol::8 => import "../../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/presets/ERC721PresetMinterPauserAutoIdUpgradeable.sol::7 => import "../extensions/ERC721EnumerableUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/presets/ERC721PresetMinterPauserAutoIdUpgradeable.sol::8 => import "../extensions/ERC721BurnableUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/presets/ERC721PresetMinterPauserAutoIdUpgradeable.sol::9 => import "../extensions/ERC721PausableUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/presets/ERC721PresetMinterPauserAutoIdUpgradeable.sol::10 => import "../../../access/AccessControlEnumerableUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/presets/ERC721PresetMinterPauserAutoIdUpgradeable.sol::11 => import "../../../utils/ContextUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/presets/ERC721PresetMinterPauserAutoIdUpgradeable.sol::12 => import "../../../utils/CountersUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/presets/ERC721PresetMinterPauserAutoIdUpgradeable.sol::13 => import "../../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/presets/ERC721PresetMinterPauserAutoIdUpgradeable.sol::101 => require(hasRole(MINTER_ROLE, _msgSender()), "ERC721PresetMinterPauserAutoId: must have minter role to mint");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/presets/ERC721PresetMinterPauserAutoIdUpgradeable.sol::119 => require(hasRole(PAUSER_ROLE, _msgSender()), "ERC721PresetMinterPauserAutoId: must have pauser role to pause");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/presets/ERC721PresetMinterPauserAutoIdUpgradeable.sol::133 => require(hasRole(PAUSER_ROLE, _msgSender()), "ERC721PresetMinterPauserAutoId: must have pauser role to unpause");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/utils/ERC721HolderUpgradeable.sol::6 => import "../IERC721ReceiverUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/utils/ERC721HolderUpgradeable.sol::7 => import "../../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/ERC777Upgradeable.sol::7 => import "./IERC777RecipientUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/ERC777Upgradeable.sol::10 => import "../../utils/AddressUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/ERC777Upgradeable.sol::11 => import "../../utils/ContextUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/ERC777Upgradeable.sol::12 => import "../../utils/introspection/IERC1820RegistryUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/ERC777Upgradeable.sol::13 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/ERC777Upgradeable.sol::183 => require(_msgSender() != operator, "ERC777: authorizing self as operator");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/ERC777Upgradeable.sol::198 => require(operator != _msgSender(), "ERC777: revoking self as operator");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/ERC777Upgradeable.sol::228 => require(isOperatorFor(_msgSender(), sender), "ERC777: caller is not an operator for holder");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/ERC777Upgradeable.sol::243 => require(isOperatorFor(_msgSender(), account), "ERC777: caller is not an operator for holder");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/ERC777Upgradeable.sol::380 => require(from != address(0), "ERC777: transfer from the zero address");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/ERC777Upgradeable.sol::381 => require(to != address(0), "ERC777: transfer to the zero address");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/ERC777Upgradeable.sol::405 => require(from != address(0), "ERC777: burn from the zero address");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/ERC777Upgradeable.sol::415 => require(fromBalance >= amount, "ERC777: burn amount exceeds balance");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/ERC777Upgradeable.sol::436 => require(fromBalance >= amount, "ERC777: transfer amount exceeds balance");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/ERC777Upgradeable.sol::456 => require(holder != address(0), "ERC777: approve from the zero address");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/ERC777Upgradeable.sol::457 => require(spender != address(0), "ERC777: approve to the zero address");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/ERC777Upgradeable.sol::510 => require(!to.isContract(), "ERC777: token recipient contract has no implementer for ERC777TokensRecipient");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/presets/ERC777PresetFixedSupplyUpgradeable.sol::6 => import "../../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/common/ERC2981Upgradeable.sol::6 => import "../../interfaces/IERC2981Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/common/ERC2981Upgradeable.sol::7 => import "../../utils/introspection/ERC165Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/common/ERC2981Upgradeable.sol::8 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/common/ERC2981Upgradeable.sol::79 => require(feeNumerator <= _feeDenominator(), "ERC2981: royalty fee will exceed salePrice");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/common/ERC2981Upgradeable.sol::105 => require(feeNumerator <= _feeDenominator(), "ERC2981: royalty fee will exceed salePrice");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol::64 => require(success, "Address: unable to send value, recipient may have reverted");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol::119 => return functionCallWithValue(target, data, value, "Address: low-level call with value failed");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol::134 => require(address(this).balance >= value, "Address: insufficient balance for call");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol::148 => return functionStaticCall(target, data, "Address: low-level static call failed");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol::162 => require(isContract(target), "Address: static call to non-contract");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/Base64Upgradeable.sol::15 => string internal constant _TABLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/MulticallUpgradeable.sol::38 => require(AddressUpgradeable.isContract(target), "Address: delegate call to non-contract");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/MulticallUpgradeable.sol::42 => return AddressUpgradeable.verifyCallResult(success, returndata, "Address: low-level delegate call failed");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/StorageSlotUpgradeable.sol::24 => *         require(Address.isContract(newImplementation), "ERC1967: new implementation is not a contract");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol::31 => revert("ECDSA: invalid signature 's' value");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol::33 => revert("ECDSA: invalid signature 'v' value");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/SignatureCheckerUpgradeable.sol::8 => import "../../interfaces/IERC1271Upgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol::7 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol::34 => bytes32 private constant _TYPE_HASH = keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/escrow/ConditionalEscrowUpgradeable.sol::7 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/escrow/ConditionalEscrowUpgradeable.sol::29 => require(withdrawalAllowed(payee), "ConditionalEscrow: payee is not allowed to withdraw");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/escrow/EscrowUpgradeable.sol::6 => import "../../access/OwnableUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/escrow/EscrowUpgradeable.sol::8 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/escrow/RefundEscrowUpgradeable.sol::6 => import "./ConditionalEscrowUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/escrow/RefundEscrowUpgradeable.sol::7 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/escrow/RefundEscrowUpgradeable.sol::44 => require(beneficiary_ != address(0), "RefundEscrow: beneficiary is the zero address");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/escrow/RefundEscrowUpgradeable.sol::68 => require(state() == State.Active, "RefundEscrow: can only deposit while active");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/escrow/RefundEscrowUpgradeable.sol::77 => require(state() == State.Active, "RefundEscrow: can only close while active");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/escrow/RefundEscrowUpgradeable.sol::86 => require(state() == State.Active, "RefundEscrow: can only enable refunds while active");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/escrow/RefundEscrowUpgradeable.sol::95 => require(state() == State.Closed, "RefundEscrow: beneficiary can only withdraw while closed");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165StorageUpgradeable.sol::7 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol::7 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC1820ImplementerUpgradeable.sol::6 => import "./IERC1820ImplementerUpgradeable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC1820ImplementerUpgradeable.sol::7 => import "../../proxy/utils/Initializable.sol";
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::35 => require(value <= type(uint248).max, "SafeCast: value doesn't fit in 248 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::52 => require(value <= type(uint240).max, "SafeCast: value doesn't fit in 240 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::69 => require(value <= type(uint232).max, "SafeCast: value doesn't fit in 232 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::86 => require(value <= type(uint224).max, "SafeCast: value doesn't fit in 224 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::103 => require(value <= type(uint216).max, "SafeCast: value doesn't fit in 216 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::120 => require(value <= type(uint208).max, "SafeCast: value doesn't fit in 208 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::137 => require(value <= type(uint200).max, "SafeCast: value doesn't fit in 200 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::154 => require(value <= type(uint192).max, "SafeCast: value doesn't fit in 192 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::171 => require(value <= type(uint184).max, "SafeCast: value doesn't fit in 184 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::188 => require(value <= type(uint176).max, "SafeCast: value doesn't fit in 176 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::205 => require(value <= type(uint168).max, "SafeCast: value doesn't fit in 168 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::222 => require(value <= type(uint160).max, "SafeCast: value doesn't fit in 160 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::239 => require(value <= type(uint152).max, "SafeCast: value doesn't fit in 152 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::256 => require(value <= type(uint144).max, "SafeCast: value doesn't fit in 144 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::273 => require(value <= type(uint136).max, "SafeCast: value doesn't fit in 136 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::290 => require(value <= type(uint128).max, "SafeCast: value doesn't fit in 128 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::307 => require(value <= type(uint120).max, "SafeCast: value doesn't fit in 120 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::324 => require(value <= type(uint112).max, "SafeCast: value doesn't fit in 112 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::341 => require(value <= type(uint104).max, "SafeCast: value doesn't fit in 104 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::358 => require(value <= type(uint96).max, "SafeCast: value doesn't fit in 96 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::375 => require(value <= type(uint88).max, "SafeCast: value doesn't fit in 88 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::392 => require(value <= type(uint80).max, "SafeCast: value doesn't fit in 80 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::409 => require(value <= type(uint72).max, "SafeCast: value doesn't fit in 72 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::426 => require(value <= type(uint64).max, "SafeCast: value doesn't fit in 64 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::443 => require(value <= type(uint56).max, "SafeCast: value doesn't fit in 56 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::460 => require(value <= type(uint48).max, "SafeCast: value doesn't fit in 48 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::477 => require(value <= type(uint40).max, "SafeCast: value doesn't fit in 40 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::494 => require(value <= type(uint32).max, "SafeCast: value doesn't fit in 32 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::511 => require(value <= type(uint24).max, "SafeCast: value doesn't fit in 24 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::528 => require(value <= type(uint16).max, "SafeCast: value doesn't fit in 16 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::545 => require(value <= type(uint8).max, "SafeCast: value doesn't fit in 8 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::577 => require(value >= type(int248).min && value <= type(int248).max, "SafeCast: value doesn't fit in 248 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::595 => require(value >= type(int240).min && value <= type(int240).max, "SafeCast: value doesn't fit in 240 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::613 => require(value >= type(int232).min && value <= type(int232).max, "SafeCast: value doesn't fit in 232 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::631 => require(value >= type(int224).min && value <= type(int224).max, "SafeCast: value doesn't fit in 224 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::649 => require(value >= type(int216).min && value <= type(int216).max, "SafeCast: value doesn't fit in 216 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::667 => require(value >= type(int208).min && value <= type(int208).max, "SafeCast: value doesn't fit in 208 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::685 => require(value >= type(int200).min && value <= type(int200).max, "SafeCast: value doesn't fit in 200 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::703 => require(value >= type(int192).min && value <= type(int192).max, "SafeCast: value doesn't fit in 192 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::721 => require(value >= type(int184).min && value <= type(int184).max, "SafeCast: value doesn't fit in 184 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::739 => require(value >= type(int176).min && value <= type(int176).max, "SafeCast: value doesn't fit in 176 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::757 => require(value >= type(int168).min && value <= type(int168).max, "SafeCast: value doesn't fit in 168 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::775 => require(value >= type(int160).min && value <= type(int160).max, "SafeCast: value doesn't fit in 160 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::793 => require(value >= type(int152).min && value <= type(int152).max, "SafeCast: value doesn't fit in 152 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::811 => require(value >= type(int144).min && value <= type(int144).max, "SafeCast: value doesn't fit in 144 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::829 => require(value >= type(int136).min && value <= type(int136).max, "SafeCast: value doesn't fit in 136 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::847 => require(value >= type(int128).min && value <= type(int128).max, "SafeCast: value doesn't fit in 128 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::865 => require(value >= type(int120).min && value <= type(int120).max, "SafeCast: value doesn't fit in 120 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::883 => require(value >= type(int112).min && value <= type(int112).max, "SafeCast: value doesn't fit in 112 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::901 => require(value >= type(int104).min && value <= type(int104).max, "SafeCast: value doesn't fit in 104 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::919 => require(value >= type(int96).min && value <= type(int96).max, "SafeCast: value doesn't fit in 96 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::937 => require(value >= type(int88).min && value <= type(int88).max, "SafeCast: value doesn't fit in 88 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::955 => require(value >= type(int80).min && value <= type(int80).max, "SafeCast: value doesn't fit in 80 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::973 => require(value >= type(int72).min && value <= type(int72).max, "SafeCast: value doesn't fit in 72 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::991 => require(value >= type(int64).min && value <= type(int64).max, "SafeCast: value doesn't fit in 64 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::1009 => require(value >= type(int56).min && value <= type(int56).max, "SafeCast: value doesn't fit in 56 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::1027 => require(value >= type(int48).min && value <= type(int48).max, "SafeCast: value doesn't fit in 48 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::1045 => require(value >= type(int40).min && value <= type(int40).max, "SafeCast: value doesn't fit in 40 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::1063 => require(value >= type(int32).min && value <= type(int32).max, "SafeCast: value doesn't fit in 32 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::1081 => require(value >= type(int24).min && value <= type(int24).max, "SafeCast: value doesn't fit in 24 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::1099 => require(value >= type(int16).min && value <= type(int16).max, "SafeCast: value doesn't fit in 16 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::1117 => require(value >= type(int8).min && value <= type(int8).max, "SafeCast: value doesn't fit in 8 bits");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::1132 => require(value <= uint256(type(int256).max), "SafeCast: value doesn't fit in an int256");
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/vendor/arbitrum/IInboxUpgradeable.sol::22 => import "./IMessageProviderUpgradeable.sol";
../../contracts/node_modules/eth-gas-reporter/mock/test/TestMetacoin.sol::14 => Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
../../contracts/node_modules/eth-gas-reporter/mock/test/TestMetacoin.sol::22 => Assert.equal(meta.getBalance(tx.origin), expected, "Owner should have 10000 MetaCoin initially");
../../contracts/node_modules/hardhat/console.sol::509 => _sendLogPayload(abi.encodeWithSignature("log(uint256,uint256,uint256,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::513 => _sendLogPayload(abi.encodeWithSignature("log(uint256,uint256,uint256,string)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::517 => _sendLogPayload(abi.encodeWithSignature("log(uint256,uint256,uint256,bool)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::521 => _sendLogPayload(abi.encodeWithSignature("log(uint256,uint256,uint256,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::525 => _sendLogPayload(abi.encodeWithSignature("log(uint256,uint256,string,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::529 => _sendLogPayload(abi.encodeWithSignature("log(uint256,uint256,string,string)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::537 => _sendLogPayload(abi.encodeWithSignature("log(uint256,uint256,string,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::541 => _sendLogPayload(abi.encodeWithSignature("log(uint256,uint256,bool,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::553 => _sendLogPayload(abi.encodeWithSignature("log(uint256,uint256,bool,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::557 => _sendLogPayload(abi.encodeWithSignature("log(uint256,uint256,address,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::561 => _sendLogPayload(abi.encodeWithSignature("log(uint256,uint256,address,string)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::565 => _sendLogPayload(abi.encodeWithSignature("log(uint256,uint256,address,bool)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::569 => _sendLogPayload(abi.encodeWithSignature("log(uint256,uint256,address,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::573 => _sendLogPayload(abi.encodeWithSignature("log(uint256,string,uint256,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::577 => _sendLogPayload(abi.encodeWithSignature("log(uint256,string,uint256,string)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::585 => _sendLogPayload(abi.encodeWithSignature("log(uint256,string,uint256,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::589 => _sendLogPayload(abi.encodeWithSignature("log(uint256,string,string,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::593 => _sendLogPayload(abi.encodeWithSignature("log(uint256,string,string,string)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::601 => _sendLogPayload(abi.encodeWithSignature("log(uint256,string,string,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::621 => _sendLogPayload(abi.encodeWithSignature("log(uint256,string,address,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::625 => _sendLogPayload(abi.encodeWithSignature("log(uint256,string,address,string)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::633 => _sendLogPayload(abi.encodeWithSignature("log(uint256,string,address,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::637 => _sendLogPayload(abi.encodeWithSignature("log(uint256,bool,uint256,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::649 => _sendLogPayload(abi.encodeWithSignature("log(uint256,bool,uint256,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::685 => _sendLogPayload(abi.encodeWithSignature("log(uint256,bool,address,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::697 => _sendLogPayload(abi.encodeWithSignature("log(uint256,bool,address,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::701 => _sendLogPayload(abi.encodeWithSignature("log(uint256,address,uint256,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::705 => _sendLogPayload(abi.encodeWithSignature("log(uint256,address,uint256,string)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::709 => _sendLogPayload(abi.encodeWithSignature("log(uint256,address,uint256,bool)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::713 => _sendLogPayload(abi.encodeWithSignature("log(uint256,address,uint256,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::717 => _sendLogPayload(abi.encodeWithSignature("log(uint256,address,string,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::721 => _sendLogPayload(abi.encodeWithSignature("log(uint256,address,string,string)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::729 => _sendLogPayload(abi.encodeWithSignature("log(uint256,address,string,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::733 => _sendLogPayload(abi.encodeWithSignature("log(uint256,address,bool,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::745 => _sendLogPayload(abi.encodeWithSignature("log(uint256,address,bool,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::749 => _sendLogPayload(abi.encodeWithSignature("log(uint256,address,address,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::753 => _sendLogPayload(abi.encodeWithSignature("log(uint256,address,address,string)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::757 => _sendLogPayload(abi.encodeWithSignature("log(uint256,address,address,bool)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::761 => _sendLogPayload(abi.encodeWithSignature("log(uint256,address,address,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::765 => _sendLogPayload(abi.encodeWithSignature("log(string,uint256,uint256,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::769 => _sendLogPayload(abi.encodeWithSignature("log(string,uint256,uint256,string)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::777 => _sendLogPayload(abi.encodeWithSignature("log(string,uint256,uint256,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::781 => _sendLogPayload(abi.encodeWithSignature("log(string,uint256,string,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::785 => _sendLogPayload(abi.encodeWithSignature("log(string,uint256,string,string)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::793 => _sendLogPayload(abi.encodeWithSignature("log(string,uint256,string,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::813 => _sendLogPayload(abi.encodeWithSignature("log(string,uint256,address,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::817 => _sendLogPayload(abi.encodeWithSignature("log(string,uint256,address,string)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::825 => _sendLogPayload(abi.encodeWithSignature("log(string,uint256,address,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::829 => _sendLogPayload(abi.encodeWithSignature("log(string,string,uint256,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::833 => _sendLogPayload(abi.encodeWithSignature("log(string,string,uint256,string)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::841 => _sendLogPayload(abi.encodeWithSignature("log(string,string,uint256,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::845 => _sendLogPayload(abi.encodeWithSignature("log(string,string,string,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::857 => _sendLogPayload(abi.encodeWithSignature("log(string,string,string,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::877 => _sendLogPayload(abi.encodeWithSignature("log(string,string,address,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::881 => _sendLogPayload(abi.encodeWithSignature("log(string,string,address,string)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::889 => _sendLogPayload(abi.encodeWithSignature("log(string,string,address,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::957 => _sendLogPayload(abi.encodeWithSignature("log(string,address,uint256,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::961 => _sendLogPayload(abi.encodeWithSignature("log(string,address,uint256,string)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::969 => _sendLogPayload(abi.encodeWithSignature("log(string,address,uint256,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::973 => _sendLogPayload(abi.encodeWithSignature("log(string,address,string,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::977 => _sendLogPayload(abi.encodeWithSignature("log(string,address,string,string)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::985 => _sendLogPayload(abi.encodeWithSignature("log(string,address,string,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1005 => _sendLogPayload(abi.encodeWithSignature("log(string,address,address,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1009 => _sendLogPayload(abi.encodeWithSignature("log(string,address,address,string)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1017 => _sendLogPayload(abi.encodeWithSignature("log(string,address,address,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1021 => _sendLogPayload(abi.encodeWithSignature("log(bool,uint256,uint256,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1033 => _sendLogPayload(abi.encodeWithSignature("log(bool,uint256,uint256,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1069 => _sendLogPayload(abi.encodeWithSignature("log(bool,uint256,address,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1081 => _sendLogPayload(abi.encodeWithSignature("log(bool,uint256,address,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1213 => _sendLogPayload(abi.encodeWithSignature("log(bool,address,uint256,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1225 => _sendLogPayload(abi.encodeWithSignature("log(bool,address,uint256,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1261 => _sendLogPayload(abi.encodeWithSignature("log(bool,address,address,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1273 => _sendLogPayload(abi.encodeWithSignature("log(bool,address,address,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1277 => _sendLogPayload(abi.encodeWithSignature("log(address,uint256,uint256,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1281 => _sendLogPayload(abi.encodeWithSignature("log(address,uint256,uint256,string)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1285 => _sendLogPayload(abi.encodeWithSignature("log(address,uint256,uint256,bool)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1289 => _sendLogPayload(abi.encodeWithSignature("log(address,uint256,uint256,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1293 => _sendLogPayload(abi.encodeWithSignature("log(address,uint256,string,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1297 => _sendLogPayload(abi.encodeWithSignature("log(address,uint256,string,string)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1305 => _sendLogPayload(abi.encodeWithSignature("log(address,uint256,string,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1309 => _sendLogPayload(abi.encodeWithSignature("log(address,uint256,bool,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1321 => _sendLogPayload(abi.encodeWithSignature("log(address,uint256,bool,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1325 => _sendLogPayload(abi.encodeWithSignature("log(address,uint256,address,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1329 => _sendLogPayload(abi.encodeWithSignature("log(address,uint256,address,string)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1333 => _sendLogPayload(abi.encodeWithSignature("log(address,uint256,address,bool)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1337 => _sendLogPayload(abi.encodeWithSignature("log(address,uint256,address,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1341 => _sendLogPayload(abi.encodeWithSignature("log(address,string,uint256,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1345 => _sendLogPayload(abi.encodeWithSignature("log(address,string,uint256,string)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1353 => _sendLogPayload(abi.encodeWithSignature("log(address,string,uint256,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1357 => _sendLogPayload(abi.encodeWithSignature("log(address,string,string,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1361 => _sendLogPayload(abi.encodeWithSignature("log(address,string,string,string)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1369 => _sendLogPayload(abi.encodeWithSignature("log(address,string,string,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1389 => _sendLogPayload(abi.encodeWithSignature("log(address,string,address,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1393 => _sendLogPayload(abi.encodeWithSignature("log(address,string,address,string)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1401 => _sendLogPayload(abi.encodeWithSignature("log(address,string,address,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1405 => _sendLogPayload(abi.encodeWithSignature("log(address,bool,uint256,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1417 => _sendLogPayload(abi.encodeWithSignature("log(address,bool,uint256,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1453 => _sendLogPayload(abi.encodeWithSignature("log(address,bool,address,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1465 => _sendLogPayload(abi.encodeWithSignature("log(address,bool,address,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1469 => _sendLogPayload(abi.encodeWithSignature("log(address,address,uint256,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1473 => _sendLogPayload(abi.encodeWithSignature("log(address,address,uint256,string)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1477 => _sendLogPayload(abi.encodeWithSignature("log(address,address,uint256,bool)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1481 => _sendLogPayload(abi.encodeWithSignature("log(address,address,uint256,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1485 => _sendLogPayload(abi.encodeWithSignature("log(address,address,string,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1489 => _sendLogPayload(abi.encodeWithSignature("log(address,address,string,string)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1497 => _sendLogPayload(abi.encodeWithSignature("log(address,address,string,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1501 => _sendLogPayload(abi.encodeWithSignature("log(address,address,bool,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1513 => _sendLogPayload(abi.encodeWithSignature("log(address,address,bool,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1517 => _sendLogPayload(abi.encodeWithSignature("log(address,address,address,uint256)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1521 => _sendLogPayload(abi.encodeWithSignature("log(address,address,address,string)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1525 => _sendLogPayload(abi.encodeWithSignature("log(address,address,address,bool)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/console.sol::1529 => _sendLogPayload(abi.encodeWithSignature("log(address,address,address,address)", p0, p1, p2, p3));
../../contracts/node_modules/hardhat/sample-projects/javascript/contracts/Lock.sol::16 => "Unlock time should be in the future"
../../contracts/node_modules/hardhat/sample-projects/javascript/contracts/Lock.sol::25 => // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);
../../contracts/node_modules/hardhat/sample-projects/typescript/contracts/Lock.sol::16 => "Unlock time should be in the future"
../../contracts/node_modules/hardhat/sample-projects/typescript/contracts/Lock.sol::25 => // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/UsingDiamondOwner.sol::9 => require(msg.sender == ds.contractOwner, "Only owner is allowed to perform this action");
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::61 => require(msg.sender == diamondStorage().contractOwner, "LibDiamond: Must be contract owner");
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::81 => revert("LibDiamondCut: Incorrect FacetCutAction");
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::89 => require(_functionSelectors.length > 0, "LibDiamondCut: No selectors in facet to cut");
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::92 => require(_facetAddress != address(0), "LibDiamondCut: Add facet can't be address(0)");
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::96 => enforceHasContractCode(_facetAddress, "LibDiamondCut: New facet has no code");
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::103 => require(oldFacetAddress == address(0), "LibDiamondCut: Can't add function that already exists");
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::112 => require(_functionSelectors.length > 0, "LibDiamondCut: No selectors in facet to cut");
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::114 => require(_facetAddress != address(0), "LibDiamondCut: Add facet can't be address(0)");
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::118 => enforceHasContractCode(_facetAddress, "LibDiamondCut: New facet has no code");
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::125 => require(oldFacetAddress != _facetAddress, "LibDiamondCut: Can't replace function with same function");
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::136 => require(_functionSelectors.length > 0, "LibDiamondCut: No selectors in facet to cut");
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::139 => require(_facetAddress == address(0), "LibDiamondCut: Remove facet address must be address(0)");
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::149 => require(_facetAddress != address(0), "LibDiamondCut: Can't remove function that doesn't exist");
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::151 => require(_facetAddress != address(this), "LibDiamondCut: Can't remove immutable function");
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::182 => require(_calldata.length == 0, "LibDiamondCut: _init is address(0) but_calldata is not empty");
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::184 => require(_calldata.length > 0, "LibDiamondCut: _calldata is empty but _init is not address(0)");
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::186 => enforceHasContractCode(_init, "LibDiamondCut: _init address has no code");
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::194 => revert("LibDiamondCut: _init function reverted");
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/UsingDiamondOwner.sol::9 => require(msg.sender == ds.contractOwner, "Only owner is allowed to perform this action");
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::59 => require(msg.sender == diamondStorage().contractOwner, "LibDiamond: Must be contract owner");
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::79 => revert("LibDiamondCut: Incorrect FacetCutAction");
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::87 => require(_functionSelectors.length > 0, "LibDiamondCut: No selectors in facet to cut");
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::89 => require(_facetAddress != address(0), "LibDiamondCut: Add facet can't be address(0)");
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::98 => require(oldFacetAddress == address(0), "LibDiamondCut: Can't add function that already exists");
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::105 => require(_functionSelectors.length > 0, "LibDiamondCut: No selectors in facet to cut");
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::107 => require(_facetAddress != address(0), "LibDiamondCut: Add facet can't be address(0)");
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::116 => require(oldFacetAddress != _facetAddress, "LibDiamondCut: Can't replace function with same function");
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::124 => require(_functionSelectors.length > 0, "LibDiamondCut: No selectors in facet to cut");
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::127 => require(_facetAddress == address(0), "LibDiamondCut: Remove facet address must be address(0)");
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::136 => enforceHasContractCode(_facetAddress, "LibDiamondCut: New facet has no code");
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::149 => require(_facetAddress != address(0), "LibDiamondCut: Can't remove function that doesn't exist");
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::151 => require(_facetAddress != address(this), "LibDiamondCut: Can't remove immutable function");
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::182 => require(_calldata.length == 0, "LibDiamondCut: _init is address(0) but_calldata is not empty");
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::184 => require(_calldata.length > 0, "LibDiamondCut: _calldata is empty but _init is not address(0)");
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::186 => enforceHasContractCode(_init, "LibDiamondCut: _init address has no code");
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::194 => revert("LibDiamondCut: _init function reverted");
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/access/Ownable.sol::63 => require(newOwner != address(0), "Ownable: new owner is the zero address");
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/ERC1967/ERC1967Upgrade.sol::7 => import "../../interfaces/draft-IERC1822.sol";
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/ERC1967/ERC1967Upgrade.sol::46 => require(Address.isContract(newImplementation), "ERC1967: new implementation is not a contract");
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/ERC1967/ERC1967Upgrade.sol::93 => require(slot == _IMPLEMENTATION_SLOT, "ERC1967Upgrade: unsupported proxiableUUID");
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/ERC1967/ERC1967Upgrade.sol::95 => revert("ERC1967Upgrade: new implementation is not UUPS");
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/ERC1967/ERC1967Upgrade.sol::124 => require(newAdmin != address(0), "ERC1967: new admin is the zero address");
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/ERC1967/ERC1967Upgrade.sol::160 => require(Address.isContract(newBeacon), "ERC1967: new beacon is not a contract");
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/ERC1967/ERC1967Upgrade.sol::161 => require(Address.isContract(IBeacon(newBeacon).implementation()), "ERC1967: beacon implementation is not a contract");
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/beacon/UpgradeableBeacon.sol::63 => require(Address.isContract(newImplementation), "UpgradeableBeacon: implementation is not a contract");
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/transparent/ProxyAdmin.sol::6 => import "./TransparentUpgradeableProxy.sol";
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/transparent/TransparentUpgradeableProxy.sol::20 => * "admin cannot fallback to proxy target".
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/transparent/TransparentUpgradeableProxy.sol::122 => require(msg.sender != _getAdmin(), "TransparentUpgradeableProxy: admin cannot fallback to proxy target");
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/utils/Initializable.sol::53 => require(_initializing ? _isConstructor() : !_initialized, "Initializable: contract is already initialized");
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/utils/Initializable.sol::73 => require(_initializing, "Initializable: contract is not initializing");
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/utils/UUPSUpgradeable.sol::6 => import "../../interfaces/draft-IERC1822.sol";
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/utils/UUPSUpgradeable.sol::33 => require(address(this) != __self, "Function must be called through delegatecall");
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/utils/UUPSUpgradeable.sol::34 => require(_getImplementation() == __self, "Function must be called through active proxy");
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/utils/UUPSUpgradeable.sol::43 => require(address(this) == __self, "UUPSUpgradeable: must not be called through delegatecall");
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/Address.sol::64 => require(success, "Address: unable to send value, recipient may have reverted");
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/Address.sol::119 => return functionCallWithValue(target, data, value, "Address: low-level call with value failed");
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/Address.sol::134 => require(address(this).balance >= value, "Address: insufficient balance for call");
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/Address.sol::148 => return functionStaticCall(target, data, "Address: low-level static call failed");
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/Address.sol::162 => require(isContract(target), "Address: static call to non-contract");
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/Address.sol::175 => return functionDelegateCall(target, data, "Address: low-level delegate call failed");
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/Address.sol::189 => require(isContract(target), "Address: delegate call to non-contract");
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/StorageSlot.sol::24 => *         require(Address.isContract(newImplementation), "ERC1967: new implementation is not a contract");
../../contracts/node_modules/hardhat-deploy/solc_0.8/proxy/OptimizedTransparentUpgradeableProxy.sol::6 => import "../openzeppelin/proxy/ERC1967/ERC1967Proxy.sol";
../../contracts/node_modules/hardhat-deploy/solc_0.8/proxy/OptimizedTransparentUpgradeableProxy.sol::20 => * "admin cannot fallback to proxy target".
../../contracts/node_modules/hardhat-deploy/solc_0.8/proxy/OptimizedTransparentUpgradeableProxy.sol::121 => require(msg.sender != _getAdmin(), "TransparentUpgradeableProxy: admin cannot fallback to proxy target");
../../contracts/node_modules/solady/src/auth/Ownable.sol::48 => /// @dev `keccak256(bytes("OwnershipTransferred(address,address)"))`.
../../contracts/node_modules/solady/src/auth/Ownable.sol::52 => /// @dev `keccak256(bytes("OwnershipHandoverRequested(address)"))`.
../../contracts/node_modules/solady/src/auth/Ownable.sol::56 => /// @dev `keccak256(bytes("OwnershipHandoverCanceled(address)"))`.
../../contracts/node_modules/solady/src/utils/ECDSA.sol::278 => mstore(0x00, "\x00\x00\x00\x00\x19Ethereum Signed Message:\n32")
../../contracts/node_modules/solady/src/utils/ECDSA.sol::312 => mstore(sub(ptr, 0x20), "\x00\x00\x00\x00\x00\x00\x19Ethereum Signed Message:\n")
../../contracts/node_modules/solady/src/utils/EIP712.sol::13 => /// @dev `keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)")`.
../../contracts/node_modules/solady/src/utils/LibString.sol::915 => // Also, store `{0x08:"b", 0x09:"t", 0x0a:"n", 0x0c:"f", 0x0d:"r"}`.
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::13 => keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
../../contracts/node_modules/solmate/src/test/MultiRolesAuthority.t.sol::9 => import {MultiRolesAuthority} from "../auth/authorities/MultiRolesAuthority.sol";
../../contracts/node_modules/solmate/src/test/ReentrancyGuard.t.sol::49 => fail("Reentrancy Guard Failed To Stop Attacker");
../../contracts/node_modules/solmate/src/test/RolesAuthority.t.sol::9 => import {RolesAuthority} from "../auth/authorities/RolesAuthority.sol";
../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol::5 => import {RevertingToken} from "./utils/weird-tokens/RevertingToken.sol";
../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol::6 => import {ReturnsTwoToken} from "./utils/weird-tokens/ReturnsTwoToken.sol";
../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol::7 => import {ReturnsFalseToken} from "./utils/weird-tokens/ReturnsFalseToken.sol";
../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol::8 => import {MissingReturnToken} from "./utils/weird-tokens/MissingReturnToken.sol";
../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol::9 => import {ReturnsTooMuchToken} from "./utils/weird-tokens/ReturnsTooMuchToken.sol";
../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol::10 => import {ReturnsGarbageToken} from "./utils/weird-tokens/ReturnsGarbageToken.sol";
../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol::11 => import {ReturnsTooLittleToken} from "./utils/weird-tokens/ReturnsTooLittleToken.sol";
../../contracts/node_modules/solmate/src/test/utils/DSTestPlus.sol::103 => emit log("Error: a ~= b not satisfied [uint]");
../../contracts/node_modules/solmate/src/test/utils/DSTestPlus.sol::122 => emit log("Error: a ~= b not satisfied [uint]");
../../contracts/node_modules/solmate/src/test/utils/DSTestPlus.sol::133 => emit log("Error: a == b not satisfied [bytes]");
../../contracts/node_modules/solmate/src/tokens/ERC20.sol::138 => "Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)"
../../contracts/node_modules/solmate/src/tokens/ERC20.sol::170 => keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
../../contracts/node_modules/solmate/src/utils/CREATE3.sol::33 => bytes internal constant PROXY_BYTECODE = hex"67_36_3d_3d_37_36_3d_34_f0_3d_52_60_08_60_18_f3";
```
#### Tools used
[c4udit](https://github.com/byterocket/c4udit)

### Use Shift Right/Left instead of Division/Multiplication if possible

#### Impact
Issue Information: [G008](https://github.com/byterocket/c4-common-issues/blob/main/0-Gas-Optimizations.md/#g008---use-shift-rightleft-instead-of-divisionmultiplication-if-possible)

#### Findings:
```
../../contracts/build/c4udit/examples/Test.sol::13 => i = i / 2;
../../contracts/node_modules/@ensdomains/ens/contracts/HashRegistrar.sol::57 => require(now >= registryStarted && now <= registryStarted + (365 * 4) * 1 days && ens.owner(rootNode) == address(this));
../../contracts/node_modules/@ensdomains/ens/contracts/HashRegistrar.sol::281 => h.deed.setBalance(h.value/2, false);
../../contracts/node_modules/@ensdomains/ens/contracts/HashRegistrar.sol::401 => // Right shift operator: a >> b == a / 2**b
../../contracts/node_modules/@openzeppelin/contracts/access/AccessControlEnumerable.sol::34 => * https://forum.openzeppelin.com/t/iterating-over-elements-on-enumerableset-in-openzeppelin-contracts/2296[forum post]
../../contracts/node_modules/@openzeppelin/contracts/access/IAccessControlEnumerable.sol::21 => * https://forum.openzeppelin.com/t/iterating-over-elements-on-enumerableset-in-openzeppelin-contracts/2296[forum post]
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC4626.sol::78 => * - MUST return 2 ** 256 - 1 if there is no limit on the maximum amount of assets that may be deposited.
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC4626.sol::116 => * - MUST return 2 ** 256 - 1 if there is no limit on the maximum amount of shares that may be minted.
../../contracts/node_modules/@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol::18 => * 2. If the admin calls the proxy, it can access the admin functions, but its calls will never be forwarded to the
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol::18 => * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[How
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol::77 => * be displayed to a user as `5.05` (`505 / 10 ** 2`).
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol::62 => * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
../../contracts/node_modules/@openzeppelin/contracts/utils/Address.sol::53 => * https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].
../../contracts/node_modules/@openzeppelin/contracts/utils/Base64.sol::58 => // 4 times in blocks of 6 bits for each character (18, 12, 6, 0)
../../contracts/node_modules/@openzeppelin/contracts/utils/Counters.sol::18 => // this feature: see https://github.com/ethereum/solidity/issues/4637
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol::147 => // vice versa. If your library also generates signatures with 0/1 for v instead 27/28, add 27 to v to accept
../../contracts/node_modules/@openzeppelin/contracts/utils/math/Math.sol::35 => // (a + b) / 2 can overflow.
../../contracts/node_modules/@openzeppelin/contracts/utils/math/Math.sol::36 => return (a & b) + (a ^ b) / 2;
../../contracts/node_modules/@openzeppelin/contracts/utils/math/Math.sol::52 => * @dev Original credit to Remco Bloemen under MIT license (https://xn--2-umb.com/21/muldiv)
../../contracts/node_modules/@openzeppelin/contracts/utils/math/Math.sol::63 => // variables such that product = prod1 * 2^256 + prod0.
../../contracts/node_modules/@openzeppelin/contracts/utils/math/Math.sol::167 => // This gives `2**k < a <= 2**(k+1)` → `2**(k/2) <= sqrt(a) < 2 ** (k/2+1)`.
../../contracts/node_modules/@openzeppelin/contracts/utils/math/Math.sol::168 => // Using an algorithm similar to the msb conmputation, we are able to compute `result = 2**(k/2)` which is a
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlCrossChainUpgradeable.sol::55 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol::40 => * https://forum.openzeppelin.com/t/iterating-over-elements-on-enumerableset-in-openzeppelin-contracts/2296[forum post]
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol::74 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol::257 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/access/IAccessControlEnumerableUpgradeable.sol::21 => * https://forum.openzeppelin.com/t/iterating-over-elements-on-enumerableset-in-openzeppelin-contracts/2296[forum post]
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol::92 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/CrossChainEnabledUpgradeable.sol::64 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/amb/CrossChainEnabledAMBUpgradeable.sol::54 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/arbitrum/CrossChainEnabledArbitrumL1Upgradeable.sol::49 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/arbitrum/CrossChainEnabledArbitrumL2Upgradeable.sol::45 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/optimism/CrossChainEnabledOptimismUpgradeable.sol::46 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/polygon/CrossChainEnabledPolygonChildUpgradeable.sol::87 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/finance/PaymentSplitterUpgradeable.sol::214 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/finance/VestingWalletUpgradeable.sol::150 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::606 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/IGovernorUpgradeable.sol::286 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::430 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerWith46MigrationUpgradeable.sol::51 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/compatibility/GovernorCompatibilityBravoUpgradeable.sol::299 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/compatibility/IGovernorCompatibilityBravoUpgradeable.sol::124 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorCountingSimpleUpgradeable.sol::117 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorPreventLateQuorumUpgradeable.sol::117 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorProposalThresholdUpgradeable.sol::33 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorSettingsUpgradeable.sol::127 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorTimelockCompoundUpgradeable.sol::202 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorTimelockControlUpgradeable.sol::175 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorVotesCompUpgradeable.sol::42 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorVotesQuorumFractionUpgradeable.sol::128 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorVotesUpgradeable.sol::42 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/IGovernorTimelockUpgradeable.sol::36 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/utils/VotesUpgradeable.sol::221 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC4626Upgradeable.sol::78 => * - MUST return 2 ** 256 - 1 if there is no limit on the maximum amount of assets that may be deposited.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC4626Upgradeable.sol::116 => * - MUST return 2 ** 256 - 1 if there is no limit on the maximum amount of shares that may be minted.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/metatx/ERC2771ContextUpgradeable.sol::48 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/metatx/MinimalForwarderUpgradeable.sol::82 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol::209 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol::105 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol::114 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/security/PullPaymentUpgradeable.sol::86 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol::72 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::526 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol::50 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155PausableUpgradeable.sol::49 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol::74 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155URIStorageUpgradeable.sol::75 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/presets/ERC1155PresetMinterPauserUpgradeable.sol::142 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155HolderUpgradeable.sol::46 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155ReceiverUpgradeable.sol::29 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol::19 => * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[How
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol::82 => * be displayed to a user as `5.05` (`505 / 10 ** 2`).
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol::392 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol::62 => * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol::49 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20CappedUpgradeable.sol::48 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20FlashMintUpgradeable.sol::106 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PausableUpgradeable.sol::44 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20SnapshotUpgradeable.sol::205 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesCompUpgradeable.sol::56 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesUpgradeable.sol::259 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20WrapperUpgradeable.sol::74 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC4626Upgradeable.sol::231 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/draft-ERC20PermitUpgradeable.sol::106 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetFixedSupplyUpgradeable.sol::58 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetMinterPauserUpgradeable.sol::108 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/utils/TokenTimelockUpgradeable.sol::91 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol::463 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol::36 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol::173 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol::44 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721RoyaltyUpgradeable.sol::48 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol::72 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/draft-ERC721VotesUpgradeable.sol::50 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/presets/ERC721PresetMinterPauserAutoIdUpgradeable.sol::161 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/utils/ERC721HolderUpgradeable.sol::38 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/ERC777Upgradeable.sol::560 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/presets/ERC777PresetFixedSupplyUpgradeable.sol::55 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/common/ERC2981Upgradeable.sol::121 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol::53 => * https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/Base64Upgradeable.sol::58 => // 4 times in blocks of 6 bits for each character (18, 12, 6, 0)
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol::34 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol::18 => // this feature: see https://github.com/ethereum/solidity/issues/4637
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/MulticallUpgradeable.sol::48 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol::147 => // vice versa. If your library also generates signatures with 0/1 for v instead 27/28, add 27 to v to accept
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol::118 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/escrow/ConditionalEscrowUpgradeable.sol::36 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/escrow/EscrowUpgradeable.sol::81 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/escrow/RefundEscrowUpgradeable.sol::110 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165StorageUpgradeable.sol::52 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol::39 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC1820ImplementerUpgradeable.sol::54 => * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol::35 => // (a + b) / 2 can overflow.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol::36 => return (a & b) + (a ^ b) / 2;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol::52 => * @dev Original credit to Remco Bloemen under MIT license (https://xn--2-umb.com/21/muldiv)
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol::63 => // variables such that product = prod1 * 2^256 + prod0.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol::167 => // This gives `2**k < a <= 2**(k+1)` → `2**(k/2) <= sqrt(a) < 2 ** (k/2+1)`.
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol::168 => // Using an algorithm similar to the msb conmputation, we are able to compute `result = 2**(k/2)` which is a
../../contracts/node_modules/eth-gas-reporter/mock/contracts/EtherRouter/EtherRouter.sol::36 => // 2. We commit to never using a fallback function that does anything.
../../contracts/node_modules/eth-gas-reporter/mock/contracts/VariableCosts.sol::52 => multi.hello(); // 20,000 gas (sets uint to 5 from zero)
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/transparent/TransparentUpgradeableProxy.sol::18 => * 2. If the admin calls the proxy, it can access the admin functions, but its calls will never be forwarded to the
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/Address.sol::53 => * https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].
../../contracts/node_modules/hardhat-deploy/solc_0.8/proxy/OptimizedTransparentUpgradeableProxy.sol::18 => * 2. If the admin calls the proxy, it can access the admin functions, but its calls will never be forwarded to the
../../contracts/node_modules/solady/src/utils/DateTimeLib.sol::114 => result = dateToEpochDay(year, month, day) * 86400;
../../contracts/node_modules/solady/src/utils/DateTimeLib.sol::126 => (year, month, day) = epochDayToDate(timestamp / 86400);
../../contracts/node_modules/solady/src/utils/DateTimeLib.sol::142 => result = dateToEpochDay(year, month, day) * 86400 + hour * 3600 + minute * 60 + second;
../../contracts/node_modules/solady/src/utils/DateTimeLib.sol::163 => (year, month, day) = epochDayToDate(timestamp / 86400);
../../contracts/node_modules/solady/src/utils/DateTimeLib.sol::196 => result = ((timestamp / 86400 + 3) % 7) + 1;
../../contracts/node_modules/solady/src/utils/DateTimeLib.sol::305 => (uint256 year, uint256 month, uint256 day) = epochDayToDate(timestamp / 86400);
../../contracts/node_modules/solady/src/utils/DateTimeLib.sol::319 => (uint256 year, uint256 month, uint256 day) = epochDayToDate(timestamp / 86400);
../../contracts/node_modules/solady/src/utils/DateTimeLib.sol::326 => result = timestamp + numDays * 86400;
../../contracts/node_modules/solady/src/utils/DateTimeLib.sol::360 => (uint256 year, uint256 month, uint256 day) = epochDayToDate(timestamp / 86400);
../../contracts/node_modules/solady/src/utils/DateTimeLib.sol::374 => (uint256 year, uint256 month, uint256 day) = epochDayToDate(timestamp / 86400);
../../contracts/node_modules/solady/src/utils/DateTimeLib.sol::381 => result = timestamp - numDays * 86400;
../../contracts/node_modules/solady/src/utils/DateTimeLib.sol::418 => (uint256 fromYear,,) = epochDayToDate(fromTimestamp / 86400);
../../contracts/node_modules/solady/src/utils/DateTimeLib.sol::419 => (uint256 toYear,,) = epochDayToDate(toTimestamp / 86400);
../../contracts/node_modules/solady/src/utils/DateTimeLib.sol::434 => (uint256 fromYear, uint256 fromMonth,) = epochDayToDate(fromTimestamp / 86400);
../../contracts/node_modules/solady/src/utils/DateTimeLib.sol::435 => (uint256 toYear, uint256 toMonth,) = epochDayToDate(toTimestamp / 86400);
../../contracts/node_modules/solady/src/utils/DateTimeLib.sol::445 => result = (toTimestamp - fromTimestamp) / 86400;
../../contracts/node_modules/solady/src/utils/DateTimeLib.sol::514 => result = dateToEpochDay(year, month, day) * 86400 + (timestamp % 86400);
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::129 => // When the result is > (2**255 - 1) / 1e18 we can not represent it as an
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::130 => // int. This happens when x >= floor(log((2**255 - 1) / 1e18) * 1e18) ~ 135.
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::139 => // x is now in the range (-42, 136) * 1e18. Convert to (-42, 136) * 2**96
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::141 => // is a multiplication by 1e18 / 2**96 = 5**18 / 2**78.
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::144 => // Reduce range of x to (-½ ln 2, ½ ln 2) * 2**96 by factoring out powers
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::145 => // of two such that exp(x) = exp(x') * 2**k, where k is an integer.
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::176 => // r should be in the range (0.09, 0.25) * 2**96.
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::181 => // * the 1e18 / 2**96 factor for base conversion.
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::182 => // We do this all at once, with an intermediate result in 2**213
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::231 => // Reduce range of x to (1, 2) * 2**96
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::263 => // r is in the range (0, 0.125) * 2**96
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::269 => // * multiply by 10**18 / 2**96 = 5**18 >> 78
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::271 => // mul s * 5e18 * 2**96, base is now 5**18 * 2**192
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::273 => // add ln(2) * k * 5e18 * 2**192
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::275 => // add ln(2**96 / 10**18) * 5e18 * 2**192
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::277 => // base conversion: mul 2**18 / 2**192
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::288 => /// Credit to Remco Bloemen under MIT license: https://2π.com/21/muldiv
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::295 => // Compute the product mod `2**256` and mod `2**256 - 1`
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::298 => // variables such that `product = prod1 * 2**256 + prod0`.
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::318 => // Make sure the result is less than `2**256`.
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::346 => // to flip `twos` such that it is `2**256 / twos`.
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::349 => // Invert `d mod 2**256`
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::351 => // modulo `2**256` such that `d * inv = 1 mod 2**256`.
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::353 => // correct for four bits. That is, `d * inv = 1 mod 2**4`.
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::358 => inv := mul(inv, sub(2, mul(d, inv))) // inverse mod 2**8
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::363 => result := mul(prod0, mul(inv, sub(2, mul(d, inv)))) // inverse mod 2**256
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::454 => // Let `y = x / 2**r`.
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::472 => // For `s` in the range `[1/256, 256]`, the estimate `f(s) = (181/1024) * (s+1)`
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::473 => // is in the range `(1/2.84 * sqrt(s), 2.84 * sqrt(s))`,
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::474 => // with largest error when `s = 1` and when `s = 256` or `1/256`.
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::476 => // Since `y` is in `[256, 256*(2**16))`, let `a = y/65536`, so that `a` is in `[1/256, 256)`.
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::478 => // `sqrt(65536) * 181/1024 * (a + 1) = 181/4 * (y + 65536)/65536 = 181 * (y + 65536)/2**18`.
../../contracts/node_modules/solady/src/utils/LibClone.sol::47 => * 81         | DUP2              | r 0 r     |                              |
../../contracts/node_modules/solady/src/utils/LibClone.sol::81 => * 80      | DUP1           | 0 0 rds success 0 rds  | [0..cds): calldata    |
../../contracts/node_modules/solady/src/utils/LibClone.sol::189 => * 81         | DUP2              | r 0 r     |                                                       |
../../contracts/node_modules/solady/src/utils/LibClone.sol::228 => * 80       | DUP1           | e e 0 0 0 0              | [0..cds): calldata                          |
../../contracts/node_modules/solady/src/utils/LibClone.sol::245 => * 80       | DUP1           | 0 0 rds success 0 rds    | [0..cds): calldata, [cds..cds+e): extraData |
../../contracts/node_modules/solady/src/utils/LibString.sol::90 => /// giving a total length of `length * 2 + 2` bytes.
../../contracts/node_modules/solady/src/utils/LibString.sol::106 => /// giving a total length of `length * 2` bytes.
../../contracts/node_modules/solady/src/utils/LibString.sol::115 => // We need 0x20 bytes for the trailing zeros padding, `length * 2` bytes
../../contracts/node_modules/solady/src/utils/LibString.sol::161 => /// a length of `20 * 2 + 2` bytes.
../../contracts/node_modules/solady/src/utils/LibString.sol::176 => /// a length of `20 * 2` bytes.
../../contracts/node_modules/solady/src/utils/Multicallable.sol::11 => /// See: (https://www.paradigm.xyz/2021/08/two-rights-might-make-a-wrong/)
../../contracts/node_modules/solady/src/utils/SSTORE2.sol::49 => * 80          | DUP1            | codeSize codeSize       |                     |
../../contracts/node_modules/solmate/src/test/ERC4626.t.sol::206 => // 2. Bob deposits 4000 tokens (mints 4000 shares)
../../contracts/node_modules/solmate/src/test/ERC4626.t.sol::244 => assertEq(vault.convertToAssets(vault.balanceOf(bob)), bobUnderlyingAmount + (mutationUnderlyingAmount / 3) * 2);
../../contracts/node_modules/solmate/src/test/ERC4626.t.sol::246 => // 4. Alice deposits 2000 tokens (mints 1333 shares)
../../contracts/node_modules/solmate/src/test/ERC4626.t.sol::294 => // 8. Bob withdraws 2929 assets (1608 shares)
../../contracts/node_modules/solmate/src/test/FixedPointMathLib.t.sol::305 => uint256 x = y / 2 + 1;
../../contracts/node_modules/solmate/src/test/FixedPointMathLib.t.sol::308 => x = (y / x + x) / 2;
../../contracts/node_modules/solmate/src/utils/FixedPointMathLib.sol::12 => uint256 internal constant MAX_UINT256 = 2**256 - 1;
../../contracts/node_modules/solmate/src/utils/FixedPointMathLib.sol::111 => // Revert immediately if x ** 2 would overflow.
../../contracts/node_modules/solmate/src/utils/FixedPointMathLib.sol::194 => // get y in a tighter range. Currently, we will have y in [256, 256*2^16).
../../contracts/node_modules/solmate/src/utils/FixedPointMathLib.sol::202 => // For s in the range [1/256, 256], the estimate f(s) = (181/1024) * (s+1) is in the range
../../contracts/node_modules/solmate/src/utils/FixedPointMathLib.sol::203 => // (1/2.84 * sqrt(s), 2.84 * sqrt(s)), with largest error when s = 1 and when s = 256 or 1/256.
../../contracts/node_modules/solmate/src/utils/FixedPointMathLib.sol::205 => // Since y is in [256, 256*2^16), let a = y/65536, so that a is in [1/256, 256). Then we can estimate
../../contracts/node_modules/solmate/src/utils/FixedPointMathLib.sol::206 => // sqrt(y) using sqrt(65536) * 181/1024 * (a + 1) = 181/4 * (y + 65536)/65536 = 181 * (y + 65536)/2^18.
../../contracts/node_modules/solmate/src/utils/SafeTransferLib.sol::86 => // We use 68 because the length of our calldata totals up like so: 4 + 32 * 2.
../../contracts/node_modules/solmate/src/utils/SafeTransferLib.sol::118 => // We use 68 because the length of our calldata totals up like so: 4 + 32 * 2.
../../contracts/node_modules/solmate/src/utils/SignedWadMath.sol::6 => /// @author Modified from Remco Bloemen (https://xn--2-umb.com/22/exp-ln/index.html)
../../contracts/node_modules/solmate/src/utils/SignedWadMath.sol::96 => // When the result is > (2**255 - 1) / 1e18 we can not represent it as an
../../contracts/node_modules/solmate/src/utils/SignedWadMath.sol::97 => // int. This happens when x >= floor(log((2**255 - 1) / 1e18) * 1e18) ~ 135.
../../contracts/node_modules/solmate/src/utils/SignedWadMath.sol::100 => // x is now in the range (-42, 136) * 1e18. Convert to (-42, 136) * 2**96
../../contracts/node_modules/solmate/src/utils/SignedWadMath.sol::102 => // is a multiplication by 1e18 / 2**96 = 5**18 / 2**78.
../../contracts/node_modules/solmate/src/utils/SignedWadMath.sol::105 => // Reduce range of x to (-½ ln 2, ½ ln 2) * 2**96 by factoring out powers
../../contracts/node_modules/solmate/src/utils/SignedWadMath.sol::106 => // of two such that exp(x) = exp(x') * 2**k, where k is an integer.
../../contracts/node_modules/solmate/src/utils/SignedWadMath.sol::137 => // r should be in the range (0.09, 0.25) * 2**96.
../../contracts/node_modules/solmate/src/utils/SignedWadMath.sol::142 => // * the 1e18 / 2**96 factor for base conversion.
../../contracts/node_modules/solmate/src/utils/SignedWadMath.sol::143 => // We do this all at once, with an intermediate result in 2**213
../../contracts/node_modules/solmate/src/utils/SignedWadMath.sol::170 => // Reduce range of x to (1, 2) * 2**96
../../contracts/node_modules/solmate/src/utils/SignedWadMath.sol::203 => // r is in the range (0, 0.125) * 2**96
../../contracts/node_modules/solmate/src/utils/SignedWadMath.sol::209 => // * multiply by 10**18 / 2**96 = 5**18 >> 78
../../contracts/node_modules/solmate/src/utils/SignedWadMath.sol::211 => // mul s * 5e18 * 2**96, base is now 5**18 * 2**192
../../contracts/node_modules/solmate/src/utils/SignedWadMath.sol::213 => // add ln(2) * k * 5e18 * 2**192
../../contracts/node_modules/solmate/src/utils/SignedWadMath.sol::215 => // add ln(2**96 / 10**18) * 5e18 * 2**192
../../contracts/node_modules/solmate/src/utils/SignedWadMath.sol::217 => // base conversion: mul 2**18 / 2**192
```
#### Tools used
[c4udit](https://github.com/byterocket/c4udit)

### Unsafe ERC20 Operation(s)

#### Impact
Issue Information: [L001](https://github.com/byterocket/c4-common-issues/blob/main/2-Low-Risk.md#l001---unsafe-erc20-operations)

#### Findings:
```
../../contracts/build/c4udit/examples/Test.sol::16 => token.transferFrom(msg.sender, address(this), 100);
../../contracts/node_modules/eth-gas-reporter/mock/contracts/Wallets/Wallet.sol::8 => address(recipient).transfer(payment);
../../contracts/node_modules/hardhat/sample-projects/javascript/contracts/Lock.sol::32 => owner.transfer(address(this).balance);
../../contracts/node_modules/hardhat/sample-projects/typescript/contracts/Lock.sol::32 => owner.transfer(address(this).balance);
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::41 => assertTrue(token.approve(address(0xBEEF), 1e18));
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::49 => assertTrue(token.transfer(address(0xBEEF), 1e18));
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::62 => token.approve(address(this), 1e18);
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::64 => assertTrue(token.transferFrom(from, address(0xBEEF), 1e18));
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::79 => token.approve(address(this), type(uint256).max);
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::81 => assertTrue(token.transferFrom(from, address(0xBEEF), 1e18));
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::113 => token.transfer(address(0xBEEF), 1e18);
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::122 => token.approve(address(this), 0.9e18);
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::124 => token.transferFrom(from, address(0xBEEF), 1e18);
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::133 => token.approve(address(this), 1e18);
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::135 => token.transferFrom(from, address(0xBEEF), 1e18);
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::246 => assertTrue(token.approve(to, amount));
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::254 => assertTrue(token.transfer(from, amount));
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::277 => token.approve(address(this), approval);
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::279 => assertTrue(token.transferFrom(from, to, amount));
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::341 => token.transfer(to, sendAmount);
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::356 => token.approve(address(this), approval);
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::358 => token.transferFrom(from, to, amount);
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::373 => token.approve(address(this), sendAmount);
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::375 => token.transferFrom(from, to, sendAmount);
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::517 => token.approve(to, amount);
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::525 => token.transferFrom(from, to, amount);
../../contracts/node_modules/solmate/src/test/ERC20.t.sol::529 => token.transfer(to, amount);
../../contracts/node_modules/solmate/src/test/ERC4626.t.sol::41 => underlying.approve(address(vault), aliceUnderlyingAmount);
../../contracts/node_modules/solmate/src/test/ERC4626.t.sol::82 => underlying.approve(address(vault), aliceShareAmount);
../../contracts/node_modules/solmate/src/test/ERC4626.t.sol::175 => underlying.approve(address(vault), 4000);
../../contracts/node_modules/solmate/src/test/ERC4626.t.sol::182 => underlying.approve(address(vault), 7001);
../../contracts/node_modules/solmate/src/test/ERC4626.t.sol::336 => underlying.approve(address(vault), 0.5e18);
../../contracts/node_modules/solmate/src/test/ERC4626.t.sol::344 => underlying.approve(address(vault), 0.5e18);
../../contracts/node_modules/solmate/src/test/ERC4626.t.sol::353 => underlying.approve(address(vault), 0.5e18);
../../contracts/node_modules/solmate/src/test/ERC4626.t.sol::410 => underlying.approve(address(vault), 1e18);
../../contracts/node_modules/solmate/src/test/ERC4626.t.sol::413 => underlying.approve(address(vault), 1e18);
../../contracts/node_modules/solmate/src/test/ERC721.t.sol::88 => token.approve(address(0xBEEF), 1337);
../../contracts/node_modules/solmate/src/test/ERC721.t.sol::96 => token.approve(address(0xBEEF), 1337);
../../contracts/node_modules/solmate/src/test/ERC721.t.sol::119 => token.approve(address(this), 1337);
../../contracts/node_modules/solmate/src/test/ERC721.t.sol::121 => token.transferFrom(from, address(0xBEEF), 1337);
../../contracts/node_modules/solmate/src/test/ERC721.t.sol::132 => token.transferFrom(address(this), address(0xBEEF), 1337);
../../contracts/node_modules/solmate/src/test/ERC721.t.sol::148 => token.transferFrom(from, address(0xBEEF), 1337);
../../contracts/node_modules/solmate/src/test/ERC721.t.sol::272 => token.approve(address(0xBEEF), 1337);
../../contracts/node_modules/solmate/src/test/ERC721.t.sol::278 => token.approve(address(0xBEEF), 1337);
../../contracts/node_modules/solmate/src/test/ERC721.t.sol::282 => token.transferFrom(address(0xFEED), address(0xBEEF), 1337);
../../contracts/node_modules/solmate/src/test/ERC721.t.sol::288 => token.transferFrom(address(0xFEED), address(0xBEEF), 1337);
../../contracts/node_modules/solmate/src/test/ERC721.t.sol::294 => token.transferFrom(address(this), address(0), 1337);
../../contracts/node_modules/solmate/src/test/ERC721.t.sol::300 => token.transferFrom(address(0xFEED), address(0xBEEF), 1337);
../../contracts/node_modules/solmate/src/test/ERC721.t.sol::404 => token.approve(to, id);
../../contracts/node_modules/solmate/src/test/ERC721.t.sol::412 => token.approve(address(to), id);
../../contracts/node_modules/solmate/src/test/ERC721.t.sol::437 => token.approve(address(this), id);
../../contracts/node_modules/solmate/src/test/ERC721.t.sol::439 => token.transferFrom(from, to, id);
../../contracts/node_modules/solmate/src/test/ERC721.t.sol::452 => token.transferFrom(address(this), to, id);
../../contracts/node_modules/solmate/src/test/ERC721.t.sol::470 => token.transferFrom(from, to, id);
../../contracts/node_modules/solmate/src/test/ERC721.t.sol::607 => token.approve(to, id);
../../contracts/node_modules/solmate/src/test/ERC721.t.sol::619 => token.approve(to, id);
../../contracts/node_modules/solmate/src/test/ERC721.t.sol::627 => token.transferFrom(from, to, id);
../../contracts/node_modules/solmate/src/test/ERC721.t.sol::641 => token.transferFrom(from, to, id);
../../contracts/node_modules/solmate/src/test/ERC721.t.sol::647 => token.transferFrom(address(this), address(0), id);
../../contracts/node_modules/solmate/src/test/ERC721.t.sol::659 => token.transferFrom(from, to, id);
../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol::571 => MissingReturnToken(token).transfer(from, amount);
```
#### Tools used
[c4udit](https://github.com/byterocket/c4udit)

### Unspecific Compiler Version Pragma

#### Impact
Issue Information: [L003](https://github.com/byterocket/c4-common-issues/blob/main/2-Low-Risk.md#l003---unspecific-compiler-version-pragma)

#### Findings:
```
../../contracts/build/c4udit/examples/Test.sol::1 => pragma solidity ^0.8.0;
../../contracts/contracts/Badger.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/BadgerNetwork.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/BadgerOrganization.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/BadgerOrganizationLogic.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/hooks/BadgerHook.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/hooks/BadgerHooked.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/hooks/forfeit/BadgerForfeitForbidden.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/hooks/hook/BadgerHookBlocklist.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/hooks/mint/BadgerMintMax.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/hooks/mint/BadgerMintMaxAllowance.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/hooks/mint/BadgerMintMaxSupply.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/hooks/mint/BadgerMintSelf.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/hooks/revoke/BadgerRevokeForbidden.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/hooks/transfer/BadgerTransferBlocklist.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/hooks/transfer/BadgerTransferBound.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/hooks/transfer/BadgerTransferBoundManaged.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/hooks/types/BadgerForfeitHook.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/hooks/types/BadgerHookHook.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/hooks/types/BadgerMintHook.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/hooks/types/BadgerRevokeHook.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/hooks/types/BadgerTransferHook.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/interfaces/IBadger.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/interfaces/IBadgerConfigured.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/interfaces/IBadgerHook.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/interfaces/IBadgerHooked.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/interfaces/IBadgerManaged.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/interfaces/IBadgerOrganization.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/interfaces/IBadgerOrganizationLogic.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/interfaces/IBadgerOrganizationStruct.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/managers/BadgerManaged.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/managers/BadgerManager.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/managers/BadgerManagerClaimable.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/managers/BadgerManagerPaidERC1155.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/managers/BadgerManagerPaidERC20.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/managers/BadgerManagerPaidERC721.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/managers/BadgerManagerPaidNative.sol::3 => pragma solidity ^0.8.16;
../../contracts/contracts/managers/BadgerManagerSignature.sol::3 => pragma solidity ^0.8.16;
../../contracts/node_modules/@ensdomains/ens/contracts/Deed.sol::1 => pragma solidity >=0.4.24;
../../contracts/node_modules/@ensdomains/ens/contracts/DeedImplementation.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/@ensdomains/ens/contracts/ENS.sol::1 => pragma solidity >=0.4.24;
../../contracts/node_modules/@ensdomains/ens/contracts/ENSRegistry.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/@ensdomains/ens/contracts/ENSRegistryWithFallback.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/@ensdomains/ens/contracts/FIFSRegistrar.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/@ensdomains/ens/contracts/HashRegistrar.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/@ensdomains/ens/contracts/Migrations.sol::1 => pragma solidity >=0.4.24;
../../contracts/node_modules/@ensdomains/ens/contracts/Registrar.sol::1 => pragma solidity >=0.4.24;
../../contracts/node_modules/@ensdomains/ens/contracts/ReverseRegistrar.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/@ensdomains/ens/contracts/TestRegistrar.sol::1 => pragma solidity >=0.4.24;
../../contracts/node_modules/@ensdomains/resolver/contracts/DefaultReverseResolver.sol::1 => pragma solidity >=0.4.25;
../../contracts/node_modules/@ensdomains/resolver/contracts/Migrations.sol::1 => pragma solidity >=0.4.25;
../../contracts/node_modules/@ensdomains/resolver/contracts/OwnedResolver.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/@ensdomains/resolver/contracts/PublicResolver.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/@ensdomains/resolver/contracts/Resolver.sol::1 => pragma solidity >=0.4.25;
../../contracts/node_modules/@ensdomains/resolver/contracts/ResolverBase.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/ABIResolver.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/AddrResolver.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/ContentHashResolver.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/DNSResolver.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/InterfaceResolver.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/NameResolver.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/PubkeyResolver.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/@ensdomains/resolver/contracts/profiles/TextResolver.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/@ensdomains/resolver/test/mocks/dummy.sol::1 => pragma solidity >=0.4.25;
../../contracts/node_modules/@ethereum-waffle/mock-contract/src/Doppelganger.sol::2 => pragma solidity ^0.6.3;
../../contracts/node_modules/@openzeppelin/contracts/access/AccessControl.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/access/AccessControlCrossChain.sol::4 => pragma solidity ^0.8.4;
../../contracts/node_modules/@openzeppelin/contracts/access/AccessControlEnumerable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/access/IAccessControl.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/access/IAccessControlEnumerable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/access/Ownable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/crosschain/CrossChainEnabled.sol::4 => pragma solidity ^0.8.4;
../../contracts/node_modules/@openzeppelin/contracts/crosschain/amb/CrossChainEnabledAMB.sol::4 => pragma solidity ^0.8.4;
../../contracts/node_modules/@openzeppelin/contracts/crosschain/amb/LibAMB.sol::4 => pragma solidity ^0.8.4;
../../contracts/node_modules/@openzeppelin/contracts/crosschain/arbitrum/CrossChainEnabledArbitrumL1.sol::4 => pragma solidity ^0.8.4;
../../contracts/node_modules/@openzeppelin/contracts/crosschain/arbitrum/CrossChainEnabledArbitrumL2.sol::4 => pragma solidity ^0.8.4;
../../contracts/node_modules/@openzeppelin/contracts/crosschain/arbitrum/LibArbitrumL1.sol::4 => pragma solidity ^0.8.4;
../../contracts/node_modules/@openzeppelin/contracts/crosschain/arbitrum/LibArbitrumL2.sol::4 => pragma solidity ^0.8.4;
../../contracts/node_modules/@openzeppelin/contracts/crosschain/errors.sol::4 => pragma solidity ^0.8.4;
../../contracts/node_modules/@openzeppelin/contracts/crosschain/optimism/CrossChainEnabledOptimism.sol::4 => pragma solidity ^0.8.4;
../../contracts/node_modules/@openzeppelin/contracts/crosschain/optimism/LibOptimism.sol::4 => pragma solidity ^0.8.4;
../../contracts/node_modules/@openzeppelin/contracts/crosschain/polygon/CrossChainEnabledPolygonChild.sol::4 => pragma solidity ^0.8.4;
../../contracts/node_modules/@openzeppelin/contracts/finance/PaymentSplitter.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/finance/VestingWallet.sol::3 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/governance/Governor.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/governance/IGovernor.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/governance/compatibility/GovernorCompatibilityBravo.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/governance/compatibility/IGovernorCompatibilityBravo.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorPreventLateQuorum.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorProposalThreshold.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorSettings.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorTimelockCompound.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorVotes.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorVotesComp.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/governance/extensions/IGovernorTimelock.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/governance/utils/IVotes.sol::3 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/governance/utils/Votes.sol::3 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1155.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1155MetadataURI.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1155Receiver.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1271.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1363.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1363Receiver.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1363Spender.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC165.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1820Implementer.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC1820Registry.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC20.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC20Metadata.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC2981.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC3156.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC3156FlashBorrower.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC3156FlashLender.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC4626.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC721.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC721Enumerable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC721Metadata.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC721Receiver.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC777.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC777Recipient.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/interfaces/IERC777Sender.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/interfaces/draft-IERC1822.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/interfaces/draft-IERC2612.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/metatx/ERC2771Context.sol::4 => pragma solidity ^0.8.9;
../../contracts/node_modules/@openzeppelin/contracts/metatx/MinimalForwarder.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/proxy/Clones.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/proxy/ERC1967/ERC1967Upgrade.sol::4 => pragma solidity ^0.8.2;
../../contracts/node_modules/@openzeppelin/contracts/proxy/Proxy.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/proxy/beacon/IBeacon.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/proxy/utils/Initializable.sol::4 => pragma solidity ^0.8.2;
../../contracts/node_modules/@openzeppelin/contracts/proxy/utils/UUPSUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/security/Pausable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/security/PullPayment.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/extensions/IERC1155MetadataURI.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/utils/ERC1155Receiver.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20FlashMint.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20VotesComp.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC20Wrapper.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/extensions/draft-IERC20Permit.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/presets/ERC20PresetFixedSupply.sol::3 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/utils/TokenTimelock.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/extensions/draft-ERC721Votes.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC777/ERC777.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC777/IERC777.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC777/IERC777Recipient.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC777/IERC777Sender.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/ERC777/presets/ERC777PresetFixedSupply.sol::3 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/token/common/ERC2981.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/Address.sol::4 => pragma solidity ^0.8.1;
../../contracts/node_modules/@openzeppelin/contracts/utils/Arrays.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/Base64.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/Checkpoints.sol::3 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/Context.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/Counters.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/Create2.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/Multicall.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/StorageSlot.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/Strings.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/Timers.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/ECDSA.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/MerkleProof.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/escrow/ConditionalEscrow.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/escrow/Escrow.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/escrow/RefundEscrow.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/introspection/ERC165.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/introspection/ERC165Checker.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/introspection/ERC165Storage.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/introspection/ERC1820Implementer.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/introspection/IERC165.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/introspection/IERC1820Implementer.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/introspection/IERC1820Registry.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/math/Math.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeCast.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SignedMath.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/math/SignedSafeMath.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/BitMaps.sol::3 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/DoubleEndedQueue.sol::3 => pragma solidity ^0.8.4;
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableMap.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/utils/structs/EnumerableSet.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/vendor/amb/IAMB.sol::3 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/vendor/arbitrum/IArbSys.sol::3 => pragma solidity >=0.4.21 <0.9.0;
../../contracts/node_modules/@openzeppelin/contracts/vendor/arbitrum/IBridge.sol::20 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/vendor/arbitrum/IInbox.sol::20 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/vendor/arbitrum/IMessageProvider.sol::20 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/vendor/arbitrum/IOutbox.sol::20 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/vendor/compound/ICompoundTimelock.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts/vendor/optimism/ICrossDomainMessenger.sol::3 => pragma solidity >0.5.0 <0.9.0;
../../contracts/node_modules/@openzeppelin/contracts/vendor/polygon/IFxMessageProcessor.sol::3 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlCrossChainUpgradeable.sol::4 => pragma solidity ^0.8.4;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlEnumerableUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/access/IAccessControlEnumerableUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/access/IAccessControlUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/CrossChainEnabledUpgradeable.sol::4 => pragma solidity ^0.8.4;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/amb/CrossChainEnabledAMBUpgradeable.sol::4 => pragma solidity ^0.8.4;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/amb/LibAMBUpgradeable.sol::4 => pragma solidity ^0.8.4;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/arbitrum/CrossChainEnabledArbitrumL1Upgradeable.sol::4 => pragma solidity ^0.8.4;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/arbitrum/CrossChainEnabledArbitrumL2Upgradeable.sol::4 => pragma solidity ^0.8.4;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/arbitrum/LibArbitrumL1Upgradeable.sol::4 => pragma solidity ^0.8.4;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/arbitrum/LibArbitrumL2Upgradeable.sol::4 => pragma solidity ^0.8.4;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/errorsUpgradeable.sol::4 => pragma solidity ^0.8.4;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/optimism/CrossChainEnabledOptimismUpgradeable.sol::4 => pragma solidity ^0.8.4;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/optimism/LibOptimismUpgradeable.sol::4 => pragma solidity ^0.8.4;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/crosschain/polygon/CrossChainEnabledPolygonChildUpgradeable.sol::4 => pragma solidity ^0.8.4;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/finance/PaymentSplitterUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/finance/VestingWalletUpgradeable.sol::3 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/IGovernorUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerWith46MigrationUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/compatibility/GovernorCompatibilityBravoUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/compatibility/IGovernorCompatibilityBravoUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorCountingSimpleUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorPreventLateQuorumUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorProposalThresholdUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorSettingsUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorTimelockCompoundUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorTimelockControlUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorVotesCompUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorVotesQuorumFractionUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/GovernorVotesUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/extensions/IGovernorTimelockUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/utils/IVotesUpgradeable.sol::3 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/utils/VotesUpgradeable.sol::3 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1155MetadataURIUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1155ReceiverUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1155Upgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1271Upgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1363ReceiverUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1363SpenderUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1363Upgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC165Upgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1820ImplementerUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC1820RegistryUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC20MetadataUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC20Upgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC2981Upgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC3156FlashBorrowerUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC3156FlashLenderUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC3156Upgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC4626Upgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC721EnumerableUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC721MetadataUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC721ReceiverUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC721Upgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC777RecipientUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC777SenderUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/IERC777Upgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/draft-IERC1822Upgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/interfaces/draft-IERC2612Upgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/metatx/ERC2771ContextUpgradeable.sol::4 => pragma solidity ^0.8.9;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/metatx/MinimalForwarderUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/ClonesUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/ERC1967/ERC1967UpgradeUpgradeable.sol::4 => pragma solidity ^0.8.2;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/beacon/IBeaconUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol::4 => pragma solidity ^0.8.2;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/security/PullPaymentUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155ReceiverUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/IERC1155Upgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155PausableUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155URIStorageUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/IERC1155MetadataURIUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/presets/ERC1155PresetMinterPauserUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155HolderUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155ReceiverUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20CappedUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20FlashMintUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PausableUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20SnapshotUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesCompUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20VotesUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20WrapperUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC4626Upgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/IERC20MetadataUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/draft-ERC20PermitUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/draft-IERC20PermitUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetFixedSupplyUpgradeable.sol::3 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetMinterPauserUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/utils/TokenTimelockUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/IERC721ReceiverUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721PausableUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721RoyaltyUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721EnumerableUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/IERC721MetadataUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/extensions/draft-ERC721VotesUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/presets/ERC721PresetMinterPauserAutoIdUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/utils/ERC721HolderUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/ERC777Upgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/IERC777RecipientUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/IERC777SenderUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/IERC777Upgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC777/presets/ERC777PresetFixedSupplyUpgradeable.sol::3 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/common/ERC2981Upgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol::4 => pragma solidity ^0.8.1;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/ArraysUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/Base64Upgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/CheckpointsUpgradeable.sol::3 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/ContextUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/Create2Upgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/MulticallUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/StorageSlotUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/TimersUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/MerkleProofUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/SignatureCheckerUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/escrow/ConditionalEscrowUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/escrow/EscrowUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/escrow/RefundEscrowUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165CheckerUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165StorageUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC165Upgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/ERC1820ImplementerUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/IERC165Upgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/IERC1820ImplementerUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/introspection/IERC1820RegistryUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/MathUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeCastUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SignedMathUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/math/SignedSafeMathUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/BitMapsUpgradeable.sol::3 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/DoubleEndedQueueUpgradeable.sol::3 => pragma solidity ^0.8.4;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableMapUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/utils/structs/EnumerableSetUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/vendor/amb/IAMBUpgradeable.sol::3 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/vendor/arbitrum/IArbSysUpgradeable.sol::3 => pragma solidity >=0.4.21 <0.9.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/vendor/arbitrum/IBridgeUpgradeable.sol::20 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/vendor/arbitrum/IInboxUpgradeable.sol::20 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/vendor/arbitrum/IMessageProviderUpgradeable.sol::20 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/vendor/arbitrum/IOutboxUpgradeable.sol::20 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/vendor/compound/ICompoundTimelockUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/vendor/optimism/ICrossDomainMessengerUpgradeable.sol::3 => pragma solidity >0.5.0 <0.9.0;
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/vendor/polygon/IFxMessageProcessorUpgradeable.sol::3 => pragma solidity ^0.8.0;
../../contracts/node_modules/eth-gas-reporter/mock/contracts/ConvertLib.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/eth-gas-reporter/mock/contracts/EncoderV2.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/eth-gas-reporter/mock/contracts/EtherRouter/EtherRouter.sol::15 => pragma solidity ^0.5.0;
../../contracts/node_modules/eth-gas-reporter/mock/contracts/EtherRouter/Factory.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/eth-gas-reporter/mock/contracts/EtherRouter/Resolver.sol::15 => pragma solidity ^0.5.0;
../../contracts/node_modules/eth-gas-reporter/mock/contracts/EtherRouter/VersionA.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/eth-gas-reporter/mock/contracts/EtherRouter/VersionB.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/eth-gas-reporter/mock/contracts/MetaCoin.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/eth-gas-reporter/mock/contracts/Migrations.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/eth-gas-reporter/mock/contracts/MultiContractFile.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/eth-gas-reporter/mock/contracts/Undeployed.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/eth-gas-reporter/mock/contracts/VariableConstructor.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/eth-gas-reporter/mock/contracts/VariableCosts.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/eth-gas-reporter/mock/contracts/Wallets/Wallet.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/eth-gas-reporter/mock/test/TestMetacoin.sol::1 => pragma solidity ^0.5.0;
../../contracts/node_modules/hardhat/console.sol::2 => pragma solidity >= 0.4.22 <0.9.0;
../../contracts/node_modules/hardhat/sample-projects/javascript/contracts/Lock.sol::2 => pragma solidity ^0.8.9;
../../contracts/node_modules/hardhat/sample-projects/typescript/contracts/Lock.sol::2 => pragma solidity ^0.8.9;
../../contracts/node_modules/hardhat-deploy/solc_0.6/proxy/Proxied.sol::2 => pragma solidity ^0.6.0;
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/UsingDiamondOwner.sol::2 => pragma solidity ^0.7.0;
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/interfaces/IDiamondCut.sol::2 => pragma solidity ^0.7.6;
../../contracts/node_modules/hardhat-deploy/solc_0.7/diamond/libraries/LibDiamond.sol::2 => pragma solidity ^0.7.6;
../../contracts/node_modules/hardhat-deploy/solc_0.7/proxy/Proxied.sol::2 => pragma solidity ^0.7.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/Diamond.sol::2 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/UsingDiamondOwner.sol::2 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/facets/DiamondCutFacet.sol::2 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/facets/DiamondLoupeFacet.sol::2 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/facets/DiamondLoupeFacetWithoutSupportsInterface.sol::2 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/facets/OwnershipFacet.sol::2 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/initializers/DiamondERC165Init.sol::2 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/interfaces/IDiamondCut.sol::2 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/interfaces/IDiamondLoupe.sol::2 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/interfaces/IERC165.sol::2 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/interfaces/IERC173.sol::2 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/diamond/libraries/LibDiamond.sol::2 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/access/Ownable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/interfaces/draft-IERC1822.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/Clones.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/ERC1967/ERC1967Proxy.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/ERC1967/ERC1967Upgrade.sol::4 => pragma solidity ^0.8.2;
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/Proxy.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/beacon/BeaconProxy.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/beacon/IBeacon.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/beacon/UpgradeableBeacon.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/transparent/ProxyAdmin.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/transparent/TransparentUpgradeableProxy.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/utils/Initializable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/proxy/utils/UUPSUpgradeable.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/Address.sol::4 => pragma solidity ^0.8.1;
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/Context.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/StorageSlot.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/introspection/ERC165.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/introspection/ERC165Checker.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/introspection/ERC165Storage.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/openzeppelin/utils/introspection/IERC165.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/proxy/EIP173Proxy.sol::2 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/proxy/EIP173ProxyWithReceive.sol::2 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/proxy/OptimizedTransparentUpgradeableProxy.sol::4 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/proxy/Proxied.sol::2 => pragma solidity ^0.8.0;
../../contracts/node_modules/hardhat-deploy/solc_0.8/proxy/Proxy.sol::2 => pragma solidity ^0.8.0;
../../contracts/node_modules/solady/src/Milady.sol::2 => pragma solidity ^0.8.4;
../../contracts/node_modules/solady/src/auth/Ownable.sol::2 => pragma solidity ^0.8.4;
../../contracts/node_modules/solady/src/auth/OwnableRoles.sol::2 => pragma solidity ^0.8.4;
../../contracts/node_modules/solady/src/utils/Base64.sol::2 => pragma solidity ^0.8.4;
../../contracts/node_modules/solady/src/utils/CREATE3.sol::2 => pragma solidity ^0.8.4;
../../contracts/node_modules/solady/src/utils/Clone.sol::2 => pragma solidity ^0.8.4;
../../contracts/node_modules/solady/src/utils/DateTimeLib.sol::2 => pragma solidity ^0.8.4;
../../contracts/node_modules/solady/src/utils/DynamicBufferLib.sol::2 => pragma solidity ^0.8.4;
../../contracts/node_modules/solady/src/utils/ECDSA.sol::2 => pragma solidity ^0.8.4;
../../contracts/node_modules/solady/src/utils/EIP712.sol::2 => pragma solidity ^0.8.4;
../../contracts/node_modules/solady/src/utils/FixedPointMathLib.sol::2 => pragma solidity ^0.8.4;
../../contracts/node_modules/solady/src/utils/LibBit.sol::2 => pragma solidity ^0.8.4;
../../contracts/node_modules/solady/src/utils/LibBitmap.sol::2 => pragma solidity ^0.8.4;
../../contracts/node_modules/solady/src/utils/LibClone.sol::2 => pragma solidity ^0.8.4;
../../contracts/node_modules/solady/src/utils/LibMap.sol::2 => pragma solidity ^0.8.4;
../../contracts/node_modules/solady/src/utils/LibPRNG.sol::2 => pragma solidity ^0.8.4;
../../contracts/node_modules/solady/src/utils/LibRLP.sol::2 => pragma solidity ^0.8.4;
../../contracts/node_modules/solady/src/utils/LibSort.sol::2 => pragma solidity ^0.8.4;
../../contracts/node_modules/solady/src/utils/LibString.sol::2 => pragma solidity ^0.8.4;
../../contracts/node_modules/solady/src/utils/MerkleProofLib.sol::2 => pragma solidity ^0.8.4;
../../contracts/node_modules/solady/src/utils/MinHeapLib.sol::2 => pragma solidity ^0.8.4;
../../contracts/node_modules/solady/src/utils/Multicallable.sol::2 => pragma solidity ^0.8.4;
../../contracts/node_modules/solady/src/utils/SSTORE2.sol::2 => pragma solidity ^0.8.4;
../../contracts/node_modules/solady/src/utils/SafeCastLib.sol::2 => pragma solidity ^0.8.4;
../../contracts/node_modules/solady/src/utils/SafeTransferLib.sol::2 => pragma solidity ^0.8.4;
../../contracts/node_modules/solady/src/utils/SignatureCheckerLib.sol::2 => pragma solidity ^0.8.4;
../../contracts/node_modules/solmate/src/auth/Auth.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/auth/Owned.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/auth/authorities/MultiRolesAuthority.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/auth/authorities/RolesAuthority.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/mixins/ERC4626.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/test/LibString.t.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/test/MerkleProofLib.t.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/test/SignedWadMath.t.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/test/utils/DSInvariantTest.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/test/utils/DSTestPlus.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/test/utils/Hevm.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/test/utils/mocks/MockAuthChild.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/test/utils/mocks/MockAuthority.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/test/utils/mocks/MockERC1155.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/test/utils/mocks/MockERC20.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/test/utils/mocks/MockERC4626.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/test/utils/mocks/MockERC721.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/test/utils/mocks/MockOwned.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/test/utils/weird-tokens/MissingReturnToken.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/test/utils/weird-tokens/ReturnsFalseToken.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/test/utils/weird-tokens/ReturnsGarbageToken.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/test/utils/weird-tokens/ReturnsTooLittleToken.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/test/utils/weird-tokens/ReturnsTooMuchToken.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/test/utils/weird-tokens/ReturnsTwoToken.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/test/utils/weird-tokens/RevertingToken.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/tokens/ERC1155.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/tokens/ERC20.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/tokens/ERC721.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/tokens/WETH.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/utils/Bytes32AddressLib.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/utils/CREATE3.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/utils/FixedPointMathLib.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/utils/LibString.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/utils/MerkleProofLib.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/utils/ReentrancyGuard.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/utils/SSTORE2.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/utils/SafeCastLib.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/utils/SafeTransferLib.sol::2 => pragma solidity >=0.8.0;
../../contracts/node_modules/solmate/src/utils/SignedWadMath.sol::2 => pragma solidity >=0.8.0;
```
#### Tools used
[c4udit](https://github.com/byterocket/c4udit)

### Do not use Deprecated Library Functions

#### Impact
Issue Information: [L005](https://github.com/byterocket/c4-common-issues/blob/main/2-Low-Risk.md#l005---do-not-use-deprecated-library-functions)

#### Findings:
```
../../contracts/node_modules/@openzeppelin/contracts/access/AccessControl.sol::205 => function _setupRole(bytes32 role, address account) internal virtual {
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::87 => _setupRole(TIMELOCK_ADMIN_ROLE, _msgSender());
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::88 => _setupRole(TIMELOCK_ADMIN_ROLE, address(this));
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::92 => _setupRole(PROPOSER_ROLE, proposers[i]);
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::93 => _setupRole(CANCELLER_ROLE, proposers[i]);
../../contracts/node_modules/@openzeppelin/contracts/governance/TimelockController.sol::98 => _setupRole(EXECUTOR_ROLE, executors[i]);
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol::37 => _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol::39 => _setupRole(MINTER_ROLE, _msgSender());
../../contracts/node_modules/@openzeppelin/contracts/token/ERC1155/presets/ERC1155PresetMinterPauser.sol::40 => _setupRole(PAUSER_ROLE, _msgSender());
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol::39 => _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol::41 => _setupRole(MINTER_ROLE, _msgSender());
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol::42 => _setupRole(PAUSER_ROLE, _msgSender());
../../contracts/node_modules/@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol::46 => function safeApprove(
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol::61 => _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol::63 => _setupRole(MINTER_ROLE, _msgSender());
../../contracts/node_modules/@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol::64 => _setupRole(PAUSER_ROLE, _msgSender());
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol::211 => function _setupRole(bytes32 role, address account) internal virtual {
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::96 => _setupRole(TIMELOCK_ADMIN_ROLE, _msgSender());
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::97 => _setupRole(TIMELOCK_ADMIN_ROLE, address(this));
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::101 => _setupRole(PROPOSER_ROLE, proposers[i]);
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::102 => _setupRole(CANCELLER_ROLE, proposers[i]);
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/governance/TimelockControllerUpgradeable.sol::107 => _setupRole(EXECUTOR_ROLE, executors[i]);
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/presets/ERC1155PresetMinterPauserUpgradeable.sol::47 => _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/presets/ERC1155PresetMinterPauserUpgradeable.sol::49 => _setupRole(MINTER_ROLE, _msgSender());
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC1155/presets/ERC1155PresetMinterPauserUpgradeable.sol::50 => _setupRole(PAUSER_ROLE, _msgSender());
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetMinterPauserUpgradeable.sol::49 => _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetMinterPauserUpgradeable.sol::51 => _setupRole(MINTER_ROLE, _msgSender());
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/presets/ERC20PresetMinterPauserUpgradeable.sol::52 => _setupRole(PAUSER_ROLE, _msgSender());
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol::46 => function safeApprove(
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/presets/ERC721PresetMinterPauserAutoIdUpgradeable.sol::79 => _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/presets/ERC721PresetMinterPauserAutoIdUpgradeable.sol::81 => _setupRole(MINTER_ROLE, _msgSender());
../../contracts/node_modules/@openzeppelin/contracts-upgradeable/token/ERC721/presets/ERC721PresetMinterPauserAutoIdUpgradeable.sol::82 => _setupRole(PAUSER_ROLE, _msgSender());
../../contracts/node_modules/solady/src/utils/SafeTransferLib.sol::308 => function safeApprove(address token, address to, uint256 amount) internal {
../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol::87 => SafeTransferLib.safeApprove(ERC20(address(0xBADBEEF)), address(0xBEEF), 1e18);
../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol::382 => SafeTransferLib.safeApprove(ERC20(nonContract), to, amount);
../../contracts/node_modules/solmate/src/test/SafeTransferLib.t.sol::589 => SafeTransferLib.safeApprove(ERC20(address(token)), to, amount);
../../contracts/node_modules/solmate/src/utils/SafeTransferLib.sol::97 => function safeApprove(
```
#### Tools used
[c4udit](https://github.com/byterocket/c4udit)

