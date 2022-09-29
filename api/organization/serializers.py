from rest_framework import serializers

from badge.serializers import BadgeSerializer 

from .models import Organization

class OrganizationSerializer(serializers.ModelSerializer):
    badges = BadgeSerializer(many=True)

    class Meta:
        model = Organization
        fields = (
            'url', 
            'id', 
            'name', 
            'description', 
            'badges', 
            'created_at', 
            'updated_at'
        )
        depth = 1