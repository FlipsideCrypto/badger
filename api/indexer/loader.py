import requests
from web3 import Web3

from django.conf import settings
from django.contrib.auth import get_user_model

from balance.models import Balance
from organization.models import Organization

from utils.web3 import w3

ZERO_ADDRESS = "0x0000000000000000000000000000000000000000" 

User = get_user_model()

# Hook configured
# Hook updated

# Manager configured
# Manager updated

class Loader:
    def __init__(self):
        self.loader_mapping = {
            # Factory events
            "OrganizationCreated": [self.handle_organization_created],
            # Organization events
            "OrganizationUpdated": [self.handle_organization_updated],
            "OwnershipTransferred": [self.handle_ownership_transferred],
            "TransferSingle": [self.handle_transfer_single],
            "TransferBatch": [self.handle_transfer_batch],
            "URI": [self.handle_uri],
        }

        self.contracts = {}

    """
    Helper function to get connected to the organization contract.
    """
    def _organization_contract(self, ethereum_address):
        if not Web3.isChecksumAddress(ethereum_address):
            ethereum_address = Web3.toChecksumAddress(ethereum_address)

        if ethereum_address not in self.contracts:
            self.contracts[ethereum_address] = w3.eth.contract(
                address=ethereum_address,
                abi=settings.ORGANIZATION_ABI_FULL
            )

        return self.contracts[ethereum_address]

    """
    Helper function to handle the creation and return of Organizations from an ethereum address.
    """
    def _organization(self, event):
        address = event['address']

        if not Web3.isChecksumAddress(address):
            address = Web3.toChecksumAddress(address)

        organization, created = Organization.objects.get_or_create(
            ethereum_address=address,
            chain_id=int(settings.LISTENER_CHAIN_ID)
        )

        return organization
    
    """
    Helper function to handle the creation and return of Badges from an organization and token id.
    """
    def _badge(self, organization, event):
        token_id = event['args']['id']

        badge, created = organization.badges.get_or_create(token_id=token_id)

        return badge

    """
    Helper function to handle the creation and return of Users from an ethereum address.
    """
    def _handle_users(self, ethereum_address):
        if not Web3.isChecksumAddress(ethereum_address):
            ethereum_address = Web3.toChecksumAddress(ethereum_address)

        if not User.objects.filter(ethereum_address=ethereum_address).exists():
            return User.objects.create_user(ethereum_address=ethereum_address)
        return User.objects.get(ethereum_address=ethereum_address)

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

            balance, created = Balance.objects.get_or_create(badge=badge, user=user)

            transaction, created = balance.transactions.get_or_create(tx_hash=event['transactionHash'].hex())

            if created:
                change = values[i]
                
                if address_field == "from":
                    change *= - 1
                    if event['args']['from'] == ZERO_ADDRESS:
                        change = -0

                balance.amount += change
                balance.save()

                badge = organization.badges.get(token_id=token_id)

                if balance.amount > 0:
                    if user.ethereum_address != ZERO_ADDRESS:
                        badge.users.add(user)
                        badge.save()
                elif user in badge.users.all():
                    badge.users.remove(user)
                else:
                    return

                badge.save()

    def handle_organization_created(self, event):
        organization = event['args']['organization']
        owner = event['args']['owner']

        if not Web3.isChecksumAddress(organization):
            organization = Web3.toChecksumAddress(organization)

        organization, created = Organization.objects.get_or_create(
            ethereum_address=organization, 
            chain_id=settings.LISTENER_CHAIN_ID
        )

        response = "Organization already exists"
        if created:
            response = "Organization created"

        if not organization.owner:
            organization.owner = self._handle_users(owner)
            organization.save()

            response = "Organization management setup"

        # Load all the metadata
        self.handle_organization_updated({ 'address': organization.ethereum_address })

        return (response, event['args'])

    def handle_organization_updated(self, event):
        organization = self._organization(event)

        organization_contract = self._organization_contract(organization.ethereum_address)

        # Make the blockchain read calls
        organization.symbol = organization_contract.functions.symbol().call()
        uri = organization_contract.functions.contractURI().call()

        # Calculate the ipfs hash to the contract uri
        organization.contract_uri_hash = uri.split("/ipfs/")[1] if "ipfs" in uri else uri

        # Build the client side url used
        url = f"{settings.PINATA_INDEXER_URL}{organization.contract_uri_hash}"

        # Retrieve the metadata from IPFS
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            organization.name = data["name"]
            organization.description = data["description"]
            organization.image_hash = data["image"].split("/ipfs/")[1]

        # If we don't get IPFS, try the blockchain
        if not organization.name:
            organization.name = organization_contract.functions.name().call()

        organization.save()

        return ("Organization details updated", event['args'])

    def handle_ownership_transferred(self, event):
        organization = self._organization(event)

        organization.owner = self._handle_users(event["args"]["newOwner"])

        organization.save()

        return ("Organization ownership updated", event['args'])

    def handle_transfer_batch(self, event):
        organization = self._organization(event)

        # Update the balance of the `to` and `from` addresses
        for i in range(len(event['args']['ids'])):
            self._handle_user_balance(i, event, organization, "from")
            self._handle_user_balance(i, event, organization, "to")

        return ("Balance updated", event['args'])

    def handle_transfer_single(self, event):
        organization = self._organization(event)

        # Update the balance of the `to` and `from` addresses
        self._handle_user_balance(0, event, organization, "from")
        self._handle_user_balance(0, event, organization, "to")

        return ("Balance updated", event['args'])

    def handle_uri(self, event):
        uri = event['args']['value']
        token_id = event['args']['id']

        organization = self._organization(event)

        badge = self._badge(organization, event)

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
                # TODO: This will break if someone uses a custom image url
                badge.image_hash = data["image"].split("/ipfs/")[1]

                response = "Badge details updated"

        badge.token_uri = uri

        badge.save()

        return ("Badge uri updated", event['args'])

    def load(self, events):
        event_responses = []

        for event in events:
            if 'event' in event:
                if event['event'] in self.loader_mapping:
                    for handler in self.loader_mapping[event['event']]:
                        event_responses.append(handler(event))
                else:
                    event_responses.append(("Event not handled", event['event'], event['args']))
            else:
                event_responses.append(("Event not decoded", event))

        print('event_responses', event_responses)

        return event_responses
