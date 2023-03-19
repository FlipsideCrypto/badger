from django.contrib.auth import get_user_model

from rest_framework import serializers

from api.mixins import SerializerRepresentationMixin
from balance.models import Balance
from organization.models import Organization

from .models import Badge

User = get_user_model()

class BadgeWalletSerializer(
    SerializerRepresentationMixin,
    serializers.ModelSerializer
):
    amount = serializers.SerializerMethodField()

    def get_amount(self, obj):
        badge = self.context.get('badge', None)

        if not badge: return 0

        balance = badge.balances.filter(user=obj).first()

        if not balance: return 0

        return balance.amount

    class Meta:
        model = User
        exclude = (
            'password', 
            'groups', 
            'user_permissions'
        )

class BadgeSerializer(
    SerializerRepresentationMixin,
    serializers.ModelSerializer
):
    ethereum_address = serializers.SerializerMethodField()

    users = serializers.SerializerMethodField()

    chain_id = serializers.SerializerMethodField()

    def get_users(self, obj):
        return BadgeWalletSerializer(
            obj.users.all(),
            many=True,
            context={
                'request': self.context.get('request'),
                'badge': obj
            }
        ).data

    def get_ethereum_address(self, obj):
        organization = Organization.objects.filter(
            badges__id__in=[obj.id],
            badges__isnull=False
        ).first()

        if not organization: return None

        return organization.ethereum_address

    def get_chain_id(self, obj):
        organization = Organization.objects.filter(
            badges__id__in=[obj.id],
            badges__isnull=False
        ).first()

        if not organization: return None

        return organization.chain_id

    class Meta:
        model = Badge
        fields = "__all__"