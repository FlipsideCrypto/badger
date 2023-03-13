from django.contrib.auth import get_user_model

from rest_framework import serializers

from badge.serializers import BadgeSerializer

from api.mixins import SerializerRepresentationMixin
from module.serializers import ModuleSerializer
from wallet.serializers import WalletSerializer

from .models import Organization

User = get_user_model()

class OrganizationSerializer(
    SerializerRepresentationMixin,
    serializers.ModelSerializer
):
    owner = WalletSerializer()
    modules = ModuleSerializer(many=True)

    badges = BadgeSerializer(many=True)
    
    class Meta:
        model = Organization
        fields = "__all__"