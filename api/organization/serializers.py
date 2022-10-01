from django.contrib.auth import get_user_model

from rest_framework import serializers

from badge.serializers import BadgeSerializer

from .models import Organization

User = get_user_model()


class OrganizationUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'url',
            'address',
        )


class OrganizationSerializer(serializers.ModelSerializer):
    owner = OrganizationUserSerializer(read_only=True)
    badges = BadgeSerializer(many=True, read_only=True)
    delegates = OrganizationUserSerializer(many=True, read_only=True)

    # Assign the owner of the organization to the current user
    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user
        return super().create(validated_data)

    class Meta:
        model = Organization
        fields = (
            'url',
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
