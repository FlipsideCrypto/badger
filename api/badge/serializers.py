from django.contrib.auth import get_user_model

from rest_framework import serializers

from api.mixins import SerializerRepresentationMixin

from .models import Badge

User = get_user_model()

class BadgeUserSerializer(
    SerializerRepresentationMixin,
    serializers.ModelSerializer
):
    ens_name = serializers.CharField(read_only=True)
    ens_avatar = serializers.CharField(read_only=True)

    amount = serializers.SerializerMethodField(read_only=True)

    def get_amount(self, obj):
        # get badge from context
        badge = self.context.get('badge', None)

        if not badge: return None

        # get balance
        balance = badge.balances.filter(user=obj).first()

        if not balance: return None

        return balance.amount

    class Meta:
        model = User
        fields = (
            'ethereum_address',
            'ens_name',
            'ens_avatar',
            'amount'
        )


class BadgeSerializer(
    SerializerRepresentationMixin,
    serializers.ModelSerializer
):
    id = serializers.IntegerField(read_only=True)
    delegates = BadgeUserSerializer(many=True, read_only=True)
    users = serializers.SerializerMethodField(read_only=True)

    def get_users(self, obj):
        return BadgeUserSerializer(
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
            'name',
            'description',
            'token_id',
            'image_hash',
            'token_uri',
            'delegates',
            'users',
            'created',
            'updated'
        )