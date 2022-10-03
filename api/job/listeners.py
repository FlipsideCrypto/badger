import asyncio

from web3 import Web3

from django.conf import settings

from .models import ContractListener
from .modules.badge import BadgeModule
from .modules.organization import OrganizationModule

web3 = Web3(Web3.HTTPProvider(settings.PROVIDER))


class ContractListenerManager:
    def __init__(self):
        self.badge_module = BadgeModule()
        self.organization_module = OrganizationModule()

        self.event_modules = {
            'OrganizationCreated': self.organization_module.sync_organization_created,
            'OrganizationUpdated': self.organization_module.sync_organization_updated,
            'BadgeCreated': self.badge_module.sync_badge_created,
            'BadgeUpdated': self.badge_module.sync_badge_updated,
            'Transfer': self.badge_module.sync_badge_transfer,
        }

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
    async def sync_contract(self, contract, poll_interval):
        # Filter the events of the connected contract
        event_filter = self._connected_contract(
            contract).events[contract.event].createFilter(fromBlock=contract.last_block)

        # Keep the loop open and filter through the new entries
        # When it reaches the bottom of the while loop, it will sleep for the next block
        while True:
            events = event_filter.get_new_entries()
            for event in events:
                self.sync_event(contract, event)
            await asyncio.sleep(poll_interval)

    # Get all the Contracts from the database that need to be synced at every given block
    # Will run every 2 seconds so that we get the events for every contract at every block
    def sync_contracts(self):
        self.contracts = ContractListener.objects.filter(is_active=True)

        loop = asyncio.get_event_loop()
        try:
            loop.run_until_complete(
                asyncio.gather(
                    *[self.sync_contract(contract, 2) for contract in self.contracts]
                )
            )
        finally:
            loop.close()
