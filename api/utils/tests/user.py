from django.contrib.auth import get_user_model

PASSWORD = "pAssw0rd!"


def create_user(address="0x8D572a89Ca4C939CDfB43F224A233c9E35e08c9C"):
    return get_user_model().objects.create_user(
        ethereum_address=address,
    )
