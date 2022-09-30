from django.contrib.auth import get_user_model

PASSWORD = "pAssw0rd!"


def create_user(username="user@example.com", password=PASSWORD):
    return get_user_model().objects.create_user(
        username=username, 
        password=password,
        address="0x6128"
    )
