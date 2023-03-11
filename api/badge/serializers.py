from django.contrib.auth import get_user_model

from rest_framework import serializers

from api.mixins import SerializerRepresentationMixin
from wallet.serializers import WalletSerializer

from .models import Badge

User = get_user_model()

class BadgeWalletSerializer(
    SerializerRepresentationMixin,
    serializers.ModelSerializer
):
    ens_name = serializers.CharField(read_only=True)
    ens_avatar = serializers.CharField(read_only=True)

    amount = serializers.IntegerField(read_only=True)

    is_delegate = serializers.BooleanField(read_only=True)

    def get_amount(self, obj):
        badge = self.context.get('badge', None)

        if not badge: return 0

        balance = badge.balances.filter(user=obj).first()

        if not balance: return 0

        return balance.amount

    def get_is_delegate(self, obj):
        badge = self.context.get('badge', None)

        if not badge: return False

        return badge.delegates.filter(ethereum_address=obj.ethereum_address).exists()

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
    id = serializers.IntegerField(read_only=True)
    token_id = serializers.IntegerField(read_only=True)

    delegates = WalletSerializer(many=True, read_only=True)

    users = BadgeWalletSerializer(many=True, read_only=True)

    def get_users(self, obj):
        return BadgeWalletSerializer(
            obj.users.all(),
            many=True,
            context={
                'request': self.context.get('request'),
                'badge': obj
            }
        ).data

    class Meta:
        model = Badge
        fields = (
            'id',
            'is_active',
            'token_id',
            'name',
            'description',
            'image_hash',
            'token_uri',
            'delegates',
            'users',
            'created',
            'updated'
        )