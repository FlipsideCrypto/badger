import concurrent.futures
import time

from django.conf import settings

from organization.models import Organization
from utils.web3 import w3

from .extractor import Extractor
from .loader import Loader

class Listener:
    def __init__(self):
        self.extractor = Extractor()
        self.loader = Loader()
        self.running = True

    def _etl(self, contracts, abi, topics, batch):
        print(f'{batch[0]} -> {batch[1]}')

        events = self.extractor.extract(
            contracts, 
            abi, 
            topics,
            batch[0],
            batch[1],
        )

        if len(events) == 0:
            return 
    
        self.loader.load(events)

    def etl(self, extracting_obj, abi, topics, temp_from_block=None, temp_to_block=None):
        while self.running:
            contracts = extracting_obj

            to_block = temp_to_block
            if not temp_to_block:
                to_block = w3.eth.blockNumber

            from_block = temp_from_block
            if not temp_from_block:
                from_block = 0 if to_block - settings.LISTENER_INIT_BLOCK_BUFFER < 0 else to_block - settings.LISTENER_INIT_BLOCK_BUFFER

            qs = None
            if not isinstance(contracts, list):
                qs = contracts.objects.filter(is_active=True, chain_id=settings.LISTENER_CHAIN_ID)
                contracts = qs.values_list('ethereum_address', flat=True)

            BLOCK_BUFFER = settings.LISTENER_LOG_SIZE if to_block - from_block > settings.LISTENER_LOG_SIZE else to_block - from_block
            BLOCK_BUFFER = to_block - from_block if BLOCK_BUFFER > to_block - from_block else BLOCK_BUFFER
            BLOCK_BUFFER = 1 if BLOCK_BUFFER == 0 else BLOCK_BUFFER

            batches = [[i, i + BLOCK_BUFFER] for i in range(from_block, to_block, BLOCK_BUFFER)]
            workers = len(batches) if len(batches) < 50 else 50

            try:
                with concurrent.futures.ProcessPoolExecutor(max_workers=workers) as pool:
                    futures = [pool.submit(self._etl, contracts, abi, topics, batch) for batch in batches]

                    for future in futures:
                        print([future._state for future in futures])

                        if future.cancelled():
                            continue
                        try:
                            n = future.result()
                        except Exception as e:
                            print("Listener error: ", e)
                            pool.shutdown(wait=False, cancel_futures=True)

                if not isinstance(extracting_obj, list):
                    qs.update(last_block=to_block)

                    for obj in qs:
                        obj.save()

            except Exception as e:
                print("Listener error: ", e)

                self.running = False

            if temp_to_block:
                return

            time.sleep(settings.LISTENER_POLL_INTERVAL)

    def backfill_factories(self):
        print("Backfilling factories...")
        self.etl([settings.FACTORY_ADDRESS], 
            settings.FACTORY_ABI, 
            settings.FACTORY_TOPIC_SIGNATURES, 
            temp_from_block=settings.LISTENER_INIT_BLOCK,
            temp_to_block=w3.eth.blockNumber)

    def backfill_organizations(self):
        print("Backfilling organizations...")
        self.etl(Organization, 
            settings.ORGANIZATION_ABI, 
            settings.ORGANIZATION_TOPIC_SIGNATURES, 
            temp_from_block=settings.LISTENER_INIT_BLOCK,
            temp_to_block=w3.eth.blockNumber)

    def listen_for_factories(self):
        print("Listening for factories...")
        self.etl([settings.FACTORY_ADDRESS], 
            settings.FACTORY_ABI, 
            settings.FACTORY_TOPIC_SIGNATURES)
        
    def listen_for_organizations(self):
        print("Listening for organizations...")
        self.etl(Organization, 
            settings.ORGANIZATION_ABI, 
            settings.ORGANIZATION_TOPIC_SIGNATURES)