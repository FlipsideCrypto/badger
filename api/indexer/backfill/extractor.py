# This Extractor looks at a smart contract and filters for specific events on specific contracts.
from web3 import Web3

from indexer.backfill.config import Config

ALCHEMY_PROVIDER_URL = "wss://polygon-mainnet.g.alchemy.com/v2/YOf5rgn_gm9hY1UPxUrw1zcocM-Ksjte"

w3 = Web3(Web3.WebsocketProvider(ALCHEMY_PROVIDER_URL))

class Extractor:
    def __init__(self):
        self.contracts = {}
        self.only_latest = [
            "OrganizationUpdated",
            "OwnershipTransferred",
        ]

    def handle_contracts(self, contracts, abi, events, start_block, end_block=None):
        _events = []

        for contract in contracts:
            _contract = self.handle_contract(contract[0], contract[1], abi, events)
            _events += self.extract(_contract, start_block, end_block)

        return _events

    def handle_contract(self, network, contract_address, abi, events):
        self.contracts[contract_address] = {
            "network": network,
            "contract_address": contract_address,
            "abi": abi,
            "events": [],
        }

        for event in events:
            self.contracts[contract_address]["events"].append(self.handle_event(event))

        return self.contracts[contract_address]

    def handle_event(self, event):
        event_name = event.split("(")[0]

        return {
            "event_name": event_name,
        }

    def extract(self, contract, start_block, end_block=None):
        connected_contract = w3.eth.contract(address=contract['contract_address'], abi=contract['abi'])

        events = []
        for event in contract['events']:
            events_appendage = connected_contract.events[event['event_name']].createFilter(
                fromBlock=start_block, 
                toBlock=end_block
            ).get_all_entries()

            if len(events_appendage) > 0 and event['event_name'] in self.only_latest:
                events_appendage = [events_appendage[-1]]

            events.append(events_appendage)

        # squish all the events into one list   
        return events