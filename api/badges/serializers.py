from rest_framework import serializers

from badges.models import Badge, BadgeSet, User

class BadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Badge
        fields = ["name", "description", "token_id", "image_hash", "parent_address", "created_at"]

class BadgeSetSerializer(serializers.ModelSerializer):
    badges = BadgeSerializer(many=True)
    class Meta:
        model = BadgeSet
        fields = ["name", "description", "image_hash", "contract_uri_hash", "creator_address", "contract_address", "badges", "created_at"]

    def create(self, validated_data):
        badge_data = validated_data.pop('badges')
        badge_objs = []
        for badge in badge_data:
            badge = Badge.objects.create(**badge)
            badge_objs.append(badge)

        badge_set = BadgeSet.objects.create(**validated_data)
        badge_set.badges.add(*badge_objs)
        return badge_set

class UserSerializer(serializers.ModelSerializer):
    admin_for = BadgeSetSerializer(many=True, required=False)
    badges_owned = BadgeSerializer(many=True, required=False)

    class Meta:
        model=User
        fields= ["address", "admin_for", "badges_owned", "created_at"]

    # def create(self, validated_data):
    #     admin_for_set = BadgeSet.objects.filter(contract_address=validated_data['admin_for']).first()
    #     print('admin for set', admin_for_set)

    #     user = User.objects.create(address=validated_data['address'])
    #     user.admin_for.add(*admin_for_set)

    #     return