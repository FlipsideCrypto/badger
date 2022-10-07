from django.contrib.auth import get_user_model

from rest_framework import serializers

from .models import Badge

User = get_user_model()


class BadgeUserSerializer(serializers.ModelSerializer):
    ens_name = serializers.CharField(read_only=True)
    ens_avatar = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = (
            'url',
            'ethereum_address',
            'ens_name',
            'ens_avatar',
        )


class BadgeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    users = BadgeUserSerializer(many=True, read_only=True)

    class Meta:
        model = Badge
        fields = (
            'id',
            'url',
            'is_active',
            'name',
            'description',
            'token_id',
            'image_hash',
            'token_uri',
            'delegates',
            'account_bound',
            'signer_ethereum_address',
            'users',
            'created',
            'updated'
        )
