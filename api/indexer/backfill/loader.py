import requests
from web3 import Web3

from django.conf import settings
from django.contrib.auth import get_user_model

from badge.models import Badge
from balance.models import Balance, Transaction
from organization.models import Organization

from .abis import ORGANIZATION as ORGANIZATION_ABI

ALCHEMY_PROVIDER_URL = "wss://polygon-mainnet.g.alchemy.com/v2/YOf5rgn_gm9hY1UPxUrw1zcocM-Ksjte"

w3 = Web3(Web3.WebsocketProvider(ALCHEMY_PROVIDER_URL))

User = get_user_model()


class Loader:
    def __init__(self):
        self.loader_mapping = {
            # Factory events
            "OrganizationCreated": [
                self.handle_organization_created,
            ],
            "BadgeUpdated": [
                self.handle_badge_updated
            ],
            "DelegateUpdated": [
                self.handle_delegate_updated
            ],
            "OrganizationUpdated": [self.handle_organization_updated],
            "OwnershipTransferred": [self.handle_ownership_transferred],
            "PaymentTokenDeposited": [self.handle_payment_token_deposited],
            "TransferSingle": [
                self.handle_transfer_single
            ],
            "TransferBatch": [
                self.handle_transfer_batch
            ],
            "URI": [self.handle_uri],
        }
        self.contracts = {}

    def _handle_users(self, ethereum_address):
        if not User.objects.filter(ethereum_address=ethereum_address).exists():
            return User.objects.create_user(
                ethereum_address=ethereum_address)
        return User.objects.get(
            ethereum_address=ethereum_address)

    def _handle_badge_user_balance_changes(self, badge, user, balance):
        if balance.amount > 0:
            badge.users.add(user)
            badge.save()
        elif user in badge.users.all():
            badge.users.remove(user)
        else:
            return

        badge.save()

    def _handle_user_balance(self, i, event, organization, address_field):
        # get the from user
        user = self._handle_users(event['args'][address_field])

        # get the balance
        if event['event'] == "TransferSingle":
            token_ids = [event['args']['id']]
            values = [event['args']['value']]
        else:
            token_ids = event['args']['ids']
            values = event['args']['values']

        for i, token_id in enumerate(token_ids):
            balance, created = Balance.objects.get_or_create(
                user=user,
                organization=organization,
                token_id=token_id
            )

            # check if transaction is not already in balance
            transaction, created = Transaction.objects.get_or_create(
                tx_hash=event['transactionHash'].hex(),
            )

            if transaction not in balance.transactions.all():
                # apply the balance change if not a mint from 0x0
                change = values[i]
                if address_field == "from":
                    change *= - 1
                    if event['args']['from'] == "0x0000000000000000000000000000000000000000":
                        change = -0

                balance.transactions.add(transaction)
                balance.amount += change
                balance.save()

                # Add the user to the badge if not already in it if the balance is > 0
                badge = organization.badges.get(token_id=token_id)

                if badge is None:
                    badge = self.handle_badge_created(event, None)

                # Add the user to the badge if not already in it if the balance is > 0
                # or remove them if the balance is 0
                self._handle_badge_user_balance_changes(badge, user, balance)

    def get_organization_contract(self, ethereum_address):
        if ethereum_address not in self.contracts:
            self.contracts[ethereum_address] = w3.eth.contract(
                address=ethereum_address,
                abi=ORGANIZATION_ABI
            )
        return self.contracts[ethereum_address]

    def handle_organization_created(self, event, chained_response):
        created = False
        if not Organization.objects.filter(ethereum_address=event["args"]["organization"]).exists():
            organization, created = Organization.objects.get_or_create(
                ethereum_address=event["args"]["organization"],
                name="Loading"
            )
            response = "Organization created"
        else:
            organization = Organization.objects.get(
                ethereum_address=event["args"]["organization"]
            )
            response = "Organization already exists"

        if created or not organization.owner:
            organization.is_active = True
            organization.chain = "Polygon"
            organization.owner = self._handle_users(event["args"]["owner"])
            organization.save()

            response = "Organization management setup"

        return (response, event['args'])

    def handle_organization_updated(self, event, chained_response):
        # Use the organization that was created in the OrganizationCreated event
        if chained_response is not None:
            organization = Organization.objects.get(
                ethereum_address=chained_response[1]["organization"]
            )
        else:
            organization = Organization.objects.get(
                ethereum_address=event["address"]
            )

        if organization is None:
            return ("Organization does not exist", event['args'])

        organization_contract = self.get_organization_contract(
            organization.ethereum_address)
        changed = False

        if not organization.symbol:
            organization.symbol = organization_contract.functions.symbol().call()

            uri = organization_contract.functions.contractURI().call()
            organization.contract_uri_hash = uri.split("/ipfs/")[1]
            changed = True

        if organization.contract_uri_hash and (
            organization.name == "Loading"
            or not organization.description
            or not organization.image_hash
        ):
            url = f"{settings.PINATA_INDEXER_URL}{organization.contract_uri_hash}"

            response = requests.get(url)
            if response.status_code == 200:
                data = response.json()
                organization.name = data["name"]
                organization.description = data["description"]
                organization.image_hash = data["image"].split("/ipfs/")[1]
                changed = True

        if changed:
            organization.save()

        return ("Organization details updated", event['args'])

    def handle_ownership_transferred(self, event, chained_response):
        # get the address of the organization
        organization = Organization.objects.get(
            ethereum_address=event["address"]
        )

        if organization is None:
            return ("Organization does not exist", event['args'])

        organization.owner = self._handle_users(event["args"]["newOwner"])
        organization.save()

        return ("Need to update the organization owner", event['args'])

    def handle_payment_token_deposited(self, event, chained_response):
        pass

    def handle_transfer_batch(self, event, chained_response):
        # when we detect a new transfer, update the Balance model for the user

        # get the address of the organization
        organization = Organization.objects.get(
            ethereum_address=event["address"]
        )

        if organization is None:
            return ("Organization does not exist", event['args'])

        # Update the balance of the `to` and `from` addresses
        for i in range(len(event['args']['ids'])):
            self._handle_user_balance(i, event, organization, "from")
            self._handle_user_balance(i, event, organization, "to")

        return ("Balance updated", event['args'])

    def handle_transfer_single(self, event, chained_response):
        # when we detect a new transfer, update the Balance model for the user

        # get the address of the organization
        organization = Organization.objects.get(
            ethereum_address=event["address"]
        )

        if organization is None:
            return ("Organization does not exist", event['args'])

        # Update the balance of the `to` and `from` addresses
        self._handle_user_balance(0, event, organization, "from")
        self._handle_user_balance(0, event, organization, "to")

        return ("Balance updated", event['args'])

    def handle_badge_updated(self, event, chained_response):
        changed = False
        organization = Organization.objects.get(
            ethereum_address=event["address"]
        )

        if organization is None:
            return ("Organization does not exist", event['args'])

        badge, created = organization.badges.get_or_create(
            token_id=event['args']['id']
        )

        response = "Badge updated"

        if created or not badge.token_uri:
            badge.is_active = True

            organization_contract = self.get_organization_contract(
                organization.ethereum_address)
            badge.token_uri = organization_contract.functions.uri(
                event['args']['id']).call()
            badge.account_bound = organization_contract.functions.getAccountBound(
                event['args']['id']).call()
            badge.signer_ethereum_address = organization_contract.functions.getSigner(
                event['args']['id']).call()

            changed = True

            response = "Badge created"

        if not badge.name or not badge.description or not badge.image_hash:
            # use the 1155 uri spec to replace id with the token id
            url = f"{badge.token_uri}".replace(
                "{id}", str(event['args']['id']))

            if "http" not in url:
                url = f"{settings.PINATA_INDEXER_URL}{url}"

            response = requests.get(url)
            if response.status_code == 200:
                data = response.json()
                badge.name = data["name"]
                badge.description = data["description"]
                badge.image_hash = data["image"].split("/ipfs/")[1]

                changed = True

                response = "Badge details updated"

        if changed:
            badge.save()

        return (response, event['args'])

    def handle_delegate_updated(self, event, chained_response):
        # get the address of the organization
        organization = Organization.objects.get(
            ethereum_address=event["address"]
        )

        if organization is None:
            return ("Organization does not exist", event['args'])

        # get the badge that was updated
        badge = organization.badges.get(token_id=event['args']['id'])

        if badge is None:
            return ("Badge does not exist", event['args'])

        # get the user that was updated
        user = self._handle_users(event["args"]["delegate"])

    if user is None:
            return ("User does not exist", event['args'])

        # add the user to the badge delegates if the args are true
        if event['args']['isDelegate']:
            badge.delegates.add(user)
        else:
            badge.delegates.remove(user)

        badge.save()

        return ("Delegate updated", event['args'])

    def handle_uri(self, event, chained_response):
        # get the address of the organization
        organization = Organization.objects.get(
            ethereum_address=event["address"]
        )

        if organization is None:
            return ("Organization does not exist", event['args'])

        # get the badge that was updated
        badge = organization.badges.get(token_id=event['args']['id'])

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
                        response = handler(event, response)
                        event_responses.append(response)
                else:
                    event_responses.append(
                        ("Event not handled", event['event'], event['args']))
            else:
                event_responses.append(("Event not decoded", event))

        return event_responses
