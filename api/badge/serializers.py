from django.contrib.auth import get_user_model

from rest_framework import serializers

from organization.models import Organization

from .models import Badge

User = get_user_model()


class BadgeUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'url',
            'ethereum_address',
            'ens_name',
            'ens_avatar',
        )


class BadgeSerializer(serializers.ModelSerializer):
    # TODO: Make read only once the indexer is in use.
    users = BadgeUserSerializer(many=True)

    def update(self, instance, validated_data):
        users_data = validated_data.pop('users')
        instance = super(BadgeSerializer, self).update(
            instance, validated_data)

        for user_data in users_data:
            if not User.objects.filter(ethereum_address=user_data['ethereum_address']).exists():
                user = User.objects.create_user(
                    ethereum_address=user_data['ethereum_address'])
            else:
                user = User.objects.get(
                    ethereum_address=user_data['ethereum_address'])

            instance.users.add(user)
        return instance

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
