from django.contrib.auth import get_user_model
from rest_framework import serializers

from api.mixins import SerializerRepresentationMixin

User = get_user_model()

class WalletSerializer(
    SerializerRepresentationMixin, 
    serializers.ModelSerializer
):
    class Meta:
        model = User
        exclude = (
            'password', 
            'groups', 
            'user_permissions'
        )