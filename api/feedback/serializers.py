from django.contrib.auth import get_user_model

from rest_framework import serializers

from .models import Feedback

User = get_user_model()


class FeedbackUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'url',
            'ethereum_address',
            'ens_name',
            'ens_avatar',
        )


class FeedbackSerializer(serializers.ModelSerializer):
    author = FeedbackUserSerializer(read_only=True)

    def create(self, validated_data):
        validated_data['author'] = self.context['request'].user
        return super().create(validated_data)

    class Meta:
        model = Feedback
        fields = (
            'url',
            'id',
            'author',
            'feedback_url',
            'liked',
            'comment',
            'created_at',
            'updated_at'
        )
        depth = 1
