import os
import django

os.environ['DJANGO_SETTINGS_MODULE'] = 'api.settings'
django.setup()

from django.conf import settings

from indexer.backfill.transformer import Transformer
from indexer.backfill.loader import Loader
from indexer.backfill.extractor import Extractor

from job.models import ContractListener
from organization.models import Organization

# latest implementation: 0xC79F29C8B02bA02EDb71c3DFe93ef6D6fA7ab2F0
# latest factory: 0x218B3C623FfB9c5E4DBb9142E6Ca6f6559F1c2D6

FACTORY_TOPICS = {
    "OrganizationCreated(address,address,address)": "0x39e4fba473bee8eaa003d03e0707c05d0feae5f9b0e3d1f6b8566694c6ffc786",
    # "OwnershipTransferred(address,address)": "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0",
    "VersionUpdated(address,address,bytes32,uint256,bool)": "0xb14f2d8a402e52b054be554b7dd175a2ee8a7523bb9fb11eea3c5aaf8d217bd3"
}

ORGANIZATION_TOPICS = {
    "BadgeForfeited(uint256,uint256,bytes)": "0x8c66d33ac2875bba4e7afe0dd95674855e84575b2f7c00fe759ad255a61d3772",
    "BadgeUpdated(uint256,uint256,bytes32,uint256)": "0x0c01f9253a7da136fa4ec32d7420a80c0f7fd75702b59efb47ce6abebd74fcb4",
    "DelegateUpdated(uint256,address,bool)": "0xe2184a5c34fc367e1d5927e4b0effa876585b9371c675a9572b9a64b4bd3a114",
    "OrganizationUpdated(string)": "0xeee606ebce70b7433a244f41b4929cb0d7274e17bc07c07a110190ed3f0ee217",
    "OwnershipTransferred(address,address)": "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0",
    "PaymentTokenDeposited(uint256,address,uint256)": "0xf263771f5ac2baa218537ef3cad825bf157b67262d57e3d6b28fa1de0dc30bd7",
    "TransferBatch(address,address,address,uint256[],uint256[])": "0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb",
    "TransferSingle(address,address,address,uint256,uint256)": "0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62",
    "URI(string,uint256)": "0x6bb7ff708619ba0610cba295a58592e0451dee2622938c8755667688daf3529b",
}

extractor = Extractor()
transformer = Transformer()
loader = Loader()

class Backfill:
    def etl(self, contracts, abi, topics):
        events = extractor.handle_contracts(contracts, abi, topics)
        events = transformer.handle_events(events)
        event_responses = loader.handle_events(events)

        return event_responses

    def handle_factories(self):
        FACTORIES = [
            [
                factory.chain.lower(), 
                factory.ethereum_address, 
                factory.last_block
            ] for factory in ContractListener.objects.all()]

        # Handle the factory
        return self.etl(
            FACTORIES, 
            settings.FACTORY_ABI, 
            FACTORY_TOPICS
        )

    def handle_organizations(self):
        ORGANIZATIONS = [
            [
                organization.chain.lower(), 
                organization.ethereum_address, 
                organization.last_block
            ] for organization in Organization.objects.filter(
                is_active=True, 
                updated__gte=django.utils.timezone.now() - django.utils.timezone.timedelta(days=30)
            )
        ]

        # Handle the organizations
        return self.etl(
            ORGANIZATIONS, 
            settings.ORGANIZATION_ABI, 
            ORGANIZATION_TOPICS
        )

if __name__ == "__main__":
    backfill = Backfill()
    backfill.handle_factories()
    # backfill.handle_organizations()