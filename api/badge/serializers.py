from django.contrib.auth import get_user_model

from rest_framework import serializers

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
    users = BadgeUserSerializer(many=True, read_only=True)
    
    class Meta:
        model = Badge
        fields = (
            'url',
            'is_active',
            'name', 
            'description', 
            'token_id',
            'image_hash', 
            'token_uri',
            'delegates',
            'signer_ethereum_address',
            'users',
            'created', 
            'updated'
        )