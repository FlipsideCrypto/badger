from rest_framework import serializers

from .models import Feedback

class FeedbackSerializer(serializers.ModelSerializer):
    def validate_url(self, value):
        if not all([value.startswith('http://'), 'badger' in value]):
            raise serializers.ValidationError('Invalid URL')

        return value

    class Meta:
        model = Feedback
        fields = (
            'url', 
            'liked', 
            'comment', 
            'created_at', 
            'updated_at'
        )