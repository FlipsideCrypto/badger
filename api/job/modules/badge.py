import ipfs

from badge.models import Badge
from organization.models import Organization

class BadgeModule:
    def __init__(self, contract):
        self.contract = contract

    def sync_badge_created(self, contract, event):
        # Use the address the contract was emitted from to get the organization
        organization = Organization.objects.get(ethereum_address=contract.ethereum_address)

        # Get the IPFS hash out of the token URI
        ipfs_hash = event['args']['tokenURI'].split('/')[-1]

        # Get the metadata from IPFS
        metadata = ipfs.get_json(ipfs_hash)

        # Create the badge
        badge = Badge.objects.create(
            is_active=True,
            name=metadata['name'],
            description=metadata['description'],
            token_id=event['args']['tokenId'],
            image_hash=metadata['imageHash'],
            token_uri=event['args']['tokenURI'],
            total_supply=event['args']['totalSupply'],
        )

        # Add the badge to the organization
        organization.badges.add(badge)
        organization.save()

    def sync_badge_updated(self, contract, event):
        pass

    def sync_badge_transfer(self, contract, event):
        pass