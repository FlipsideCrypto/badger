import os
import django

os.environ['DJANGO_SETTINGS_MODULE'] = 'api.settings'
django.setup()

from indexer.backfill.transformer import Transformer
from indexer.backfill.loader import Loader
from indexer.backfill.extractor import Extractor
from indexer.backfill.abis import (
    FACTORY as FACTORY_ABI,
    ORGANIZATION as ORGANIZATION_ABI,
)
from job.models import ContractListener
from organization.models import Organization

FACTORY_EVENTS = [
    "event OrganizationCreated(address indexed,address indexed,address indexed)",
    #   "event OwnershipTransferred(address indexed,address indexed)",
    "event VersionUpdated(address indexed,address indexed,bytes32 indexed,uint256,bool)",
]

ORGANIZATION_EVENTS = [
    "event BadgeUpdated(uint256 indexed,uint256 indexed,bytes32 indexed,uint256)",
    "event BadgeForfeited(uint256 indexed,uint256 indexed,bytes indexed)",
    "event DelegateUpdated(uint256 indexed,address indexed,bool indexed)",
    "event OrganizationUpdated(string)",
    "event OwnershipTransferred(address indexed,address indexed)",
    "event PaymentTokenDeposited(uint256 indexed,address indexed,uint256 indexed)",
    "event TransferBatch(address indexed,address indexed,address indexed,uint256[],uint256[])",
    "event TransferSingle(address indexed,address indexed,address indexed,uint256,uint256)",
    "event URI(string,uint256 indexed)",
]

# TODO: Deploy contracts with new version of contracts

extractor = Extractor()
transformer = Transformer()
loader = Loader()

START_BLOCK = 0


def etl(CONTRACTS, ABI, CONTRACT_EVENTS, START_BLOCK):
    events = extractor.handle_contracts(
        CONTRACTS, ABI, CONTRACT_EVENTS, START_BLOCK)
    events = transformer.handle_events(events)
    event_responses = loader.handle_events(events)

    for response in event_responses:
        print(response)

    return event_responses


PROVIDERS = {
    "polygon": "https://polygon-mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
}

FACTORIES = [
    [factory.chain, factory.ethereum_address] for factory in ContractListener.objects.filter(event_abi="FACTORY")]

# Handle the factory
event_responses = etl(FACTORIES, FACTORY_ABI, FACTORY_EVENTS, START_BLOCK)

ORGANIZATIONS = [
    ["polygon", organization.ethereum_address] for organization in Organization.objects.filter(
        is_active=True, 
        updated__gte=django.utils.timezone.now() - django.utils.timezone.timedelta(days=30)
    )
]

# Handle the organizations
event_responses = etl(ORGANIZATIONS, ORGANIZATION_ABI,
                      ORGANIZATION_EVENTS, START_BLOCK)
