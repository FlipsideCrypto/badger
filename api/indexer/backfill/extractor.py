# This Extractor looks at a smart contract and filters for specific events on specific contracts.
from web3 import Web3

from django.conf import settings

w3 = Web3(Web3.WebsocketProvider(settings.WS_POLYGON_PROVIDER))

class Extractor:
    def __init__(self):
        self.contracts = {}
        self.only_latest = [
            "OrganizationUpdated",
            "OwnershipTransferred",
            "BadgeUpdated", 
            "URI",
        ]

    def handle_contracts(self, contracts, abi, events, end_block=None):
        _events = []

        if not end_block:
            end_block = w3.eth.block_number

        for contract in contracts:
            _contract = self.handle_contract(contract[0], contract[1], contract[2], abi, events)
            _events += self.extract(_contract, end_block)

        return [
            _events,
            end_block
        ]

    def handle_contract(self, network, contract_address, start_block, abi, events):
        self.contracts[contract_address] = {
            "network": network,
            "contract_address": contract_address,
            "start_block": start_block,
            "abi": abi,
            "events": [],
        }

        for event in events:
            self.contracts[contract_address]["events"].append(self.handle_event(event))

        return self.contracts[contract_address]

    def handle_event(self, event):
        event_name = event.replace("event ", "").split("(")[0]

        return {
            "event_name": event_name,
        }

    def extract(self, contract, end_block=None):
        if "connected_contract" not in self.contracts[contract["contract_address"]]:
            self.contracts[contract["contract_address"]]["connected_contract"] = w3.eth.contract(
                address=contract["contract_address"],
                abi=contract["abi"]
            )

        events = []
        for event in contract['events']:
            if settings.DEBUG:
                print(f"Extracting {event['event_name']} events for {contract['contract_address']}")

            # if the event doesnt have a tuple in it use normal get_all_entries, but if the 
            # event has a tuple in it, retrieve the event data with the topic
            events_appendage = self.contracts[contract['contract_address']]['connected_contract'].events[event['event_name']].createFilter(
                fromBlock=contract['start_block'],
                toBlock=end_block
            ).get_all_entries()

            events.append(events_appendage)

        return events