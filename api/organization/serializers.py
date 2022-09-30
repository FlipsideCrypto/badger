from rest_framework import serializers

from badge.serializers import BadgeSerializer 
from user.serializers import UserSerializer

from .models import Organization

class OrganizationSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    badges = BadgeSerializer(many=True)
    delegates = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Organization
        fields = '__all__'
        depth = 1