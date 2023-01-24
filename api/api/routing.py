from django.urls import re_path

from badge.consumers import BadgeConsumer

websocket_urlpatterns = [
    re_path(r"^ws/badge/$", BadgeConsumer.as_asgi()),
]