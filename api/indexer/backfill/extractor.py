# This Extractor looks at a smart contract and filters for specific events on specific contracts.
from web3 import Web3

from django.conf import settings

# need to get web3.eth.filter to the point where we can pass in an array of addresses and an array of topics.
# any time we detect one of those events, need to add it to the events array 

class Extractor:
    def __init__(self):
        self.contracts = {
            'polygon': {
                'provider': Web3(
                    Web3.HTTPProvider("https://polygon-mainnet.g.alchemy.com/v2/YOf5rgn_gm9hY1UPxUrw1zcocM-Ksjte")
                ),
            }
        }
        self.only_latest = [
            "OrganizationUpdated",
            "OwnershipTransferred",
            "BadgeUpdated", 
            "URI",
        ]

    def handle_topics(self, topics):
        _topics = []
        for topic in topics:
            _topics.append(topics[topic])

        return _topics

    def handle_contract(self, network, contract_address, start_block, abi):
        if network not in self.contracts:
            self.contracts[network] = {}

        self.contracts[network][contract_address] = {
            "contract_address": contract_address,
            "start_block": start_block,
            "abi": abi,
        }

        return self.contracts[network][contract_address]

    def handle_contracts(self, contracts, abi, topics):
        _contracts = []
        for contract in contracts:
            _contracts.append(self.handle_contract(contract[0], contract[1], contract[2], abi))

        _events = self.extract(_contracts, topics)

        return _events

    def extract(self, contracts, topics):
        # Determine which provider to be using
        w3_provider = self.contracts["polygon"]["provider"]

        # Filter this contract address for all the top
        events = w3_provider.eth.filter({
            "address": [
                contract["contract_address"] for contract in contracts
            ],
            "fromBlock": 0
        }).get_all_entries()

        for event in events:
            print(event)

        # for event in contract['events']:
        #     print(f"Extracting {event['event_name']} events for {contract['contract_address']}")

        #     # if the event doesnt have a tuple in it use normal get_all_entries, but if the 
        #     # event has a tuple in it, retrieve the event data with the topic

        #     events_appendage = w3_provider.eth.filter({
        #         'fromBlock': contract['start_block'],
        #         'toBlock': 'latest',
        #         'address': contract['contract_address'],
        #         'topics': [event['event_name']]
        #     }).get_all_entries()

        #     events += events_appendage

        #     # events_appendage = connected_contract.events[event['event_name']].createFilter(
        #     #     fromBlock=event["start_block"]
        #     # ).get_all_entries()

        #     if len(events_appendage) > 0 and event['event_name'] in self.only_latest:
        #         events_appendage = [events_appendage[-1]]

        #     events.append(events_appendage)

        # squish all the events into one list   
        return events