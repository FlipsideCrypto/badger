from rest_framework import serializers

from organization.models import Organization

from .models import User

class UserOrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = (
            'url',
            'id', 
            'name', 
            'image_hash',
        )

class UserSerializer(serializers.ModelSerializer):
    organizations = UserOrganizationSerializer(many=True)
    tutorial_state = serializers.SerializerMethodField()
    ens_name = serializers.SerializerMethodField()

    def get_tutorial_state(self, obj):
        return obj.tutorial_state

    def get_ens_name(self, obj):
        return obj.ens_name

    class Meta:
        model = User
        fields = (
            'url',
            'id',
            'address',
            'organizations',
            'tutorial_state',
            'ens_name'
        )
        depth = 1