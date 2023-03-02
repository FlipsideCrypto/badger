from .extractor import *
from .transformer import *
from .loader import *

from django.conf import settings

from job.models import ContractListener
from organization.models import Organization

class Backfill:
    def __init__(self):
        self.extractor = Extractor()
        self.transformer = Transformer()
        self.loader = Loader()

    def etl(self, queryset, abi, filters):
        contracts = [[
            contract.chain.lower(), 
            contract.ethereum_address,
            contract.last_block
        ] for contract in queryset if contract.ethereum_address]

        # Get the events for the QuerySet of contracts
        [events, last_block] = self.extractor.handle_contracts(contracts, abi, filters)

        return

        events = self.transformer.handle_events(events)
        event_responses = self.loader.handle_events(events)

        # refresh queryset from database
        queryset = queryset.model.objects.filter(pk__in=[contract.pk for contract in queryset])

        for contract in queryset:
            contract.last_block = last_block
            contract.save()

        if settings.DEBUG:
            for response in event_responses:
                print(response)

        return event_responses

    def backfill_factories(self):
        return self.etl(
            ContractListener.objects.filter(is_active=True), 
            settings.FACTORY_ABI, settings.FACTORY_EVENTS
        )
    
    def backfill_organizations(self):
        return self.etl(
            Organization.objects.filter(is_active=True), 
            settings.ORGANIZATION_ABI, settings.ORGANIZATION_EVENTS
        )
