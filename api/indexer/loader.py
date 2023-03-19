import requests

from django.conf import settings
from django.contrib.auth import get_user_model

from balance.models import Balance, Transaction
from module.models import Module
from organization.models import Organization

from .references import ListenerReference

ZERO_ADDRESS = "0x0000000000000000000000000000000000000000" 

User = get_user_model()

class Loader(ListenerReference):
    def __init__(self):
        self.loader_mapping = {
            # Factory events
            "OrganizationCreated": self.handle_organization_created,
            # Organization events
            "OrganizationUpdated": self.handle_organization_updated,
            "OwnershipTransferred": self.handle_ownership_transferred,
            "TransferSingle": self.handle_transfer_single,
            "TransferBatch": self.handle_transfer_batch,
            "URI": self.handle_uri,
            # Manager and hook events
            "ManagerUpdated": self.handle_manager_updated,
            "HookUpdated": self.handle_hook_updated,
            "ManagerConfigured": self.handle_manager_configured,
            "HookConfigured": self.handle_hook_configured,
        }

        self.contracts = {}

    """
    Helper function to get connected to the organization contract.
    """
    def _organization_contract(self, ethereum_address):
        return self.connected_contract(
            self.summedAddress(ethereum_address),
            settings.ORGANIZATION_ABI_FULL
        )

    """
    Helper function to handle the creation and return of Organizations from an ethereum address.
    """
    def _organization(self, address):
        organization, _ = Organization.objects.get_or_create(
            ethereum_address=self.summedAddress(address),
            chain_id=int(settings.LISTENER_CHAIN_ID)
        )

        return organization
    
    """
    Helper function to handle the creation and return of Badges from an organization and token id.
    """
    def _badge(self, organization, token_id):
        badge, _ = organization.badges.get_or_create(token_id=token_id)
        
        return badge

    """
    Helper function to handle the creation and return of Users from an ethereum address.
    """
    def _handle_users(self, ethereum_address):
        ethereum_address = self.summedAddress(ethereum_address)

        if not User.objects.filter(ethereum_address=ethereum_address).exists():
            return User.objects.create_user(ethereum_address=ethereum_address)
        
        return User.objects.get(ethereum_address=ethereum_address)

    """
    When the balance of an address changes, record the transaction and update the balance.
    """
    def _handle_user_balance(self, i, event, organization, address_field):
        user = self._handle_users(event['args'][address_field])

        if event['event'] == "TransferSingle":
            token_ids = [event['args']['id']]
            values = [event['args']['value']]
        else:
            token_ids = event['args']['ids']
            values = event['args']['values']
        
        for i, token_id in enumerate(token_ids):
            badge = organization.badges.get(token_id=token_id)

            balance, _ = Balance.objects.get_or_create(badge=badge, user=user)

            _, created = Transaction.objects.get_or_create(
                balance=balance,
                tx_hash=event['transactionHash'].hex(),
                log_index=event['logIndex']
            )

            if created:
                change = values[i]
                
                if address_field == "from":
                    change *= - 1
                    if event['args']['from'] == ZERO_ADDRESS:
                        change = -0

                balance.amount += change
                balance.save()

                if balance.amount > 0:
                    if user.ethereum_address != ZERO_ADDRESS:
                        badge.users.add(user)
                elif user in badge.users.all():
                    badge.users.remove(user)

                badge.save()

    def handle_organization_created(self, event):
        organization, created = Organization.objects.get_or_create(
            ethereum_address=self.summedAddress(event['args']['organization']), 
            chain_id=settings.LISTENER_CHAIN_ID
        )

        response = "Organization already exists"

        if created or not organization.owner:
            owner = event['args']['owner']
            organization.owner = self._handle_users(owner)
            organization.save()

            response = "Organization established"

        self.handle_organization_updated({ 
            'address': organization.ethereum_address,
            'args': event['args'] 
        })

        return (response, event['args'])

    def handle_organization_updated(self, event):
        organization = self._organization(event['address'])

        organization_contract = self._organization_contract(organization.ethereum_address)

        if not organization.symbol:
            organization.symbol = organization_contract.functions.symbol().call()

        uri = organization_contract.functions.contractURI().call()
        uri_hash = uri.split("/ipfs/")[1] if "ipfs" in uri else uri

        if uri_hash != organization.contract_uri_hash:
            organization.contract_uri_hash = uri_hash

            response = requests.get(f"{settings.PINATA_INDEXER_URL}{uri_hash}")
            if response.status_code == 200:
                data = response.json()
                organization.name = data["name"]
                organization.description = data["description"]
                organization.image_hash = data["image"].split("/ipfs/")[1]

        if not organization.name:
            organization.name = organization_contract.functions.name().call()

        organization.save()

        return ("Organization details updated", event['args'])

    def handle_ownership_transferred(self, event):
        organization = self._organization(event['address'])

        organization.owner = self._handle_users(event["args"]["newOwner"])

        organization.save()

        return ("Organization ownership updated", event['args'])

    def handle_transfer_batch(self, event):
        organization = self._organization(event['address'])

        for i in range(len(event['args']['ids'])):
            self._handle_user_balance(i, event, organization, "from")
            self._handle_user_balance(i, event, organization, "to")

        return ("Balance updated", event['args'])

    def handle_transfer_single(self, event):
        organization = self._organization(event['address'])

        self._handle_user_balance(0, event, organization, "from")
        self._handle_user_balance(0, event, organization, "to")

        return ("Balance updated", event['args'])

    def handle_uri(self, event):
        uri = event['args']['value']
        token_id = event['args']['id']

        organization = self._organization(event['address'])

        badge = self._badge(organization, event['args']['id'])

        needs_metadata = not badge.name or not badge.description
        needs_image = not badge.image_hash or badge.token_uri != uri

        if needs_metadata or needs_image:
            url = f"{badge.token_uri}".replace("{id}", str(token_id))

            if "http" not in url: # if http is not in, assume it to be an ipfs hash
                url = f"{settings.PINATA_INDEXER_URL}{url}"

            response = requests.get(url)
            if response.status_code == 200:
                data = response.json()
                badge.name = data["name"]
                badge.description = data["description"]
                badge.image_hash = data["image"].split("/ipfs/")[1]

                response = "Badge details updated"

        badge.token_uri = uri

        badge.save()

        return ("Badge uri updated", event['args'])
    
    def handle_manager_updated(self, event):
        organization = self._organization(event['address'])

        key = event['args']['managerKey'].decode("utf-8")
        is_manager = event['args']['isManager']

        module, created = organization.modules.get_or_create(
            module_key=key,
            ethereum_address = self.summedAddress(event['args']['manager']),
            module_type=Module.MANAGER
        )

        module.is_active = is_manager

        module.save()

        return ("Organization manager updated", event['args'])

    def handle_manager_configured(self, event):
        organization = self._organization(event['address'])

        key = event['args']['managerKey'].decode("utf-8")
        config_data = event['args']['data'].decode("utf-8")

        modules = organization.modules.filter(
            module_key=key,
            module_type=Module.MANAGER
        )

        if not modules.exists():
            return ("Organization manager not found", event['args'])

        module = modules.first()

        module.module_config = config_data
