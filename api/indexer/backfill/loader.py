import requests
from web3 import Web3

from django.conf import settings
from django.contrib.auth import get_user_model

from balance.models import Balance, Transaction
from organization.models import Organization

w3 = Web3(Web3.WebsocketProvider(settings.WS_POLYGON_PROVIDER))

User = get_user_model()

"""
[AttributeDict({'args': AttributeDict({'organization': '0x4d51C82b2dFDEdE754447974C488708465943790', 'owner': '0x75ee82787C548daeaC58Af6cBA5bd2A9Ff863d28', 'organizationId': 0}), 'event': 'OrganizationCreated', 'logIndex': 226, 'transactionIndex': 53, 'transactionHash': HexBytes('0xdb405198a6ad743a52ade5347b249fb2268ec82a17b02172176c050979c4125e'), 'address': '0x72b03C649953CA95B920f60A5687e4d2DACf45c0', 'blockHash': HexBytes('0xaf9bb5d77f585c446417420e68f9c6508f6f85f2e0d54d4df03b35226046fa2d'), 'blockNumber': 39865246})]
"""

class Loader:
    def __init__(self):
        self.loader_mapping = {
            # Factory events
            "OrganizationCreated": [self.handle_organization_created],
            # Organization events
            "BadgeUpdated": [self.handle_badge_updated],
            "OrganizationUpdated": [self.handle_organization_updated],
            "OwnershipTransferred": [self.handle_ownership_transferred],
            "TransferSingle": [self.handle_transfer_single],
            "TransferBatch": [self.handle_transfer_batch],
            "URI": [self.handle_uri],
        }

        self.contracts = {}

    def _organization(event):
        address = event['address']

        if not Web3.isChecksumAddress(address):
            address = Web3.toChecksumAddress(address)

        organization, created = Organization.objects.get_or_create(
            ethereum_address=address
        )

        return organization
    
    def _badge(organization, event):
        token_id = event['args']['id']

        badge, created = organization.badges.get_or_create(
            token_id=token_id
        )

        return badge

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
    Helper function to handle the creation and return of Users from an ethereum address.
    """
    def _handle_users(self, ethereum_address):
        if not Web3.isChecksumAddress(ethereum_address):
            ethereum_address = Web3.toChecksumAddress(ethereum_address)

        if not User.objects.filter(ethereum_address=ethereum_address).exists():
            return User.objects.create_user(ethereum_address=ethereum_address)
        return User.objects.get(ethereum_address=ethereum_address)

    """
    Helper function that handles `.users` when a balance changes.
    """
    def _handle_badge_user_balance_changes(self, badge, user, amount):
        if amount > 0:
            if user.ethereum_address != "0x0000000000000000000000000000000000000000":
                badge.users.add(user)
                badge.save()
        elif user in badge.users.all():
            badge.users.remove(user)
        else:
            return

        badge.save()

    def _handle_user_balance(self, i, event, organization, address_field):
        user = self._handle_users(event['args'][address_field])

        # Get the token ids and values from the event and wrap them in lists if they are not already
        if event['event'] == "TransferSingle":
            token_ids = [event['args']['id']]
            values = [event['args']['value']]
        else:
            token_ids = event['args']['ids']
            values = event['args']['values']

        for i, token_id in enumerate(token_ids):
            badge = organization.badges.get(token_id=token_id)

            balance, created = Balance.objects.get_or_create(
                organization=organization,
                badge=badge,
                user=user
            )

            # check if transaction is not already in balance
            transaction, created = Transaction.objects.get_or_create(
                tx_hash=event['transactionHash'].hex(),
            )

            if transaction not in balance.transactions.all():
                # apply the balance change if not a mint from 0x0
                change = values[i]
                
                # Decrease the balance of the sender if a transfer from
                if address_field == "from":
                    change *= - 1
                    # Exclude address(0) because we are not tracking the balance of that address
                    if event['args']['from'] == "0x0000000000000000000000000000000000000000":
                        change = -0

                # If the badge doesn't exist, skip this balance for now
                if not organization.badges.filter(token_id=token_id).exists():
                    continue

                balance.transactions.add(transaction)
                balance.amount += change
                balance.save()

                # Add the user to the badge if not already in it if the balance is > 0
                badge = organization.badges.get(token_id=token_id)

                # Add the user to the badge if not already in it if the balance is > 0
                # or remove them if the balance is 0
                self._handle_badge_user_balance_changes(badge, user, balance.amount)

    def handle_organization_created(self, event):
        organization = event['args']['organization']
        owner = event['args']['owner']

        if not Web3.isChecksumAddress(organization):
            organization = Web3.toChecksumAddress(organization)

        if not Organization.objects.filter(ethereum_address=organization).exists():
            organization, created = Organization.objects.get_or_create(ethereum_address=organization)
            response = "Organization created"
        else:
            organization = Organization.objects.get(ethereum_address=organization)
            response = "Organization already exists"

        created = False

        if created or not organization.owner:
            organization.is_active = True
            organization.chain = "Polygon"
            organization.owner = self._handle_users(owner)
            organization.save()

            response = "Organization management setup"

        return (response, event['args'])

    def handle_organization_updated(self, event):
        organization = self._organization(event)

        organization_contract = self._organization_contract(organization.ethereum_address)

        # Make the blockchain read calls
        organization.symbol = organization_contract.functions.symbol().call()
        uri = organization_contract.functions.contractURI().call()

        # Calculate the ipfs hash to the contract uri
        organization.contract_uri_hash = uri.split("/ipfs/")[1]
        organization.save()

        # Build the client side url used
        url = f"{settings.PINATA_INDEXER_URL}{organization.contract_uri_hash}"

        # Retrieve the metadata from IPFS
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            organization.name = data["name"]
            organization.description = data["description"]
            organization.image_hash = data["image"].split("/ipfs/")[1]

        organization.save()

        return ("Organization details updated", event['args'])

    def handle_ownership_transferred(self, event):
        organization = self._organization(event)

        organization.owner = self._handle_users(event["args"]["newOwner"])

        organization.save()

        return ("Need to update the organization owner", event['args'])

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

    def handle_badge_updated(self, event):
        token_id = event['args']['badgeId'] if 'badgeId' in event['args'] else event['args']['id']

        organization = self._organization(event)

        badge = self._badge(organization, event)

        response = "Badge updated"

        if not badge.token_uri:
            badge.is_active = True

            organization_contract = self._organization_contract(organization.ethereum_address)
            badge.token_uri = organization_contract.functions.uri(token_id).call()

            badge.save()

            response = "Badge created"

        if not badge.name or not badge.description or not badge.image_hash:
            # use the 1155 uri spec to replace id with the token id
            url = f"{badge.token_uri}".replace("{id}", str(token_id))

            if "http" not in url:
                url = f"{settings.PINATA_INDEXER_URL}{url}"

            response = requests.get(url)
            if response.status_code == 200:
                data = response.json()
                badge.name = data["name"]
                badge.description = data["description"]
                badge.image_hash = data["image"].split("/ipfs/")[1]

                badge.save()

                response = "Badge details updated"

        return (response, event['args'])

    def handle_uri(self, event):
        organization = self._organization(event)

        badge = self._badge(organization, event)

        if badge is None:
            return ("Badge does not exist", event['args'])

        badge.token_uri = event['args']['value']
        badge.save()

        return ("Badge uri updated", event['args'])

    def handle_events(self, events):
        event_responses = []

        response = None
        for event in events:
            response = None

            if 'event' in event:
                if event['event'] in self.loader_mapping:
                    for handler in self.loader_mapping[event['event']]:
                        event_responses.append(handler(event, response))
                else:
                    event_responses.append(("Event not handled", event['event'], event['args']))
            else:
                event_responses.append(("Event not decoded", event))

        return event_responses
