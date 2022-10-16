import json

from indexer.backfill.abis import FACTORY as FACTORY_ABI

from indexer.backfill.extractor import Extractor
from indexer.backfill.loader import Loader
from indexer.backfill.transformer import Transformer

# implementation 0x2011E69C17D5C43311a9eF974b3B99024cf0Be4E
# factory 0x13798FecB559E4a49B2574c8b883552778935337

FACTORY_EVENTS = [
    "OrganizationCreated(address indexed,address indexed,address indexed)",
    "OwnershipTransferred(address indexed,address indexed)",
    # "VersionUpdated(address indexed,tuple(address,bytes32,uint256,bool) indexed)",
]

ORGANIZATION_EVENTS = [
    "ApprovalForAll(address indexed,address indexed,bool)",
    "BadgeForfeited(tuple(uint256,string,tuple(bytes32,uint256)) indexed,uint256 indexed,bytes indexed)",
    "BadgeUpdated(tuple(uint256,string,tuple(bytes32,uint256)) indexed)",
    "DelegateUpdated(tuple(uint256,string,tuple(bytes32,uint256)) indexed,address indexed,bool indexed)",
    "Initialized(uint8)",
    "OrganizationUpdated(string)",
    "OwnershipTransferred(address indexed,address indexed)",
    "PaymentTokenDeposited(tuple(uint256,string,tuple(bytes32,uint256)) indexed,address indexed,uint256 indexed)",
    "TransferBatch(address indexed,address indexed,address indexed,uint256[],uint256[])",
    "TransferSingle(address indexed,address indexed,address indexed,uint256,uint256)",
    "URI(string,uint256 indexed)",
]

# for every OrganizationCreated, need to create an organization in the database
# for every OwnershipTransferred, need to update the owner of the organization in the database

# for every OrganizationUpdated, need to update recall the details of the organization in the database

extractor = Extractor()
transformer = Transformer()
loader = Loader()

start_block = 0

FACTORIES = [
    ["polygon", "0x13798FecB559E4a49B2574c8b883552778935337"],
]

events = extractor.handle_contracts(FACTORIES, FACTORY_ABI, FACTORY_EVENTS, start_block)
events = transformer.handle_events(events)
event_responses = loader.handle_events(events)

for response in event_responses:
    print(response)
