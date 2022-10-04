import asyncio

from web3 import Web3

from django.conf import settings

from .models import ContractListener
from .modules.badge import BadgeModule
from .modules.organization import OrganizationModule

web3 = Web3(Web3.HTTPProvider(settings.PROVIDER))

badge_module = BadgeModule()
organization_module = OrganizationModule()

event_modules = {
    'OrganizationCreated': organization_module.sync_organization_created,
    'OrganizationUpdated': organization_module.sync_organization_updated,
    'BadgeCreated': badge_module.sync_badge_created,
    'BadgeUpdated': badge_module.sync_badge_updated,
    'Transfer': badge_module.sync_badge_transfer,
}

class ContractListenerManager:
    def __init__(self):
        self._connected_contracts = []

    def _connected_contract(self, contract):
        if not self._connected_contracts[contract.ethereum_address]:
            connected_contract = web3.eth.contract(
                address=contract.ethereum_address,
                abi=contract.event_abi
            )

            self._connected_contracts[contract.ethereum_address] = connected_contract

        return self._connected_contracts[contract.ethereum_address]

    def sync_event(self, contract, event):
        print(self.event_modules[contract.event](contract, event))
        print(Web3.toJSON(event))

    # Get all the events of the provided `.event`` in the
    async def sync_contract(self, contract):
        # Filter the events of the connected contract
        event_filter = self._connected_contract(
            contract).events[contract.event].createFilter(fromBlock=contract.last_block)

        # Keep the loop open and filter through the new entries
        # When it reaches the bottom of the while loop, it will sleep for the next block
        events = event_filter.get_new_entries()
        for event in events:
            self.sync_event(contract, event)