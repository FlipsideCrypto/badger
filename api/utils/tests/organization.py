from organization.models import Organization

def create_organization(
    owner,
    chain="ethereum",
    contract_address="0x0",
    image_hash="0x0",
    name="Test Organization", 
    description="Test Description", 
):
    organization = Organization.objects.create(
        active=True,
        chain=chain,
        contract_address=contract_address,
        image_hash=image_hash,
        name=name, 
        description=description, 
    )

    organization.owner = owner
    organization.save()

    return organization