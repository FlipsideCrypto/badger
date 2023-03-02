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

    def etl(self, extracting_obj, abi, topics, from_block=None, temp_to_block=None):
        while True:
            contracts = extracting_obj

            to_block = temp_to_block
            if not temp_to_block:
                to_block = w3.eth.blockNumber

            if not isinstance(contracts, list):
                contracts = extracting_obj.objects.filter(active=True, last_block__lte=to_block).values_list('ethereum_address', flat=True)
                
            events = self.extractor.extract(
                contracts, 
                abi, 
                topics,
                from_block,
                to_block
            )

            if len(events) == 0:
                continue

            print(events)

            event_responses = self.loader.load(events)

            print(event_responses)

            if not isinstance(extracting_obj, list):
                extracting_obj.objects.filter(ethereum_address__in=contracts).update(last_block=to_block)

            if not to_block:
                return

            time.sleep(POLL_INTERVAL)

    def backfill_factories(self):
        self.etl(
            [settings.FACTORY_ADDRESS], 
            settings.FACTORY_ABI_FULL, 
            settings.FACTORY_TOPIC_SIGNATURES,
            0
        )
   
    def backfill_organizations(self):
        self.etl(
            Organization, 
            settings.ORGANIZATION_ABI_FULL, 
            settings.ORGANIZATION_TOPIC_SIGNATURES,
            0
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
