import requests
from web3 import Web3

from django.conf import settings
from django.contrib.auth import get_user_model

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
                self.handle_organization_updated
            ],
            "OwnershipTransferred": [self.handle_ownership_transferred],
            # Organization events
            "OrganizationCreated": [
                self.handle_organization_created,
                self.handle_organization_updated
            ],
            "OrganizationUpdated": [self.handle_organization_updated],
        }
        self.contracts = {}

    def _handle_users(self, ethereum_address):
        if not User.objects.filter(ethereum_address=ethereum_address).exists():
            return User.objects.create_user(
                ethereum_address=ethereum_address)
        return User.objects.get(
            ethereum_address=ethereum_address)
    
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
        organization = Organization.objects.get(
            ethereum_address=chained_response[1]["organization"]
        )

        if organization is None:
            return ("Organization does not exist", event['args'])

        organization_contract = self.get_organization_contract(organization.ethereum_address)
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

    def handle_ownership_transferred(self, event, event_responses):
        # Update organization owner in database
        # if not Organization.objects.filter(ethereum_address=event["args"]["organization"]).exists():
            # return ("Organization does not exist", event['args'])

        return ("Need to update the organization owner", event['args'])

    def handle_events(self, events):
        event_responses = []

        response = None
        for event in events:
            if event['event'] in self.loader_mapping:
                for handler in self.loader_mapping[event['event']]:
                    response = handler(event, response)
                    event_responses.append(response)
            else:
                event_responses.append(("Event not handled", event['args']))

        return event_responses