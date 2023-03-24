from django.urls import re_path

from organization.consumers import OrganizationConsumer

websocket_urlpatterns = [
    re_path(r"^ws/organization/$", OrganizationConsumer.as_asgi()),
]