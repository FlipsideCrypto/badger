from django.contrib.auth import get_user_model

from rest_framework import serializers

from .models import Badge

User = get_user_model()


class BadgeUserSerializer(serializers.ModelSerializer):
    def get_object():
        print('in get object')
    
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
    # TODO: Make read only once the indexer is in use.
    users = BadgeUserSerializer(many=True, required=False)

    def _handle_users(self, users_data):
        users = []
        for user_data in users_data:
            if not User.objects.filter(ethereum_address=user_data['ethereum_address']).exists():
                user = User.objects.create_user(
                    ethereum_address=user_data['ethereum_address'])
            else:
                user = User.objects.get(
                    ethereum_address=user_data['ethereum_address'])
            users.append(user)
        return users 

    def create(self, validated_data):
        users_data = None
        if 'users' in validated_data:
            users_data = validated_data.pop('users')

            users = self._handle_users(users_data)
            for user in users:
                if 'users' not in validated_data:
                    validated_data['users'] = []
                validated_data['users'].add(user)

        instance = super(BadgeSerializer, self).create(validated_data)

        return instance

    def update(self, instance, validated_data):
        users_data = None
        if 'users' in validated_data:
            users_data = validated_data.pop('users')

            users = self._handle_users(users_data)
            for user in users:
                if 'users' not in validated_data:
                    validated_data['users'] = []
                validated_data['users'].add(user)

        instance = super(BadgeSerializer, self).update(
            instance, validated_data)

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
