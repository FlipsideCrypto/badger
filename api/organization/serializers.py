from django.contrib.auth import get_user_model

from rest_framework import serializers

from badge.serializers import BadgeSerializer

from api.mixins import SerializerRepresentationMixin
from wallet.serializers import WalletSerializer

from .models import Organization

User = get_user_model()

class OrganizationSerializer(
    SerializerRepresentationMixin,
    serializers.ModelSerializer
):
    chain_id = serializers.IntegerField(read_only=True)
    ethereum_address = serializers.CharField(read_only=True)

    owner = WalletSerializer(read_only=True)
    delegates = WalletSerializer(many=True, read_only=True)

    badges = BadgeSerializer(many=True, read_only=True)

    last_block = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Organization
        fields = "__all__"