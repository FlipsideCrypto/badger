import sys
import os
import django

os.environ['DJANGO_SETTINGS_MODULE'] = 'api.settings'
django.setup()

from organization.models import Organization

from indexer.backfill.abis import (
    FACTORY as FACTORY_ABI,
    ORGANIZATION as ORGANIZATION_ABI,
)

from indexer.backfill.extractor import Extractor
from indexer.backfill.loader import Loader
from indexer.backfill.transformer import Transformer

# primary implementation: 0xb307DE89e19D7172d5DB09C9A89e9b6aa35637c5
# factory: 0xeF2FE84D203AcF3eC791f6b7ee3bA5D6493912D4

FACTORY_EVENTS = [
    "OrganizationCreated(address indexed,address indexed,address indexed)",
    # "OwnershipTransferred(address indexed,address indexed)",
    # "VersionUpdated(address indexed,tuple(address,bytes32,uint256,bool) indexed)",
]

ORGANIZATION_EVENTS = [
    "BadgeUpdated(tuple(uint256,string,tuple(bytes32,uint256)) indexed)",
    "BadgeForfeited(tuple(uint256,string,tuple(bytes32,uint256)) indexed,uint256 indexed,bytes indexed)",
    "DelegateUpdated(tuple(uint256,string,tuple(bytes32,uint256)) indexed,address indexed,bool indexed)"
    "OrganizationUpdated(string)",
    "OwnershipTransferred(address indexed,address indexed)",
    "PaymentTokenDeposited(tuple(uint256,string,tuple(bytes32,uint256)) indexed,address indexed,uint256 indexed)",
    "TransferBatch(address indexed,address indexed,address indexed,uint256[],uint256[])",
    "TransferSingle(address indexed,address indexed,address indexed,uint256,uint256)",
    "URI(string,uint256 indexed)",
]

extractor = Extractor()
transformer = Transformer()
loader = Loader()

start_block = 0

FACTORIES = [
    ["polygon", "0xeF2FE84D203AcF3eC791f6b7ee3bA5D6493912D4"],
]

events = extractor.handle_contracts(FACTORIES, FACTORY_ABI, FACTORY_EVENTS, start_block)

ORGANIZATIONS = [
    ["polygon", organization.ethereum_address] for organization in Organization.objects.filter(is_active=True)
]

events = extractor.handle_contracts(ORGANIZATIONS, ORGANIZATION_ABI, ORGANIZATION_EVENTS, start_block)

events = transformer.handle_events(events)

event_responses = loader.handle_events(events)

for response in event_responses:
    print(response)