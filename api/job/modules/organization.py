import ipfs

from django.contrib.auth import get_user_model

from organization.models import Organization 

User = get_user_model()

class OrganizationModule:
    def sync_organization_created(self, contract, event):
        # Create the organization if we have not already created it
        if not Organization.objects.filter(
            ethereum_address=contract.ethereum_address,
            chain=contract.chain
        ).exists():
            # Get who sent the transaction from the event data
            owner = event['args']['sender']

            # Get the user object for the sender
            if User.objects.filter(ethereum_address=owner).exists():
                owner = User.objects.get(ethereum_address=owner)
            else:
                owner = User.objects.create(
                    is_active=True,
                    ethereum_address=owner,
                ) 

            # Get the contract metadata from IPFS
            ipfs_hash = event['args']['metadataURI'].split('/')[-1]

            # Get the json from the contract uri ipfs
            metadata = ipfs.get_json(ipfs_hash)

            return Organization.objects.create(
                is_active=True,
                owner=owner,
                ethereum_address=contract.ethereum_address,
                name=metadata['name'],
                description=metadata['description'],
                owner=owner,
                image_hash=metadata['imageHash'],
                contract_uri_hash=ipfs_hash,
            )

        return None 

    def sync_organization_updated(self, contract, event):
        pass