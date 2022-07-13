from rest_framework import serializers

from badges.models import Badge, BadgeSet

class BadgeSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = BadgeSet
        fields = ["name", "description", "image_hash", "contract_uri_hash", "creator_address", "contract_address", "badges"]

class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = ["name", "description", "token_id", "image_hash"]