from web3 import Web3

from django.conf import settings

w3 = Web3(Web3.WebsocketProvider(settings.WS_POLYGON_PROVIDER))

class Extractor:
    def __init__(self):
        self.contracts = {}

    def extract(self, contract_addresses, abi, topics, events):
        if not contract_addresses or len(contract_addresses) == 0:
            return []
        
        if not events or len(events) == 0:
            return []
        
        event_data = []

        for event in events:
            if 'topics' not in event:
                continue

            if len(event['topics']) == 0:
                continue

            event_topic = event['topics'][0].hex()

            if event_topic not in topics:
                continue

            event_name = topics[event_topic].split('(')[0]

            event_address = event['address']
            
            if event_address not in contract_addresses:
                continue

            if event_address not in self.contracts:
                self.contracts[event_address] = w3.eth.contract(
                    address=event_address,
                    abi=abi
                )

            contract = self.contracts[event_address]

            event_data.append(contract.events[event_name]().processLog(event))

        return event_data