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
        # Build the list of contracts to get event updates for
        contracts = [[
            contract.chain.lower(), 
            contract.ethereum_address,
            contract.last_block
        ] for contract in queryset if contract.ethereum_address]

        print(contracts, abi, filters)

        return

        # Get the events for the QuerySet of contracts
        [events, last_block] = self.extractor.handle_contracts(contracts, abi, filters)

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
        print("Backfill organizations")
        # for version in settings.VERSIONS:
        #     print('running version  ', version)
        #     return self.etl(
        #         version,
        #         Organization.objects.filter(
        #             is_active=True,
        #             version=version, 
        #             updated__gte=django.utils.timezone.now() - django.utils.timezone.timedelta(days=30)
        #         ), 
        #         ORGANIZATION_ABI[version], 
        #         ORGANIZATION_EVENTS[version]
        #     )
