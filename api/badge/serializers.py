from rest_framework import serializers

from user.serializers import UserSerializer 

from .models import Badge

class BadgeSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True, read_only=True)
    
    class Meta:
        model = Badge
        fields = (
            'url', 
            'id',
            'name', 
            'description', 
            'token_id',
            'image_hash', 
            'delegates',
            'users',
            'created_at', 
            'updated_at'
        )