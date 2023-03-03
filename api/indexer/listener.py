import time

from .extractor import *
from .loader import *

from django.conf import settings

from organization.models import Organization

INIT_BLOCK = 39864057

POLL_INTERVAL = 5
WARNING_BARRIER = 20000
INIT_BLOCK_BUFFER = 20
LOG_SIZE = 2000

class Backfill:
    def __init__(self):
        self.extractor = Extractor()
        self.loader = Loader()
        self.batches = []

    def etl(self, extracting_obj, abi, topics, temp_from_block=None, temp_to_block=None):
        while True:
            contracts = extracting_obj

            to_block = temp_to_block
            if not temp_to_block:
                to_block = w3.eth.blockNumber

            from_block = temp_from_block
            if not temp_from_block:
                from_block = to_block - INIT_BLOCK_BUFFER

            if not isinstance(contracts, list):
                contracts = (extracting_obj.objects
                    .filter(active=True)
                    .values_list('ethereum_address', flat=True))

            BLOCK_BUFFER = LOG_SIZE if to_block - from_block > LOG_SIZE else to_block - from_block
            BLOCK_BUFFER = 1 if BLOCK_BUFFER == 0 else BLOCK_BUFFER

            self.batches = [[i, i + BLOCK_BUFFER] for i in range(from_block, to_block, BLOCK_BUFFER)]

            for batch in self.batches:
                events = self.extractor.extract(
                    contracts, 
                    abi, 
                    topics,
                    batch[0],
                    batch[1],
                )

                if len(events) == 0:
                    time.sleep(POLL_INTERVAL)
                    continue

                self.loader.load(events)

            if not isinstance(extracting_obj, list):
                contract_objs = (extracting_obj.objects
                    .filter(ethereum_address__in=contracts)
                    .update(last_block=batch[1]))

                for obj in contract_objs:
                    obj.save()

            if temp_to_block:
                return

            time.sleep(POLL_INTERVAL)

    def backfill_factories(self):
        self.etl([settings.FACTORY_ADDRESS], 
            settings.FACTORY_ABI_FULL, 
            settings.FACTORY_TOPIC_SIGNATURES, 
            temp_from_block=INIT_BLOCK)

    def backfill_organizations(self):
        self.etl(Organization, 
            settings.ORGANIZATION_ABI_FULL, 
            settings.ORGANIZATION_TOPIC_SIGNATURES, 
            temp_from_block=INIT_BLOCK)

    def listen_for_factories(self):
        self.etl([settings.FACTORY_ADDRESS], 
            settings.FACTORY_ABI_FULL, 
            settings.FACTORY_TOPIC_SIGNATURES)
        
    def listen_for_organizations(self):
        self.etl(Organization, 
            settings.ORGANIZATION_ABI_FULL, 
            settings.ORGANIZATION_TOPIC_SIGNATURES)
