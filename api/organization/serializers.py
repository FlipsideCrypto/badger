from rest_framework import serializers

from badge.serializers import BadgeSerializer 
from user.serializers import UserSerializer

from .models import Organization

class OrganizationSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    badges = BadgeSerializer(many=True, read_only=True)
    delegates = UserSerializer(many=True, read_only=True)

    # Assign the owner of the organization to the current user
    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user
        return super().create(validated_data)

    class Meta:
        model = Organization
        fields = (
            'url',
            'id',
            'active',
            'chain',
            'name',
            'description',
            'image_hash',
            'contract_uri_hash',
            'contract_address',
            'owner',
            'badges',
            'delegates',
            'created_at',
            'updated_at'
        )
        depth = 1