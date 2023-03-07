from web3 import Web3

from django.conf import settings

from utils.web3 import w3

class Extractor:
    def __init__(self):
        self.contracts = {}

    def extract(self, contract_addresses, abi, topics, from_block, to_block):
        events = w3.eth.get_logs({
            'address': contract_addresses,
            'fromBlock': from_block,
            'toBlock': to_block
        })

        print('events', events)

        if not contract_addresses or len(contract_addresses) == 0:
            print('early returning because contract addresses is empty')
            return []
        
        if not events or len(events) == 0:
            print('early returning because events is empty')
            return []

        event_data = []

        for event in events:
            if 'topics' not in event:
                print('Event does not have topics')
                continue

            if len(event['topics']) == 0:
                print('Event topics is empty')
                continue

            event_topic = event['topics'][0].hex()

            if event_topic not in topics:
                print(f'Event topic {event_topic} not in topics {topics}')
                continue

            event_name = topics[event_topic].split('(')[0]

            event_address = event['address']
            
            if event_address not in contract_addresses:
                print(f'Event address {event_address} not in contract addresses {contract_addresses}')
                continue

            if event_address not in self.contracts:
                self.contracts[event_address] = w3.eth.contract(
                    address=event_address,
                    abi=abi
                )

            contract = self.contracts[event_address]

            event_data.append(contract.events[event_name]().processLog(event))

        return event_data