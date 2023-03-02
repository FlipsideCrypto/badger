import time

from .extractor import *
from .loader import *

from django.conf import settings

from organization.models import Organization

POLL_INTERVAL = 5

class Backfill:
    def __init__(self):
        self.extractor = Extractor()
        self.loader = Loader()

    def etl(self, extracting_obj, abi, topics, from_block=None, to_block=None):
        while True:
            contracts = extracting_obj

            if not isinstance(contracts, list):
                contracts = extracting_obj.objects.filter(active=True).values_list('ethereum_address', flat=True)

            events = self.extractor.extract(
                contracts, 
                abi, 
                topics,
                from_block,
                to_block
            )

            print(events)

            if not to_block:
                return

            # Sleep for a bit before we check again
            time.sleep(POLL_INTERVAL)

            # If there are events, then we need to check if they are in the range of the contracts
            # that we are checking. If they are, then we need to extract them and then transform
            # and load them.

            # temporary block to keep things from running below
            continue

            event_responses = self.loader.handle_events(events)

            # refresh queryset from database
            queryset = queryset.model.objects.filter(pk__in=[contract.pk for contract in queryset])

            for contract in queryset:
                contract.last_block = last_block
                contract.save()

            if settings.DEBUG:
                for response in event_responses:
                    print(response)

    
    def backfill_factories(self):
        self.etl(
            [settings.FACTORY_ADDRESS], 
            settings.FACTORY_ABI_FULL, 
            settings.FACTORY_TOPIC_SIGNATURES,
            0,
            w3.eth.blockNumber
        )
   
    def backfill_organizations(self):
        self.etl(
            Organization, 
            settings.ORGANIZATION_ABI_FULL, 
            settings.ORGANIZATION_TOPIC_SIGNATURES,
            0,
            w3.eth.blockNumber
        )

    def listen_for_factories(self):
        self.etl(
            [settings.FACTORY_ADDRESS], 
            settings.FACTORY_ABI_FULL, 
            settings.FACTORY_TOPIC_SIGNATURES,
            39865246,
            39865246
        )
        
    def listen_for_organizations(self):
        self.etl(
            Organization, 
            settings.ORGANIZATION_ABI_FULL, 
            settings.ORGANIZATION_TOPIC_SIGNATURES
        )
