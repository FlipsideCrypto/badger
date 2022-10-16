from django.contrib.auth import get_user_model

from organization.models import Organization

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

    def _handle_users(self, ethereum_address):
        if not User.objects.filter(ethereum_address=ethereum_address).exists():
            return User.objects.create_user(
                ethereum_address=ethereum_address)
        return User.objects.get(
            ethereum_address=ethereum_address)

    def handle_organization_created(self, event, event_responses):
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
            
        return (response, event['args'])

    def handle_organization_updated(self, event, event_responses):
        # Update organization in database

        # set name
        # set description
        # set image_hash
        # set contract_uri_hash

        return ("Need to update details of the organization", event['args'])

    def handle_ownership_transferred(self, event, event_responses):
        # Update organization owner in database
        # if not Organization.objects.filter(ethereum_address=event["args"]["organization"]).exists():
            # return ("Organization does not exist", event['args'])
        return ("Need to update the organization owner", event['args'])

    def handle_events(self, events):
        event_responses = []

        for event in events:
            if event['event'] in self.loader_mapping:
                for handler in self.loader_mapping[event['event']]:
                    response = handler(event, event_responses)
                    event_responses.append(response)
            else:
                event_responses.append(("Event not handled", event['args']))

        return event_responses