from django.urls import re_path

from badge.consumers import BadgeConsumer
from organization.consumers import OrganizationConsumer

websocket_urlpatterns = [
    re_path(r"^ws/badge/$", BadgeConsumer.as_asgi()),
    re_path(r"^ws/organization/$", OrganizationConsumer.as_asgi()),
]