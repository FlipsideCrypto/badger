import time

from .extractor import *
from .loader import *

from django.conf import settings

from job.models import ContractListener
from organization.models import Organization

POLL_INTERVAL = 5

class Backfill:
    def __init__(self):
        self.extractor = Extractor()
        self.loader = Loader()

    def etl(self, queryset, abi, topics):
        while True:
            contract_addresses = queryset.values_list('ethereum_address', flat=True)

            # last_block = w3.eth.blockNumber

            events = w3.eth.getLogs({
                'fromBlock': 39865246,
                'toBlock': 39865246
            })

            events = self.extractor.extract(
                contract_addresses, 
                abi, 
                topics, 
                events
            )

            print(events)

            # Sleep for a bit before we check again
            time.sleep(POLL_INTERVAL)

            # If there are events, then we need to check if they are in the range of the contracts
            # that we are checking. If they are, then we need to extract them and then transform
            # and load them.
            # for event in events:

            continue

            # Ignore the below for now. This is the old way of doing things.

            # This is equivalent to filter.get_all_entries() but we have multiple filters to check
            # so we we have to iterate through them and then surface an already packaged list of events
            # [events, last_block] = self.extractor.handle_contracts(contracts, abi, filters)

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

            time.sleep(POLL_INTERVAL)

        return event_responses

    def backfill_factories(self):
        self.etl(
            ContractListener.objects.filter(is_active=True), 
            settings.FACTORY_ABI_FULL, settings.FACTORY_TOPIC_SIGNATURES
        )
    
    def backfill_organizations(self):
        self.etl(
            Organization.objects.filter(is_active=True), 
            settings.ORGANIZATION_ABI_FULL, settings.ORGANIZATION_EVENTS, settings.ORGANIZATION_TOPIC_SIGNATURES
        )
