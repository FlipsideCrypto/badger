from rest_framework import serializers

from .models import Badge

class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = (
            'url', 
            'id',
            'name', 
            'description', 
            'token_id',
            'image_hash', 
            'created_at', 
            'updated_at'
        )