# 
        module.save()

        return ("Organization manager updated", event['args'])

    def handle_hook_updated(self, event):
        organization = self._organization(event['address'])

        key = event['args']['hookKey'].decode("utf-8")
        is_manager = event['args']['isHook']

        module, created = organization.modules.get_or_create(
            module_key=key,
            ethereum_address = self.summedAddress(event['args']['hook']),
            module_type=Module.HOOK
        )

        module.is_active = is_manager

        module.save()

        return ("Organization manager updated", event['args'])

    def handle_hook_configured(self, event):
        organization = self._organization(event['address'])

        key = event['args']['hookKey'].decode("utf-8")
        config_data = event['args']['data'].decode("utf-8")

        modules = organization.modules.filter(
            module_key=key,
            module_type=Module.HOOK
        )

        if not modules.exists():
            return ("Organization hook not found", event['args'])

        module = modules.first()

        module.module_config = config_data

        module.save()

        return ("Organization hook updated", event['args'])
        

    def load(self, events):
        event_responses = []

        for event in events:
            if 'event' in event:
                if event['event'] in self.loader_mapping:
                    print(event)
                    event_responses.append(self.loader_mapping[event['event']](event))
                else:
                    event_responses.append(("Event not handled", event['event'], event['args']))
            else:
                event_responses.append(("Event not decoded", event))

        print('event_responses', event_responses)

        return event_responses
